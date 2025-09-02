import { queryOptions } from "@tanstack/react-query";
import { fetchPosts, fetchPost } from "~/utils/posts";

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => fetchPost({ data: postId }),
  });