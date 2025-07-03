import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './app/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css'; // ✅ REQUIRED for message UI



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      

      <Provider store={store}>
        
    
      <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
