'use client'

import { createContext } from 'react'

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  return <>{children}</>
}

