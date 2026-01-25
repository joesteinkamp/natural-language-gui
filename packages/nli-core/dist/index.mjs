import * as React14 from 'react';
import { forwardRef, createElement } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Search, Circle, ChevronDown, ChevronUp, Check, ChevronLeft, ChevronRight, ChevronsUpDown, CalendarIcon } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { DayPicker } from 'react-day-picker';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Command as Command$1 } from 'cmdk';
import { parseISO, isValid, format } from 'date-fns';

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
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
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
var Button = React14.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, size, asChild = false, label } = _b, props = __objRest(_b, ["className", "variant", "size", "asChild", "label"]);
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
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
var ButtonGroup = React14.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, orientation = "horizontal", label, children } = _b, props = __objRest(_b, ["className", "orientation", "label", "children"]);
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "flex flex-col gap-2",
          className
        )
      }, props), {
        children: [
          label && /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label }),
          /* @__PURE__ */ jsx("div", { className: cn(
            "flex gap-2",
            orientation === "vertical" ? "flex-col" : "flex-row"
          ), children: React14.Children.map(children, (child) => {
            if (React14.isValidElement(child)) {
              return React14.cloneElement(child, __spreadValues({
                label,
                value: child.props.children
              }, child.props));
            }
            return child;
          }) })
        ]
      })
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";
var Input = React14.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
    return /* @__PURE__ */ jsx(
      "input",
      __spreadValues({
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-200",
          className
        ),
        ref
      }, props)
    );
  }
);
Input.displayName = "Input";
var Textarea = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, label, id } = _b, props = __objRest(_b, ["className", "label", "id"]);
  const generatedId = React14.useId();
  const componentId = id || generatedId;
  const textarea = /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-1.5", children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", htmlFor: componentId, children: label }),
      textarea
    ] });
  }
  return textarea;
});
Textarea.displayName = "Textarea";
var Switch = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    SwitchPrimitives.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )
    }, props), {
      ref,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitives.Thumb,
        {
          className: cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    })
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;
var toggleVariants = cva(
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
var Toggle = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, variant, size } = _b, props = __objRest(_b, ["className", "variant", "size"]);
  return /* @__PURE__ */ jsx(
    TogglePrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(toggleVariants({ variant, size, className }))
    }, props), {
      children: props.children
    })
  );
});
Toggle.displayName = TogglePrimitive.Root.displayName;
var ToggleGroupContext = React14.createContext({
  size: "default",
  variant: "default"
});
var ToggleGroup = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, variant, size, children } = _b, props = __objRest(_b, ["className", "variant", "size", "children"]);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn("flex items-center justify-center gap-1", className)
    }, props), {
      children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
    })
  );
});
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, children, variant, size } = _b, props = __objRest(_b, ["className", "children", "variant", "size"]);
  const context = React14.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
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
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
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
var CheckIcon = /* @__PURE__ */ forwardRef(function(_ref, forwardedRef) {
  var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$T);
  return createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), createElement("path", {
    d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
var _excluded$1r = ["color"];
var Cross2Icon = /* @__PURE__ */ forwardRef(function(_ref, forwardedRef) {
  var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, props = _objectWithoutPropertiesLoose(_ref, _excluded$1r);
  return createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), createElement("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
var Checkbox = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          className: cn("flex items-center justify-center text-current"),
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" })
        }
      )
    })
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var CheckboxGroupContext = React14.createContext(void 0);
var CheckboxGroup = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, value, defaultValue, onValueChange, children } = _b, props = __objRest(_b, ["className", "value", "defaultValue", "onValueChange", "children"]);
  const [internalValue, setInternalValue] = React14.useState(defaultValue || []);
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const handleValueChange = React14.useCallback(
    (newValue) => {
      if (!controlled) {
        setInternalValue(newValue);
      }
      onValueChange == null ? void 0 : onValueChange(newValue);
    },
    [controlled, onValueChange]
  );
  return /* @__PURE__ */ jsx(
    CheckboxGroupContext.Provider,
    {
      value: {
        value: currentValue,
        onValueChange: handleValueChange
      },
      children: /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({ className: cn("grid gap-2", className), ref }, props), { children }))
    }
  );
});
CheckboxGroup.displayName = "CheckboxGroup";
var CheckboxGroupItem = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, value } = _b, props = __objRest(_b, ["className", "value"]);
  const context = React14.useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error("CheckboxGroupItem must be used within a CheckboxGroup");
  }
  const checked = context.value.includes(value);
  return /* @__PURE__ */ jsx(
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
var RadioGroup = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    __spreadProps(__spreadValues({
      className: cn("grid gap-2", className)
    }, props), {
      ref
    })
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    })
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
    })
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
    })
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
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
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    __spreadValues({
      ref,
      className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
    }, props)
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
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
  return /* @__PURE__ */ jsx(
    DayPicker,
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
          const Icon2 = orientation === "left" ? ChevronLeft : ChevronRight;
          return /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4" });
        }
      }
    }, props)
  );
}
Calendar.displayName = "Calendar";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, align = "center", sideOffset = 4 } = _b, props = __objRest(_b, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
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
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React14.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
var DialogTitle = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function ComboBox({
  options,
  value = [],
  onChange,
  label,
  placeholder = "Select options...",
  "nli-markdown": nliMarkdown
}) {
  const [open, setOpen] = React14.useState(false);
  const [selectedValues, setSelectedValues] = React14.useState(value);
  const triggerRef = React14.useRef(null);
  React14.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx("span", { className: "truncate", children: displayValue }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }),
          /* @__PURE__ */ jsx("div", { className: "hidden", children: selectedLabels.map((l) => /* @__PURE__ */ jsx("span", { "nli-markdown": l }, l)) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0", align: "start", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: `Search ${(label == null ? void 0 : label.toLowerCase()) || "options"}...` }),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No options found." }),
        /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs(
          CommandItem,
          {
            value: option.value,
            onSelect: handleSelect,
            children: [
              /* @__PURE__ */ jsx(
                Check,
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
var Command = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    Command$1,
    __spreadValues({
      ref,
      className: cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )
    }, props)
  );
});
Command.displayName = Command$1.displayName;
var CommandInput = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ jsx(
      Command$1.Input,
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
CommandInput.displayName = Command$1.Input.displayName;
var CommandList = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    Command$1.List,
    __spreadValues({
      ref,
      className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)
    }, props)
  );
});
CommandList.displayName = Command$1.List.displayName;
var CommandEmpty = React14.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  __spreadValues({
    ref,
    className: "py-6 text-center text-sm"
  }, props)
));
CommandEmpty.displayName = Command$1.Empty.displayName;
var CommandGroup = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    __spreadValues({
      ref,
      className: cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )
    }, props)
  );
});
CommandGroup.displayName = Command$1.Group.displayName;
var CommandItem = React14.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )
    }, props)
  );
});
CommandItem.displayName = Command$1.Item.displayName;

