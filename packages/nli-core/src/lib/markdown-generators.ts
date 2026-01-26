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

    try {
      if (dateValue && dateValue !== '') {
        const date = parseISO(dateValue)
        if (isValid(date)) {
          return `*${label}:* ${format(date, "MMMM dd, yyyy")}`
        }
      }

      // Get the current displayed text from the button
      const button = element.querySelector('button')
      const displayText = button?.textContent?.trim()
      if (displayText && !displayText.includes('Pick a date')) {
        return `*${label}:* ${displayText.replace(/^\s*\S+\s*/, '')}` // Remove icon
      }

      // Fallback: return with empty value to preserve component
      return `*${label}:* `
    } catch (error) {
      console.warn('Invalid date format:', dateValue, error)
      return `*${label}:* ${dateValue || ''}`
    }
  },

  /**
   * Date range picker component
   * Format: "*Label:* Month DD, YYYY - Month DD, YYYY"
   */
  dateRange: (element, label) => {
    const from = element.getAttribute('data-date-from')
    const to = element.getAttribute('data-date-to')

    try {
      if (from && to && from !== '' && to !== '') {
        const fromDate = parseISO(from)
        const toDate = parseISO(to)

        if (isValid(fromDate) && isValid(toDate)) {
          // Optional: validate that from <= to
          if (fromDate > toDate) {
            console.warn('Date range invalid: from date is after to date')
          }

          return `*${label}:* ${format(fromDate, "MMMM dd, yyyy")} - ${format(toDate, "MMMM dd, yyyy")}`
        }
      }

      // Get the current displayed text from the button
      const button = element.querySelector('button')
      const displayText = button?.textContent?.trim()
      if (displayText && !displayText.includes('Pick a date')) {
        return `*${label}:* ${displayText.replace(/^\s*\S+\s*/, '')}` // Remove icon
      }

      // Fallback: return with empty value to preserve component
      return `*${label}:* `
    } catch (error) {
      console.warn('Invalid date range format:', { from, to }, error)
      return `*${label}:* ${from || ''} - ${to || ''}`
    }
  },

  /**
   * Checkbox component
   * Format: "[x] Label" (checked) or "[ ] Label" (unchecked)
   * Always returns both states to preserve checkbox position in markdown
   */
  checkbox: (element, label) => {
    const state = element.getAttribute('data-state')
    const isChecked = state === 'checked'
    return `[${isChecked ? 'x' : ' '}] ${label}`
  },

  /**
   * Radio button component
   * Format: "[x] Label" (selected) or "[ ] Label" (unselected)
   * Both states are now shown to preserve component in markdown
   */
  radio: (element, label) => {
    const state = element.getAttribute('data-state')
    const isChecked = state === 'checked'
    return `[${isChecked ? 'x' : ' '}] ${label}`
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

/**
 * Generate markdown from MappedComponent
 * (Alternative to DOM-based generation)
 */
import type { MappedComponent } from '../parser/component-mapper'

export function generateMarkdownFromComponent(
  component: MappedComponent,
  isInGroup: boolean = false
): string {
  const label = component.props['nli-markdown'] || component.props.label || ''

  switch (component.type) {
    case 'input':
    case 'textarea': {
      const value = component.props.defaultValue || component.props.value || ''
      return `*${label}:* ${value}`
    }

    case 'date': {
      const dateValue = component.props['data-date-value'] || ''
      if (dateValue) {
        try {
          const date = parseISO(dateValue)
          if (isValid(date)) {
            return `*${label}:* ${format(date, 'MMMM dd, yyyy')}`
          }
        } catch {
          // Fallback to raw value
        }
      }
      return `*${label}:* ${dateValue}`
    }

    case 'daterange': {
      const from = component.props['data-date-from'] || ''
      const to = component.props['data-date-to'] || ''
      if (from && to) {
        try {
          const fromDate = parseISO(from)
          const toDate = parseISO(to)
          if (isValid(fromDate) && isValid(toDate)) {
            return `*${label} Date Range:* ${format(fromDate, 'MMMM dd, yyyy')} - ${format(toDate, 'MMMM dd, yyyy')}`
          }
        } catch {
          // Fallback to raw values
        }
      }
      return `*${label}:* ${from} - ${to}`
    }

    case 'checkbox': {
      // Use checkbox-style syntax with checked state
      const checked =
        component.props.defaultChecked ||
        component.props.checked ||
        component.props.value === 'true' ||
        component.props.value === true ||
        false
      return `[${checked ? 'x' : ' '}] ${label}`
    }

    case 'radio': {
      // Use checkbox-style syntax with checked state (for radio buttons in groups)
      const checked =
        component.props.defaultChecked ||
        component.props.checked ||
        component.props.value === 'true' ||
        component.props.value === true ||
        false
      return `[${checked ? 'x' : ' '}] ${label}`
    }

    case 'checkbox-item':
    case 'toggle-item':
    case 'select-item': {
      // Child items in groups - just return the label
      // The parent group handles the formatting
      return label
    }

    case 'switch': {
      const checked =
        component.props.defaultChecked || component.props.checked || false
      return `*${label}:* ${checked ? 'yes' : 'no'}`
    }

    case 'button':
      return `[${label}]`

    case 'select': {
      // New format: *Label:* SelectedValue
      // - Option 1
      // - Option 2
      const selectedValue = component.props.value || component.props.defaultValue || ''

      if (component.children && component.children.length > 0) {
        let markdown = `*${label}:* ${selectedValue}\n`
        component.children.forEach((child) => {
          const optionLabel = child.props['nli-markdown'] || child.props.label || child.props.value || ''
          markdown += `- ${optionLabel}\n`
        })
        return markdown.trimEnd()
      }

      // Fallback: just show the selected value
      return `*${label}:* ${selectedValue}`
    }

    case 'combobox': {
      // Combobox can be multi-select, use checkbox syntax
      let markdown = `*${label}:*\n`
      const selectedValues = component.props.value || component.props.defaultValue || []

      if (component.children && component.children.length > 0) {
        component.children.forEach((child) => {
          const optionLabel = child.props['nli-markdown'] || child.props.label || child.props.value || ''
          const isSelected = Array.isArray(selectedValues)
            ? selectedValues.includes(child.props.value)
            : false
          markdown += `[${isSelected ? 'x' : ' '}] ${optionLabel}\n`
        })
        return markdown.trimEnd()
      }

      // Fallback: just show the selected values
      return `*${label}:* ${Array.isArray(selectedValues) ? selectedValues.join(', ') : selectedValues}`
    }

    case 'radiogroup': {
      // New format: *Label:* SelectedValue
      // - Option 1
      // - Option 2
      const selectedValue = component.props.defaultValue || component.props.value || ''

      let markdown = `*${label}:* ${selectedValue}\n`
      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props['nli-markdown'] || child.props.label || child.props.value || ''
          markdown += `- ${optionLabel}\n`
        })
      }
      return markdown.trimEnd()
    }

    case 'checkboxgroup': {
      // Use checkbox-style syntax for all options
      let markdown = `*${label}:*\n`
      const selectedValues = component.props.defaultValue || component.props.value || []

      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props['nli-markdown'] || child.props.label || child.props.value || ''
          const isSelected = Array.isArray(selectedValues)
            ? selectedValues.includes(child.props.value)
            : false
          markdown += `[${isSelected ? 'x' : ' '}] ${optionLabel}\n`
        })
      }
      return markdown.trimEnd()
    }

    case 'togglegroup': {
      // Toggle groups still use *Label:* yes/no format
      let markdown = `*${label}:*\n`
      const selectedValues = component.props.defaultValue || component.props.value || []

      if (component.children) {
        component.children.forEach((child) => {
          const optionLabel = child.props['nli-markdown'] || child.props.label || child.props.value || ''
          const isSelected = Array.isArray(selectedValues)
            ? selectedValues.includes(child.props.value)
            : false
          markdown += `*${optionLabel}:* ${isSelected ? 'yes' : 'no'}\n`
        })
      }
      return markdown.trimEnd()
    }

    default:
      return label
  }
}

