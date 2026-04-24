import Link from 'next/link'
import { ArrowRight, BadgeCheck, Check } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { ProfileFaqSection } from '@/components/home/profile-faq-section'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'

const primaryBlue = 'bg-[#2156CC] hover:bg-[#1a4aad] text-white'
const brandNames = ['WordPress', 'GitHub', 'Slack', 'OpenAI', 'Atlassian', 'Figma', 'Mailchimp', 'Stack Overflow', 'Coinbase']

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=200&width=200'
}

function MockProfileCard({
  className,
  name,
  role,
  bio,
  image,
  offset,
}: {
  className?: string
  name: string
  role: string
  bio: string
  image: string
  offset?: string
}) {
  return (
    <div
      className={cn(
        'relative w-full max-w-[280px] rounded-[12px] border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)]',
        offset,
        className,
      )}
    >
      <div className="mx-auto flex w-20 justify-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <ContentImage src={image} alt={name} fill className="object-cover" />
        </div>
      </div>
      <h3 className="mt-4 text-center text-lg font-bold text-slate-950">{name}</h3>
      <p className="text-center text-sm text-slate-500">{role}</p>
      <div className="mt-2 flex items-center justify-center gap-1">
        <BadgeCheck className="h-5 w-5 text-[#2156CC]" aria-hidden />
        <span className="text-xs text-slate-400">Verified</span>
      </div>
      <p className="mt-3 text-center text-sm leading-6 text-slate-600">{bio}</p>
      <div className="mt-4 grid gap-2">
        <button type="button" className="rounded-lg border border-slate-200 py-2 text-sm font-medium text-amber-700/90">
          Contact
        </button>
        <button type="button" className="rounded-lg border border-slate-200 py-2 text-sm font-medium text-amber-700/90">
          Pay
        </button>
      </div>
    </div>
  )
}

type ProfileLandingProps = { profilePosts: SitePost[] }

