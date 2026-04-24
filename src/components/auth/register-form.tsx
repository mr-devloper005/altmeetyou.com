'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type RegisterFormProps = {
  actionClassName: string
  errorHintClassName: string
}

export function RegisterForm({ actionClassName, errorHintClassName }: RegisterFormProps) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError('Please enter your name, email, and password.')
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
    } catch {
      setError('We could not create your account. Try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      {error ? <p className={cn('text-sm', errorHintClassName)}>{error}</p> : null}
      <input
        className="h-12 rounded-[10px] border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#2156CC]"
        placeholder="Full name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="h-12 rounded-[10px] border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#2156CC]"
        placeholder="Email address"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-12 rounded-[10px] border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#2156CC]"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-[10px] px-6 text-sm font-semibold transition-opacity disabled:opacity-60', actionClassName)}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  )
}
