import { jsxDEV } from "react/jsx-dev-runtime";
import { useState } from "react";
import { toast } from "sonner";
import { a as authClient, u as updateUserProfileFn, e as deleteUserAccountFn, f as createSsrRpc, g as getPresignedImageUploadUrlFn, c as cn, B as Button, h as useUserAvatar, A as Avatar, i as AvatarImage, j as AvatarFallback } from "./router-C0Ba-j9F.js";
import { useMutation, queryOptions, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { a as authenticatedMiddleware } from "./middleware-BDm4WWFo.js";
import { c as createServerFn } from "../server.js";
import { cva } from "class-variance-authority";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-EsE3mEYX.js";
import { Calendar, AlertTriangle, CreditCard, Check, XIcon, User, Upload, Trash2 } from "lucide-react";
import { S as SUBSCRIPTION_PLANS } from "./plans-BWlk5BO4.js";
import { L as Label, I as Input } from "./label-CQqL9aP-.js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
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
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "nprogress";
import "node:async_hooks";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "stripe";
import "@radix-ui/react-label";
function useUpdateUserProfile() {
  const { refetch: refetchSession } = authClient.useSession();
  return useMutation({
    mutationFn: updateUserProfileFn,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetchSession();
    },
    onError: () => {
      toast.error("Failed to update profile");
    }
  });
}
function useDeleteUserAccount() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteUserAccountFn,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      navigate({ to: "/" });
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account");
    }
  });
}
const getUserPlanFn = createServerFn({
  method: "GET"
}).middleware([authenticatedMiddleware]).handler(createSsrRpc("d61fe3c9c7f887be5d8a69157b19978cccf0f713ce9e284c0148e6715ddbf969"));
const createCheckoutSessionSchema = z.object({
  priceId: z.string().min(1, "Price ID is required")
});
const createCheckoutSessionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(createCheckoutSessionSchema).handler(createSsrRpc("219a148858532d69760ee93986760a55ef1bf2c06c8797a860837d09bb2b1169"));
const createPortalSessionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).handler(createSsrRpc("c597815a4705e9a9d9b50005006de23c80966c94a6038c891d62fe4909b498b8"));
const cancelSubscriptionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).handler(createSsrRpc("952bb73e70f4dcc4a3e1fce3e45a02d3e9138bd8bc203139e95b406765561ffc"));
const getUserPlanQuery = () => queryOptions({
  queryKey: ["user-plan"],
  queryFn: () => getUserPlanFn()
});
function formatValidationErrors(errorMessage) {
  try {
    const errors = JSON.parse(errorMessage);
    if (!Array.isArray(errors) || errors.length === 0) {
      return errorMessage;
    }
    const formattedErrors = errors.map((error) => {
      const fieldName = error.path.length > 0 ? error.path.join(".").replace(/([A-Z])/g, " $1").toLowerCase() : "field";
      return `${fieldName}: ${error.message}`;
    });
    return formattedErrors.join(", ");
  } catch {
    return errorMessage;
  }
}
function getErrorMessage(error) {
  if (typeof error === "string") {
    return formatValidationErrors(error);
  }
  if (error instanceof Error) {
    return formatValidationErrors(error.message);
  }
  if (error && typeof error === "object" && "message" in error) {
    return formatValidationErrors(String(error.message));
  }
  return "An unexpected error occurred. Please try again.";
}
function useUserPlan$1(enabled = true) {
  return useQuery({
    ...getUserPlanQuery(),
    enabled
  });
}
function useCreateCheckoutSession$1() {
  return useMutation({
    mutationFn: (priceId) => createCheckoutSessionFn({ data: { priceId } }),
    onSuccess: (result) => {
      if (result.success && result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      } else {
        toast.error("Failed to create checkout session", {
          description: result.error || "Unknown error occurred"
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to create checkout session", {
        description: getErrorMessage(error)
      });
    }
  });
}
function useCreatePortalSession() {
  return useMutation({
    mutationFn: createPortalSessionFn,
    onSuccess: (result) => {
      if (result.success && result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      } else {
        toast.error("Failed to create portal session", {
          description: result.error || "Unknown error occurred"
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to create portal session", {
        description: getErrorMessage(error)
      });
    }
  });
}
function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelSubscriptionFn,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Subscription cancelled", {
          description: "Your subscription will be cancelled at the end of the current period."
        });
        queryClient.invalidateQueries({ queryKey: ["user-plan"] });
      } else {
        toast.error("Failed to cancel subscription", {
          description: result.error || "Unknown error occurred"
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to cancel subscription", {
        description: getErrorMessage(error)
      });
    }
  });
}
function useSubscriptionManagement() {
  const queryClient = useQueryClient();
  const userPlan = useUserPlan$1();
  const createCheckoutSession = useCreateCheckoutSession$1();
  const createPortalSession = useCreatePortalSession();
  const cancelSubscription = useCancelSubscription();
  const refreshUserPlan = () => {
    queryClient.invalidateQueries({ queryKey: ["user-plan"] });
  };
  const handleUpgrade = (priceId) => {
    createCheckoutSession.mutate(priceId);
  };
  const handleManageSubscription = () => {
    createPortalSession.mutate({ data: void 0 });
  };
  const handleCancelSubscription = () => {
    cancelSubscription.mutate({ data: void 0 });
  };
  return {
    userPlan,
    createCheckoutSession,
    createPortalSession,
    cancelSubscription,
    refreshUserPlan,
    handleUpgrade,
    handleManageSubscription,
    handleCancelSubscription,
    isLoading: userPlan.isLoading || createCheckoutSession.isPending || createPortalSession.isPending || cancelSubscription.isPending
  };
}
async function uploadImageWithPresignedUrl(key, file, onProgress) {
  const { presignedUrl } = await getPresignedImageUploadUrlFn({
    data: { imageKey: key }
  });
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) ;
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ imageKey: key });
      } else {
        reject(new Error(`Image upload failed: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Image upload failed: Network error"));
    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxDEV("div", { className: cn(badgeVariants({ variant }), className), ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/badge.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
const PLAN_CONFIG = {
  free: {
    label: "Free",
    variant: "secondary"
  },
  basic: {
    label: "Basic",
    variant: "default"
  },
  pro: {
    label: "Pro",
    variant: "default"
  }
};
function PlanBadge({ plan, className }) {
  const config = PLAN_CONFIG[plan] || PLAN_CONFIG.free;
  return /* @__PURE__ */ jsxDEV(Badge, { variant: config.variant, className, children: config.label }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PlanBadge.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
function SubscriptionStatus({
  plan,
  subscriptionStatus,
  subscriptionExpiresAt,
  onManageBilling,
  onCancelSubscription,
  isLoading = false
}) {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };
  const getStatusBadge = (status) => {
    if (!status || status === "active") {
      return /* @__PURE__ */ jsxDEV(Badge, { variant: "default", children: "Active" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 35,
        columnNumber: 14
      }, this);
    }
    switch (status) {
      case "canceled":
        return /* @__PURE__ */ jsxDEV(Badge, { variant: "destructive", children: "Canceled" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 40,
          columnNumber: 16
        }, this);
      case "past_due":
        return /* @__PURE__ */ jsxDEV(Badge, { variant: "destructive", children: "Past Due" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 42,
          columnNumber: 16
        }, this);
      case "unpaid":
        return /* @__PURE__ */ jsxDEV(Badge, { variant: "destructive", children: "Unpaid" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 44,
          columnNumber: 16
        }, this);
      case "incomplete":
        return /* @__PURE__ */ jsxDEV(Badge, { variant: "secondary", children: "Incomplete" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 46,
          columnNumber: 16
        }, this);
      default:
        return /* @__PURE__ */ jsxDEV(Badge, { variant: "secondary", children: status }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 48,
          columnNumber: 16
        }, this);
    }
  };
  const getStatusIcon = (status) => {
    if (status === "past_due" || status === "unpaid") {
      return /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "h-4 w-4 text-destructive" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 54,
        columnNumber: 14
      }, this);
    }
    return /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
      lineNumber: 56,
      columnNumber: 12
    }, this);
  };
  const isPaidPlan = plan !== "free";
  const isActive = subscriptionStatus === "active" || plan === "free";
  const needsAttention = subscriptionStatus === "past_due" || subscriptionStatus === "unpaid";
  return /* @__PURE__ */ jsxDEV(Card, { children: [
    /* @__PURE__ */ jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV(CardTitle, { className: "flex items-center gap-2", children: [
          getStatusIcon(subscriptionStatus),
          "Subscription Status"
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(CardDescription, { children: "Manage your current subscription and billing" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 72,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(PlanBadge, { plan }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium", children: "Plan Status" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground", children: plan === "free" ? "Free plan - No subscription required" : `${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription` }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 84,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        isPaidPlan && getStatusBadge(subscriptionStatus)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      subscriptionExpiresAt && isPaidPlan && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Calendar, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium", children: subscriptionStatus === "canceled" ? "Expires" : "Next billing date" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground", children: formatDate(subscriptionExpiresAt) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 99,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 95,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      needsAttention && /* @__PURE__ */ jsxDEV("div", { className: "bg-destructive/10 border border-destructive/20 rounded-lg p-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "h-4 w-4 text-destructive mt-0.5" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 109,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-destructive", children: "Payment Issue" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 111,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-destructive/80", children: subscriptionStatus === "past_due" ? "Your payment is past due. Please update your payment method." : "Your payment failed. Please try again or update your payment method." }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 114,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
          lineNumber: 110,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 108,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      isPaidPlan && isActive && /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 pt-2 justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          Button,
          {
            onClick: onManageBilling,
            disabled: isLoading,
            variant: "outline",
            children: isLoading ? "Loading..." : "Manage Billing"
          },
          void 0,
          false,
          {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 127,
            columnNumber: 13
          },
          this
        ),
        subscriptionStatus !== "canceled" && /* @__PURE__ */ jsxDEV(
          Button,
          {
            onClick: onCancelSubscription,
            disabled: isLoading,
            variant: "destructive",
            children: isLoading ? "Loading..." : "Cancel Subscription"
          },
          void 0,
          false,
          {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
            lineNumber: 136,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this),
      plan === "free" && /* @__PURE__ */ jsxDEV("div", { className: "bg-muted/50 rounded-lg p-3", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground", children: "You're currently on the free plan. Upgrade to unlock more features and increase your limits." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/SubscriptionStatus.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
function useUserPlan() {
  const { data: session } = authClient.useSession();
  return useQuery({
    ...getUserPlanQuery(),
    enabled: !!session?.user
    // Only run query if user is authenticated
  });
}
function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSessionFn,
    onSuccess: (result) => {
      if (result.success && result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      } else {
        toast.error(result.error || "Failed to create checkout session");
      }
    },
    onError: () => {
      toast.error("Failed to start checkout process");
    }
  });
}
function PricingCard({
  plan,
  currentPlan,
  isLoading = false,
  onUpgrade,
  onManagePlans,
  isPopular = false
}) {
  const { data: session } = authClient.useSession();
  const isCurrentPlan = currentPlan === plan.plan;
  const isLoggedOut = !session;
  const hasPaidPlan = currentPlan === "basic" || currentPlan === "pro";
  const formatPrice = (price) => {
    return (price / 100).toFixed(2);
  };
  const handleButtonClick = () => {
    if (isLoggedOut) {
      if (onUpgrade) {
        onUpgrade(plan.priceId || "");
      }
    } else if (hasPaidPlan && plan.plan !== "free") {
      if (onManagePlans) {
        onManagePlans();
      }
    } else if (!hasPaidPlan && plan.plan !== "free") {
      if (onUpgrade && plan.priceId) {
        onUpgrade(plan.priceId);
      }
    } else if (plan.plan === "free" && !hasPaidPlan) {
      if (onUpgrade) {
        onUpgrade("");
      }
    }
  };
  const getButtonText = () => {
    if (isLoggedOut) {
      return "Login Now";
    }
    if (hasPaidPlan && plan.plan !== "free") {
      return "Manage Plan";
    }
    if (!hasPaidPlan && plan.plan === "free") {
      return "Get Started";
    }
    if (!hasPaidPlan && plan.plan !== "free") {
      return "Upgrade Now";
    }
    return "Get Started";
  };
  const getButtonVariant = () => {
    if (isLoggedOut) return "outline";
    if (hasPaidPlan && plan.plan !== "free") return "outline";
    return isPopular ? "default" : "outline";
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: `
      relative bg-card rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg
      ${isPopular ? "border-primary ring-1 ring-primary" : "border-border"}
      ${isCurrentPlan ? "bg-primary/5" : ""}
    `,
      children: [
        isPopular && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-3 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxDEV("span", { className: "bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium", children: "Most Popular" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
          lineNumber: 92,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-bold text-foreground", children: plan.name }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 100,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 mb-6", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-4xl font-bold text-foreground", children: [
              "$",
              plan.price === 0 ? "0" : formatPrice(plan.price)
            ] }, void 0, true, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 103,
              columnNumber: 11
            }, this),
            plan.price > 0 && /* @__PURE__ */ jsxDEV("span", { className: "text-muted-foreground", children: "/month" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 107,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 102,
            columnNumber: 9
          }, this),
          !isLoading && !isLoggedOut && isCurrentPlan && /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV("span", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium", children: [
            /* @__PURE__ */ jsxDEV(Check, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, this),
            "Current Plan"
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 112,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3 mb-6 text-left", children: plan.features.map((feature, index) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxDEV(Check, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 123,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-foreground", children: feature }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this)
          ] }, index, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 122,
            columnNumber: 13
          }, this)) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
            lineNumber: 120,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            Button,
            {
              onClick: handleButtonClick,
              variant: getButtonVariant(),
              className: `w-full ${isPopular && !isLoggedOut && !hasPaidPlan ? "bg-primary hover:bg-primary/90" : ""}`,
              children: getButtonText()
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
              lineNumber: 129,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
          lineNumber: 99,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingCard.tsx",
      lineNumber: 84,
      columnNumber: 5
    },
    this
  );
}
function PricingSection({ showTitle = true }) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { data: userPlan, isLoading: planLoading } = useUserPlan();
  const checkoutMutation = useCreateCheckoutSession();
  const handlePlanSelect = (priceId) => {
    if (sessionLoading) return;
    if (!session) {
      router.navigate({ to: "/sign-up", search: { redirect: "/#pricing" } });
      return;
    }
    const plan = Object.values(SUBSCRIPTION_PLANS).find(
      (p) => p.priceId === priceId
    );
    if (plan) {
      setLoadingPlan(plan.plan);
    }
    checkoutMutation.mutate({ data: { priceId } }, {
      onSettled: () => setLoadingPlan(null)
    });
  };
  const currentPlan = userPlan?.data?.plan || "free";
  const isLoadingState = sessionLoading || planLoading;
  const handleManagePlans = () => {
    router.navigate({ to: "/account" });
  };
  return /* @__PURE__ */ jsxDEV("section", { id: "pricing", className: "container mx-auto px-4 py-16 sm:py-24", children: [
    showTitle && /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4", children: [
        "Choose Your ",
        /* @__PURE__ */ jsxDEV("span", { className: "text-primary", children: "Plan" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 62,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto", children: "Start for free and upgrade as you grow. All plans include our core features with increasing limits and premium support." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV(
        PricingCard,
        {
          plan: SUBSCRIPTION_PLANS.FREE,
          currentPlan,
          isLoading: isLoadingState,
          onUpgrade: () => {
            if (!session) {
              authClient.signIn.social({
                provider: "google"
              });
            }
          },
          onManagePlans: handleManagePlans
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 72,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        PricingCard,
        {
          plan: SUBSCRIPTION_PLANS.BASIC,
          currentPlan,
          isLoading: isLoadingState,
          onUpgrade: handlePlanSelect,
          onManagePlans: handleManagePlans,
          isPopular: true
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 86,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        PricingCard,
        {
          plan: SUBSCRIPTION_PLANS.PRO,
          currentPlan,
          isLoading: isLoadingState,
          onUpgrade: handlePlanSelect,
          onManagePlans: handleManagePlans
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 95,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mt-12", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground mb-4", children: "All plans include a 14-day free trial. No setup fees. Cancel anytime." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center gap-8 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "✓ Secure payments" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 110,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "✓ Cancel anytime" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 111,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "✓ 24/7 support" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/PricingSection.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Root, { "data-slot": "dialog", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
    lineNumber: 12,
    columnNumber: 10
  }, this);
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
    lineNumber: 18,
    columnNumber: 10
  }, this);
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 38,
      columnNumber: 5
    },
    this
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxDEV(DialogOverlay, {}, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxDEV(
            SheetPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxDEV(XIcon, {}, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
                  lineNumber: 74,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: "Close" }, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
                  lineNumber: 75,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
              lineNumber: 70,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
        lineNumber: 60,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 85,
      columnNumber: 5
    },
    this
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 95,
      columnNumber: 5
    },
    this
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 111,
      columnNumber: 5
    },
    this
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SheetPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dialog.tsx",
      lineNumber: 124,
      columnNumber: 5
    },
    this
  );
}
function AccountPage() {
  const {
    data: session
  } = authClient.useSession();
  return /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto max-w-3xl px-6 py-12 space-y-8", children: [
    /* @__PURE__ */ jsxDEV("header", { children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold tracking-tight", children: "Account" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-muted-foreground mt-1", children: "Manage your profile, subscription, and account." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 24,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    session?.user && /* @__PURE__ */ jsxDEV(ProfileCard, { userName: session.user.name ?? "" }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 29,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ jsxDEV(SubscriptionSection, {}, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    session?.user && /* @__PURE__ */ jsxDEV(DangerZone, { userEmail: session.user.email }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 31,
      columnNumber: 25
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
    lineNumber: 21,
    columnNumber: 10
  }, this);
}
function ProfileCard({
  userName
}) {
  const [name, setName] = useState(userName);
  const [isUploading, setIsUploading] = useState(false);
  const {
    avatarUrl,
    refetch: refetchAvatar
  } = useUserAvatar();
  const updateProfile = useUpdateUserProfile();
  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const key = `avatars/${crypto.randomUUID()}-${file.name}`;
      const {
        imageKey
      } = await uploadImageWithPresignedUrl(key, file);
      await updateProfile.mutateAsync({
        data: {
          image: imageKey
        }
      });
      await refetchAvatar();
    } catch (err) {
      toast.error("Avatar upload failed");
      console.error(err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && name !== userName) {
      updateProfile.mutate({
        data: {
          name: name.trim()
        }
      });
    }
  };
  return /* @__PURE__ */ jsxDEV(Card, { children: [
    /* @__PURE__ */ jsxDEV(CardHeader, { children: [
      /* @__PURE__ */ jsxDEV(CardTitle, { children: "Profile" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(CardDescription, { children: "Update your name and profile picture." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 82,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxDEV(Avatar, { className: "h-16 w-16", children: [
          /* @__PURE__ */ jsxDEV(AvatarImage, { src: avatarUrl || void 0 }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 87,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(AvatarFallback, { className: "bg-primary/10", children: userName.charAt(0)?.toUpperCase() || /* @__PURE__ */ jsxDEV(User, { className: "h-6 w-6" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 89,
            columnNumber: 53
          }, this) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 86,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(Label, { htmlFor: "avatar-upload", className: "cursor-pointer", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent", children: [
            /* @__PURE__ */ jsxDEV(Upload, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
              lineNumber: 95,
              columnNumber: 17
            }, this),
            isUploading ? "Uploading..." : "Change avatar"
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("input", { id: "avatar-upload", type: "file", accept: "image/*", className: "hidden", disabled: isUploading, onChange: onAvatarChange }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 98,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 93,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV(Label, { htmlFor: "name", children: "Name" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 105,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), disabled: updateProfile.isPending }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 106,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 104,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(Button, { type: "submit", disabled: updateProfile.isPending || !name.trim() || name === userName, children: updateProfile.isPending ? "Saving..." : "Save changes" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 109,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 108,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 103,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
    lineNumber: 79,
    columnNumber: 10
  }, this);
}
function SubscriptionSection() {
  const {
    userPlan,
    handleManageSubscription,
    handleCancelSubscription,
    isLoading
  } = useSubscriptionManagement();
  const planData = userPlan.data?.success ? userPlan.data.data : null;
  const plan = planData?.plan ?? "free";
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV(SubscriptionStatus, { plan, subscriptionStatus: planData?.subscriptionStatus, subscriptionExpiresAt: planData?.subscriptionExpiresAt ? new Date(planData.subscriptionExpiresAt) : null, onManageBilling: handleManageSubscription, onCancelSubscription: handleCancelSubscription, isLoading }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    plan === "free" && /* @__PURE__ */ jsxDEV(PricingSection, {}, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 128,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
    lineNumber: 126,
    columnNumber: 10
  }, this);
}
function DangerZone({
  userEmail
}) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const deleteAccount = useDeleteUserAccount();
  const isConfirmed = confirm.trim().toLowerCase() === userEmail.toLowerCase();
  return /* @__PURE__ */ jsxDEV(Card, { className: "border-destructive/50", children: [
    /* @__PURE__ */ jsxDEV(CardHeader, { children: [
      /* @__PURE__ */ jsxDEV(CardTitle, { className: "text-destructive", children: "Danger zone" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 142,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(CardDescription, { children: "Permanently delete your account and all associated data. This action cannot be undone." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 141,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(CardContent, { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDEV(Button, { variant: "destructive", children: [
        /* @__PURE__ */ jsxDEV(Trash2, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 152,
          columnNumber: 15
        }, this),
        "Delete account"
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 151,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 150,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(DialogContent, { children: [
        /* @__PURE__ */ jsxDEV(DialogHeader, { children: [
          /* @__PURE__ */ jsxDEV(DialogTitle, { children: "Delete your account?" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(DialogDescription, { children: "This permanently deletes your account, profile, and all data associated with it. There is no undo." }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 159,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV(Label, { htmlFor: "confirm-delete", children: [
            "Type your email",
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-semibold", children: userEmail }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
              lineNumber: 167,
              columnNumber: 17
            }, this),
            " to confirm:"
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 165,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(Input, { id: "confirm-delete", value: confirm, onChange: (e) => setConfirm(e.target.value), autoComplete: "off", placeholder: userEmail }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 170,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 164,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(DialogFooter, { children: [
          /* @__PURE__ */ jsxDEV(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancel" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 173,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(Button, { variant: "destructive", disabled: !isConfirmed || deleteAccount.isPending, onClick: () => deleteAccount.mutate({
            data: {
              email: userEmail
            }
          }), children: deleteAccount.isPending ? "Deleting..." : "Delete forever" }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
            lineNumber: 176,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
          lineNumber: 172,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
        lineNumber: 156,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 149,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
      lineNumber: 148,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/account.tsx?tsr-split=component",
    lineNumber: 140,
    columnNumber: 10
  }, this);
}
export {
  AccountPage as component
};
