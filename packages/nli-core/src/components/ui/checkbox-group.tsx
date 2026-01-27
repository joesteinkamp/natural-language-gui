"use client"

import * as React from "react"
import { Checkbox } from "./checkbox"
import { cn } from "../../lib/utils"

type CheckboxGroupContextValue = {
  value: string[]
  onValueChange: (value: string[]) => void
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | undefined>(undefined)

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void
  }
>(({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || [])
  
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue

  const handleValueChange = React.useCallback(
    (newValue: string[]) => {
      if (!controlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [controlled, onValueChange]
  )

  return (
    <CheckboxGroupContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={cn("grid gap-2", className)} ref={ref} {...props}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
})
CheckboxGroup.displayName = "CheckboxGroup"

const CheckboxGroupItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, "checked" | "onCheckedChange"> & {
    value: string
  }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error("CheckboxGroupItem must be used within a CheckboxGroup")
  }

  const checked = context.value.includes(value)

  return (
    <Checkbox
      ref={ref}
      className={className}
      checked={checked}
      onCheckedChange={(checked) => {
        if (checked) {
          context.onValueChange([...context.value, value])
        } else {
          context.onValueChange(context.value.filter((item) => item !== value))
        }
      }}
      {...props}
    />
  )
})
CheckboxGroupItem.displayName = "CheckboxGroupItem"

export { CheckboxGroup, CheckboxGroupItem }
