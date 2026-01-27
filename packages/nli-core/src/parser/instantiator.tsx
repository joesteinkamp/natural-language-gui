/**
 * Component Instantiator
 * Renders React components from mapped AST
 */

'use client'

import * as React from 'react'
import type { MappedComponent } from './component-mapper'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { CheckboxGroup, CheckboxGroupItem } from '../components/ui/checkbox-group'
import { Switch } from '../components/ui/switch'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group'
import { ComboBox } from '../components/ui/combo-box'
import { Calendar } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO, isValid } from 'date-fns'
import { cn } from '../lib/utils'

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
function renderComponent(
  mapped: MappedComponent,
  onComponentChange?: (label: string, value: string, type: string) => void
): React.ReactElement | null {
  const { type, props, children, key } = mapped
  const label = props['nli-markdown']

  // Create onChange handler for this component
  const handleChange = (value: any) => {
    if (onComponentChange && label) {
      console.log('[instantiator] handleChange:', { label, value, type })
      // For arrays (combobox, checkboxgroup), convert to comma-separated string
      const stringValue = Array.isArray(value) ? value.join(',') : String(value)
      onComponentChange(label, stringValue, type)
    }
  }

  switch (type) {
    case 'input': {
      const { onChange: _unused, ...restProps } = props
      return (
        <Input
          key={key}
          {...restProps}
          onChange={(e) => {
            handleChange(e.target.value)
            props.onChange?.(e)
          }}
        />
      )
    }

    case 'textarea': {
      const { onChange: _unused, ...restProps } = props
      return (
        <Textarea
          key={key}
          {...restProps}
          onChange={(e) => {
            handleChange(e.target.value)
            props.onChange?.(e)
          }}
        />
      )
    }

    case 'checkbox': {
      const { onCheckedChange: _unused, ...restProps } = props
      return (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            {...restProps}
            onCheckedChange={(checked) => {
              handleChange(checked)
              props.onCheckedChange?.(checked)
            }}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        </div>
      )
    }

    case 'switch': {
      const { onCheckedChange: _unused, ...restProps } = props
      return (
        <div key={key} className="flex items-center space-x-2">
          <Switch
            {...restProps}
            onCheckedChange={(checked) => {
              handleChange(checked ? 'yes' : 'no')
              props.onCheckedChange?.(checked)
            }}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        </div>
      )
    }

    case 'button':
      return (
        <Button key={key} {...props}>
          {label}
        </Button>
      )

    case 'date':
      return (
        <DatePickerComponent
          key={key}
          {...props}
          onChange={(value: string) => {
            handleChange(value)
            props.onChange?.(value)
          }}
        />
      )

    case 'daterange':
      return (
        <DateRangePickerComponent
          key={key}
          {...props}
          onChange={(value: string) => {
            handleChange(value)
            props.onChange?.(value)
          }}
        />
      )

    case 'radiogroup': {
      const { onValueChange: _unused, ...restProps } = props
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <RadioGroup
            {...restProps}
            defaultValue={props.defaultValue}
            onValueChange={(value) => {
              handleChange(value)
              props.onValueChange?.(value)
            }}
          >
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
    }

    case 'select': {
      const { onValueChange: _unused, ...restProps } = props
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <Select
            {...restProps}
            defaultValue={props.defaultValue}
            onValueChange={(value) => {
              handleChange(value)
              props.onValueChange?.(value)
            }}
          >
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
    }

    case 'combobox': {
      const { onChange: _unused, ...restProps } = props
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <ComboBox
            {...restProps}
            options={props.options || []}
            onChange={(value: string[]) => {
              handleChange(value)
              props.onChange?.(value)
            }}
          />
        </div>
      )
    }

    case 'togglegroup': {
      const { onValueChange: _unused, ...restProps } = props
      return (
        <div key={key} className="space-y-2" nli-group-label={props['nli-markdown']}>
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <ToggleGroup
            {...restProps}
            type="multiple"
            defaultValue={props.defaultValue}
            onValueChange={(value) => {
              handleChange(value)
              props.onValueChange?.(value)
            }}
          >
            {children?.map((child) => (
              <ToggleGroupItem key={child.key} value={child.props.value} {...child.props}>
                {child.props.value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )
    }

    case 'checkboxgroup': {
      const { onValueChange: _unused, ...restProps } = props
      return (
        <div key={key} className="space-y-2" nli-group-label={props['nli-markdown']}>
          <label className="text-sm font-medium">{props['nli-markdown']}</label>
          <CheckboxGroup
            {...restProps}
            defaultValue={props.defaultValue}
            onValueChange={(value) => {
              handleChange(value)
              props.onValueChange?.(value)
            }}
          >
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
    }

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
 * Controlled component - receives value from props, calls onChange
 */
function DatePickerComponent(props: any) {
  const dateValue = props['data-date-value']
  const date = safeParseDate(dateValue)

  const handleDateChange = (newDate: Date | undefined) => {
    if (props.onChange && newDate) {
      // Format date for markdown
      props.onChange(format(newDate, 'MMMM dd, yyyy'))
    }
  }

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
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/**
 * Date Range Picker Component (using Popover + Calendar)
 * Controlled component - receives value from props, calls onChange
 */
function DateRangePickerComponent(props: any) {
  const fromValue = props['data-date-from']
  const toValue = props['data-date-to']

  const dateRange = {
    from: safeParseDate(fromValue),
    to: safeParseDate(toValue),
  }

  const handleDateRangeChange = (newRange: { from?: Date; to?: Date } | undefined) => {
    if (props.onChange && newRange?.from && newRange?.to) {
      // Format date range for markdown
      const formattedRange = `${format(newRange.from, 'MMMM dd, yyyy')} - ${format(newRange.to, 'MMMM dd, yyyy')}`
      props.onChange(formattedRange)
    }
  }

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
            onSelect={handleDateRangeChange as any}
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
  components: MappedComponent[],
  onComponentChange?: (label: string, value: string, type: string) => void
): React.ReactElement[] {
  return components
    .map((component) => renderComponent(component, onComponentChange))
    .filter(Boolean) as React.ReactElement[]
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
