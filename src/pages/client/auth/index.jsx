import { useState } from 'react'

import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

/**
 * Default page for the client auth section.
 * Renders the login page by default and lets the user switch to registration.
 */
const AuthenticationClientPage = () => {
  const [mode, setMode] = useState('login')


  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4 shadow-2xl">
      {mode === 'login' ? (
        <LoginPage onSwitchToRegister={() => setMode('register')} />
      ) : (
        <RegistrationPage onSwitchToLogin={() => setMode('login')} />
      )}
    </div>
  )
}

export default AuthenticationClientPage
