/**
 * Parser type definitions
 */

/**
 * Token types for markdown parsing
 */
export type TokenType =
  | 'FIELD'           // *Label:* value
  | 'CHECKBOX'        // plain text
  | 'BUTTON'          // [Action]
  | 'GROUP_HEADER'    // *Label:*
  | 'GROUP_ITEM'      // - item text
  | 'BLANK'           // empty line
  | 'UNKNOWN'         // unrecognized format

/**
 * Parsed token with metadata
 */
export interface Token {
  type: TokenType
  line: string
  lineNumber: number
  label?: string
  value?: string
  explicitType?: string  // e.g., "input", "textarea", "switch"
}

/**
 * Component types that can be inferred
 */
export type ComponentType =
  | 'input'
  | 'textarea'
  | 'switch'
  | 'checkbox'
  | 'button'
  | 'date'
  | 'daterange'
  | 'radiogroup'
  | 'radio'              // Radio button item within radiogroup
  | 'select'
  | 'select-item'        // Select option item
  | 'togglegroup'
  | 'toggle-item'        // Toggle item within togglegroup
  | 'checkboxgroup'
  | 'checkbox-item'      // Checkbox item within checkboxgroup
  | 'combobox'

/**
 * Context for component type inference
 */
export interface InferenceContext {
  hasChildren?: boolean
  childrenCount?: number
  childrenHaveValues?: boolean  // true if children have yes/no
  parentLabel?: string
}

/**
 * AST node for a single component
 */
export interface ASTNode {
  type: ComponentType
  label: string
  value?: string
  children?: ASTNode[]
  metadata?: {
    lineNumber: number
    inferredType?: boolean  // true if type was inferred vs explicit
    lastProcessedLine?: number  // for group processing
  }
}

/**
 * Complete AST representing the parsed form
 */
export interface AST {
  nodes: ASTNode[]
  errors: ParseError[]
}

/**
 * Parse error information
 */
export interface ParseError {
  line: number
  message: string
  severity: 'error' | 'warning'
}
