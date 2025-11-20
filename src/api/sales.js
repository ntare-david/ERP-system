import { apiClient } from './client'

export const salesApi = {
  getProducts: () => apiClient.get('/sales/products'),
  createProduct: (data) =>
    apiClient.post('/sales/products', data),
  updateProduct: (id, data) =>
    apiClient.put(`/sales/products/${id}`, data),

  getOrders: () => apiClient.get('/sales/orders'),
  createOrder: (data) =>
    apiClient.post('/sales/orders', data),

  getPricelists: () => apiClient.get('/sales/pricelists'),
  createPricelist: (data) =>
    apiClient.post('/sales/pricelists', data),
}

