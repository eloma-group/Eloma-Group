import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { SECTIONS } from './data'

/* Used at build time only: renders the page to HTML so search engines see every section */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
