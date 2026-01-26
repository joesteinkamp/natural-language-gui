/**
 * Cursor Manager
 * Utilities for preserving cursor position during updates
 */

import type { RefObject } from 'react'

/**
 * Cursor position
 */
export interface CursorPosition {
  start: number
  end: number
}

/**
 * Save cursor position from textarea
 *
 * @param textareaRef - Reference to textarea element
 * @returns Cursor position or null
 */
export function saveCursorPosition(
  textareaRef: RefObject<HTMLTextAreaElement | null>
): CursorPosition | null {
  const textarea = textareaRef.current
  if (!textarea) return null

  return {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
  }
}

/**
 * Restore cursor position to textarea
 *
 * @param textareaRef - Reference to textarea element
 * @param position - Cursor position to restore
 */
export function restoreCursorPosition(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  position: CursorPosition | null
): void {
  if (!position) return

  const textarea = textareaRef.current
  if (!textarea) return

  // Use requestAnimationFrame to ensure DOM has updated
  requestAnimationFrame(() => {
    try {
      textarea.setSelectionRange(position.start, position.end)
    } catch (error) {
      // Silently fail if selection range is invalid
      console.debug('Failed to restore cursor position:', error)
    }
  })
}

/**
 * Preserve cursor position during an update
 *
 * @param textareaRef - Reference to textarea element
 * @param updateFn - Function that performs the update
 */
export function preserveCursor(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  updateFn: () => void
): void {
  const position = saveCursorPosition(textareaRef)
  updateFn()
  restoreCursorPosition(textareaRef, position)
}

/**
 * Check if element is actively being edited
 *
 * @param element - Element to check
 * @returns true if element is focused and editable
 */
export function isActivelyEditing(element: Element | null): boolean {
  if (!element) return false

  return (
    document.activeElement === element &&
    (element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.getAttribute('contenteditable') === 'true')
  )
}
