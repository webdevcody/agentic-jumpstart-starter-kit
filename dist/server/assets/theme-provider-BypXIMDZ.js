import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { z } from "zod";
import { c as createServerFn, a as getCookie, s as setCookie$1 } from "../server.js";
import "node:async_hooks";
import "node:stream";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const THEME_COOKIE_NAME = "ui-theme";
const getThemeFn_createServerFn_handler = createServerRpc({
  id: "c55a96fc9c7590e556284e4d72cddce136617c9ae2329815f3e29a0c910eb7b2",
  name: "getThemeFn",
  filename: "src/components/theme-provider.tsx"
}, (opts) => getThemeFn.__executeServer(opts));
const getThemeFn = createServerFn().handler(getThemeFn_createServerFn_handler, async () => {
  const theme = getCookie(THEME_COOKIE_NAME);
  return theme ?? "system";
});
const setThemeFn_createServerFn_handler = createServerRpc({
  id: "7657dde2a7a117a0f15f3fb1b4c22b13c004b6e110224c8627d69bc77665e50f",
  name: "setThemeFn",
  filename: "src/components/theme-provider.tsx"
}, (opts) => setThemeFn.__executeServer(opts));
const setThemeFn = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  theme: z.enum(["dark", "light", "system"])
})).handler(setThemeFn_createServerFn_handler, async ({
  data
}) => {
  setCookie$1(THEME_COOKIE_NAME, data.theme);
  return data.theme;
});
export {
  getThemeFn_createServerFn_handler,
  setThemeFn_createServerFn_handler
};
