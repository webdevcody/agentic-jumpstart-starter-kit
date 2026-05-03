import { publicEnv } from "~/config/publicEnv";

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    plan: "free" as const,
    price: 0,
    priceId: null,
    features: [
      "Up to 5 uploads",
      "Community support",
    ],
  },
  BASIC: {
    name: "Basic",
    plan: "basic" as const,
    price: 999, // $9.99 in cents
    priceId: publicEnv.STRIPE_BASIC_PRICE_ID,
    features: [
      "Up to 50 uploads",
      "Email support",
    ],
  },
  PRO: {
    name: "Pro",
    plan: "pro" as const,
    price: 2999, // $29.99 in cents
    priceId: publicEnv.STRIPE_PRO_PRICE_ID,
    features: [
      "Unlimited uploads",
      "Priority support",
    ],
  },
} as const;

export const getPlanByPriceId = (priceId: string) => {
  return Object.values(SUBSCRIPTION_PLANS).find(
    (plan) => plan.priceId === priceId
  );
};

export const getPlanDetails = (plan: string) => {
  switch (plan) {
    case "basic":
      return SUBSCRIPTION_PLANS.BASIC;
    case "pro":
      return SUBSCRIPTION_PLANS.PRO;
    case "free":
    default:
      return SUBSCRIPTION_PLANS.FREE;
  }
};
