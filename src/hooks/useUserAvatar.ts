import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth-client";
import { getUserAvatarQuery } from "~/queries/user";

export function useUserAvatar() {
  const { data: session } = authClient.useSession();
  
  const avatarQuery = useQuery({
    ...getUserAvatarQuery(session?.user?.image || null),
    onError: (error) => {
      console.error('useUserAvatar query error:', error);
    }
  });
  
  return {
    avatarUrl: avatarQuery.data?.imageUrl || null,
    isLoading: avatarQuery.isLoading,
    error: avatarQuery.error,
    refetch: avatarQuery.refetch,
  };
}