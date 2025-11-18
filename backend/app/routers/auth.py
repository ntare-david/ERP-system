from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserRole
from app.schemas import LoginRequest, SignupRequest, AuthResponse, UserResponse
from app.auth import verify_password, get_password_hash, create_access_token
import secrets

router = APIRouter()

@router.post("/login", response_model=AuthResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Login endpoint"""
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    access_token = create_access_token(data={"sub": user.id})
    
    return AuthResponse(
        token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            role=user.role,
            company=user.company
        )
    )

@router.post("/signup", response_model=AuthResponse)
def signup(user_data: SignupRequest, db: Session = Depends(get_db)):
    """Signup endpoint"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = f"user_{secrets.token_urlsafe(12)}"
    hashed_password = get_password_hash(user_data.password)
    
    new_user = User(
        id=user_id,
        email=user_data.email,
        hashed_password=hashed_password,
        name=user_data.name,
        role=UserRole.USER,
        company=None
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.id})
    
    return AuthResponse(
        token=access_token,
        user=UserResponse(
            id=new_user.id,
            email=new_user.email,
            name=new_user.name,
            role=new_user.role,
            company=new_user.company
        )
    )

@router.post("/logout")
def logout():
    """Logout endpoint (client-side token removal)"""
    return {"message": "Logged out successfully"}

@router.post("/forgot-password")
def forgot_password(email: str):
    """Forgot password endpoint (placeholder)"""
    # In production, send password reset email
    return {"message": "If the email exists, a password reset link has been sent"}

@router.post("/reset-password")
def reset_password(token: str, password: str):
    """Reset password endpoint (placeholder)"""
    # In production, verify token and reset password
    return {"message": "Password reset successfully"}

