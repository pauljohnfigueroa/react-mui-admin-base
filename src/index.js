import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { AuthContextProvider } from './contexts/AuthContext'
import { UserContextProvider } from './contexts/UserContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProSidebarProvider } from 'react-pro-sidebar'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <ProSidebarProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ProSidebarProvider>
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
