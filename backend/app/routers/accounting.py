from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from typing import List
from app.database import get_db
from app.models import User, Invoice, Payment, Account, LedgerEntry, InvoiceStatus
from app.schemas import (
    InvoiceCreate, InvoiceResponse,
    PaymentCreate, PaymentResponse,
    AccountCreate, AccountResponse,
    LedgerEntryResponse, LedgerResponse
)
from app.auth import get_current_user
import secrets

router = APIRouter()

def generate_id(prefix: str) -> str:
    """Generate unique ID with prefix"""
    return f"{prefix}-{secrets.token_urlsafe(8).upper()}"

# Account endpoints
@router.get("/accounts", response_model=List[AccountResponse])
def get_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all accounts for the current user - accounts start empty"""
    accounts = db.query(Account).filter(Account.user_id == current_user.id).all()
    return accounts

@router.post("/accounts", response_model=AccountResponse)
def create_account(
    account_data: AccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new account - starts with zero balance"""
    # Check if account code already exists
    existing = db.query(Account).filter(Account.code == account_data.code).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account code already exists"
        )
    
    new_account = Account(
        id=generate_id("ACC"),
        name=account_data.name,
        account_type=account_data.account_type,
        code=account_data.code,
        balance=0.0,  # Start with zero balance
        user_id=current_user.id
    )
    
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    
    return new_account

# Invoice endpoints
@router.get("/invoices", response_model=List[InvoiceResponse])
def get_invoices(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all invoices for the current user"""
    invoices = db.query(Invoice).filter(Invoice.user_id == current_user.id).all()
    return invoices

@router.post("/invoices", response_model=InvoiceResponse)
def create_invoice(
    invoice_data: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new invoice and add ledger entry - account must exist first"""
    new_invoice = Invoice(
        id=generate_id("INV"),
        customer=invoice_data.customer,
        amount=invoice_data.amount,
        status=invoice_data.status,
        date=invoice_data.date,
        user_id=current_user.id
    )
    
    db.add(new_invoice)
    db.flush()  # Flush to get the invoice ID
    
    # Find accounts receivable account - must exist (not auto-created)
    ar_account = db.query(Account).filter(
        Account.code == "AR",
        Account.user_id == current_user.id
    ).first()
    
    if not ar_account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Accounts Receivable account (code: AR) must be created first. Accounts start empty and only get populated when transactions are added."
        )
    
    # Create ledger entry with the invoice date (only when transaction is added)
    ledger_entry = LedgerEntry(
        id=generate_id("LED"),
        account_id=ar_account.id,
        date=invoice_data.date,  # Use invoice date
        description=f"Invoice {new_invoice.id} - {invoice_data.customer}",
        debit=invoice_data.amount,
        credit=0.0,
        balance=ar_account.balance + invoice_data.amount,
        reference_type="invoice",
        reference_id=new_invoice.id,
        user_id=current_user.id
    )
    
    # Update account balance
    ar_account.balance += invoice_data.amount
    
    db.add(ledger_entry)
    db.commit()
    db.refresh(new_invoice)
    
    return new_invoice

@router.put("/invoices/{invoice_id}", response_model=InvoiceResponse)
def update_invoice(
    invoice_id: str,
    invoice_data: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an invoice"""
    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id,
        Invoice.user_id == current_user.id
    ).first()
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    invoice.customer = invoice_data.customer
    invoice.amount = invoice_data.amount
    invoice.status = invoice_data.status
    invoice.date = invoice_data.date
    
    db.commit()
    db.refresh(invoice)
    
    return invoice

@router.delete("/invoices/{invoice_id}")
def delete_invoice(
    invoice_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an invoice"""
    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id,
        Invoice.user_id == current_user.id
    ).first()
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    db.delete(invoice)
    db.commit()
    
    return {"message": "Invoice deleted successfully"}

