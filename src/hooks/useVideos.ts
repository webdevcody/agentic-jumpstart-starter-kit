import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { createVideoFn } from "~/fn/videos";
import { getErrorMessage } from "~/utils/error";

// Hook for creating videos
export function useCreateVideo() {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (data: Parameters<typeof createVideoFn>[0]['data']) => 
      createVideoFn({ data }),
    onSuccess: (video) => {
      toast.success("Video created successfully!", {
        description: "Your video has been saved and is ready for publishing.",
      });
      navigate({ to: `/video/${video.id}` });
    },
    onError: (error) => {
      toast.error("Failed to create video", {
        description: getErrorMessage(error),
      });
    },
  });
}