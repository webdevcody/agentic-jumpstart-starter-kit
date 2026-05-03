import { jsxDEV } from "react/jsx-dev-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { R as Route, B as Button, a as authClient } from "./router-C0Ba-j9F.js";
import { I as Input } from "./label-CQqL9aP-.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-yc-9Olw-.js";
import { EyeOff, Eye } from "lucide-react";
import "@tanstack/react-query";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "./auth-BWkAJVqq.js";
import "node:crypto";
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
import "@radix-ui/react-label";
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, "Password must be at least 6 characters")
});
function RouteComponent() {
  const router = useRouter();
  const {
    redirect
  } = Route.useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name
      });
      if (result.error) {
        setAuthError(result.error.message || "Sign up failed");
      } else {
        if (redirect) {
          window.location.href = redirect;
        } else {
          router.navigate({
            to: "/dashboard"
          });
        }
      }
    } catch {
      setAuthError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-sm space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-semibold tracking-tight", children: "Create your account" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground", children: "Enter your information to get started" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 68,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 64,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxDEV(Button, { variant: "outline", type: "button", disabled: isLoading, onClick: () => authClient.signIn.social({
        provider: "google"
      }), children: [
        /* @__PURE__ */ jsxDEV(GoogleIcon, {}, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        "Continue with Google"
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 74,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxDEV("span", { className: "w-full border-t" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 83,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 82,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxDEV("span", { className: "bg-background px-2 text-muted-foreground", children: "Or continue with" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 86,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 85,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 81,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Form, { ...form, children: /* @__PURE__ */ jsxDEV("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4", children: [
        authError && /* @__PURE__ */ jsxDEV("div", { className: "rounded-lg border border-destructive/50 bg-destructive/10 p-3", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-destructive", children: authError }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 95,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 94,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ jsxDEV(FormField, { control: form.control, name: "name", render: ({
          field
        }) => /* @__PURE__ */ jsxDEV(FormItem, { children: [
          /* @__PURE__ */ jsxDEV(FormLabel, { children: "Name" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 100,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDEV(Input, { placeholder: "Your name", type: "text", autoComplete: "name", disabled: isLoading, ...field }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 102,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 101,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormMessage, {}, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 104,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 99,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 97,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(FormField, { control: form.control, name: "email", render: ({
          field
        }) => /* @__PURE__ */ jsxDEV(FormItem, { children: [
          /* @__PURE__ */ jsxDEV(FormLabel, { children: "Email" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 109,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDEV(Input, { placeholder: "name@example.com", type: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", disabled: isLoading, ...field }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 111,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 110,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormMessage, {}, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 113,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 108,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 106,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(FormField, { control: form.control, name: "password", render: ({
          field
        }) => /* @__PURE__ */ jsxDEV(FormItem, { children: [
          /* @__PURE__ */ jsxDEV(FormLabel, { children: "Password" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 118,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV(Input, { placeholder: "Create a password", type: showPassword ? "text" : "password", autoComplete: "new-password", disabled: isLoading, className: "pr-10", ...field }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
              lineNumber: 121,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", disabled: isLoading, "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? /* @__PURE__ */ jsxDEV(EyeOff, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
              lineNumber: 123,
              columnNumber: 43
            }, this) : /* @__PURE__ */ jsxDEV(Eye, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
              lineNumber: 123,
              columnNumber: 76
            }, this) }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
              lineNumber: 122,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 120,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 119,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(FormMessage, {}, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 127,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 117,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 115,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(Button, { disabled: isLoading, type: "submit", className: "w-full", children: isLoading ? "Creating account..." : "Create account" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 129,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-muted-foreground text-center", children: [
          "By creating an account, you agree to our",
          " ",
          /* @__PURE__ */ jsxDEV(Link, { to: "/terms", className: "underline", children: "Terms of Service" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 134,
            columnNumber: 17
          }, this),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxDEV(Link, { to: "/privacy", className: "underline", children: "Privacy Policy" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
            lineNumber: 138,
            columnNumber: 17
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
          lineNumber: 132,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 93,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
        lineNumber: 92,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 73,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxDEV(Link, { to: "/sign-in", search: {
      redirect: void 0
    }, className: "underline underline-offset-4 hover:text-primary", children: "Already have an account? Sign in" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 148,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 147,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
    lineNumber: 63,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxDEV("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsxDEV("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 159,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 160,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 161,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
      lineNumber: 162,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/sign-up.tsx?tsr-split=component",
    lineNumber: 158,
    columnNumber: 10
  }, this);
}
export {
  RouteComponent as component
};
