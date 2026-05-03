import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { redirect } from "@tanstack/react-router";
import { a as auth } from "./auth-BWkAJVqq.js";
import { c as createServerFn, g as getRequest } from "../server.js";
import "node:crypto";
import "zod";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "drizzle-orm/pg-core";
import "drizzle-orm/node-postgres";
import "pg";
import "drizzle-orm";
import "node:async_hooks";
import "node:stream";
import "react";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const assertAuthenticatedFn_createServerFn_handler = createServerRpc({
  id: "19581cee06c75675a4c2132433a07fb136a59fc47eb61e504bddfaea406acd3e",
  name: "assertAuthenticatedFn",
  filename: "src/fn/guards.ts"
}, (opts) => assertAuthenticatedFn.__executeServer(opts));
const assertAuthenticatedFn = createServerFn({
  method: "GET"
}).handler(assertAuthenticatedFn_createServerFn_handler, async () => {
  const headers = getRequest().headers;
  const session = await auth.api.getSession({
    headers
  });
  if (!session) {
    throw redirect({
      to: "/unauthenticated"
    });
  }
});
export {
  assertAuthenticatedFn_createServerFn_handler
};
