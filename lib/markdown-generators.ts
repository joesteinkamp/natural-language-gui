import { format, parseISO, isValid } from "date-fns"

/**
 * Type definition for markdown generator functions
 * Takes an element and its label, returns markdown string or null
 */
type MarkdownGenerator = (element: Element, label: string) => string | null

/**
 * Registry of markdown generators by component type
 */
const generators: Record<string, MarkdownGenerator> = {
  /**
   * Input and Textarea components
   * Format: "*Label:* value"
   */
  input: (element, label) => {
    const inputElement = element as HTMLInputElement | HTMLTextAreaElement
    const value = inputElement.value
    return `*${label}:* ${value}`
  },

  /**
   * Date picker component
   * Format: "*Label:* Month DD, YYYY"
   */
  date: (element, label) => {
    const dateValue = element.getAttribute('data-date-value')
    if (!dateValue) return null

    try {
      const date = parseISO(dateValue)
      if (isValid(date)) {
        return `*${label}:* ${format(date, "MMMM dd, yyyy")}`
      } else {
        // Fallback to raw value if invalid
        return `*${label}:* ${dateValue}`
      }
    } catch (error) {
      console.warn('Invalid date format:', dateValue, error)
      return `*${label}:* ${dateValue}`
    }
  },

  /**
   * Date range picker component
   * Format: "*Label Date Range:* Month DD, YYYY - Month DD, YYYY"
   */
  dateRange: (element, label) => {
    const from = element.getAttribute('data-date-from')
    const to = element.getAttribute('data-date-to')
    if (!from || !to) return null

    try {
      const fromDate = parseISO(from)
      const toDate = parseISO(to)

      if (isValid(fromDate) && isValid(toDate)) {
        // Optional: validate that from <= to
        if (fromDate > toDate) {
          console.warn('Date range invalid: from date is after to date')
        }

        return `*${label} Date Range:* ${format(fromDate, "MMMM dd, yyyy")} - ${format(toDate, "MMMM dd, yyyy")}`
      }
    } catch (error) {
      console.warn('Invalid date range format:', { from, to }, error)
    }

    // Fallback to raw values
    return `*${label}:* ${from} - ${to}`
  },

  /**
   * Checkbox component
   * Format: "Label" (only when checked)
   * Unchecked checkboxes are omitted
   */
  checkbox: (element, label) => {
    const state = element.getAttribute('data-state')
    return state === 'checked' ? label : null
  },

  /**
   * Radio button component
   * Format: "Label" (only when selected)
   * Unselected radio buttons are omitted
   */
  radio: (element, label) => {
    const state = element.getAttribute('data-state')
    return state === 'checked' ? label : null
  },

  /**
   * Switch component
   * Format: "*Label:* yes/no"
   * Both states are always shown
   */
  switch: (element, label) => {
    const state = element.getAttribute('data-state')
    const isChecked = state === 'checked'
    return `*${label}:* ${isChecked ? 'yes' : 'no'}`
  },

  /**
   * Toggle component (with on/off state)
   * Format: "*Label:* yes/no"
   */
  toggle: (element, label) => {
    const state = element.getAttribute('data-state')
    const isOn = state === 'on'
    return `*${label}:* ${isOn ? 'yes' : 'no'}`
  },

  /**
   * Select/Combobox component
   * Format: "*Label:* Selected Value"
   */
  combobox: (element, label) => {
    const value = element.textContent || ""
    return `*${label}:* ${value}`
  },
}

/**
 * Identify the component type based on element attributes and properties
 */
function identifyComponentType(element: Element): string | null {
  // Check for input/textarea elements
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return 'input'
  }

  // Check for date picker
  if (element.hasAttribute('data-date-value')) {
    return 'date'
  }

  // Check for date range picker
  if (element.hasAttribute('data-date-from') && element.hasAttribute('data-date-to')) {
    return 'dateRange'
  }

  // Check for role-based components
  const role = element.getAttribute('role')
  if (role && generators[role]) {
    return role
  }

  // Check for toggle (on/off state)
  if (
    element.hasAttribute('data-state') &&
    (element.getAttribute('data-state') === 'on' ||
      element.getAttribute('data-state') === 'off')
  ) {
    return 'toggle'
  }

  return null
}

/**
 * Generate markdown for a given element
 *
 * @param element - The DOM element to generate markdown for
 * @param label - The nli-markdown attribute value (label/identifier)
 * @returns Markdown string or null if element should be omitted
 */
export function generateMarkdownForElement(
  element: Element,
  label: string
): string | null {
  const type = identifyComponentType(element)

  // If no type identified, use label as-is (fallback)
  if (!type) {
    return label
  }

  const generator = generators[type]
  return generator ? generator(element, label) : label
}

/**
 * Check if an element is a regular button (not checkbox/radio/switch/toggle)
 * Regular buttons are handled differently - they append to markdown on click
 * rather than being scanned for state
 *
 * @param element - The element to check
 * @returns true if element is a regular button
 */
export function isRegularButton(element: Element | null): boolean {
  return !!(
    element &&
    element.tagName === 'BUTTON' &&
    element.getAttribute('role') !== 'checkbox' &&
    element.getAttribute('role') !== 'radio' &&
    element.getAttribute('role') !== 'combobox' &&
    element.getAttribute('role') !== 'switch' &&
    element.getAttribute('aria-pressed') === null
  )
}
