import App from 'App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
