import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: TODO — replace with your launch date.
      </p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of terms</h2>
          <p className="text-muted-foreground">
            TODO — by accessing or using the service, the user agrees to these
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Accounts</h2>
          <p className="text-muted-foreground">
            TODO — account requirements, password security, one account per
            person, etc.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Acceptable use</h2>
          <p className="text-muted-foreground">
            TODO — what the user may and may not do with the service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Subscriptions and billing</h2>
          <p className="text-muted-foreground">
            TODO — describe paid plans, billing cadence, refund policy, and
            that subscriptions auto-renew until canceled.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
          <p className="text-muted-foreground">
            Users may delete their account at any time from the account page.
            We may suspend accounts that violate these terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Disclaimer</h2>
          <p className="text-muted-foreground">
            TODO — service is provided "as is" without warranties; limitation
            of liability.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
          <p className="text-muted-foreground">
            TODO — add a contact email for legal inquiries.
          </p>
        </div>
      </section>
    </div>
  );
}
