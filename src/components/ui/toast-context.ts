import { createContext } from 'react'

export type ToastVariant = 'success' | 'error'

export const ToastContext = createContext<{ show: (message: string, variant?: ToastVariant) => void } | null>(null)
