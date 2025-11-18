# ORM Management System - React Frontend

Complete business management platform built with React, featuring accounting, sales, inventory, CRM, and HR modules with AI-powered features.

## Features

- **Authentication**: Secure login, signup, and password reset flows
- **Admin Dashboard**: Real-time KPIs, charts, and activity logs
- **Business Modules**:
  - Accounting (Invoices, Payments, Ledger)
  - Sales (Products, Pricelists, Orders)
  - Inventory (Stock Levels, Moves, Picking)
  - CRM (Leads, Pipeline, Opportunities)
  - HR (Employees, Attendance, Leaves)
- **Advanced Features**:
  - Workflow Automation Builder
  - Advanced Reporting Interface
  - Multi-company Selector
  - Multi-language Support
- **AI Features**: Summaries, Email Generator, Sales Forecasting, Inventory Prediction
- **Website Builder**: Drag-and-drop editor with templates
- **Dark/Light Mode**: Full theme support
- **Role-based Access**: Admin, Manager, User roles

## Prerequisites

- Node.js 16+ and npm/yarn
- FastAPI backend running on `http://localhost:8000`

## Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env.local` file:
\`\`\`
REACT_APP_API_URL=http://localhost:8000/api
\`\`\`

## Development

Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The app will open at `http://localhost:3000`

## Build

Create a production build:
\`\`\`bash
npm run build
\`\`\`

Preview the build:
\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── api/              # API client and endpoints
├── components/       # Reusable React components
├── contexts/         # React Context for state management
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── dashboard/   # Dashboard modules
│   └── auth/        # Authentication pages
├── utils/           # Utility functions
├── App.tsx          # Main app component
├── index.tsx        # Entry point
└── index.css        # Global styles
\`\`\`

## API Integration

The frontend connects to a FastAPI backend. Update API endpoints in `src/api/`:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Reset password with token

### Accounting
- `GET/POST /accounting/invoices` - Manage invoices
- `GET/POST /accounting/payments` - Manage payments
- `GET /accounting/ledger` - View ledger

### Sales
- `GET/POST /sales/products` - Manage products
- `GET/POST /sales/orders` - Manage sales orders
- `GET/POST /sales/pricelists` - Manage pricelists

### Inventory
- `GET /inventory/stock` - Stock levels
- `GET/POST /inventory/moves` - Stock movements
- `GET/POST /inventory/picking` - Stock picking

### CRM
- `GET/POST /crm/leads` - Manage leads
- `GET /crm/pipeline` - Sales pipeline
- `GET/POST /crm/opportunities` - Manage opportunities

### HR
- `GET/POST /hr/employees` - Manage employees
- `GET /hr/attendance` - Attendance records
- `GET/POST /hr/leaves` - Leave requests

## Theme Customization

Edit Tailwind colors in `tailwind.config.ts`:
\`\`\`typescript
colors: {
  primary: '#3b82f6',
  secondary: '#1e293b',
  accent: '#a855f7',
}
\`\`\`

## Authentication Flow

1. User logs in at `/login`
2. JWT token stored in localStorage
3. Token automatically included in API requests via Axios interceptor
4. Token expiry redirects to login page
5. User context available via `useAuth()` hook

## Deployment

Build and deploy to your hosting platform:

\`\`\`bash
npm run build
# Upload dist/ folder to your hosting
\`\`\`

Environment variables can be set via `.env.local` or platform-specific configuration.

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please contact support or open an issue in the repository.
