import { Link } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import { Video } from "lucide-react";

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-8 flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex gap-8">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Video />{" "}
            <span className="hidden font-bold sm:inline-block">TechTube</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-2">
            {isPending ? (
              <div className="flex h-9 w-9 items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : session ? (
              <>
                <span className="hidden text-sm text-muted-foreground lg:inline-block">
                  {session.user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => authClient.signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  to="/sign-in"
                >
                  Sign In
                </Link>
                <Link
                  className={buttonVariants({ variant: "default" })}
                  to="/sign-up"
                >
                  Sign Up
                </Link>
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
