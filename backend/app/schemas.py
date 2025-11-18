from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from app.models import InvoiceStatus, UserRole

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    role: UserRole
    company: Optional[str]
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

# Accounting Schemas
class InvoiceBase(BaseModel):
    customer: str
    amount: float
    status: InvoiceStatus = InvoiceStatus.PENDING
    date: datetime

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceResponse(InvoiceBase):
    id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PaymentBase(BaseModel):
    invoice_id: str
    amount: float
    method: str
    date: datetime

class PaymentCreate(PaymentBase):
    pass

class PaymentResponse(PaymentBase):
    id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class AccountBase(BaseModel):
    name: str
    account_type: str
    code: str

class AccountCreate(AccountBase):
    pass

class AccountResponse(AccountBase):
    id: str
    balance: float
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class LedgerEntryBase(BaseModel):
    account_id: str
    date: datetime
    description: str
    debit: float = 0.0
    credit: float = 0.0
    reference_type: Optional[str] = None
    reference_id: Optional[str] = None

class LedgerEntryCreate(LedgerEntryBase):
    pass

class LedgerEntryResponse(LedgerEntryBase):
    id: str
    balance: float
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class LedgerResponse(BaseModel):
    """Ledger view with account and entries"""
    account: AccountResponse
    entries: List[LedgerEntryResponse] = []  # Empty by default, only populated when transactions are added

