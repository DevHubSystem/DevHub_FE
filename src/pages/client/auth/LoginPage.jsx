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
 * Login form with email + password credentials.
 *
 * @param {Object} props
 * @param {(credentials: { email: string, password: string }) => void} [props.onSubmit]
 * @param {() => void} [props.onSwitchToRegister] - switch to the registration page
 */
const LoginPage = ({ onSubmit, onSwitchToRegister }) => {
  const [form, setForm] = useState({ email: '', password: '' })

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
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your DevHub account</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit} className="grid gap-4 p-4">
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
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
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button type="submit" form="login-form" className="w-full">
          Sign in
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginPage
