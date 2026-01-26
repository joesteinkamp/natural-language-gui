'use strict';

var React13 = require('react');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var SwitchPrimitives = require('@radix-ui/react-switch');
var TogglePrimitive = require('@radix-ui/react-toggle');
var ToggleGroupPrimitive = require('@radix-ui/react-toggle-group');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
var lucideReact = require('lucide-react');
var SelectPrimitive = require('@radix-ui/react-select');
var reactDayPicker = require('react-day-picker');
var PopoverPrimitive = require('@radix-ui/react-popover');
var DialogPrimitive = require('@radix-ui/react-dialog');
var cmdk = require('cmdk');
var dateFns = require('date-fns');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React13__namespace = /*#__PURE__*/_interopNamespace(React13);
var SwitchPrimitives__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitives);
var TogglePrimitive__namespace = /*#__PURE__*/_interopNamespace(TogglePrimitive);
var ToggleGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(ToggleGroupPrimitive);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);
var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React13__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size, asChild = false, label } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild", "label"]);
    const Comp = asChild ? reactSlot.Slot : "button";
    return /* @__PURE__ */ jsxRuntime.jsx(
      Comp,
      __spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        "data-label": label
      }, props)
    );
  }
);
Button.displayName = "Button";
var Input = React13__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type, label, id } = _b, props = __objRest(_b, ["className", "type", "label", "id"]);
    const generatedId = React13__namespace.useId();
    const componentId = id || generatedId;
    const input = /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      __spreadValues({
        type,
        id: componentId,
        className: cn(
          "flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-200",
          className
        ),
        ref
      }, props)
    );
    if (label) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid w-full gap-1.5", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", htmlFor: componentId, children: label }),
        input
      ] });
    }
    return input;
  }
);
Input.displayName = "Input";
var Textarea = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, label, id } = _b, props = __objRest(_b, ["className", "label", "id"]);
  const generatedId = React13__namespace.useId();
  const componentId = id || generatedId;
  const textarea = /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    __spreadProps(__spreadValues({
      id: componentId,
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-base ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-200",
        className
      ),
      ref
    }, props), {
      "nli-markdown": label
    })
  );
  if (label) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid w-full gap-1.5", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", htmlFor: componentId, children: label }),
      textarea
    ] });
  }
  return textarea;
});
Textarea.displayName = "Textarea";
var Switch = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SwitchPrimitives__namespace.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )
    }, props), {
      ref,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        SwitchPrimitives__namespace.Thumb,
        {
          className: cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    })
  );
});
Switch.displayName = SwitchPrimitives__namespace.Root.displayName;
var toggleVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Toggle = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, variant, size } = _b, props = __objRest(_b, ["className", "variant", "size"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TogglePrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(toggleVariants({ variant, size, className }))
    }, props), {
      children: props.children
    })
  );
});
Toggle.displayName = TogglePrimitive__namespace.Root.displayName;
var ToggleGroupContext = React13__namespace.createContext({
  size: "default",
  variant: "default"
});
var ToggleGroup = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, variant, size, children } = _b, props = __objRest(_b, ["className", "variant", "size", "children"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToggleGroupPrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn("flex items-center justify-center gap-1", className)
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    })
  );
});
ToggleGroup.displayName = ToggleGroupPrimitive__namespace.Root.displayName;
var ToggleGroupItem = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children, variant, size } = _b, props = __objRest(_b, ["className", "children", "variant", "size"]);
  const context = React13__namespace.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToggleGroupPrimitive__namespace.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )
    }, props), {
      children
    })
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive__namespace.Item.displayName;
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded$T = ["color"];
var CheckIcon = /* @__PURE__ */ React13.forwardRef(function(_ref, forwardedRef) {
  var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$T);
  return React13.createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), React13.createElement("path", {
    d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
var _excluded$1r = ["color"];
var Cross2Icon = /* @__PURE__ */ React13.forwardRef(function(_ref, forwardedRef) {
  var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1r);
  return React13.createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), React13.createElement("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
var Checkbox = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CheckboxPrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(
        CheckboxPrimitive__namespace.Indicator,
        {
          className: cn("flex items-center justify-center text-current"),
          children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon, { className: "h-4 w-4" })
        }
      )
    })
  );
});
Checkbox.displayName = CheckboxPrimitive__namespace.Root.displayName;
var CheckboxGroupContext = React13__namespace.createContext(void 0);
var CheckboxGroup = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, value, defaultValue, onValueChange, children } = _b, props = __objRest(_b, ["className", "value", "defaultValue", "onValueChange", "children"]);
  const [internalValue, setInternalValue] = React13__namespace.useState(defaultValue || []);
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const handleValueChange = React13__namespace.useCallback(
    (newValue) => {
      if (!controlled) {
        setInternalValue(newValue);
      }
      onValueChange == null ? void 0 : onValueChange(newValue);
    },
    [controlled, onValueChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    CheckboxGroupContext.Provider,
    {
      value: {
        value: currentValue,
        onValueChange: handleValueChange
      },
      children: /* @__PURE__ */ jsxRuntime.jsx("div", __spreadProps(__spreadValues({ className: cn("grid gap-2", className), ref }, props), { children }))
    }
  );
});
CheckboxGroup.displayName = "CheckboxGroup";
var CheckboxGroupItem = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, value } = _b, props = __objRest(_b, ["className", "value"]);
  const context = React13__namespace.useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error("CheckboxGroupItem must be used within a CheckboxGroup");
  }
  const checked = context.value.includes(value);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Checkbox,
    __spreadValues({
      ref,
      className,
      checked,
      onCheckedChange: (checked2) => {
        if (checked2) {
          context.onValueChange([...context.value, value]);
        } else {
          context.onValueChange(context.value.filter((item) => item !== value));
        }
      }
    }, props)
  );
});
CheckboxGroupItem.displayName = "CheckboxGroupItem";
var RadioGroup = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      className: cn("grid gap-2", className)
    }, props), {
      ref
    })
  );
});
RadioGroup.displayName = RadioGroupPrimitive__namespace.Root.displayName;
var RadioGroupItem = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(RadioGroupPrimitive__namespace.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    })
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive__namespace.Item.displayName;
var Select = SelectPrimitive__namespace.Root;
var SelectGroup = SelectPrimitive__namespace.Group;
var SelectValue = SelectPrimitive__namespace.Value;
var SelectTrigger = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Trigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive__namespace.Trigger.displayName;
var SelectScrollUpButton = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollUpButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { className: "h-4 w-4" })
    })
  );
});
SelectScrollUpButton.displayName = SelectPrimitive__namespace.ScrollUpButton.displayName;
var SelectScrollDownButton = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollDownButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4" })
    })
  );
});
SelectScrollDownButton.displayName = SelectPrimitive__namespace.ScrollDownButton.displayName;
var SelectContent = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Content,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position
    }, props), {
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          SelectPrimitive__namespace.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive__namespace.Content.displayName;
var SelectLabel = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Label,
    __spreadValues({
      ref,
      className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
    }, props)
  );
});
SelectLabel.displayName = SelectPrimitive__namespace.Label.displayName;
var SelectItem = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive__namespace.Item.displayName;
var SelectSeparator = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive__namespace.Separator.displayName;
function Calendar(_a) {
  var _b = _a, {
    className,
    classNames,
    showOutsideDays = true
  } = _b, props = __objRest(_b, [
    "className",
    "classNames",
    "showOutsideDays"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactDayPicker.DayPicker,
    __spreadValues({
      showOutsideDays,
      className: cn("p-3 w-fit", className),
      classNames: __spreadValues({
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 relative",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center absolute start-0 end-0 justify-between p-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible"
      }, classNames),
      components: {
        Chevron: ({ orientation }) => {
          const Icon2 = orientation === "left" ? lucideReact.ChevronLeft : lucideReact.ChevronRight;
          return /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "h-4 w-4" });
        }
      }
    }, props)
  );
}
Calendar.displayName = "Calendar";
var Popover = PopoverPrimitive__namespace.Root;
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverContent = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, align = "center", sideOffset = 4 } = _b, props = __objRest(_b, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    PopoverPrimitive__namespace.Content,
    __spreadValues({
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
});
PopoverContent.displayName = PopoverPrimitive__namespace.Content.displayName;
var Dialog = DialogPrimitive__namespace.Root;
var DialogTrigger = DialogPrimitive__namespace.Trigger;
var DialogPortal = DialogPrimitive__namespace.Portal;
var DialogClose = DialogPrimitive__namespace.Close;
var DialogOverlay = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = DialogPrimitive__namespace.Overlay.displayName;
var DialogContent = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Cross2Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DialogContent.displayName = DialogPrimitive__namespace.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = DialogPrimitive__namespace.Title.displayName;
var DialogDescription = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive__namespace.Description.displayName;
function ComboBox({
  options,
  value = [],
  onChange,
  label,
  placeholder = "Select options...",
  "nli-markdown": nliMarkdown
}) {
  const [open, setOpen] = React13__namespace.useState(false);
  const [selectedValues, setSelectedValues] = React13__namespace.useState(value);
  const triggerRef = React13__namespace.useRef(null);
  React13__namespace.useEffect(() => {
    setSelectedValues(value);
  }, [value]);
  const handleSelect = (currentValue) => {
    let newValues;
    if (selectedValues.includes(currentValue)) {
      newValues = selectedValues.filter((v) => v !== currentValue);
    } else {
      newValues = [...selectedValues, currentValue];
    }
    setSelectedValues(newValues);
    onChange == null ? void 0 : onChange(newValues);
    if (triggerRef.current) {
      setTimeout(() => {
        var _a;
        (_a = triggerRef.current) == null ? void 0 : _a.dispatchEvent(new Event("input", { bubbles: true }));
      }, 0);
    }
  };
  const selectedLabels = options.filter((opt) => selectedValues.includes(opt.value)).map((opt) => opt.label);
  const displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
  return /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      Button,
      {
        ref: triggerRef,
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: "w-full justify-between",
        "nli-group-label": nliMarkdown || label,
        "data-value": selectedValues.join(","),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: displayValue }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "hidden", children: selectedLabels.map((l) => /* @__PURE__ */ jsxRuntime.jsx("span", { "nli-markdown": l }, l)) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0", align: "start", children: /* @__PURE__ */ jsxRuntime.jsxs(Command, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CommandInput, { placeholder: `Search ${(label == null ? void 0 : label.toLowerCase()) || "options"}...` }),
      /* @__PURE__ */ jsxRuntime.jsxs(CommandList, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CommandEmpty, { children: "No options found." }),
        /* @__PURE__ */ jsxRuntime.jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsxs(
          CommandItem,
          {
            value: option.value,
            onSelect: handleSelect,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                lucideReact.Check,
                {
                  className: cn(
                    "mr-2 h-4 w-4",
                    selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                  )
                }
              ),
              option.label
            ]
          },
          option.value
        )) })
      ] })
    ] }) })
  ] });
}
var Command = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command,
    __spreadValues({
      ref,
      className: cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )
    }, props)
  );
});
Command.displayName = cmdk.Command.displayName;
var CommandInput = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      cmdk.Command.Input,
      __spreadValues({
        ref,
        className: cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )
      }, props)
    )
  ] });
});
CommandInput.displayName = cmdk.Command.Input.displayName;
var CommandList = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.List,
    __spreadValues({
      ref,
      className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)
    }, props)
  );
});
CommandList.displayName = cmdk.Command.List.displayName;
var CommandEmpty = React13__namespace.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  cmdk.Command.Empty,
  __spreadValues({
    ref,
    className: "py-6 text-center text-sm"
  }, props)
));
CommandEmpty.displayName = cmdk.Command.Empty.displayName;
var CommandGroup = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Group,
    __spreadValues({
      ref,
      className: cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )
    }, props)
  );
});
CommandGroup.displayName = cmdk.Command.Group.displayName;
var CommandItem = React13__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )
    }, props)
  );
});
CommandItem.displayName = cmdk.Command.Item.displayName;
function ResizablePane({
  left,
  right,
  initialSplit = 50,
  minWidth = 200,
  storageKey = "resizable-pane-split",
  className,
  orientation = "horizontal"
}) {
  const containerRef = React13__namespace.useRef(null);
  const [isDragging, setIsDragging] = React13__namespace.useState(false);
  const [split, setSplit] = React13__namespace.useState(initialSplit);
  const [isLoaded, setIsLoaded] = React13__namespace.useState(false);
  React13__namespace.useEffect(() => {
    if (typeof window !== "undefined" && storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed > 0 && parsed < 100) {
          setSplit(parsed);
        }
      }
    }
    setIsLoaded(true);
  }, [storageKey]);
  React13__namespace.useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && storageKey) {
      localStorage.setItem(storageKey, split.toString());
    }
  }, [split, storageKey, isLoaded]);
  const handleMouseMove = React13__namespace.useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      let newSplit;
      if (orientation === "horizontal") {
        const offsetX = e.clientX - rect.left;
        newSplit = offsetX / rect.width * 100;
      } else {
        const offsetY = e.clientY - rect.top;
        newSplit = offsetY / rect.height * 100;
      }
      const dimension = orientation === "horizontal" ? rect.width : rect.height;
      const minPercent = minWidth / dimension * 100;
      const maxPercent = 100 - minPercent;
      newSplit = Math.max(minPercent, Math.min(maxPercent, newSplit));
      setSplit(newSplit);
    },
    [isDragging, minWidth, orientation]
  );
  const handleMouseUp = React13__namespace.useCallback(() => {
    setIsDragging(false);
  }, []);
  React13__namespace.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = orientation === "horizontal" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, orientation]);
  const handleDividerMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const isHorizontal = orientation === "horizontal";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "flex w-full h-full",
        isHorizontal ? "flex-row" : "flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "overflow-auto",
            style: {
              [isHorizontal ? "width" : "height"]: `${split}%`,
              minWidth: isHorizontal ? minWidth : void 0,
              minHeight: !isHorizontal ? minWidth : void 0
            },
            children: left
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "bg-slate-800 hover:bg-slate-700 transition-colors flex-shrink-0 group",
              isHorizontal ? "w-1 cursor-col-resize hover:w-1.5" : "h-1 cursor-row-resize hover:h-1.5",
              isDragging && (isHorizontal ? "bg-blue-500" : "bg-blue-500")
            ),
            onMouseDown: handleDividerMouseDown,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: cn(
                  "flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                  isHorizontal ? "h-full" : "w-full"
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: cn(
                      "bg-slate-600 rounded-full",
                      isHorizontal ? "w-1 h-8" : "w-8 h-1"
                    )
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "overflow-auto flex-1",
            style: {
              minWidth: isHorizontal ? minWidth : void 0,
              minHeight: !isHorizontal ? minWidth : void 0
            },
            children: right
          }
        )
      ]
    }
  );
}

