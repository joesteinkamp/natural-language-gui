/**
 * Main parser entry point
 * Converts natural language markdown into component AST
 */

import { tokenize, filterBlanks } from './tokenizer'
import { buildAST, validateAST, printAST } from './ast-builder'
import { mapASTToComponents } from './component-mapper'
import type { AST } from './types'

export * from './types'
export * from './tokenizer'
export * from './inference'
export * from './ast-builder'
export * from './component-mapper'
export * from './instantiator'

/**
 * Parse markdown into an AST
 *
 * This is the main entry point for the parser. It:
 * 1. Tokenizes the markdown into classified tokens
 * 2. Builds an AST with type inference
 * 3. Validates the AST for common issues
 *
 * @param markdown - Raw markdown string
 * @param options - Parser options
 * @returns AST with nodes and errors
 *
 * @example
 * ```typescript
 * const markdown = `
 * *Email:* john@example.com
 * *Password:* secret123
 * *Remember me:* yes
 * [Submit]
 * `
 *
 * const ast = parse(markdown)
 * console.log(printAST(ast))
 * ```
 */
export function parse(
  markdown: string,
  options: {
    /** Include blank lines in tokens (default: false) */
    includeBlanks?: boolean
    /** Validate AST after building (default: true) */
    validate?: boolean
    /** Print AST to console for debugging (default: false) */
    debug?: boolean
  } = {}
): AST {
  const { includeBlanks = false, validate = true, debug = false } = options

  // Step 1: Tokenize
  let tokens = tokenize(markdown)

  // Optionally filter blanks
  if (!includeBlanks) {
    tokens = filterBlanks(tokens)
  }

  // Step 2: Build AST
  let ast = buildAST(tokens)

  // Step 3: Validate
  if (validate) {
    const validationErrors = validateAST(ast)
    ast = { ...ast, errors: validationErrors }
  }

  // Debug output
  if (debug) {
    console.log('=== PARSED AST ===')
    console.log(printAST(ast))
    console.log('==================')
  }

  return ast
}

/**
 * Quick validation: check if markdown is valid without full parsing
 *
 * @param markdown - Markdown to validate
 * @returns true if markdown appears valid
 */
export function isValidMarkdown(markdown: string): boolean {
  const ast = parse(markdown, { validate: true })
  const hasErrors = ast.errors.some((e) => e.severity === 'error')
  return !hasErrors && ast.nodes.length > 0
}

/**
 * Extract just the errors from markdown
 *
 * @param markdown - Markdown to check
 * @returns Array of parse errors
 */
export function getParseErrors(markdown: string) {
  const ast = parse(markdown, { validate: true })
  return ast.errors
}

/**
 * Debug helper: print markdown parsing result
 *
 * @param markdown - Markdown to parse and print
 */
export function debugParse(markdown: string): void {
  parse(markdown, { debug: true })
}

/**
 * Parse markdown and convert to mapped components (ready for rendering)
 *
 * @param markdown - Raw markdown string
 * @returns Array of mapped components and any errors
 */
export function parseToComponents(markdown: string) {
  const ast = parse(markdown, { validate: true })
  const components = mapASTToComponents(ast.nodes)

  return {
    components,
    errors: ast.errors,
    hasErrors: ast.errors.some((e) => e.severity === 'error'),
  }
}
