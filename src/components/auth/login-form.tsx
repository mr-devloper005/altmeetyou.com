'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type LoginFormProps = {
  actionClassName: string
  errorHintClassName: string
}

export function LoginForm({ actionClassName, errorHintClassName }: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }
    try {
      await login(email.trim(), password)
      router.push('/')
    } catch {
      setError('We could not sign you in. Try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      {error ? <p className={cn('text-sm', errorHintClassName)}>{error}</p> : null}
      <input
        className="h-12 rounded-[10px] border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none ring-0 focus:border-[#2156CC]"
        placeholder="Email address"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-12 rounded-[10px] border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#2156CC]"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-[10px] px-6 text-sm font-semibold transition-opacity disabled:opacity-60', actionClassName)}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