// src/parser/tokenizer.ts
var PATTERNS = {
  // *Label:* value or *Label [type]:* value
  FIELD: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(.+)$/,
  // *Label:* yes/no or *Label [type]:* yes/no
  BOOLEAN: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(yes|no)$/,
  // *Label:* or *Label [type]:*
  GROUP_HEADER: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s*$/,
  // [x] item or [ ] item (checkbox-style with state)
  CHECKBOX_ITEM: /^(\[[ xX]\])\s+(.+)$/,
  // - item text or - *Item:* value or - *Item:* yes/no (legacy support)
  GROUP_ITEM: /^-\s(.+)$/,
  // [Action] or [Action] [Another] (must have content and no space after [)
  BUTTON: /^\[[^\s\]].+\]$/,
  // Blank line
  BLANK: /^\s*$/
};
function classifyLine(line, lineNumber) {
  var _a, _b, _c;
  const trimmed = line.trim();
  if (PATTERNS.BLANK.test(trimmed)) {
    return {
      type: "BLANK",
      line: trimmed,
      lineNumber
    };
  }
  const checkboxItemMatch = trimmed.match(PATTERNS.CHECKBOX_ITEM);
  if (checkboxItemMatch) {
    const checkboxState = checkboxItemMatch[1].trim();
    const isChecked = checkboxState === "[x]" || checkboxState === "[X]";
    const label = checkboxItemMatch[2].trim();
    return {
      type: "CHECKBOX",
      line: trimmed,
      lineNumber,
      label,
      value: isChecked ? "true" : "false"
    };
  }
  if (PATTERNS.BUTTON.test(trimmed)) {
    return {
      type: "BUTTON",
      line: trimmed,
      lineNumber,
      value: trimmed
      // Store full button text including brackets
    };
  }
  const booleanMatch = trimmed.match(PATTERNS.BOOLEAN);
  if (booleanMatch) {
    return {
      type: "FIELD",
      line: trimmed,
      lineNumber,
      label: booleanMatch[1].trim(),
      value: booleanMatch[3],
      // 'yes' or 'no'
      explicitType: (_a = booleanMatch[2]) == null ? void 0 : _a.trim().toLowerCase()
    };
  }
  const fieldMatch = trimmed.match(PATTERNS.FIELD);
  if (fieldMatch) {
    return {
      type: "FIELD",
      line: trimmed,
      lineNumber,
      label: fieldMatch[1].trim(),
      value: fieldMatch[3],
      explicitType: (_b = fieldMatch[2]) == null ? void 0 : _b.trim().toLowerCase()
    };
  }
  const headerMatch = trimmed.match(PATTERNS.GROUP_HEADER);
  if (headerMatch) {
    return {
      type: "GROUP_HEADER",
      line: trimmed,
      lineNumber,
      label: headerMatch[1].trim(),
      explicitType: (_c = headerMatch[2]) == null ? void 0 : _c.trim().toLowerCase()
    };
  }
  const itemMatch = trimmed.match(PATTERNS.GROUP_ITEM);
  if (itemMatch) {
    const itemText = itemMatch[1];
    const itemFieldMatch = itemText.match(/^\*([^*]+)\*:\s+(.+)$/);
    if (itemFieldMatch) {
      return {
        type: "GROUP_ITEM",
        line: trimmed,
        lineNumber,
        label: itemFieldMatch[1].trim(),
        value: itemFieldMatch[2]
      };
    }
    return {
      type: "GROUP_ITEM",
      line: trimmed,
      lineNumber,
      value: itemText.trim()
    };
  }
  return {
    type: "UNKNOWN",
    line: trimmed,
    lineNumber
  };
}
function tokenize(markdown) {
  const lines = markdown.split("\n");
  const tokens = [];
  for (let i = 0; i < lines.length; i++) {
    const token = classifyLine(lines[i], i + 1);
    tokens.push(token);
  }
  return tokens;
}
function filterBlanks(tokens) {
  return tokens.filter((token) => token.type !== "BLANK");
}
function getUnknownTokens(tokens) {
  return tokens.filter((token) => token.type === "UNKNOWN");
}

