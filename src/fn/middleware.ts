import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { auth } from "~/utils/auth";
import { getUserPlan, hasValidPlan } from "~/data-access/users";
import type { SubscriptionPlan } from "~/db/schema";

export const authenticatedMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getWebRequest();

  if (!request?.headers) {
    throw redirect({ to: "/" });
  }
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw redirect({ to: "/" });
  }

  return next({
    context: { userId: session.user.id },
  });
});

export const optionalAuthentication = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getWebRequest();

  const session = await auth.api.getSession({ headers: request.headers });

  return next({
    context: { userId: session?.user.id },
  });
});

export const planAuthMiddleware = (requiredPlan: SubscriptionPlan) => 
  createMiddleware({
    type: "function",
  }).server(async ({ next }) => {
    const request = getWebRequest();

    if (!request?.headers) {
      throw redirect({ to: "/" });
    }
    
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      throw redirect({ to: "/" });
    }

    const userPlan = await getUserPlan(session.user.id);

    if (!hasValidPlan(userPlan, requiredPlan)) {
      throw new Error(`This feature requires a ${requiredPlan} plan or higher. Your current plan: ${userPlan.plan}${!userPlan.isActive ? ' (expired)' : ''}`);
    }

    return next({
      context: { 
        userId: session.user.id,
        userPlan
      },
    });
  });
