import { a as auth } from "./auth-BWkAJVqq.js";
import { g as getRequest } from "../server.js";
var createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { middleware }));
    },
    inputValidator: (inputValidator) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { inputValidator }));
    },
    client: (client) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { client }));
    },
    server: (server) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { server }));
    }
  };
};
const authenticatedMiddleware = createMiddleware({
  type: "function"
}).server(async ({ next }) => {
  const request = getRequest();
  if (!request?.headers) {
    throw new Error("No headers");
  }
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    throw new Error("No session");
  }
  return next({
    context: { userId: session.user.id }
  });
});
export {
  authenticatedMiddleware as a
};
