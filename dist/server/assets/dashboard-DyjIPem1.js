import { jsxDEV } from "react/jsx-dev-runtime";
import { Link } from "@tanstack/react-router";
import { a as authClient, d as buttonVariants } from "./router-C0Ba-j9F.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-EsE3mEYX.js";
import { Settings } from "lucide-react";
import "@tanstack/react-query";
import "@tanstack/react-router-ssr-query";
import "react";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "./auth-BWkAJVqq.js";
import "node:crypto";
import "zod";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "drizzle-orm/pg-core";
import "drizzle-orm/node-postgres";
import "pg";
import "drizzle-orm";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "../server.js";
import "node:async_hooks";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "./middleware-BDm4WWFo.js";
import "@radix-ui/react-dialog";
import "sonner";
import "nprogress";
import "./plans-BWlk5BO4.js";
import "stripe";
function DashboardPage() {
  const {
    data: session
  } = authClient.useSession();
  const user = session?.user;
  return /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto max-w-5xl px-6 py-12", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold tracking-tight", children: [
        "Welcome back",
        user?.name ? `, ${user.name}` : "",
        "."
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-muted-foreground mt-1", children: "This is your dashboard — replace it with your app's primary surface." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxDEV(Card, { children: [
        /* @__PURE__ */ jsxDEV(CardHeader, { children: [
          /* @__PURE__ */ jsxDEV(CardTitle, { children: "Your account" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 24,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(CardDescription, { children: [
            "Signed in as ",
            user?.email
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 25,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(CardContent, { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(Link, { to: "/account", className: buttonVariants({
          variant: "outline",
          size: "sm"
        }), children: [
          /* @__PURE__ */ jsxDEV(Settings, { className: "mr-2 h-4 w-4" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 32,
            columnNumber: 15
          }, this),
          "Manage account"
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
          lineNumber: 28,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Card, { children: /* @__PURE__ */ jsxDEV(CardHeader, { children: [
        /* @__PURE__ */ jsxDEV(CardTitle, { children: "Build your app" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
          lineNumber: 40,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(CardDescription, { children: [
          "Add your routes under ",
          /* @__PURE__ */ jsxDEV("code", { children: "src/routes/" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 42,
            columnNumber: 37
          }, this),
          ", server functions under ",
          /* @__PURE__ */ jsxDEV("code", { children: "src/fn/" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 43,
            columnNumber: 21
          }, this),
          ", and database tables in",
          " ",
          /* @__PURE__ */ jsxDEV("code", { children: "src/db/schema.ts" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
            lineNumber: 44,
            columnNumber: 15
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
          lineNumber: 41,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
        lineNumber: 39,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
      lineNumber: 21,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/dashboard.tsx?tsr-split=component",
    lineNumber: 11,
    columnNumber: 10
  }, this);
}
export {
  DashboardPage as component
};
