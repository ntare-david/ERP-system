import { apiClient } from './client'

export interface Invoice {
  id: string
  customer: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  date: string
}

export interface Payment {
  id: string
  invoice_id: string
  amount: number
  method: string
  date: string
}

export const accountingApi = {
  getInvoices: () => apiClient.get<Invoice[]>('/accounting/invoices'),
  createInvoice: (data: Omit<Invoice, 'id'>) =>
    apiClient.post<Invoice>('/accounting/invoices', data),
  updateInvoice: (id: string, data: Partial<Invoice>) =>
    apiClient.put<Invoice>(`/accounting/invoices/${id}`, data),
  deleteInvoice: (id: string) => apiClient.delete(`/accounting/invoices/${id}`),

  getPayments: () => apiClient.get<Payment[]>('/accounting/payments'),
  recordPayment: (data: Omit<Payment, 'id'>) =>
    apiClient.post<Payment>('/accounting/payments', data),
}
