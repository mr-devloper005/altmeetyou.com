import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  HelpCircle,
  LifeBuoy,
  Lock,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Support",
  description: "Help articles, FAQs, and quick answers about your public profile.",
};

const primaryBlue = "bg-[#2156CC] hover:bg-[#1a4aad] text-white";

const topics = [
  {
    icon: UserPlus,
    title: "Getting started",
    desc: "Create your account, claim your URL, and publish your first profile in minutes.",
    href: "#getting-started",
  },
  {
    icon: Settings,
    title: "Editing your profile",
    desc: "Update your name, photo, short bio, and the links you want to highlight.",
    href: "#editing",
  },
  {
    icon: Lock,
    title: "Account & sign-in",
    desc: "Manage your email, password, and sessions across devices.",
    href: "#account",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & verification",
    desc: "Control what is public and learn how the verification badge works.",
    href: "#privacy",
  },
  {
    icon: CreditCard,
    title: "Billing & plans",
    desc: "Profiles are free. Optional add-ons and how invoicing works.",
    href: "#billing",
  },
  {
    icon: BookOpen,
    title: "Best practices",
    desc: "Make your link list scannable and write a bio people remember.",
    href: "#best",
  },
];

const faqGroups = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "How do I create my profile?",
        a: "Click Get started, enter your email and password, then add your name, photo, and a short bio. Your profile is public the moment you publish it.",
      },
      {
        q: "Can I pick my own URL?",
        a: "Yes. Your profile URL is based on your username and can be shared anywhere — perfect for your link-in-bio.",
      },
      {
        q: "Is the profile really free?",
        a: "Yes. Creating, editing, and sharing your profile costs nothing.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & sign-in",
    items: [
      {
        q: "How do I sign in?",
        a: "Use the Log in button in the top navigation with the email and password you registered with. Your session is stored on the device you signed in from.",
      },
      {
        q: "I forgot my password — what now?",
        a: "Use the password reset link on the log-in page. We will send a recovery email to your address.",
      },
      {
        q: "How do I sign out?",
        a: "Open the avatar menu in the top right and select Sign Out. This clears your session on the current device.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & verification",
    items: [
      {
        q: "Who can see my profile?",
        a: "Public profiles are visible on the open web. Anything you do not put on your profile stays private.",
      },
      {
        q: "How do verification badges work?",
        a: "Verified badges are awarded to profiles that confirm ownership of linked accounts. Look for the small blue check mark.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing",
    items: [
      {
        q: "Do you charge for profiles?",
        a: "No. The core profile is free. If we ever offer paid add-ons, they will be clearly marked.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">Support</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/95">
            Browse common questions, walk through quick guides, or send us a message. We answer every email.
          </p>

          <form action="/help" className="mt-8 flex max-w-xl items-center gap-2 rounded-[12px] border border-white/40 bg-white/95 p-1.5 shadow-sm">
            <Search className="ml-2 h-4 w-4 text-slate-500" />
            <input
              name="q"
              placeholder="Search help articles…"
              className="h-10 flex-1 bg-transparent px-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button className={`inline-flex h-10 items-center rounded-[8px] px-4 text-sm font-semibold ${primaryBlue}`}>
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl">Browse topics</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={topic.href}
                className="group flex flex-col rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.09)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EAF1FF] text-[#2156CC]">
                  <topic.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{topic.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2156CC]">
                  Read articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">You asked, we answered</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Quick answers to the questions we hear most. Still stuck? Reach out from the panel below.
              </p>
            </div>
            <div className="space-y-10">
              {faqGroups.map((group) => (
                <div key={group.id} id={group.id}>
                  <h3 className="mb-3 text-base font-bold text-slate-950">{group.title}</h3>
                  <Accordion type="single" collapsible className="space-y-3">
                    {group.items.map((item) => (
                      <AccordionItem
                        key={item.q}
                        value={item.q}
                        className="rounded-xl border border-slate-200 bg-white px-5"
                      >
                        <AccordionTrigger className="py-4 text-left text-sm font-semibold text-slate-900 hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm leading-6 text-slate-600">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-[16px] border border-slate-200 bg-white p-7">
            <LifeBuoy className="h-7 w-7 text-[#2156CC]" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">Still need help?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Our team replies to every message — usually within one business day.
            </p>
            <Link href="/contact" className={`mt-5 inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-semibold ${primaryBlue}`}>
              Contact support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
                  </div>
              </section>

      <Footer />
    </div>
  );
}
