/**
 * Markdown Differ
 * Comparison of markdown text with normalization
 */

/**
 * Diff result for markdown comparison
 */
export interface MarkdownDiff {
  hasChanges: boolean
  addedLines: number[]
  removedLines: number[]
  modifiedLines: Array<{
    lineNumber: number
    oldContent: string
    newContent: string
  }>
}

/**
 * Normalize markdown for comparison
 * Removes insignificant whitespace differences
 *
 * @param markdown - Raw markdown text
 * @returns Normalized markdown
 */
export function normalizeMarkdown(markdown: string): string {
  return (
    markdown
      // Remove trailing whitespace from each line
      .split('\n')
      .map((line) => line.trimEnd())
      // Remove trailing empty lines
      .join('\n')
      .trimEnd()
  )
}

/**
 * Compare two markdown strings for changes
 *
 * @param oldMarkdown - Previous markdown
 * @param newMarkdown - New markdown
 * @param options - Comparison options
 * @returns Diff result
 */
export function diffMarkdown(
  oldMarkdown: string,
  newMarkdown: string,
  options: {
    /** Normalize whitespace before comparing (default: true) */
    normalize?: boolean
    /** Provide detailed line-by-line diff (default: false) */
    detailed?: boolean
  } = {}
): MarkdownDiff {
  const { normalize = true, detailed = false } = options

  // Normalize if requested
  const oldNormalized = normalize ? normalizeMarkdown(oldMarkdown) : oldMarkdown
  const newNormalized = normalize ? normalizeMarkdown(newMarkdown) : newMarkdown

  // Quick check: exact match after normalization
  if (oldNormalized === newNormalized) {
    return {
      hasChanges: false,
      addedLines: [],
      removedLines: [],
      modifiedLines: [],
    }
  }

  // If detailed diff not requested, just return hasChanges
  if (!detailed) {
    return {
      hasChanges: true,
      addedLines: [],
      removedLines: [],
      modifiedLines: [],
    }
  }

  // Perform line-by-line diff
  return diffLines(oldNormalized, newNormalized)
}

/**
 * Line-by-line diff algorithm
 *
 * @param oldMarkdown - Previous markdown
 * @param newMarkdown - New markdown
 * @returns Detailed diff result
 */
function diffLines(oldMarkdown: string, newMarkdown: string): MarkdownDiff {
  const oldLines = oldMarkdown.split('\n')
  const newLines = newMarkdown.split('\n')

  const diff: MarkdownDiff = {
    hasChanges: true,
    addedLines: [],
    removedLines: [],
    modifiedLines: [],
  }

  const maxLength = Math.max(oldLines.length, newLines.length)

  for (let i = 0; i < maxLength; i++) {
    const oldLine = oldLines[i]
    const newLine = newLines[i]

    if (oldLine === undefined) {
      // Line was added
      diff.addedLines.push(i)
    } else if (newLine === undefined) {
      // Line was removed
      diff.removedLines.push(i)
    } else if (oldLine !== newLine) {
      // Line was modified
      diff.modifiedLines.push({
        lineNumber: i,
        oldContent: oldLine,
        newContent: newLine,
      })
    }
  }

  return diff
}

/**
 * Calculate similarity percentage between two markdown strings
 *
 * @param a - First markdown
 * @param b - Second markdown
 * @returns Similarity percentage (0-100)
 */
export function calculateSimilarity(a: string, b: string): number {
  const aNorm = normalizeMarkdown(a)
  const bNorm = normalizeMarkdown(b)

  if (aNorm === bNorm) return 100

  const aLines = aNorm.split('\n')
  const bLines = bNorm.split('\n')

  let matchingLines = 0
  const maxLines = Math.max(aLines.length, bLines.length)

  for (let i = 0; i < Math.min(aLines.length, bLines.length); i++) {
    if (aLines[i] === bLines[i]) {
      matchingLines++
    }
  }

  return Math.round((matchingLines / maxLines) * 100)
}

/**
 * Extract changes summary from diff
 *
 * @param diff - Diff result
 * @returns Human-readable summary
 */
export function summarizeDiff(diff: MarkdownDiff): string {
  if (!diff.hasChanges) {
    return 'No changes'
  }

  const parts: string[] = []

  if (diff.addedLines.length > 0) {
    parts.push(`+${diff.addedLines.length} lines`)
  }

  if (diff.removedLines.length > 0) {
    parts.push(`-${diff.removedLines.length} lines`)
  }

  if (diff.modifiedLines.length > 0) {
    parts.push(`~${diff.modifiedLines.length} lines`)
  }

  return parts.join(', ')
}

/**
 * Check if markdown is empty or whitespace-only
 *
 * @param markdown - Markdown to check
 * @returns true if empty
 */
export function isMarkdownEmpty(markdown: string): boolean {
  return normalizeMarkdown(markdown).length === 0
}

/**
 * Merge markdown changes (simple concatenation strategy)
 *
 * @param base - Base markdown
 * @param changes - Changes to merge
 * @returns Merged markdown
 */
export function mergeMarkdown(base: string, changes: string): string {
  const baseNorm = normalizeMarkdown(base)
  const changesNorm = normalizeMarkdown(changes)

  if (!baseNorm) return changesNorm
  if (!changesNorm) return baseNorm

  return `${baseNorm}\n\n${changesNorm}`
}
