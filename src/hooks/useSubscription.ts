import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCheckoutSessionServerFn,
  createPortalSessionServerFn,
  cancelSubscriptionServerFn,
} from "~/server/subscription";
import { getUserPlanQuery } from "~/queries/subscription";

// Hook to get user's current subscription plan
export function useUserPlan() {
  return useQuery(getUserPlanQuery());
}

// Hook for creating checkout sessions
export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSessionServerFn,
    onSuccess: (result) => {
      if (result.success && result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      } else {
        toast.error(result.error || "Failed to create checkout session");
      }
    },
    onError: () => {
      toast.error("Failed to start checkout process");
    },
  });
}

// Hook for creating portal sessions
export function useCreatePortalSession() {
  return useMutation({
    mutationFn: createPortalSessionServerFn,
    onSuccess: (result) => {
      if (result.success && result.data?.sessionUrl) {
        window.open(result.data.sessionUrl, "_blank");
      } else {
        toast.error(result.error || "Failed to open billing portal");
      }
    },
    onError: () => {
      toast.error("Failed to open billing portal");
    },
  });
}

// Hook for canceling subscriptions
export function useCancelSubscription() {
  return useMutation({
    mutationFn: cancelSubscriptionServerFn,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(
          "Subscription will be canceled at the end of the billing period"
        );
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to cancel subscription");
      }
    },
    onError: () => {
      toast.error("Failed to cancel subscription");
    },
  });
}