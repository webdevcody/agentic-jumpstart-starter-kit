import { createFileRoute, Link } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { assertAuthenticatedFn } from "~/fn/guards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { buttonVariants } from "~/components/ui/button";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => assertAuthenticatedFn(),
  component: DashboardPage,
});

function DashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name}` : ""}.
        </h1>
        <p className="text-muted-foreground mt-1">
          This is your dashboard — replace it with your app's primary surface.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your account</CardTitle>
            <CardDescription>Signed in as {user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link
              to="/account"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Settings className="mr-2 h-4 w-4" />
              Manage account
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Build your app</CardTitle>
            <CardDescription>
              Add your routes under <code>src/routes/</code>, server functions
              under <code>src/fn/</code>, and database tables in{" "}
              <code>src/db/schema.ts</code>.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