/**
 * Generate complete markdown from array of components
 * Uses component-based generation (not DOM-based)
 */
export function generateMarkdownFromComponents(
  components: MappedComponent[]
): string {
  let markdown = ''
  let lastGroupLabel: string | null = null

  for (const component of components) {
    const componentMarkdown = generateMarkdownFromComponent(component)

    if (!componentMarkdown) continue

    // Handle groups
    if (component.children) {
      // This is a group container
      if (markdown) markdown += '\n'
      markdown += componentMarkdown
    } else {
      // Regular component
      if (markdown) markdown += '\n'
      markdown += componentMarkdown
    }
  }

  return markdown.trim()
}

/**
 * Component-to-markdown mapping
 * Maps component keys to their markdown line positions
 */
export interface ComponentMarkdownMap {
  componentKey: string
  startLine: number
  endLine: number
  markdown: string
}

/**
 * Generate markdown with component mapping
 * Useful for incremental updates
 */
export function generateMarkdownWithMapping(
  components: MappedComponent[]
): {
  markdown: string
  mapping: ComponentMarkdownMap[]
} {
  const mapping: ComponentMarkdownMap[] = []
  const lines: string[] = []

  components.forEach((component) => {
    const startLine = lines.length
    const componentMarkdown = generateMarkdownFromComponent(component)

    if (componentMarkdown) {
      const componentLines = componentMarkdown.split('\n')
      lines.push(...componentLines)

      mapping.push({
        componentKey: component.key,
        startLine,
        endLine: lines.length - 1,
        markdown: componentMarkdown,
      })
    }
  })

  return {
    markdown: lines.join('\n'),
    mapping,
  }
}

/**
 * Incremental markdown update
 * Only regenerates changed components
 */
export function updateMarkdownIncremental(
  previousMapping: ComponentMarkdownMap[],
  changedComponents: MappedComponent[],
  allComponents: MappedComponent[]
): {
  markdown: string
  mapping: ComponentMarkdownMap[]
} {
  // For simplicity, regenerate all for now
  // A more sophisticated implementation could splice changes
  return generateMarkdownWithMapping(allComponents)
}
