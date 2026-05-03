import { jsxDEV } from "react/jsx-dev-runtime";
import * as React from "react";
import { c as cn } from "./router-C0Ba-j9F.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxDEV(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      },
      void 0,
      false,
      {
        fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/input.tsx",
        lineNumber: 11,
        columnNumber: 7
      },
      void 0
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/label.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  void 0
));
Label.displayName = LabelPrimitive.Root.displayName;
export {
  Input as I,
  Label as L
};