// src/parser/inference.ts
var DATE_PATTERNS = {
  // MMMM dd, yyyy (e.g., "January 15, 2024")
  LONG_FORMAT: /^[A-Z][a-z]+\s+\d{1,2},\s+\d{4}$/,
  // MM/DD/YYYY or MM-DD-YYYY
  SHORT_FORMAT: /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/,
  // YYYY-MM-DD (ISO format)
  ISO_FORMAT: /^\d{4}-\d{2}-\d{2}$/,
  // Date range: "date - date"
  RANGE: /^.+\s+-\s+.+$/
};
function isDate(value) {
  return DATE_PATTERNS.LONG_FORMAT.test(value) || DATE_PATTERNS.SHORT_FORMAT.test(value) || DATE_PATTERNS.ISO_FORMAT.test(value);
}
function isDateRange(value) {
  if (!DATE_PATTERNS.RANGE.test(value)) return false;
  const parts = value.split("-").map((p) => p.trim());
  if (parts.length !== 2) return false;
  return isDate(parts[0]) && isDate(parts[1]);
}
function normalizeType(explicitType) {
  const normalized = explicitType.toLowerCase().trim();
  const typeMap = {
    text: "input",
    textfield: "input",
    textinput: "input",
    input: "input",
    textarea: "textarea",
    multiline: "textarea",
    switch: "switch",
    toggle: "switch",
    checkbox: "checkbox",
    check: "checkbox",
    button: "button",
    action: "button",
    date: "date",
    datepicker: "date",
    daterange: "daterange",
    "date-range": "daterange",
    radio: "radiogroup",
    radiogroup: "radiogroup",
    "radio-group": "radiogroup",
    select: "select",
    dropdown: "select",
    combobox: "combobox",
    togglegroup: "togglegroup",
    "toggle-group": "togglegroup",
    checkboxgroup: "checkboxgroup",
    "checkbox-group": "checkboxgroup"
  };
  return typeMap[normalized] || "input";
}
function inferComponentType(value, explicitType, context) {
  if (explicitType) {
    return normalizeType(explicitType);
  }
  if (context == null ? void 0 : context.hasChildren) {
    if (context.childrenHaveValues) {
      return "togglegroup";
    }
    const optionCount = context.childrenCount || 0;
    return optionCount > 5 ? "combobox" : "checkboxgroup";
  }
  if (value === "yes" || value === "no") {
    return "switch";
  }
  if (isDateRange(value)) {
    return "daterange";
  }
  if (isDate(value)) {
    return "date";
  }
  if (value.length >= 60) {
    return "textarea";
  }
  return "input";
}
function inferGroupType(children, explicitType) {
  if (explicitType) {
    return normalizeType(explicitType);
  }
  if (children.length === 0) {
    return "checkboxgroup";
  }
  const hasFormattedChildren = children.some(
    (child) => child.value !== void 0 && child.value !== "true" && child.value !== "false"
  );
  if (hasFormattedChildren) {
    const allYesNo = children.every(
      (child) => child.value === "yes" || child.value === "no"
    );
    if (allYesNo) {
      return "togglegroup";
    }
    return "togglegroup";
  }
  const optionCount = children.length;
  return optionCount > 5 ? "combobox" : "checkboxgroup";
}
function isBooleanValue(value) {
  return value === "yes" || value === "no";
}
function parseBooleanValue(value) {
  return value === "yes";
}

// src/parser/ast-builder.ts
function buildAST(tokens) {
  var _a, _b, _c;
  const nodes = [];
  const errors = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.type === "BLANK") {
      i++;
      continue;
    }
    if (token.type === "UNKNOWN") {
      errors.push({
        line: token.lineNumber,
        message: `Unrecognized markdown format: "${token.line}"`,
        severity: "warning"
      });
      i++;
      continue;
    }
    if (token.type === "BUTTON") {
      const actions = ((_a = token.value) == null ? void 0 : _a.match(/\[([^\]]+)\]/g)) || [];
      actions.forEach((action) => {
        const label = action.slice(1, -1);
        nodes.push({
          type: "button",
          label,
          metadata: {
            lineNumber: token.lineNumber,
            inferredType: false
          }
        });
      });
      i++;
      continue;
    }
    if (token.type === "CHECKBOX") {
      nodes.push({
        type: "checkbox",
        label: token.label || token.value || "",
        value: token.value || "true",
        // Use parsed value (true/false) or default to true for legacy
        metadata: {
          lineNumber: token.lineNumber,
          inferredType: false
        }
      });
      i++;
      continue;
    }
    if (token.type === "GROUP_HEADER") {
      const groupNode = processGroup(tokens, i, errors);
      if (groupNode) {
        nodes.push(groupNode);
        i = ((_b = groupNode.metadata) == null ? void 0 : _b.lastProcessedLine) || i + 1;
      } else {
        i++;
      }
      continue;
    }
    if (token.type === "FIELD") {
      const value = token.value || "";
      const nextToken = tokens[i + 1];
      if (nextToken && nextToken.type === "GROUP_ITEM") {
        const groupNode = processFieldWithOptions(tokens, i, errors);
        if (groupNode) {
          nodes.push(groupNode);
          i = ((_c = groupNode.metadata) == null ? void 0 : _c.lastProcessedLine) || i + 1;
        } else {
          i++;
        }
        continue;
      }
      const context = {
        hasChildren: false
      };
      const inferredType = inferComponentType(value, token.explicitType, context);
      nodes.push({
        type: inferredType,
        label: token.label || "",
        value,
        metadata: {
          lineNumber: token.lineNumber,
          inferredType: !token.explicitType
        }
      });
      i++;
      continue;
    }
    if (token.type === "GROUP_ITEM") {
      errors.push({
        line: token.lineNumber,
        message: `List item without group header: "${token.line}"`,
        severity: "warning"
      });
      i++;
      continue;
    }
    i++;
  }
  return { nodes, errors };
}
function processFieldWithOptions(tokens, startIndex, errors) {
  const fieldToken = tokens[startIndex];
  if (!fieldToken.label) {
    errors.push({
      line: fieldToken.lineNumber,
      message: `Field missing label: "${fieldToken.line}"`,
      severity: "error"
    });
    return null;
  }
  const selectedValue = fieldToken.value || "";
  const options = [];
  let i = startIndex + 1;
  while (i < tokens.length && tokens[i].type === "GROUP_ITEM") {
    const item = tokens[i];
    const itemText = item.value || "";
    options.push(itemText);
    i++;
  }
  if (options.length === 0) {
    return null;
  }
  const componentType = options.length < 6 ? "radiogroup" : "select";
  const children = options.map((option, index) => {
    var _a;
    return {
      type: "radio",
      label: option,
      value: option === selectedValue ? "true" : "false",
      metadata: {
        lineNumber: ((_a = tokens[startIndex + 1 + index]) == null ? void 0 : _a.lineNumber) || fieldToken.lineNumber,
        inferredType: true
      }
    };
  });
  const groupNode = {
    type: componentType,
    label: fieldToken.label,
    value: selectedValue,
    children,
    metadata: {
      lineNumber: fieldToken.lineNumber,
      inferredType: !fieldToken.explicitType,
      lastProcessedLine: i
    }
  };
  return groupNode;
}
function processGroup(tokens, startIndex, errors) {
  const headerToken = tokens[startIndex];
  if (!headerToken.label) {
    errors.push({
      line: headerToken.lineNumber,
      message: `Group header missing label: "${headerToken.line}"`,
      severity: "error"
    });
    return null;
  }
  const children = [];
  let i = startIndex + 1;
  while (i < tokens.length && (tokens[i].type === "GROUP_ITEM" || tokens[i].type === "CHECKBOX")) {
    const item = tokens[i];
    if (item.type === "CHECKBOX") {
      children.push({
        type: "checkbox",
        label: item.label || item.value || "",
        value: item.value || "true",
        // Use parsed checked state
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true
        }
      });
      i++;
      continue;
    }
    const itemText = item.value || "";
    const fieldMatch = itemText.match(/^\*([^*:]+):\*\s(.+)$/);
    if (fieldMatch) {
      children.push({
        type: "input",
        // Will be overridden by parent group type
        label: fieldMatch[1],
        value: fieldMatch[2],
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true
        }
      });
    } else {
      children.push({
        type: "checkbox",
        label: itemText,
        value: "true",
        // Checked/selected (legacy behavior)
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true
        }
      });
    }
    i++;
  }
  if (children.length === 0) {
    errors.push({
      line: headerToken.lineNumber,
      message: `Group header with no items: "${headerToken.line}"`,
      severity: "warning"
    });
    return null;
  }
  const childrenData = children.map((child) => ({
    label: child.label,
    value: child.value
  }));
  const groupType = inferGroupType(childrenData, headerToken.explicitType);
  children.some((child) => child.label && child.value);
  const groupNode = {
    type: groupType,
    label: headerToken.label,
    children,
    metadata: {
      lineNumber: headerToken.lineNumber,
      inferredType: !headerToken.explicitType,
      lastProcessedLine: i
      // Track where we stopped for the main loop
    }
  };
  return groupNode;
}
function validateAST(ast) {
  const errors = [...ast.errors];
  const labels = /* @__PURE__ */ new Set();
  const checkDuplicates = (nodes) => {
    nodes.forEach((node) => {
      var _a;
      if (node.label && node.type !== "button") {
        if (labels.has(node.label)) {
          errors.push({
            line: ((_a = node.metadata) == null ? void 0 : _a.lineNumber) || 0,
            message: `Duplicate label detected: "${node.label}". This may cause ambiguity.`,
            severity: "warning"
          });
        }
        labels.add(node.label);
      }
      if (node.children) {
        checkDuplicates(node.children);
      }
    });
  };
  checkDuplicates(ast.nodes);
  return errors;
}
function printAST(ast, indent = 0) {
  const lines = [];
  const prefix = "  ".repeat(indent);
  ast.nodes.forEach((node) => {
    var _a;
    const typeInfo = ((_a = node.metadata) == null ? void 0 : _a.inferredType) ? ` (inferred)` : "";
    lines.push(
      `${prefix}${node.type}${typeInfo}: "${node.label}"${node.value ? ` = "${node.value}"` : ""}`
    );
    if (node.children && node.children.length > 0) {
      const childAST = { nodes: node.children, errors: [] };
      lines.push(printAST(childAST, indent + 1));
    }
  });
  if (indent === 0 && ast.errors.length > 0) {
    lines.push("\nErrors:");
    ast.errors.forEach((error) => {
      lines.push(`  Line ${error.line}: [${error.severity}] ${error.message}`);
    });
  }
  return lines.join("\n");
}

