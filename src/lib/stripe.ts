import Stripe from "stripe";
import { privateEnv } from "~/config/privateEnv";

export const stripe = new Stripe(privateEnv.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
});
