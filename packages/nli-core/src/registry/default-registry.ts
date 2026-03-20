/**
 * Default Component Registry
 * Provides Radix UI + Tailwind renderers for all NLI component types.
 * This is the default design system used when no custom registry is provided.
 */

'use client'

import * as React from 'react'
import type { ComponentRenderer, ComponentRegistry } from './component-registry'
import type { MappedComponent } from '../parser/component-mapper'

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
 * Helper to create an onChange handler for a component
 */
function createChangeHandler(
  mapped: MappedComponent,
  onComponentChange?: (label: string, value: string, type: string) => void
) {
  const label = mapped.props['nli-markdown']
  return (value: any) => {
    if (onComponentChange && label) {
      const stringValue = Array.isArray(value) ? value.join(',') : String(value)
      onComponentChange(label, stringValue, mapped.type)
    }
  }
}

/**
 * Safely parse a date string (ISO or natural)
 */
function safeParseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  let date = parseISO(value)
  if (isValid(date)) return date
  date = new Date(value)
  if (isValid(date)) return date
  return undefined
}

// --- Individual Renderers ---

export const inputRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onChange: _unused, ...restProps } = mapped.props
  return React.createElement(Input, {
    key: mapped.key,
    ...restProps,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value)
      mapped.props.onChange?.(e)
    },
  })
}

export const textareaRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onChange: _unused, ...restProps } = mapped.props
  return React.createElement(Textarea, {
    key: mapped.key,
    ...restProps,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value)
      mapped.props.onChange?.(e)
    },
  })
}

export const checkboxRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const label = mapped.props['nli-markdown']
  const { onCheckedChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'flex items-center space-x-2' },
    React.createElement(Checkbox, {
      ...restProps,
      onCheckedChange: (checked: boolean) => {
        handleChange(checked)
        mapped.props.onCheckedChange?.(checked)
      },
    }),
    React.createElement(
      'label',
      { className: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' },
      label
    )
  )
}

export const switchRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const label = mapped.props['nli-markdown']
  const { onCheckedChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'flex items-center space-x-2' },
    React.createElement(Switch, {
      ...restProps,
      onCheckedChange: (checked: boolean) => {
        handleChange(checked ? 'yes' : 'no')
        mapped.props.onCheckedChange?.(checked)
      },
    }),
    React.createElement(
      'label',
      { className: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' },
      label
    )
  )
}

export const buttonRenderer: ComponentRenderer = (mapped) => {
  const label = mapped.props['nli-markdown']
  return React.createElement(Button, { key: mapped.key, ...mapped.props }, label)
}

export const dateRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  return React.createElement(DatePickerComponent, {
    key: mapped.key,
    ...mapped.props,
    onChange: (value: string) => {
      handleChange(value)
      mapped.props.onChange?.(value)
    },
  })
}

export const daterangeRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  return React.createElement(DateRangePickerComponent, {
    key: mapped.key,
    ...mapped.props,
    onChange: (value: string) => {
      handleChange(value)
      mapped.props.onChange?.(value)
    },
  })
}

export const radiogroupRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onValueChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'space-y-2' },
    React.createElement('label', { className: 'text-sm font-medium' }, mapped.props['nli-markdown']),
    React.createElement(
      RadioGroup,
      {
        ...restProps,
        defaultValue: mapped.props.defaultValue,
        onValueChange: (value: string) => {
          handleChange(value)
          mapped.props.onValueChange?.(value)
        },
      },
      mapped.children?.map((child) =>
        React.createElement(
          'div',
          { key: child.key, className: 'flex items-center space-x-2' },
          React.createElement(RadioGroupItem, { value: child.props.value, ...child.props }),
          React.createElement(
            'label',
            { className: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' },
            child.props['nli-markdown']
          )
        )
      )
    )
  )
}

export const selectRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onValueChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'space-y-2' },
    React.createElement('label', { className: 'text-sm font-medium' }, mapped.props['nli-markdown']),
    React.createElement(
      Select,
      {
        ...restProps,
        defaultValue: mapped.props.defaultValue,
        onValueChange: (value: string) => {
          handleChange(value)
          mapped.props.onValueChange?.(value)
        },
      },
      React.createElement(SelectTrigger, null,
        React.createElement(SelectValue, { placeholder: `Select ${mapped.props['nli-markdown']}` })
      ),
      React.createElement(
        SelectContent,
        null,
        mapped.children?.map((child) =>
          React.createElement(
            SelectItem,
            { key: child.key, value: child.props.value, ...child.props },
            child.props['nli-markdown']
          )
        )
      )
    )
  )
}

export const comboboxRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'space-y-2' },
    React.createElement('label', { className: 'text-sm font-medium' }, mapped.props['nli-markdown']),
    React.createElement(ComboBox, {
      ...restProps,
      options: mapped.props.options || [],
      onChange: (value: string[]) => {
        handleChange(value)
        mapped.props.onChange?.(value)
      },
    })
  )
}

