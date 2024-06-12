import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Leva } from 'leva'

import App from './App.jsx'

import './global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Leva hidden />
  </StrictMode>
)
