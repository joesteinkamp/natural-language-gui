/**
 * AST (Abstract Syntax Tree) Builder
 * Converts tokens into a hierarchical structure representing form components
 */

import type { Token, ASTNode, AST, ParseError, InferenceContext } from './types'
import { inferComponentType, inferGroupType } from './inference'

/**
 * Build AST from tokenized markdown
 *
 * Groups tokens into parent-child relationships and applies type inference
 *
 * @param tokens - Array of classified tokens from tokenizer
 * @returns Complete AST with nodes and errors
 */
export function buildAST(tokens: Token[]): AST {
  const nodes: ASTNode[] = []
  const errors: ParseError[] = []
  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]

    // Skip blank lines
    if (token.type === 'BLANK') {
      i++
      continue
    }

    // Handle unknown tokens as errors
    if (token.type === 'UNKNOWN') {
      errors.push({
        line: token.lineNumber,
        message: `Unrecognized markdown format: "${token.line}"`,
        severity: 'warning',
      })
      i++
      continue
    }

    // Handle buttons
    if (token.type === 'BUTTON') {
      // Extract all actions from the line (multiple buttons can be on one line)
      const actions = token.value?.match(/\[([^\]]+)\]/g) || []

      actions.forEach((action) => {
        const label = action.slice(1, -1) // Remove brackets
        nodes.push({
          type: 'button',
          label,
          metadata: {
            lineNumber: token.lineNumber,
            inferredType: false,
          },
        })
      })

      i++
      continue
    }

    // Handle standalone checkboxes
    if (token.type === 'CHECKBOX') {
      nodes.push({
        type: 'checkbox',
        label: token.label || token.value || '',
        value: token.value || 'true', // Use parsed value (true/false) or default to true for legacy
        metadata: {
          lineNumber: token.lineNumber,
          inferredType: false,
        },
      })
      i++
      continue
    }

    // Handle group headers
    if (token.type === 'GROUP_HEADER') {
      const groupNode = processGroup(tokens, i, errors)
      if (groupNode) {
        nodes.push(groupNode)
        // Skip past group items
        i = groupNode.metadata?.lastProcessedLine || i + 1
      } else {
        i++
      }
      continue
    }

    // Handle standalone fields
    if (token.type === 'FIELD') {
      const value = token.value || ''

      // Look ahead: check if this field is followed by GROUP_ITEM tokens
      // If so, this is a RadioGroup or Select with options
      const nextToken = tokens[i + 1]
      if (nextToken && nextToken.type === 'GROUP_ITEM') {
        // This is a RadioGroup/Select - process as a group
        const groupNode = processFieldWithOptions(tokens, i, errors)
        if (groupNode) {
          nodes.push(groupNode)
          i = groupNode.metadata?.lastProcessedLine || i + 1
        } else {
          i++
        }
        continue
      }

      // Regular field without options
      const context: InferenceContext = {
        hasChildren: false,
      }

      const inferredType = inferComponentType(value, token.explicitType, context)

      nodes.push({
        type: inferredType,
        label: token.label || '',
        value,
        metadata: {
          lineNumber: token.lineNumber,
          inferredType: !token.explicitType,
        },
      })
      i++
      continue
    }

    // Handle orphaned group items (items without a header)
    if (token.type === 'GROUP_ITEM') {
      errors.push({
        line: token.lineNumber,
        message: `List item without group header: "${token.line}"`,
        severity: 'warning',
      })
      i++
      continue
    }

    i++
  }

  return { nodes, errors }
}

/**
 * Process a field with options (RadioGroup/Select pattern) into a single AST node
 * Pattern: *Label:* SelectedValue
 *          - Option 1
 *          - Option 2
 */
function processFieldWithOptions(
  tokens: Token[],
  startIndex: number,
  errors: ParseError[]
): ASTNode | null {
  const fieldToken = tokens[startIndex]

  if (!fieldToken.label) {
    errors.push({
      line: fieldToken.lineNumber,
      message: `Field missing label: "${fieldToken.line}"`,
      severity: 'error',
    })
    return null
  }

  const selectedValue = fieldToken.value || ''
  const options: string[] = []
  let i = startIndex + 1

  // Collect all group items following the field (GROUP_ITEM tokens)
  while (i < tokens.length && tokens[i].type === 'GROUP_ITEM') {
    const item = tokens[i]
    const itemText = item.value || ''

    // For RadioGroup/Select, we expect plain text options (- Option 1)
    options.push(itemText)
    i++
  }

  // If no options found, treat as regular field (shouldn't happen since we checked)
  if (options.length === 0) {
    return null
  }

  // Determine component type based on option count
  // < 6 options = RadioGroup, >= 6 options = Select
  const componentType = options.length < 6 ? 'radiogroup' : 'select'

  // Build children array
  const children: ASTNode[] = options.map((option, index) => ({
    type: 'radio',
    label: option,
    value: option === selectedValue ? 'true' : 'false',
    metadata: {
      lineNumber: tokens[startIndex + 1 + index]?.lineNumber || fieldToken.lineNumber,
      inferredType: true,
    },
  }))

  const groupNode: ASTNode = {
    type: componentType,
    label: fieldToken.label,
    value: selectedValue,
    children,
    metadata: {
      lineNumber: fieldToken.lineNumber,
      inferredType: !fieldToken.explicitType,
      lastProcessedLine: i,
    },
  }

  return groupNode
}

