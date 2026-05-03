import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import { useSuspenseQuery, useMutation, queryOptions, useQuery, QueryClient } from "@tanstack/react-query";
import { useRouter, ErrorComponent, Link, createRootRouteWithContext, Outlet, useRouterState, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import * as React from "react";
import { useRef, useCallback, useSyncExternalStore, useEffect, createContext, useContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { i as getBaseURL, j as createFetch, m as defu, n as capitalizeFirstLetter, p as privateEnv, h as database, u as user, a as auth } from "./auth-BWkAJVqq.js";
import { Sun, Moon, XIcon, Rocket, LayoutDashboard, Menu, User, Settings, LogOut } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { T as TSS_SERVER_FUNCTION, b as getServerFnById, c as createServerFn } from "../server.js";
import { z } from "zod";
import { a as authenticatedMiddleware } from "./middleware-BDm4WWFo.js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Toaster as Toaster$1 } from "sonner";
import NProgress from "nprogress";
import { s as stripe, u as updateUserPlan, a as getPlanByPriceId, b as updateUserSubscription } from "./plans-BWlk5BO4.js";
import { eq } from "drizzle-orm";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  console.error("DefaultCatchBoundary triggered:", error);
  return /* @__PURE__ */ jsxDEV("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsxDEV(ErrorComponent, { error }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/DefaultCatchBoundary.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`,
          children: "Try Again"
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/DefaultCatchBoundary.tsx",
          lineNumber: 13,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`,
          children: "Home"
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/DefaultCatchBoundary.tsx",
          lineNumber: 21,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/DefaultCatchBoundary.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/DefaultCatchBoundary.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsxDEV("p", { children: "The page you are looking for does not exist." }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
      lineNumber: 7,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm",
          children: "Go back"
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
          lineNumber: 10,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm",
          children: "Start Over"
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
          lineNumber: 16,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/NotFound.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
const appCss = "/assets/app-DoNDoZG9.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const PROTO_POLLUTION_PATTERNS = {
  proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  protoShort: /"__proto__"\s*:/,
  constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
  true: true,
  false: false,
  null: null,
  undefined: void 0,
  nan: NaN,
  infinity: Number.POSITIVE_INFINITY,
  "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
  const match = ISO_DATE_REGEX.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
  const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
  if (offsetSign) {
    const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
    date.setUTCMinutes(date.getUTCMinutes() + offset);
  }
  return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
  const { strict = false, warnings = false, reviver, parseDates = true } = options;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.length > 0 && trimmed[0] === '"' && trimmed.endsWith('"') && !trimmed.slice(1, -1).includes('"')) return trimmed.slice(1, -1);
  const lowerValue = trimmed.toLowerCase();
  if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
  if (!JSON_SIGNATURE.test(trimmed)) {
    if (strict) throw new SyntaxError("[better-json] Invalid JSON");
    return value;
  }
  if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
    const matches = pattern.test(trimmed);
    if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
    return matches;
  }) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
  try {
    const secureReviver = (key, value2) => {
      if (key === "__proto__" || key === "constructor" && value2 && typeof value2 === "object" && "prototype" in value2) {
        if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
        return;
      }
      if (parseDates && typeof value2 === "string") {
        const date = parseISODate(value2);
        if (date) return date;
      }
      return reviver ? reviver(key, value2) : value2;
    };
    return JSON.parse(trimmed, secureReviver);
  } catch (error) {
    if (strict) throw error;
    return value;
  }
}
function parseJSON(value, options = { strict: true }) {
  return betterJSONParse(value, options);
}
const redirectPlugin = {
  id: "redirect",
  name: "Redirect",
  hooks: { onSuccess(context) {
    if (context.data?.url && context.data?.redirect) {
      if (typeof window !== "undefined" && window.location) {
        if (window.location) try {
          window.location.href = context.data.url;
        } catch {
        }
      }
    }
  } }
};
const clean = /* @__PURE__ */ Symbol("clean");
let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;
const nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
const atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
  let listeners = [];
  let $atom = {
    get() {
      if (!$atom.lc) {
        $atom.listen(() => {
        })();
      }
      return $atom.value;
    },
    init: initialValue,
    lc: 0,
    listen(listener) {
      $atom.lc = listeners.push(listener);
      return () => {
        for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length; ) {
          if (listenerQueue[i] === listener) {
            listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
          } else {
            i += QUEUE_ITEMS_PER_LISTENER;
          }
        }
        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 1);
          if (!--$atom.lc) $atom.off();
        }
      };
    },
    notify(oldValue, changedKey) {
      nanostoresGlobal.epoch++;
      let runListenerQueue = !listenerQueue.length;
      for (let listener of listeners) {
        listenerQueue.push(listener, $atom.value, oldValue, changedKey);
      }
      if (runListenerQueue) {
        for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) {
          listenerQueue[lqIndex](
            listenerQueue[lqIndex + 1],
            listenerQueue[lqIndex + 2],
            listenerQueue[lqIndex + 3]
          );
        }
        listenerQueue.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {
    },
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener) {
      let unbind = $atom.listen(listener);
      listener($atom.value);
      return unbind;
    },
    value: initialValue
  };
  {
    $atom[clean] = () => {
      listeners = [];
      $atom.lc = 0;
      $atom.off();
    };
  }
  return $atom;
};
const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;
let on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  };
};
const STORE_UNMOUNT_DELAY = 1e3;
let onMount = ($store, initialize) => {
  let listener = (payload) => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, (runListeners) => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args);
    };
    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };
    {
      let originClean = $store[clean];
      $store[clean] = () => {
        for (let destroy of $store.events[UNMOUNT]) destroy();
        $store.events[UNMOUNT] = [];
        $store.active = false;
        originClean();
      };
    }
    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    };
  });
};
function listenKeys($store, keys, listener) {
  let keysSet = new Set(keys).add(void 0);
  return $store.listen((value, oldValue, changed) => {
    if (keysSet.has(changed)) {
      listener(value, oldValue, changed);
    }
  });
}
const isServer = () => typeof window === "undefined";
const useAuthQuery = (initializedAtom, path, $fetch, options) => {
  const value = /* @__PURE__ */ atom({
    data: null,
    error: null,
    isPending: true,
    isRefetching: false,
    refetch: (queryParams) => fn(queryParams)
  });
  const fn = async (queryParams) => {
    return new Promise((resolve) => {
      const opts = typeof options === "function" ? options({
        data: value.get().data,
        error: value.get().error,
        isPending: value.get().isPending
      }) : options;
      $fetch(path, {
        ...opts,
        query: {
          ...opts?.query,
          ...queryParams?.query
        },
        async onSuccess(context) {
          value.set({
            data: context.data,
            error: null,
            isPending: false,
            isRefetching: false,
            refetch: value.value.refetch
          });
          await opts?.onSuccess?.(context);
        },
        async onError(context) {
          const { request } = context;
          const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
          const retryAttempt = request.retryAttempt || 0;
          if (retryAttempts && retryAttempt < retryAttempts) return;
          const isUnauthorized = context.error.status === 401;
          value.set({
            error: context.error,
            data: isUnauthorized ? null : value.get().data,
            isPending: false,
            isRefetching: false,
            refetch: value.value.refetch
          });
          await opts?.onError?.(context);
        },
        async onRequest(context) {
          const currentValue = value.get();
          value.set({
            isPending: currentValue.data === null,
            data: currentValue.data,
            error: null,
            isRefetching: true,
            refetch: value.value.refetch
          });
          await opts?.onRequest?.(context);
        }
      }).catch((error) => {
        value.set({
          error,
          data: value.get().data,
          isPending: false,
          isRefetching: false,
          refetch: value.value.refetch
        });
      }).finally(() => {
        resolve(void 0);
      });
    });
  };
  initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [initializedAtom];
  let isInitialized = false;
  for (const initAtom of initializedAtom) initAtom.subscribe(async () => {
    if (isServer()) return;
    if (isInitialized) await fn();
    else onMount(value, () => {
      const timeoutId = setTimeout(async () => {
        if (!isInitialized) {
          isInitialized = true;
          await fn();
        }
      }, 0);
      return () => {
        value.off();
        initAtom.off();
        clearTimeout(timeoutId);
      };
    });
  });
  return value;
};
const kBroadcastChannel = /* @__PURE__ */ Symbol.for("better-auth:broadcast-channel");
const now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
  listeners = /* @__PURE__ */ new Set();
  name;
  constructor(name = "better-auth.message") {
    this.name = name;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  post(message) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.name, JSON.stringify({
        ...message,
        timestamp: now$1()
      }));
    } catch {
    }
  }
  setup() {
    if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {
    };
    const handler = (event) => {
      if (event.key !== this.name) return;
      const message = JSON.parse(event.newValue ?? "{}");
      if (message?.event !== "session" || !message?.data) return;
      this.listeners.forEach((listener) => listener(message));
    };
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  }
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
  if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
  return globalThis[kBroadcastChannel];
}
const kFocusManager = /* @__PURE__ */ Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
  listeners = /* @__PURE__ */ new Set();
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setFocused(focused) {
    this.listeners.forEach((listener) => listener(focused));
  }
  setup() {
    if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {
    };
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") this.setFocused(true);
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);
    return () => {
      document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }
};
function getGlobalFocusManager() {
  if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
  return globalThis[kFocusManager];
}
const kOnlineManager = /* @__PURE__ */ Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
  listeners = /* @__PURE__ */ new Set();
  isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setOnline(online) {
    this.isOnline = online;
    this.listeners.forEach((listener) => listener(online));
  }
  setup() {
    if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {
    };
    const onOnline = () => this.setOnline(true);
    const onOffline = () => this.setOnline(false);
    window.addEventListener("online", onOnline, false);
    window.addEventListener("offline", onOffline, false);
    return () => {
      window.removeEventListener("online", onOnline, false);
      window.removeEventListener("offline", onOffline, false);
    };
  }
};
function getGlobalOnlineManager() {
  if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
  return globalThis[kOnlineManager];
}
const now = () => Math.floor(Date.now() / 1e3);
function normalizeSessionResponse(res) {
  if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
  return {
    data: res,
    error: null
  };
}
const FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
  const { sessionAtom, sessionSignal, $fetch, options = {} } = opts;
  const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
  const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
  const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
  const state = {
    lastSync: 0,
    lastSessionRequest: 0,
    cachedSession: void 0
  };
  const shouldRefetch = () => {
    return refetchWhenOffline || getGlobalOnlineManager().isOnline;
  };
  const triggerRefetch = (event) => {
    if (!shouldRefetch()) return;
    if (event?.event === "storage") {
      state.lastSync = now();
      sessionSignal.set(!sessionSignal.get());
      return;
    }
    const currentSession = sessionAtom.get();
    const fetchSessionWithRefresh = () => {
      state.lastSessionRequest = now();
      $fetch("/get-session").then(async (res) => {
        let { data, error } = normalizeSessionResponse(res);
        if (data?.needsRefresh) try {
          const refreshRes = await $fetch("/get-session", { method: "POST" });
          ({ data, error } = normalizeSessionResponse(refreshRes));
        } catch {
        }
        const sessionData = data?.session && data?.user ? data : null;
        sessionAtom.set({
          ...currentSession,
          data: sessionData,
          error
        });
        state.lastSync = now();
        sessionSignal.set(!sessionSignal.get());
      }).catch(() => {
      });
    };
    if (event?.event === "poll") {
      fetchSessionWithRefresh();
      return;
    }
    if (event?.event === "visibilitychange") {
      if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
      state.lastSessionRequest = now();
    }
    if (event?.event === "visibilitychange") {
      fetchSessionWithRefresh();
      return;
    }
    if (currentSession?.data === null || currentSession?.data === void 0) {
      state.lastSync = now();
      sessionSignal.set(!sessionSignal.get());
    }
  };
  const broadcastSessionUpdate = (trigger) => {
    getGlobalBroadcastChannel().post({
      event: "session",
      data: { trigger },
      clientId: Math.random().toString(36).substring(7)
    });
  };
  const setupPolling = () => {
    if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
      if (sessionAtom.get()?.data) triggerRefetch({ event: "poll" });
    }, refetchInterval * 1e3);
  };
  const setupBroadcast = () => {
    state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
      triggerRefetch({ event: "storage" });
    });
  };
  const setupFocusRefetch = () => {
    if (!refetchOnWindowFocus) return;
    state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
      triggerRefetch({ event: "visibilitychange" });
    });
  };
  const setupOnlineRefetch = () => {
    state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
      if (online) triggerRefetch({ event: "visibilitychange" });
    });
  };
  const init = () => {
    setupPolling();
    setupBroadcast();
    setupFocusRefetch();
    setupOnlineRefetch();
    getGlobalBroadcastChannel().setup();
    getGlobalFocusManager().setup();
    getGlobalOnlineManager().setup();
  };
  const cleanup = () => {
    if (state.pollInterval) {
      clearInterval(state.pollInterval);
      state.pollInterval = void 0;
    }
    if (state.unsubscribeBroadcast) {
      state.unsubscribeBroadcast();
      state.unsubscribeBroadcast = void 0;
    }
    if (state.unsubscribeFocus) {
      state.unsubscribeFocus();
      state.unsubscribeFocus = void 0;
    }
    if (state.unsubscribeOnline) {
      state.unsubscribeOnline();
      state.unsubscribeOnline = void 0;
    }
    state.lastSync = 0;
    state.lastSessionRequest = 0;
    state.cachedSession = void 0;
  };
  return {
    init,
    cleanup,
    triggerRefetch,
    broadcastSessionUpdate
  };
}
function getSessionAtom($fetch, options) {
  const $signal = /* @__PURE__ */ atom(false);
  const session = useAuthQuery($signal, "/get-session", $fetch, { method: "GET" });
  let broadcastSessionUpdate = () => {
  };
  onMount(session, () => {
    const refreshManager = createSessionRefreshManager({
      sessionAtom: session,
      sessionSignal: $signal,
      $fetch,
      options
    });
    refreshManager.init();
    broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
    return () => {
      refreshManager.cleanup();
    };
  });
  return {
    session,
    $sessionSignal: $signal,
    broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
  };
}
const resolvePublicAuthUrl = (basePath) => {
  if (typeof process === "undefined") return void 0;
  const path = basePath ?? "/api/auth";
  if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
  if (typeof window === "undefined") {
    if (process.env.NEXTAUTH_URL) try {
      return process.env.NEXTAUTH_URL;
    } catch {
    }
    if (process.env.VERCEL_URL) try {
      const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
      return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
    } catch {
    }
  }
};
const getClientConfig = (options, loadEnv) => {
  const isCredentialsSupported = "credentials" in Request.prototype;
  const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
  const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
  const lifeCyclePlugin = {
    id: "lifecycle-hooks",
    name: "lifecycle-hooks",
    hooks: {
      onSuccess: options?.fetchOptions?.onSuccess,
      onError: options?.fetchOptions?.onError,
      onRequest: options?.fetchOptions?.onRequest,
      onResponse: options?.fetchOptions?.onResponse
    }
  };
  const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
  const $fetch = createFetch({
    baseURL,
    ...isCredentialsSupported ? { credentials: "include" } : {},
    method: "GET",
    jsonParser(text) {
      if (!text) return null;
      return parseJSON(text, { strict: false });
    },
    customFetchImpl: fetch,
    ...restOfFetchOptions,
    plugins: [
      lifeCyclePlugin,
      ...restOfFetchOptions.plugins || [],
      ...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
      ...pluginsFetchPlugins
    ]
  });
  const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
  const plugins = options?.plugins || [];
  let pluginsActions = {};
  const pluginsAtoms = {
    $sessionSignal,
    session
  };
  const pluginPathMethods = {
    "/sign-out": "POST",
    "/revoke-sessions": "POST",
    "/revoke-other-sessions": "POST",
    "/delete-user": "POST"
  };
  const atomListeners = [{
    signal: "$sessionSignal",
    matcher(path) {
      return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
    },
    callback(path) {
      if (path === "/sign-out") broadcastSessionUpdate("signout");
      else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
    }
  }];
  for (const plugin of plugins) {
    if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
    if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
    if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
  }
  const $store = {
    notify: (signal) => {
      pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
    },
    listen: (signal, listener) => {
      pluginsAtoms[signal].subscribe(listener);
    },
    atoms: pluginsAtoms
  };
  for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
  return {
    get baseURL() {
      return baseURL;
    },
    pluginsActions,
    pluginsAtoms,
    pluginPathMethods,
    atomListeners,
    $fetch,
    $store
  };
};
function isAtom(value) {
  return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
  const method = knownPathMethods[path];
  const { fetchOptions, query: _query, ...body } = args || {};
  if (method) return method;
  if (fetchOptions?.method) return fetchOptions.method;
  if (body && Object.keys(body).length > 0) return "POST";
  return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
  function createProxy(path = []) {
    return new Proxy(function() {
    }, {
      get(_, prop) {
        if (typeof prop !== "string") return;
        if (prop === "then" || prop === "catch" || prop === "finally") return;
        const fullPath = [...path, prop];
        let current = routes;
        for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
        else {
          current = void 0;
          break;
        }
        if (typeof current === "function") return current;
        if (isAtom(current)) return current;
        return createProxy(fullPath);
      },
      apply: async (_, __, args) => {
        const routePath = "/" + path.map((segment) => segment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)).join("/");
        const arg = args[0] || {};
        const fetchOptions = args[1] || {};
        const { query, fetchOptions: argFetchOptions, ...body } = arg;
        const options = {
          ...fetchOptions,
          ...argFetchOptions
        };
        const method = getMethod(routePath, knownPathMethods, arg);
        return await client(routePath, {
          ...options,
          body: method === "GET" ? void 0 : {
            ...body,
            ...options?.body || {}
          },
          query: query || options?.query,
          method,
          async onSuccess(context) {
            await options?.onSuccess?.(context);
            if (!atomListeners || options.disableSignal) return;
            const matches = atomListeners.filter((s) => s.matcher(routePath));
            if (!matches.length) return;
            const visited = /* @__PURE__ */ new Set();
            for (const match of matches) {
              const signal = atoms[match.signal];
              if (!signal) return;
              if (visited.has(match.signal)) continue;
              visited.add(match.signal);
              const val = signal.get();
              setTimeout(() => {
                signal.set(!val);
              }, 10);
              match.callback?.(routePath);
            }
          }
        });
      }
    });
  }
  return createProxy();
}
function useStore(store, options = {}) {
  const snapshotRef = useRef(store.get());
  const { keys, deps = [store, keys] } = options;
  const subscribe = useCallback((onChange) => {
    const emitChange = (value) => {
      if (snapshotRef.current === value) return;
      snapshotRef.current = value;
      onChange();
    };
    emitChange(store.value);
    if (keys?.length) return listenKeys(store, keys, emitChange);
    return store.listen(emitChange);
  }, deps);
  const get = () => snapshotRef.current;
  return useSyncExternalStore(subscribe, get, get);
}
function getAtomKey(str) {
  return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
  const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
  const resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
  return createDynamicPathProxy({
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store
  }, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
const authClient = createAuthClient({
  baseURL: "http://localhost:3000"
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxDEV(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/button.tsx",
      lineNumber: 51,
      columnNumber: 5
    },
    this
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "z-[100] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
      lineNumber: 71,
      columnNumber: 5
    },
    this
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
      lineNumber: 158,
      columnNumber: 5
    },
    this
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/dropdown-menu.tsx",
      lineNumber: 175,
      columnNumber: 5
    },
    this
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function useThemeQuery() {
  return useSuspenseQuery({
    queryKey: ["theme"],
    queryFn: () => getThemeFn()
  });
}
function useSetTheme() {
  return useMutation({
    mutationFn: setThemeFn
  });
}
const initialState = {
  theme: "system",
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);
const getThemeFn = createServerFn().handler(createSsrRpc("c55a96fc9c7590e556284e4d72cddce136617c9ae2329815f3e29a0c910eb7b2"));
const setThemeFn = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  theme: z.enum(["dark", "light", "system"])
})).handler(createSsrRpc("7657dde2a7a117a0f15f3fb1b4c22b13c004b6e110224c8627d69bc77665e50f"));
function ThemeProvider({
  children,
  ...props
}) {
  const themeQuery = useThemeQuery();
  const setThemeMutation = useSetTheme();
  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (themeQuery.data === "system") {
        const newColorScheme = event.matches ? "dark" : "light";
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newColorScheme);
      }
    });
  }, [themeQuery.data]);
  useEffect(() => {
    const theme = themeQuery.data;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [themeQuery.data]);
  const value = {
    theme: themeQuery.data,
    setTheme: (theme) => {
      console.log("setting theme", theme);
      setThemeMutation.mutate({
        data: {
          theme
        }
      }, {
        onSuccess: () => {
          themeQuery.refetch();
        }
      });
    }
  };
  return /* @__PURE__ */ jsxDEV(ThemeProviderContext.Provider, { ...props, value, children }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/theme-provider.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this);
}
const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
function ModeToggle() {
  const { setTheme } = useTheme();
  return /* @__PURE__ */ jsxDEV(DropdownMenu, { children: [
    /* @__PURE__ */ jsxDEV(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxDEV(Button, { variant: "outline", size: "icon", children: [
      /* @__PURE__ */ jsxDEV(Sun, { className: "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 19,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: "Toggle theme" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 21,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxDEV(DropdownMenuItem, { onClick: () => setTheme("light"), children: "Light" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DropdownMenuItem, { onClick: () => setTheme("dark"), children: "Dark" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DropdownMenuItem, { onClick: () => setTheme("system"), children: "System" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/mode-toggle.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/avatar.tsx",
      lineNumber: 9,
      columnNumber: 5
    },
    this
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    "img",
    {
      className: cn("aspect-square h-full w-full", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/avatar.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/avatar.tsx",
      lineNumber: 36,
      columnNumber: 5
    },
    this
  );
}
createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  videoKey: z.string()
})).handler(createSsrRpc("610332affe54dce49d2c5b3553feab913e268a25da2886ff8cc7a38f049aeaf7"));
const getPresignedImageUploadUrlFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  imageKey: z.string()
})).handler(createSsrRpc("d9234728733cefe7b317868901f873f31d66d20f89e6e5978706c16dd0d7cd6f"));
const getImageUrlFn = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  imageKey: z.string()
})).handler(createSsrRpc("2df6b4342eedb937bf3d92cfe05ebd5a833d112f86c005def30fa8cc336984c7"));
const updateUserProfileFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  name: z.string().optional(),
  image: z.string().optional()
})).handler(createSsrRpc("1532c05db466ba1b1bc583dee69628bf12ef40c1a2afa5eb87dedd956ac18a00"));
createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  fileName: z.string(),
  contentType: z.string()
})).handler(createSsrRpc("707390cd9bacb8ad9b94538edd1c8ad6d55bed8171a8659e68e98c1997e4071a"));
const deleteUserAccountFn = createServerFn({
  method: "POST"
}).middleware([authenticatedMiddleware]).inputValidator(z.object({
  email: z.string().email()
})).handler(createSsrRpc("af7ddf1ac8af1852cae9847fc884ab80bf328b5a4f8ff5bc6b044f5dc5f55549"));
const getUserAvatarQuery = (imageKey) => queryOptions({
  queryKey: ["avatar-url", imageKey],
  queryFn: async () => {
    if (!imageKey) {
      return { imageUrl: null };
    }
    try {
      const result = await getImageUrlFn({
        data: { imageKey }
      });
      return { imageUrl: result.imageUrl };
    } catch (error) {
      console.error("Error fetching avatar URL:", error);
      return { imageUrl: null };
    }
  },
  enabled: !!imageKey,
  retry: false,
  // Don't retry on failure
  staleTime: 5 * 60 * 1e3
  // 5 minutes
});
function useUserAvatar() {
  const { data: session } = authClient.useSession();
  const avatarQuery = useQuery(
    getUserAvatarQuery(session?.user?.image || null)
  );
  return {
    avatarUrl: avatarQuery.data?.imageUrl || null,
    isLoading: avatarQuery.isLoading,
    error: avatarQuery.error,
    refetch: avatarQuery.refetch
  };
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Root, { "data-slot": "sheet", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
    lineNumber: 8,
    columnNumber: 10
  }, this);
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
    lineNumber: 14,
    columnNumber: 10
  }, this);
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxDEV(SheetPortal, { children: [
    /* @__PURE__ */ jsxDEV(SheetOverlay, {}, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxDEV(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxDEV(XIcon, { className: "size-4" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
              lineNumber: 74,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: "Close" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
              lineNumber: 75,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
            lineNumber: 73,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
        lineNumber: 56,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sheet.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
const navigationLinks = [{ title: "Home", href: "/" }];
function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { avatarUrl } = useUserAvatar();
  return /* @__PURE__ */ jsxDEV("header", { className: "sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-screen-2xl mx-auto px-8 flex h-14 items-center", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mr-4 flex gap-16", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(Rocket, {}, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "hidden font-bold sm:inline-block", children: "Launch Kit" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 32,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 30,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex items-center gap-8 text-sm", children: [
        navigationLinks.map((link) => /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: link.href,
            className: "transition-colors hover:text-foreground/80 text-foreground/60",
            children: link.title
          },
          link.title,
          false,
          {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
            lineNumber: 37,
            columnNumber: 15
          },
          this
        )),
        session && /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/dashboard",
            className: "flex items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60",
            children: [
              /* @__PURE__ */ jsxDEV(LayoutDashboard, { className: "h-4 w-4" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 50,
                columnNumber: 17
              }, this),
              "Dashboard"
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
            lineNumber: 46,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(Sheet, { open: mobileMenuOpen, onOpenChange: setMobileMenuOpen, children: [
      /* @__PURE__ */ jsxDEV(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxDEV(
        Button,
        {
          variant: "ghost",
          className: "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden",
          children: [
            /* @__PURE__ */ jsxDEV(Menu, { className: "h-5 w-5" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 63,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "sr-only", children: "Toggle Menu" }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 64,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 59,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(SheetContent, { side: "left", className: "pr-0", children: /* @__PURE__ */ jsxDEV("div", { className: "px-7", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/",
            className: "flex items-center space-x-2",
            onClick: () => setMobileMenuOpen(false),
            children: [
              /* @__PURE__ */ jsxDEV(Rocket, { className: "h-6 w-6" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 74,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: "Launch Kit" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 75,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
            lineNumber: 69,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("nav", { className: "flex flex-col gap-3 mt-6", children: [
          navigationLinks.map((link) => /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: link.href,
              className: "block px-2 py-1 text-lg transition-colors hover:text-foreground/80 text-foreground/60",
              onClick: () => setMobileMenuOpen(false),
              children: link.title
            },
            link.title,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 79,
              columnNumber: 19
            },
            this
          )),
          session && /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/dashboard",
              className: "flex items-center gap-2 px-2 py-1 text-lg transition-colors hover:text-foreground/80 text-foreground/60",
              onClick: () => setMobileMenuOpen(false),
              children: [
                /* @__PURE__ */ jsxDEV(LayoutDashboard, { className: "h-5 w-5" }, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                  lineNumber: 94,
                  columnNumber: 21
                }, this),
                "Dashboard"
              ]
            },
            void 0,
            true,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 89,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 77,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-1 items-center justify-between space-x-2 md:justify-end", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-full flex-1 md:w-auto md:flex-none" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("nav", { className: "flex items-center gap-4", children: [
        isPending ? /* @__PURE__ */ jsxDEV("div", { className: "flex h-9 w-9 items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 108,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this) : session ? /* @__PURE__ */ jsxDEV(DropdownMenu, { children: [
          /* @__PURE__ */ jsxDEV(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxDEV(
            Button,
            {
              variant: "ghost",
              className: "relative h-8 w-8 rounded-full",
              children: /* @__PURE__ */ jsxDEV(Avatar, { className: "h-8 w-8", children: [
                /* @__PURE__ */ jsxDEV(AvatarImage, { src: avatarUrl || void 0 }, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                  lineNumber: 118,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(AvatarFallback, { className: "bg-primary/10", children: session?.user?.name?.charAt(0)?.toUpperCase() || /* @__PURE__ */ jsxDEV(User, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                  lineNumber: 121,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                  lineNumber: 119,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 117,
                columnNumber: 21
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 113,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
            /* @__PURE__ */ jsxDEV(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-1", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium leading-none", children: session.user.name || "Account" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 130,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs leading-none text-muted-foreground", children: session.user.email }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 133,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 129,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 128,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 138,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxDEV(Link, { to: "/dashboard", children: [
              /* @__PURE__ */ jsxDEV(LayoutDashboard, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 141,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Dashboard" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 142,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 140,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 139,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxDEV(Link, { to: "/account", children: [
              /* @__PURE__ */ jsxDEV(Settings, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 147,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Account" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 148,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 146,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 145,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(DropdownMenuItem, { onClick: () => authClient.signOut(), children: [
              /* @__PURE__ */ jsxDEV(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 152,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Log out" }, void 0, false, {
                fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
                lineNumber: 153,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 151,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
            lineNumber: 127,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 111,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV(
            Link,
            {
              className: buttonVariants({ variant: "outline" }),
              to: "/sign-in",
              search: { redirect: void 0 },
              children: "Sign In"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 159,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            Link,
            {
              className: buttonVariants({ variant: "default" }),
              to: "/sign-up",
              search: { redirect: void 0 },
              children: "Sign Up"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
              lineNumber: 166,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 158,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(ModeToggle, {}, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
          lineNumber: 175,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Header.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
const Toaster = ({ ...props }) => {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxDEV(
    Toaster$1,
    {
      theme: theme === "dark" ? "dark" : "light",
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/sonner.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    void 0
  );
};
function Footer() {
  return /* @__PURE__ */ jsxDEV("footer", { className: "border-t bg-background", children: /* @__PURE__ */ jsxDEV("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-8 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold mb-3", children: "Product" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 10,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Features"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 13,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 12,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Pricing"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 21,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 20,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Documentation"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 29,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 28,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 11,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 9,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold mb-3", children: "Company" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "About"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 42,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 41,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Blog"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 50,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Careers"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 58,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold mb-3", children: "Resources" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Community"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 71,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Help Center"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 79,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/",
              className: "hover:text-foreground transition-colors",
              children: "Contact"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 87,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 86,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold mb-3", children: "Legal" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 97,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/privacy",
              className: "hover:text-foreground transition-colors",
              children: "Privacy Policy"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 100,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 99,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            Link,
            {
              to: "/terms",
              className: "hover:text-foreground transition-colors",
              children: "Terms of Service"
            },
            void 0,
            false,
            {
              fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
              lineNumber: 108,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 98,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-8 pt-8 border-t", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-between gap-4 md:flex-row", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(Rocket, { className: "h-6 w-6" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 121,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold", children: "Launch Kit" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
          lineNumber: 122,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-muted-foreground", children: "© 2026 Launch Kit. All rights reserved." }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
        lineNumber: 124,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
      lineNumber: 119,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
      lineNumber: 118,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/Footer.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsxDEV(RootDocument, { children: /* @__PURE__ */ jsxDEV(DefaultCatchBoundary, { ...props }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, void 0);
  },
  notFoundComponent: () => /* @__PURE__ */ jsxDEV(NotFound, {}, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
    lineNumber: 72,
    columnNumber: 28
  }, void 0),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxDEV(RootDocument, { children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
    lineNumber: 79,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
    lineNumber: 78,
    columnNumber: 5
  }, this);
}
function RootDocument({ children }) {
  const routerState = useRouterState();
  const prevPathnameRef = React.useRef("");
  React.useEffect(() => {
    const currentPathname = routerState.location.pathname;
    const pathnameChanged = prevPathnameRef.current !== currentPathname;
    if (pathnameChanged && routerState.status === "pending") {
      NProgress.start();
      prevPathnameRef.current = currentPathname;
    }
    if (routerState.status === "idle") {
      NProgress.done();
    }
  }, [routerState.status, routerState.location.pathname]);
  return /* @__PURE__ */ jsxDEV("html", { suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxDEV("head", { children: [
      /* @__PURE__ */ jsxDEV(HeadContent, {}, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              (function() {
                // Constants (must match ThemeProvider.tsx)
                const THEME_COOKIE_NAME = 'ui-theme';
                const COOKIE_EXPIRY_DAYS = 365;
                const MILLISECONDS_PER_DAY = 864e5;
                const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
                const THEME_CLASSES = { LIGHT: 'light', DARK: 'dark' };
                
                // Get theme from cookie
                let theme = document.cookie.match(new RegExp('(^| )' + THEME_COOKIE_NAME + '=([^;]+)'))?.[2];
                
                let resolvedTheme;
                let root = document.documentElement;
                
                // Clear any existing theme classes
                root.classList.remove(THEME_CLASSES.LIGHT, THEME_CLASSES.DARK);
                
                if (!theme || theme === 'system') {
                  // Use system preference for system theme or if no theme is set
                  resolvedTheme = window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? THEME_CLASSES.DARK : THEME_CLASSES.LIGHT;
                  
                  if (!theme) {
                    // Set cookie with system preference on first visit
                    const expires = new Date(Date.now() + COOKIE_EXPIRY_DAYS * MILLISECONDS_PER_DAY).toUTCString();
                    document.cookie = THEME_COOKIE_NAME + '=system; expires=' + expires + '; path=/; SameSite=Lax';
                  }
                } else {
                  resolvedTheme = theme;
                }
                
                root.classList.add(resolvedTheme);
                
                // Add data attribute for debugging
                root.setAttribute('data-theme', theme || 'system');
                root.setAttribute('data-resolved-theme', resolvedTheme);
              })();
            `
          }
        },
        void 0,
        false,
        {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
          lineNumber: 106,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("style", { children: `
          #nprogress .bar {
            background: var(--primary) !important;
            height: 3px;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px var(--primary), 0 0 5px var(--primary);
          }
          #nprogress .spinner-icon {
            display: none;
          }
        ` }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("body", { children: /* @__PURE__ */ jsxDEV(ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-background", children: [
        /* @__PURE__ */ jsxDEV(Header, {}, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("main", { children }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
          lineNumber: 165,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
          lineNumber: 166,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 163,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(TanStackRouterDevtools, { position: "bottom-right" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 168,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(ReactQueryDevtools, { buttonPosition: "bottom-left" }, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Toaster, {}, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Scripts, {}, void 0, false, {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
        lineNumber: 171,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
      lineNumber: 162,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
      lineNumber: 161,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/routes/__root.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}
const $$splitComponentImporter$7 = () => import("./unauthenticated-dQa9BxyI.js");
const Route$9 = createFileRoute("/unauthenticated")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./terms-na0zStW0.js");
const Route$8 = createFileRoute("/terms")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./sign-up-CmYsh5qV.js");
z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, "Password must be at least 6 characters")
});
const Route$7 = createFileRoute("/sign-up")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  validateSearch: (search) => ({
    redirect: search.redirect
  })
});
const $$splitComponentImporter$4 = () => import("./sign-in-BjawgTCk.js");
z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, "Password must be at least 6 characters")
});
const Route$6 = createFileRoute("/sign-in")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  validateSearch: (search) => ({
    redirect: search.redirect
  })
});
const $$splitComponentImporter$3 = () => import("./privacy-cfJrg2Ra.js");
const Route$5 = createFileRoute("/privacy")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const assertAuthenticatedFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("19581cee06c75675a4c2132433a07fb136a59fc47eb61e504bddfaea406acd3e"));
const $$splitComponentImporter$2 = () => import("./dashboard-DyjIPem1.js");
const Route$4 = createFileRoute("/dashboard")({
  beforeLoad: () => assertAuthenticatedFn(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./account-C8dEj7Ek.js");
const Route$3 = createFileRoute("/account")({
  beforeLoad: () => assertAuthenticatedFn(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BWfAbZgL.js");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$1 = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();
        const sig = request.headers.get("stripe-signature");
        if (!sig) {
          return Response.json(
            { error: "Missing stripe signature" },
            { status: 400 }
          );
        }
        let event;
        try {
          event = stripe.webhooks.constructEvent(
            body,
            sig,
            privateEnv.STRIPE_WEBHOOK_SECRET
          );
        } catch (err) {
          console.error("Webhook signature verification failed:", err);
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }
        console.log("Received Stripe webhook:", event.type);
        try {
          switch (event.type) {
            case "checkout.session.completed":
              await handleCheckoutCompleted(event.data.object);
              break;
            case "customer.subscription.created":
            case "customer.subscription.updated":
              await handleSubscriptionChange(event.data.object);
              break;
            case "customer.subscription.deleted":
              await handleSubscriptionDeleted(event.data.object);
              break;
            default:
              console.log(`Unhandled event type: ${event.type}`);
          }
          return Response.json({ received: true });
        } catch (error) {
          console.error("Error processing webhook:", error);
          return Response.json(
            { error: "Webhook processing failed" },
            { status: 500 }
          );
        }
      }
    }
  }
});
async function handleCheckoutCompleted(session) {
  console.log("Handling checkout completed:", session.id);
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription
  );
  console.log("Subscription:", subscription);
  const subscriptionItem = subscription.items.data[0];
  const periodEnd = subscriptionItem?.current_period_end;
  if (!periodEnd || isNaN(periodEnd)) {
    console.error("Invalid item current_period_end:", periodEnd);
    throw new Error("Invalid subscription period end date");
  }
  await updateUserSubscription(session.metadata.userId, {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    plan: getPlanByPriceId(subscriptionItem?.price.id)?.plan,
    status: subscription.status,
    expiresAt: new Date(periodEnd * 1e3)
  });
  console.log(`Checkout completed for user ${session.metadata.userId}`);
}
async function handleSubscriptionChange(subscription) {
  console.log("Handling subscription change:", subscription.id);
  const priceId = subscription.items.data[0]?.price.id;
  const planDetails = getPlanByPriceId(priceId);
  if (!planDetails) {
    console.error("No plan found for price ID:", priceId);
    return;
  }
  const [userData] = await database.select().from(user).where(eq(user.stripeCustomerId, subscription.customer));
  if (!userData) {
    console.error("No user found for customer:", subscription.customer);
    return;
  }
  const subscriptionItem = subscription.items.data[0];
  const periodEnd = subscriptionItem?.current_period_end;
  const expiresAt = periodEnd ? new Date(periodEnd * 1e3) : void 0;
  await updateUserSubscription(userData.id, {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    plan: planDetails.plan,
    status: subscription.status,
    expiresAt
  });
  console.log(
    `Updated subscription ${subscription.id} for user ${userData.id}`
  );
}
async function handleSubscriptionDeleted(subscription) {
  console.log("Handling subscription deleted:", subscription.id);
  const customerId = subscription.customer;
  const [userData] = await database.select().from(user).where(eq(user.stripeCustomerId, customerId));
  if (!userData) {
    console.error("No user found for customer:", customerId);
    return;
  }
  await updateUserPlan(userData.id, "free");
  await database.update(user).set({
    subscriptionStatus: "canceled",
    subscriptionExpiresAt: new Date(subscription.canceled_at * 1e3),
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(user.id, userData.id));
  console.log(
    `Reset user ${userData.id} to free plan after subscription deletion`
  );
}
const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return auth.handler(request);
      },
      POST: ({ request }) => {
        return auth.handler(request);
      }
    }
  }
});
const UnauthenticatedRoute = Route$9.update({
  id: "/unauthenticated",
  path: "/unauthenticated",
  getParentRoute: () => Route$a
});
const TermsRoute = Route$8.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$a
});
const SignUpRoute = Route$7.update({
  id: "/sign-up",
  path: "/sign-up",
  getParentRoute: () => Route$a
});
const SignInRoute = Route$6.update({
  id: "/sign-in",
  path: "/sign-in",
  getParentRoute: () => Route$a
});
const PrivacyRoute = Route$5.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$a
});
const DashboardRoute = Route$4.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$a
});
const AccountRoute = Route$3.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const ApiStripeWebhookRoute = Route$1.update({
  id: "/api/stripe/webhook",
  path: "/api/stripe/webhook",
  getParentRoute: () => Route$a
});
const ApiAuthSplatRoute = Route.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$a
});
const rootRouteChildren = {
  IndexRoute,
  AccountRoute,
  DashboardRoute,
  PrivacyRoute,
  SignInRoute,
  SignUpRoute,
  TermsRoute,
  UnauthenticatedRoute,
  ApiAuthSplatRoute,
  ApiStripeWebhookRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
async function getRouter() {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsxDEV(NotFound, {}, void 0, false, {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/router.tsx",
      lineNumber: 16,
      columnNumber: 37
    }, this)
  });
  setupRouterSsrQueryIntegration({
    router: router2,
    queryClient
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Avatar as A,
  Button as B,
  Route$7 as R,
  authClient as a,
  Route$6 as b,
  cn as c,
  buttonVariants as d,
  deleteUserAccountFn as e,
  createSsrRpc as f,
  getPresignedImageUploadUrlFn as g,
  useUserAvatar as h,
  AvatarImage as i,
  AvatarFallback as j,
  router as r,
  updateUserProfileFn as u
};
