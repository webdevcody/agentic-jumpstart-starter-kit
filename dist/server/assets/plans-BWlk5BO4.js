import Stripe from "stripe";
import { p as privateEnv, h as database, u as user } from "./auth-BWkAJVqq.js";
import { eq } from "drizzle-orm";
const publicEnv = {
  STRIPE_PUBLISHABLE_KEY: "pk_test_...",
  BETTER_AUTH_URL: "http://localhost:3000",
  STRIPE_BASIC_PRICE_ID: "price_...",
  STRIPE_PRO_PRICE_ID: "price_...",
  R2_ENDPOINT: "",
  R2_BUCKET: ""
};
const stripe = new Stripe(privateEnv.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover"
});
async function updateUserSubscription(userId, subscriptionData) {
  try {
    const [updatedUser] = await database.update(user).set({
      stripeCustomerId: subscriptionData.customerId,
      subscriptionId: subscriptionData.subscriptionId,
      plan: subscriptionData.plan,
      subscriptionStatus: subscriptionData.status,
      subscriptionExpiresAt: subscriptionData.expiresAt,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(user.id, userId)).returning();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user subscription:", error);
    throw new Error("Failed to update subscription");
  }
}
async function getUserSubscription(userId) {
  try {
    const [userData] = await database.select({
      id: user.id,
      email: user.email,
      name: user.name,
      stripeCustomerId: user.stripeCustomerId,
      subscriptionId: user.subscriptionId,
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionExpiresAt: user.subscriptionExpiresAt
    }).from(user).where(eq(user.id, userId));
    return userData;
  } catch (error) {
    console.error("Failed to get user subscription:", error);
    throw new Error("Failed to fetch subscription data");
  }
}
async function updateUserPlan(userId, plan) {
  try {
    const [updatedUser] = await database.update(user).set({
      plan,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(user.id, userId)).returning();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user plan:", error);
    throw new Error("Failed to update plan");
  }
}
const SUBSCRIPTION_PLANS = {
  FREE: {
    name: "Free",
    plan: "free",
    price: 0,
    priceId: null,
    features: [
      "Up to 5 uploads",
      "Community support"
    ]
  },
  BASIC: {
    name: "Basic",
    plan: "basic",
    price: 999,
    // $9.99 in cents
    priceId: publicEnv.STRIPE_BASIC_PRICE_ID,
    features: [
      "Up to 50 uploads",
      "Email support"
    ]
  },
  PRO: {
    name: "Pro",
    plan: "pro",
    price: 2999,
    // $29.99 in cents
    priceId: publicEnv.STRIPE_PRO_PRICE_ID,
    features: [
      "Unlimited uploads",
      "Priority support"
    ]
  }
};
const getPlanByPriceId = (priceId) => {
  return Object.values(SUBSCRIPTION_PLANS).find(
    (plan) => plan.priceId === priceId
  );
};
export {
  SUBSCRIPTION_PLANS as S,
  getPlanByPriceId as a,
  updateUserSubscription as b,
  getUserSubscription as g,
  publicEnv as p,
  stripe as s,
  updateUserPlan as u
};
