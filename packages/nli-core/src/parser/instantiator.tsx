/**
 * Component Instantiator
 * Renders React components from mapped AST
 */

'use client'

import * as React from 'react'
import type { MappedComponent } from './component-mapper'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup, CheckboxGroupItem } from '@/components/ui/checkbox-group'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ComboBox } from '@/components/ui/combo-box'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO, isValid } from 'date-fns'
import { cn } from '@/lib/utils'

/**
 * Component map for rendering
 */
const COMPONENTS = {
  input: Input,
  textarea: Textarea,
  checkbox: Checkbox,
  checkboxgroup: CheckboxGroup,
  'checkbox-item': CheckboxGroupItem,
  switch: Switch,
  button: Button,
  radiogroup: RadioGroup,
  'radio-item': RadioGroupItem,
  select: Select,
  'select-item': SelectItem,

  togglegroup: ToggleGroup,
  'toggle-item': ToggleGroupItem,
  combobox: ComboBox,
}

/**
 * Render a single mapped component
 */
function renderComponent(mapped: MappedComponent): React.ReactElement | null {
  const { type, props, children, key } = mapped

  switch (type) {
    case 'input':
      return <Input key={key} {...props} />

    case 'textarea':
      return <Textarea key={key} {...props} />

    case 'checkbox':
      return (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox {...props} />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {props['nli-markdown']}
          </label>
        </div>
      )

    case 'switch':
      return (
        <div key={key} className="flex items-center space-x-2">
          <Switch {...props} />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {props['nli-markdown']}
          </label>
        </div>
      )

    case 'button':
      return (
        <Button key={key} {...props}>
          {props['nli-markdown']}
        </Button>
      )

    case 'date':
      return <DatePickerComponent key={key} {...props} />

    case 'daterange':
      return <DateRangePickerComponent key={key} {...props} />

    case 'radiogroup':
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <RadioGroup defaultValue={props.defaultValue} {...props}>
            {children?.map((child) => (
              <div key={child.key} className="flex items-center space-x-2">
                <RadioGroupItem value={child.props.value} {...child.props} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {child.props['nli-markdown']}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )

    case 'select':
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <Select defaultValue={props.defaultValue} {...props}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${props['nli-markdown']}`} />
            </SelectTrigger>
            <SelectContent>
              {children?.map((child) => (
                <SelectItem key={child.key} value={child.props.value} {...child.props}>
                  {child.props['nli-markdown']}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )

    case 'combobox':
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <ComboBox options={props.options || []} {...props} />
        </div>
      )

    case 'togglegroup':
      return (
        <div key={key} className="space-y-2" nli-group-label={props['nli-markdown']}>
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <ToggleGroup type="multiple" defaultValue={props.defaultValue} {...props}>
            {children?.map((child) => (
              <ToggleGroupItem key={child.key} value={child.props.value} {...child.props}>
                {child.props.value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )

    case 'checkboxgroup':
      return (
        <div key={key} className="space-y-2" nli-group-label={props['nli-markdown']}>
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <CheckboxGroup defaultValue={props.defaultValue} {...props}>
            {children?.map((child) => (
              <div key={child.key} className="flex items-center space-x-2">
                <CheckboxGroupItem value={child.props.value} {...child.props} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {child.props['nli-markdown']}
                </label>
              </div>
            ))}
          </CheckboxGroup>
        </div>
      )

    default:
      return null
  }
}

/**
 * Safely parse a date string (ISO or natural)
 */
function safeParseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  
  // Try ISO parsing first
  let date = parseISO(value)
  if (isValid(date)) return date
  
  // Try native Date parsing (for things like "February 14, 2024")
  date = new Date(value)
  if (isValid(date)) return date
  
  return undefined
}

/**
 * Date Picker Component (using Popover + Calendar)
 */
function DatePickerComponent(props: any) {
  const dateValue = props['data-date-value']
  const [date, setDate] = React.useState<Date | undefined>(
    safeParseDate(dateValue)
  )

  // Update internal state if props change (handled by key in parent usually, but good practice)
  React.useEffect(() => {
    setDate(safeParseDate(dateValue))
  }, [dateValue])

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{props['nli-markdown']}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            {...props}
            data-date-value={date ? format(date, 'yyyy-MM-dd') : ''}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'MMMM dd, yyyy') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Date Range Picker Component (using Popover + Calendar)
 */
function DateRangePickerComponent(props: any) {
  const fromValue = props['data-date-from']
  const toValue = props['data-date-to']

  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
    from: safeParseDate(fromValue),
    to: safeParseDate(toValue),
  })

  // Update internal state if props change
  React.useEffect(() => {
    setDateRange({
      from: safeParseDate(fromValue),
      to: safeParseDate(toValue),
    })
  }, [fromValue, toValue])

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{props['nli-markdown']}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateRange.from && 'text-muted-foreground'
            )}
            {...props}
            data-date-from={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
            data-date-to={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'MMM dd, yyyy')} - {format(dateRange.to, 'MMM dd, yyyy')}
                </>
              ) : (
                format(dateRange.from, 'MMM dd, yyyy')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange as any}
            onSelect={setDateRange as any}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Render an array of mapped components
 *
 * @param components - Array of mapped components from AST
 * @returns Array of rendered React elements
 */
export function instantiateComponents(
  components: MappedComponent[]
): React.ReactElement[] {
  return components.map((component) => renderComponent(component)).filter(Boolean) as React.ReactElement[]
}

/**
 * Render components with a wrapper
 *
 * @param components - Array of mapped components
 * @param className - Optional className for wrapper
 * @returns Wrapped React element
 */
export function InstantiatedForm({
  components,
  className,
}: {
  components: MappedComponent[]
  className?: string
}) {
  const elements = instantiateComponents(components)

  return (
    <div className={cn('space-y-4', className)}>
      {elements}
    </div>
  )
}
