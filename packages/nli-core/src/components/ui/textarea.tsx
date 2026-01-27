import * as React from "react"

import { cn } from "../../lib/utils"


const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
  const generatedId = React.useId()
  const componentId = id || generatedId

  const textarea = (
    <textarea
      id={componentId}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-base ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-200",
        className
      )}
      ref={ref}
      {...props}
      // @ts-ignore
      nli-markdown={label}
    />
  )

  if (label) {
    return (
      <div className="grid w-full gap-1.5">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={componentId}>{label}</label>
        {textarea}
      </div>
    )
  }

  return textarea
})
Textarea.displayName = "Textarea"

export { Textarea }
