'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Sparkles, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const primaryBlue = 'bg-[#2156CC] hover:bg-[#1a4aad] text-white'

const lanes = [
  {
    icon: User,
    title: 'Profile and account',
    body: 'Help with your public page, links, sign-in, and account settings.',
    badge: 'Avg. reply: a few hours',
  },
  {
    icon: MessageSquare,
    title: 'Partnerships',
    body: 'Integrations, media, and collaboration opportunities.',
    badge: 'Avg. reply: 1 business day',
  },
  {
    icon: Sparkles,
    title: 'Product feedback',
    body: 'Ideas for the profile experience and what you want to see next.',
    badge: 'We read everything',
  },
]

const reasons = [
  'General question',
  'Profile or account help',
  'Partnership or media',
  'Bug or feedback',
] as const

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">Contact us</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Talk to a human at {SITE_CONFIG.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/95">
            Tell us what you are working on, what is broken, or what you would love to see — we read every message.
          </p>
        </div>
      </section>

      {/* Lanes + form */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          {/* Lanes */}
          <div className="space-y-5">
            {lanes.map((lane) => (
              <div key={lane.title} className="rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF1FF] text-[#2156CC]">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-slate-950">{lane.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{lane.body}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      <Clock className="h-3 w-3" /> {lane.badge}
                    </div>
                  </div>
                </div>
              </div>
            ))}

                      </div>

          {/* Form */}
          <div className="rounded-[20px] border border-slate-200/80 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.06)]">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <h2 className="text-2xl font-bold text-slate-950">Message sent</h2>
                <p className="max-w-sm text-sm text-slate-600">
                  Thanks for reaching out. We will reply to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className={`mt-2 inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-semibold ${primaryBlue}`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-950">Send us a message</h2>
                <p className="mt-1 text-sm text-slate-500">We typically reply within a business day.</p>

                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">
                      <span className="mb-1 block font-medium text-slate-700">Your name</span>
                      <input
                        required
                        name="name"
                        className="h-11 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#2156CC]"
                        placeholder="Aditya"
                      />
                    </label>
                    <label className="text-sm">
                      <span className="mb-1 block font-medium text-slate-700">Email</span>
                      <input
                        required
                        type="email"
                        name="email"
                        className="h-11 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#2156CC]"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">What is this about?</span>
                    <select
                      name="reason"
                      className="h-11 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#2156CC]"
                    >
                      {reasons.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-slate-700">Your message</span>
                    <textarea
                      required
                      name="message"
                      className="min-h-[160px] w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#2156CC]"
                      placeholder="Share as much detail as you can so we can help quickly."
                    />
                  </label>
                  <button
                    type="submit"
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-semibold ${primaryBlue}`}
                  >
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Help nudge */}
      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl">Looking for a quick answer?</h2>
          <p className="max-w-xl text-sm text-slate-600">
            Most questions are answered in our help center. Browse common topics and FAQs first — you might find the answer in a
            few seconds.
          </p>
          <Link href="/help" className="mt-2 inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#2156CC] hover:bg-slate-50">
            Visit support center
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
