import { Link } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow px-6 py-3 flex items-center justify-between">
      {/* Left: Logo and text */}
      <div className="flex items-center gap-2">
        <img src="/favicon-32x32.png" alt="Logo" className="w-8 h-8 rounded" />
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
          TanStack Start
        </span>
      </div>
      {/* Middle: Navigation links */}
      <nav className="flex gap-6">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          Home
        </Link>
      </nav>
      {/* Right: Auth button */}
      <div>
        {isPending ? (
          <span className="text-gray-500">...</span>
        ) : session ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700 dark:text-gray-200 text-sm">
              {session.user.email}
            </span>
            <button
              onClick={() => authClient.signOut()}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/sign-in"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
