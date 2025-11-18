# ORM Management System - Complete Setup Guide

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- FastAPI backend running (optional for frontend development)

## Step 1: Project Setup

### Clone and Install
\`\`\`bash
# Navigate to project directory
cd orm-management-system

# Install dependencies
npm install
\`\`\`

### Environment Configuration
Create a `.env.local` file in the project root:

\`\`\`env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0
\`\`\`

## Step 2: Development Setup

### Start Development Server
\`\`\`bash
npm run dev
\`\`\`

The application will open at `http://localhost:3000`

### Available Routes

**Public Routes:**
- `/` - Landing page
- `/login` - Login page
- `/signup` - Sign up page
- `/forgot-password` - Password recovery

**Protected Routes (requires authentication):**
- `/dashboard` - Main dashboard
- `/dashboard/accounting/*` - Accounting modules
- `/dashboard/sales/*` - Sales modules
- `/dashboard/inventory/*` - Inventory modules
- `/dashboard/crm/*` - CRM modules
- `/dashboard/hr/*` - HR modules
- `/dashboard/reports` - Reports
- `/dashboard/workflows` - Workflow automation
- `/dashboard/settings` - Settings
- `/dashboard/ai` - AI features
- `/dashboard/website-builder` - Website builder

## Step 3: FastAPI Backend Integration

### Backend Setup Required Endpoints

Ensure your FastAPI backend implements these endpoints:

#### Authentication Endpoints
\`\`\`
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
\`\`\`

#### CRUD Module Endpoints

**Accounting:**
\`\`\`
GET/POST /api/accounting/invoices
GET/POST /api/accounting/payments
GET /api/accounting/ledger
\`\`\`

**Sales:**
\`\`\`
GET/POST /api/sales/products
GET/POST /api/sales/orders
GET/POST /api/sales/pricelists
\`\`\`

**Inventory:**
\`\`\`
GET /api/inventory/stock
GET/POST /api/inventory/moves
GET/POST /api/inventory/picking
\`\`\`

**CRM:**
\`\`\`
GET/POST /api/crm/leads
GET /api/crm/pipeline
GET/POST /api/crm/opportunities
\`\`\`

**HR:**
\`\`\`
GET/POST /api/hr/employees
GET /api/hr/attendance
GET/POST /api/hr/leaves
\`\`\`

### API Request/Response Format

All requests include JWT token:
\`\`\`
Authorization: Bearer <token>
\`\`\`

Response format (standard):
\`\`\`json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin",
    "company": "Company Name"
  }
}
\`\`\`

## Step 4: Component Development

### Using Components

\`\`\`typescript
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'

// Use in your component
<Button>Click me</Button>
\`\`\`

### Creating New Modules

1. Create new component in `src/pages/dashboard/`
2. Add route in `src/pages/dashboard/Dashboard.tsx`
3. Add sidebar menu item in `src/components/Sidebar.tsx`
4. Create API integration in `src/api/`

Example:
\`\`\`typescript
// src/pages/dashboard/NewModule.tsx
import { DataTable } from '@/components/DataTable'

export default function NewModule() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">New Module</h1>
      <DataTable columns={[]} data={[]} />
    </div>
  )
}
\`\`\`

## Step 5: Customization

### Theme Colors

Edit `tailwind.config.ts`:
\`\`\`typescript
colors: {
  primary: '#3b82f6',     // Main brand color
  secondary: '#1e293b',   // Dark backgrounds
  accent: '#a855f7',      // Accent color
  destructive: '#ef4444', // Error/danger
}
\`\`\`

### Typography

Global fonts configured in `src/index.css` - modify for different fonts

### Dark Mode

Dark mode automatically enabled/disabled via theme toggle in topbar

## Step 6: Building for Production

### Create Production Build
\`\`\`bash
npm run build
\`\`\`

### Output
- Build output in `dist/` folder
- Ready to deploy to any static hosting

### Deploy Options
- Vercel (automatic from GitHub)
- Netlify (automatic from GitHub)
- AWS S3 + CloudFront
- Docker container
- Traditional web server (Nginx, Apache)

### Pre-deployment Checklist
- [ ] API endpoint URLs configured
- [ ] JWT token expiry settings correct
- [ ] Error handling tested
- [ ] Dark mode theme working
- [ ] All modules accessible
- [ ] Database migrations completed

## Step 7: Testing & Validation

### Test Login
1. Sign up with test account
2. Verify token stored in localStorage
3. Navigate to protected routes
4. Verify logout functionality

### Test CRUD Operations
1. Create sample data
2. Verify API calls in Network tab
3. Test pagination
4. Verify error handling

### Test Dark Mode
1. Toggle theme in topbar
2. Verify styles updated
3. Check localStorage persistence

## Troubleshooting

### Port Already in Use
\`\`\`bash
# Use different port
npm run dev -- --port 3001
\`\`\`

### API Connection Issues
- Check CORS headers in FastAPI backend
- Verify REACT_APP_API_URL in `.env.local`
- Check backend is running
- Verify API endpoints match specification

### Build Errors
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
\`\`\`

### CSS Not Loading
- Restart dev server
- Clear browser cache
- Verify Tailwind config

## Support

For additional help:
1. Check existing issues in repository
2. Review FastAPI backend documentation
3. Check component documentation in `src/`
4. Review console errors in browser DevTools

## Next Steps

1. Integrate with FastAPI backend
2. Add more validation and error handling
3. Implement caching strategy
4. Add analytics tracking
5. Set up CI/CD pipeline
6. Configure production environment
