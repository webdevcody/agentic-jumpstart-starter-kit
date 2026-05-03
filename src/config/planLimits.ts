export const PLAN_LIMITS = {
  free: {
    uploads: 5,
  },
  basic: {
    uploads: 50,
  },
  pro: {
    uploads: -1, // unlimited
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export function getUploadLimit(plan: PlanType): number {
  return PLAN_LIMITS[plan]?.uploads ?? PLAN_LIMITS.free.uploads;
}

export function hasReachedUploadLimit(
  plan: PlanType,
  currentCount: number
): boolean {
  const limit = getUploadLimit(plan);
  return limit !== -1 && currentCount >= limit;
}
