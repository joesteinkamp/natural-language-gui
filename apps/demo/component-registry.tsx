"use client"

import * as React from "react"




import {
  Button,
  ButtonGroup,
  Calendar as CalendarPrimitive,
  cn,
} from "@natural-language-gui/core"
import { CalendarIcon } from "lucide-react"
import { format, addDays } from "date-fns"
import { DateRange } from "react-day-picker"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"



import {
  ComboBox,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
} from "@natural-language-gui/core"






import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@natural-language-gui/core"





import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from "@radix-ui/react-icons"

export type RegistryEntry = {
  component: React.ElementType
  props?: Record<string, any>
  children?: React.ReactNode
}

export const componentRegistry: Record<string, RegistryEntry> = {






  "Button": {
    component: Button,
    props: { "nli-markdown": "Start" },
    children: "Start"
  },
  "ButtonGroup": {
    component: ButtonGroup,
    props: {
        label: "My Buttons",
        orientation: "horizontal"
    },
    children: [
            <Button key="1" nli-markdown="Action 1">Action 1</Button>,
            <Button key="2" nli-markdown="Action 2">Action 2</Button>
    ]
  },
  "Calendar": {
    component: ({ mode = "single", "nli-markdown": nliMarkdown, ...props }: any) => {
        const [date, setDate] = React.useState<Date | DateRange | undefined>(
            mode === "range" 
                ? { from: new Date(), to: addDays(new Date(), 7) }
                : new Date()
        )
        const triggerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            if (triggerRef.current) {
                // Dispatch input event to trigger markdown update in parent
                setTimeout(() => {
                    triggerRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
                }, 0);
            }
        }, [date]);

        const dataProps = mode === "range" 
            ? {
                "data-date-from": (date as DateRange)?.from?.toISOString(),
                "data-date-to": (date as DateRange)?.to?.toISOString()
              }
            : {
                "data-date-value": (date as Date)?.toISOString()
              }

        return (
            <div 
                ref={triggerRef} 
                className="inline-block"
                nli-markdown={nliMarkdown}
                {...dataProps}
            >
                <CalendarPrimitive
                    mode={mode}
                    selected={date}
                    onSelect={setDate as any}
                    className="rounded-md border"
                    {...props}
                />
            </div>
        )
    },
    props: {
        mode: "single",
        "nli-markdown": "Calendar"
    }
  },


  "Checkbox": {
    component: ({ label, ...props }: any) => (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...props} />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="terms">{label}</label>
      </div>
    ),
    props: {
      "nli-markdown": "Accept terms and conditions",
      label: "Accept terms and conditions"
    }
  },

  "CheckboxGroup": {
    component: (props: any) => (
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{props.label}</label>
        <CheckboxGroup defaultValue={["option-one"]} nli-group-label={props.label} {...props}>
          <div className="flex items-center space-x-2">
            <CheckboxGroupItem value="option-one" id="option-one-cb" nli-markdown="Option One" />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="option-one-cb">Option One</label>
          </div>
          <div className="flex items-center space-x-2">
            <CheckboxGroupItem value="option-two" id="option-two-cb" nli-markdown="Option Two" />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="option-two-cb">Option Two</label>
          </div>
           <div className="flex items-center space-x-2">
            <CheckboxGroupItem value="option-three" id="option-three-cb" nli-markdown="Option Three" />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="option-three-cb">Option Three</label>
          </div>
        </CheckboxGroup>
      </div>
    ),
    props: {
      label: "Interests"
    }
  },

  "ComboBox": {
    component: ({ "nli-markdown": nliMarkdown, ...props }: any) => {
        const [value, setValue] = React.useState<string[]>([])
        return (
            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{props.label}</label>
                <ComboBox 
                    value={value} 
                    onChange={setValue} 
                    nli-markdown={nliMarkdown}
                    {...props} 
                />
            </div>
        )
    },
    props: {
        label: "Skills",
        options: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
            { label: "Next.js", value: "nextjs" }
        ],
        "nli-markdown": "Skills"
    }
  },

  "DatePicker": {
    component: ({ "nli-markdown": nliMarkdown, ...props }: any) => {
        const [date, setDate] = React.useState<Date>()
        const triggerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            if (date && triggerRef.current) {
                // Dispatch input event to trigger markdown update in parent
                setTimeout(() => {
                    triggerRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
                }, 0);
            }
        }, [date]);

        return (
            <div 
                ref={triggerRef} 
                className="grid gap-2" 
                nli-markdown={nliMarkdown}
                data-date-value={date ? date.toISOString() : undefined}
            >
                <Popover {...props}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={`w-[280px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <CalendarPrimitive
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        )
    },
    props: {
        "nli-markdown": "Due Date"
    }
  },


  "DateRangePicker": {
    component: ({ className, "nli-markdown": nliMarkdown, ...props }: any) => {
        const [date, setDate] = React.useState<DateRange | undefined>({
            from: new Date(),
            to: addDays(new Date(), 20),
        })
        const triggerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            if (date && triggerRef.current) {
                // Dispatch input event to trigger markdown update in parent
                // Timeout ensures the DOM attribute is updated before event fires
                setTimeout(() => {
                    triggerRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
                }, 0);
            }
        }, [date]);

        return (
            <div 
                ref={triggerRef} 
                className={cn("grid gap-2", className)}
                nli-markdown={nliMarkdown}
                data-date-from={date?.from?.toISOString()}
                data-date-to={date?.to?.toISOString()}
            >
                <Popover {...props}>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <CalendarPrimitive
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
            </div>
        )
    },
    props: {
        "nli-markdown": "Travel"
    }
  },


  "Input": {
    component: ({ label, ...props }: any) => {
      const id = React.useId()
      return (
        <div className="grid w-full gap-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>{label}</label>
          <Input type="text" id={id} {...props} />
        </div>
      )
    },
    props: {
        "nli-markdown": "Project Goal",
        defaultValue: "Pitch a new deal",
        label: "Project Goal"
    }
  },




  "RadioGroup": {
    component: (props: any) => (
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{props.label}</label>
        <RadioGroup defaultValue="option-one" {...props}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" nli-markdown={`*${props.label}:* Option One`} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="option-one">Option One</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" nli-markdown={`*${props.label}:* Option Two`} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="option-two">Option Two</label>
          </div>
        </RadioGroup>
      </div>
    ),
    props: {
      label: "Options"
    }
  },

  "Select": {
    component: ({ "nli-markdown": nliMarkdown, options, placeholder, ...props }: any) => {
      const [value, setValue] = React.useState<string>(props.defaultValue || "")
      const triggerRef = React.useRef<HTMLButtonElement>(null);

      // Find label for markdown
      const selectedOption = options?.find((opt: any) => opt.value === value);
      const selectedLabel = selectedOption ? selectedOption.label : undefined;

      return (
        <Select 
            value={value} 
            onValueChange={(newValue) => {
                setValue(newValue);
                // Dispatch input event to trigger markdown update in parent
                setTimeout(() => {
                    triggerRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
                }, 0);
                props.onValueChange?.(newValue);
            }} 
            {...props}
        >
          <SelectTrigger 
            ref={triggerRef} 
            className="w-[180px]" 
            nli-group-label={nliMarkdown}
          >
            <SelectValue placeholder={placeholder} />
            {/* Hidden element for markdown */}
            {selectedLabel && (
                <span className="hidden" nli-markdown={selectedLabel} />
            )}
          </SelectTrigger>
          <SelectContent>
            {options?.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    props: {
        "nli-markdown": "Theme",
        placeholder: "Theme",
        options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "System", value: "system" }
        ]
    }
  },

  "Switch": {
    component: ({ label, ...props }: any) => (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" nli-markdown={label} {...props} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="airplane-mode">{label}</label>
        </div>
    ),
    props: {
        label: "Airplane Mode"
    }
  },


  "Textarea": {
    component: ({ label, ...props }: any) => {
      const id = React.useId()
      return (
        <div className="grid w-full gap-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>{label}</label>
          <Textarea id={id} {...props} />
        </div>
      )
    },
    props: {
      placeholder: "Type your message here.",
      label: "Bio",
      defaultValue: "I'm a product designer fueled by a desire to innovate with new technologies through experimentation.\n\nI specialize in bridging design and code to create novel user experiences. In my free time, I enjoy prototyping with emerging frameworks and exploring new interaction paradigms."
    }
  },
  "Toggle": {
    component: (props: any) => (
        <Toggle aria-label="Toggle bookmark" nli-markdown="Bookmark" {...props}>
            Bookmark
        </Toggle>
    )
  },
  "ToggleGroup": {
    component: (props: any) => (
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Include</label>
         <ToggleGroup type="multiple" nli-group-label="Include" {...props}>
          <ToggleGroupItem value="docx" aria-label="Toggle docx" nli-markdown="docx">
            docx
          </ToggleGroupItem>
          <ToggleGroupItem value="pdf" aria-label="Toggle pdf" nli-markdown="pdf">
            pdf
          </ToggleGroupItem>
          <ToggleGroupItem value="xlsx" aria-label="Toggle xlsx" nli-markdown="xlsx">
            xlsx
          </ToggleGroupItem>
          <ToggleGroupItem value="pptx" aria-label="Toggle pptx" nli-markdown="pptx">
            pptx
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    )
  },

}
