import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* The production build ships pre-rendered HTML; dev starts empty */
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
