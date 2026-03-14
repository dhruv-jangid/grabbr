import './assets/index.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Providers } from './components/providers'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
    <Toaster />
  </Providers>
)
