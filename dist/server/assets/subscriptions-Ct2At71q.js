import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { z } from "zod";
import { a as authenticatedMiddleware } from "./middleware-BDm4WWFo.js";
import { g as getUserSubscription, a as getPlanByPriceId, s as stripe, p as publicEnv } from "./plans-BWlk5BO4.js";
import { c as createServerFn } from "../server.js";
import "./auth-BWkAJVqq.js";
import "node:crypto";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "drizzle-orm/pg-core";
import "drizzle-orm/node-postgres";
import "pg";
import "drizzle-orm";
import "stripe";
import "node:async_hooks";
import "node:stream";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const getUserPlanFn_createServerFn_handler = createServerRpc({
  id: "d61fe3c9c7f887be5d8a69157b19978cccf0f713ce9e284c0148e6715ddbf969",
  name: "getUserPlanFn",
  filename: "src/fn/subscriptions.ts"
}, (opts) => getUserPlanFn.__executeServer(opts));
const getUserPlanFn = createServerFn({
  method: "GET"
}).middleware([authenticatedMiddleware]).handler(getUserPlanFn_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) {
      throw new Error("User not found");
    }
    return {
      success: true,
      data: {
        plan: subscription.plan || "free",
        subscriptionStatus: subscription.subscriptionStatus,
        subscriptionExpiresAt: subscription.subscriptionExpiresAt,
        stripeCustomerId: subscription.stripeCustomerId,
        subscriptionId: subscription.subscriptionId
      },
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to get user plan"
    };
  }
});
const createCheckoutSessionSchema = z.object({
  priceId: z.string().min(1, "Price ID is required")
});
const createCheckoutSessionFn_createServerFn_handler = createServerRpc({
  id: "219a148858532d69760ee93986760a55ef1bf2c06c8797a860837d09bb2b1169",
  name: "createCheckoutSessionFn",
  filename: "src/fn/subscriptions.ts"
}, (opts) => createCheckoutSessionFn.__executeServer(opts));
const createCheckoutSessionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(createCheckoutSessionSchema).handler(createCheckoutSessionFn_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    priceId
  } = data;
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) {
      throw new Error("User not found");
    }
    const planDetails = getPlanByPriceId(priceId);
    if (!planDetails) {
      throw new Error("Invalid price ID");
    }
    let customerId = subscription.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: subscription.email,
        name: subscription.name,
        metadata: {
          userId
        }
      });
      customerId = customer.id;
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: "subscription",
      success_url: `${publicEnv.BETTER_AUTH_URL}/account?success=true`,
      cancel_url: `${publicEnv.BETTER_AUTH_URL}/account?canceled=true`,
      metadata: {
        userId,
        plan: planDetails.plan
      }
    });
    return {
      success: true,
      data: {
        sessionUrl: session.url
      },
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to create checkout session"
    };
  }
});
const createPortalSessionFn_createServerFn_handler = createServerRpc({
  id: "c597815a4705e9a9d9b50005006de23c80966c94a6038c891d62fe4909b498b8",
  name: "createPortalSessionFn",
  filename: "src/fn/subscriptions.ts"
}, (opts) => createPortalSessionFn.__executeServer(opts));
const createPortalSessionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).handler(createPortalSessionFn_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription || !subscription.stripeCustomerId) {
      throw new Error("No subscription found");
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${publicEnv.BETTER_AUTH_URL}/account`
    });
    return {
      success: true,
      data: {
        sessionUrl: session.url
      },
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to create portal session"
    };
  }
});
const cancelSubscriptionFn_createServerFn_handler = createServerRpc({
  id: "952bb73e70f4dcc4a3e1fce3e45a02d3e9138bd8bc203139e95b406765561ffc",
  name: "cancelSubscriptionFn",
  filename: "src/fn/subscriptions.ts"
}, (opts) => cancelSubscriptionFn.__executeServer(opts));
const cancelSubscriptionFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).handler(cancelSubscriptionFn_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription || !subscription.subscriptionId) {
      throw new Error("No active subscription found");
    }
    const canceledSubscription = await stripe.subscriptions.update(subscription.subscriptionId, {
      cancel_at_period_end: true
    });
    return {
      success: true,
      data: {
        canceledAt: canceledSubscription.cancel_at,
        willCancelAt: canceledSubscription.cancel_at
      },
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Failed to cancel subscription"
    };
  }
});
export {
  cancelSubscriptionFn_createServerFn_handler,
  createCheckoutSessionFn_createServerFn_handler,
  createPortalSessionFn_createServerFn_handler,
  getUserPlanFn_createServerFn_handler
};
