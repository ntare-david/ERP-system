import { apiClient } from './client'

export const accountingApi = {
  getInvoices: () => apiClient.get('/accounting/invoices'),
  createInvoice: (data) =>
    apiClient.post('/accounting/invoices', data),
  updateInvoice: (id, data) =>
    apiClient.put(`/accounting/invoices/${id}`, data),
  deleteInvoice: (id) => apiClient.delete(`/accounting/invoices/${id}`),

  getPayments: () => apiClient.get('/accounting/payments'),
  recordPayment: (data) =>
    apiClient.post('/accounting/payments', data),
}

