import { useState } from 'react'

import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'
import { useDispatch } from 'react-redux'
import { login } from '@/feature/auth/authSlice.js'
import { useNavigate } from 'react-router-dom'

/**
 * Default page for the client auth section.
 * Renders the login page by default and lets the user switch to registration.
 */
const AuthenticationClientPage = () => {
  const [mode, setMode] = useState('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmitLogin = (formData) => {
    dispatch(login(formData))
    navigate("/home")
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4 shadow-2xl">
      {mode === 'login' ? (
        <LoginPage onSubmit={handleSubmitLogin} onSwitchToRegister={() => setMode('register')} />
      ) : (
        <RegistrationPage onSwitchToLogin={() => setMode('login')} />
      )}
    </div>
  )
}

export default AuthenticationClientPage
