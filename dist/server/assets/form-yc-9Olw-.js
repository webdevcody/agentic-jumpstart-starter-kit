import { jsxDEV } from "react/jsx-dev-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, Controller, useFormContext, useFormState } from "react-hook-form";
import { c as cn } from "./router-C0Ba-j9F.js";
import { L as Label } from "./label-CQqL9aP-.js";
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxDEV(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxDEV(Controller, { ...props }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsxDEV(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
      lineNumber: 79,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
    lineNumber: 78,
    columnNumber: 5
  }, this);
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxDEV(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
      lineNumber: 95,
      columnNumber: 5
    },
    this
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxDEV(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    },
    void 0,
    false,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
      lineNumber: 110,
      columnNumber: 5
    },
    this
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV(
    "p",
    {
      className: `shake text-xs text-destructive flex items-center gap-1 animate-fadeIn ${className ?? ""}`,
      "data-slot": "form-message",
      id: formMessageId,
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex w-4 h-4 rounded-full bg-destructive/10 items-center justify-center text-destructive text-xs", children: "!" }, void 0, false, {
          fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
          lineNumber: 152,
          columnNumber: 7
        }, this),
        body
      ]
    },
    void 0,
    true,
    {
      fileName: "/Users/webdevcody/Workspace/AgentSystemLabs/launch-kit/src/components/ui/form.tsx",
      lineNumber: 146,
      columnNumber: 5
    },
    this
  );
}
export {
  Form as F,
  FormField as a,
  FormItem as b,
  FormLabel as c,
  FormControl as d,
  FormMessage as e
};
