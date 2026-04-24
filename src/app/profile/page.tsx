import Link from "next/link";
import { ArrowRight, BadgeCheck, Search, Sparkles, Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { ContentImage } from "@/components/shared/content-image";
import { fetchTaskPosts } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";
import { SITE_CONFIG } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";

export const revalidate = 60;

export const generateMetadata = () =>
  buildTaskMetadata("profile", {
    path: "/profile",
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  });

const primaryBlue = "bg-[#2156CC] hover:bg-[#1a4aad] text-white";

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : [];
  const mediaUrl = media.find((item) => typeof item?.url === "string" && item.url)?.url;
  const contentImage =
    typeof post?.content === "object" && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === "string" && url)
      : null;
  return mediaUrl || contentImage || "/placeholder.svg?height=240&width=240";
}

function getRole(post: SitePost) {
  const c = (post.content || {}) as { headline?: string; role?: string; category?: string };
  return c.headline || c.role || c.category || post.tags?.[0] || "Creator";
}

function ProfileCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/profile/${post.slug}`}
      className="group flex flex-col rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.1)]"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white">
          <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-slate-950">{post.title}</p>
          <p className="truncate text-xs text-slate-500">{getRole(post)}</p>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#2156CC]">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified profile
          </div>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
        {post.summary || "A short bio with the links and details that matter."}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="font-semibold text-[#2156CC]">View profile</span>
        <ArrowRight className="h-4 w-4 text-[#2156CC] transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default async function ProfilePage() {
  const posts = await fetchTaskPosts("profile", 24);
  const featured = posts.slice(0, 3);
  const grid = posts.slice(3);

  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />

      {/* Hero — same brown gradient as home */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">Public profiles</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Meet the people and brands on {SITE_CONFIG.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/95">
            Browse public profiles by name, role, and verified links. Find a creator, a podcaster, a designer — or claim your own
            page in under a minute.
          </p>

          <form action="/profile" className="mt-8 flex max-w-xl items-center gap-2 rounded-[12px] border border-white/40 bg-white/95 p-1.5 shadow-sm">
            <Search className="ml-2 h-4 w-4 text-slate-500" />
            <input
              name="q"
              placeholder="Search profiles by name or role"
              className="h-10 flex-1 bg-transparent px-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button type="submit" className={`inline-flex h-10 items-center rounded-[8px] px-4 text-sm font-semibold ${primaryBlue}`}>
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/create/profile" className={`inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold ${primaryBlue}`}>
              Claim your profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
            >
              How profiles work
            </Link>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Featured this week</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Hand-picked profiles</h2>
            </div>
            <Sparkles className="hidden h-6 w-6 text-[#2156CC] sm:block" />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.length
              ? featured.map((post) => <ProfileCard key={post.id} post={post} />)
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-56 rounded-[16px] border border-slate-200 bg-white" />
                ))}
          </div>
        </div>
      </section>

      {/* Browse */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl">Browse all profiles</h2>
              <p className="mt-1 text-sm text-slate-500">{posts.length} public pages and counting</p>
            </div>
            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
              <Users className="h-4 w-4" /> Open directory
            </div>
          </div>
          {grid.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <ProfileCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[16px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-sm text-slate-500">No more profiles to show yet — check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FDF5E6] py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <BadgeCheck className="h-8 w-8 text-[#2156CC]" />
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-950">Make your identity easy to find.</h2>
          <p className="max-w-xl text-slate-600">A free, public profile with one avatar, one bio, and the links you trust most.</p>
          <Link href="/register" className={`mt-2 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold ${primaryBlue}`}>
            Get started now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
