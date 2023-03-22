import { Routes, Route, Navigate } from 'react-router-dom'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Dashboard from './scenes/dashboard/Dashboard.component'
import Users from './scenes/users/Users.component'

import { UsersProvider } from './contexts/users.context'

import Layout from './components/layout/Layout.component'
import LoginForm from './scenes/login/LoginForm.component'
import Missing from './components/missing/Missing.component'

import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const [theme, colorMode] = useMode()

  const { user } = useAuthContext()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UsersProvider>
          <Routes>
            <Route path="/" element={user ? <Navigate to='/dashboard' /> : <LoginForm />} />
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/users" element={user ? <Users /> : <Navigate to="/" />} />
            </Route>
            <Route path="*" element={<Missing />} />
          </Routes>
        </UsersProvider>
      </ThemeProvider >
    </ColorModeContext.Provider >
  )
}

export default App