// src/parser/component-mapper.ts
function generateKey(node, index) {
  var _a;
  const line = ((_a = node.metadata) == null ? void 0 : _a.lineNumber) || 0;
  const label = node.label.replace(/\s+/g, "-").toLowerCase();
  return `${node.type}-${label}-${line}-${index}`;
}
function mapNodeToProps(node, index) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
  const baseProps = {
    "nli-markdown": node.label
  };
  switch (node.type) {
    case "input":
      return {
        type: "input",
        props: __spreadProps(__spreadValues({}, baseProps), {
          type: "text",
          defaultValue: node.value || "",
          placeholder: node.label,
          label: node.label
        }),
        key: generateKey(node, index)
      };
    case "textarea":
      return {
        type: "textarea",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: node.value || "",
          placeholder: node.label,
          label: node.label
        }),
        key: generateKey(node, index)
      };
    case "switch":
      return {
        type: "switch",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultChecked: parseBooleanValue(node.value || "no")
        }),
        key: generateKey(node, index)
      };
    case "checkbox":
      return {
        type: "checkbox",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultChecked: node.value === "true"
        }),
        key: generateKey(node, index)
      };
    case "button":
      return {
        type: "button",
        props: __spreadValues({}, baseProps),
        key: generateKey(node, index)
      };
    case "date":
      return {
        type: "date",
        props: __spreadProps(__spreadValues({}, baseProps), {
          "data-date-value": node.value || ""
        }),
        key: generateKey(node, index)
      };
    case "daterange":
      return {
        type: "daterange",
        props: __spreadProps(__spreadValues({}, baseProps), {
          // Parse the date range value
          // Format: "date1 - date2"
          "data-date-from": ((_b = (_a = node.value) == null ? void 0 : _a.split("-")[0]) == null ? void 0 : _b.trim()) || "",
          "data-date-to": ((_d = (_c = node.value) == null ? void 0 : _c.split("-")[1]) == null ? void 0 : _d.trim()) || ""
        }),
        key: generateKey(node, index)
      };
    case "radiogroup":
      const selectedRadioItem = (_e = node.children) == null ? void 0 : _e.find(
        (child) => child.value === "true"
      );
      const radioDefaultValue = node.value || (selectedRadioItem == null ? void 0 : selectedRadioItem.label) || void 0;
      return {
        type: "radiogroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: radioDefaultValue
        }),
        children: (_f = node.children) == null ? void 0 : _f.map((child, i) => ({
          type: "radio",
          props: {
            "nli-markdown": child.label,
            value: child.label
          },
          key: `${generateKey(node, index)}-item-${i}`
        })),
        key: generateKey(node, index)
      };
    case "select":
      const selectDefaultValue = node.value || ((_h = (_g = node.children) == null ? void 0 : _g[0]) == null ? void 0 : _h.label) || void 0;
      return {
        type: "select",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: selectDefaultValue
        }),
        children: (_i = node.children) == null ? void 0 : _i.map((child, i) => ({
          type: "select-item",
          props: {
            "nli-markdown": child.label,
            value: child.label
          },
          key: `${generateKey(node, index)}-item-${i}`
        })),
        key: generateKey(node, index)
      };
    case "togglegroup":
      const defaultToggled = ((_j = node.children) == null ? void 0 : _j.filter((child) => parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "togglegroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          type: "multiple",
          defaultValue: defaultToggled
        }),
        children: (_k = node.children) == null ? void 0 : _k.map((child, i) => ({
          type: "toggle-item",
          props: {
            "nli-markdown": `*${child.label}:* ${child.value}`,
            value: child.label
          },
          key: `${generateKey(node, index)}-item-${i}`
        })),
        key: generateKey(node, index)
      };
    case "checkboxgroup":
      const defaultChecked = ((_l = node.children) == null ? void 0 : _l.filter((child) => child.value === "true" || parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "checkboxgroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: defaultChecked
        }),
        children: (_m = node.children) == null ? void 0 : _m.map((child, i) => ({
          type: "checkbox-item",
          props: {
            "nli-markdown": child.label,
            value: child.label
          },
          key: `${generateKey(node, index)}-item-${i}`
        })),
        key: generateKey(node, index)
      };
    case "combobox":
      const selectedValues = ((_n = node.children) == null ? void 0 : _n.filter((child) => child.value === "true" || parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "combobox",
        props: __spreadProps(__spreadValues({}, baseProps), {
          label: node.label,
          options: ((_o = node.children) == null ? void 0 : _o.map((child) => ({
            label: child.label,
            value: child.label
          }))) || [],
          value: selectedValues
        }),
        key: generateKey(node, index)
      };
    default:
      return {
        type: "input",
        props: __spreadProps(__spreadValues({}, baseProps), {
          value: node.value || ""
        }),
        key: generateKey(node, index)
      };
  }
}
function mapASTToComponents(nodes) {
  return nodes.map((node, index) => mapNodeToProps(node, index));
}
function extractValues(components) {
  const values = {};
  components.forEach((component) => {
    var _a, _b, _c;
    const label = component.props["nli-markdown"];
    switch (component.type) {
      case "input":
      case "textarea":
        values[label] = component.props.value;
        break;
      case "switch":
        values[label] = component.props.checked;
        break;
      case "checkbox":
        if (component.props.checked) {
          values[label] = true;
        }
        break;
      case "date":
        values[label] = component.props["data-date-value"];
        break;
      case "daterange":
        values[label] = {
          from: component.props["data-date-from"],
          to: component.props["data-date-to"]
        };
        break;
      case "radiogroup":
      case "select":
        const selected = (_a = component.children) == null ? void 0 : _a.find(
          (child) => child.props.checked || child.props.selected
        );
        if (selected) {
          values[label] = selected.props.value;
        }
        break;
      case "togglegroup":
        values[label] = (_b = component.children) == null ? void 0 : _b.reduce(
          (acc, child) => {
            acc[child.props.value] = child.props["data-state"] === "on";
            return acc;
          },
          {}
        );
        break;
      case "checkboxgroup":
        values[label] = (_c = component.children) == null ? void 0 : _c.filter((child) => child.props.checked).map((child) => child.props.value);
        break;
      case "combobox":
        values[label] = component.props.value;
        break;
    }
  });
  return values;
}
function renderComponent(mapped, onComponentChange) {
  const { type, props, children, key } = mapped;
  const label = props["nli-markdown"];
  const handleChange = (value) => {
    if (onComponentChange && label) {
      console.log("[instantiator] handleChange:", { label, value, type });
      const stringValue = Array.isArray(value) ? value.join(",") : String(value);
      onComponentChange(label, stringValue, type);
    }
  };
  switch (type) {
    case "input": {
      const _a = props, { onChange: _unused } = _a, restProps = __objRest(_a, ["onChange"]);
      return /* @__PURE__ */ jsxRuntime.jsx(
        Input,
        __spreadProps(__spreadValues({}, restProps), {
          onChange: (e) => {
            var _a2;
            handleChange(e.target.value);
            (_a2 = props.onChange) == null ? void 0 : _a2.call(props, e);
          }
        }),
        key
      );
    }
    case "textarea": {
      const _b = props, { onChange: _unused } = _b, restProps = __objRest(_b, ["onChange"]);
      return /* @__PURE__ */ jsxRuntime.jsx(
        Textarea,
        __spreadProps(__spreadValues({}, restProps), {
          onChange: (e) => {
            var _a2;
            handleChange(e.target.value);
            (_a2 = props.onChange) == null ? void 0 : _a2.call(props, e);
          }
        }),
        key
      );
    }
    case "checkbox": {
      const _c = props, { onCheckedChange: _unused } = _c, restProps = __objRest(_c, ["onCheckedChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Checkbox,
          __spreadProps(__spreadValues({}, restProps), {
            onCheckedChange: (checked) => {
              var _a2;
              handleChange(checked);
              (_a2 = props.onCheckedChange) == null ? void 0 : _a2.call(props, checked);
            }
          })
        ),
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label })
      ] }, key);
    }
    case "switch": {
      const _d = props, { onCheckedChange: _unused } = _d, restProps = __objRest(_d, ["onCheckedChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Switch,
          __spreadProps(__spreadValues({}, restProps), {
            onCheckedChange: (checked) => {
              var _a2;
              handleChange(checked ? "yes" : "no");
              (_a2 = props.onCheckedChange) == null ? void 0 : _a2.call(props, checked);
            }
          })
        ),
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label })
      ] }, key);
    }
    case "button":
      return /* @__PURE__ */ jsxRuntime.jsx(Button, __spreadProps(__spreadValues({}, props), { children: label }), key);
    case "date":
      return /* @__PURE__ */ jsxRuntime.jsx(
        DatePickerComponent,
        __spreadProps(__spreadValues({}, props), {
          onChange: (value) => {
            var _a2;
            handleChange(value);
            (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
          }
        }),
        key
      );
    case "daterange":
      return /* @__PURE__ */ jsxRuntime.jsx(
        DateRangePickerComponent,
        __spreadProps(__spreadValues({}, props), {
          onChange: (value) => {
            var _a2;
            handleChange(value);
            (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
          }
        }),
        key
      );
    case "radiogroup": {
      const _e = props, { onValueChange: _unused } = _e, restProps = __objRest(_e, ["onValueChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          RadioGroup,
          __spreadProps(__spreadValues({}, restProps), {
            defaultValue: props.defaultValue,
            onValueChange: (value) => {
              var _a2;
              handleChange(value);
              (_a2 = props.onValueChange) == null ? void 0 : _a2.call(props, value);
            },
            children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(RadioGroupItem, __spreadValues({ value: child.props.value }, child.props)),
              /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: child.props["nli-markdown"] })
            ] }, child.key))
          })
        )
      ] }, key);
    }
    case "select": {
      const _f = props, { onValueChange: _unused } = _f, restProps = __objRest(_f, ["onValueChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          Select,
          __spreadProps(__spreadValues({}, restProps), {
            defaultValue: props.defaultValue,
            onValueChange: (value) => {
              var _a2;
              handleChange(value);
              (_a2 = props.onValueChange) == null ? void 0 : _a2.call(props, value);
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: `Select ${props["nli-markdown"]}` }) }),
              /* @__PURE__ */ jsxRuntime.jsx(SelectContent, { children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxRuntime.jsx(SelectItem, __spreadProps(__spreadValues({ value: child.props.value }, child.props), { children: child.props["nli-markdown"] }), child.key)) })
            ]
          })
        )
      ] }, key);
    }
    case "combobox": {
      const _g = props, { onChange: _unused } = _g, restProps = __objRest(_g, ["onChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          ComboBox,
          __spreadProps(__spreadValues({}, restProps), {
            options: props.options || [],
            onChange: (value) => {
              var _a2;
              handleChange(value);
              (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
            }
          })
        )
      ] }, key);
    }
    case "togglegroup": {
      const _h = props, { onValueChange: _unused } = _h, restProps = __objRest(_h, ["onValueChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", "nli-group-label": props["nli-markdown"], children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          ToggleGroup,
          __spreadProps(__spreadValues({}, restProps), {
            type: "multiple",
            defaultValue: props.defaultValue,
            onValueChange: (value) => {
              var _a2;
              handleChange(value);
              (_a2 = props.onValueChange) == null ? void 0 : _a2.call(props, value);
            },
            children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxRuntime.jsx(ToggleGroupItem, __spreadProps(__spreadValues({ value: child.props.value }, child.props), { children: child.props.value }), child.key))
          })
        )
      ] }, key);
    }
    case "checkboxgroup": {
      const _i = props, { onValueChange: _unused } = _i, restProps = __objRest(_i, ["onValueChange"]);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", "nli-group-label": props["nli-markdown"], children: [
        /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          CheckboxGroup,
          __spreadProps(__spreadValues({}, restProps), {
            defaultValue: props.defaultValue,
            onValueChange: (value) => {
              var _a2;
              handleChange(value);
              (_a2 = props.onValueChange) == null ? void 0 : _a2.call(props, value);
            },
            children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(CheckboxGroupItem, __spreadValues({ value: child.props.value }, child.props)),
              /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: child.props["nli-markdown"] })
            ] }, child.key))
          })
        )
      ] }, key);
    }
    default:
      return null;
  }
}
function safeParseDate(value) {
  if (!value) return void 0;
  let date = dateFns.parseISO(value);
  if (dateFns.isValid(date)) return date;
  date = new Date(value);
  if (dateFns.isValid(date)) return date;
  return void 0;
}
function DatePickerComponent(props) {
  const dateValue = props["data-date-value"];
  const date = safeParseDate(dateValue);
  const handleDateChange = (newDate) => {
    if (props.onChange && newDate) {
      props.onChange(dateFns.format(newDate, "MMMM dd, yyyy"));
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Popover, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        __spreadProps(__spreadValues({
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )
        }, props), {
          "data-date-value": date ? dateFns.format(date, "yyyy-MM-dd") : "",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CalendarIcon, { className: "mr-2 h-4 w-4" }),
            date ? dateFns.format(date, "MMMM dd, yyyy") : /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Pick a date" })
          ]
        })
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
        Calendar,
        {
          mode: "single",
          selected: date,
          onSelect: handleDateChange,
          initialFocus: true
        }
      ) })
    ] })
  ] });
}
function DateRangePickerComponent(props) {
  const fromValue = props["data-date-from"];
  const toValue = props["data-date-to"];
  const dateRange = {
    from: safeParseDate(fromValue),
    to: safeParseDate(toValue)
  };
  const handleDateRangeChange = (newRange) => {
    if (props.onChange && (newRange == null ? void 0 : newRange.from) && (newRange == null ? void 0 : newRange.to)) {
      const formattedRange = `${dateFns.format(newRange.from, "MMMM dd, yyyy")} - ${dateFns.format(newRange.to, "MMMM dd, yyyy")}`;
      props.onChange(formattedRange);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Popover, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        __spreadProps(__spreadValues({
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !dateRange.from && "text-muted-foreground"
          )
        }, props), {
          "data-date-from": dateRange.from ? dateFns.format(dateRange.from, "yyyy-MM-dd") : "",
          "data-date-to": dateRange.to ? dateFns.format(dateRange.to, "yyyy-MM-dd") : "",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CalendarIcon, { className: "mr-2 h-4 w-4" }),
            dateRange.from ? dateRange.to ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              dateFns.format(dateRange.from, "MMM dd, yyyy"),
              " - ",
              dateFns.format(dateRange.to, "MMM dd, yyyy")
            ] }) : dateFns.format(dateRange.from, "MMM dd, yyyy") : /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Pick a date range" })
          ]
        })
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntime.jsx(
        Calendar,
        {
          mode: "range",
          selected: dateRange,
          onSelect: handleDateRangeChange,
          numberOfMonths: 2,
          initialFocus: true
        }
      ) })
    ] })
  ] });
}
function instantiateComponents(components, onComponentChange) {
  return components.map((component) => renderComponent(component, onComponentChange)).filter(Boolean);
}
function InstantiatedForm({
  components,
  className
}) {
  const elements = instantiateComponents(components);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("space-y-4", className), children: elements });
}

