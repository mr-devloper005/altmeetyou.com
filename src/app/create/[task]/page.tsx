"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Eye, Plus, Save, Sparkles } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-white">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF1FF] text-[#2156CC]">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-slate-950">This page is not available</h1>
          <p className="mt-3 text-slate-600">The thing you tried to create is not enabled for this site.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#2156CC] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1a4aad]"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
      </div>
    );
  }

  const filledRequired = formConfig.fields.filter(
    (field) => field.required && (values[field.key] || "").trim().length > 0,
  ).length;
  const totalRequired = formConfig.fields.filter((f) => f.required).length;
  const progress = totalRequired === 0 ? 100 : Math.round((filledRequired / totalRequired) * 100);
  const previewName = values.title || values.brandName || "Your name";
  const previewSummary = values.summary || "Your short bio will appear here.";
  const previewAvatar = values.logo || "/favicon.png";

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const inputClass =
    "h-11 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#2156CC]";
  const textareaClass =
    "w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#2156CC]";

  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl">
            {formConfig.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/90">{formConfig.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full border-0 bg-white/95 px-3 py-1 text-[#2156CC] hover:bg-white">{taskConfig.label}</Badge>
            <Badge className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-white hover:bg-white/20">
              Saved on this device
            </Badge>
          </div>
        </div>
      </section>

      <main className="bg-[#FDF5E6] py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:px-8 lg:items-start">
          {/* Form */}
          <div className="rounded-[20px] border border-slate-200/80 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.06)] sm:p-9">
            {/* Progress */}
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Step 1 of 1</p>
                <p className="mt-1 text-base font-semibold text-slate-950">Fill the details</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Required completed</p>
                <p className="text-base font-semibold text-[#2156CC]">
                  {filledRequired}/{totalRequired}
                </p>
              </div>
            </div>
            <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#2156CC] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid gap-6">
              {formConfig.fields.map((field) => (
                <div key={field.key} className="grid gap-2">
                  <Label className="text-sm font-medium text-slate-700">
                    {field.label} {field.required ? <span className="text-red-500">*</span> : null}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      rows={4}
                      placeholder={field.placeholder || "Add details here…"}
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={textareaClass}
                    />
                  ) : field.type === "category" ? (
                    <select
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option.slug} value={option.slug}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="grid gap-3">
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600 hover:border-[#2156CC] hover:bg-[#EAF1FF]/40">
                        <Plus className="h-5 w-5 text-[#2156CC]" />
                        <span className="font-medium">Click to upload a PDF</span>
                        <span className="text-xs text-slate-500">PDF only, stored on your device</span>
                        <Input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.type !== "application/pdf") {
                              toast({ title: "Invalid file", description: "Please upload a PDF file." });
                              return;
                            }
                            const reader = new FileReader();
                            setUploadingPdf(true);
                            reader.onload = () => {
                              const result = typeof reader.result === "string" ? reader.result : "";
                              updateValue(field.key, result);
                              setUploadingPdf(false);
                              toast({ title: "PDF uploaded", description: "File is stored locally." });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <Input
                        type="text"
                        placeholder="Or paste a PDF URL"
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className={inputClass}
                      />
                      {uploadingPdf ? (
                        <p className="text-xs text-slate-500">Uploading PDF…</p>
                      ) : null}
                    </div>
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      placeholder={
                        field.type === "images" || field.type === "tags" || field.type === "highlights"
                          ? "Separate values with commas"
                          : field.placeholder || ""
                      }
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={inputClass}
                    />
                  )}
                  {field.type === "images" || field.type === "tags" || field.type === "highlights" ? (
                    <p className="text-xs text-slate-500">Tip: separate multiple values with commas.</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-500">By saving you agree to our terms.</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-[10px] border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <Link href={taskConfig.route}>
                    <Eye className="mr-2 h-4 w-4" />
                    View {taskConfig.label}
                  </Link>
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="rounded-[10px] bg-[#2156CC] px-5 text-white shadow-sm hover:bg-[#1a4aad]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Live preview</p>
              <div className="mt-4 overflow-hidden rounded-[14px] border border-slate-100">
                <div className="h-16 bg-[linear-gradient(105deg,#E8D5C4_0%,#c9a88a_45%,#B08968_100%)]" />
                <div className="-mt-9 flex flex-col items-center px-5 pb-5">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewAvatar} alt="" className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-3 line-clamp-1 text-base font-bold text-slate-950">{previewName}</h3>
                  {values.category ? (
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{values.category}</p>
                  ) : null}
                  <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#2156CC]">
                    <BadgeCheck className="h-3.5 w-3.5" /> Public profile
                  </div>
                  <p className="mt-3 line-clamp-3 text-center text-sm leading-6 text-slate-600">{previewSummary}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-slate-200/80 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Tips for a great profile</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  "Use a clear, well-lit photo so visitors recognize you.",
                  "Write a short bio that explains who you are and what you do.",
                  "Add only the links that matter most — quality over quantity.",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2156CC]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border border-slate-200/60 bg-[#0d0d0d] p-6 text-white">
              <Sparkles className="h-5 w-5 text-[#8DB4FF]" />
              <h3 className="mt-3 text-lg font-bold">Need help?</h3>
              <p className="mt-1 text-sm text-slate-300">Browse the support center for quick answers.</p>
              <Link
                href="/help"
                className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Open support <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
