/**
 * Markdown Line Updater
 * Updates specific component lines in markdown without full regeneration
 */

import type { ComponentType } from '../parser/types'

/**
 * Parse markdown into lines with metadata
 */
export interface MarkdownLine {
  content: string
  lineNumber: number
  isComponent: boolean
  componentLabel?: string
  isGroupHeader?: boolean
  isGroupItem?: boolean
  groupLabel?: string
}

/**
 * Parse markdown into structured lines
 */
export function parseMarkdownLines(markdown: string): MarkdownLine[] {
  const lines = markdown.split('\n')
  const result: MarkdownLine[] = []
  let currentGroup: string | null = null

  lines.forEach((content, index) => {
    const lineNumber = index + 1
    const trimmed = content.trim()

    // Check if next line is a group item (- something)
    const nextLine = lines[index + 1]?.trim()
    const hasGroupItems = nextLine?.startsWith('- ')

    // RadioGroup/Select format: *Label:* value followed by options
    // This is a group header with an inline selected value
    if (trimmed.match(/^\*[^*]+:\*\s+.+$/) && hasGroupItems) {
      const match = trimmed.match(/^\*([^*]+):\*/)
      if (match) {
        const groupLabel = match[1]
        currentGroup = groupLabel
        result.push({
          content,
          lineNumber,
          isComponent: true,
          componentLabel: groupLabel,
          isGroupHeader: true,
          groupLabel,
        })
        return
      }
    }

    // Old format group header: *Label:*
    if (trimmed.match(/^\*[^*]+:\*$/)) {
      const groupLabel = trimmed.slice(1, -2) // Remove *...:*
      currentGroup = groupLabel
      result.push({
        content,
        lineNumber,
        isComponent: true, // Treat as component so we can target it
        componentLabel: groupLabel, // This allows matching "Checkbox Group"
        isGroupHeader: true,
        groupLabel,
      })
      return
    }

    // Group item with checkbox syntax: [x] Label or [ ] Label
    if (currentGroup && (trimmed.startsWith('[x] ') || trimmed.startsWith('[ ] '))) {
      const itemContent = trimmed.slice(4) // Remove [x] or [ ]
      const componentLabel = extractComponentLabel(itemContent) || itemContent
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel,
        isGroupItem: true,
        groupLabel: currentGroup,
      })
      return
    }

    // Group item (legacy): - Label or - *Label:* value
    if (currentGroup && trimmed.startsWith('- ')) {
      const itemContent = trimmed.slice(2)
      const componentLabel = extractComponentLabel(itemContent)
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel,
        isGroupItem: true,
        groupLabel: currentGroup,
      })
      return
    }

    // Standalone component
    const componentLabel = extractComponentLabel(trimmed)
    if (componentLabel) {
      result.push({
        content,
        lineNumber,
        isComponent: true,
        componentLabel,
        isGroupHeader: false,
        isGroupItem: false,
      })
      return
    }

    // Regular line or blank
    if (!trimmed && currentGroup) {
      currentGroup = null // End of group
    }

    result.push({
      content,
      lineNumber,
      isComponent: false,
    })
  })

  return result
}

/**
 * Extract component label from markdown line
 */
function extractComponentLabel(line: string): string | undefined {
  // *Label:* value
  const fieldMatch = line.match(/^\*([^*]+):\*/)
  if (fieldMatch) return fieldMatch[1]

  // [Button] (not checkbox syntax)
  if (line.match(/^\[[^\s\]].+\]$/)) {
    const buttonMatch = line.match(/^\[([^\]]+)\]/)
    if (buttonMatch) return buttonMatch[1]
  }

  // [x] Label or [ ] Label (checkbox syntax)
  if (line.startsWith('[x] ') || line.startsWith('[ ] ')) {
    return line.slice(4).trim()
  }

  // Plain text (legacy checkbox)
  if (line && !line.startsWith('*') && !line.startsWith('[')) {
    return line
  }

  return undefined
}

/**
 * Update a specific component's line in the markdown
 */
