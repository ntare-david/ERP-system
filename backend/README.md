# ORM Management System - FastAPI Backend

FastAPI backend for the ORM Management System with accounting features.

## Features

- **Authentication**: JWT-based authentication with user management
- **Accounting**: Invoices, Payments, and Ledger management
- **Accounts**: Accounts start empty and only get populated when transactions with dates are added
- **Database**: SQLite (can be easily switched to PostgreSQL)

## Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional):
```env
DATABASE_URL=sqlite:///./orm_management.db
SECRET_KEY=your-secret-key-here
```

### Running the Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Accounting

#### Accounts
- `GET /api/accounting/accounts` - Get all accounts (starts empty)
- `POST /api/accounting/accounts` - Create a new account

#### Invoices
- `GET /api/accounting/invoices` - Get all invoices
- `POST /api/accounting/invoices` - Create a new invoice (automatically creates ledger entry with date)
- `PUT /api/accounting/invoices/{invoice_id}` - Update an invoice
- `DELETE /api/accounting/invoices/{invoice_id}` - Delete an invoice

#### Payments
- `GET /api/accounting/payments` - Get all payments
- `POST /api/accounting/payments` - Record a payment (automatically creates ledger entry with date)

#### Ledger
- `GET /api/accounting/ledger` - Get ledger for all accounts (empty by default, only shows entries when transactions are added)
- `GET /api/accounting/ledger/{account_id}` - Get ledger for a specific account

## Account System

**Key Feature**: Accounts start completely empty and only get populated when transactions with dates are added.

- **Accounts must be created manually first** - they are NOT auto-created when invoices/payments are created
- When you create an account via `POST /api/accounting/accounts`, it has:
  - Balance of 0.0
  - NO ledger entries (empty list)
- Ledger entries are only created when:
  - An invoice is created (requires AR account to exist first, creates entry with invoice date)
  - A payment is recorded (requires CASH account to exist first, creates entry with payment date)
- The ledger endpoint returns accounts with empty entry lists until transactions are added
- Each ledger entry requires a date, ensuring accounts only show data when actual transactions occur

### Important Notes:
- Before creating invoices, you must first create an "Accounts Receivable" account with code "AR"
- Before creating payments, you must first create a "Cash" account with code "CASH"
- If you try to create an invoice/payment without the required account, you'll get an error message

## Database

The default database is SQLite (`orm_management.db`). To use PostgreSQL:

1. Update `DATABASE_URL` in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/orm_management
```

2. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

## Development

The server runs with auto-reload enabled. Any changes to the code will automatically restart the server.

## Testing

You can test the API using the Swagger UI at `http://localhost:8000/docs` or using tools like Postman or curl.

Example login request:
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

