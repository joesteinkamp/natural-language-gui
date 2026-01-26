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

/**
 * Cache for parsed results
 * Key: markdown content hash, Value: { result, timestamp }
 */
interface CacheEntry {
  result: ReturnType<typeof parseToComponents>
  timestamp: number
}

const parseCache = new Map<string, CacheEntry>()
const CACHE_TTL = 5000 // 5 seconds
const MAX_CACHE_SIZE = 100

/**
 * Simple hash function for markdown content
 */
function hashMarkdown(markdown: string): string {
  let hash = 0
  for (let i = 0; i < markdown.length; i++) {
    const char = markdown.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(36)
}

/**
 * Clean expired cache entries
 */
function cleanCache() {
  const now = Date.now()
  for (const [key, entry] of parseCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      parseCache.delete(key)
    }
  }

  // If still too large, remove oldest entries
  if (parseCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(parseCache.entries())
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    const toRemove = entries.slice(0, parseCache.size - MAX_CACHE_SIZE)
    toRemove.forEach(([key]) => parseCache.delete(key))
  }
}

/**
 * Parse markdown with caching
 *
 * @param markdown - Raw markdown string
 * @param options - Cache options
 * @returns Cached or fresh parse result
 */
export function parseWithCache(
  markdown: string,
  options: {
    /** Bypass cache (default: false) */
    skipCache?: boolean
  } = {}
): ReturnType<typeof parseToComponents> {
  const { skipCache = false } = options

  // Skip cache if requested
  if (skipCache) {
    return parseToComponents(markdown)
  }

  // Generate cache key
  const cacheKey = hashMarkdown(markdown)

  // Check cache
  const cached = parseCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result
  }

  // Parse and cache
  const result = parseToComponents(markdown)
  parseCache.set(cacheKey, {
    result,
    timestamp: Date.now(),
  })

  // Clean cache periodically
  if (parseCache.size > MAX_CACHE_SIZE) {
    cleanCache()
  }

  return result
}

/**
 * Clear parse cache (useful for testing or manual cache invalidation)
 */
export function clearParseCache() {
  parseCache.clear()
}