# Payment endpoints
@router.get("/payments", response_model=List[PaymentResponse])
def get_payments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all payments for the current user"""
    payments = db.query(Payment).filter(Payment.user_id == current_user.id).all()
    return payments

@router.post("/payments", response_model=PaymentResponse)
def create_payment(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Record a payment and add ledger entry - accounts must exist first"""
    # Verify invoice exists
    invoice = db.query(Invoice).filter(
        Invoice.id == payment_data.invoice_id,
        Invoice.user_id == current_user.id
    ).first()
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    new_payment = Payment(
        id=generate_id("PAY"),
        invoice_id=payment_data.invoice_id,
        amount=payment_data.amount,
        method=payment_data.method,
        date=payment_data.date,
        user_id=current_user.id
    )
    
    db.add(new_payment)
    db.flush()
    
    # Update invoice status if fully paid
    total_paid = db.query(func.sum(Payment.amount)).filter(
        Payment.invoice_id == payment_data.invoice_id
    ).scalar() or 0.0
    
    if total_paid >= invoice.amount:
        invoice.status = InvoiceStatus.PAID
    
    # Find cash account - must exist (not auto-created)
    cash_account = db.query(Account).filter(
        Account.code == "CASH",
        Account.user_id == current_user.id
    ).first()
    
    if not cash_account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cash account (code: CASH) must be created first. Accounts start empty and only get populated when transactions are added."
        )
    
    # Create ledger entry with payment date (only when transaction is added)
    ledger_entry = LedgerEntry(
        id=generate_id("LED"),
        account_id=cash_account.id,
        date=payment_data.date,  # Use payment date
        description=f"Payment {new_payment.id} for Invoice {payment_data.invoice_id}",
        debit=payment_data.amount,
        credit=0.0,
        balance=cash_account.balance + payment_data.amount,
        reference_type="payment",
        reference_id=new_payment.id,
        user_id=current_user.id
    )
    
    # Update account balance
    cash_account.balance += payment_data.amount
    
    # Also credit AR account if it exists
    ar_account = db.query(Account).filter(
        Account.code == "AR",
        Account.user_id == current_user.id
    ).first()
    
    if ar_account:
        ar_entry = LedgerEntry(
            id=generate_id("LED"),
            account_id=ar_account.id,
            date=payment_data.date,
            description=f"Payment received for Invoice {payment_data.invoice_id}",
            debit=0.0,
            credit=payment_data.amount,
            balance=ar_account.balance - payment_data.amount,
            reference_type="payment",
            reference_id=new_payment.id,
            user_id=current_user.id
        )
        ar_account.balance -= payment_data.amount
        db.add(ar_entry)
    
    db.add(ledger_entry)
    db.commit()
    db.refresh(new_payment)
    
    return new_payment

# Ledger endpoints
@router.get("/ledger", response_model=List[LedgerResponse])
def get_ledger(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get ledger for all accounts - accounts start empty,
    only show entries when transactions with dates are added
    """
    accounts = db.query(Account).filter(Account.user_id == current_user.id).all()
    
    ledger_data = []
    for account in accounts:
        # Get entries for this account (only if transactions were added)
        entries = db.query(LedgerEntry).filter(
            LedgerEntry.account_id == account.id
        ).order_by(LedgerEntry.date).all()
        
        ledger_data.append(LedgerResponse(
            account=AccountResponse(
                id=account.id,
                name=account.name,
                account_type=account.account_type,
                code=account.code,
                balance=account.balance,
                user_id=account.user_id,
                created_at=account.created_at
            ),
            entries=[LedgerEntryResponse(
                id=entry.id,
                account_id=entry.account_id,
                date=entry.date,
                description=entry.description,
                debit=entry.debit,
                credit=entry.credit,
                balance=entry.balance,
                reference_type=entry.reference_type,
                reference_id=entry.reference_id,
                user_id=entry.user_id,
                created_at=entry.created_at
            ) for entry in entries]  # Empty list if no transactions added
        ))
    
    return ledger_data

@router.get("/ledger/{account_id}", response_model=LedgerResponse)
def get_account_ledger(
    account_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get ledger for a specific account - empty by default,
    only populated when transactions with dates are added
    """
    account = db.query(Account).filter(
        Account.id == account_id,
        Account.user_id == current_user.id
    ).first()
    
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    
    # Get entries for this account (only if transactions were added)
    entries = db.query(LedgerEntry).filter(
        LedgerEntry.account_id == account_id
    ).order_by(LedgerEntry.date).all()
    
    return LedgerResponse(
        account=AccountResponse(
            id=account.id,
            name=account.name,
            account_type=account.account_type,
            code=account.code,
            balance=account.balance,
            user_id=account.user_id,
            created_at=account.created_at
        ),
        entries=[LedgerEntryResponse(
            id=entry.id,
            account_id=entry.account_id,
            date=entry.date,
            description=entry.description,
            debit=entry.debit,
            credit=entry.credit,
            balance=entry.balance,
            reference_type=entry.reference_type,
            reference_id=entry.reference_id,
            user_id=entry.user_id,
            created_at=entry.created_at
        ) for entry in entries]  # Empty list if no transactions added
    )

