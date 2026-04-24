import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Github, Key, Layers, Sparkles, Terminal, Webhook, Zap } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "For developers",
  description: "Build with public profile data — endpoints, SDKs, and quick-start examples.",
};

const primaryBlue = "bg-[#2156CC] hover:bg-[#1a4aad] text-white";

const features = [
  {
    icon: Zap,
    title: "Fast public endpoints",
    desc: "Read public profile data with cache-friendly responses optimized for edge delivery.",
  },
  {
    icon: Layers,
    title: "Stable JSON shape",
    desc: "A predictable model for name, avatar, links, and verification you can build against.",
  },
  {
    icon: Webhook,
    title: "Webhooks (preview)",
    desc: "Subscribe to profile updates and stay in sync with your own systems.",
  },
  {
    icon: Key,
    title: "Bring-your-own auth",
    desc: "Drop our profile widget into existing apps without changing your sign-in flow.",
  },
];

const steps = [
  { n: "01", title: "Create your account", body: "Sign up and grab your handle. You will use it to test the public profile endpoint." },
  { n: "02", title: "Read the JSON", body: "Hit the public endpoint and inspect the profile shape — name, avatar, verified, links." },
  { n: "03", title: "Render in your app", body: "Use the snippet in any React, Vue, or vanilla project. SSR friendly out of the box." },
];

const codeFetch = `// fetch a public profile (no auth required)
const res = await fetch('https://altmeetyou.com/api/profile/aditya');
const profile = await res.json();

console.log(profile.name);     // "Aditya"
console.log(profile.verified); // true
console.log(profile.links);    // [{ label, url }, ...]`;

const codeReact = `import { useEffect, useState } from 'react';

export function ProfileCard({ handle }) {
  const [p, setP] = useState(null);

  useEffect(() => {
    fetch(\`/api/profile/\${handle}\`)
      .then((r) => r.json())
      .then(setP);
  }, [handle]);

  if (!p) return null;
  return (
    <a href={p.url} className="card">
      <img src={p.avatar} alt={p.name} />
      <h3>{p.name}</h3>
      <p>{p.bio}</p>
    </a>
  );
}`;

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">Profiles for builders</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Build with public profile data.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/95">
              A small, well-shaped JSON object for the open web. Drop it into your app, your community, or your link-in-bio
              integration in a couple of lines.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#quickstart" className={`inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold ${primaryBlue}`}>
                Read the quick start
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
              >
                <Github className="h-4 w-4" /> View on GitHub
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d0d] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="ml-3">profile.json</span>
            </div>
            <pre className="overflow-x-auto p-5 text-left text-[13px] leading-6 text-slate-200">
              <code>{`{
  "handle": "aditya",
  "name": "Aditya",
  "avatar": "https://altmeetyou.com/u/aditya.png",
  "bio": "Building tiny tools for the open web.",
  "verified": true,
  "links": [
    { "label": "Site",   "url": "https://example.com" },
    { "label": "GitHub", "url": "https://github.com/aditya" }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl">What you get</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            A focused surface area designed to stay stable and easy to use across versions.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EAF1FF] text-[#2156CC]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-950">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section id="quickstart" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Quick start</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">From zero to a profile card in 3 steps.</h2>
              <ol className="mt-8 space-y-6">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#2156CC] text-sm font-bold text-white">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-base font-bold text-slate-950">{s.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0d0d0d] shadow-lg">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-xs text-slate-400">
                  <Terminal className="h-3.5 w-3.5" /> fetch.js
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-slate-200">
                  <code>{codeFetch}</code>
                </pre>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#0d0d0d] shadow-lg">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-xs text-slate-400">
                  <Code2 className="h-3.5 w-3.5" /> ProfileCard.jsx
                </div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-slate-200">
                  <code>{codeReact}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl">Resources</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "API reference", desc: "Endpoints, fields, and example responses.", href: "#" },
              { icon: Sparkles, title: "Recipes", desc: "Common patterns: link-in-bio, sidebar widgets, embeds.", href: "#" },
              { icon: Github, title: "Open source samples", desc: "Starter projects you can clone in seconds.", href: "https://github.com" },
            ].map((r) => (
              <a
                key={r.title}
                href={r.href}
                className="group rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition-transform hover:-translate-y-0.5"
              >
                <r.icon className="h-6 w-6 text-[#2156CC]" />
                <h3 className="mt-4 text-base font-bold text-slate-950">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2156CC]">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-[-0.03em]">Ship your first integration today.</h2>
          <p className="text-slate-300">Create an account to grab your handle, then you are one fetch call away.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/register" className={`inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold ${primaryBlue}`}>
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-[10px] border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
