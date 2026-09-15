import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { ToastProvider } from '@/components/ui/Toast'
import { AppDataProvider } from '@/store/AppDataContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AppDataProvider>
          <App />
        </AppDataProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
