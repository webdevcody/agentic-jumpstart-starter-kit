import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: TODO — replace with your launch date.
      </p>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Information we collect</h2>
          <p className="text-muted-foreground">
            TODO — describe what your application collects (account email,
            uploaded files, payment metadata via Stripe, etc.).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. How we use it</h2>
          <p className="text-muted-foreground">
            TODO — describe how data is used (authenticate the user, deliver
            the service, send transactional email, etc.).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Cookies and storage</h2>
          <p className="text-muted-foreground">
            TODO — describe session cookies (Better Auth) and any analytics or
            preference cookies you add.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Third-party services</h2>
          <p className="text-muted-foreground">
            TODO — list third parties (Stripe for payments, Google for OAuth,
            Cloudflare R2 / AWS S3 for file storage, etc.).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Your rights</h2>
          <p className="text-muted-foreground">
            You can update your profile or delete your account at any time
            from your account page.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Contact</h2>
          <p className="text-muted-foreground">
            TODO — add a contact email for privacy inquiries.
          </p>
        </div>
      </section>
    </div>
  );
}