// src/parser/index.ts
function parse(markdown, options = {}) {
  const { includeBlanks = false, validate = true, debug = false } = options;
  let tokens = tokenize(markdown);
  if (!includeBlanks) {
    tokens = filterBlanks(tokens);
  }
  let ast = buildAST(tokens);
  if (validate) {
    const validationErrors = validateAST(ast);
    ast = __spreadProps(__spreadValues({}, ast), { errors: validationErrors });
  }
  if (debug) {
    console.log("=== PARSED AST ===");
    console.log(printAST(ast));
    console.log("==================");
  }
  return ast;
}
function parseToComponents(markdown) {
  const ast = parse(markdown, { validate: true });
  const components = mapASTToComponents(ast.nodes);
  return {
    components,
    errors: ast.errors,
    hasErrors: ast.errors.some((e) => e.severity === "error")
  };
}
var parseCache = /* @__PURE__ */ new Map();
var CACHE_TTL = 5e3;
var MAX_CACHE_SIZE = 100;
function hashMarkdown(markdown) {
  let hash = 0;
  for (let i = 0; i < markdown.length; i++) {
    const char = markdown.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
function cleanCache() {
  const now = Date.now();
  for (const [key, entry] of parseCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      parseCache.delete(key);
    }
  }
  if (parseCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(parseCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, parseCache.size - MAX_CACHE_SIZE);
    toRemove.forEach(([key]) => parseCache.delete(key));
  }
}
function parseWithCache(markdown, options = {}) {
  const { skipCache = false } = options;
  if (skipCache) {
    return parseToComponents(markdown);
  }
  const cacheKey = hashMarkdown(markdown);
  const cached = parseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }
  const result = parseToComponents(markdown);
  parseCache.set(cacheKey, {
    result,
    timestamp: Date.now()
  });
  if (parseCache.size > MAX_CACHE_SIZE) {
    cleanCache();
  }
  return result;
}
function clearParseCache() {
  parseCache.clear();
}
var generators = {
  /**
   * Input and Textarea components
   * Format: "*Label:* value"
   */
  input: (element, label) => {
    const inputElement = element;
    const value = inputElement.value;
    return `*${label}:* ${value}`;
  },
  /**
   * Date picker component
   * Format: "*Label:* Month DD, YYYY"
   */
  date: (element, label) => {
    var _a;
    const dateValue = element.getAttribute("data-date-value");
    try {
      if (dateValue && dateValue !== "") {
        const date = dateFns.parseISO(dateValue);
        if (dateFns.isValid(date)) {
          return `*${label}:* ${dateFns.format(date, "MMMM dd, yyyy")}`;
        }
      }
      const button = element.querySelector("button");
      const displayText = (_a = button == null ? void 0 : button.textContent) == null ? void 0 : _a.trim();
      if (displayText && !displayText.includes("Pick a date")) {
        return `*${label}:* ${displayText.replace(/^\s*\S+\s*/, "")}`;
      }
      return `*${label}:* `;
    } catch (error) {
      console.warn("Invalid date format:", dateValue, error);
      return `*${label}:* ${dateValue || ""}`;
    }
  },
  /**
   * Date range picker component
   * Format: "*Label:* Month DD, YYYY - Month DD, YYYY"
   */
  dateRange: (element, label) => {
    var _a;
    const from = element.getAttribute("data-date-from");
    const to = element.getAttribute("data-date-to");
    try {
      if (from && to && from !== "" && to !== "") {
        const fromDate = dateFns.parseISO(from);
        const toDate = dateFns.parseISO(to);
        if (dateFns.isValid(fromDate) && dateFns.isValid(toDate)) {
          if (fromDate > toDate) {
            console.warn("Date range invalid: from date is after to date");
          }
          return `*${label}:* ${dateFns.format(fromDate, "MMMM dd, yyyy")} - ${dateFns.format(toDate, "MMMM dd, yyyy")}`;
        }
      }
      const button = element.querySelector("button");
      const displayText = (_a = button == null ? void 0 : button.textContent) == null ? void 0 : _a.trim();
      if (displayText && !displayText.includes("Pick a date")) {
        return `*${label}:* ${displayText.replace(/^\s*\S+\s*/, "")}`;
      }
      return `*${label}:* `;
    } catch (error) {
      console.warn("Invalid date range format:", { from, to }, error);
      return `*${label}:* ${from || ""} - ${to || ""}`;
    }
  },
  /**
   * Checkbox component
   * Format: "[x] Label" (checked) or "[ ] Label" (unchecked)
   * Always returns both states to preserve checkbox position in markdown
   */
  checkbox: (element, label) => {
    const state = element.getAttribute("data-state");
    const isChecked = state === "checked";
    return `[${isChecked ? "x" : " "}] ${label}`;
  },
  /**
   * Radio button component
   * Format: "[x] Label" (selected) or "[ ] Label" (unselected)
   * Both states are now shown to preserve component in markdown
   */
  radio: (element, label) => {
    const state = element.getAttribute("data-state");
    const isChecked = state === "checked";
    return `[${isChecked ? "x" : " "}] ${label}`;
  },
  /**
   * Switch component
   * Format: "*Label:* yes/no"
   * Both states are always shown
   */
  switch: (element, label) => {
    const state = element.getAttribute("data-state");
    const isChecked = state === "checked";
    return `*${label}:* ${isChecked ? "yes" : "no"}`;
  },
  /**
   * Toggle component (with on/off state)
   * Format: "*Label:* yes/no"
   */
  toggle: (element, label) => {
    const state = element.getAttribute("data-state");
    const isOn = state === "on";
    return `*${label}:* ${isOn ? "yes" : "no"}`;
  },
  /**
   * Select/Combobox component
   * Format: "*Label:* Selected Value"
   */
  combobox: (element, label) => {
    const value = element.textContent || "";
    return `*${label}:* ${value}`;
  }
};
function identifyComponentType(element) {
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    return "input";
  }
  if (element.hasAttribute("data-date-value")) {
    return "date";
  }
  if (element.hasAttribute("data-date-from") && element.hasAttribute("data-date-to")) {
    return "dateRange";
  }
  const role = element.getAttribute("role");
  if (role && generators[role]) {
    return role;
  }
  if (element.hasAttribute("data-state") && (element.getAttribute("data-state") === "on" || element.getAttribute("data-state") === "off")) {
    return "toggle";
  }
  return null;
}
function generateMarkdownForElement(element, label) {
  const type = identifyComponentType(element);
  if (!type) {
    return label;
  }
  const generator = generators[type];
  return generator ? generator(element, label) : label;
}
function isRegularButton(element) {
  return !!(element && element.tagName === "BUTTON" && element.getAttribute("role") !== "checkbox" && element.getAttribute("role") !== "radio" && element.getAttribute("role") !== "combobox" && element.getAttribute("role") !== "switch" && element.getAttribute("aria-pressed") === null);
}
function generateMarkdownFromComponent(component, isInGroup = false) {
  const label = component.props["nli-markdown"] || component.props.label || "";
  switch (component.type) {
    case "input":
    case "textarea": {
      const value = component.props.defaultValue || component.props.value || "";
      return `*${label}:* ${value}`;
    }
    case "date": {
      const dateValue = component.props["data-date-value"] || "";
      if (dateValue) {
        try {
          const date = dateFns.parseISO(dateValue);
          if (dateFns.isValid(date)) {
            return `*${label}:* ${dateFns.format(date, "MMMM dd, yyyy")}`;
          }
        } catch (e) {
        }
      }
      return `*${label}:* ${dateValue}`;
    }
    case "daterange": {
      const from = component.props["data-date-from"] || "";
      const to = component.props["data-date-to"] || "";
      if (from && to) {
        try {
          const fromDate = dateFns.parseISO(from);
          const toDate = dateFns.parseISO(to);
          if (dateFns.isValid(fromDate) && dateFns.isValid(toDate)) {
            return `*${label} Date Range:* ${dateFns.format(fromDate, "MMMM dd, yyyy")} - ${dateFns.format(toDate, "MMMM dd, yyyy")}`;
          }
        } catch (e) {
        }
      }
      return `*${label}:* ${from} - ${to}`;
    }
    case "checkbox": {
      const checked = component.props.defaultChecked || component.props.checked || component.props.value === "true" || component.props.value === true || false;
      return `[${checked ? "x" : " "}] ${label}`;
    }
    case "radio": {
      const checked = component.props.defaultChecked || component.props.checked || component.props.value === "true" || component.props.value === true || false;
      return `[${checked ? "x" : " "}] ${label}`;
    }
    case "checkbox-item":
    case "toggle-item":
    case "select-item": {
      return label;
    }
    case "switch": {
      const checked = component.props.defaultChecked || component.props.checked || false;
      return `*${label}:* ${checked ? "yes" : "no"}`;
    }
    case "button":
      return `[${label}]`;
    case "select": {
      const selectedValue = component.props.value || component.props.defaultValue || "";
      if (component.children && component.children.length > 0) {
        let markdown = `*${label}:* ${selectedValue}
`;
        component.children.forEach((child) => {
          const optionLabel = child.props["nli-markdown"] || child.props.label || child.props.value || "";
          markdown += `- ${optionLabel}
`;
        });
        return markdown.trimEnd();
      }
      return `*${label}:* ${selectedValue}`;
    }
    case "combobox": {
      let markdown = `*${label}:*
`;
      const selectedValues = component.props.value || component.props.defaultValue || [];
      if (component.children && component.children.length > 0) {
        component.children.forEach((child) => {
          const optionLabel = child.props["nli-markdown"] || child.props.label || child.props.value || "";
          const isSelected = Array.isArray(selectedValues) ? selectedValues.includes(child.props.value) : false;
          markdown += `[${isSelected ? "x" : " "}] ${optionLabel}
`;
        });
        return markdown.trimEnd();
      }
      return `*${label}:* ${Array.isArray(selectedValues) ? selectedValues.join(", ") : selectedValues}`;
    }
    case "radiogroup": {
      const selectedValue = component.props.defaultValue || component.props.value || "";
      let markdown = `*${label}:* ${selectedValue}
`;
      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props["nli-markdown"] || child.props.label || child.props.value || "";
          markdown += `- ${optionLabel}
`;
        });
      }
      return markdown.trimEnd();
    }
    case "checkboxgroup": {
      let markdown = `*${label}:*
`;
      const selectedValues = component.props.defaultValue || component.props.value || [];
      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props["nli-markdown"] || child.props.label || child.props.value || "";
          const isSelected = Array.isArray(selectedValues) ? selectedValues.includes(child.props.value) : false;
          markdown += `[${isSelected ? "x" : " "}] ${optionLabel}
`;
        });
      }
      return markdown.trimEnd();
    }
    case "togglegroup": {
      let markdown = `*${label}:*
`;
      const selectedValues = component.props.defaultValue || component.props.value || [];
      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props["nli-markdown"] || child.props.label || child.props.value || "";
          const isSelected = Array.isArray(selectedValues) ? selectedValues.includes(child.props.value) : false;
          markdown += `*${optionLabel}:* ${isSelected ? "yes" : "no"}
`;
        });
      }
      return markdown.trimEnd();
    }
    default:
      return label;
  }
}
function generateMarkdownFromComponents(components) {
  let markdown = "";
  for (const component of components) {
    const componentMarkdown = generateMarkdownFromComponent(component);
    if (!componentMarkdown) continue;
    if (component.children) {
      if (markdown) markdown += "\n";
      markdown += componentMarkdown;
    } else {
      if (markdown) markdown += "\n";
      markdown += componentMarkdown;
    }
  }
  return markdown.trim();
}
function generateMarkdownWithMapping(components) {
  const mapping = [];
  const lines = [];
  components.forEach((component) => {
    const startLine = lines.length;
    const componentMarkdown = generateMarkdownFromComponent(component);
    if (componentMarkdown) {
      const componentLines = componentMarkdown.split("\n");
      lines.push(...componentLines);
      mapping.push({
        componentKey: component.key,
        startLine,
        endLine: lines.length - 1,
        markdown: componentMarkdown
      });
    }
  });
  return {
    markdown: lines.join("\n"),
    mapping
  };
}
function updateMarkdownIncremental(previousMapping, changedComponents, allComponents) {
  return generateMarkdownWithMapping(allComponents);
}

