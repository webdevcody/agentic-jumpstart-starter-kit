import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { PricingSection } from "~/components/PricingSection";
import { buttonVariants } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <main className="flex-1">
        <section className="py-24 text-center px-6">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Launch Kit
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            A starter for shipping full-stack TanStack Start apps fast — auth,
            payments, and uploads wired up out of the box.
          </p>
          <Link to="/sign-up" search={{ redirect: undefined }} className={buttonVariants({ size: "lg" })}>
            Get started
          </Link>
        </section>
        <ClientOnly>
          <PricingSection />
        </ClientOnly>
      </main>
    </div>
  );
}