// src/parser/tokenizer.ts
var PATTERNS = {
  // *Label:* value or *Label [type]:* value
  FIELD: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(.+)$/,
  // *Label:* yes/no or *Label [type]:* yes/no
  BOOLEAN: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(yes|no)$/,
  // *Label:* or *Label [type]:*
  GROUP_HEADER: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s*$/,
  // - item text or - *Item:* value or - *Item:* yes/no
  GROUP_ITEM: /^-\s(.+)$/,
  // [Action] or [Action] [Another]
  BUTTON: /^\[.+\]$/,
  // Plain text (checkbox)
  PLAIN_TEXT: /^[^*\-\[].*$/,
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
  if (PATTERNS.PLAIN_TEXT.test(trimmed)) {
    return {
      type: "CHECKBOX",
      line: trimmed,
      lineNumber,
      value: trimmed
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
    (child) => child.value !== void 0 && child.value !== "true"
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
  var _a, _b;
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
        label: token.value || "",
        value: "true",
        // Checked (since it appears in output)
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
  while (i < tokens.length && tokens[i].type === "GROUP_ITEM") {
    const item = tokens[i];
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
        // Checked/selected (since it appears)
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
      if (node.label) {
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
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
          placeholder: node.label
        }),
        key: generateKey(node, index)
      };
    case "textarea":
      return {
        type: "textarea",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: node.value || "",
          placeholder: node.label
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
      const allSelected = (_e = node.children) == null ? void 0 : _e.every((child) => child.value === "true");
      const selectedItem = !allSelected ? (_f = node.children) == null ? void 0 : _f.find((child) => child.value === "true") : void 0;
      const defaultValue = allSelected && ((_g = node.children) == null ? void 0 : _g[0]) ? node.children[0].label : (selectedItem == null ? void 0 : selectedItem.label) || void 0;
      return {
        type: "radiogroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue
        }),
        children: (_h = node.children) == null ? void 0 : _h.map((child, i) => ({
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
      const allSelectedInSelect = (_i = node.children) == null ? void 0 : _i.every((child) => child.value === "true");
      return {
        type: "select",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: allSelectedInSelect && ((_j = node.children) == null ? void 0 : _j[0]) ? node.children[0].label : void 0
        }),
        children: (_k = node.children) == null ? void 0 : _k.map((child, i) => ({
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
      const defaultToggled = ((_l = node.children) == null ? void 0 : _l.filter((child) => parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "togglegroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          type: "multiple",
          defaultValue: defaultToggled
        }),
        children: (_m = node.children) == null ? void 0 : _m.map((child, i) => ({
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
      const defaultChecked = ((_n = node.children) == null ? void 0 : _n.filter((child) => child.value === "true" || parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "checkboxgroup",
        props: __spreadProps(__spreadValues({}, baseProps), {
          defaultValue: defaultChecked
        }),
        children: (_o = node.children) == null ? void 0 : _o.map((child, i) => ({
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
      const selectedValues = ((_p = node.children) == null ? void 0 : _p.filter((child) => child.value === "true" || parseBooleanValue(child.value || "no")).map((child) => child.label)) || [];
      return {
        type: "combobox",
        props: __spreadProps(__spreadValues({}, baseProps), {
          label: node.label,
          options: ((_q = node.children) == null ? void 0 : _q.map((child) => ({
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
function renderComponent(mapped) {
  const { type, props, children, key } = mapped;
  switch (type) {
    case "input":
      return /* @__PURE__ */ jsx(Input, __spreadValues({}, props), key);
    case "textarea":
      return /* @__PURE__ */ jsx(Textarea, __spreadValues({}, props), key);
    case "checkbox":
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Checkbox, __spreadValues({}, props)),
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: props["nli-markdown"] })
      ] }, key);
    case "switch":
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Switch, __spreadValues({}, props)),
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: props["nli-markdown"] })
      ] }, key);
    case "button":
      return /* @__PURE__ */ jsx(Button, __spreadProps(__spreadValues({}, props), { children: props["nli-markdown"] }), key);
    case "date":
      return /* @__PURE__ */ jsx(DatePickerComponent, __spreadValues({}, props), key);
    case "daterange":
      return /* @__PURE__ */ jsx(DateRangePickerComponent, __spreadValues({}, props), key);
    case "radiogroup":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsx(RadioGroup, __spreadProps(__spreadValues({ defaultValue: props.defaultValue }, props), { children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(RadioGroupItem, __spreadValues({ value: child.props.value }, child.props)),
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: child.props["nli-markdown"] })
        ] }, child.key)) }))
      ] }, key);
    case "select":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsxs(Select, __spreadProps(__spreadValues({ defaultValue: props.defaultValue }, props), { children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: `Select ${props["nli-markdown"]}` }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsx(SelectItem, __spreadProps(__spreadValues({ value: child.props.value }, child.props), { children: child.props["nli-markdown"] }), child.key)) })
        ] }))
      ] }, key);
    case "combobox":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsx(ComboBox, __spreadValues({ options: props.options || [] }, props))
      ] }, key);
    case "togglegroup":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", "nli-group-label": props["nli-markdown"], children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsx(ToggleGroup, __spreadProps(__spreadValues({ type: "multiple", defaultValue: props.defaultValue }, props), { children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsx(ToggleGroupItem, __spreadProps(__spreadValues({ value: child.props.value }, child.props), { children: child.props.value }), child.key)) }))
      ] }, key);
    case "checkboxgroup":
      return /* @__PURE__ */ jsxs("div", { className: "space-y-2", "nli-group-label": props["nli-markdown"], children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
        /* @__PURE__ */ jsx(CheckboxGroup, __spreadProps(__spreadValues({ defaultValue: props.defaultValue }, props), { children: children == null ? void 0 : children.map((child) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(CheckboxGroupItem, __spreadValues({ value: child.props.value }, child.props)),
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: child.props["nli-markdown"] })
        ] }, child.key)) }))
      ] }, key);
    default:
      return null;
  }
}
function safeParseDate(value) {
  if (!value) return void 0;
  let date = parseISO(value);
  if (isValid(date)) return date;
  date = new Date(value);
  if (isValid(date)) return date;
  return void 0;
}
function DatePickerComponent(props) {
  const dateValue = props["data-date-value"];
  const [date, setDate] = React14.useState(
    safeParseDate(dateValue)
  );
  React14.useEffect(() => {
    setDate(safeParseDate(dateValue));
  }, [dateValue]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
    /* @__PURE__ */ jsxs(Popover, { children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        __spreadProps(__spreadValues({
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )
        }, props), {
          "data-date-value": date ? format(date, "yyyy-MM-dd") : "",
          children: [
            /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
            date ? format(date, "MMMM dd, yyyy") : /* @__PURE__ */ jsx("span", { children: "Pick a date" })
          ]
        })
      ) }),
      /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          selected: date,
          onSelect: setDate,
          initialFocus: true
        }
      ) })
    ] })
  ] });
}
function DateRangePickerComponent(props) {
  const fromValue = props["data-date-from"];
  const toValue = props["data-date-to"];
  const [dateRange, setDateRange] = React14.useState({
    from: safeParseDate(fromValue),
    to: safeParseDate(toValue)
  });
  React14.useEffect(() => {
    setDateRange({
      from: safeParseDate(fromValue),
      to: safeParseDate(toValue)
    });
  }, [fromValue, toValue]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: props["nli-markdown"] }),
    /* @__PURE__ */ jsxs(Popover, { children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        __spreadProps(__spreadValues({
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !dateRange.from && "text-muted-foreground"
          )
        }, props), {
          "data-date-from": dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "",
          "data-date-to": dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "",
          children: [
            /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
            dateRange.from ? dateRange.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
              format(dateRange.from, "MMM dd, yyyy"),
              " - ",
              format(dateRange.to, "MMM dd, yyyy")
            ] }) : format(dateRange.from, "MMM dd, yyyy") : /* @__PURE__ */ jsx("span", { children: "Pick a date range" })
          ]
        })
      ) }),
      /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "range",
          selected: dateRange,
          onSelect: setDateRange,
          numberOfMonths: 2,
          initialFocus: true
        }
      ) })
    ] })
  ] });
}
function instantiateComponents(components) {
  return components.map((component) => renderComponent(component)).filter(Boolean);
}
function InstantiatedForm({
  components,
  className
}) {
  const elements = instantiateComponents(components);
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-4", className), children: elements });
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
    const dateValue = element.getAttribute("data-date-value");
    if (!dateValue) return null;
    try {
      const date = parseISO(dateValue);
      if (isValid(date)) {
        return `*${label}:* ${format(date, "MMMM dd, yyyy")}`;
      } else {
        return `*${label}:* ${dateValue}`;
      }
    } catch (error) {
      console.warn("Invalid date format:", dateValue, error);
      return `*${label}:* ${dateValue}`;
    }
  },
  /**
   * Date range picker component
   * Format: "*Label Date Range:* Month DD, YYYY - Month DD, YYYY"
   */
  dateRange: (element, label) => {
    const from = element.getAttribute("data-date-from");
    const to = element.getAttribute("data-date-to");
    if (!from || !to) return null;
    try {
      const fromDate = parseISO(from);
      const toDate = parseISO(to);
      if (isValid(fromDate) && isValid(toDate)) {
        if (fromDate > toDate) {
          console.warn("Date range invalid: from date is after to date");
        }
        return `*${label} Date Range:* ${format(fromDate, "MMMM dd, yyyy")} - ${format(toDate, "MMMM dd, yyyy")}`;
      }
    } catch (error) {
      console.warn("Invalid date range format:", { from, to }, error);
    }
    return `*${label}:* ${from} - ${to}`;
  },
  /**
   * Checkbox component
   * Format: "Label" (only when checked)
   * Unchecked checkboxes are omitted
   */
  checkbox: (element, label) => {
    const state = element.getAttribute("data-state");
    return state === "checked" ? label : null;
  },
  /**
   * Radio button component
   * Format: "Label" (only when selected)
   * Unselected radio buttons are omitted
   */
  radio: (element, label) => {
    const state = element.getAttribute("data-state");
    return state === "checked" ? label : null;
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

export { Button, ButtonGroup, Calendar, Checkbox, CheckboxGroup, CheckboxGroupItem, ComboBox, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Input, InstantiatedForm, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Switch, Textarea, Toggle, ToggleGroup, ToggleGroupItem, buildAST, buttonVariants, cn, extractValues, filterBlanks, generateMarkdownForElement, getUnknownTokens, inferComponentType, inferGroupType, instantiateComponents, isBooleanValue, isRegularButton, mapASTToComponents, parse, parseBooleanValue, parseToComponents, toggleVariants, tokenize, validateAST };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map