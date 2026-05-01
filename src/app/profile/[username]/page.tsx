import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  // Mock stats for profile (would come from real data in production)
  const following = 0;
  const followers = 3 + Math.floor(Math.random() * 2); // Random 3-4 followers

  return (
    <div className="min-h-screen bg-[#2d3436]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        {/* Profile Header Card */}
        <section className="rounded-xl bg-[#363d3f] p-6 sm:p-8">
          {/* Top Row: Avatar + Name + Follow Button */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#4a5255] bg-[#4a0e0e] sm:h-28 sm:w-28">
                {logoUrl ? (
                  <ContentImage 
                    src={logoUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover" 
                    sizes="112px" 
                    intrinsicWidth={112} 
                    intrinsicHeight={112} 
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-sm font-medium text-white/90">
                    {brandName.toLowerCase()}
                  </div>
                )}
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 pt-1">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{brandName}</h1>
                
                {/* Stats Row */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#a0a8ab]">
                  <span className="flex items-center gap-1">
                    <span className="text-[#74b9ff] font-medium">{following}</span>
                    <span className="text-[#a0a8ab]">Following</span>
                  </span>
                  <span className="text-[#636e72]">|</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#74b9ff] font-medium">{followers}</span>
                    <span className="text-[#a0a8ab]">Followers</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Follow Button - redirects to login */}
            <Button 
              asChild
              className="h-8 rounded-md bg-[#00b894] px-4 text-sm font-medium text-white hover:bg-[#00a383] sm:h-9"
            >
              <Link href="/login">Follow</Link>
            </Button>
          </div>
          
          {/* Description */}
          <article
            className="mt-5 text-[#dfe6e9] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          
          {/* Website Link */}
          {website && (
            <div className="mt-4">
              <Link 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#74b9ff] hover:text-[#a29bfe] hover:underline transition-colors"
              >
                {website}
              </Link>
            </div>
          )}
        </section>

        {/* Tabs Section */}
        <section className="mt-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#363d3f] p-1">
              <TabsTrigger 
                value="posts" 
                className={cn(
                  "flex items-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all",
                  "data-[state=active]:bg-[#00b894] data-[state=active]:text-white",
                  "data-[state=inactive]:text-[#a0a8ab] data-[state=inactive]:hover:text-white"
                )}
              >
                <FileText className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="comments"
                className={cn(
                  "flex items-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all",
                  "data-[state=active]:bg-[#00b894] data-[state=active]:text-white",
                  "data-[state=inactive]:text-[#a0a8ab] data-[state=inactive]:hover:text-white"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                Comments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-4">
              {/* Empty Posts State */}
              <div className="rounded-lg bg-[#2f3638] py-12 text-center">
                <p className="text-[#a0a8ab]">User don&apos;t have published posts</p>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="mt-4">
              {/* Empty Comments State */}
              <div className="rounded-lg bg-[#2f3638] py-12 text-center">
                <p className="text-[#a0a8ab]">No comments yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Suggested Articles */}
        {suggestedArticles.length ? (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-[#74b9ff] hover:text-[#a29bfe] hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