// src/lib/sync-reconciler.ts
var SyncReconciler = class {
  constructor(options) {
    this.options = options;
    this.syncLock = false;
    this.updateQueue = [];
    this.lastProcessedMarkdownSeq = -1;
    this.lastProcessedGuiSeq = -1;
    this.currentComponents = [];
    this.currentMarkdown = "";
    this.updateCount = 0;
    this.updateWindowStart = Date.now();
    this.MAX_UPDATES_PER_SECOND = 10;
  }
  /**
   * Set current state (used for initialization)
   */
  setState(components, markdown) {
    this.currentComponents = components;
    this.currentMarkdown = markdown;
  }
  /**
   * Reconcile an update from either markdown or GUI
   */
  reconcileUpdate(origin, content, sequence) {
    var _a, _b, _c, _d;
    if (this.isUpdateRateLimitExceeded()) {
      console.warn("[SyncReconciler] Update rate limit exceeded, pausing sync");
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error: new Error("Update rate limit exceeded")
      };
    }
    if (this.syncLock) {
      this.updateQueue.push({
        origin,
        content,
        sequence,
        timestamp: Date.now()
      });
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    }
    this.syncLock = true;
    (_b = (_a = this.options).onSyncStatusChange) == null ? void 0 : _b.call(_a, "syncing");
    try {
      const result = this.processUpdate(origin, content, sequence);
      (_d = (_c = this.options).onSyncStatusChange) == null ? void 0 : _d.call(_c, result.error ? "error" : "idle");
      return result;
    } finally {
      this.syncLock = false;
      this.processQueue();
    }
  }
  /**
   * Process a single update
   */
  processUpdate(origin, content, sequence) {
    if (origin === "markdown") {
      return this.processMarkdownUpdate(content, sequence);
    } else if (origin === "gui") {
      return this.processGuiUpdate(content, sequence);
    }
    return {
      shouldUpdateComponents: false,
      shouldUpdateMarkdown: false
    };
  }
  /**
   * Process an update from markdown editor
   */
  processMarkdownUpdate(markdown, sequence) {
    var _a, _b;
    if (sequence <= this.lastProcessedMarkdownSeq) {
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    }
    const markdownDiff = this.options.diffMarkdown(
      this.currentMarkdown,
      markdown
    );
    if (!markdownDiff.hasChanges) {
      this.lastProcessedMarkdownSeq = sequence;
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    }
    try {
      const parseResult = this.options.parseToComponents(markdown);
      (_b = (_a = this.options).onParseErrors) == null ? void 0 : _b.call(_a, parseResult.errors);
      const componentDiff = this.options.diffComponents(
        this.currentComponents,
        parseResult.components
      );
      if (componentDiff.hasChanges) {
        this.currentComponents = parseResult.components;
        this.currentMarkdown = markdown;
        this.lastProcessedMarkdownSeq = sequence;
        this.trackUpdate();
        return {
          shouldUpdateComponents: true,
          shouldUpdateMarkdown: false,
          components: parseResult.components
        };
      }
      this.currentMarkdown = markdown;
      this.lastProcessedMarkdownSeq = sequence;
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    } catch (error) {
      console.error("[SyncReconciler] Parse error:", error);
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error
      };
    }
  }
  /**
   * Process an update from GUI interaction
   */
  processGuiUpdate(components, sequence) {
    var _a, _b;
    if (sequence <= this.lastProcessedGuiSeq) {
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    }
    const componentDiff = this.options.diffComponents(
      this.currentComponents,
      components
    );
    if (!componentDiff.hasChanges) {
      this.lastProcessedGuiSeq = sequence;
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    }
    try {
      const newMarkdown = this.options.generateMarkdown(components);
      (_b = (_a = this.options).onParseErrors) == null ? void 0 : _b.call(_a, []);
      const markdownDiff = this.options.diffMarkdown(
        this.currentMarkdown,
        newMarkdown
      );
      if (markdownDiff.hasChanges) {
        this.currentComponents = components;
        this.currentMarkdown = newMarkdown;
        this.lastProcessedGuiSeq = sequence;
        this.trackUpdate();
        return {
          shouldUpdateComponents: false,
          shouldUpdateMarkdown: true,
          markdown: newMarkdown
        };
      }
      this.currentComponents = components;
      this.lastProcessedGuiSeq = sequence;
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false
      };
    } catch (error) {
      console.error("[SyncReconciler] Generate error:", error);
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error
      };
    }
  }
  /**
   * Process queued updates
   */
  processQueue() {
    if (this.updateQueue.length === 0) return;
    const update = this.updateQueue.shift();
    if (update) {
      this.reconcileUpdate(update.origin, update.content, update.sequence);
    }
  }
  /**
   * Track update rate for circuit breaker
   */
  trackUpdate() {
    this.updateCount++;
    const now = Date.now();
    if (now - this.updateWindowStart > 1e3) {
      this.updateCount = 1;
      this.updateWindowStart = now;
    }
  }
  /**
   * Check if update rate limit is exceeded
   */
  isUpdateRateLimitExceeded() {
    const now = Date.now();
    if (now - this.updateWindowStart > 1e3) {
      this.updateCount = 0;
      this.updateWindowStart = now;
      return false;
    }
    return this.updateCount >= this.MAX_UPDATES_PER_SECOND;
  }
  /**
   * Get current reconciler state
   */
  getState() {
    return {
      components: this.currentComponents,
      markdown: this.currentMarkdown,
      lastMarkdownSeq: this.lastProcessedMarkdownSeq,
      lastGuiSeq: this.lastProcessedGuiSeq,
      queueLength: this.updateQueue.length,
      isLocked: this.syncLock
    };
  }
  /**
   * Reset reconciler state
   */
  reset() {
    this.syncLock = false;
    this.updateQueue = [];
    this.lastProcessedMarkdownSeq = -1;
    this.lastProcessedGuiSeq = -1;
    this.updateCount = 0;
    this.updateWindowStart = Date.now();
  }
};
function createSyncReconciler(options) {
  return new SyncReconciler(options);
}

