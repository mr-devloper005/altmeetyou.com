import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Link-in-bio and public identity',
  },
  footer: {
    tagline: 'Public profiles, verified links, one place to update',
  },
  hero: {
    badge: 'Public profiles',
    title: ['A simple home for', 'your link-in-bio and identity.'],
    description: 'Build one profile, show your best links, and make it easy for people to know who you are and where to go next.',
    primaryCta: {
      label: 'Get started',
      href: '/register',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search public profiles and names',
    focusLabel: 'Focus',
    featureCardBadge: 'Public page',
    featureCardTitle: 'One place to list your important links and story.',
    featureCardDescription: 'Update your details once, then point visitors to the destinations you care about most.',
  },
  home: {
    metadata: {
      title: 'Public profiles and link-in-bio',
      description: 'Build a free profile, share your links, and keep your identity easy to find across the web.',
      openGraphTitle: 'Your profile for the web',
      openGraphDescription: 'Create a public profile, add a photo and bio, and point visitors to the links that matter.',
      keywords: ['profile', 'link in bio', 'public page', 'creator page', 'identity', 'altmeetyou'],
    },
    introBadge: 'About the platform',
    introTitle: 'Public profiles, clear story, the links you choose.',
    introParagraphs: [
      'The platform is built around a single, portable identity: your photo, short introduction, and the places you want people to visit.',
      'Visitors find you through browse and search, then get a legible, mobile-friendly page you control.',
      'We focus the experience on that profile so there is no clutter from unrelated product categories.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'A calm homepage that shows how a modern profile and link list should look.',
      'Emphasis on trust signals and clear calls to action visitors can use immediately.',
      'A navigation model centered on profiles, support, and your account.',
      'Lightweight, fast pages that work well on small screens first.',
    ],
    primaryLink: {
      label: 'Browse profiles',
      href: '/profile',
    },
    secondaryLink: {
      label: 'Create your page',
      href: '/register',
    },
  },
  cta: {
    badge: 'Start with your profile',
    title: 'Create a public profile and share your best links in one place.',
    description: 'Set your photo, short bio, and the destinations you want people to use — from portfolio to store to social.',
    primaryCta: {
      label: 'Get started free',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  profileLanding: {
    heroSubtext:
      'Transform your public identity into a simple page — one avatar, one bio, social connections, and verified links.',
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the public identity of a creator, brand, or person and make it easy to add a short story plus the links that matter most.',
      'Use your profile as a home base for the web: link to your work, your shop, or your other profiles from one place.',
      'Browse the directory to discover people and organizations, or sign in to manage your own public page from the dashboard.',
    ],
    links: [
      { label: 'Get started', href: '/register' },
      { label: 'Help and support', href: '/help' },
      { label: 'For developers', href: '/developers' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
