import { apiClient } from './client'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

export interface SalesOrder {
  id: string
  customer: string
  total: number
  status: string
  date: string
}

export const salesApi = {
  getProducts: () => apiClient.get<Product[]>('/sales/products'),
  createProduct: (data: Omit<Product, 'id'>) =>
    apiClient.post<Product>('/sales/products', data),
  updateProduct: (id: string, data: Partial<Product>) =>
    apiClient.put<Product>(`/sales/products/${id}`, data),

  getOrders: () => apiClient.get<SalesOrder[]>('/sales/orders'),
  createOrder: (data: Omit<SalesOrder, 'id'>) =>
    apiClient.post<SalesOrder>('/sales/orders', data),
}
