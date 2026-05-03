import { AsyncLocalStorage } from "node:async_hooks";
import { Readable, PassThrough } from "node:stream";
import "react";
import { RouterProvider } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { defineHandlerCallback, renderRouterToStream } from "@tanstack/react-router/ssr/server";
function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
  request,
  router,
  responseHeaders,
  children: /* @__PURE__ */ jsx(StartServer, { router })
}));
const NullProtoObj = /* @__PURE__ */ (() => {
  const e = function() {
  };
  return e.prototype = /* @__PURE__ */ Object.create(null), Object.freeze(e.prototype), e;
})();
function lazyInherit(target, source, sourceKey) {
  for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
    if (key === "constructor") continue;
    const targetDesc = Object.getOwnPropertyDescriptor(target, key);
    const desc = Object.getOwnPropertyDescriptor(source, key);
    let modified = false;
    if (desc.get) {
      modified = true;
      desc.get = targetDesc?.get || function() {
        return this[sourceKey][key];
      };
    }
    if (desc.set) {
      modified = true;
      desc.set = targetDesc?.set || function(value) {
        this[sourceKey][key] = value;
      };
    }
    if (!targetDesc?.value && typeof desc.value === "function") {
      modified = true;
      desc.value = function(...args) {
        return this[sourceKey][key](...args);
      };
    }
    if (modified) Object.defineProperty(target, key, desc);
  }
}
const _needsNormRE = /(?:(?:^|\/)(?:\.|\.\.|%2e|%2e\.|\.%2e|%2e%2e)(?:\/|$))|[\\^\x80-\uffff]/i;
const FastURL = /* @__PURE__ */ (() => {
  const NativeURL = globalThis.URL;
  const FastURL2 = class URL {
    #url;
    #href;
    #protocol;
    #host;
    #pathname;
    #search;
    #searchParams;
    #pos;
    constructor(url) {
      if (typeof url === "string") if (url[0] === "/") this.#href = url;
      else this.#url = new NativeURL(url);
      else if (_needsNormRE.test(url.pathname)) this.#url = new NativeURL(`${url.protocol || "http:"}//${url.host || "localhost"}${url.pathname}${url.search || ""}`);
      else {
        this.#protocol = url.protocol;
        this.#host = url.host;
        this.#pathname = url.pathname;
        this.#search = url.search;
      }
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeURL;
    }
    get _url() {
      if (this.#url) return this.#url;
      this.#url = new NativeURL(this.href);
      this.#href = void 0;
      this.#protocol = void 0;
      this.#host = void 0;
      this.#pathname = void 0;
      this.#search = void 0;
      this.#searchParams = void 0;
      this.#pos = void 0;
      return this.#url;
    }
    get href() {
      if (this.#url) return this.#url.href;
      if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
      return this.#href;
    }
    #getPos() {
      if (!this.#pos) {
        const url = this.href;
        const protoIndex = url.indexOf("://");
        const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
        this.#pos = [
          protoIndex,
          pathnameIndex,
          pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex)
        ];
      }
      return this.#pos;
    }
    get pathname() {
      if (this.#url) return this.#url.pathname;
      if (this.#pathname === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.pathname;
        this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
      }
      return this.#pathname;
    }
    get search() {
      if (this.#url) return this.#url.search;
      if (this.#search === void 0) {
        const [, pathnameIndex, queryIndex] = this.#getPos();
        if (pathnameIndex === -1) return this._url.search;
        const url = this.href;
        this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
      }
      return this.#search;
    }
    get searchParams() {
      if (this.#url) return this.#url.searchParams;
      if (!this.#searchParams) this.#searchParams = new URLSearchParams(this.search);
      return this.#searchParams;
    }
    get protocol() {
      if (this.#url) return this.#url.protocol;
      if (this.#protocol === void 0) {
        const [protocolIndex] = this.#getPos();
        if (protocolIndex === -1) return this._url.protocol;
        this.#protocol = this.href.slice(0, protocolIndex + 1);
      }
      return this.#protocol;
    }
    toString() {
      return this.href;
    }
    toJSON() {
      return this.href;
    }
  };
  lazyInherit(FastURL2.prototype, NativeURL.prototype, "_url");
  Object.setPrototypeOf(FastURL2.prototype, NativeURL.prototype);
  Object.setPrototypeOf(FastURL2, NativeURL);
  return FastURL2;
})();
const NodeResponse = /* @__PURE__ */ (() => {
  const NativeResponse = globalThis.Response;
  const STATUS_CODES = globalThis.process?.getBuiltinModule?.("node:http")?.STATUS_CODES || {};
  class NodeResponse2 {
    #body;
    #init;
    #headers;
    #response;
    constructor(body, init) {
      this.#body = body;
      this.#init = init;
    }
    static [Symbol.hasInstance](val) {
      return val instanceof NativeResponse;
    }
    get status() {
      return this.#response?.status || this.#init?.status || 200;
    }
    get statusText() {
      return this.#response?.statusText || this.#init?.statusText || STATUS_CODES[this.status] || "";
    }
    get headers() {
      if (this.#response) return this.#response.headers;
      if (this.#headers) return this.#headers;
      const initHeaders = this.#init?.headers;
      return this.#headers = initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders);
    }
    get ok() {
      if (this.#response) return this.#response.ok;
      const status = this.status;
      return status >= 200 && status < 300;
    }
    get _response() {
      if (this.#response) return this.#response;
      let body = this.#body;
      if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
        const stream = new PassThrough();
        body.pipe(stream);
        const abort = body.abort;
        if (abort) stream.once("close", () => abort());
        body = stream;
      }
      this.#response = new NativeResponse(body, this.#headers ? {
        ...this.#init,
        headers: this.#headers
      } : this.#init);
      this.#init = void 0;
      this.#headers = void 0;
      this.#body = void 0;
      return this.#response;
    }
    _toNodeResponse() {
      const status = this.status;
      const statusText = this.statusText;
      let body;
      let contentType;
      let contentLength;
      if (this.#response) body = this.#response.body;
      else if (this.#body) if (this.#body instanceof ReadableStream) body = this.#body;
      else if (typeof this.#body === "string") {
        body = this.#body;
        contentType = "text/plain; charset=UTF-8";
        contentLength = Buffer.byteLength(this.#body);
      } else if (this.#body instanceof ArrayBuffer) {
        body = Buffer.from(this.#body);
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof Uint8Array) {
        body = this.#body;
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof DataView) {
        body = Buffer.from(this.#body.buffer);
        contentLength = this.#body.byteLength;
      } else if (this.#body instanceof Blob) {
        body = this.#body.stream();
        contentType = this.#body.type;
        contentLength = this.#body.size;
      } else if (typeof this.#body.pipe === "function") body = this.#body;
      else body = this._response.body;
      const headers = [];
      const initHeaders = this.#init?.headers;
      const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders).map(([k, v]) => [k.toLowerCase(), v]) : void 0);
      let hasContentTypeHeader;
      let hasContentLength;
      if (headerEntries) for (const [key, value] of headerEntries) {
        if (Array.isArray(value)) for (const v of value) headers.push([key, v]);
        else headers.push([key, value]);
        if (key === "content-type") hasContentTypeHeader = true;
        else if (key === "content-length") hasContentLength = true;
      }
      if (contentType && !hasContentTypeHeader) headers.push(["content-type", contentType]);
      if (contentLength && !hasContentLength) headers.push(["content-length", String(contentLength)]);
      this.#init = void 0;
      this.#headers = void 0;
      this.#response = void 0;
      this.#body = void 0;
      return {
        status,
        statusText,
        headers,
        body
      };
    }
  }
  lazyInherit(NodeResponse2.prototype, NativeResponse.prototype, "_response");
  Object.setPrototypeOf(NodeResponse2, NativeResponse);
  Object.setPrototypeOf(NodeResponse2.prototype, NativeResponse.prototype);
  return NodeResponse2;
})();
function decodePathname(pathname) {
  return decodeURI(pathname.includes("%25") ? pathname.replace(/%25/g, "%2525") : pathname);
}
const kEventNS = "h3.internal.event.";
const kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
const kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
const kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`);
var H3Event = class {
  app;
  req;
  url;
  context;
  static __is_event__ = true;
  constructor(req, context, app) {
    this.context = context || req.context || new NullProtoObj();
    this.req = req;
    this.app = app;
    const _url = req._url;
    const url = _url && _url instanceof URL ? _url : new FastURL(req.url);
    if (url.pathname.includes("%")) url.pathname = decodePathname(url.pathname);
    this.url = url;
  }
  get res() {
    return this[kEventRes] ||= new H3EventResponse();
  }
  get runtime() {
    return this.req.runtime;
  }
  waitUntil(promise) {
    this.req.waitUntil?.(promise);
  }
  toString() {
    return `[${this.req.method}] ${this.req.url}`;
  }
  toJSON() {
    return this.toString();
  }
  get node() {
    return this.req.runtime?.node;
  }
  get headers() {
    return this.req.headers;
  }
  get path() {
    return this.url.pathname + this.url.search;
  }
  get method() {
    return this.req.method;
  }
};
var H3EventResponse = class {
  status;
  statusText;
  get headers() {
    return this[kEventResHeaders] ||= new Headers();
  }
  get errHeaders() {
    return this[kEventResErrHeaders] ||= new Headers();
  }
};
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) return defaultStatusCode;
  if (typeof statusCode === "string") statusCode = +statusCode;
  if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
  return statusCode;
}
var HTTPError = class HTTPError2 extends Error {
  get name() {
    return "HTTPError";
  }
  status;
  statusText;
  headers;
  cause;
  data;
  body;
  unhandled;
  static isError(input) {
    return input instanceof Error && input?.name === "HTTPError";
  }
  static status(status, statusText, details) {
    return new HTTPError2({
      ...details,
      statusText,
      status
    });
  }
  constructor(arg1, arg2) {
    let messageInput;
    let details;
    if (typeof arg1 === "string") {
      messageInput = arg1;
      details = arg2;
    } else details = arg1;
    const status = sanitizeStatusCode(details?.status || details?.statusCode || details?.cause?.status || details?.cause?.statusCode, 500);
    const statusText = sanitizeStatusMessage(details?.statusText || details?.statusMessage || details?.cause?.statusText || details?.cause?.statusMessage);
    const message = messageInput || details?.message || details?.cause?.message || details?.statusText || details?.statusMessage || [
      "HTTPError",
      status,
      statusText
    ].filter(Boolean).join(" ");
    super(message, { cause: details });
    this.cause = details;
    this.status = status;
    this.statusText = statusText || void 0;
    const rawHeaders = details?.headers || details?.cause?.headers;
    this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
    this.unhandled = details?.unhandled ?? details?.cause?.unhandled ?? void 0;
    this.data = details?.data;
    this.body = details?.body;
  }
  get statusCode() {
    return this.status;
  }
  get statusMessage() {
    return this.statusText;
  }
  toJSON() {
    const unhandled = this.unhandled;
    return {
      status: this.status,
      statusText: this.statusText,
      unhandled,
      message: unhandled ? "HTTPError" : this.message,
      data: unhandled ? void 0 : this.data,
      ...unhandled ? void 0 : this.body
    };
  }
};
function isJSONSerializable(value, _type) {
  if (value === null || value === void 0) return true;
  if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
  if (typeof value.toJSON === "function") return true;
  if (Array.isArray(value)) return true;
  if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
  if (value instanceof NullProtoObj) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
const kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
const kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
  if (typeof val?.then === "function") return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) => toResponse(resolvedVal, event, config));
  const response = prepareResponse(val, event, config);
  if (typeof response?.then === "function") return toResponse(response, event, config);
  const { onResponse } = config;
  return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response;
}
var HTTPResponse = class {
  #headers;
  #init;
  body;
  constructor(body, init) {
    this.body = body;
    this.#init = init;
  }
  get status() {
    return this.#init?.status || 200;
  }
  get statusText() {
    return this.#init?.statusText || "OK";
  }
  get headers() {
    return this.#headers ||= new Headers(this.#init?.headers);
  }
};
function prepareResponse(val, event, config, nested) {
  if (val === kHandled) return new NodeResponse(null);
  if (val === kNotFound) val = new HTTPError({
    status: 404,
    message: `Cannot find any route matching [${event.req.method}] ${event.url}`
  });
  if (val && val instanceof Error) {
    const isHTTPError = HTTPError.isError(val);
    const error = isHTTPError ? val : new HTTPError(val);
    if (!isHTTPError) {
      error.unhandled = true;
      if (val?.stack) error.stack = val.stack;
    }
    if (error.unhandled && !config.silent) console.error(error);
    const { onError: onError2 } = config;
    const errHeaders = event[kEventRes]?.[kEventResErrHeaders];
    return onError2 && !nested ? Promise.resolve(onError2(error, event)).catch((error2) => error2).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug, errHeaders);
  }
  const preparedRes = event[kEventRes];
  const preparedHeaders = preparedRes?.[kEventResHeaders];
  event[kEventRes] = void 0;
  if (!(val instanceof Response)) {
    const res = prepareResponseBody(val, event, config);
    const status = res.status || preparedRes?.status;
    return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
      status,
      statusText: res.statusText || preparedRes?.statusText,
      headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
    });
  }
  if (!preparedHeaders || nested || !val.ok) return val;
  try {
    mergeHeaders$1(val.headers, preparedHeaders, val.headers);
    return val;
  } catch {
    return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
      status: val.status,
      statusText: val.statusText,
      headers: mergeHeaders$1(val.headers, preparedHeaders)
    });
  }
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
  for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
  else target.set(name, value);
  return target;
}
const frozen = (name) => (...args) => {
  throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
};
var FrozenHeaders = class extends Headers {
  set = frozen("set");
  append = frozen("append");
  delete = frozen("delete");
};
const emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
const jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
  if (val === null || val === void 0) return {
    body: "",
    headers: emptyHeaders
  };
  const valType = typeof val;
  if (valType === "string") return { body: val };
  if (val instanceof Uint8Array) {
    event.res.headers.set("content-length", val.byteLength.toString());
    return { body: val };
  }
  if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
  if (isJSONSerializable(val, valType)) return {
    body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
    headers: jsonHeaders
  };
  if (valType === "bigint") return {
    body: val.toString(),
    headers: jsonHeaders
  };
  if (val instanceof Blob) {
    const headers = new Headers({
      "content-type": val.type,
      "content-length": val.size.toString()
    });
    let filename = val.name;
    if (filename) {
      filename = encodeURIComponent(filename);
      headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
    }
    return {
      body: val.stream(),
      headers
    };
  }
  if (valType === "symbol") return { body: val.toString() };
  if (valType === "function") return { body: `${val.name}()` };
  return { body: val };
}
function nullBody(method, status) {
  return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug, errHeaders) {
  let headers = error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders);
  if (errHeaders) headers = mergeHeaders$1(headers, errHeaders);
  return new NodeResponse(JSON.stringify({
    ...error.toJSON(),
    stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
  }, void 0, debug ? 2 : void 0), {
    status: error.status,
    statusText: error.statusText,
    headers
  });
}
const COOKIE_MAX_AGE_LIMIT = 3456e4;
function endIndex(str, min, len) {
  const index = str.indexOf(";", min);
  return index === -1 ? len : index;
}
function eqIndex(str, min, max) {
  const index = str.indexOf("=", min);
  return index < max ? index : -1;
}
function valueSlice(str, min, max) {
  if (min === max) return "";
  let start = min;
  let end = max;
  do {
    const code = str.charCodeAt(start);
    if (code !== 32 && code !== 9) break;
  } while (++start < end);
  while (end > start) {
    const code = str.charCodeAt(end - 1);
    if (code !== 32 && code !== 9) break;
    end--;
  }
  return str.slice(start, end);
}
const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse(str, options) {
  const obj = new NullObject();
  const len = str.length;
  if (len < 2) return obj;
  const dec = decode;
  let index = 0;
  do {
    const eqIdx = eqIndex(str, index, len);
    if (eqIdx === -1) break;
    const endIdx = endIndex(str, index, len);
    if (eqIdx > endIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = valueSlice(str, index, eqIdx);
    const val = dec(valueSlice(str, eqIdx + 1, endIdx));
    if (obj[key] === void 0) obj[key] = val;
    index = endIdx + 1;
  } while (index < len);
  return obj;
}
function decode(str) {
  if (!str.includes("%")) return str;
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}
const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const pathValueRegExp = /^[\u0020-\u003A\u003C-\u007E]*$/;
const __toString = Object.prototype.toString;
function serialize$1(_a0, _a1, _a2) {
  const isObj = typeof _a0 === "object" && _a0 !== null;
  const cookie = isObj ? _a0 : {
    ..._a2,
    name: _a0,
    value: ""
  };
  const enc = encodeURIComponent;
  if (!cookieNameRegExp.test(cookie.name)) throw new TypeError(`argument name is invalid: ${cookie.name}`);
  const value = cookie.value ? enc(cookie.value) : "";
  if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie.value}`);
  if (!cookie.secure) {
    if (cookie.partitioned) throw new TypeError(`Partitioned cookies must have the Secure attribute`);
    if (cookie.sameSite && String(cookie.sameSite).toLowerCase() === "none") throw new TypeError(`SameSite=None cookies must have the Secure attribute`);
    if (cookie.name.length > 9 && cookie.name.charCodeAt(0) === 95 && cookie.name.charCodeAt(1) === 95) {
      const nameLower = cookie.name.toLowerCase();
      if (nameLower.startsWith("__secure-") || nameLower.startsWith("__host-")) throw new TypeError(`${cookie.name} cookies must have the Secure attribute`);
    }
  }
  if (cookie.name.length > 7 && cookie.name.charCodeAt(0) === 95 && cookie.name.charCodeAt(1) === 95 && cookie.name.toLowerCase().startsWith("__host-")) {
    if (cookie.path !== "/") throw new TypeError(`__Host- cookies must have Path=/`);
    if (cookie.domain) throw new TypeError(`__Host- cookies must not have a Domain attribute`);
  }
  let str = cookie.name + "=" + value;
  if (cookie.maxAge !== void 0) {
    if (!Number.isInteger(cookie.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
    str += "; Max-Age=" + Math.max(0, Math.min(cookie.maxAge, COOKIE_MAX_AGE_LIMIT));
  }
  if (cookie.domain) {
    if (!domainValueRegExp.test(cookie.domain)) throw new TypeError(`option domain is invalid: ${cookie.domain}`);
    str += "; Domain=" + cookie.domain;
  }
  if (cookie.path) {
    if (!pathValueRegExp.test(cookie.path)) throw new TypeError(`option path is invalid: ${cookie.path}`);
    str += "; Path=" + cookie.path;
  }
  if (cookie.expires) {
    if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie.expires}`);
    str += "; Expires=" + cookie.expires.toUTCString();
  }
  if (cookie.httpOnly) str += "; HttpOnly";
  if (cookie.secure) str += "; Secure";
  if (cookie.partitioned) str += "; Partitioned";
  if (cookie.priority) switch (typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0) {
    case "low":
      str += "; Priority=Low";
      break;
    case "medium":
      str += "; Priority=Medium";
      break;
    case "high":
      str += "; Priority=High";
      break;
    default:
      throw new TypeError(`option priority is invalid: ${cookie.priority}`);
  }
  if (cookie.sameSite) switch (typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite) {
    case true:
    case "strict":
      str += "; SameSite=Strict";
      break;
    case "lax":
      str += "; SameSite=Lax";
      break;
    case "none":
      str += "; SameSite=None";
      break;
    default:
      throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
  }
  return str;
}
function isDate(val) {
  return __toString.call(val) === "[object Date]";
}
const maxAgeRegExp = /^-?\d+$/;
const _nullProto = /* @__PURE__ */ Object.getPrototypeOf({});
function parseSetCookie(str, options) {
  const len = str.length;
  let _endIdx = len;
  let eqIdx = -1;
  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i);
    if (c === 59) {
      _endIdx = i;
      break;
    }
    if (c === 61 && eqIdx === -1) eqIdx = i;
  }
  if (eqIdx >= _endIdx) eqIdx = -1;
  const name = eqIdx === -1 ? "" : _trim(str, 0, eqIdx);
  if (name && name in _nullProto) return void 0;
  let value = eqIdx === -1 ? _trim(str, 0, _endIdx) : _trim(str, eqIdx + 1, _endIdx);
  if (!name && !value) return void 0;
  if (name.length + value.length > 4096) return void 0;
  value = _decode(value, options?.decode);
  const setCookie2 = {
    name,
    value
  };
  let index = _endIdx + 1;
  while (index < len) {
    let endIdx = len;
    let attrEqIdx = -1;
    for (let i = index; i < len; i++) {
      const c = str.charCodeAt(i);
      if (c === 59) {
        endIdx = i;
        break;
      }
      if (c === 61 && attrEqIdx === -1) attrEqIdx = i;
    }
    if (attrEqIdx >= endIdx) attrEqIdx = -1;
    const attr = attrEqIdx === -1 ? _trim(str, index, endIdx) : _trim(str, index, attrEqIdx);
    const val = attrEqIdx === -1 ? void 0 : _trim(str, attrEqIdx + 1, endIdx);
    if (val === void 0 || val.length <= 1024) switch (attr.toLowerCase()) {
      case "httponly":
        setCookie2.httpOnly = true;
        break;
      case "secure":
        setCookie2.secure = true;
        break;
      case "partitioned":
        setCookie2.partitioned = true;
        break;
      case "domain":
        if (val) setCookie2.domain = (val.charCodeAt(0) === 46 ? val.slice(1) : val).toLowerCase();
        break;
      case "path":
        setCookie2.path = val;
        break;
      case "max-age":
        if (val && maxAgeRegExp.test(val)) setCookie2.maxAge = Math.min(Number(val), COOKIE_MAX_AGE_LIMIT);
        break;
      case "expires": {
        if (!val) break;
        const date = new Date(val);
        if (Number.isFinite(date.valueOf())) {
          const maxDate = new Date(Date.now() + COOKIE_MAX_AGE_LIMIT * 1e3);
          setCookie2.expires = date > maxDate ? maxDate : date;
        }
        break;
      }
      case "priority": {
        if (!val) break;
        const priority = val.toLowerCase();
        if (priority === "low" || priority === "medium" || priority === "high") setCookie2.priority = priority;
        break;
      }
      case "samesite": {
        if (!val) break;
        const sameSite = val.toLowerCase();
        if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") setCookie2.sameSite = sameSite;
        else setCookie2.sameSite = "lax";
        break;
      }
      default: {
        const attrLower = attr.toLowerCase();
        if (attrLower && !(attrLower in _nullProto)) setCookie2[attrLower] = val;
      }
    }
    index = endIdx + 1;
  }
  return setCookie2;
}
function _trim(str, start, end) {
  if (start === end) return "";
  let s = start;
  let e = end;
  while (s < e && (str.charCodeAt(s) === 32 || str.charCodeAt(s) === 9)) s++;
  while (e > s && (str.charCodeAt(e - 1) === 32 || str.charCodeAt(e - 1) === 9)) e--;
  return str.slice(s, e);
}
function _decode(value, decode2) {
  if (!value.includes("%")) return value;
  try {
    return (decode2 || decodeURIComponent)(value);
  } catch {
    return value;
  }
}
function parseCookies(event) {
  return parse(event.req.headers.get("cookie") || "");
}
function setCookie(event, name, value, options) {
  const newCookie = serialize$1({
    name,
    value,
    path: "/",
    ...options
  });
  const currentCookies = event.res.headers.getSetCookie();
  if (currentCookies.length === 0) {
    event.res.headers.set("set-cookie", newCookie);
    return;
  }
  const newCookieKey = _getDistinctCookieKey(name, {});
  event.res.headers.delete("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    if (!parsed) continue;
    if (_getDistinctCookieKey(cookie.split("=")?.[0], parsed) === newCookieKey) continue;
    event.res.headers.append("set-cookie", cookie);
  }
  event.res.headers.append("set-cookie", newCookie);
}
function _getDistinctCookieKey(name, options) {
  return [
    name,
    options.domain || "",
    options.path || "/"
  ].join(";");
}
var GLOBAL_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY]) globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
  return typeof value.then === "function";
}
function getSetCookieValues(headers) {
  const headersWithSetCookie = headers;
  if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
  const value = headers.get("set-cookie");
  return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
  if (response.ok) return;
  const eventSetCookies = getSetCookieValues(event.res.headers);
  if (eventSetCookies.length === 0) return;
  const responseSetCookies = getSetCookieValues(response.headers);
  response.headers.delete("set-cookie");
  for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
  for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
  if (isPromiseLike(value)) return value.then((resolved) => {
    if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
    return resolved;
  });
  if (value instanceof Response) mergeEventResponseHeaders(value, event);
  return value;
}
function requestHandler(handler) {
  return (request, requestOpts) => {
    let h3Event;
    try {
      h3Event = new H3Event(request);
    } catch (error) {
      if (error instanceof URIError) return new Response(null, {
        status: 400,
        statusText: "Bad Request"
      });
      throw error;
    }
    return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return event.h3Event;
}
function getRequest() {
  return getH3Event().req;
}
function getCookies() {
  const cookies = parseCookies(getH3Event());
  const definedCookies = /* @__PURE__ */ Object.create(null);
  for (const [name, value] of Object.entries(cookies)) if (value !== void 0) definedCookies[name] = value;
  return definedCookies;
}
function getCookie(name) {
  return getCookies()[name];
}
function setCookie$1(name, value, options) {
  setCookie(getH3Event(), name, value, options);
}
function getResponse() {
  return getH3Event().res;
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
function sanitizePathSegment(segment) {
  return segment.replace(/[\x00-\x1f\x7f]/g, "");
}
function decodeSegment(segment) {
  let decoded;
  try {
    decoded = decodeURI(segment);
  } catch {
    decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
      try {
        return decodeURI(match);
      } catch {
        return match;
      }
    });
  }
  return sanitizePathSegment(decoded);
}
function decodePath(path) {
  if (!path) return {
    path,
    handledProtocolRelativeURL: false
  };
  if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
    path,
    handledProtocolRelativeURL: false
  };
  const re = /%25|%5C/gi;
  let cursor = 0;
  let result = "";
  let match;
  while (null !== (match = re.exec(path))) {
    result += decodeSegment(path.slice(cursor, match.index)) + match[0];
    cursor = re.lastIndex;
  }
  result = result + decodeSegment(cursor ? path.slice(cursor) : path);
  let handledProtocolRelativeURL = false;
  if (result.startsWith("//")) {
    handledProtocolRelativeURL = true;
    result = "/" + result.replace(/^\/+/, "");
  }
  return {
    path: result,
    handledProtocolRelativeURL
  };
}
function invariant() {
  throw new Error("Invariant failed");
}
function isNotFound(obj) {
  return obj?.isNotFound === true;
}
const rootRouteId = "__root__";
function redirect(opts) {
  opts.statusCode = opts.statusCode || opts.code || 307;
  if (!opts._builtLocation && !opts.reloadDocument && typeof opts.href === "string") try {
    new URL(opts.href);
    opts.reloadDocument = true;
  } catch {
  }
  const headers = new Headers(opts.headers);
  if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
  const response = new Response(null, {
    status: opts.statusCode,
    headers
  });
  response.options = opts;
  if (opts.throw) throw response;
  return response;
}
function isRedirect(obj) {
  return obj instanceof Response && !!obj.options;
}
function isResolvedRedirect(obj) {
  return isRedirect(obj) && !!obj.options.href;
}
function parseRedirect(obj) {
  if (obj !== null && typeof obj === "object" && obj.isSerializedRedirect) return redirect(obj);
}
function executeRewriteInput(rewrite, url) {
  const res = rewrite?.input?.({ url });
  if (res) {
    if (typeof res === "string") return new URL(res);
    else if (res instanceof URL) return res;
  }
  return url;
}
var stateIndexKey = "__TSR_index";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({
      location,
      action
    }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({ task, navigateOpts, ...actionInfo }) => {
    if (navigateOpts?.ignoreBlocker ?? false) {
      task();
      return;
    }
    const blockers = opts.getBlockers?.() ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) for (const blocker of blockers) {
      const nextLocation = parseHref(actionInfo.path, actionInfo.state);
      if (await blocker.blockerFn({
        currentLocation: location,
        nextLocation,
        action: actionInfo.type
      })) {
        opts.onBlocked?.();
        return;
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          handleIndexChange({
            type: "GO",
            index
          });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward(navigateOpts?.ignoreBlocker ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      if (!opts.setBlockers) return () => {
      };
      const blockers = opts.getBlockers?.() ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        const blockers2 = opts.getBlockers?.() ?? [];
        opts.setBlockers?.(blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => opts.flush?.(),
    destroy: () => opts.destroy?.(),
    notify
  };
}
function assignKeyAndIndex(index, state) {
  if (!state) state = {};
  const key = createRandomKey();
  return {
    ...state,
    key,
    __TSR_key: key,
    [stateIndexKey]: index
  };
}
function createMemoryHistory(opts = { initialEntries: ["/"] }) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
  const states = entries.map((_entry, index2) => assignKeyAndIndex(index2, void 0));
  const getLocation = () => parseHref(entries[index], states[index]);
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path,
    getBlockers: _getBlockers,
    setBlockers: _setBlockers
  });
}
function sanitizePath(path) {
  let sanitized = path.replace(/[\x00-\x1f\x7f]/g, "");
  if (sanitized.startsWith("//")) sanitized = "/" + sanitized.replace(/^\/+/, "");
  return sanitized;
}
function parseHref(href, state) {
  const sanitizedHref = sanitizePath(href);
  const hashIndex = sanitizedHref.indexOf("#");
  const searchIndex = sanitizedHref.indexOf("?");
  const addedKey = createRandomKey();
  return {
    href: sanitizedHref,
    pathname: sanitizedHref.substring(0, hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : sanitizedHref.length),
    hash: hashIndex > -1 ? sanitizedHref.substring(hashIndex) : "",
    search: searchIndex > -1 ? sanitizedHref.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {
      [stateIndexKey]: 0,
      key: addedKey,
      __TSR_key: addedKey
    }
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}
function resolveManifestAssetLink(link) {
  if (typeof link === "string") return {
    href: link,
    crossOrigin: void 0
  };
  return link;
}
function getStylesheetHref(asset) {
  if (asset.tag !== "link") return void 0;
  const rel = asset.attrs?.rel;
  const href = asset.attrs?.href;
  if (typeof href !== "string") return void 0;
  if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) return void 0;
  return href;
}
function isInlinableStylesheet(manifest2, asset) {
  const href = getStylesheetHref(asset);
  return !!href && manifest2?.inlineCss?.styles[href] !== void 0;
}
function createInlineCssStyleAsset(css) {
  return {
    tag: "style",
    attrs: { suppressHydrationWarning: true },
    inlineCss: true,
    children: css
  };
}
function createInlineCssPlaceholderAsset() {
  return {
    tag: "style",
    attrs: { suppressHydrationWarning: true },
    inlineCss: true
  };
}
const GLOBAL_TSR = "$_TSR";
const TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";
var ALL_ENABLED = 1 | 2 | 4 | 8 | 16 | 32;
var SYM_ASYNC_ITERATOR = Symbol.asyncIterator;
var SYM_HAS_INSTANCE = Symbol.hasInstance;
var SYM_IS_CONCAT_SPREADABLE = Symbol.isConcatSpreadable;
var SYM_ITERATOR = Symbol.iterator;
var SYM_MATCH = Symbol.match;
var SYM_MATCH_ALL = Symbol.matchAll;
var SYM_REPLACE = Symbol.replace;
var SYM_SEARCH = Symbol.search;
var SYM_SPECIES = Symbol.species;
var SYM_SPLIT = Symbol.split;
var SYM_TO_PRIMITIVE = Symbol.toPrimitive;
var SYM_TO_STRING_TAG = Symbol.toStringTag;
var SYM_UNSCOPABLES = Symbol.unscopables;
var SYMBOL_STRING = {
  [
    0
    /* AsyncIterator */
  ]: "Symbol.asyncIterator",
  [
    1
    /* HasInstance */
  ]: "Symbol.hasInstance",
  [
    2
    /* IsConcatSpreadable */
  ]: "Symbol.isConcatSpreadable",
  [
    3
    /* Iterator */
  ]: "Symbol.iterator",
  [
    4
    /* Match */
  ]: "Symbol.match",
  [
    5
    /* MatchAll */
  ]: "Symbol.matchAll",
  [
    6
    /* Replace */
  ]: "Symbol.replace",
  [
    7
    /* Search */
  ]: "Symbol.search",
  [
    8
    /* Species */
  ]: "Symbol.species",
  [
    9
    /* Split */
  ]: "Symbol.split",
  [
    10
    /* ToPrimitive */
  ]: "Symbol.toPrimitive",
  [
    11
    /* ToStringTag */
  ]: "Symbol.toStringTag",
  [
    12
    /* Unscopables */
  ]: "Symbol.unscopables"
};
var INV_SYMBOL_REF = {
  [SYM_ASYNC_ITERATOR]: 0,
  [SYM_HAS_INSTANCE]: 1,
  [SYM_IS_CONCAT_SPREADABLE]: 2,
  [SYM_ITERATOR]: 3,
  [SYM_MATCH]: 4,
  [SYM_MATCH_ALL]: 5,
  [SYM_REPLACE]: 6,
  [SYM_SEARCH]: 7,
  [SYM_SPECIES]: 8,
  [SYM_SPLIT]: 9,
  [SYM_TO_PRIMITIVE]: 10,
  [SYM_TO_STRING_TAG]: 11,
  [SYM_UNSCOPABLES]: 12
  /* Unscopables */
};
var SYMBOL_REF = {
  [
    0
    /* AsyncIterator */
  ]: SYM_ASYNC_ITERATOR,
  [
    1
    /* HasInstance */
  ]: SYM_HAS_INSTANCE,
  [
    2
    /* IsConcatSpreadable */
  ]: SYM_IS_CONCAT_SPREADABLE,
  [
    3
    /* Iterator */
  ]: SYM_ITERATOR,
  [
    4
    /* Match */
  ]: SYM_MATCH,
  [
    5
    /* MatchAll */
  ]: SYM_MATCH_ALL,
  [
    6
    /* Replace */
  ]: SYM_REPLACE,
  [
    7
    /* Search */
  ]: SYM_SEARCH,
  [
    8
    /* Species */
  ]: SYM_SPECIES,
  [
    9
    /* Split */
  ]: SYM_SPLIT,
  [
    10
    /* ToPrimitive */
  ]: SYM_TO_PRIMITIVE,
  [
    11
    /* ToStringTag */
  ]: SYM_TO_STRING_TAG,
  [
    12
    /* Unscopables */
  ]: SYM_UNSCOPABLES
};
var CONSTANT_STRING = {
  [
    2
    /* True */
  ]: "!0",
  [
    3
    /* False */
  ]: "!1",
  [
    1
    /* Undefined */
  ]: "void 0",
  [
    0
    /* Null */
  ]: "null",
  [
    4
    /* NegZero */
  ]: "-0",
  [
    5
    /* Inf */
  ]: "1/0",
  [
    6
    /* NegInf */
  ]: "-1/0",
  [
    7
    /* Nan */
  ]: "0/0"
};
var NIL = void 0;
var CONSTANT_VAL = {
  [
    2
    /* True */
  ]: true,
  [
    3
    /* False */
  ]: false,
  [
    1
    /* Undefined */
  ]: NIL,
  [
    0
    /* Null */
  ]: null,
  [
    4
    /* NegZero */
  ]: -0,
  [
    5
    /* Inf */
  ]: Number.POSITIVE_INFINITY,
  [
    6
    /* NegInf */
  ]: Number.NEGATIVE_INFINITY,
  [
    7
    /* Nan */
  ]: Number.NaN
};
var ERROR_CONSTRUCTOR_STRING = {
  [
    0
    /* Error */
  ]: "Error",
  [
    1
    /* EvalError */
  ]: "EvalError",
  [
    2
    /* RangeError */
  ]: "RangeError",
  [
    3
    /* ReferenceError */
  ]: "ReferenceError",
  [
    4
    /* SyntaxError */
  ]: "SyntaxError",
  [
    5
    /* TypeError */
  ]: "TypeError",
  [
    6
    /* URIError */
  ]: "URIError"
};
var ERROR_CONSTRUCTOR = {
  [
    0
    /* Error */
  ]: Error,
  [
    1
    /* EvalError */
  ]: EvalError,
  [
    2
    /* RangeError */
  ]: RangeError,
  [
    3
    /* ReferenceError */
  ]: ReferenceError,
  [
    4
    /* SyntaxError */
  ]: SyntaxError,
  [
    5
    /* TypeError */
  ]: TypeError,
  [
    6
    /* URIError */
  ]: URIError
};
function createSerovalNode(t, i, s, c, m, p, e, a, f, b, o, l) {
  return {
    t,
    i,
    s,
    c,
    m,
    p,
    e,
    a,
    f,
    b,
    o,
    l
  };
}
function createConstantNode(value) {
  return createSerovalNode(
    2,
    NIL,
    value,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
var TRUE_NODE = /* @__PURE__ */ createConstantNode(
  2
  /* True */
);
var FALSE_NODE = /* @__PURE__ */ createConstantNode(
  3
  /* False */
);
var UNDEFINED_NODE = /* @__PURE__ */ createConstantNode(
  1
  /* Undefined */
);
var NULL_NODE = /* @__PURE__ */ createConstantNode(
  0
  /* Null */
);
var NEG_ZERO_NODE = /* @__PURE__ */ createConstantNode(
  4
  /* NegZero */
);
var INFINITY_NODE = /* @__PURE__ */ createConstantNode(
  5
  /* Inf */
);
var NEG_INFINITY_NODE = /* @__PURE__ */ createConstantNode(
  6
  /* NegInf */
);
var NAN_NODE = /* @__PURE__ */ createConstantNode(
  7
  /* Nan */
);
function serializeChar(str) {
  switch (str) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return NIL;
  }
}
function serializeString(str) {
  let result = "";
  let lastPos = 0;
  let replacement;
  for (let i = 0, len = str.length; i < len; i++) {
    replacement = serializeChar(str[i]);
    if (replacement) {
      result += str.slice(lastPos, i) + replacement;
      lastPos = i + 1;
    }
  }
  if (lastPos === 0) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return result;
}
function deserializeReplacer(str) {
  switch (str) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return "\n";
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return str;
  }
}
function deserializeString(str) {
  return str.replace(
    /(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g,
    deserializeReplacer
  );
}
var REFERENCES_KEY = "__SEROVAL_REFS__";
var GLOBAL_CONTEXT_REFERENCES = "$R";
var GLOBAL_CONTEXT_R = `self.${GLOBAL_CONTEXT_REFERENCES}`;
function getCrossReferenceHeader(id) {
  return `(${GLOBAL_CONTEXT_R}=${GLOBAL_CONTEXT_R}||{})["${serializeString(
    id
  )}"]=[]`;
}
var REFERENCE = /* @__PURE__ */ new Map();
var INV_REFERENCE = /* @__PURE__ */ new Map();
function hasReferenceID(value) {
  return REFERENCE.has(value);
}
function hasReference(id) {
  return INV_REFERENCE.has(id);
}
function getReferenceID(value) {
  if (hasReferenceID(value)) {
    return REFERENCE.get(value);
  }
  throw new SerovalMissingReferenceError(value);
}
function getReference(id) {
  if (hasReference(id)) {
    return INV_REFERENCE.get(id);
  }
  throw new SerovalMissingReferenceForIdError(id);
}
if (typeof globalThis !== "undefined") {
  Object.defineProperty(globalThis, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof window !== "undefined") {
  Object.defineProperty(window, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof self !== "undefined") {
  Object.defineProperty(self, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof global !== "undefined") {
  Object.defineProperty(global, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
}
function getErrorConstructor(error) {
  if (error instanceof EvalError) {
    return 1;
  }
  if (error instanceof RangeError) {
    return 2;
  }
  if (error instanceof ReferenceError) {
    return 3;
  }
  if (error instanceof SyntaxError) {
    return 4;
  }
  if (error instanceof TypeError) {
    return 5;
  }
  if (error instanceof URIError) {
    return 6;
  }
  return 0;
}
function getInitialErrorOptions(error) {
  const construct = ERROR_CONSTRUCTOR_STRING[getErrorConstructor(error)];
  if (error.name !== construct) {
    return { name: error.name };
  }
  if (error.constructor.name !== construct) {
    return { name: error.constructor.name };
  }
  return {};
}
function getErrorOptions(error, features) {
  let options = getInitialErrorOptions(error);
  const names = Object.getOwnPropertyNames(error);
  for (let i = 0, len = names.length, name; i < len; i++) {
    name = names[i];
    if (name !== "name" && name !== "message") {
      if (name === "stack") {
        if (features & 4) {
          options = options || {};
          options[name] = error[name];
        }
      } else {
        options = options || {};
        options[name] = error[name];
      }
    }
  }
  return options;
}
function getObjectFlag(obj) {
  if (Object.isFrozen(obj)) {
    return 3;
  }
  if (Object.isSealed(obj)) {
    return 2;
  }
  if (Object.isExtensible(obj)) {
    return 0;
  }
  return 1;
}
function createNumberNode(value) {
  switch (value) {
    case Number.POSITIVE_INFINITY:
      return INFINITY_NODE;
    case Number.NEGATIVE_INFINITY:
      return NEG_INFINITY_NODE;
  }
  if (value !== value) {
    return NAN_NODE;
  }
  if (Object.is(value, -0)) {
    return NEG_ZERO_NODE;
  }
  return createSerovalNode(
    0,
    NIL,
    value,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createStringNode(value) {
  return createSerovalNode(
    1,
    NIL,
    serializeString(value),
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createBigIntNode(current) {
  return createSerovalNode(
    3,
    NIL,
    "" + current,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createIndexedValueNode(id) {
  return createSerovalNode(
    4,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createDateNode(id, current) {
  const timestamp = current.valueOf();
  return createSerovalNode(
    5,
    id,
    timestamp !== timestamp ? "" : current.toISOString(),
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createRegExpNode(id, current) {
  return createSerovalNode(
    6,
    id,
    NIL,
    serializeString(current.source),
    current.flags,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createWKSymbolNode(id, current) {
  return createSerovalNode(
    17,
    id,
    INV_SYMBOL_REF[current],
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createReferenceNode(id, ref) {
  return createSerovalNode(
    18,
    id,
    serializeString(getReferenceID(ref)),
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createPluginNode(id, tag, value) {
  return createSerovalNode(
    25,
    id,
    value,
    serializeString(tag),
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createArrayNode(id, current, parsedItems) {
  return createSerovalNode(
    9,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parsedItems,
    NIL,
    NIL,
    getObjectFlag(current),
    NIL
  );
}
function createBoxedNode(id, boxed) {
  return createSerovalNode(
    21,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    boxed,
    NIL,
    NIL,
    NIL
  );
}
function createTypedArrayNode(id, current, buffer) {
  return createSerovalNode(
    15,
    id,
    NIL,
    current.constructor.name,
    NIL,
    NIL,
    NIL,
    NIL,
    buffer,
    current.byteOffset,
    NIL,
    current.length
  );
}
function createBigIntTypedArrayNode(id, current, buffer) {
  return createSerovalNode(
    16,
    id,
    NIL,
    current.constructor.name,
    NIL,
    NIL,
    NIL,
    NIL,
    buffer,
    current.byteOffset,
    NIL,
    current.byteLength
  );
}
function createDataViewNode(id, current, buffer) {
  return createSerovalNode(
    20,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    buffer,
    current.byteOffset,
    NIL,
    current.byteLength
  );
}
function createErrorNode(id, current, options) {
  return createSerovalNode(
    13,
    id,
    getErrorConstructor(current),
    NIL,
    serializeString(current.message),
    options,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createAggregateErrorNode(id, current, options) {
  return createSerovalNode(
    14,
    id,
    getErrorConstructor(current),
    NIL,
    serializeString(current.message),
    options,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createSetNode(id, items) {
  return createSerovalNode(
    7,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    items,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createIteratorFactoryInstanceNode(factory, items) {
  return createSerovalNode(
    28,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    [factory, items],
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createAsyncIteratorFactoryInstanceNode(factory, items) {
  return createSerovalNode(
    30,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    [factory, items],
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createStreamConstructorNode(id, factory, sequence) {
  return createSerovalNode(
    31,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    sequence,
    factory,
    NIL,
    NIL,
    NIL
  );
}
function createStreamNextNode(id, parsed) {
  return createSerovalNode(
    32,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parsed,
    NIL,
    NIL,
    NIL
  );
}
function createStreamThrowNode(id, parsed) {
  return createSerovalNode(
    33,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parsed,
    NIL,
    NIL,
    NIL
  );
}
function createStreamReturnNode(id, parsed) {
  return createSerovalNode(
    34,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parsed,
    NIL,
    NIL,
    NIL
  );
}
function createSequenceNode(id, sequence, throwAt, doneAt) {
  return createSerovalNode(
    35,
    id,
    throwAt,
    NIL,
    NIL,
    NIL,
    NIL,
    sequence,
    NIL,
    NIL,
    NIL,
    doneAt
  );
}
var { toString: objectToString } = Object.prototype;
function getErrorMessageDev(type, cause) {
  if (cause instanceof Error) {
    return `Seroval caught an error during the ${type} process.

${cause.name}
${cause.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new`;
  }
  return `Seroval caught an error during the ${type} process.

"${objectToString.call(cause)}"

For more information, please check the "cause" property of this error.`;
}
var getErrorMessage = (type, cause) => getErrorMessageDev(type, cause);
var SerovalError = class extends Error {
  constructor(type, cause) {
    super(getErrorMessage(type, cause));
    this.cause = cause;
  }
};
var SerovalParserError = class extends SerovalError {
  constructor(cause) {
    super("parsing", cause);
  }
};
var SerovalDeserializationError = class extends SerovalError {
  constructor(cause) {
    super("deserialization", cause);
  }
};
var SerovalUnsupportedTypeError = class extends Error {
  constructor(value) {
    super(
      `The value ${objectToString.call(value)} of type "${typeof value}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`
    );
    this.value = value;
  }
};
var SerovalUnsupportedNodeError = class extends Error {
  constructor(node) {
    super(
      'Unsupported node type "' + node.t + '".'
    );
  }
};
var SerovalMissingPluginError = class extends Error {
  constructor(tag) {
    super(
      'Missing plugin for tag "' + tag + '".'
    );
  }
};
var SerovalMissingInstanceError = class extends Error {
  constructor(tag) {
    super(
      'Missing "' + tag + '" instance.'
    );
  }
};
var SerovalMissingReferenceError = class extends Error {
  constructor(value) {
    super(
      'Missing reference for the value "' + objectToString.call(value) + '" of type "' + typeof value + '"'
    );
    this.value = value;
  }
};
var SerovalMissingReferenceForIdError = class extends Error {
  constructor(id) {
    super(
      'Missing reference for id "' + serializeString(id) + '"'
    );
  }
};
var SerovalUnknownTypedArrayError = class extends Error {
  constructor(name) {
    super(
      'Unknown TypedArray "' + name + '"'
    );
  }
};
var SerovalMalformedNodeError = class extends Error {
  constructor(node) {
    super(
      'Malformed node type "' + node.t + '".'
    );
  }
};
var SerovalDepthLimitError = class extends Error {
  constructor(limit) {
    super(
      "Depth limit of " + limit + " reached"
    );
  }
};
var OpaqueReference = class {
  constructor(value, replacement) {
    this.value = value;
    this.replacement = replacement;
  }
};
var PROMISE_CONSTRUCTOR = () => {
  const resolver = {
    p: 0,
    s: 0,
    f: 0
  };
  resolver.p = new Promise((resolve, reject) => {
    resolver.s = resolve;
    resolver.f = reject;
  });
  return resolver;
};
var PROMISE_SUCCESS = (resolver, data) => {
  resolver.s(data);
  resolver.p.s = 1;
  resolver.p.v = data;
};
var PROMISE_FAILURE = (resolver, data) => {
  resolver.f(data);
  resolver.p.s = 2;
  resolver.p.v = data;
};
var SERIALIZED_PROMISE_CONSTRUCTOR = /* @__PURE__ */ PROMISE_CONSTRUCTOR.toString();
var SERIALIZED_PROMISE_SUCCESS = /* @__PURE__ */ PROMISE_SUCCESS.toString();
var SERIALIZED_PROMISE_FAILURE = /* @__PURE__ */ PROMISE_FAILURE.toString();
var STREAM_CONSTRUCTOR = () => {
  const buffer = [];
  const listeners = [];
  let alive = true;
  let success = false;
  let count = 0;
  const flush = (value, mode, x) => {
    for (x = 0; x < count; x++) {
      if (listeners[x]) {
        listeners[x][mode](value);
      }
    }
  };
  const up = (listener, x, z, current) => {
    for (x = 0, z = buffer.length; x < z; x++) {
      current = buffer[x];
      if (!alive && x === z - 1) {
        listener[success ? "return" : "throw"](current);
      } else {
        listener.next(current);
      }
    }
  };
  const on = (listener, temp) => {
    if (alive) {
      temp = count++;
      listeners[temp] = listener;
    }
    up(listener);
    return () => {
      if (alive) {
        listeners[temp] = listeners[count];
        listeners[count--] = void 0;
      }
    };
  };
  return {
    __SEROVAL_STREAM__: true,
    on: (listener) => on(listener),
    next: (value) => {
      if (alive) {
        buffer.push(value);
        flush(value, "next");
      }
    },
    throw: (value) => {
      if (alive) {
        buffer.push(value);
        flush(value, "throw");
        alive = false;
        success = false;
        listeners.length = 0;
      }
    },
    return: (value) => {
      if (alive) {
        buffer.push(value);
        flush(value, "return");
        alive = false;
        success = true;
        listeners.length = 0;
      }
    }
  };
};
var SERIALIZED_STREAM_CONSTRUCTOR = /* @__PURE__ */ STREAM_CONSTRUCTOR.toString();
var ITERATOR_CONSTRUCTOR = (symbol) => (sequence) => () => {
  let index = 0;
  const instance = {
    [symbol]: () => instance,
    next: () => {
      if (index > sequence.d) {
        return {
          done: true,
          value: void 0
        };
      }
      const currentIndex = index++;
      const data = sequence.v[currentIndex];
      if (currentIndex === sequence.t) {
        throw data;
      }
      return {
        done: currentIndex === sequence.d,
        value: data
      };
    }
  };
  return instance;
};
var SERIALIZED_ITERATOR_CONSTRUCTOR = /* @__PURE__ */ ITERATOR_CONSTRUCTOR.toString();
var ASYNC_ITERATOR_CONSTRUCTOR = (symbol, createPromise) => (stream) => () => {
  let count = 0;
  let doneAt = -1;
  let isThrow = false;
  const buffer = [];
  const pending = [];
  const finalize = (i = 0, len = pending.length) => {
    for (; i < len; i++) {
      pending[i].s({
        done: true,
        value: void 0
      });
    }
  };
  stream.on({
    next: (value) => {
      const temp = pending.shift();
      if (temp) {
        temp.s({ done: false, value });
      }
      buffer.push(value);
    },
    throw: (value) => {
      const temp = pending.shift();
      if (temp) {
        temp.f(value);
      }
      finalize();
      doneAt = buffer.length;
      isThrow = true;
      buffer.push(value);
    },
    return: (value) => {
      const temp = pending.shift();
      if (temp) {
        temp.s({ done: true, value });
      }
      finalize();
      doneAt = buffer.length;
      buffer.push(value);
    }
  });
  const instance = {
    [symbol]: () => instance,
    next: () => {
      if (doneAt === -1) {
        const index2 = count++;
        if (index2 >= buffer.length) {
          const temp = createPromise();
          pending.push(temp);
          return temp.p;
        }
        return {
          done: false,
          value: buffer[index2]
        };
      }
      if (count > doneAt) {
        return {
          done: true,
          value: void 0
        };
      }
      const index = count++;
      const value = buffer[index];
      if (index !== doneAt) {
        return {
          done: false,
          value
        };
      }
      if (isThrow) {
        throw value;
      }
      return {
        done: true,
        value
      };
    }
  };
  return instance;
};
var SERIALIZED_ASYNC_ITERATOR_CONSTRUCTOR = /* @__PURE__ */ ASYNC_ITERATOR_CONSTRUCTOR.toString();
var ARRAY_BUFFER_CONSTRUCTOR = (b64) => {
  const decoded = atob(b64);
  const length = decoded.length;
  const arr = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = decoded.charCodeAt(i);
  }
  return arr.buffer;
};
var SERIALIZED_ARRAY_BUFFER_CONSTRUCTOR = /* @__PURE__ */ ARRAY_BUFFER_CONSTRUCTOR.toString();
function isSequence(value) {
  return "__SEROVAL_SEQUENCE__" in value;
}
function createSequence(values, throwAt, doneAt) {
  return {
    __SEROVAL_SEQUENCE__: true,
    v: values,
    t: throwAt,
    d: doneAt
  };
}
function createSequenceFromIterable(source) {
  const values = [];
  let throwsAt = -1;
  let doneAt = -1;
  const iterator = source[SYM_ITERATOR]();
  while (true) {
    try {
      const value = iterator.next();
      values.push(value.value);
      if (value.done) {
        doneAt = values.length - 1;
        break;
      }
    } catch (error) {
      throwsAt = values.length;
      values.push(error);
    }
  }
  return createSequence(values, throwsAt, doneAt);
}
var createIterator = ITERATOR_CONSTRUCTOR(SYM_ITERATOR);
function sequenceToIterator(sequence) {
  return createIterator(sequence);
}
var ITERATOR = {};
var ASYNC_ITERATOR = {};
var SPECIAL_REFS = {
  [
    0
    /* MapSentinel */
  ]: {},
  [
    1
    /* PromiseConstructor */
  ]: {},
  [
    2
    /* PromiseSuccess */
  ]: {},
  [
    3
    /* PromiseFailure */
  ]: {},
  [
    4
    /* StreamConstructor */
  ]: {},
  [
    5
    /* ArrayBufferConstructor */
  ]: {}
};
var SPECIAL_REF_STRING = {
  [
    0
    /* MapSentinel */
  ]: "[]",
  [
    1
    /* PromiseConstructor */
  ]: SERIALIZED_PROMISE_CONSTRUCTOR,
  [
    2
    /* PromiseSuccess */
  ]: SERIALIZED_PROMISE_SUCCESS,
  [
    3
    /* PromiseFailure */
  ]: SERIALIZED_PROMISE_FAILURE,
  [
    4
    /* StreamConstructor */
  ]: SERIALIZED_STREAM_CONSTRUCTOR,
  [
    5
    /* ArrayBufferConstructor */
  ]: SERIALIZED_ARRAY_BUFFER_CONSTRUCTOR
};
function isStream(value) {
  return "__SEROVAL_STREAM__" in value;
}
function createStream() {
  return STREAM_CONSTRUCTOR();
}
function createStreamFromAsyncIterable(iterable) {
  const stream = createStream();
  const iterator = iterable[SYM_ASYNC_ITERATOR]();
  async function push() {
    try {
      const value = await iterator.next();
      if (value.done) {
        stream.return(value.value);
      } else {
        stream.next(value.value);
        await push();
      }
    } catch (error) {
      stream.throw(error);
    }
  }
  push().catch(() => {
  });
  return stream;
}
var createAsyncIterable = ASYNC_ITERATOR_CONSTRUCTOR(
  SYM_ASYNC_ITERATOR,
  PROMISE_CONSTRUCTOR
);
function streamToAsyncIterable(stream) {
  return createAsyncIterable(
    stream
  );
}
async function promiseToResult(current) {
  try {
    return [1, await current];
  } catch (e) {
    return [0, e];
  }
}
function createBaseParserContext(mode, options) {
  return {
    plugins: options.plugins,
    mode,
    marked: /* @__PURE__ */ new Set(),
    features: ALL_ENABLED ^ (options.disabledFeatures || 0),
    refs: options.refs || /* @__PURE__ */ new Map(),
    depthLimit: options.depthLimit || 1e3
  };
}
function markParserRef(ctx, id) {
  ctx.marked.add(id);
}
function createIndexForValue(ctx, current) {
  const id = ctx.refs.size;
  ctx.refs.set(current, id);
  return id;
}
function getNodeForIndexedValue(ctx, current) {
  const registeredId = ctx.refs.get(current);
  if (registeredId != null) {
    markParserRef(ctx, registeredId);
    return {
      type: 1,
      value: createIndexedValueNode(registeredId)
    };
  }
  return {
    type: 0,
    value: createIndexForValue(ctx, current)
  };
}
function getReferenceNode(ctx, current) {
  const indexed = getNodeForIndexedValue(ctx, current);
  if (indexed.type === 1) {
    return indexed;
  }
  if (hasReferenceID(current)) {
    return {
      type: 2,
      value: createReferenceNode(indexed.value, current)
    };
  }
  return indexed;
}
function parseWellKnownSymbol(ctx, current) {
  const ref = getReferenceNode(ctx, current);
  if (ref.type !== 0) {
    return ref.value;
  }
  if (current in INV_SYMBOL_REF) {
    return createWKSymbolNode(ref.value, current);
  }
  throw new SerovalUnsupportedTypeError(current);
}
function parseSpecialReference(ctx, ref) {
  const result = getNodeForIndexedValue(ctx, SPECIAL_REFS[ref]);
  if (result.type === 1) {
    return result.value;
  }
  return createSerovalNode(
    26,
    result.value,
    ref,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function parseIteratorFactory(ctx) {
  const result = getNodeForIndexedValue(ctx, ITERATOR);
  if (result.type === 1) {
    return result.value;
  }
  return createSerovalNode(
    27,
    result.value,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parseWellKnownSymbol(ctx, SYM_ITERATOR),
    NIL,
    NIL,
    NIL
  );
}
function parseAsyncIteratorFactory(ctx) {
  const result = getNodeForIndexedValue(ctx, ASYNC_ITERATOR);
  if (result.type === 1) {
    return result.value;
  }
  return createSerovalNode(
    29,
    result.value,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    [
      parseSpecialReference(
        ctx,
        1
        /* PromiseConstructor */
      ),
      parseWellKnownSymbol(ctx, SYM_ASYNC_ITERATOR)
    ],
    NIL,
    NIL,
    NIL,
    NIL
  );
}
function createObjectNode(id, current, empty, record) {
  return createSerovalNode(
    empty ? 11 : 10,
    id,
    NIL,
    NIL,
    NIL,
    record,
    NIL,
    NIL,
    NIL,
    NIL,
    getObjectFlag(current),
    NIL
  );
}
function createMapNode(ctx, id, k, v) {
  return createSerovalNode(
    8,
    id,
    NIL,
    NIL,
    NIL,
    NIL,
    { k, v },
    NIL,
    parseSpecialReference(
      ctx,
      0
      /* MapSentinel */
    ),
    NIL,
    NIL,
    NIL
  );
}
function createPromiseConstructorNode(ctx, id, resolver) {
  return createSerovalNode(
    22,
    id,
    resolver,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parseSpecialReference(
      ctx,
      1
      /* PromiseConstructor */
    ),
    NIL,
    NIL,
    NIL
  );
}
function createArrayBufferNode(ctx, id, current) {
  const bytes = new Uint8Array(current);
  let result = "";
  for (let i = 0, len = bytes.length; i < len; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return createSerovalNode(
    19,
    id,
    serializeString(btoa(result)),
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    parseSpecialReference(
      ctx,
      5
      /* ArrayBufferConstructor */
    ),
    NIL,
    NIL,
    NIL
  );
}
function createAsyncParserContext(mode, options) {
  return {
    base: createBaseParserContext(mode, options),
    child: void 0
  };
}
var AsyncParsePluginContext = class {
  constructor(_p, depth) {
    this._p = _p;
    this.depth = depth;
  }
  parse(current) {
    return parseAsync(this._p, this.depth, current);
  }
};
async function parseItems(ctx, depth, current) {
  const nodes = [];
  for (let i = 0, len = current.length; i < len; i++) {
    if (i in current) {
      nodes[i] = await parseAsync(ctx, depth, current[i]);
    } else {
      nodes[i] = 0;
    }
  }
  return nodes;
}
async function parseArray(ctx, depth, id, current) {
  return createArrayNode(id, current, await parseItems(ctx, depth, current));
}
async function parseProperties(ctx, depth, properties) {
  const entries = Object.entries(properties);
  const keyNodes = [];
  const valueNodes = [];
  for (let i = 0, len = entries.length; i < len; i++) {
    keyNodes.push(serializeString(entries[i][0]));
    valueNodes.push(await parseAsync(ctx, depth, entries[i][1]));
  }
  if (SYM_ITERATOR in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_ITERATOR));
    valueNodes.push(
      createIteratorFactoryInstanceNode(
        parseIteratorFactory(ctx.base),
        await parseAsync(
          ctx,
          depth,
          createSequenceFromIterable(
            properties
          )
        )
      )
    );
  }
  if (SYM_ASYNC_ITERATOR in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_ASYNC_ITERATOR));
    valueNodes.push(
      createAsyncIteratorFactoryInstanceNode(
        parseAsyncIteratorFactory(ctx.base),
        await parseAsync(
          ctx,
          depth,
          createStreamFromAsyncIterable(
            properties
          )
        )
      )
    );
  }
  if (SYM_TO_STRING_TAG in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_TO_STRING_TAG));
    valueNodes.push(createStringNode(properties[SYM_TO_STRING_TAG]));
  }
  if (SYM_IS_CONCAT_SPREADABLE in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_IS_CONCAT_SPREADABLE));
    valueNodes.push(
      properties[SYM_IS_CONCAT_SPREADABLE] ? TRUE_NODE : FALSE_NODE
    );
  }
  return {
    k: keyNodes,
    v: valueNodes
  };
}
async function parsePlainObject(ctx, depth, id, current, empty) {
  return createObjectNode(
    id,
    current,
    empty,
    await parseProperties(ctx, depth, current)
  );
}
async function parseBoxed(ctx, depth, id, current) {
  return createBoxedNode(id, await parseAsync(ctx, depth, current.valueOf()));
}
async function parseTypedArray(ctx, depth, id, current) {
  return createTypedArrayNode(
    id,
    current,
    await parseAsync(ctx, depth, current.buffer)
  );
}
async function parseBigIntTypedArray(ctx, depth, id, current) {
  return createBigIntTypedArrayNode(
    id,
    current,
    await parseAsync(ctx, depth, current.buffer)
  );
}
async function parseDataView(ctx, depth, id, current) {
  return createDataViewNode(
    id,
    current,
    await parseAsync(ctx, depth, current.buffer)
  );
}
async function parseError(ctx, depth, id, current) {
  const options = getErrorOptions(current, ctx.base.features);
  return createErrorNode(
    id,
    current,
    options ? await parseProperties(ctx, depth, options) : NIL
  );
}
async function parseAggregateError(ctx, depth, id, current) {
  const options = getErrorOptions(current, ctx.base.features);
  return createAggregateErrorNode(
    id,
    current,
    options ? await parseProperties(ctx, depth, options) : NIL
  );
}
async function parseMap(ctx, depth, id, current) {
  const keyNodes = [];
  const valueNodes = [];
  for (const [key, value] of current.entries()) {
    keyNodes.push(await parseAsync(ctx, depth, key));
    valueNodes.push(await parseAsync(ctx, depth, value));
  }
  return createMapNode(ctx.base, id, keyNodes, valueNodes);
}
async function parseSet(ctx, depth, id, current) {
  const items = [];
  for (const item of current.keys()) {
    items.push(await parseAsync(ctx, depth, item));
  }
  return createSetNode(id, items);
}
async function parsePlugin(ctx, depth, id, current) {
  const currentPlugins = ctx.base.plugins;
  if (currentPlugins) {
    for (let i = 0, len = currentPlugins.length; i < len; i++) {
      const plugin = currentPlugins[i];
      if (plugin.parse.async && plugin.test(current)) {
        return createPluginNode(
          id,
          plugin.tag,
          await plugin.parse.async(
            current,
            new AsyncParsePluginContext(ctx, depth),
            {
              id
            }
          )
        );
      }
    }
  }
  return NIL;
}
async function parsePromise(ctx, depth, id, current) {
  const [status, result] = await promiseToResult(current);
  return createSerovalNode(
    12,
    id,
    status,
    NIL,
    NIL,
    NIL,
    NIL,
    NIL,
    await parseAsync(ctx, depth, result),
    NIL,
    NIL,
    NIL
  );
}
function parseStreamHandle(depth, id, current, resolve, reject) {
  const sequence = [];
  const cleanup = current.on({
    next: (value) => {
      markParserRef(this.base, id);
      parseAsync(this, depth, value).then(
        (data) => {
          sequence.push(createStreamNextNode(id, data));
        },
        (data) => {
          reject(data);
          cleanup();
        }
      );
    },
    throw: (value) => {
      markParserRef(this.base, id);
      parseAsync(this, depth, value).then(
        (data) => {
          sequence.push(createStreamThrowNode(id, data));
          resolve(sequence);
          cleanup();
        },
        (data) => {
          reject(data);
          cleanup();
        }
      );
    },
    return: (value) => {
      markParserRef(this.base, id);
      parseAsync(this, depth, value).then(
        (data) => {
          sequence.push(createStreamReturnNode(id, data));
          resolve(sequence);
          cleanup();
        },
        (data) => {
          reject(data);
          cleanup();
        }
      );
    }
  });
}
async function parseStream(ctx, depth, id, current) {
  return createStreamConstructorNode(
    id,
    parseSpecialReference(
      ctx.base,
      4
      /* StreamConstructor */
    ),
    await new Promise(
      parseStreamHandle.bind(ctx, depth, id, current)
    )
  );
}
async function parseSequence(ctx, depth, id, current) {
  const nodes = [];
  for (let i = 0, len = current.v.length; i < len; i++) {
    nodes[i] = await parseAsync(ctx, depth, current.v[i]);
  }
  return createSequenceNode(id, nodes, current.t, current.d);
}
async function parseObjectAsync(ctx, depth, id, current) {
  if (Array.isArray(current)) {
    return parseArray(ctx, depth, id, current);
  }
  if (isStream(current)) {
    return parseStream(ctx, depth, id, current);
  }
  if (isSequence(current)) {
    return parseSequence(ctx, depth, id, current);
  }
  const currentClass = current.constructor;
  if (currentClass === OpaqueReference) {
    return parseAsync(
      ctx,
      depth,
      current.replacement
    );
  }
  const parsed = await parsePlugin(ctx, depth, id, current);
  if (parsed) {
    return parsed;
  }
  switch (currentClass) {
    case Object:
      return parsePlainObject(
        ctx,
        depth,
        id,
        current,
        false
      );
    case NIL:
      return parsePlainObject(
        ctx,
        depth,
        id,
        current,
        true
      );
    case Date:
      return createDateNode(id, current);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return parseError(ctx, depth, id, current);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return parseBoxed(ctx, depth, id, current);
    case ArrayBuffer:
      return createArrayBufferNode(
        ctx.base,
        id,
        current
      );
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return parseTypedArray(
        ctx,
        depth,
        id,
        current
      );
    case DataView:
      return parseDataView(ctx, depth, id, current);
    case Map:
      return parseMap(
        ctx,
        depth,
        id,
        current
      );
    case Set:
      return parseSet(ctx, depth, id, current);
  }
  if (currentClass === Promise || current instanceof Promise) {
    return parsePromise(ctx, depth, id, current);
  }
  const currentFeatures = ctx.base.features;
  if (currentFeatures & 32 && currentClass === RegExp) {
    return createRegExpNode(id, current);
  }
  if (currentFeatures & 16) {
    switch (currentClass) {
      case BigInt64Array:
      case BigUint64Array:
        return parseBigIntTypedArray(
          ctx,
          depth,
          id,
          current
        );
    }
  }
  if (currentFeatures & 1 && typeof AggregateError !== "undefined" && (currentClass === AggregateError || current instanceof AggregateError)) {
    return parseAggregateError(
      ctx,
      depth,
      id,
      current
    );
  }
  if (current instanceof Error) {
    return parseError(ctx, depth, id, current);
  }
  if (SYM_ITERATOR in current || SYM_ASYNC_ITERATOR in current) {
    return parsePlainObject(ctx, depth, id, current, !!currentClass);
  }
  throw new SerovalUnsupportedTypeError(current);
}
async function parseFunctionAsync(ctx, depth, current) {
  const ref = getReferenceNode(ctx.base, current);
  if (ref.type !== 0) {
    return ref.value;
  }
  const plugin = await parsePlugin(ctx, depth, ref.value, current);
  if (plugin) {
    return plugin;
  }
  throw new SerovalUnsupportedTypeError(current);
}
async function parseAsync(ctx, depth, current) {
  switch (typeof current) {
    case "boolean":
      return current ? TRUE_NODE : FALSE_NODE;
    case "undefined":
      return UNDEFINED_NODE;
    case "string":
      return createStringNode(current);
    case "number":
      return createNumberNode(current);
    case "bigint":
      return createBigIntNode(current);
    case "object": {
      if (current) {
        const ref = getReferenceNode(ctx.base, current);
        return ref.type === 0 ? await parseObjectAsync(ctx, depth + 1, ref.value, current) : ref.value;
      }
      return NULL_NODE;
    }
    case "symbol":
      return parseWellKnownSymbol(ctx.base, current);
    case "function":
      return parseFunctionAsync(ctx, depth, current);
    default:
      throw new SerovalUnsupportedTypeError(current);
  }
}
async function parseTopAsync(ctx, current) {
  try {
    return await parseAsync(ctx, 0, current);
  } catch (error) {
    throw error instanceof SerovalParserError ? error : new SerovalParserError(error);
  }
}
function createPlugin(plugin) {
  return plugin;
}
function dedupePlugins(deduped, plugins) {
  for (let i = 0, len = plugins.length; i < len; i++) {
    const current = plugins[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) {
        dedupePlugins(deduped, current.extends);
      }
    }
  }
}
function resolvePlugins(plugins) {
  if (plugins) {
    const deduped = /* @__PURE__ */ new Set();
    dedupePlugins(deduped, plugins);
    return [...deduped];
  }
  return void 0;
}
function getTypedArrayConstructor(name) {
  switch (name) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new SerovalUnknownTypedArrayError(name);
  }
}
var MAX_BASE64_LENGTH = 1e6;
var MAX_BIGINT_LENGTH = 1e4;
var MAX_REGEXP_SOURCE_LENGTH = 2e4;
function applyObjectFlag(obj, flag) {
  switch (flag) {
    case 3:
      return Object.freeze(obj);
    case 1:
      return Object.preventExtensions(obj);
    case 2:
      return Object.seal(obj);
    default:
      return obj;
  }
}
var DEFAULT_DEPTH_LIMIT = 1e3;
function createBaseDeserializerContext(mode, options) {
  var _a;
  return {
    mode,
    plugins: options.plugins,
    refs: options.refs || /* @__PURE__ */ new Map(),
    features: (_a = options.features) != null ? _a : ALL_ENABLED ^ (options.disabledFeatures || 0),
    depthLimit: options.depthLimit || DEFAULT_DEPTH_LIMIT
  };
}
function createVanillaDeserializerContext(options) {
  return {
    mode: 1,
    base: createBaseDeserializerContext(1, options),
    child: NIL,
    state: {
      marked: new Set(options.markedRefs)
    }
  };
}
var DeserializePluginContext = class {
  constructor(_p, depth) {
    this._p = _p;
    this.depth = depth;
  }
  deserialize(node) {
    return deserialize(this._p, this.depth, node);
  }
};
function guardIndexedValue(ctx, id) {
  if (id < 0 || !Number.isFinite(id) || !Number.isInteger(id)) {
    throw new SerovalMalformedNodeError({
      t: 4,
      i: id
    });
  }
  if (ctx.refs.has(id)) {
    throw new Error("Conflicted ref id: " + id);
  }
}
function assignIndexedValueVanilla(ctx, id, value) {
  guardIndexedValue(ctx.base, id);
  if (ctx.state.marked.has(id)) {
    ctx.base.refs.set(id, value);
  }
  return value;
}
function assignIndexedValueCross(ctx, id, value) {
  guardIndexedValue(ctx.base, id);
  ctx.base.refs.set(id, value);
  return value;
}
function assignIndexedValue(ctx, id, value) {
  return ctx.mode === 1 ? assignIndexedValueVanilla(ctx, id, value) : assignIndexedValueCross(ctx, id, value);
}
function deserializeKnownValue(node, record, key) {
  if (Object.hasOwn(record, key)) {
    return record[key];
  }
  throw new SerovalMalformedNodeError(node);
}
function deserializeReference(ctx, node) {
  return assignIndexedValue(
    ctx,
    node.i,
    getReference(deserializeString(node.s))
  );
}
function deserializeArray(ctx, depth, node) {
  const items = node.a;
  const len = items.length;
  const result = assignIndexedValue(
    ctx,
    node.i,
    new Array(len)
  );
  for (let i = 0, item; i < len; i++) {
    item = items[i];
    if (item) {
      result[i] = deserialize(ctx, depth, item);
    }
  }
  applyObjectFlag(result, node.o);
  return result;
}
function isValidKey(key) {
  switch (key) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return false;
    default:
      return true;
  }
}
function isValidSymbol(symbol) {
  switch (symbol) {
    case SYM_ASYNC_ITERATOR:
    case SYM_IS_CONCAT_SPREADABLE:
    case SYM_TO_STRING_TAG:
    case SYM_ITERATOR:
      return true;
    default:
      return false;
  }
}
function assignStringProperty(object, key, value) {
  if (isValidKey(key)) {
    object[key] = value;
  } else {
    Object.defineProperty(object, key, {
      value,
      configurable: true,
      enumerable: true,
      writable: true
    });
  }
}
function assignProperty(ctx, depth, object, key, value) {
  if (typeof key === "string") {
    assignStringProperty(
      object,
      deserializeString(key),
      deserialize(ctx, depth, value)
    );
  } else {
    const actual = deserialize(ctx, depth, key);
    switch (typeof actual) {
      case "string":
        assignStringProperty(object, actual, deserialize(ctx, depth, value));
        break;
      case "symbol":
        if (isValidSymbol(actual)) {
          object[actual] = deserialize(ctx, depth, value);
        }
        break;
      default:
        throw new SerovalMalformedNodeError(key);
    }
  }
}
function deserializeProperties(ctx, depth, node, result) {
  const keys = node.k;
  const len = keys.length;
  if (len > 0) {
    for (let i = 0, vals = node.v, len2 = keys.length; i < len2; i++) {
      assignProperty(ctx, depth, result, keys[i], vals[i]);
    }
  }
  return result;
}
function deserializeObject(ctx, depth, node) {
  const result = assignIndexedValue(
    ctx,
    node.i,
    node.t === 10 ? {} : /* @__PURE__ */ Object.create(null)
  );
  deserializeProperties(ctx, depth, node.p, result);
  applyObjectFlag(result, node.o);
  return result;
}
function deserializeDate(ctx, node) {
  return assignIndexedValue(ctx, node.i, new Date(node.s));
}
function deserializeRegExp(ctx, node) {
  if (ctx.base.features & 32) {
    const source = deserializeString(node.c);
    if (source.length > MAX_REGEXP_SOURCE_LENGTH) {
      throw new SerovalMalformedNodeError(node);
    }
    return assignIndexedValue(ctx, node.i, new RegExp(source, node.m));
  }
  throw new SerovalUnsupportedNodeError(node);
}
function deserializeSet(ctx, depth, node) {
  const result = assignIndexedValue(ctx, node.i, /* @__PURE__ */ new Set());
  for (let i = 0, items = node.a, len = items.length; i < len; i++) {
    result.add(deserialize(ctx, depth, items[i]));
  }
  return result;
}
function deserializeMap(ctx, depth, node) {
  const result = assignIndexedValue(ctx, node.i, /* @__PURE__ */ new Map());
  for (let i = 0, keys = node.e.k, vals = node.e.v, len = keys.length; i < len; i++) {
    result.set(
      deserialize(ctx, depth, keys[i]),
      deserialize(ctx, depth, vals[i])
    );
  }
  return result;
}
function deserializeArrayBuffer(ctx, node) {
  if (node.s.length > MAX_BASE64_LENGTH) {
    throw new SerovalMalformedNodeError(node);
  }
  const result = assignIndexedValue(
    ctx,
    node.i,
    ARRAY_BUFFER_CONSTRUCTOR(deserializeString(node.s))
  );
  return result;
}
function deserializeTypedArray(ctx, depth, node) {
  var _a;
  const construct = getTypedArrayConstructor(node.c);
  const source = deserialize(ctx, depth, node.f);
  const offset = (_a = node.b) != null ? _a : 0;
  if (offset < 0 || offset > source.byteLength) {
    throw new SerovalMalformedNodeError(node);
  }
  const result = assignIndexedValue(
    ctx,
    node.i,
    new construct(source, offset, node.l)
  );
  return result;
}
function deserializeDataView(ctx, depth, node) {
  var _a;
  const source = deserialize(ctx, depth, node.f);
  const offset = (_a = node.b) != null ? _a : 0;
  if (offset < 0 || offset > source.byteLength) {
    throw new SerovalMalformedNodeError(node);
  }
  const result = assignIndexedValue(
    ctx,
    node.i,
    new DataView(source, offset, node.l)
  );
  return result;
}
function deserializeDictionary(ctx, depth, node, result) {
  if (node.p) {
    const fields = deserializeProperties(ctx, depth, node.p, {});
    Object.defineProperties(result, Object.getOwnPropertyDescriptors(fields));
  }
  return result;
}
function deserializeAggregateError(ctx, depth, node) {
  const result = assignIndexedValue(
    ctx,
    node.i,
    new AggregateError([], deserializeString(node.m))
  );
  return deserializeDictionary(ctx, depth, node, result);
}
function deserializeError(ctx, depth, node) {
  const construct = deserializeKnownValue(node, ERROR_CONSTRUCTOR, node.s);
  const result = assignIndexedValue(
    ctx,
    node.i,
    new construct(deserializeString(node.m))
  );
  return deserializeDictionary(ctx, depth, node, result);
}
function deserializePromise(ctx, depth, node) {
  const deferred = PROMISE_CONSTRUCTOR();
  const result = assignIndexedValue(ctx, node.i, deferred.p);
  const deserialized = deserialize(ctx, depth, node.f);
  if (node.s) {
    deferred.s(deserialized);
  } else {
    deferred.f(deserialized);
  }
  return result;
}
function deserializeBoxed(ctx, depth, node) {
  return assignIndexedValue(
    ctx,
    node.i,
    // biome-ignore lint/style/useConsistentBuiltinInstantiation: intended
    Object(deserialize(ctx, depth, node.f))
  );
}
function deserializePlugin(ctx, depth, node) {
  const currentPlugins = ctx.base.plugins;
  if (currentPlugins) {
    const tag = deserializeString(node.c);
    for (let i = 0, len = currentPlugins.length; i < len; i++) {
      const plugin = currentPlugins[i];
      if (plugin.tag === tag) {
        return assignIndexedValue(
          ctx,
          node.i,
          plugin.deserialize(node.s, new DeserializePluginContext(ctx, depth), {
            id: node.i
          })
        );
      }
    }
  }
  throw new SerovalMissingPluginError(node.c);
}
function deserializePromiseConstructor(ctx, node) {
  return assignIndexedValue(
    ctx,
    node.i,
    assignIndexedValue(ctx, node.s, PROMISE_CONSTRUCTOR()).p
  );
}
function deserializePromiseResolve(ctx, depth, node) {
  const deferred = ctx.base.refs.get(node.i);
  if (deferred) {
    deferred.s(deserialize(ctx, depth, node.a[1]));
    return NIL;
  }
  throw new SerovalMissingInstanceError("Promise");
}
function deserializePromiseReject(ctx, depth, node) {
  const deferred = ctx.base.refs.get(node.i);
  if (deferred) {
    deferred.f(deserialize(ctx, depth, node.a[1]));
    return NIL;
  }
  throw new SerovalMissingInstanceError("Promise");
}
function deserializeIteratorFactoryInstance(ctx, depth, node) {
  deserialize(ctx, depth, node.a[0]);
  const source = deserialize(ctx, depth, node.a[1]);
  return sequenceToIterator(source);
}
function deserializeAsyncIteratorFactoryInstance(ctx, depth, node) {
  deserialize(ctx, depth, node.a[0]);
  const source = deserialize(ctx, depth, node.a[1]);
  return streamToAsyncIterable(source);
}
function deserializeStreamConstructor(ctx, depth, node) {
  const result = assignIndexedValue(ctx, node.i, createStream());
  const items = node.a;
  const len = items.length;
  if (len) {
    for (let i = 0; i < len; i++) {
      deserialize(ctx, depth, items[i]);
    }
  }
  return result;
}
function deserializeStreamNext(ctx, depth, node) {
  const deferred = ctx.base.refs.get(node.i);
  if (deferred && isStream(deferred)) {
    deferred.next(deserialize(ctx, depth, node.f));
    return NIL;
  }
  throw new SerovalMissingInstanceError("Stream");
}
function deserializeStreamThrow(ctx, depth, node) {
  const deferred = ctx.base.refs.get(node.i);
  if (deferred && isStream(deferred)) {
    deferred.throw(deserialize(ctx, depth, node.f));
    return NIL;
  }
  throw new SerovalMissingInstanceError("Stream");
}
function deserializeStreamReturn(ctx, depth, node) {
  const deferred = ctx.base.refs.get(node.i);
  if (deferred && isStream(deferred)) {
    deferred.return(deserialize(ctx, depth, node.f));
    return NIL;
  }
  throw new SerovalMissingInstanceError("Stream");
}
function deserializeIteratorFactory(ctx, depth, node) {
  deserialize(ctx, depth, node.f);
  return NIL;
}
function deserializeAsyncIteratorFactory(ctx, depth, node) {
  deserialize(ctx, depth, node.a[1]);
  return NIL;
}
function deserializeSequence(ctx, depth, node) {
  const result = assignIndexedValue(
    ctx,
    node.i,
    createSequence([], node.s, node.l)
  );
  for (let i = 0, len = node.a.length; i < len; i++) {
    result.v[i] = deserialize(ctx, depth, node.a[i]);
  }
  return result;
}
function deserialize(ctx, depth, node) {
  if (depth > ctx.base.depthLimit) {
    throw new SerovalDepthLimitError(ctx.base.depthLimit);
  }
  depth += 1;
  switch (node.t) {
    case 2:
      return deserializeKnownValue(node, CONSTANT_VAL, node.s);
    case 0:
      return Number(node.s);
    case 1:
      return deserializeString(String(node.s));
    case 3:
      if (String(node.s).length > MAX_BIGINT_LENGTH) {
        throw new SerovalMalformedNodeError(node);
      }
      return BigInt(node.s);
    case 4:
      return ctx.base.refs.get(node.i);
    case 18:
      return deserializeReference(ctx, node);
    case 9:
      return deserializeArray(ctx, depth, node);
    case 10:
    case 11:
      return deserializeObject(ctx, depth, node);
    case 5:
      return deserializeDate(ctx, node);
    case 6:
      return deserializeRegExp(ctx, node);
    case 7:
      return deserializeSet(ctx, depth, node);
    case 8:
      return deserializeMap(ctx, depth, node);
    case 19:
      return deserializeArrayBuffer(ctx, node);
    case 16:
    case 15:
      return deserializeTypedArray(ctx, depth, node);
    case 20:
      return deserializeDataView(ctx, depth, node);
    case 14:
      return deserializeAggregateError(ctx, depth, node);
    case 13:
      return deserializeError(ctx, depth, node);
    case 12:
      return deserializePromise(ctx, depth, node);
    case 17:
      return deserializeKnownValue(node, SYMBOL_REF, node.s);
    case 21:
      return deserializeBoxed(ctx, depth, node);
    case 25:
      return deserializePlugin(ctx, depth, node);
    case 22:
      return deserializePromiseConstructor(ctx, node);
    case 23:
      return deserializePromiseResolve(ctx, depth, node);
    case 24:
      return deserializePromiseReject(ctx, depth, node);
    case 28:
      return deserializeIteratorFactoryInstance(ctx, depth, node);
    case 30:
      return deserializeAsyncIteratorFactoryInstance(ctx, depth, node);
    case 31:
      return deserializeStreamConstructor(ctx, depth, node);
    case 32:
      return deserializeStreamNext(ctx, depth, node);
    case 33:
      return deserializeStreamThrow(ctx, depth, node);
    case 34:
      return deserializeStreamReturn(ctx, depth, node);
    case 27:
      return deserializeIteratorFactory(ctx, depth, node);
    case 29:
      return deserializeAsyncIteratorFactory(ctx, depth, node);
    // case SerovalNodeType.SpecialReference:
    case 35:
      return deserializeSequence(ctx, depth, node);
    default:
      throw new SerovalUnsupportedNodeError(node);
  }
}
function deserializeTop(ctx, node) {
  try {
    return deserialize(ctx, 0, node);
  } catch (error) {
    throw new SerovalDeserializationError(error);
  }
}
var RETURN = () => T;
var SERIALIZED_RETURN = /* @__PURE__ */ RETURN.toString();
var IS_MODERN = /* @__PURE__ */ /=>/.test(SERIALIZED_RETURN);
function createFunction(parameters, body) {
  if (IS_MODERN) {
    const joined = parameters.length === 1 ? parameters[0] : "(" + parameters.join(",") + ")";
    return joined + "=>" + (body.startsWith("{") ? "(" + body + ")" : body);
  }
  return "function(" + parameters.join(",") + "){return " + body + "}";
}
function createEffectfulFunction(parameters, body) {
  if (IS_MODERN) {
    const joined = parameters.length === 1 ? parameters[0] : "(" + parameters.join(",") + ")";
    return joined + "=>{" + body + "}";
  }
  return "function(" + parameters.join(",") + "){" + body + "}";
}
var REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
var REF_START_CHARS_LEN = REF_START_CHARS.length;
var REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
var REF_CHARS_LEN = REF_CHARS.length;
function getIdentifier(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}
var IDENTIFIER_CHECK = /^[$A-Z_][0-9A-Z_$]*$/i;
function isValidIdentifier(name) {
  const char = name[0];
  return (char === "$" || char === "_" || char >= "A" && char <= "Z" || char >= "a" && char <= "z") && IDENTIFIER_CHECK.test(name);
}
function getAssignmentExpression(assignment) {
  switch (assignment.t) {
    case 0:
      return assignment.s + "=" + assignment.v;
    case 2:
      return assignment.s + ".set(" + assignment.k + "," + assignment.v + ")";
    case 1:
      return assignment.s + ".add(" + assignment.v + ")";
    case 3:
      return assignment.s + ".delete(" + assignment.k + ")";
  }
}
function mergeAssignments(assignments) {
  const newAssignments = [];
  let current = assignments[0];
  for (let i = 1, len = assignments.length, item, prev = current; i < len; i++) {
    item = assignments[i];
    if (item.t === 0 && item.v === prev.v) {
      current = {
        t: 0,
        s: item.s,
        k: NIL,
        v: getAssignmentExpression(current)
      };
    } else if (item.t === 2 && item.s === prev.s) {
      current = {
        t: 2,
        s: getAssignmentExpression(current),
        k: item.k,
        v: item.v
      };
    } else if (item.t === 1 && item.s === prev.s) {
      current = {
        t: 1,
        s: getAssignmentExpression(current),
        k: NIL,
        v: item.v
      };
    } else if (item.t === 3 && item.s === prev.s) {
      current = {
        t: 3,
        s: getAssignmentExpression(current),
        k: item.k,
        v: NIL
      };
    } else {
      newAssignments.push(current);
      current = item;
    }
    prev = item;
  }
  newAssignments.push(current);
  return newAssignments;
}
function resolveAssignments(assignments) {
  if (assignments.length) {
    let result = "";
    const merged = mergeAssignments(assignments);
    for (let i = 0, len = merged.length; i < len; i++) {
      result += getAssignmentExpression(merged[i]) + ",";
    }
    return result;
  }
  return NIL;
}
var NULL_CONSTRUCTOR = "Object.create(null)";
var SET_CONSTRUCTOR = "new Set";
var MAP_CONSTRUCTOR = "new Map";
var PROMISE_RESOLVE = "Promise.resolve";
var PROMISE_REJECT = "Promise.reject";
var OBJECT_FLAG_CONSTRUCTOR = {
  [
    3
    /* Frozen */
  ]: "Object.freeze",
  [
    2
    /* Sealed */
  ]: "Object.seal",
  [
    1
    /* NonExtensible */
  ]: "Object.preventExtensions",
  [
    0
    /* None */
  ]: NIL
};
function createBaseSerializerContext(mode, options) {
  return {
    mode,
    plugins: options.plugins,
    features: options.features,
    marked: new Set(options.markedRefs),
    stack: [],
    flags: [],
    assignments: []
  };
}
function createCrossSerializerContext(options) {
  return {
    mode: 2,
    base: createBaseSerializerContext(2, options),
    state: options,
    child: NIL
  };
}
var SerializePluginContext = class {
  constructor(_p) {
    this._p = _p;
  }
  serialize(node) {
    return serialize(this._p, node);
  }
};
function getVanillaRefParam(state, index) {
  let actualIndex = state.valid.get(index);
  if (actualIndex == null) {
    actualIndex = state.valid.size;
    state.valid.set(index, actualIndex);
  }
  let identifier = state.vars[actualIndex];
  if (identifier == null) {
    identifier = getIdentifier(actualIndex);
    state.vars[actualIndex] = identifier;
  }
  return identifier;
}
function getCrossRefParam(id) {
  return GLOBAL_CONTEXT_REFERENCES + "[" + id + "]";
}
function getRefParam(ctx, id) {
  return ctx.mode === 1 ? getVanillaRefParam(ctx.state, id) : getCrossRefParam(id);
}
function markSerializerRef(ctx, id) {
  ctx.marked.add(id);
}
function isSerializerRefMarked(ctx, id) {
  return ctx.marked.has(id);
}
function pushObjectFlag(ctx, flag, id) {
  if (flag !== 0) {
    markSerializerRef(ctx.base, id);
    ctx.base.flags.push({
      type: flag,
      value: getRefParam(ctx, id)
    });
  }
}
function resolveFlags(ctx) {
  let result = "";
  for (let i = 0, current = ctx.flags, len = current.length; i < len; i++) {
    const flag = current[i];
    result += OBJECT_FLAG_CONSTRUCTOR[flag.type] + "(" + flag.value + "),";
  }
  return result;
}
function resolvePatches(ctx) {
  const assignments = resolveAssignments(ctx.assignments);
  const flags = resolveFlags(ctx);
  if (assignments) {
    if (flags) {
      return assignments + flags;
    }
    return assignments;
  }
  return flags;
}
function createAssignment(ctx, source, value) {
  ctx.assignments.push({
    t: 0,
    s: source,
    k: NIL,
    v: value
  });
}
function createAddAssignment(ctx, ref, value) {
  ctx.base.assignments.push({
    t: 1,
    s: getRefParam(ctx, ref),
    k: NIL,
    v: value
  });
}
function createSetAssignment(ctx, ref, key, value) {
  ctx.base.assignments.push({
    t: 2,
    s: getRefParam(ctx, ref),
    k: key,
    v: value
  });
}
function createDeleteAssignment(ctx, ref, key) {
  ctx.base.assignments.push({
    t: 3,
    s: getRefParam(ctx, ref),
    k: key,
    v: NIL
  });
}
function createArrayAssign(ctx, ref, index, value) {
  createAssignment(ctx.base, getRefParam(ctx, ref) + "[" + index + "]", value);
}
function createObjectAssign(ctx, ref, key, value) {
  createAssignment(ctx.base, getRefParam(ctx, ref) + "." + key, value);
}
function createSequenceAssign(ctx, ref, index, value) {
  createAssignment(
    ctx.base,
    getRefParam(ctx, ref) + ".v[" + index + "]",
    value
  );
}
function isIndexedValueInStack(ctx, node) {
  return node.t === 4 && ctx.stack.includes(node.i);
}
function assignIndexedValue2(ctx, index, value) {
  if (ctx.mode === 1 && !isSerializerRefMarked(ctx.base, index)) {
    return value;
  }
  return getRefParam(ctx, index) + "=" + value;
}
function serializeReference(node) {
  return REFERENCES_KEY + '.get("' + node.s + '")';
}
function serializeArrayItem(ctx, id, item, index) {
  if (item) {
    if (isIndexedValueInStack(ctx.base, item)) {
      markSerializerRef(ctx.base, id);
      createArrayAssign(
        ctx,
        id,
        index,
        getRefParam(ctx, item.i)
      );
      return "";
    }
    return serialize(ctx, item);
  }
  return "";
}
function serializeArray(ctx, node) {
  const id = node.i;
  const list = node.a;
  const len = list.length;
  if (len > 0) {
    ctx.base.stack.push(id);
    let values = serializeArrayItem(ctx, id, list[0], 0);
    let isHoley = values === "";
    for (let i = 1, item; i < len; i++) {
      item = serializeArrayItem(ctx, id, list[i], i);
      values += "," + item;
      isHoley = item === "";
    }
    ctx.base.stack.pop();
    pushObjectFlag(ctx, node.o, node.i);
    return "[" + values + (isHoley ? ",]" : "]");
  }
  return "[]";
}
function serializeProperty(ctx, source, key, val) {
  if (typeof key === "string") {
    const check = Number(key);
    const isIdentifier = (
      // Test if key is a valid positive number or JS identifier
      // so that we don't have to serialize the key and wrap with brackets
      check >= 0 && // It's also important to consider that if the key is
      // indeed numeric, we need to make sure that when
      // converted back into a string, it's still the same
      // to the original key. This allows us to differentiate
      // keys that has numeric formats but in a different
      // format, which can cause unintentional key declaration
      // Example: { 0x1: 1 } vs { '0x1': 1 }
      check.toString() === key || isValidIdentifier(key)
    );
    if (isIndexedValueInStack(ctx.base, val)) {
      const refParam = getRefParam(ctx, val.i);
      markSerializerRef(ctx.base, source.i);
      if (isIdentifier && check !== check) {
        createObjectAssign(ctx, source.i, key, refParam);
      } else {
        createArrayAssign(
          ctx,
          source.i,
          isIdentifier ? key : '"' + key + '"',
          refParam
        );
      }
      return "";
    }
    return (isIdentifier ? key : '"' + key + '"') + ":" + serialize(ctx, val);
  }
  return "[" + serialize(ctx, key) + "]:" + serialize(ctx, val);
}
function serializeProperties(ctx, source, record) {
  const keys = record.k;
  const len = keys.length;
  if (len > 0) {
    const values = record.v;
    ctx.base.stack.push(source.i);
    let result = serializeProperty(ctx, source, keys[0], values[0]);
    for (let i = 1, item = result; i < len; i++) {
      item = serializeProperty(ctx, source, keys[i], values[i]);
      result += (item && result && ",") + item;
    }
    ctx.base.stack.pop();
    return "{" + result + "}";
  }
  return "{}";
}
function serializeObject(ctx, node) {
  pushObjectFlag(ctx, node.o, node.i);
  return serializeProperties(ctx, node, node.p);
}
function serializeWithObjectAssign(ctx, source, value, serialized) {
  const fields = serializeProperties(ctx, source, value);
  if (fields !== "{}") {
    return "Object.assign(" + serialized + "," + fields + ")";
  }
  return serialized;
}
function serializeStringKeyAssignment(ctx, source, mainAssignments, key, value) {
  const base = ctx.base;
  const serialized = serialize(ctx, value);
  const check = Number(key);
  const isIdentifier = (
    // Test if key is a valid positive number or JS identifier
    // so that we don't have to serialize the key and wrap with brackets
    check >= 0 && // It's also important to consider that if the key is
    // indeed numeric, we need to make sure that when
    // converted back into a string, it's still the same
    // to the original key. This allows us to differentiate
    // keys that has numeric formats but in a different
    // format, which can cause unintentional key declaration
    // Example: { 0x1: 1 } vs { '0x1': 1 }
    check.toString() === key || isValidIdentifier(key)
  );
  if (isIndexedValueInStack(base, value)) {
    if (isIdentifier && check !== check) {
      createObjectAssign(ctx, source.i, key, serialized);
    } else {
      createArrayAssign(
        ctx,
        source.i,
        isIdentifier ? key : '"' + key + '"',
        serialized
      );
    }
  } else {
    const parentAssignment = base.assignments;
    base.assignments = mainAssignments;
    if (isIdentifier && check !== check) {
      createObjectAssign(ctx, source.i, key, serialized);
    } else {
      createArrayAssign(
        ctx,
        source.i,
        isIdentifier ? key : '"' + key + '"',
        serialized
      );
    }
    base.assignments = parentAssignment;
  }
}
function serializeAssignment(ctx, source, mainAssignments, key, value) {
  if (typeof key === "string") {
    serializeStringKeyAssignment(ctx, source, mainAssignments, key, value);
  } else {
    const base = ctx.base;
    const parent = base.stack;
    base.stack = [];
    const serialized = serialize(ctx, value);
    base.stack = parent;
    const parentAssignment = base.assignments;
    base.assignments = mainAssignments;
    createArrayAssign(ctx, source.i, serialize(ctx, key), serialized);
    base.assignments = parentAssignment;
  }
}
function serializeAssignments(ctx, source, node) {
  const keys = node.k;
  const len = keys.length;
  if (len > 0) {
    const mainAssignments = [];
    const values = node.v;
    ctx.base.stack.push(source.i);
    for (let i = 0; i < len; i++) {
      serializeAssignment(ctx, source, mainAssignments, keys[i], values[i]);
    }
    ctx.base.stack.pop();
    return resolveAssignments(mainAssignments);
  }
  return NIL;
}
function serializeDictionary(ctx, node, init) {
  if (node.p) {
    const base = ctx.base;
    if (base.features & 8) {
      init = serializeWithObjectAssign(ctx, node, node.p, init);
    } else {
      markSerializerRef(base, node.i);
      const assignments = serializeAssignments(ctx, node, node.p);
      if (assignments) {
        return "(" + assignIndexedValue2(ctx, node.i, init) + "," + assignments + getRefParam(ctx, node.i) + ")";
      }
    }
  }
  return init;
}
function serializeNullConstructor(ctx, node) {
  pushObjectFlag(ctx, node.o, node.i);
  return serializeDictionary(ctx, node, NULL_CONSTRUCTOR);
}
function serializeDate(node) {
  return 'new Date("' + node.s + '")';
}
function serializeRegExp(ctx, node) {
  if (ctx.base.features & 32) {
    return "/" + node.c + "/" + node.m;
  }
  throw new SerovalUnsupportedNodeError(node);
}
function serializeSetItem(ctx, id, item) {
  const base = ctx.base;
  if (isIndexedValueInStack(base, item)) {
    markSerializerRef(base, id);
    createAddAssignment(
      ctx,
      id,
      getRefParam(ctx, item.i)
    );
    return "";
  }
  return serialize(ctx, item);
}
function serializeSet(ctx, node) {
  let serialized = SET_CONSTRUCTOR;
  const items = node.a;
  const size = items.length;
  const id = node.i;
  if (size > 0) {
    ctx.base.stack.push(id);
    let result = serializeSetItem(ctx, id, items[0]);
    for (let i = 1, item = result; i < size; i++) {
      item = serializeSetItem(ctx, id, items[i]);
      result += (item && result && ",") + item;
    }
    ctx.base.stack.pop();
    if (result) {
      serialized += "([" + result + "])";
    }
  }
  return serialized;
}
function serializeMapEntry(ctx, id, key, val, sentinel) {
  const base = ctx.base;
  if (isIndexedValueInStack(base, key)) {
    const keyRef = getRefParam(ctx, key.i);
    markSerializerRef(base, id);
    if (isIndexedValueInStack(base, val)) {
      const valueRef = getRefParam(ctx, val.i);
      createSetAssignment(ctx, id, keyRef, valueRef);
      return "";
    }
    if (val.t !== 4 && val.i != null && isSerializerRefMarked(base, val.i)) {
      const serialized = "(" + serialize(ctx, val) + ",[" + sentinel + "," + sentinel + "])";
      createSetAssignment(ctx, id, keyRef, getRefParam(ctx, val.i));
      createDeleteAssignment(ctx, id, sentinel);
      return serialized;
    }
    const parent = base.stack;
    base.stack = [];
    createSetAssignment(ctx, id, keyRef, serialize(ctx, val));
    base.stack = parent;
    return "";
  }
  if (isIndexedValueInStack(base, val)) {
    const valueRef = getRefParam(ctx, val.i);
    markSerializerRef(base, id);
    if (key.t !== 4 && key.i != null && isSerializerRefMarked(base, key.i)) {
      const serialized = "(" + serialize(ctx, key) + ",[" + sentinel + "," + sentinel + "])";
      createSetAssignment(ctx, id, getRefParam(ctx, key.i), valueRef);
      createDeleteAssignment(ctx, id, sentinel);
      return serialized;
    }
    const parent = base.stack;
    base.stack = [];
    createSetAssignment(ctx, id, serialize(ctx, key), valueRef);
    base.stack = parent;
    return "";
  }
  return "[" + serialize(ctx, key) + "," + serialize(ctx, val) + "]";
}
function serializeMap(ctx, node) {
  let serialized = MAP_CONSTRUCTOR;
  const keys = node.e.k;
  const size = keys.length;
  const id = node.i;
  const sentinel = node.f;
  const sentinelId = getRefParam(ctx, sentinel.i);
  const base = ctx.base;
  if (size > 0) {
    const vals = node.e.v;
    base.stack.push(id);
    let result = serializeMapEntry(ctx, id, keys[0], vals[0], sentinelId);
    for (let i = 1, item = result; i < size; i++) {
      item = serializeMapEntry(ctx, id, keys[i], vals[i], sentinelId);
      result += (item && result && ",") + item;
    }
    base.stack.pop();
    if (result) {
      serialized += "([" + result + "])";
    }
  }
  if (sentinel.t === 26) {
    markSerializerRef(base, sentinel.i);
    serialized = "(" + serialize(ctx, sentinel) + "," + serialized + ")";
  }
  return serialized;
}
function serializeArrayBuffer(ctx, node) {
  return getConstructor(ctx, node.f) + '("' + node.s + '")';
}
function serializeTypedArray(ctx, node) {
  return "new " + node.c + "(" + serialize(ctx, node.f) + "," + node.b + "," + node.l + ")";
}
function serializeDataView(ctx, node) {
  return "new DataView(" + serialize(ctx, node.f) + "," + node.b + "," + node.l + ")";
}
function serializeAggregateError(ctx, node) {
  const id = node.i;
  ctx.base.stack.push(id);
  const serialized = serializeDictionary(
    ctx,
    node,
    'new AggregateError([],"' + node.m + '")'
  );
  ctx.base.stack.pop();
  return serialized;
}
function serializeError(ctx, node) {
  return serializeDictionary(
    ctx,
    node,
    "new " + ERROR_CONSTRUCTOR_STRING[node.s] + '("' + node.m + '")'
  );
}
function serializePromise(ctx, node) {
  let serialized;
  const fulfilled = node.f;
  const id = node.i;
  const promiseConstructor = node.s ? PROMISE_RESOLVE : PROMISE_REJECT;
  const base = ctx.base;
  if (isIndexedValueInStack(base, fulfilled)) {
    const ref = getRefParam(ctx, fulfilled.i);
    serialized = promiseConstructor + (node.s ? "().then(" + createFunction([], ref) + ")" : "().catch(" + createEffectfulFunction([], "throw " + ref) + ")");
  } else {
    base.stack.push(id);
    const result = serialize(ctx, fulfilled);
    base.stack.pop();
    serialized = promiseConstructor + "(" + result + ")";
  }
  return serialized;
}
function serializeBoxed(ctx, node) {
  return "Object(" + serialize(ctx, node.f) + ")";
}
function getConstructor(ctx, node) {
  const current = serialize(ctx, node);
  return node.t === 4 ? current : "(" + current + ")";
}
function serializePromiseConstructor(ctx, node) {
  if (ctx.mode === 1) {
    throw new SerovalUnsupportedNodeError(node);
  }
  const resolver = assignIndexedValue2(
    ctx,
    node.s,
    getConstructor(ctx, node.f) + "()"
  );
  return "(" + resolver + ").p";
}
function serializePromiseResolve(ctx, node) {
  if (ctx.mode === 1) {
    throw new SerovalUnsupportedNodeError(node);
  }
  return getConstructor(ctx, node.a[0]) + "(" + getRefParam(ctx, node.i) + "," + serialize(ctx, node.a[1]) + ")";
}
function serializePromiseReject(ctx, node) {
  if (ctx.mode === 1) {
    throw new SerovalUnsupportedNodeError(node);
  }
  return getConstructor(ctx, node.a[0]) + "(" + getRefParam(ctx, node.i) + "," + serialize(ctx, node.a[1]) + ")";
}
function serializePlugin(ctx, node) {
  const currentPlugins = ctx.base.plugins;
  if (currentPlugins) {
    for (let i = 0, len = currentPlugins.length; i < len; i++) {
      const plugin = currentPlugins[i];
      if (plugin.tag === node.c) {
        if (ctx.child == null) {
          ctx.child = new SerializePluginContext(ctx);
        }
        return plugin.serialize(node.s, ctx.child, {
          id: node.i
        });
      }
    }
  }
  throw new SerovalMissingPluginError(node.c);
}
function serializeIteratorFactory(ctx, node) {
  let result = "";
  let initialized = false;
  if (node.f.t !== 4) {
    markSerializerRef(ctx.base, node.f.i);
    result = "(" + serialize(ctx, node.f) + ",";
    initialized = true;
  }
  result += assignIndexedValue2(
    ctx,
    node.i,
    "(" + SERIALIZED_ITERATOR_CONSTRUCTOR + ")(" + getRefParam(ctx, node.f.i) + ")"
  );
  if (initialized) {
    result += ")";
  }
  return result;
}
function serializeIteratorFactoryInstance(ctx, node) {
  return getConstructor(ctx, node.a[0]) + "(" + serialize(ctx, node.a[1]) + ")";
}
function serializeAsyncIteratorFactory(ctx, node) {
  const promise = node.a[0];
  const symbol = node.a[1];
  const base = ctx.base;
  let result = "";
  if (promise.t !== 4) {
    markSerializerRef(base, promise.i);
    result += "(" + serialize(ctx, promise);
  }
  if (symbol.t !== 4) {
    markSerializerRef(base, symbol.i);
    result += (result ? "," : "(") + serialize(ctx, symbol);
  }
  if (result) {
    result += ",";
  }
  const iterator = assignIndexedValue2(
    ctx,
    node.i,
    "(" + SERIALIZED_ASYNC_ITERATOR_CONSTRUCTOR + ")(" + getRefParam(ctx, symbol.i) + "," + getRefParam(ctx, promise.i) + ")"
  );
  if (result) {
    return result + iterator + ")";
  }
  return iterator;
}
function serializeAsyncIteratorFactoryInstance(ctx, node) {
  return getConstructor(ctx, node.a[0]) + "(" + serialize(ctx, node.a[1]) + ")";
}
function serializeStreamConstructor(ctx, node) {
  const result = assignIndexedValue2(
    ctx,
    node.i,
    getConstructor(ctx, node.f) + "()"
  );
  const len = node.a.length;
  if (len) {
    let values = serialize(ctx, node.a[0]);
    for (let i = 1; i < len; i++) {
      values += "," + serialize(ctx, node.a[i]);
    }
    return "(" + result + "," + values + "," + getRefParam(ctx, node.i) + ")";
  }
  return result;
}
function serializeStreamNext(ctx, node) {
  return getRefParam(ctx, node.i) + ".next(" + serialize(ctx, node.f) + ")";
}
function serializeStreamThrow(ctx, node) {
  return getRefParam(ctx, node.i) + ".throw(" + serialize(ctx, node.f) + ")";
}
function serializeStreamReturn(ctx, node) {
  return getRefParam(ctx, node.i) + ".return(" + serialize(ctx, node.f) + ")";
}
function serializeSequenceItem(ctx, id, index, item) {
  const base = ctx.base;
  if (isIndexedValueInStack(base, item)) {
    markSerializerRef(base, id);
    createSequenceAssign(
      ctx,
      id,
      index,
      getRefParam(ctx, item.i)
    );
    return "";
  }
  return serialize(ctx, item);
}
function serializeSequence(ctx, node) {
  const items = node.a;
  const size = items.length;
  const id = node.i;
  if (size > 0) {
    ctx.base.stack.push(id);
    let result = serializeSequenceItem(ctx, id, 0, items[0]);
    for (let i = 1, item = result; i < size; i++) {
      item = serializeSequenceItem(ctx, id, i, items[i]);
      result += (item && result && ",") + item;
    }
    ctx.base.stack.pop();
    if (result) {
      return "{__SEROVAL_SEQUENCE__:!0,v:[" + result + "],t:" + node.s + ",d:" + node.l + "}";
    }
  }
  return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function serializeAssignable(ctx, node) {
  switch (node.t) {
    case 17:
      return SYMBOL_STRING[node.s];
    case 18:
      return serializeReference(node);
    case 9:
      return serializeArray(ctx, node);
    case 10:
      return serializeObject(ctx, node);
    case 11:
      return serializeNullConstructor(ctx, node);
    case 5:
      return serializeDate(node);
    case 6:
      return serializeRegExp(ctx, node);
    case 7:
      return serializeSet(ctx, node);
    case 8:
      return serializeMap(ctx, node);
    case 19:
      return serializeArrayBuffer(ctx, node);
    case 16:
    case 15:
      return serializeTypedArray(ctx, node);
    case 20:
      return serializeDataView(ctx, node);
    case 14:
      return serializeAggregateError(ctx, node);
    case 13:
      return serializeError(ctx, node);
    case 12:
      return serializePromise(ctx, node);
    case 21:
      return serializeBoxed(ctx, node);
    case 22:
      return serializePromiseConstructor(ctx, node);
    case 25:
      return serializePlugin(ctx, node);
    case 26:
      return SPECIAL_REF_STRING[node.s];
    case 35:
      return serializeSequence(ctx, node);
    default:
      throw new SerovalUnsupportedNodeError(node);
  }
}
function serialize(ctx, node) {
  switch (node.t) {
    case 2:
      return CONSTANT_STRING[node.s];
    case 0:
      return "" + node.s;
    case 1:
      return '"' + node.s + '"';
    case 3:
      return node.s + "n";
    case 4:
      return getRefParam(ctx, node.i);
    case 23:
      return serializePromiseResolve(ctx, node);
    case 24:
      return serializePromiseReject(ctx, node);
    case 27:
      return serializeIteratorFactory(ctx, node);
    case 28:
      return serializeIteratorFactoryInstance(ctx, node);
    case 29:
      return serializeAsyncIteratorFactory(ctx, node);
    case 30:
      return serializeAsyncIteratorFactoryInstance(ctx, node);
    case 31:
      return serializeStreamConstructor(ctx, node);
    case 32:
      return serializeStreamNext(ctx, node);
    case 33:
      return serializeStreamThrow(ctx, node);
    case 34:
      return serializeStreamReturn(ctx, node);
    default:
      return assignIndexedValue2(ctx, node.i, serializeAssignable(ctx, node));
  }
}
function serializeTopCross(ctx, tree) {
  const result = serialize(ctx, tree);
  const id = tree.i;
  if (id == null) {
    return result;
  }
  const patches = resolvePatches(ctx.base);
  const ref = getRefParam(ctx, id);
  const scopeId = ctx.state.scopeId;
  const params = scopeId == null ? "" : GLOBAL_CONTEXT_REFERENCES;
  const body = patches ? "(" + result + "," + patches + ref + ")" : result;
  if (params === "") {
    if (tree.t === 10 && !patches) {
      return "(" + body + ")";
    }
    return body;
  }
  const args = scopeId == null ? "()" : "(" + GLOBAL_CONTEXT_REFERENCES + '["' + serializeString(scopeId) + '"])';
  return "(" + createFunction([params], body) + ")" + args;
}
var SyncParsePluginContext = class {
  constructor(_p, depth) {
    this._p = _p;
    this.depth = depth;
  }
  parse(current) {
    return parseSOS(this._p, this.depth, current);
  }
};
var StreamParsePluginContext = class {
  constructor(_p, depth) {
    this._p = _p;
    this.depth = depth;
  }
  parse(current) {
    return parseSOS(this._p, this.depth, current);
  }
  parseWithError(current) {
    return parseWithError(this._p, this.depth, current);
  }
  isAlive() {
    return this._p.state.alive;
  }
  pushPendingState() {
    pushPendingState(this._p);
  }
  popPendingState() {
    popPendingState(this._p);
  }
  onParse(node) {
    onParse(this._p, node);
  }
  onError(error) {
    onError(this._p, error);
  }
};
function createStreamParserState(options) {
  return {
    alive: true,
    pending: 0,
    initial: true,
    buffer: [],
    onParse: options.onParse,
    onError: options.onError,
    onDone: options.onDone
  };
}
function createStreamParserContext(options) {
  return {
    type: 2,
    base: createBaseParserContext(2, options),
    state: createStreamParserState(options)
  };
}
function parseItems2(ctx, depth, current) {
  const nodes = [];
  for (let i = 0, len = current.length; i < len; i++) {
    if (i in current) {
      nodes[i] = parseSOS(ctx, depth, current[i]);
    } else {
      nodes[i] = 0;
    }
  }
  return nodes;
}
function parseArray2(ctx, depth, id, current) {
  return createArrayNode(id, current, parseItems2(ctx, depth, current));
}
function parseProperties2(ctx, depth, properties) {
  const entries = Object.entries(properties);
  const keyNodes = [];
  const valueNodes = [];
  for (let i = 0, len = entries.length; i < len; i++) {
    keyNodes.push(serializeString(entries[i][0]));
    valueNodes.push(parseSOS(ctx, depth, entries[i][1]));
  }
  if (SYM_ITERATOR in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_ITERATOR));
    valueNodes.push(
      createIteratorFactoryInstanceNode(
        parseIteratorFactory(ctx.base),
        parseSOS(
          ctx,
          depth,
          createSequenceFromIterable(
            properties
          )
        )
      )
    );
  }
  if (SYM_ASYNC_ITERATOR in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_ASYNC_ITERATOR));
    valueNodes.push(
      createAsyncIteratorFactoryInstanceNode(
        parseAsyncIteratorFactory(ctx.base),
        parseSOS(
          ctx,
          depth,
          ctx.type === 1 ? createStream() : createStreamFromAsyncIterable(
            properties
          )
        )
      )
    );
  }
  if (SYM_TO_STRING_TAG in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_TO_STRING_TAG));
    valueNodes.push(createStringNode(properties[SYM_TO_STRING_TAG]));
  }
  if (SYM_IS_CONCAT_SPREADABLE in properties) {
    keyNodes.push(parseWellKnownSymbol(ctx.base, SYM_IS_CONCAT_SPREADABLE));
    valueNodes.push(
      properties[SYM_IS_CONCAT_SPREADABLE] ? TRUE_NODE : FALSE_NODE
    );
  }
  return {
    k: keyNodes,
    v: valueNodes
  };
}
function parsePlainObject2(ctx, depth, id, current, empty) {
  return createObjectNode(
    id,
    current,
    empty,
    parseProperties2(ctx, depth, current)
  );
}
function parseBoxed2(ctx, depth, id, current) {
  return createBoxedNode(id, parseSOS(ctx, depth, current.valueOf()));
}
function parseTypedArray2(ctx, depth, id, current) {
  return createTypedArrayNode(
    id,
    current,
    parseSOS(ctx, depth, current.buffer)
  );
}
function parseBigIntTypedArray2(ctx, depth, id, current) {
  return createBigIntTypedArrayNode(
    id,
    current,
    parseSOS(ctx, depth, current.buffer)
  );
}
function parseDataView2(ctx, depth, id, current) {
  return createDataViewNode(id, current, parseSOS(ctx, depth, current.buffer));
}
function parseError2(ctx, depth, id, current) {
  const options = getErrorOptions(current, ctx.base.features);
  return createErrorNode(
    id,
    current,
    options ? parseProperties2(ctx, depth, options) : NIL
  );
}
function parseAggregateError2(ctx, depth, id, current) {
  const options = getErrorOptions(current, ctx.base.features);
  return createAggregateErrorNode(
    id,
    current,
    options ? parseProperties2(ctx, depth, options) : NIL
  );
}
function parseMap2(ctx, depth, id, current) {
  const keyNodes = [];
  const valueNodes = [];
  for (const [key, value] of current.entries()) {
    keyNodes.push(parseSOS(ctx, depth, key));
    valueNodes.push(parseSOS(ctx, depth, value));
  }
  return createMapNode(ctx.base, id, keyNodes, valueNodes);
}
function parseSet2(ctx, depth, id, current) {
  const items = [];
  for (const item of current.keys()) {
    items.push(parseSOS(ctx, depth, item));
  }
  return createSetNode(id, items);
}
function parseStream2(ctx, depth, id, current) {
  const result = createStreamConstructorNode(
    id,
    parseSpecialReference(
      ctx.base,
      4
      /* StreamConstructor */
    ),
    []
  );
  if (ctx.type === 1) {
    return result;
  }
  pushPendingState(ctx);
  current.on({
    next: (value) => {
      if (ctx.state.alive) {
        const parsed = parseWithError(ctx, depth, value);
        if (parsed) {
          onParse(ctx, createStreamNextNode(id, parsed));
        }
      }
    },
    throw: (value) => {
      if (ctx.state.alive) {
        const parsed = parseWithError(ctx, depth, value);
        if (parsed) {
          onParse(ctx, createStreamThrowNode(id, parsed));
        }
      }
      popPendingState(ctx);
    },
    return: (value) => {
      if (ctx.state.alive) {
        const parsed = parseWithError(ctx, depth, value);
        if (parsed) {
          onParse(ctx, createStreamReturnNode(id, parsed));
        }
      }
      popPendingState(ctx);
    }
  });
  return result;
}
function handlePromiseSuccess(id, depth, data) {
  if (this.state.alive) {
    const parsed = parseWithError(this, depth, data);
    if (parsed) {
      onParse(
        this,
        createSerovalNode(
          23,
          id,
          NIL,
          NIL,
          NIL,
          NIL,
          NIL,
          [
            parseSpecialReference(
              this.base,
              2
              /* PromiseSuccess */
            ),
            parsed
          ],
          NIL,
          NIL,
          NIL,
          NIL
        )
      );
    }
    popPendingState(this);
  }
}
function handlePromiseFailure(id, depth, data) {
  if (this.state.alive) {
    const parsed = parseWithError(this, depth, data);
    if (parsed) {
      onParse(
        this,
        createSerovalNode(
          24,
          id,
          NIL,
          NIL,
          NIL,
          NIL,
          NIL,
          [
            parseSpecialReference(
              this.base,
              3
              /* PromiseFailure */
            ),
            parsed
          ],
          NIL,
          NIL,
          NIL,
          NIL
        )
      );
    }
  }
  popPendingState(this);
}
function parsePromise2(ctx, depth, id, current) {
  const resolver = createIndexForValue(ctx.base, {});
  if (ctx.type === 2) {
    pushPendingState(ctx);
    current.then(
      handlePromiseSuccess.bind(ctx, resolver, depth),
      handlePromiseFailure.bind(ctx, resolver, depth)
    );
  }
  return createPromiseConstructorNode(ctx.base, id, resolver);
}
function parsePluginSync(ctx, depth, id, current, currentPlugins) {
  for (let i = 0, len = currentPlugins.length; i < len; i++) {
    const plugin = currentPlugins[i];
    if (plugin.parse.sync && plugin.test(current)) {
      return createPluginNode(
        id,
        plugin.tag,
        plugin.parse.sync(current, new SyncParsePluginContext(ctx, depth), {
          id
        })
      );
    }
  }
  return NIL;
}
function parsePluginStream(ctx, depth, id, current, currentPlugins) {
  for (let i = 0, len = currentPlugins.length; i < len; i++) {
    const plugin = currentPlugins[i];
    if (plugin.parse.stream && plugin.test(current)) {
      return createPluginNode(
        id,
        plugin.tag,
        plugin.parse.stream(current, new StreamParsePluginContext(ctx, depth), {
          id
        })
      );
    }
  }
  return NIL;
}
function parsePlugin2(ctx, depth, id, current) {
  const currentPlugins = ctx.base.plugins;
  if (currentPlugins) {
    return ctx.type === 1 ? parsePluginSync(ctx, depth, id, current, currentPlugins) : parsePluginStream(ctx, depth, id, current, currentPlugins);
  }
  return NIL;
}
function parseSequence2(ctx, depth, id, current) {
  const nodes = [];
  for (let i = 0, len = current.v.length; i < len; i++) {
    nodes[i] = parseSOS(ctx, depth, current.v[i]);
  }
  return createSequenceNode(id, nodes, current.t, current.d);
}
function parseObjectPhase2(ctx, depth, id, current, currentClass) {
  switch (currentClass) {
    case Object:
      return parsePlainObject2(
        ctx,
        depth,
        id,
        current,
        false
      );
    case NIL:
      return parsePlainObject2(
        ctx,
        depth,
        id,
        current,
        true
      );
    case Date:
      return createDateNode(id, current);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return parseError2(ctx, depth, id, current);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return parseBoxed2(ctx, depth, id, current);
    case ArrayBuffer:
      return createArrayBufferNode(
        ctx.base,
        id,
        current
      );
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return parseTypedArray2(
        ctx,
        depth,
        id,
        current
      );
    case DataView:
      return parseDataView2(ctx, depth, id, current);
    case Map:
      return parseMap2(
        ctx,
        depth,
        id,
        current
      );
    case Set:
      return parseSet2(ctx, depth, id, current);
  }
  if (currentClass === Promise || current instanceof Promise) {
    return parsePromise2(ctx, depth, id, current);
  }
  const currentFeatures = ctx.base.features;
  if (currentFeatures & 32 && currentClass === RegExp) {
    return createRegExpNode(id, current);
  }
  if (currentFeatures & 16) {
    switch (currentClass) {
      case BigInt64Array:
      case BigUint64Array:
        return parseBigIntTypedArray2(
          ctx,
          depth,
          id,
          current
        );
    }
  }
  if (currentFeatures & 1 && typeof AggregateError !== "undefined" && (currentClass === AggregateError || current instanceof AggregateError)) {
    return parseAggregateError2(
      ctx,
      depth,
      id,
      current
    );
  }
  if (current instanceof Error) {
    return parseError2(ctx, depth, id, current);
  }
  if (SYM_ITERATOR in current || SYM_ASYNC_ITERATOR in current) {
    return parsePlainObject2(ctx, depth, id, current, !!currentClass);
  }
  throw new SerovalUnsupportedTypeError(current);
}
function parseObject(ctx, depth, id, current) {
  if (Array.isArray(current)) {
    return parseArray2(ctx, depth, id, current);
  }
  if (isStream(current)) {
    return parseStream2(ctx, depth, id, current);
  }
  if (isSequence(current)) {
    return parseSequence2(ctx, depth, id, current);
  }
  const currentClass = current.constructor;
  if (currentClass === OpaqueReference) {
    return parseSOS(
      ctx,
      depth,
      current.replacement
    );
  }
  const parsed = parsePlugin2(ctx, depth, id, current);
  if (parsed) {
    return parsed;
  }
  return parseObjectPhase2(ctx, depth, id, current, currentClass);
}
function parseFunction(ctx, depth, current) {
  const ref = getReferenceNode(ctx.base, current);
  if (ref.type !== 0) {
    return ref.value;
  }
  const plugin = parsePlugin2(ctx, depth, ref.value, current);
  if (plugin) {
    return plugin;
  }
  throw new SerovalUnsupportedTypeError(current);
}
function parseSOS(ctx, depth, current) {
  if (depth >= ctx.base.depthLimit) {
    throw new SerovalDepthLimitError(ctx.base.depthLimit);
  }
  switch (typeof current) {
    case "boolean":
      return current ? TRUE_NODE : FALSE_NODE;
    case "undefined":
      return UNDEFINED_NODE;
    case "string":
      return createStringNode(current);
    case "number":
      return createNumberNode(current);
    case "bigint":
      return createBigIntNode(current);
    case "object": {
      if (current) {
        const ref = getReferenceNode(ctx.base, current);
        return ref.type === 0 ? parseObject(ctx, depth + 1, ref.value, current) : ref.value;
      }
      return NULL_NODE;
    }
    case "symbol":
      return parseWellKnownSymbol(ctx.base, current);
    case "function": {
      return parseFunction(ctx, depth, current);
    }
    default:
      throw new SerovalUnsupportedTypeError(current);
  }
}
function onParse(ctx, node) {
  if (ctx.state.initial) {
    ctx.state.buffer.push(node);
  } else {
    onParseInternal(ctx, node, false);
  }
}
function onError(ctx, error) {
  if (ctx.state.onError) {
    ctx.state.onError(error);
  } else {
    throw error instanceof SerovalParserError ? error : new SerovalParserError(error);
  }
}
function onDone(ctx) {
  if (ctx.state.onDone) {
    ctx.state.onDone();
  }
}
function onParseInternal(ctx, node, initial) {
  try {
    ctx.state.onParse(node, initial);
  } catch (error) {
    onError(ctx, error);
  }
}
function pushPendingState(ctx) {
  ctx.state.pending++;
}
function popPendingState(ctx) {
  if (--ctx.state.pending <= 0) {
    onDone(ctx);
  }
}
function parseWithError(ctx, depth, current) {
  try {
    return parseSOS(ctx, depth, current);
  } catch (err) {
    onError(ctx, err);
    return NIL;
  }
}
function startStreamParse(ctx, current) {
  const parsed = parseWithError(ctx, 0, current);
  if (parsed) {
    onParseInternal(ctx, parsed, true);
    ctx.state.initial = false;
    flushStreamParse(ctx, ctx.state);
    if (ctx.state.pending <= 0) {
      destroyStreamParse(ctx);
    }
  }
}
function flushStreamParse(ctx, state) {
  for (let i = 0, len = state.buffer.length; i < len; i++) {
    onParseInternal(ctx, state.buffer[i], false);
  }
}
function destroyStreamParse(ctx) {
  if (ctx.state.alive) {
    onDone(ctx);
    ctx.state.alive = false;
  }
}
async function toCrossJSONAsync(source, options = {}) {
  const plugins = resolvePlugins(options.plugins);
  const ctx = createAsyncParserContext(2, {
    plugins,
    disabledFeatures: options.disabledFeatures,
    refs: options.refs
  });
  return await parseTopAsync(ctx, source);
}
function crossSerializeStream(source, options) {
  const plugins = resolvePlugins(options.plugins);
  const ctx = createStreamParserContext({
    plugins,
    refs: options.refs,
    disabledFeatures: options.disabledFeatures,
    onParse(node, initial) {
      const serial = createCrossSerializerContext({
        plugins,
        features: ctx.base.features,
        scopeId: options.scopeId,
        markedRefs: ctx.base.marked
      });
      let serialized;
      try {
        serialized = serializeTopCross(serial, node);
      } catch (err) {
        if (options.onError) {
          options.onError(err);
        }
        return;
      }
      options.onSerialize(serialized, initial);
    },
    onError: options.onError,
    onDone: options.onDone
  });
  startStreamParse(ctx, source);
  return destroyStreamParse.bind(null, ctx);
}
function toCrossJSONStream(source, options) {
  const plugins = resolvePlugins(options.plugins);
  const ctx = createStreamParserContext({
    plugins,
    refs: options.refs,
    disabledFeatures: options.disabledFeatures,
    depthLimit: options.depthLimit,
    onParse: options.onParse,
    onError: options.onError,
    onDone: options.onDone
  });
  startStreamParse(ctx, source);
  return destroyStreamParse.bind(null, ctx);
}
function fromJSON(source, options = {}) {
  var _a;
  const plugins = resolvePlugins(options.plugins);
  const disabledFeatures = options.disabledFeatures || 0;
  const sourceFeatures = (_a = source.f) != null ? _a : ALL_ENABLED;
  const ctx = createVanillaDeserializerContext({
    plugins,
    markedRefs: source.m,
    features: sourceFeatures & ~disabledFeatures,
    disabledFeatures
  });
  return deserializeTop(ctx, source.t);
}
function createSerializationAdapter(opts) {
  return opts;
}
// @__NO_SIDE_EFFECTS__
function makeSsrSerovalPlugin(serializationAdapter, options) {
  return /* @__PURE__ */ createPlugin({
    tag: "$TSR/t/" + serializationAdapter.key,
    test: serializationAdapter.test,
    parse: { stream(value, ctx, _data) {
      return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
    } },
    serialize(node, ctx, _data) {
      options.didRun = true;
      return GLOBAL_TSR + '.t.get("' + serializationAdapter.key + '")(' + ctx.serialize(node.v) + ")";
    },
    deserialize: void 0
  });
}
// @__NO_SIDE_EFFECTS__
function makeSerovalPlugin(serializationAdapter) {
  return /* @__PURE__ */ createPlugin({
    tag: "$TSR/t/" + serializationAdapter.key,
    test: serializationAdapter.test,
    parse: {
      sync(value, ctx, _data) {
        return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
      },
      async async(value, ctx, _data) {
        return { v: await ctx.parse(serializationAdapter.toSerializable(value)) };
      },
      stream(value, ctx, _data) {
        return { v: ctx.parse(serializationAdapter.toSerializable(value)) };
      }
    },
    serialize: void 0,
    deserialize(node, ctx, _data) {
      return serializationAdapter.fromSerializable(ctx.deserialize(node.v));
    }
  });
}
var RawStream = class {
  constructor(stream, options) {
    this.stream = stream;
    this.hint = options?.hint ?? "binary";
  }
};
const BufferCtor = globalThis.Buffer;
const hasNodeBuffer = !!BufferCtor && typeof BufferCtor.from === "function";
function uint8ArrayToBase64(bytes) {
  if (bytes.length === 0) return "";
  if (hasNodeBuffer) return BufferCtor.from(bytes).toString("base64");
  const CHUNK_SIZE = 32768;
  const chunks = [];
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, i + CHUNK_SIZE);
    chunks.push(String.fromCharCode.apply(null, chunk));
  }
  return btoa(chunks.join(""));
}
function base64ToUint8Array(base64) {
  if (base64.length === 0) return new Uint8Array(0);
  if (hasNodeBuffer) {
    const buf = BufferCtor.from(base64, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
const RAW_STREAM_FACTORY_BINARY = /* @__PURE__ */ Object.create(null);
const RAW_STREAM_FACTORY_TEXT = /* @__PURE__ */ Object.create(null);
const RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY = (stream) => new ReadableStream({ start(controller) {
  stream.on({
    next(base64) {
      try {
        controller.enqueue(base64ToUint8Array(base64));
      } catch {
      }
    },
    throw(error) {
      controller.error(error);
    },
    return() {
      try {
        controller.close();
      } catch {
      }
    }
  });
} });
const textEncoderForFactory = new TextEncoder();
const RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT = (stream) => {
  return new ReadableStream({ start(controller) {
    stream.on({
      next(value) {
        try {
          if (typeof value === "string") controller.enqueue(textEncoderForFactory.encode(value));
          else controller.enqueue(base64ToUint8Array(value.$b64));
        } catch {
        }
      },
      throw(error) {
        controller.error(error);
      },
      return() {
        try {
          controller.close();
        } catch {
        }
      }
    });
  } });
};
const FACTORY_BINARY = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
const FACTORY_TEXT = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
function toBinaryStream(readable) {
  const stream = createStream();
  const reader = readable.getReader();
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          stream.return(void 0);
          break;
        }
        stream.next(uint8ArrayToBase64(value));
      }
    } catch (error) {
      stream.throw(error);
    } finally {
      reader.releaseLock();
    }
  })();
  return stream;
}
function toTextStream(readable) {
  const stream = createStream();
  const reader = readable.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          try {
            const remaining = decoder.decode();
            if (remaining.length > 0) stream.next(remaining);
          } catch {
          }
          stream.return(void 0);
          break;
        }
        try {
          const text = decoder.decode(value, { stream: true });
          if (text.length > 0) stream.next(text);
        } catch {
          stream.next({ $b64: uint8ArrayToBase64(value) });
        }
      }
    } catch (error) {
      stream.throw(error);
    } finally {
      reader.releaseLock();
    }
  })();
  return stream;
}
const RawStreamSSRPlugin = /* @__PURE__ */ createPlugin({
  tag: "tss/RawStream",
  extends: [/* @__PURE__ */ createPlugin({
    tag: "tss/RawStreamFactory",
    test(value) {
      return value === RAW_STREAM_FACTORY_BINARY;
    },
    parse: {
      sync(_value, _ctx, _data) {
        return {};
      },
      async async(_value, _ctx, _data) {
        return {};
      },
      stream(_value, _ctx, _data) {
        return {};
      }
    },
    serialize(_node, _ctx, _data) {
      return FACTORY_BINARY;
    },
    deserialize(_node, _ctx, _data) {
      return RAW_STREAM_FACTORY_BINARY;
    }
  }), /* @__PURE__ */ createPlugin({
    tag: "tss/RawStreamFactoryText",
    test(value) {
      return value === RAW_STREAM_FACTORY_TEXT;
    },
    parse: {
      sync(_value, _ctx, _data) {
        return {};
      },
      async async(_value, _ctx, _data) {
        return {};
      },
      stream(_value, _ctx, _data) {
        return {};
      }
    },
    serialize(_node, _ctx, _data) {
      return FACTORY_TEXT;
    },
    deserialize(_node, _ctx, _data) {
      return RAW_STREAM_FACTORY_TEXT;
    }
  })],
  test(value) {
    return value instanceof RawStream;
  },
  parse: {
    sync(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      return {
        hint: ctx.parse(value.hint),
        factory: ctx.parse(factory),
        stream: ctx.parse(createStream())
      };
    },
    async async(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
      return {
        hint: await ctx.parse(value.hint),
        factory: await ctx.parse(factory),
        stream: await ctx.parse(encodedStream)
      };
    },
    stream(value, ctx, _data) {
      const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
      const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
      return {
        hint: ctx.parse(value.hint),
        factory: ctx.parse(factory),
        stream: ctx.parse(encodedStream)
      };
    }
  },
  serialize(node, ctx, _data) {
    return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
  },
  deserialize(node, ctx, _data) {
    const stream = ctx.deserialize(node.stream);
    return ctx.deserialize(node.hint) === "text" ? RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT(stream) : RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY(stream);
  }
});
// @__NO_SIDE_EFFECTS__
function createRawStreamRPCPlugin(onRawStream) {
  let nextStreamId = 1;
  return /* @__PURE__ */ createPlugin({
    tag: "tss/RawStream",
    test(value) {
      return value instanceof RawStream;
    },
    parse: {
      async async(value, ctx, _data) {
        const streamId = nextStreamId++;
        onRawStream(streamId, value.stream);
        return { streamId: await ctx.parse(streamId) };
      },
      stream(value, ctx, _data) {
        const streamId = nextStreamId++;
        onRawStream(streamId, value.stream);
        return { streamId: ctx.parse(streamId) };
      }
    },
    serialize() {
      throw new Error("RawStreamRPCPlugin.serialize should not be called. RPC uses JSON serialization, not JS code generation.");
    },
    deserialize() {
      throw new Error("RawStreamRPCPlugin.deserialize should not be called. Use createRawStreamDeserializePlugin on client.");
    }
  });
}
const ShallowErrorPlugin = /* @__PURE__ */ createPlugin({
  tag: "$TSR/Error",
  test(value) {
    return value instanceof Error;
  },
  parse: {
    sync(value, ctx) {
      return { message: ctx.parse(value.message) };
    },
    async async(value, ctx) {
      return { message: await ctx.parse(value.message) };
    },
    stream(value, ctx) {
      return { message: ctx.parse(value.message) };
    }
  },
  serialize(node, ctx) {
    return "new Error(" + ctx.serialize(node.message) + ")";
  },
  deserialize(node, ctx) {
    return new Error(ctx.deserialize(node.message));
  }
});
var READABLE_STREAM_FACTORY = {};
var READABLE_STREAM_FACTORY_CONSTRUCTOR = (stream) => new ReadableStream({
  start: (controller) => {
    stream.on({
      next: (value) => {
        try {
          controller.enqueue(value);
        } catch (_error) {
        }
      },
      throw: (value) => {
        controller.error(value);
      },
      return: () => {
        try {
          controller.close();
        } catch (_error) {
        }
      }
    });
  }
});
var ReadableStreamFactoryPlugin = /* @__PURE__ */ createPlugin({
  tag: "seroval-plugins/web/ReadableStreamFactory",
  test(value) {
    return value === READABLE_STREAM_FACTORY;
  },
  parse: {
    sync() {
      return READABLE_STREAM_FACTORY;
    },
    async async() {
      return await Promise.resolve(READABLE_STREAM_FACTORY);
    },
    stream() {
      return READABLE_STREAM_FACTORY;
    }
  },
  serialize() {
    return READABLE_STREAM_FACTORY_CONSTRUCTOR.toString();
  },
  deserialize() {
    return READABLE_STREAM_FACTORY;
  }
});
function toStream(value) {
  const stream = createStream();
  const reader = value.getReader();
  async function push() {
    try {
      const result = await reader.read();
      if (result.done) {
        stream.return(result.value);
      } else {
        stream.next(result.value);
        await push();
      }
    } catch (error) {
      stream.throw(error);
    }
  }
  push().catch(() => {
  });
  return stream;
}
var ReadableStreamPlugin = /* @__PURE__ */ createPlugin({
  tag: "seroval/plugins/web/ReadableStream",
  extends: [ReadableStreamFactoryPlugin],
  test(value) {
    if (typeof ReadableStream === "undefined") {
      return false;
    }
    return value instanceof ReadableStream;
  },
  parse: {
    sync(_value, ctx) {
      return {
        factory: ctx.parse(READABLE_STREAM_FACTORY),
        stream: ctx.parse(createStream())
      };
    },
    async async(value, ctx) {
      return {
        factory: await ctx.parse(READABLE_STREAM_FACTORY),
        stream: await ctx.parse(toStream(value))
      };
    },
    stream(value, ctx) {
      return {
        factory: ctx.parse(READABLE_STREAM_FACTORY),
        stream: ctx.parse(toStream(value))
      };
    }
  },
  serialize(node, ctx) {
    return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
  },
  deserialize(node, ctx) {
    const stream = ctx.deserialize(node.stream);
    return READABLE_STREAM_FACTORY_CONSTRUCTOR(stream);
  }
});
var readable_stream_default = ReadableStreamPlugin;
const defaultSerovalPlugins = [
  ShallowErrorPlugin,
  RawStreamSSRPlugin,
  readable_stream_default
];
async function getStartManifest(matchedRoutes) {
  const { tsrStartManifest } = await import("./assets/_tanstack-start-manifest_v-CVJ-A5G3.js");
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  let injectedHeadScripts;
  return {
    manifest: {
      inlineCss: startManifest.inlineCss,
      routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k, v]) => {
        const result = {};
        let hasData = false;
        if (v.preloads && v.preloads.length > 0) {
          result["preloads"] = v.preloads;
          hasData = true;
        }
        if (v.assets && v.assets.length > 0) {
          result["assets"] = v.assets;
          hasData = true;
        }
        if (!hasData) return [];
        return [[k, result]];
      }))
    },
    clientEntry: startManifest.clientEntry,
    injectedHeadScripts
  };
}
const manifest = {
  "1532c05db466ba1b1bc583dee69628bf12ef40c1a2afa5eb87dedd956ac18a00": {
    functionName: "updateUserProfileFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  },
  "19581cee06c75675a4c2132433a07fb136a59fc47eb61e504bddfaea406acd3e": {
    functionName: "assertAuthenticatedFn_createServerFn_handler",
    importer: () => import("./assets/guards-Wg96TYC-.js")
  },
  "219a148858532d69760ee93986760a55ef1bf2c06c8797a860837d09bb2b1169": {
    functionName: "createCheckoutSessionFn_createServerFn_handler",
    importer: () => import("./assets/subscriptions-Ct2At71q.js")
  },
  "2df6b4342eedb937bf3d92cfe05ebd5a833d112f86c005def30fa8cc336984c7": {
    functionName: "getImageUrlFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  },
  "610332affe54dce49d2c5b3553feab913e268a25da2886ff8cc7a38f049aeaf7": {
    functionName: "getPresignedUploadUrlFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  },
  "707390cd9bacb8ad9b94538edd1c8ad6d55bed8171a8659e68e98c1997e4071a": {
    functionName: "getProfileImageUploadUrlFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  },
  "7657dde2a7a117a0f15f3fb1b4c22b13c004b6e110224c8627d69bc77665e50f": {
    functionName: "setThemeFn_createServerFn_handler",
    importer: () => import("./assets/theme-provider-BypXIMDZ.js")
  },
  "952bb73e70f4dcc4a3e1fce3e45a02d3e9138bd8bc203139e95b406765561ffc": {
    functionName: "cancelSubscriptionFn_createServerFn_handler",
    importer: () => import("./assets/subscriptions-Ct2At71q.js")
  },
  "af7ddf1ac8af1852cae9847fc884ab80bf328b5a4f8ff5bc6b044f5dc5f55549": {
    functionName: "deleteUserAccountFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  },
  "c55a96fc9c7590e556284e4d72cddce136617c9ae2329815f3e29a0c910eb7b2": {
    functionName: "getThemeFn_createServerFn_handler",
    importer: () => import("./assets/theme-provider-BypXIMDZ.js")
  },
  "c597815a4705e9a9d9b50005006de23c80966c94a6038c891d62fe4909b498b8": {
    functionName: "createPortalSessionFn_createServerFn_handler",
    importer: () => import("./assets/subscriptions-Ct2At71q.js")
  },
  "d61fe3c9c7f887be5d8a69157b19978cccf0f713ce9e284c0148e6715ddbf969": {
    functionName: "getUserPlanFn_createServerFn_handler",
    importer: () => import("./assets/subscriptions-Ct2At71q.js")
  },
  "d9234728733cefe7b317868901f873f31d66d20f89e6e5978706c16dd0d7cd6f": {
    functionName: "getPresignedImageUploadUrlFn_createServerFn_handler",
    importer: () => import("./assets/storage-C45YrL_u.js")
  }
};
async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error("Server function info not found for " + id);
  }
  const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
  if (!fnModule) {
    throw new Error("Server function module not resolved for " + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    throw new Error("Server function module export not resolved for serverFn ID: " + id);
  }
  return action;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = /* @__PURE__ */ Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
var FrameType = {
  JSON: 0,
  CHUNK: 1,
  END: 2,
  ERROR: 3
};
var FRAME_HEADER_SIZE = 9;
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
function isSafeKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function safeObjectMerge(target, source) {
  const result = /* @__PURE__ */ Object.create(null);
  if (target) {
    for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
  }
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
  }
  return result;
}
function createNullProtoObject(source) {
  if (!source) return /* @__PURE__ */ Object.create(null);
  const obj = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
  return obj;
}
var GLOBAL_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
  return startStorage.run(context, fn);
}
function getStartContext(opts) {
  const context = startStorage.getStore();
  if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
function splitSetCookieString(cookiesString) {
  if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitSetCookieString(c));
  if (typeof cookiesString !== "string") return [];
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) pos += 1;
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else pos = lastComma + 1;
      } else pos += 1;
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
  }
  return cookiesStrings;
}
function toHeadersInstance(init) {
  if (init instanceof Headers) return init;
  else if (Array.isArray(init)) return new Headers(init);
  else if (typeof init === "object") return new Headers(init);
  else return null;
}
function mergeHeaders(...headers) {
  return headers.reduce((acc, header) => {
    const headersInstance = toHeadersInstance(header);
    if (!headersInstance) return acc;
    for (const [key, value] of headersInstance.entries()) if (key === "set-cookie") splitSetCookieString(value).forEach((cookie) => acc.append("set-cookie", cookie));
    else acc.set(key, value);
    return acc;
  }, new Headers());
}
function dehydrateSsrMatchId(id) {
  return id.replaceAll("/", "\0");
}
var createServerFn = (options, __opts) => {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
  const res = {
    options: resolvedOptions,
    middleware: (middleware) => {
      const newMiddleware = [...resolvedOptions.middleware || []];
      middleware.map((m) => {
        if (TSS_SERVER_FUNCTION_FACTORY in m) {
          if (m.options.middleware) newMiddleware.push(...m.options.middleware);
        } else newMiddleware.push(m);
      });
      const res2 = createServerFn(void 0, {
        ...resolvedOptions,
        middleware: newMiddleware
      });
      res2[TSS_SERVER_FUNCTION_FACTORY] = true;
      return res2;
    },
    inputValidator: (inputValidator) => {
      return createServerFn(void 0, {
        ...resolvedOptions,
        inputValidator
      });
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      const newOptions = {
        ...resolvedOptions,
        extractedFn,
        serverFn
      };
      const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
      extractedFn.method = resolvedOptions.method;
      return Object.assign(async (opts) => {
        const result = await executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...newOptions,
          data: opts?.data,
          headers: opts?.headers,
          signal: opts?.signal,
          fetch: opts?.fetch,
          context: createNullProtoObject()
        });
        const redirect2 = parseRedirect(result.error);
        if (redirect2) throw redirect2;
        if (result.error) throw result.error;
        return result.result;
      }, {
        ...extractedFn,
        method: resolvedOptions.method,
        __executeServer: async (opts) => {
          const startContext = getStartContextServerOnly();
          const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
          return await executeMiddleware$1(resolvedMiddleware, "server", {
            ...extractedFn,
            ...opts,
            serverFnMeta: extractedFn.serverFnMeta,
            context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
            request: startContext.request
          }).then((d) => ({
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
        }
      });
    }
  };
  const fun = (options2) => {
    return createServerFn(void 0, {
      ...resolvedOptions,
      ...options2
    });
  };
  return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
  let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
  if (env === "server") {
    const startContext = getStartContextServerOnly({ throwIfNotFound: false });
    if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
  }
  const callNextMiddleware = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) return ctx;
    try {
      if ("inputValidator" in nextMiddleware.options && nextMiddleware.options.inputValidator && env === "server") ctx.data = await execValidator(nextMiddleware.options.inputValidator, ctx.data);
      let middlewareFn = void 0;
      if (env === "client") {
        if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
      } else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
      if (middlewareFn) {
        const userNext = async (userCtx = {}) => {
          const result2 = await callNextMiddleware({
            ...ctx,
            ...userCtx,
            context: safeObjectMerge(ctx.context, userCtx.context),
            sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
            headers: mergeHeaders(ctx.headers, userCtx.headers),
            _callSiteFetch: ctx._callSiteFetch,
            fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
            result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
            error: userCtx.error ?? ctx.error
          });
          if (result2.error) throw result2.error;
          return result2;
        };
        const result = await middlewareFn({
          ...ctx,
          next: userNext
        });
        if (isRedirect(result)) return {
          ...ctx,
          error: result
        };
        if (result instanceof Response) return {
          ...ctx,
          result
        };
        if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
        return result;
      }
      return callNextMiddleware(ctx);
    } catch (error) {
      return {
        ...ctx,
        error
      };
    }
  };
  return callNextMiddleware({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || createNullProtoObject(),
    _callSiteFetch: opts.fetch
  });
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware, depth) => {
    if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
    middleware.forEach((m) => {
      if (m.options.middleware) recurse(m.options.middleware, depth + 1);
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares, 0);
  return flattened;
}
async function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = await validator["~standard"].validate(input);
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) return validator.parse(input);
  if (typeof validator === "function") return validator(input);
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    "~types": void 0,
    options: {
      inputValidator: options.inputValidator,
      client: async ({ next, sendContext, fetch, ...ctx }) => {
        const payload = {
          ...ctx,
          context: sendContext,
          fetch
        };
        return next(await options.extractedFn?.(payload));
      },
      server: async ({ next, ...ctx }) => {
        const result = await options.serverFn?.(ctx);
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
function getDefaultSerovalPlugins() {
  return [...getStartOptions()?.serializationAdapters?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
var textEncoder = new TextEncoder();
var EMPTY_PAYLOAD = new Uint8Array(0);
function encodeFrame(type, streamId, payload) {
  const frame = new Uint8Array(FRAME_HEADER_SIZE + payload.length);
  frame[0] = type;
  frame[1] = streamId >>> 24 & 255;
  frame[2] = streamId >>> 16 & 255;
  frame[3] = streamId >>> 8 & 255;
  frame[4] = streamId & 255;
  frame[5] = payload.length >>> 24 & 255;
  frame[6] = payload.length >>> 16 & 255;
  frame[7] = payload.length >>> 8 & 255;
  frame[8] = payload.length & 255;
  frame.set(payload, FRAME_HEADER_SIZE);
  return frame;
}
function encodeJSONFrame(json) {
  return encodeFrame(FrameType.JSON, 0, textEncoder.encode(json));
}
function encodeChunkFrame(streamId, chunk) {
  return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
function encodeEndFrame(streamId) {
  return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
function encodeErrorFrame(streamId, error) {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  return encodeFrame(FrameType.ERROR, streamId, textEncoder.encode(message));
}
function createMultiplexedStream(jsonStream, rawStreams, lateStreamSource) {
  let controller;
  let cancelled = false;
  const readers = [];
  const enqueue = (frame) => {
    if (cancelled) return false;
    try {
      controller.enqueue(frame);
      return true;
    } catch {
      return false;
    }
  };
  const errorOutput = (error) => {
    if (cancelled) return;
    cancelled = true;
    try {
      controller.error(error);
    } catch {
    }
    for (const reader of readers) reader.cancel().catch(() => {
    });
  };
  async function pumpRawStream(streamId, stream) {
    const reader = stream.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) {
          enqueue(encodeEndFrame(streamId));
          return;
        }
        if (!enqueue(encodeChunkFrame(streamId, value))) return;
      }
    } catch (error) {
      enqueue(encodeErrorFrame(streamId, error));
    } finally {
      reader.releaseLock();
    }
  }
  async function pumpJSON() {
    const reader = jsonStream.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) return;
        if (!enqueue(encodeJSONFrame(value))) return;
      }
    } catch (error) {
      errorOutput(error);
      throw error;
    } finally {
      reader.releaseLock();
    }
  }
  async function pumpLateStreams() {
    if (!lateStreamSource) return [];
    const lateStreamPumps = [];
    const reader = lateStreamSource.getReader();
    readers.push(reader);
    try {
      while (!cancelled) {
        const { done, value } = await reader.read();
        if (done) break;
        lateStreamPumps.push(pumpRawStream(value.id, value.stream));
      }
    } finally {
      reader.releaseLock();
    }
    return lateStreamPumps;
  }
  return new ReadableStream({
    async start(ctrl) {
      controller = ctrl;
      const pumps = [pumpJSON()];
      for (const [streamId, stream] of rawStreams) pumps.push(pumpRawStream(streamId, stream));
      if (lateStreamSource) pumps.push(pumpLateStreams());
      try {
        const latePumps = (await Promise.all(pumps)).find(Array.isArray);
        if (latePumps && latePumps.length > 0) await Promise.all(latePumps);
        if (!cancelled) try {
          controller.close();
        } catch {
        }
      } catch {
      }
    },
    cancel() {
      cancelled = true;
      for (const reader of readers) reader.cancel().catch(() => {
      });
      readers.length = 0;
    }
  });
}
var serovalPlugins = void 0;
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
  const methodUpper = request.method.toUpperCase();
  const url = new URL(request.url);
  const action = await getServerFnById(serverFnId);
  if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
    status: 405,
    headers: { Allow: action.method }
  });
  const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
  if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
  const contentType = request.headers.get("Content-Type");
  function parsePayload(payload) {
    return fromJSON(payload, { plugins: serovalPlugins });
  }
  return await (async () => {
    try {
      let serializeResult = function(res2) {
        let nonStreamingBody = void 0;
        const alsResponse = getResponse();
        if (res2 !== void 0) {
          const rawStreams = /* @__PURE__ */ new Map();
          let initialPhase = true;
          let lateStreamWriter;
          let lateStreamReadable = void 0;
          const pendingLateStreams = [];
          const plugins = [/* @__PURE__ */ createRawStreamRPCPlugin((id, stream) => {
            if (initialPhase) {
              rawStreams.set(id, stream);
              return;
            }
            if (lateStreamWriter) {
              lateStreamWriter.write({
                id,
                stream
              }).catch(() => {
              });
              return;
            }
            pendingLateStreams.push({
              id,
              stream
            });
          }), ...serovalPlugins || []];
          let done = false;
          const callbacks = {
            onParse: (value) => {
              nonStreamingBody = value;
            },
            onDone: () => {
              done = true;
            },
            onError: (error) => {
              throw error;
            }
          };
          toCrossJSONStream(res2, {
            refs: /* @__PURE__ */ new Map(),
            plugins,
            onParse(value) {
              callbacks.onParse(value);
            },
            onDone() {
              callbacks.onDone();
            },
            onError: (error) => {
              callbacks.onError(error);
            }
          });
          initialPhase = false;
          if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": "application/json",
              [X_TSS_SERIALIZED]: "true"
            }
          });
          const { readable, writable } = new TransformStream();
          lateStreamReadable = readable;
          lateStreamWriter = writable.getWriter();
          for (const registration of pendingLateStreams) lateStreamWriter.write(registration).catch(() => {
          });
          pendingLateStreams.length = 0;
          const multiplexedStream = createMultiplexedStream(new ReadableStream({
            start(controller) {
              callbacks.onParse = (value) => {
                controller.enqueue(JSON.stringify(value) + "\n");
              };
              callbacks.onDone = () => {
                try {
                  controller.close();
                } catch {
                }
                lateStreamWriter?.close().catch(() => {
                }).finally(() => {
                  lateStreamWriter = void 0;
                });
              };
              callbacks.onError = (error) => {
                controller.error(error);
                lateStreamWriter?.abort(error).catch(() => {
                }).finally(() => {
                  lateStreamWriter = void 0;
                });
              };
              if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
              if (done) callbacks.onDone();
            },
            cancel() {
              lateStreamWriter?.abort().catch(() => {
              });
              lateStreamWriter = void 0;
            }
          }), rawStreams, lateStreamReadable);
          return new Response(multiplexedStream, {
            status: alsResponse.status,
            statusText: alsResponse.statusText,
            headers: {
              "Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
              [X_TSS_SERIALIZED]: "true"
            }
          });
        }
        return new Response(void 0, {
          status: alsResponse.status,
          statusText: alsResponse.statusText
        });
      };
      let res = await (async () => {
        if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
          if (methodUpper === "GET") {
            if (true) throw new Error("Invariant failed: GET requests with FormData payloads are not supported");
            invariant();
          }
          const formData = await request.formData();
          const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
          formData.delete(TSS_FORMDATA_CONTEXT);
          const params = {
            context,
            data: formData,
            method: methodUpper
          };
          if (typeof serializedContext === "string") try {
            const deserializedContext = fromJSON(JSON.parse(serializedContext), { plugins: serovalPlugins });
            if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(deserializedContext, context);
          } catch (e) {
            if (true) console.warn("Failed to parse FormData context:", e);
          }
          return await action(params);
        }
        if (methodUpper === "GET") {
          const payloadParam = url.searchParams.get("payload");
          if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
          const payload2 = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
          payload2.context = safeObjectMerge(payload2.context, context);
          payload2.method = methodUpper;
          return await action(payload2);
        }
        let jsonPayload;
        if (contentType?.includes("application/json")) jsonPayload = await request.json();
        const payload = jsonPayload ? parsePayload(jsonPayload) : {};
        payload.context = safeObjectMerge(payload.context, context);
        payload.method = methodUpper;
        return await action(payload);
      })();
      const unwrapped = res.result || res.error;
      if (isNotFound(res)) res = isNotFoundResponse(res);
      if (!isServerFn) return unwrapped;
      if (unwrapped instanceof Response) {
        if (isRedirect(unwrapped)) return unwrapped;
        unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
        return unwrapped;
      }
      return serializeResult(res);
    } catch (error) {
      if (error instanceof Response) return error;
      if (isNotFound(error)) return isNotFoundResponse(error);
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      const serializedError = JSON.stringify(await Promise.resolve(toCrossJSONAsync(error, {
        refs: /* @__PURE__ */ new Map(),
        plugins: serovalPlugins
      })));
      const response = getResponse();
      return new Response(serializedError, {
        status: response.status ?? 500,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
          [X_TSS_SERIALIZED]: "true"
        }
      });
    }
  })();
};
function isNotFoundResponse(error) {
  const { headers, ...rest } = error;
  return new Response(JSON.stringify(rest), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
var hasWarnedAboutDeprecatedTransformAssetUrls = false;
function warnDeprecatedTransformAssetUrls() {
  if (!hasWarnedAboutDeprecatedTransformAssetUrls) {
    hasWarnedAboutDeprecatedTransformAssetUrls = true;
    console.warn("[TanStack Start] `transformAssetUrls` is deprecated. Use `transformAssets` instead.");
  }
}
function normalizeTransformAssetResult(result) {
  if (typeof result === "string") return { href: result };
  return result;
}
function resolveTransformAssetsCrossOrigin(config, kind) {
  if (!config) return void 0;
  if (typeof config === "string") return config;
  return config[kind];
}
function isObjectShorthand(transform) {
  return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
  if (typeof transform === "string") {
    const prefix = transform;
    return {
      type: "transform",
      transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
      cache: true
    };
  }
  if (typeof transform === "function") return {
    type: "transform",
    transformFn: transform,
    cache: true
  };
  if (isObjectShorthand(transform)) {
    const { prefix, crossOrigin } = transform;
    return {
      type: "transform",
      transformFn: ({ url, kind }) => {
        const href = `${prefix}${url}`;
        if (kind === "clientEntry") return { href };
        const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
        return co ? {
          href,
          crossOrigin: co
        } : { href };
      },
      cache: true
    };
  }
  if ("createTransform" in transform && transform.createTransform) return {
    type: "createTransform",
    createTransform: transform.createTransform,
    cache: transform.cache !== false
  };
  return {
    type: "transform",
    transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
    cache: transform.cache !== false
  };
}
function adaptTransformAssetUrlsToTransformAssets(transformFn) {
  return async ({ url, kind }) => ({ href: await transformFn({
    url,
    type: kind
  }) });
}
function adaptTransformAssetUrlsConfigToTransformAssets(transform) {
  warnDeprecatedTransformAssetUrls();
  if (typeof transform === "string") return transform;
  if (typeof transform === "function") return adaptTransformAssetUrlsToTransformAssets(transform);
  if ("createTransform" in transform && transform.createTransform) return {
    createTransform: async (ctx) => adaptTransformAssetUrlsToTransformAssets(await transform.createTransform(ctx)),
    cache: transform.cache,
    warmup: transform.warmup
  };
  return {
    transform: typeof transform.transform === "string" ? transform.transform : adaptTransformAssetUrlsToTransformAssets(transform.transform),
    cache: transform.cache,
    warmup: transform.warmup
  };
}
function buildClientEntryScriptTag(clientEntry, injectedHeadScripts) {
  let script = `import(${JSON.stringify(clientEntry)})`;
  if (injectedHeadScripts) script = `${injectedHeadScripts};${script}`;
  return {
    tag: "script",
    attrs: {
      type: "module",
      async: true
    },
    children: script
  };
}
function assignManifestAssetLink(link, next) {
  if (typeof link === "string") return next.crossOrigin ? next : next.href;
  return next.crossOrigin ? next : { href: next.href };
}
async function transformManifestAssets(source, transformFn, _opts) {
  const manifest2 = structuredClone(source.manifest);
  for (const route of Object.values(manifest2.routes)) {
    if (route.preloads) route.preloads = await Promise.all(route.preloads.map(async (link) => {
      const result = normalizeTransformAssetResult(await transformFn({
        url: resolveManifestAssetLink(link).href,
        kind: "modulepreload"
      }));
      return assignManifestAssetLink(link, {
        href: result.href,
        crossOrigin: result.crossOrigin
      });
    }));
    if (route.assets && !source.manifest.inlineCss) {
      for (const asset of route.assets) if (asset.tag === "link" && asset.attrs?.href) {
        const rel = asset.attrs.rel;
        if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) continue;
        const result = normalizeTransformAssetResult(await transformFn({
          url: asset.attrs.href,
          kind: "stylesheet"
        }));
        asset.attrs.href = result.href;
        if (result.crossOrigin) asset.attrs.crossOrigin = result.crossOrigin;
        else delete asset.attrs.crossOrigin;
      }
    }
  }
  const transformedClientEntry = normalizeTransformAssetResult(await transformFn({
    url: source.clientEntry,
    kind: "clientEntry"
  }));
  const rootRoute = manifest2.routes[rootRouteId] = manifest2.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  rootRoute.assets.push(buildClientEntryScriptTag(transformedClientEntry.href, source.injectedHeadScripts));
  return manifest2;
}
function buildManifestWithClientEntry(source) {
  const scriptTag = buildClientEntryScriptTag(source.clientEntry, source.injectedHeadScripts);
  const baseRootRoute = source.manifest.routes[rootRouteId];
  const routes = {
    ...source.manifest.routes,
    [rootRouteId]: {
      ...baseRootRoute,
      assets: [...baseRootRoute?.assets || [], scriptTag]
    }
  };
  return {
    inlineCss: source.manifest.inlineCss,
    routes
  };
}
var LINK_PARAM_TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
var PRELOAD_AS_VALUES = /* @__PURE__ */ new Set([
  "fetch",
  "font",
  "image",
  "script",
  "style",
  "track"
]);
function buildLinkParam(name, value) {
  if (value === void 0) return name;
  if (LINK_PARAM_TOKEN_RE.test(value)) return `${name}=${value}`;
  return `${name}=${JSON.stringify(value)}`;
}
function serializeEarlyHint(hint) {
  const parts = [`<${hint.href}>`, buildLinkParam("rel", hint.rel)];
  if (hint.as) parts.push(buildLinkParam("as", hint.as));
  if (hint.crossOrigin !== void 0) parts.push(buildLinkParam("crossorigin", hint.crossOrigin || void 0));
  if (hint.type) parts.push(buildLinkParam("type", hint.type));
  if (hint.integrity) parts.push(buildLinkParam("integrity", hint.integrity));
  if (hint.referrerPolicy) parts.push(buildLinkParam("referrerpolicy", hint.referrerPolicy));
  if (hint.fetchPriority) parts.push(buildLinkParam("fetchpriority", hint.fetchPriority));
  return parts.join("; ");
}
function getStringAttr(attrs, name, fallbackName) {
  const value = attrs?.[name] ?? (fallbackName ? attrs?.[fallbackName] : void 0);
  return typeof value === "string" ? value : void 0;
}
function getPreloadAs(attrs) {
  const as = getStringAttr(attrs, "as");
  return as && PRELOAD_AS_VALUES.has(as) ? as : void 0;
}
function addEarlyHintFetchAttrs(hint, attrs) {
  const crossOrigin = getStringAttr(attrs, "crossOrigin", "crossorigin");
  const type = getStringAttr(attrs, "type");
  const integrity = getStringAttr(attrs, "integrity");
  const referrerPolicy = getStringAttr(attrs, "referrerPolicy", "referrerpolicy");
  const fetchPriority = getStringAttr(attrs, "fetchPriority", "fetchpriority");
  if (crossOrigin !== void 0) hint.crossOrigin = crossOrigin;
  if (type) hint.type = type;
  if (integrity) hint.integrity = integrity;
  if (referrerPolicy) hint.referrerPolicy = referrerPolicy;
  if (fetchPriority) hint.fetchPriority = fetchPriority;
}
function linkAttrsToEarlyHint(attrs) {
  const href = getStringAttr(attrs, "href");
  const rel = getStringAttr(attrs, "rel");
  if (!href || !rel) return void 0;
  const relTokens = rel.split(/\s+/);
  let hintRel;
  let hintAs;
  if (relTokens.includes("modulepreload")) {
    hintRel = "modulepreload";
    hintAs = "script";
  } else if (relTokens.includes("stylesheet")) {
    hintRel = "preload";
    hintAs = "style";
  } else if (relTokens.includes("preload")) {
    hintAs = getPreloadAs(attrs);
    if (!hintAs) return void 0;
    hintRel = "preload";
  } else if (relTokens.includes("preconnect")) {
    hintRel = "preconnect";
    hintAs = void 0;
  } else if (relTokens.includes("dns-prefetch")) {
    hintRel = "dns-prefetch";
    hintAs = void 0;
  }
  if (!hintRel) return void 0;
  const hint = {
    href,
    rel: hintRel
  };
  if (hintAs) hint.as = hintAs;
  addEarlyHintFetchAttrs(hint, attrs);
  return hint;
}
function collectStaticHintsFromManifest(manifest2, matchedRoutes) {
  const hints = [];
  for (const route of matchedRoutes) {
    const routeManifest = manifest2.routes[route.id];
    if (!routeManifest) continue;
    for (const link of routeManifest.preloads ?? []) {
      const { href, crossOrigin } = resolveManifestAssetLink(link);
      const hint = {
        href,
        rel: "modulepreload",
        as: "script"
      };
      if (crossOrigin !== void 0) hint.crossOrigin = crossOrigin;
      hints.push(hint);
    }
    for (const asset of routeManifest.assets ?? []) {
      if (asset.tag !== "link") continue;
      const stylesheetHref = getStylesheetHref(asset);
      if (stylesheetHref) {
        if (manifest2.inlineCss?.styles[stylesheetHref] !== void 0) continue;
        const hint2 = {
          href: stylesheetHref,
          rel: "preload",
          as: "style"
        };
        addEarlyHintFetchAttrs(hint2, asset.attrs);
        hints.push(hint2);
        continue;
      }
      const hint = linkAttrsToEarlyHint(asset.attrs);
      if (hint) hints.push(hint);
    }
  }
  return hints;
}
function collectDynamicHintsFromMatches(matches) {
  const hints = [];
  for (const match of matches) {
    const links = match.links;
    if (!Array.isArray(links)) continue;
    for (const link of links) {
      const hint = linkAttrsToEarlyHint(link);
      if (hint) hints.push(hint);
    }
  }
  return hints;
}
function createEarlyHintsEvent(opts) {
  const nextHints = [];
  const nextLinks = [];
  for (const hint of opts.hints) {
    const link = serializeEarlyHint(hint);
    if (opts.sentLinks.has(link)) continue;
    opts.sentLinks.add(link);
    opts.sentHints.push(hint);
    nextHints.push(hint);
    nextLinks.push(link);
  }
  if (!nextHints.length && opts.phase !== "dynamic") return void 0;
  return {
    phase: opts.phase,
    hints: nextHints,
    links: nextLinks,
    allHints: opts.sentHints.slice(),
    allLinks: Array.from(opts.sentLinks)
  };
}
function createResponseLinkHeaderEntries(opts) {
  for (const hint of opts.hints) {
    const link = serializeEarlyHint(hint);
    if (opts.sentLinks.has(link)) continue;
    opts.sentLinks.add(link);
    opts.entries.push({
      phase: opts.phase,
      hint,
      link
    });
  }
}
function getResponseLinkHeaderEntries(opts) {
  if (!opts.filter) return opts.entries.map((entry) => entry.link);
  try {
    const links = [];
    for (const entry of opts.entries) if (opts.filter(entry)) links.push(entry.link);
    return links;
  } catch (err) {
    console.error("Error filtering response Link headers:", err);
    return [];
  }
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
  key: "$TSS/serverfn",
  test: (v) => {
    if (typeof v !== "function") return false;
    if (!(TSS_SERVER_FUNCTION in v)) return false;
    return !!v[TSS_SERVER_FUNCTION];
  },
  toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
  fromSerializable: ({ functionId }) => {
    const fn = async (opts, signal) => {
      return (await (await getServerFnById(functionId))(opts ?? {}, signal)).result;
    };
    return fn;
  }
});
var tsrScript_default = "self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]}";
const SCOPE_ID = "tsr";
const TSR_PREFIX = GLOBAL_TSR + ".router=";
const P_PREFIX = GLOBAL_TSR + ".p(()=>";
const P_SUFFIX = ")";
function dehydrateMatch(match) {
  const dehydratedMatch = {
    i: dehydrateSsrMatchId(match.id),
    u: match.updatedAt,
    s: match.status
  };
  for (const [key, shorthand] of [
    ["__beforeLoadContext", "b"],
    ["loaderData", "l"],
    ["error", "e"],
    ["ssr", "ssr"]
  ]) if (match[key] !== void 0) dehydratedMatch[shorthand] = match[key];
  if (match.globalNotFound) dehydratedMatch.g = true;
  return dehydratedMatch;
}
const INITIAL_SCRIPTS = [getCrossReferenceHeader(SCOPE_ID), tsrScript_default];
var ScriptBuffer = class {
  constructor(router) {
    this._scriptBarrierLifted = false;
    this._cleanedUp = false;
    this._pendingMicrotask = false;
    this.router = router;
    this._queue = INITIAL_SCRIPTS.slice();
  }
  enqueue(script) {
    if (this._cleanedUp) return;
    this._queue.push(script);
    if (this._scriptBarrierLifted && !this._pendingMicrotask) {
      this._pendingMicrotask = true;
      queueMicrotask(() => {
        this._pendingMicrotask = false;
        this.injectBufferedScripts();
      });
    }
  }
  liftBarrier() {
    if (this._scriptBarrierLifted || this._cleanedUp) return;
    this._scriptBarrierLifted = true;
    if (this._queue.length > 0 && !this._pendingMicrotask) {
      this._pendingMicrotask = true;
      queueMicrotask(() => {
        this._pendingMicrotask = false;
        this.injectBufferedScripts();
      });
    }
  }
  /**
  * Flushes any pending scripts synchronously.
  * Call this before emitting onSerializationFinished to ensure all scripts are injected.
  *
  * IMPORTANT: Only injects if the barrier has been lifted. Before the barrier is lifted,
  * scripts should remain in the queue so takeBufferedScripts() can retrieve them
  */
  flush() {
    if (!this._scriptBarrierLifted) return;
    if (this._cleanedUp) return;
    this._pendingMicrotask = false;
    const scriptsToInject = this.takeAll();
    if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
  }
  takeAll() {
    const bufferedScripts = this._queue;
    this._queue = [];
    if (bufferedScripts.length === 0) return;
    if (bufferedScripts.length === 1) return bufferedScripts[0] + ";document.currentScript.remove()";
    return bufferedScripts.join(";") + ";document.currentScript.remove()";
  }
  injectBufferedScripts() {
    if (this._cleanedUp) return;
    if (this._queue.length === 0) return;
    const scriptsToInject = this.takeAll();
    if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
  }
  cleanup() {
    this._cleanedUp = true;
    this._queue = [];
    this.router = void 0;
  }
};
function getInlineCssHrefsForMatches(manifest2, matches) {
  const styles = manifest2?.inlineCss?.styles;
  if (!styles) return [];
  const seen = /* @__PURE__ */ new Set();
  const hrefs = [];
  for (const match of matches) {
    const assets = manifest2?.routes[match.routeId]?.assets ?? [];
    for (const asset of assets) {
      const href = getStylesheetHref(asset);
      if (!href || seen.has(href) || styles[href] === void 0) continue;
      seen.add(href);
      hrefs.push(href);
    }
  }
  return hrefs;
}
function getInlineCssForHrefs(manifest2, hrefs) {
  const styles = manifest2.inlineCss?.styles;
  if (!styles || hrefs.length === 0) return void 0;
  hrefs.join("\0");
  const css = hrefs.map((href) => styles[href]).join("");
  return css;
}
function getInlineCssAssetForMatches(manifest2, matches) {
  if (!manifest2?.inlineCss) return void 0;
  const css = getInlineCssForHrefs(manifest2, getInlineCssHrefsForMatches(manifest2, matches));
  return css === void 0 ? void 0 : createInlineCssStyleAsset(css);
}
function stripInlinedStylesheetAssets(manifest2, routes, matches) {
  if (!manifest2.inlineCss) return routes;
  const nextRoutes = {};
  for (const [routeId, route] of Object.entries(routes)) {
    const assets = route.assets?.filter((asset) => !isInlinableStylesheet(manifest2, asset));
    const nextRoute = { ...route };
    if (assets) if (assets.length > 0) nextRoute.assets = assets;
    else delete nextRoute.assets;
    nextRoutes[routeId] = nextRoute;
  }
  if (getInlineCssAssetForMatches(manifest2, matches)) {
    const rootRoute = nextRoutes["__root__"] ?? {};
    nextRoutes[rootRouteId] = {
      ...rootRoute,
      assets: [createInlineCssPlaceholderAsset(), ...rootRoute.assets ?? []]
    };
  }
  return nextRoutes;
}
function attachRouterServerSsrUtils({ router, manifest: manifest2, getRequestAssets, includeUnmatchedRouteAssets = true }) {
  router.ssr = { get manifest() {
    const requestAssets = getRequestAssets?.();
    const inlineCssAsset = getInlineCssAssetForMatches(manifest2, router.stores.matches.get());
    if (!requestAssets?.length && !inlineCssAsset) return manifest2;
    return {
      ...manifest2,
      routes: {
        ...manifest2?.routes,
        [rootRouteId]: {
          ...manifest2?.routes?.[rootRouteId],
          assets: [
            ...requestAssets ?? [],
            ...inlineCssAsset ? [inlineCssAsset] : [],
            ...manifest2?.routes?.["__root__"]?.assets ?? []
          ]
        }
      }
    };
  } };
  let _dehydrated = false;
  let _serializationFinished = false;
  const renderFinishedListeners = [];
  const serializationFinishedListeners = [];
  const scriptBuffer = new ScriptBuffer(router);
  let injectedHtmlBuffer = "";
  router.serverSsr = {
    injectHtml: (html) => {
      if (!html) return;
      injectedHtmlBuffer += html;
      router.emit({ type: "onInjectedHtml" });
    },
    injectScript: (script) => {
      if (!script) return;
      const html = `<script${router.options.ssr?.nonce ? ` nonce='${router.options.ssr.nonce}'` : ""}>${script}<\/script>`;
      router.serverSsr.injectHtml(html);
    },
    dehydrate: async (opts) => {
      if (_dehydrated) {
        throw new Error("Invariant failed: router is already dehydrated!");
      }
      let matchesToDehydrate = router.stores.matches.get();
      if (router.isShell()) matchesToDehydrate = matchesToDehydrate.slice(0, 1);
      const matches = matchesToDehydrate.map(dehydrateMatch);
      let manifestToDehydrate = void 0;
      if (manifest2) {
        const currentRouteIdsList = matchesToDehydrate.map((m) => m.routeId);
        `${currentRouteIdsList.join("\0")}\0includeUnmatchedRouteAssets=${includeUnmatchedRouteAssets}`;
        let filteredRoutes;
        if (!filteredRoutes) {
          const currentRouteIds = new Set(currentRouteIdsList);
          const nextFilteredRoutes = {};
          for (const routeId in manifest2.routes) {
            const routeManifest = manifest2.routes[routeId];
            if (currentRouteIds.has(routeId)) nextFilteredRoutes[routeId] = routeManifest;
            else if (includeUnmatchedRouteAssets && routeManifest.assets && routeManifest.assets.length > 0) nextFilteredRoutes[routeId] = { assets: routeManifest.assets };
          }
          filteredRoutes = stripInlinedStylesheetAssets(manifest2, nextFilteredRoutes, matchesToDehydrate);
        }
        manifestToDehydrate = { routes: { ...filteredRoutes } };
        if (opts?.requestAssets?.length) {
          const existingRoot = manifestToDehydrate.routes[rootRouteId];
          manifestToDehydrate.routes[rootRouteId] = {
            ...existingRoot,
            assets: [...opts.requestAssets, ...existingRoot?.assets ?? []]
          };
        }
      }
      const dehydratedRouter = {
        manifest: manifestToDehydrate,
        matches
      };
      const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
      if (lastMatchId) dehydratedRouter.lastMatchId = dehydrateSsrMatchId(lastMatchId);
      const dehydratedData = await router.options.dehydrate?.();
      if (dehydratedData) dehydratedRouter.dehydratedData = dehydratedData;
      _dehydrated = true;
      const trackPlugins = { didRun: false };
      const serializationAdapters = router.options.serializationAdapters;
      const plugins = serializationAdapters ? serializationAdapters.map((t) => /* @__PURE__ */ makeSsrSerovalPlugin(t, trackPlugins)).concat(defaultSerovalPlugins) : defaultSerovalPlugins;
      const signalSerializationComplete = () => {
        _serializationFinished = true;
        try {
          serializationFinishedListeners.forEach((l) => l());
          router.emit({ type: "onSerializationFinished" });
        } catch (err) {
          console.error("Serialization listener error:", err);
        } finally {
          serializationFinishedListeners.length = 0;
          renderFinishedListeners.length = 0;
        }
      };
      crossSerializeStream(dehydratedRouter, {
        refs: /* @__PURE__ */ new Map(),
        plugins,
        onSerialize: (data, initial) => {
          let serialized = initial ? TSR_PREFIX + data : data;
          if (trackPlugins.didRun) serialized = P_PREFIX + serialized + P_SUFFIX;
          scriptBuffer.enqueue(serialized);
        },
        onError: (err) => {
          console.error("Serialization error:", err);
          if (err && err.stack) console.error(err.stack);
          signalSerializationComplete();
        },
        scopeId: SCOPE_ID,
        onDone: () => {
          scriptBuffer.enqueue(GLOBAL_TSR + ".e()");
          scriptBuffer.flush();
          signalSerializationComplete();
        }
      });
    },
    isDehydrated() {
      return _dehydrated;
    },
    isSerializationFinished() {
      return _serializationFinished;
    },
    onRenderFinished: (listener) => renderFinishedListeners.push(listener),
    onSerializationFinished: (listener) => serializationFinishedListeners.push(listener),
    setRenderFinished: () => {
      try {
        renderFinishedListeners.forEach((l) => l());
      } catch (err) {
        console.error("Error in render finished listener:", err);
      } finally {
        renderFinishedListeners.length = 0;
      }
      scriptBuffer.liftBarrier();
    },
    takeBufferedScripts() {
      const scripts = scriptBuffer.takeAll();
      return {
        tag: "script",
        attrs: {
          nonce: router.options.ssr?.nonce,
          className: "$tsr",
          id: TSR_SCRIPT_BARRIER_ID
        },
        children: scripts
      };
    },
    liftScriptBarrier() {
      scriptBuffer.liftBarrier();
    },
    takeBufferedHtml() {
      if (!injectedHtmlBuffer) return;
      const buffered = injectedHtmlBuffer;
      injectedHtmlBuffer = "";
      return buffered;
    },
    cleanup() {
      if (!router.serverSsr) return;
      renderFinishedListeners.length = 0;
      serializationFinishedListeners.length = 0;
      injectedHtmlBuffer = "";
      scriptBuffer.cleanup();
      router.serverSsr = void 0;
    }
  };
}
function getOrigin(request) {
  try {
    return new URL(request.url).origin;
  } catch {
  }
  return "http://localhost";
}
function getNormalizedURL(url, base) {
  if (typeof url === "string") url = url.replace("\\", "%5C");
  const rawUrl = new URL(url, base);
  const { path: decodedPathname, handledProtocolRelativeURL } = decodePath(rawUrl.pathname);
  const searchParams = new URLSearchParams(rawUrl.search);
  const normalizedHref = decodedPathname + (searchParams.size > 0 ? "?" : "") + searchParams.toString() + rawUrl.hash;
  return {
    url: new URL(normalizedHref, rawUrl.origin),
    handledProtocolRelativeURL
  };
}
function getStartResponseHeaders(opts) {
  return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.stores.matches.get().map((match) => {
    return match.headers;
  }));
}
function notifyEarlyHints(phase, event, onEarlyHints) {
  try {
    const result = onEarlyHints(event);
    if (result) Promise.resolve(result).catch((err) => {
      console.error(`Error sending ${phase} early hints:`, err);
    });
  } catch (err) {
    console.error(`Error sending ${phase} early hints:`, err);
  }
}
function getResponseLinkHeaderFilter(responseLinkHeader) {
  if (typeof responseLinkHeader !== "object") return;
  return responseLinkHeader.filter;
}
function appendResponseLinkHeaders(opts) {
  if (!opts.filter) {
    for (const entry of opts.entries) opts.responseHeaders.append("Link", entry.link);
    return;
  }
  const links = getResponseLinkHeaderEntries(opts);
  for (const link of links) opts.responseHeaders.append("Link", link);
}
function collectResponseLinkHeaderEntries(opts) {
  for (let index = 0; index < opts.event.hints.length; index++) opts.entries.push({
    phase: opts.phase,
    hint: opts.event.hints[index],
    link: opts.event.links[index]
  });
}
function handleCollectedEarlyHints(opts) {
  const event = opts.onEarlyHints ? createEarlyHintsEvent({
    phase: opts.phase,
    hints: opts.hints,
    sentLinks: opts.sentLinks,
    sentHints: opts.sentHints
  }) : void 0;
  if (event) notifyEarlyHints(opts.phase, event, opts.onEarlyHints);
  if (!opts.responseLinkHeaderEntries) return;
  if (event) {
    collectResponseLinkHeaderEntries({
      phase: opts.phase,
      event,
      entries: opts.responseLinkHeaderEntries
    });
    return;
  }
  createResponseLinkHeaderEntries({
    phase: opts.phase,
    hints: opts.hints,
    sentLinks: opts.sentLinks,
    entries: opts.responseLinkHeaderEntries
  });
}
var entriesPromise;
var baseManifestPromise;
var cachedFinalManifestPromise;
async function loadEntries() {
  const [routerEntry, startEntry, pluginAdapters] = await Promise.all([
    import("./assets/router-C0Ba-j9F.js").then((n) => n.r),
    import("./assets/start-HYkvq4Ni.js"),
    import("./assets/__23tanstack-start-plugin-adapters-Cwee5PKy.js")
  ]);
  return {
    routerEntry,
    startEntry,
    pluginAdapters
  };
}
function getEntries() {
  if (!entriesPromise) entriesPromise = loadEntries();
  return entriesPromise;
}
function getBaseManifest(matchedRoutes) {
  if (!baseManifestPromise) baseManifestPromise = getStartManifest();
  return baseManifestPromise;
}
async function resolveManifest(matchedRoutes, transformFn, cache) {
  const base = await getBaseManifest();
  const computeFinalManifest = async () => {
    return transformFn ? await transformManifestAssets(base, transformFn) : buildManifestWithClientEntry(base);
  };
  if (!transformFn || cache) {
    if (!cachedFinalManifestPromise) cachedFinalManifestPromise = computeFinalManifest();
    return cachedFinalManifestPromise;
  }
  return computeFinalManifest();
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var ERR_NO_RESPONSE = `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.`;
var ERR_NO_DEFER = `You cannot defer to the app router if there is no component defined on this route.`;
function throwRouteHandlerError() {
  throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
  throw new Error(ERR_NO_DEFER);
}
function isSpecialResponse(value) {
  return value instanceof Response || isRedirect(value);
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) return { response: result };
  return result;
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (nextCtx) => {
    if (nextCtx) {
      if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
      for (const key of Object.keys(nextCtx)) if (key !== "context") ctx[key] = nextCtx[key];
    }
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx;
    let result;
    try {
      result = await middleware({
        ...ctx,
        next
      });
    } catch (err) {
      if (isSpecialResponse(err)) {
        ctx.response = err;
        return ctx;
      }
      throw err;
    }
    const normalized = handleCtxResult(result);
    if (normalized) {
      if (normalized.response !== void 0) ctx.response = normalized.response;
      if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
    }
    return ctx;
  };
  return next();
}
function handlerToMiddleware(handler, mayDefer = false) {
  if (mayDefer) return handler;
  return async (ctx) => {
    const response = await handler({
      ...ctx,
      next: throwIfMayNotDefer
    });
    if (!response) throwRouteHandlerError();
    return response;
  };
}
function createStartHandler(cbOrOptions) {
  const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
  const transformAssetsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssets;
  const transformAssetUrlsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssetUrls;
  const transformOption = transformAssetsOption !== void 0 ? resolveTransformAssetsConfig(transformAssetsOption) : transformAssetUrlsOption !== void 0 ? resolveTransformAssetsConfig(adaptTransformAssetUrlsConfigToTransformAssets(transformAssetUrlsOption)) : void 0;
  const warmupTransformManifest = !!transformAssetsOption && typeof transformAssetsOption === "object" && "warmup" in transformAssetsOption && transformAssetsOption.warmup === true || !!transformAssetUrlsOption && typeof transformAssetUrlsOption === "object" && transformAssetUrlsOption.warmup === true;
  const resolvedTransformConfig = transformOption;
  const cache = resolvedTransformConfig ? resolvedTransformConfig.cache : true;
  const shouldCacheCreateTransform = cache && true;
  let cachedCreateTransformPromise;
  const getTransformFn = async (opts) => {
    if (!resolvedTransformConfig) return void 0;
    if (resolvedTransformConfig.type === "createTransform") {
      if (shouldCacheCreateTransform) {
        if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(resolvedTransformConfig.createTransform(opts)).catch((error) => {
          cachedCreateTransformPromise = void 0;
          throw error;
        });
        return cachedCreateTransformPromise;
      }
      return resolvedTransformConfig.createTransform(opts);
    }
    return resolvedTransformConfig.transformFn;
  };
  if (warmupTransformManifest && cache && true && !cachedFinalManifestPromise) {
    const warmupPromise = (async () => {
      const base = await getBaseManifest();
      const transformFn = await getTransformFn({ warmup: true });
      return transformFn ? await transformManifestAssets(base, transformFn) : buildManifestWithClientEntry(base);
    })();
    cachedFinalManifestPromise = warmupPromise;
    warmupPromise.catch(() => {
      if (cachedFinalManifestPromise === warmupPromise) cachedFinalManifestPromise = void 0;
      cachedCreateTransformPromise = void 0;
    });
  }
  const startRequestResolver = async (request, requestOpts) => {
    let router = null;
    let cbWillCleanup = false;
    try {
      const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
      const href = url.pathname + url.search + url.hash;
      const origin = getOrigin(request);
      if (handledProtocolRelativeURL) return Response.redirect(url, 308);
      const entries = await getEntries();
      const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
      const { hasPluginAdapters, pluginSerializationAdapters } = entries.pluginAdapters;
      const serializationAdapters = [
        ...startOptions.serializationAdapters || [],
        ...hasPluginAdapters ? pluginSerializationAdapters : [],
        ServerFunctionSerializationAdapter
      ];
      const requestStartOptions = {
        ...startOptions,
        serializationAdapters
      };
      const flattenedRequestMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
      const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
      const getRouter = async () => {
        if (router) return router;
        router = await entries.routerEntry.getRouter();
        let isShell = IS_SHELL_ENV;
        if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
        const history = createMemoryHistory({ initialEntries: [href] });
        router.update({
          history,
          isShell,
          isPrerendering: IS_PRERENDERING,
          origin: router.options.origin ?? origin,
          defaultSsr: requestStartOptions.defaultSsr,
          serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
          basepath: ROUTER_BASEPATH
        });
        return router;
      };
      if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
        const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
        if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
        const serverFnHandler = async ({ context }) => {
          return runWithStartContext({
            getRouter,
            startOptions: requestStartOptions,
            contextAfterGlobalMiddlewares: context,
            request,
            executedRequestMiddlewares,
            handlerType: "serverFn"
          }, () => handleServerAction({
            request,
            context: requestOpts?.context,
            serverFnId
          }));
        };
        return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
          request,
          pathname: url.pathname,
          context: createNullProtoObject(requestOpts?.context)
        })).response, request, getRouter);
      }
      const executeRouter = async (serverContext, matchedRoutes) => {
        const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
        if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });
        const manifest2 = await resolveManifest(matchedRoutes, await getTransformFn({
          warmup: false,
          request
        }), cache);
        const onEarlyHints = requestOpts?.onEarlyHints;
        const responseLinkHeader = requestOpts?.responseLinkHeader;
        const shouldCollectEarlyHints = !!onEarlyHints || !!responseLinkHeader;
        const sentEarlyHintLinks = shouldCollectEarlyHints ? /* @__PURE__ */ new Set() : void 0;
        const sentEarlyHints = onEarlyHints ? new Array() : void 0;
        const responseLinkHeaderEntries = shouldCollectEarlyHints && responseLinkHeader ? new Array() : void 0;
        const responseLinkHeaderFilter = shouldCollectEarlyHints ? getResponseLinkHeaderFilter(responseLinkHeader) : void 0;
        if (shouldCollectEarlyHints && sentEarlyHintLinks && matchedRoutes?.length) handleCollectedEarlyHints({
          phase: "static",
          hints: collectStaticHintsFromManifest(manifest2, matchedRoutes),
          sentLinks: sentEarlyHintLinks,
          sentHints: sentEarlyHints,
          onEarlyHints,
          responseLinkHeaderEntries
        });
        const routerInstance = await getRouter();
        attachRouterServerSsrUtils({
          router: routerInstance,
          manifest: manifest2,
          getRequestAssets: () => getStartContext({ throwIfNotFound: false })?.requestAssets,
          includeUnmatchedRouteAssets: false
        });
        routerInstance.update({ additionalContext: { serverContext } });
        await routerInstance.load();
        if (routerInstance.state.redirect) return routerInstance.state.redirect;
        if (shouldCollectEarlyHints && sentEarlyHintLinks) handleCollectedEarlyHints({
          phase: "dynamic",
          hints: collectDynamicHintsFromMatches(routerInstance.stores.matches.get()),
          sentLinks: sentEarlyHintLinks,
          sentHints: sentEarlyHints,
          onEarlyHints,
          responseLinkHeaderEntries
        });
        const ctx = getStartContext({ throwIfNotFound: false });
        await routerInstance.serverSsr.dehydrate({ requestAssets: ctx?.requestAssets });
        const responseHeaders = getStartResponseHeaders({ router: routerInstance });
        if (responseLinkHeaderEntries?.length) appendResponseLinkHeaders({
          responseHeaders,
          entries: responseLinkHeaderEntries,
          filter: responseLinkHeaderFilter
        });
        cbWillCleanup = true;
        return cb({
          request,
          router: routerInstance,
          responseHeaders
        });
      };
      const requestHandlerMiddleware = async ({ context }) => {
        return runWithStartContext({
          getRouter,
          startOptions: requestStartOptions,
          contextAfterGlobalMiddlewares: context,
          request,
          executedRequestMiddlewares,
          handlerType: "router"
        }, async () => {
          try {
            return await handleServerRoutes({
              getRouter,
              request,
              url,
              executeRouter,
              context,
              executedRequestMiddlewares
            });
          } catch (err) {
            if (err instanceof Response) return err;
            throw err;
          }
        });
      };
      return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
        request,
        pathname: url.pathname,
        context: createNullProtoObject(requestOpts?.context)
      })).response, request, getRouter);
    } finally {
      if (router && !cbWillCleanup) router.serverSsr?.cleanup();
      router = null;
    }
  };
  return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
  if (!isRedirect(response)) return response;
  if (isResolvedRedirect(response)) {
    if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
      ...response.options,
      isSerializedRedirect: true
    }, { headers: response.headers });
    return response;
  }
  const opts = response.options;
  if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
  if ([
    "params",
    "search",
    "hash"
  ].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
  const redirect2 = (await getRouter()).resolveRedirect(response);
  if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
    ...response.options,
    isSerializedRedirect: true
  }, { headers: response.headers });
  return redirect2;
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
  const router = await getRouter();
  const pathname = executeRewriteInput(router.rewrite, url).pathname;
  const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
  const isExactMatch = foundRoute && routeParams["**"] === void 0;
  const routeMiddlewares = [];
  for (const route of matchedRoutes) {
    const serverMiddleware = route.options.server?.middleware;
    if (serverMiddleware) {
      const flattened = flattenMiddlewares(serverMiddleware);
      for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
    }
  }
  const server2 = foundRoute?.options.server;
  if (server2?.handlers && isExactMatch) {
    const handlers = typeof server2.handlers === "function" ? server2.handlers({ createHandlers: (d) => d }) : server2.handlers;
    const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
    if (handler) {
      const mayDefer = !!foundRoute.options.component;
      if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
      else {
        if (handler.middleware?.length) {
          const handlerMiddlewares = flattenMiddlewares(handler.middleware);
          for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
        }
        if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
      }
    }
  }
  routeMiddlewares.push((ctx) => executeRouter(ctx.context, matchedRoutes));
  return (await executeMiddleware(routeMiddlewares, {
    request,
    context,
    params: routeParams,
    pathname
  })).response;
}
const fetch$1 = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    }
  };
}
const server = createServerEntry({ fetch: fetch$1 });
export {
  TSS_SERVER_FUNCTION as T,
  getCookie as a,
  getServerFnById as b,
  createServerFn as c,
  createServerEntry,
  server as default,
  getRequest as g,
  setCookie$1 as s
};
