import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <button
        onClick={() =>
          authClient.signIn.email({
            email: "test@test.com",
            password: "test",
          })
        }
      >
        Sign In
      </button>
    </div>
  );
}
