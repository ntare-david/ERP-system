export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
export const APP_NAME = 'ORM Management System'
export const APP_VERSION = '1.0.0'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
}

export const MODULE_ROUTES = {
  ACCOUNTING: '/dashboard/accounting',
  SALES: '/dashboard/sales',
  INVENTORY: '/dashboard/inventory',
  CRM: '/dashboard/crm',
  HR: '/dashboard/hr',
  REPORTS: '/dashboard/reports',
  WORKFLOWS: '/dashboard/workflows',
  SETTINGS: '/dashboard/settings',
}

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
}

export const STATUS_OPTIONS = ['active', 'inactive', 'pending', 'archived']
export const INVOICE_STATUSES = ['paid', 'pending', 'overdue', 'cancelled']
export const ORDER_STATUSES = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled']