export function updateMarkdownLine(
  markdown: string,
  componentLabel: string,
  newValue: string,
  componentType: ComponentType
): string {
  console.log('[updateMarkdownLine]', { componentLabel, newValue, componentType })
  const lines = parseMarkdownLines(markdown)
  console.log('[updateMarkdownLine] Parsed lines:', lines.filter(l => l.isComponent).map(l => ({ label: l.componentLabel, type: l.isGroupHeader ? 'header' : 'component' })))

  // Find the line with this component
  const lineIndex = lines.findIndex(
    (line) => line.isComponent && line.componentLabel === componentLabel
  )

  if (lineIndex === -1) {
    console.warn(`Component not found in markdown: ${componentLabel}`)
    console.warn('Looking for:', componentLabel)
    console.warn('Available components:', lines.filter(l => l.isComponent).map(l => l.componentLabel))
    return markdown
  }

  console.log('[updateMarkdownLine] Found component at line', lineIndex, ':', lines[lineIndex])

  const line = lines[lineIndex]

  // For RadioGroup/Select with new format: only update the header line's inline value
  if (
    (componentType === 'radiogroup' || componentType === 'select') &&
    line.isGroupHeader
  ) {
    // Just update the first line with the new selected value
    const markdownLines = markdown.split('\n')
    markdownLines[lineIndex] = `*${componentLabel}:* ${newValue}`
    return markdownLines.join('\n')
  }

  // For CheckboxGroup/ComboBox/ToggleGroup: update all child lines with checkbox syntax
  if (
    (componentType === 'checkboxgroup' ||
      componentType === 'combobox' ||
      componentType === 'togglegroup') &&
    line.isGroupHeader
  ) {
    return updateGroupLines(markdown, lines, lineIndex, newValue, componentType)
  }

  // For simple components, update just this line
  const updatedContent = generateComponentLine(
    componentLabel,
    newValue,
    componentType,
    line.isGroupItem || false
  )

  // Replace the line
  const markdownLines = markdown.split('\n')
  markdownLines[lineIndex] = updatedContent

  return markdownLines.join('\n')
}

/**
 * Update group component lines (header + all items)
 */
function updateGroupLines(
  markdown: string,
  parsedLines: MarkdownLine[],
  headerIndex: number,
  newValue: string,
  componentType: ComponentType
): string {
  const markdownLines = markdown.split('\n')
  const groupLabel = parsedLines[headerIndex].groupLabel

  // Parse the new value
  // For radiogroup/select: single string value
  // For checkboxgroup/combobox: comma-separated string or array
  const selectedValues = Array.isArray(newValue)
    ? newValue
    : newValue
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)

  // Find all group items
  const groupItemIndices: number[] = []
  for (let i = headerIndex + 1; i < parsedLines.length; i++) {
    const line = parsedLines[i]
    if (line.groupLabel === groupLabel && line.isGroupItem) {
      groupItemIndices.push(i)
    } else if (line.groupLabel !== groupLabel) {
      break // End of group
    }
  }

  // Update each group item line with checkbox syntax
  groupItemIndices.forEach((i) => {
    const line = parsedLines[i]
    const itemLabel = line.componentLabel || ''

    // Determine if this item should be checked
    const isChecked =
      componentType === 'radiogroup' || componentType === 'select'
        ? itemLabel === newValue // Single selection
        : selectedValues.includes(itemLabel) // Multi-selection

    // Update line based on component type
    if (componentType === 'togglegroup') {
      markdownLines[i] = `- *${itemLabel}:* ${isChecked ? 'yes' : 'no'}`
    } else {
      markdownLines[i] = `[${isChecked ? 'x' : ' '}] ${itemLabel}`
    }
  })

  return markdownLines.join('\n')
}

/**
 * Generate markdown line for a component with new value
 */
function generateComponentLine(
  label: string,
  value: string,
  type: ComponentType,
  isGroupItem: boolean
): string {
  let line = ''

  switch (type) {
    case 'input':
    case 'textarea':
    case 'date':
    case 'daterange':
      line = `*${label}:* ${value}`
      break

    case 'switch':
      line = `*${label}:* ${value}` // yes/no
      break

    case 'radiogroup':
    case 'select':
      // For RadioGroup/Select, the value is inline after the colon
      // The options list remains unchanged below this line
      line = `*${label}:* ${value}`
      break

    case 'checkbox':
    case 'checkbox-item' as ComponentType:
      // Use checkbox syntax with state
      const isChecked = value === 'true' || String(value) === 'true'
      line = `[${isChecked ? 'x' : ' '}] ${label}`
      break

    case 'button':
      line = `[${label}]`
      break

    default:
      line = `*${label}:* ${value}`
  }

  // Add group item prefix if needed
  if (isGroupItem) {
    // Checkbox items in our template don't use dashes
    if (type === 'checkbox' || type === 'checkbox-item' as ComponentType) {
       // Do nothing (no prefix)
    } else {
       line = `- ${line}`
    }
  }

  return line
}

/**
 * Format value for markdown based on component type
 */
export function formatValueForMarkdown(
  value: any,
  type: ComponentType
): string {
  switch (type) {
    case 'switch':
      return value ? 'yes' : 'no'

    case 'checkbox':
      return '' // Checkboxes don't have values in markdown

    case 'date':
    case 'daterange':
      // Value should already be formatted
      return value || ''

    default:
      return String(value || '')
  }
}
