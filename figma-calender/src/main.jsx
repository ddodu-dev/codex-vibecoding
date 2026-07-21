import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Calendar from './Calendar'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="demo-shell">
      <Calendar />
    </main>
  </StrictMode>,
)