// src/lib/component-differ.ts
function diffComponents(oldComponents, newComponents) {
  const diff = {
    hasChanges: false,
    added: [],
    removed: [],
    modified: []
  };
  if (oldComponents.length !== newComponents.length) {
    diff.hasChanges = true;
  }
  const oldMap = /* @__PURE__ */ new Map();
  const newMap = /* @__PURE__ */ new Map();
  oldComponents.forEach((comp) => oldMap.set(comp.key, comp));
  newComponents.forEach((comp) => newMap.set(comp.key, comp));
  for (const [key, component] of oldMap) {
    if (!newMap.has(key)) {
      diff.removed.push(component);
      diff.hasChanges = true;
    }
  }
  for (const [key, newComponent] of newMap) {
    const oldComponent = oldMap.get(key);
    if (!oldComponent) {
      diff.added.push(newComponent);
      diff.hasChanges = true;
    } else {
      if (!areComponentsEqual(oldComponent, newComponent)) {
        diff.modified.push({ oldComponent, newComponent });
        diff.hasChanges = true;
      }
    }
  }
  return diff;
}
function areComponentsEqual(a, b) {
  if (a.type !== b.type) return false;
  if (a.key !== b.key) return false;
  if (!arePropsEqual(a.props, b.props)) return false;
  if (!areChildrenEqual(a.children, b.children)) return false;
  return true;
}
function arePropsEqual(a, b) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  if (!arraysEqual(aKeys, bKeys)) return false;
  for (const key of aKeys) {
    const aVal = a[key];
    const bVal = b[key];
    if (typeof aVal !== typeof bVal) return false;
    if (typeof aVal === "object" && aVal !== null) {
      if (!deepEqual(aVal, bVal)) return false;
    } else {
      if (aVal !== bVal) return false;
    }
  }
  return true;
}
function areChildrenEqual(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!areComponentsEqual(a[i], b[i])) return false;
  }
  return true;
}
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  if (a === null || b === null) {
    return a === b;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) return false;
  if (!arraysEqual(aKeys, bKeys)) return false;
  for (const key of aKeys) {
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// src/lib/markdown-differ.ts
function normalizeMarkdown(markdown) {
  return markdown.split("\n").map((line) => line.trimEnd()).join("\n").trimEnd();
}
function diffMarkdown(oldMarkdown, newMarkdown, options = {}) {
  const { normalize = true, detailed = false } = options;
  const oldNormalized = normalize ? normalizeMarkdown(oldMarkdown) : oldMarkdown;
  const newNormalized = normalize ? normalizeMarkdown(newMarkdown) : newMarkdown;
  if (oldNormalized === newNormalized) {
    return {
      hasChanges: false,
      addedLines: [],
      removedLines: [],
      modifiedLines: []
    };
  }
  if (!detailed) {
    return {
      hasChanges: true,
      addedLines: [],
      removedLines: [],
      modifiedLines: []
    };
  }
  return diffLines(oldNormalized, newNormalized);
}
function diffLines(oldMarkdown, newMarkdown) {
  const oldLines = oldMarkdown.split("\n");
  const newLines = newMarkdown.split("\n");
  const diff = {
    hasChanges: true,
    addedLines: [],
    removedLines: [],
    modifiedLines: []
  };
  const maxLength = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    if (oldLine === void 0) {
      diff.addedLines.push(i);
    } else if (newLine === void 0) {
      diff.removedLines.push(i);
    } else if (oldLine !== newLine) {
      diff.modifiedLines.push({
        lineNumber: i,
        oldContent: oldLine,
        newContent: newLine
      });
    }
  }
  return diff;
}

// src/hooks/useBidirectionalSync.ts
function useBidirectionalSync(options) {
  const {
    initialMarkdown = "",
    initialComponents = [],
    generateMarkdown,
    markdownDebounce = 300,
    guiDebounce = 50,
    onSyncError,
    onParseErrors
  } = options;
  const [components, setComponents] = React13.useState(initialComponents);
  const [markdown, setMarkdown] = React13.useState(initialMarkdown);
  const [lastUpdateOrigin, setLastUpdateOrigin] = React13.useState("init");
  const [guiSequence, setGuiSequence] = React13.useState(0);
  const [markdownSequence, setMarkdownSequence] = React13.useState(0);
  const [syncStatus, setSyncStatus] = React13.useState("idle");
  const [parseErrors, setParseErrors] = React13.useState([]);
  const markdownTimeoutRef = React13.useRef(null);
  const guiTimeoutRef = React13.useRef(null);
  const reconcilerRef = React13.useRef(
    createSyncReconciler({
      parseToComponents: parseWithCache,
      generateMarkdown,
      diffComponents,
      diffMarkdown,
      onSyncStatusChange: setSyncStatus,
      onParseErrors: (errors) => {
        setParseErrors(errors);
        onParseErrors == null ? void 0 : onParseErrors(errors);
      }
    })
  );
  React13.useEffect(() => {
    reconcilerRef.current.setState(initialComponents, initialMarkdown);
  }, []);
  const updateMarkdown = React13.useCallback(
    (newMarkdown) => {
      if (markdownTimeoutRef.current) {
        clearTimeout(markdownTimeoutRef.current);
      }
      setMarkdown(newMarkdown);
      setLastUpdateOrigin("markdown");
      markdownTimeoutRef.current = setTimeout(() => {
        const newSequence = markdownSequence + 1;
        setMarkdownSequence(newSequence);
        const result = reconcilerRef.current.reconcileUpdate(
          "markdown",
          newMarkdown,
          newSequence
        );
        if (result.error) {
          onSyncError == null ? void 0 : onSyncError(result.error);
        }
        if (result.shouldUpdateComponents && result.components) {
          setComponents(result.components);
        }
      }, markdownDebounce);
    },
    [markdownSequence, markdownDebounce, onSyncError]
  );
  const updateComponents = React13.useCallback(
    (newComponents) => {
      if (guiTimeoutRef.current) {
        clearTimeout(guiTimeoutRef.current);
      }
      setComponents(newComponents);
      setLastUpdateOrigin("gui");
      guiTimeoutRef.current = setTimeout(() => {
        const newSequence = guiSequence + 1;
        setGuiSequence(newSequence);
        const result = reconcilerRef.current.reconcileUpdate(
          "gui",
          newComponents,
          newSequence
        );
        if (result.error) {
          onSyncError == null ? void 0 : onSyncError(result.error);
        }
        if (result.shouldUpdateMarkdown && result.markdown) {
          setMarkdown(result.markdown);
        }
      }, guiDebounce);
    },
    [guiSequence, guiDebounce, onSyncError]
  );
  const reset = React13.useCallback(() => {
    setComponents(initialComponents);
    setMarkdown(initialMarkdown);
    setLastUpdateOrigin("init");
    setGuiSequence(0);
    setMarkdownSequence(0);
    setSyncStatus("idle");
    setParseErrors([]);
    reconcilerRef.current.reset();
    reconcilerRef.current.setState(initialComponents, initialMarkdown);
  }, [initialComponents, initialMarkdown]);
  React13.useEffect(() => {
    return () => {
      if (markdownTimeoutRef.current) {
        clearTimeout(markdownTimeoutRef.current);
      }
      if (guiTimeoutRef.current) {
        clearTimeout(guiTimeoutRef.current);
      }
    };
  }, []);
  return {
    components,
    markdown,
    lastUpdateOrigin,
    guiSequence,
    markdownSequence,
    syncStatus,
    parseErrors,
    updateMarkdown,
    updateComponents,
    reset
  };
}

