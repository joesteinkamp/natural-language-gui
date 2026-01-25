/**
 * Markdown tokenizer for NLI parser
 * Breaks markdown into classified tokens for further processing
 */

import type { Token, TokenType } from './types'

/**
 * Regular expressions for token classification
 */
const PATTERNS = {
  // *Label:* value or *Label [type]:* value
  FIELD: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(.+)$/,

  // *Label:* yes/no or *Label [type]:* yes/no
  BOOLEAN: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(yes|no)$/,

  // *Label:* or *Label [type]:*
  GROUP_HEADER: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s*$/,

  // - item text or - *Item:* value or - *Item:* yes/no
  GROUP_ITEM: /^-\s(.+)$/,

  // [Action] or [Action] [Another]
  BUTTON: /^\[.+\]$/,

  // Plain text (checkbox)
  PLAIN_TEXT: /^[^*\-\[].*$/,

  // Blank line
  BLANK: /^\s*$/,
}

/**
 * Extract label and optional type hint from a string
 * Examples:
 *   "Email" -> { label: "Email", type: undefined }
 *   "Email [input]" -> { label: "Email", type: "input" }
 */
function extractLabelAndType(text: string): { label: string; type?: string } {
  const match = text.match(/^(.+?)\s+\[([^\]]+)\]$/)
  if (match) {
    return {
      label: match[1].trim(),
      type: match[2].trim().toLowerCase(),
    }
  }
  return { label: text.trim() }
}

/**
 * Classify a line of markdown and extract relevant data
 */
function classifyLine(line: string, lineNumber: number): Token {
  const trimmed = line.trim()

  // Check for blank lines first
  if (PATTERNS.BLANK.test(trimmed)) {
    return {
      type: 'BLANK',
      line: trimmed,
      lineNumber,
    }
  }

  // Check for buttons: [Action]
  if (PATTERNS.BUTTON.test(trimmed)) {
    return {
      type: 'BUTTON',
      line: trimmed,
      lineNumber,
      value: trimmed, // Store full button text including brackets
    }
  }

  // Check for boolean fields: *Label:* yes/no
  const booleanMatch = trimmed.match(PATTERNS.BOOLEAN)
  if (booleanMatch) {
    return {
      type: 'FIELD',
      line: trimmed,
      lineNumber,
      label: booleanMatch[1].trim(),
      value: booleanMatch[3], // 'yes' or 'no'
      explicitType: booleanMatch[2]?.trim().toLowerCase(),
    }
  }

  // Check for regular fields: *Label:* value
  const fieldMatch = trimmed.match(PATTERNS.FIELD)
  if (fieldMatch) {
    return {
      type: 'FIELD',
      line: trimmed,
      lineNumber,
      label: fieldMatch[1].trim(),
      value: fieldMatch[3],
      explicitType: fieldMatch[2]?.trim().toLowerCase(),
    }
  }

  // Check for group headers: *Label:*
  const headerMatch = trimmed.match(PATTERNS.GROUP_HEADER)
  if (headerMatch) {
    return {
      type: 'GROUP_HEADER',
      line: trimmed,
      lineNumber,
      label: headerMatch[1].trim(),
      explicitType: headerMatch[2]?.trim().toLowerCase(),
    }
  }

  // Check for group items: - item
  const itemMatch = trimmed.match(PATTERNS.GROUP_ITEM)
  if (itemMatch) {
    const itemText = itemMatch[1]

    // Group item could be:
    // - *Label:* value (field in group)
    // - *Label:* yes/no (boolean in group)
    // - plain text (checkbox in group)

    const itemFieldMatch = itemText.match(/^\*([^*]+)\*:\s+(.+)$/)
    if (itemFieldMatch) {
      return {
        type: 'GROUP_ITEM',
        line: trimmed,
        lineNumber,
        label: itemFieldMatch[1].trim(),
        value: itemFieldMatch[2],
      }
    }

    // Plain text group item (checkbox)
    return {
      type: 'GROUP_ITEM',
      line: trimmed,
      lineNumber,
      value: itemText.trim(),
    }
  }

  // Check for plain text (standalone checkbox)
  if (PATTERNS.PLAIN_TEXT.test(trimmed)) {
    return {
      type: 'CHECKBOX',
      line: trimmed,
      lineNumber,
      value: trimmed,
    }
  }

  // Unknown format
  return {
    type: 'UNKNOWN',
    line: trimmed,
    lineNumber,
  }
}

/**
 * Tokenize markdown input into an array of classified tokens
 *
 * @param markdown - Raw markdown string
 * @returns Array of tokens with type and metadata
 */
export function tokenize(markdown: string): Token[] {
  const lines = markdown.split('\n')
  const tokens: Token[] = []

  for (let i = 0; i < lines.length; i++) {
    const token = classifyLine(lines[i], i + 1)
    tokens.push(token)
  }

  return tokens
}

/**
 * Filter out blank tokens (useful for processing)
 */
export function filterBlanks(tokens: Token[]): Token[] {
  return tokens.filter((token) => token.type !== 'BLANK')
}

/**
 * Get tokens with errors/warnings
 */
export function getUnknownTokens(tokens: Token[]): Token[] {
  return tokens.filter((token) => token.type === 'UNKNOWN')
}
