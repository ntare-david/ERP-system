'use client'

import { ReactNode, createContext } from 'react'

export const ToastContext = createContext<any>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
