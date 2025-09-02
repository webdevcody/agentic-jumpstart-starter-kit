import { queryOptions } from "@tanstack/react-query";
import { getUserPlanServerFn } from "~/server/subscription";

export const getUserPlanQuery = () =>
  queryOptions({
    queryKey: ["user-plan"],
    queryFn: () => getUserPlanServerFn(),
  });