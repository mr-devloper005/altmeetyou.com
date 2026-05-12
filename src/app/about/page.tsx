import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  {
    title: "One profile, all key links",
    description: "Add your bio, social presence, and important links in one clean public page.",
  },
  {
    title: "Built for clarity",
    description: "The experience stays simple so visitors immediately understand who you are and where to go next.",
  },
  {
    title: "Easy to update",
    description: "Update your profile once and keep your public identity consistent everywhere you share it.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a public profile and link-in-bio platform for creators, professionals, and communities.`}
      actions={
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A simple home for your public identity.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} helps people create a clear public profile with the links that matter most. It is built
              for quick setup, easy updates, and a better visitor experience on both desktop and mobile.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
