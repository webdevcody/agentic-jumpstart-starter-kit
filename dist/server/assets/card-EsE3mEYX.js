import { jsxDEV } from "react/jsx-dev-runtime";
import * as React from "react";
import { c as cn } from "./router-C0Ba-j9F.js";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
    lineNumber: 9,
    columnNumber: 3
  },
  void 0
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
    lineNumber: 24,
    columnNumber: 3
  },
  void 0
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
    lineNumber: 36,
    columnNumber: 3
  },
  void 0
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
    lineNumber: 51,
    columnNumber: 3
  },
  void 0
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, false, {
  fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
  lineNumber: 63,
  columnNumber: 3
}, void 0));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/card.tsx",
    lineNumber: 71,
    columnNumber: 3
  },
  void 0
));
CardFooter.displayName = "CardFooter";
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardDescription as c,
  CardContent as d
};
