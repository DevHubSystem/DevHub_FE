import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/**
 * Registration form with email + username + password credentials.
 *
 * @param {Object} props
 * @param {(credentials: { email: string, username: string, password: string }) => void} [props.onSubmit]
 * @param {() => void} [props.onSwitchToLogin] - switch to the login page
 */
const RegistrationPage = ({ onSubmit, onSwitchToLogin }) => {
  const [form, setForm] = useState({ email: '', username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Get started with DevHub</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="register-form" onSubmit={handleSubmit} className="grid gap-4 p-4">
          <div className="grid gap-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="register-username">Username</Label>
            <Input
              id="register-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="yourname"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button type="submit" form="register-form" className="w-full">
          Create account
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}

export default RegistrationPage
