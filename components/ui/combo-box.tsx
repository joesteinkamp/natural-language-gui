"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboBoxOption = {
  label: string
  value: string
}

export interface ComboBoxProps {
  options: ComboBoxOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  label?: string
  placeholder?: string
  "nli-markdown"?: string
}

export function ComboBox({
  options,
  value = [],
  onChange,
  label,
  placeholder = "Select options...",
  "nli-markdown": nliMarkdown,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setSelectedValues(value)
  }, [value])

  const handleSelect = (currentValue: string) => {
    let newValues: string[]
    if (selectedValues.includes(currentValue)) {
      newValues = selectedValues.filter((v) => v !== currentValue)
    } else {
      newValues = [...selectedValues, currentValue]
    }
    setSelectedValues(newValues)
    onChange?.(newValues)

    // Dispatch input event to trigger markdown update in parent if nli-markdown matches
    if (triggerRef.current) {
        setTimeout(() => {
            triggerRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
        }, 0);
    }
  }

  // Calculate distinct selected labels for display
  // Calculate distinct selected labels for display
  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label)
  
  const displayValue = selectedLabels.length > 0 
    ? selectedLabels.join(", ") 
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          nli-group-label={nliMarkdown || label}
          data-value={selectedValues.join(",")}
        >
          <span className="truncate">
            {displayValue}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {/* Hidden elements to generate the markdown list structure */}
          <div className="hidden">
            {selectedLabels.map(l => (
               <span key={l} nli-markdown={l} />
            ))}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label?.toLowerCase() || "options"}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
