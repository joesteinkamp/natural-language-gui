/**
 * Component type inference engine
 * Determines the appropriate component type based on markdown content and context
 */

import type { ComponentType, InferenceContext } from './types'

/**
 * Date format patterns for detection
 */
const DATE_PATTERNS = {
  // MMMM dd, yyyy (e.g., "January 15, 2024")
  LONG_FORMAT: /^[A-Z][a-z]+\s+\d{1,2},\s+\d{4}$/,

  // MM/DD/YYYY or MM-DD-YYYY
  SHORT_FORMAT: /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/,

  // YYYY-MM-DD (ISO format)
  ISO_FORMAT: /^\d{4}-\d{2}-\d{2}$/,

  // Date range: "date - date"
  RANGE: /^.+\s+-\s+.+$/,
}

/**
 * Check if a value looks like a date
 */
function isDate(value: string): boolean {
  return (
    DATE_PATTERNS.LONG_FORMAT.test(value) ||
    DATE_PATTERNS.SHORT_FORMAT.test(value) ||
    DATE_PATTERNS.ISO_FORMAT.test(value)
  )
}

/**
 * Check if a value looks like a date range
 */
function isDateRange(value: string): boolean {
  if (!DATE_PATTERNS.RANGE.test(value)) return false

  const parts = value.split('-').map((p) => p.trim())
  if (parts.length !== 2) return false

  return isDate(parts[0]) && isDate(parts[1])
}

/**
 * Normalize explicit type hints to standard component types
 */
function normalizeType(explicitType: string): ComponentType {
  const normalized = explicitType.toLowerCase().trim()

  // Map common variations to standard types
  const typeMap: Record<string, ComponentType> = {
    text: 'input',
    textfield: 'input',
    textinput: 'input',
    input: 'input',

    textarea: 'textarea',
    multiline: 'textarea',

    switch: 'switch',
    toggle: 'switch',

    checkbox: 'checkbox',
    check: 'checkbox',

    button: 'button',
    action: 'button',

    date: 'date',
    datepicker: 'date',

    daterange: 'daterange',
    'date-range': 'daterange',

    radio: 'radiogroup',
    radiogroup: 'radiogroup',
    'radio-group': 'radiogroup',

    select: 'select',
    dropdown: 'select',
    combobox: 'combobox',

    togglegroup: 'togglegroup',
    'toggle-group': 'togglegroup',

    checkboxgroup: 'checkboxgroup',
    'checkbox-group': 'checkboxgroup',
  }

  return typeMap[normalized] || 'input'
}

/**
 * Infer component type based on value and context
 *
 * User's Deterministic Rules:
 * 1. Input vs Textarea: < 60 chars = Input, >= 60 chars = Textarea
 * 2. Switch vs ToggleGroup: Single yes/no = Switch, Bulleted yes/no = ToggleGroup
 * 3. CheckboxGroup vs ComboBox: Bulleted list with <= 5 options = CheckboxGroup, > 5 options = ComboBox
 * 4. Date detection: Match date patterns
 * 5. Checkbox: Plain text (standalone)
 * 6. Button: [Action] format
 *
 * @param value - The field value or content
 * @param explicitType - Optional type hint from markdown [type]
 * @param context - Context about surrounding elements (groups, children, etc.)
 * @returns Inferred component type
 */
export function inferComponentType(
  value: string,
  explicitType?: string,
  context?: InferenceContext
): ComponentType {
  // Rule: Explicit type always wins
  if (explicitType) {
    return normalizeType(explicitType)
  }

  // Rule: If this field has children (is a group), infer group type
  if (context?.hasChildren) {
    // Children have yes/no values → ToggleGroup
    if (context.childrenHaveValues) {
      return 'togglegroup'
    }

    // Children are plain text
    const optionCount = context.childrenCount || 0

    // Rule 3: <= 5 options = CheckboxGroup, > 5 options = ComboBox
    return optionCount > 5 ? 'combobox' : 'checkboxgroup'
  }

  // Rule: yes/no value → Switch
  if (value === 'yes' || value === 'no') {
    return 'switch'
  }

  // Rule 4: Date range detection
  if (isDateRange(value)) {
    return 'daterange'
  }

  // Rule 4: Date detection
  if (isDate(value)) {
    return 'date'
  }

  // Rule 1: Character count threshold for Input vs Textarea
  // >= 60 chars = Textarea, < 60 chars = Input
  if (value.length >= 60) {
    return 'textarea'
  }

  // Default to Input for all other labeled fields
  return 'input'
}

/**
 * Infer the type of a group based on its children
 *
 * @param children - Array of child values
 * @returns Inferred group component type
 */
export function inferGroupType(
  children: Array<{ label?: string; value?: string }>,
  explicitType?: string
): ComponentType {
  if (explicitType) {
    return normalizeType(explicitType)
  }

  if (children.length === 0) {
    return 'checkboxgroup' // Default for empty groups
  }

  // Check if children are in *Label:* value format (not plain text)
  // Checkbox-style children will have value='true' or 'false' (from [x]/[ ] syntax)
  // Formatted children will have actual values like 'yes', 'no', or other text
  const hasFormattedChildren = children.some(
    (child) =>
      child.value !== undefined &&
      child.value !== 'true' &&
      child.value !== 'false'
  )

  if (hasFormattedChildren) {
    // Children are in *Label:* value format
    // Check if all values are yes/no (ToggleGroup pattern)
    const allYesNo = children.every(
      (child) => child.value === 'yes' || child.value === 'no'
    )

    if (allYesNo) {
      return 'togglegroup'
    }

    // Children have values but not yes/no
    // This shouldn't happen in normal usage, but default to togglegroup
    return 'togglegroup'
  }

  // Plain text children (no labels) - RadioGroup or Select based on count
  const optionCount = children.length

  // Rule 3: <= 5 options = CheckboxGroup, > 5 options = ComboBox
  return optionCount > 5 ? 'combobox' : 'checkboxgroup'
}

/**
 * Check if a value represents a boolean state
 */
export function isBooleanValue(value: string): boolean {
  return value === 'yes' || value === 'no'
}

/**
 * Parse boolean value to boolean
 */
export function parseBooleanValue(value: string): boolean {
  return value === 'yes'
}
