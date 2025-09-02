import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserProfileFn } from "~/fn/storage";
import { authClient } from "~/lib/auth-client";

// Hook for updating user profile
export function useUpdateUserProfile() {
  const { refetch: refetchSession } = authClient.useSession();
  
  return useMutation({
    mutationFn: updateUserProfileFn,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      refetchSession();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
}