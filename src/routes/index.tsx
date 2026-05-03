import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import {
  Rocket,
  ShieldCheck,
  CreditCard,
  UploadCloud,
  Database,
  Sparkles,
  Zap,
  Code2,
} from "lucide-react";
import { PricingSection } from "~/components/PricingSection";
import { buttonVariants } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  {
    icon: ShieldCheck,
    title: "Authentication",
    description:
      "Email/password auth powered by Better Auth, complete with sessions, protected routes, and a sign-in/sign-up flow ready to customize.",
  },
  {
    icon: CreditCard,
    title: "Stripe Subscriptions",
    description:
      "Tiered plans with checkout, customer portal, and webhooks already wired up. Gate features by plan with a single helper.",
  },
  {
    icon: UploadCloud,
    title: "File Uploads",
    description:
      "Direct-to-S3/R2 uploads using presigned URLs. Skip the proxy — your server stays fast even with large files.",
  },
  {
    icon: Database,
    title: "Type-safe Database",
    description:
      "PostgreSQL with Drizzle ORM. Full TypeScript inference from schema to query, plus migrations and Drizzle Studio.",
  },
  {
    icon: Zap,
    title: "TanStack Start",
    description:
      "Full-stack React with file-based routing, server functions, and TanStack Query for data fetching out of the box.",
  },
  {
    icon: Sparkles,
    title: "Polished UI",
    description:
      "Tailwind CSS with Radix UI primitives and shadcn-style components. Light and dark mode included.",
  },
];

const steps = [
  {
    number: "01",
    title: "Clone the kit",
    description:
      "Get a production-ready codebase with auth, payments, uploads, and a database already wired together.",
  },
  {
    number: "02",
    title: "Make it yours",
    description:
      "Swap the branding, add your domain models, and shape the UI to match your product.",
  },
  {
    number: "03",
    title: "Ship it",
    description:
      "Deploy to your favorite host, point Stripe at your webhook, and start onboarding paying customers.",
  },
];

function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 text-center px-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Rocket className="h-3.5 w-3.5" />
            <span>AgentSystemLabs' Launch Kit · v1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Ship your SaaS in days, not months.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A production-ready full-stack starter built on TanStack Start —
            authentication, subscriptions, file uploads, and a typed database
            wired up so you can focus on what makes your product unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/sign-up"
              search={{ redirect: undefined }}
              className={buttonVariants({ size: "lg" })}
            >
              Get started for free
            </Link>
            <a
              href="https://github.com/AgentSystemLabs/launch-kit"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <Code2 className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 border-t bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Everything you need to launch
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Stop reinventing the wheel. Launch Kit ships with the
                infrastructure every modern SaaS needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-background p-6"
                >
                  <feature.icon className="h-8 w-8 mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 border-t">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                From zero to launched in three steps
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Skip the boilerplate and get straight to building the parts of
                your product that matter.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <ClientOnly>
          <PricingSection />
        </ClientOnly>

        {/* CTA */}
        <section className="py-20 px-6 border-t">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Ready to build something great?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join developers using AgentSystemLabs' Launch Kit to ship faster
              and focus on what matters — their users.
            </p>
            <Link
              to="/sign-up"
              search={{ redirect: undefined }}
              className={buttonVariants({ size: "lg" })}
            >
              Start your free account
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