export function ProfileLanding({ profilePosts }: ProfileLandingProps) {
  const featured = profilePosts.slice(0, 2)
  const cardA = featured[0]
  const cardB = featured[1]
  const heroA = {
    name: cardA?.title || 'Ethan Clark',
    role: (cardA?.content as { headline?: string })?.headline || 'Creator',
    bio: cardA?.summary || 'One avatar and bio, synced to the places you already use online.',
    image: cardA ? getPostImage(cardA) : '/placeholder.svg?height=200&width=200',
  }
  const heroB = {
    name: cardB?.title || 'Mia Torres',
    role: (cardB?.content as { headline?: string })?.headline || 'Podcaster',
    bio: cardB?.summary || 'Share your story, links, and contact options from a single profile card.',
    image: cardB ? getPostImage(cardB) : '/placeholder.svg?height=200&width=200',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Your free profile
              <br />
              for the web
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/95 sm:text-lg">
              {siteContent.profileLanding.heroSubtext}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className={cn('inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold shadow-sm', primaryBlue)}
              >
                Get started now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
              >
                Browse profiles
              </Link>
            </div>
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              <MockProfileCard {...heroA} offset="lg:translate-x-0 z-20" className="z-20" />
              <div className="hidden lg:absolute lg:bottom-8 lg:right-0 lg:block lg:translate-x-4 lg:translate-y-4">
                <MockProfileCard {...heroB} className="!max-w-[260px] scale-95 opacity-95" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-b border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Trusted across the open web</p>
          <div className="mt-8 flex flex-wrap items-end justify-center gap-8 sm:gap-10 md:gap-12">
            {brandNames.map((name) => (
              <div key={name} className="flex min-w-[72px] flex-col items-center text-center">
                <span className="text-sm font-semibold text-slate-300 grayscale">{name[0]}</span>
                <span className="mt-1 text-xs font-medium text-slate-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Update once */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#111] sm:text-5xl">
              Update once.
              <br />
              Sync everywhere.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#555]">
              When you refresh your profile or photo, connected surfaces can reflect your latest identity without juggling dozens of
              logins. Save time and stay consistent.
            </p>
          </div>
          <div className="relative h-[min(420px,50vh)] w-full max-w-lg justify-self-end">
            <div className="absolute left-0 top-0 z-0 h-40 w-56 overflow-hidden rounded-xl border border-slate-200 bg-sky-600/90 shadow-lg">
              <div className="p-2 text-xs font-bold text-white">Sync preview</div>
              <div className="mt-1 grid h-24 grid-cols-3 gap-1 px-1">
                {['A', 'B', 'C'].map((c) => (
                  <div key={c} className="rounded-md bg-sky-500/40" />
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-8 z-20 h-56 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
              <div className="h-7 bg-slate-100" />
              <div className="flex items-center justify-center p-4">
                <div className="h-32 w-32 overflow-hidden rounded-full">
                  <ContentImage src={heroA.image} alt="Profile" width={128} height={128} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-4 z-30 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
              <div className="h-3 bg-[#4A154B]" />
              <div className="flex gap-2 p-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                  <ContentImage src={heroA.image} alt="" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-2 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your profile your way — cream */}
      <section className="bg-[#FDF5E6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex max-w-md rounded-full border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
                {SITE_CONFIG.domain}/yourname
              </div>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[20px] border border-slate-200/60 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
                <div className="h-20 bg-gradient-to-b from-slate-300/80 to-slate-200" />
                <div className="-mt-10 flex flex-col items-center px-5 pb-6">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
                    <ContentImage src={heroA.image} alt={heroA.name} width={80} height={80} className="object-cover" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-950">{heroA.name}</h3>
                  <p className="text-sm text-slate-500">Your city</p>
                  <div className="mt-2 flex items-center gap-1">
                    <BadgeCheck className="h-4 w-4 text-[#2156CC]" />
                    <span className="text-xs text-slate-500">Public profile</span>
                  </div>
                  <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                    {heroA.bio} Build trust with a short story and the links that matter to your audience.
                  </p>
                  <div className="mt-4 flex w-full gap-2">
                    <span className="flex-1 rounded-lg border border-amber-700/20 py-2 text-center text-sm font-medium text-amber-800">
                      Contact
                    </span>
                    <span className="flex-1 rounded-lg border border-amber-700/20 py-2 text-center text-sm font-medium text-amber-800">
                      Pay
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Your profile, your way</h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  Put social links, portfolio, and a short bio in one place. Perfect as a link-in-bio: simple, legible, and easy to
                  keep fresh.
                </p>
                <Link href="/create/profile" className={cn('mt-8 inline-flex w-fit items-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold', primaryBlue)}>
                  Claim your free profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers dark */}
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-1 shadow-2xl">
              <div className="flex border-b border-white/10 text-xs">
                <span className="border-b-2 border-white/40 px-4 py-2 text-slate-200">profile.json</span>
                <span className="px-4 py-2 text-slate-500">types.ts</span>
              </div>
              <pre className="overflow-x-auto p-4 text-left text-xs leading-6 text-slate-200">
                <code>
                  {`{
  "id": "public",
  "name": "${heroA.name}",
  "avatar": "https://…",
  "verified": true,
  "links": [ "site", "social" ]
}`}
                </code>
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Profiles for builders</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">For developers</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Expose a stable profile object for your own apps, themes, and integrations. Start from the public profile model and
                grow from there.
              </p>
              <Link
                href="/developers"
                className="mt-8 inline-flex items-center gap-2 rounded-[10px] border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn more about our APIs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProfileFaqSection />

      <section className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <Check className="mx-auto h-8 w-8 text-[#2156CC]" />
          <h2 className="mt-4 text-2xl font-bold text-slate-950">Ready to publish your profile?</h2>
          <p className="mt-2 text-slate-600">Join {SITE_CONFIG.name} and get a public page in minutes.</p>
          <Link
            href="/register"
            className={cn('mt-6 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold', primaryBlue)}
          >
            Get started now
          </Link>
        </div>
      </section>
    </div>
  )
}