// src/lib/cursor-manager.ts
function saveCursorPosition(textareaRef) {
  const textarea = textareaRef.current;
  if (!textarea) return null;
  return {
    start: textarea.selectionStart,
    end: textarea.selectionEnd
  };
}
function restoreCursorPosition(textareaRef, position) {
  if (!position) return;
  const textarea = textareaRef.current;
  if (!textarea) return;
  requestAnimationFrame(() => {
    try {
      textarea.setSelectionRange(position.start, position.end);
    } catch (error) {
      console.debug("Failed to restore cursor position:", error);
    }
  });
}
function preserveCursor(textareaRef, updateFn) {
  const position = saveCursorPosition(textareaRef);
  updateFn();
  restoreCursorPosition(textareaRef, position);
}
function isActivelyEditing(element) {
  if (!element) return false;
  return document.activeElement === element && (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.getAttribute("contenteditable") === "true");
}

// src/lib/markdown-updater.ts
function parseMarkdownLines(markdown) {
  const lines = markdown.split("\n");
  const result = [];
  let currentGroup = null;
  lines.forEach((content, index) => {
    var _a;
    const lineNumber = index + 1;
    const trimmed = content.trim();
    const nextLine = (_a = lines[index + 1]) == null ? void 0 : _a.trim();
    const hasGroupItems = nextLine == null ? void 0 : nextLine.startsWith("- ");
    if (trimmed.match(/^\*[^*]+:\*\s+.+$/) && hasGroupItems) {
      const match = trimmed.match(/^\*([^*]+):\*/);
      if (match) {
        const groupLabel = match[1];
        currentGroup = groupLabel;
        result.push({
          content,
          lineNumber,
          isComponent: true,
          componentLabel: groupLabel,
          isGroupHeader: true,
          groupLabel
        });
        return;
      }
    }
    if (trimmed.match(/^\*[^*]+:\*$/)) {
      const groupLabel = trimmed.slice(1, -2);
      currentGroup = groupLabel;
      result.push({
        content,
        lineNumber,
        isComponent: true,
        // Treat as component so we can target it
        componentLabel: groupLabel,
        // This allows matching "Checkbox Group"
        isGroupHeader: true,
        groupLabel
      });
      return;
    }
    if (currentGroup && (trimmed.startsWith("[x] ") || trimmed.startsWith("[ ] "))) {
      const itemContent = trimmed.slice(4);
      const componentLabel2 = extractComponentLabel(itemContent) || itemContent;
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel: componentLabel2,
        isGroupItem: true,
        groupLabel: currentGroup
      });
      return;
    }
    if (currentGroup && trimmed.startsWith("- ")) {
      const itemContent = trimmed.slice(2);
      const componentLabel2 = extractComponentLabel(itemContent);
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel: componentLabel2,
        isGroupItem: true,
        groupLabel: currentGroup
      });
      return;
    }
    const componentLabel = extractComponentLabel(trimmed);
    if (componentLabel) {
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel,
        isGroupHeader: false,
        isGroupItem: false
      });
      return;
    }
    if (!trimmed && currentGroup) {
      currentGroup = null;
    }
    result.push({
      content,
      lineNumber,
      isComponent: false
    });
  });
  return result;
}
function extractComponentLabel(line) {
  const fieldMatch = line.match(/^\*([^*]+):\*/);
  if (fieldMatch) return fieldMatch[1];
  if (line.match(/^\[[^\s\]].+\]$/)) {
    const buttonMatch = line.match(/^\[([^\]]+)\]/);
    if (buttonMatch) return buttonMatch[1];
  }
  if (line.startsWith("[x] ") || line.startsWith("[ ] ")) {
    return line.slice(4).trim();
  }
  if (line && !line.startsWith("*") && !line.startsWith("[")) {
    return line;
  }
  return void 0;
}
function updateMarkdownLine(markdown, componentLabel, newValue, componentType) {
  console.log("[updateMarkdownLine]", { componentLabel, newValue, componentType });
  const lines = parseMarkdownLines(markdown);
  console.log("[updateMarkdownLine] Parsed lines:", lines.filter((l) => l.isComponent).map((l) => ({ label: l.componentLabel, type: l.isGroupHeader ? "header" : "component" })));
  const lineIndex = lines.findIndex(
    (line2) => line2.isComponent && line2.componentLabel === componentLabel
  );
  if (lineIndex === -1) {
    console.warn(`Component not found in markdown: ${componentLabel}`);
    console.warn("Looking for:", componentLabel);
    console.warn("Available components:", lines.filter((l) => l.isComponent).map((l) => l.componentLabel));
    return markdown;
  }
  console.log("[updateMarkdownLine] Found component at line", lineIndex, ":", lines[lineIndex]);
  const line = lines[lineIndex];
  if ((componentType === "radiogroup" || componentType === "select") && line.isGroupHeader) {
    const markdownLines2 = markdown.split("\n");
    markdownLines2[lineIndex] = `*${componentLabel}:* ${newValue}`;
    return markdownLines2.join("\n");
  }
  if ((componentType === "checkboxgroup" || componentType === "combobox" || componentType === "togglegroup") && line.isGroupHeader) {
    return updateGroupLines(markdown, lines, lineIndex, newValue, componentType);
  }
  const updatedContent = generateComponentLine(
    componentLabel,
    newValue,
    componentType,
    line.isGroupItem || false
  );
  const markdownLines = markdown.split("\n");
  markdownLines[lineIndex] = updatedContent;
  return markdownLines.join("\n");
}
function updateGroupLines(markdown, parsedLines, headerIndex, newValue, componentType) {
  const markdownLines = markdown.split("\n");
  const groupLabel = parsedLines[headerIndex].groupLabel;
  const selectedValues = Array.isArray(newValue) ? newValue : newValue.split(",").map((v) => v.trim()).filter(Boolean);
  const groupItemIndices = [];
  for (let i = headerIndex + 1; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    if (line.groupLabel === groupLabel && line.isGroupItem) {
      groupItemIndices.push(i);
    } else if (line.groupLabel !== groupLabel) {
      break;
    }
  }
  groupItemIndices.forEach((i) => {
    const line = parsedLines[i];
    const itemLabel = line.componentLabel || "";
    const isChecked = componentType === "radiogroup" || componentType === "select" ? itemLabel === newValue : selectedValues.includes(itemLabel);
    markdownLines[i] = `[${isChecked ? "x" : " "}] ${itemLabel}`;
  });
  return markdownLines.join("\n");
}
function generateComponentLine(label, value, type, isGroupItem) {
  let line = "";
  switch (type) {
    case "input":
    case "textarea":
    case "date":
    case "daterange":
      line = `*${label}:* ${value}`;
      break;
    case "switch":
      line = `*${label}:* ${value}`;
      break;
    case "radiogroup":
    case "select":
      line = `*${label}:* ${value}`;
      break;
    case "checkbox":
    case "checkbox-item":
      const isChecked = value === "true" || String(value) === "true";
      line = `[${isChecked ? "x" : " "}] ${label}`;
      break;
    case "button":
      line = `[${label}]`;
      break;
    default:
      line = `*${label}:* ${value}`;
  }
  if (isGroupItem) {
    if (type === "checkbox" || type === "checkbox-item") ; else {
      line = `- ${line}`;
    }
  }
  return line;
}
function formatValueForMarkdown(value, type) {
  switch (type) {
    case "switch":
      return value ? "yes" : "no";
    case "checkbox":
      return "";
    // Checkboxes don't have values in markdown
    case "date":
    case "daterange":
      return value || "";
    default:
      return String(value || "");
  }
}

exports.Button = Button;
exports.Calendar = Calendar;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.CheckboxGroupItem = CheckboxGroupItem;
exports.ComboBox = ComboBox;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.Input = Input;
exports.InstantiatedForm = InstantiatedForm;
exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.ResizablePane = ResizablePane;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Switch = Switch;
exports.SyncReconciler = SyncReconciler;
exports.Textarea = Textarea;
exports.Toggle = Toggle;
exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
exports.buildAST = buildAST;
exports.buttonVariants = buttonVariants;
exports.clearParseCache = clearParseCache;
exports.cn = cn;
exports.createSyncReconciler = createSyncReconciler;
exports.diffComponents = diffComponents;
exports.diffMarkdown = diffMarkdown;
exports.extractValues = extractValues;
exports.filterBlanks = filterBlanks;
exports.formatValueForMarkdown = formatValueForMarkdown;
exports.generateMarkdownForElement = generateMarkdownForElement;
exports.generateMarkdownFromComponent = generateMarkdownFromComponent;
exports.generateMarkdownFromComponents = generateMarkdownFromComponents;
exports.generateMarkdownWithMapping = generateMarkdownWithMapping;
exports.getUnknownTokens = getUnknownTokens;
exports.inferComponentType = inferComponentType;
exports.inferGroupType = inferGroupType;
exports.instantiateComponents = instantiateComponents;
exports.isActivelyEditing = isActivelyEditing;
exports.isBooleanValue = isBooleanValue;
exports.isRegularButton = isRegularButton;
exports.mapASTToComponents = mapASTToComponents;
exports.normalizeMarkdown = normalizeMarkdown;
exports.parse = parse;
exports.parseBooleanValue = parseBooleanValue;
exports.parseMarkdownLines = parseMarkdownLines;
exports.parseToComponents = parseToComponents;
exports.parseWithCache = parseWithCache;
exports.preserveCursor = preserveCursor;
exports.restoreCursorPosition = restoreCursorPosition;
exports.saveCursorPosition = saveCursorPosition;
exports.toggleVariants = toggleVariants;
exports.tokenize = tokenize;
exports.updateMarkdownIncremental = updateMarkdownIncremental;
exports.updateMarkdownLine = updateMarkdownLine;
exports.useBidirectionalSync = useBidirectionalSync;
exports.validateAST = validateAST;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map