/**
 * Process a group (header + items) into a single AST node
 */
function processGroup(
  tokens: Token[],
  startIndex: number,
  errors: ParseError[]
): ASTNode | null {
  const headerToken = tokens[startIndex]

  if (!headerToken.label) {
    errors.push({
      line: headerToken.lineNumber,
      message: `Group header missing label: "${headerToken.line}"`,
      severity: 'error',
    })
    return null
  }

  const children: ASTNode[] = []
  let i = startIndex + 1

  // Collect all group items following the header (GROUP_ITEM or CHECKBOX tokens)
  while (i < tokens.length && (tokens[i].type === 'GROUP_ITEM' || tokens[i].type === 'CHECKBOX')) {
    // Check for line gap (blank line)
    // If the current item is more than 1 line away from the previous item/header, break the group
    const prevToken = tokens[i - 1]
    const currentToken = tokens[i]
    
    if (prevToken && currentToken.lineNumber > prevToken.lineNumber + 1) {
      break
    }

    const item = tokens[i]

    // If it's a CHECKBOX token, it's already parsed with checked state
    if (item.type === 'CHECKBOX') {
      children.push({
        type: 'checkbox',
        label: item.label || item.value || '',
        value: item.value || 'true', // Use parsed checked state
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true,
        },
      })
      i++
      continue
    }

    // Otherwise, it's a legacy GROUP_ITEM token
    const itemText = item.value || ''

    // Try to parse as *Label:* value
    const fieldMatch = itemText.match(/^\*([^*:]+):\*\s(.+)$/)

    if (fieldMatch) {
      // Has a label and value (formatted as *Label:* value)
      children.push({
        type: 'input', // Will be overridden by parent group type
        label: fieldMatch[1],
        value: fieldMatch[2],
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true,
        },
      })
    } else {
      // Plain text (legacy checkbox/radio item in group - treated as checked)
      children.push({
        type: 'checkbox',
        label: itemText,
        value: 'true', // Checked/selected (legacy behavior)
        metadata: {
          lineNumber: item.lineNumber,
          inferredType: true,
        },
      })
    }

    i++
  }

  // If no children found, warn and skip
  if (children.length === 0) {
    errors.push({
      line: headerToken.lineNumber,
      message: `Group header with no items: "${headerToken.line}"`,
      severity: 'warning',
    })
    return null
  }

  // Infer group type based on children
  const childrenData = children.map((child) => ({
    label: child.label,
    value: child.value,
  }))

  const groupType = inferGroupType(childrenData, headerToken.explicitType)

  // Build context for re-inference if needed
  const childrenHaveValues = children.some((child) => child.label && child.value)

  const groupNode: ASTNode = {
    type: groupType,
    label: headerToken.label,
    children,
    metadata: {
      lineNumber: headerToken.lineNumber,
      inferredType: !headerToken.explicitType,
      lastProcessedLine: i, // Track where we stopped for the main loop
    },
  }

  return groupNode
}

/**
 * Validate AST for common issues
 *
 * @param ast - The AST to validate
 * @returns Array of validation errors
 */
export function validateAST(ast: AST): ParseError[] {
  const errors: ParseError[] = [...ast.errors]

  // Check for duplicate labels (could cause ambiguity)
  const labels = new Set<string>()
  const checkDuplicates = (nodes: ASTNode[]) => {
    nodes.forEach((node) => {
      if (node.label && node.type !== 'button') {
        if (labels.has(node.label)) {
          errors.push({
            line: node.metadata?.lineNumber || 0,
            message: `Duplicate label detected: "${node.label}". This may cause ambiguity.`,
            severity: 'warning',
          })
        }
        labels.add(node.label)
      }

      if (node.children) {
        checkDuplicates(node.children)
      }
    })
  }

  checkDuplicates(ast.nodes)

  return errors
}

/**
 * Print AST in a human-readable format (for debugging)
 */
export function printAST(ast: AST, indent = 0): string {
  const lines: string[] = []
  const prefix = '  '.repeat(indent)

  ast.nodes.forEach((node) => {
    const typeInfo = node.metadata?.inferredType ? ` (inferred)` : ''
    lines.push(
      `${prefix}${node.type}${typeInfo}: "${node.label}"${node.value ? ` = "${node.value}"` : ''}`
    )

    if (node.children && node.children.length > 0) {
      const childAST: AST = { nodes: node.children, errors: [] }
      lines.push(printAST(childAST, indent + 1))
    }
  })

  if (indent === 0 && ast.errors.length > 0) {
    lines.push('\nErrors:')
    ast.errors.forEach((error) => {
      lines.push(`  Line ${error.line}: [${error.severity}] ${error.message}`)
    })
  }

  return lines.join('\n')
}
