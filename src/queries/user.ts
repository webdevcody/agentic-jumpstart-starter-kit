import { queryOptions } from "@tanstack/react-query";
import { getImageUrlFn } from "~/fn/storage";

export const getUserAvatarQuery = (imageKey: string | null) =>
  queryOptions({
    queryKey: ["avatar-url", imageKey],
    queryFn: async (): Promise<{ imageUrl: string | null }> => {
      if (imageKey) {
        const result = await getImageUrlFn({
          data: { imageKey },
        });
        return { imageUrl: result.imageUrl };
      }
      return { imageUrl: null };
    },
    enabled: !!imageKey,
  });