export const togglegroupRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onValueChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'space-y-2', 'nli-group-label': mapped.props['nli-markdown'] },
    React.createElement('label', { className: 'text-sm font-medium' }, mapped.props['nli-markdown']),
    React.createElement(
      ToggleGroup,
      {
        ...restProps,
        type: 'multiple' as const,
        defaultValue: mapped.props.defaultValue,
        onValueChange: (value: string[]) => {
          handleChange(value)
          mapped.props.onValueChange?.(value)
        },
      },
      mapped.children?.map((child) =>
        React.createElement(
          ToggleGroupItem,
          { key: child.key, value: child.props.value, ...child.props },
          child.props.value
        )
      )
    )
  )
}

export const checkboxgroupRenderer: ComponentRenderer = (mapped, onComponentChange) => {
  const handleChange = createChangeHandler(mapped, onComponentChange)
  const { onValueChange: _unused, ...restProps } = mapped.props
  return React.createElement(
    'div',
    { key: mapped.key, className: 'space-y-2', 'nli-group-label': mapped.props['nli-markdown'] },
    React.createElement('label', { className: 'text-sm font-medium' }, mapped.props['nli-markdown']),
    React.createElement(
      CheckboxGroup,
      {
        ...restProps,
        defaultValue: mapped.props.defaultValue,
        onValueChange: (value: string[]) => {
          handleChange(value)
          mapped.props.onValueChange?.(value)
        },
      },
      mapped.children?.map((child) =>
        React.createElement(
          'div',
          { key: child.key, className: 'flex items-center space-x-2' },
          React.createElement(CheckboxGroupItem, { value: child.props.value, ...child.props }),
          React.createElement(
            'label',
            { className: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' },
            child.props['nli-markdown']
          )
        )
      )
    )
  )
}

// --- Date Picker Components (Radix-specific) ---

function DatePickerComponent(props: any) {
  const dateValue = props['data-date-value']
  const date = safeParseDate(dateValue)

  const handleDateChange = (newDate: Date | undefined) => {
    if (props.onChange && newDate) {
      props.onChange(format(newDate, 'MMMM dd, yyyy'))
    }
  }

  return React.createElement(
    'div',
    { className: 'space-y-2' },
    React.createElement('label', { className: 'text-sm font-medium' }, props['nli-markdown']),
    React.createElement(
      Popover,
      null,
      React.createElement(
        PopoverTrigger,
        { asChild: true },
        React.createElement(
          Button,
          {
            variant: 'outline',
            className: cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground'),
            ...props,
            'data-date-value': date ? format(date, 'yyyy-MM-dd') : '',
          },
          React.createElement(CalendarIcon, { className: 'mr-2 h-4 w-4' }),
          date ? format(date, 'MMMM dd, yyyy') : React.createElement('span', null, 'Pick a date')
        )
      ),
      React.createElement(
        PopoverContent,
        { className: 'w-auto p-0' },
        React.createElement(Calendar, {
          mode: 'single',
          selected: date,
          onSelect: handleDateChange,
          initialFocus: true,
        })
      )
    )
  )
}

function DateRangePickerComponent(props: any) {
  const fromValue = props['data-date-from']
  const toValue = props['data-date-to']

  const dateRange = {
    from: safeParseDate(fromValue),
    to: safeParseDate(toValue),
  }

  const handleDateRangeChange = (newRange: { from?: Date; to?: Date } | undefined) => {
    if (props.onChange && newRange?.from && newRange?.to) {
      const formattedRange = `${format(newRange.from, 'MMMM dd, yyyy')} - ${format(newRange.to, 'MMMM dd, yyyy')}`
      props.onChange(formattedRange)
    }
  }

  return React.createElement(
    'div',
    { className: 'space-y-2' },
    React.createElement('label', { className: 'text-sm font-medium' }, props['nli-markdown']),
    React.createElement(
      Popover,
      null,
      React.createElement(
        PopoverTrigger,
        { asChild: true },
        React.createElement(
          Button,
          {
            variant: 'outline',
            className: cn('w-full justify-start text-left font-normal', !dateRange.from && 'text-muted-foreground'),
            ...props,
            'data-date-from': dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : '',
            'data-date-to': dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : '',
          },
          React.createElement(CalendarIcon, { className: 'mr-2 h-4 w-4' }),
          dateRange.from
            ? dateRange.to
              ? `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
              : format(dateRange.from, 'MMM dd, yyyy')
            : React.createElement('span', null, 'Pick a date range')
        )
      ),
      React.createElement(
        PopoverContent,
        { className: 'w-auto p-0', align: 'start' },
        React.createElement(Calendar, {
          mode: 'range',
          selected: dateRange as any,
          onSelect: handleDateRangeChange as any,
          numberOfMonths: 2,
          initialFocus: true,
        })
      )
    )
  )
}

// --- Default Registry ---

export const defaultRegistry: ComponentRegistry = {
  input: inputRenderer,
  textarea: textareaRenderer,
  checkbox: checkboxRenderer,
  switch: switchRenderer,
  button: buttonRenderer,
  date: dateRenderer,
  daterange: daterangeRenderer,
  radiogroup: radiogroupRenderer,
  select: selectRenderer,
  combobox: comboboxRenderer,
  togglegroup: togglegroupRenderer,
  checkboxgroup: checkboxgroupRenderer,
}
