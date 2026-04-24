'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const faqItems = [
  {
    q: 'Is my profile free?',
    a: 'Yes. Create a public profile, add your photo and bio, and connect links at no cost.',
  },
  {
    q: 'Can I use a custom link?',
    a: 'You can share your public profile URL from the browse directory. Custom domains depend on your deployment and DNS setup.',
  },
  {
    q: 'How do I update my photo everywhere?',
    a: 'Update your avatar in one place. Connected apps and pages that read your profile will pick up changes on their next sync.',
  },
  {
    q: 'What can I add to my profile?',
    a: 'Name, title, short bio, verified links, and external destinations such as a portfolio or store.',
  },
]

type ProfileFaqSectionProps = { className?: string }

export function ProfileFaqSection({ className }: ProfileFaqSectionProps) {
  return (
    <section className={cn('bg-[#f4f4f2] py-20', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#111] sm:text-4xl">You asked, we answered</h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="rounded-xl border border-[#e5e5e2] bg-white px-5 shadow-sm data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-[#111] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-[#555]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
