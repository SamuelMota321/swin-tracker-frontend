import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextPovider } from './providers/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextPovider>
        <App />
      </AppContextPovider>
    </BrowserRouter>
  </StrictMode>,
)
