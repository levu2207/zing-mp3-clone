import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import store, { persistor } from './redux/store'
import reportWebVitals from './reportWebVitals'

import '@fortawesome/fontawesome-free/css/all.css'
import 'antd/dist/antd.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './tailwind.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './assets/css/responsive.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ToastContainer autoClose={3000} theme="colored" />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
