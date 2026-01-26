/**
 * Bidirectional Sync Hook
 * Manages synchronized state between markdown and GUI components
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import type { MappedComponent } from '../parser/component-mapper'
import {
  createSyncReconciler,
  type UpdateOrigin,
  type SyncStatus,
} from '../lib/sync-reconciler'
import { diffComponents } from '../lib/component-differ'
import { diffMarkdown } from '../lib/markdown-differ'
import { parseWithCache } from '../parser'

/**
 * Options for bidirectional sync
 */
export interface UseBidirectionalSyncOptions {
  /**
   * Initial markdown content
   */
  initialMarkdown?: string

  /**
   * Initial components
   */
  initialComponents?: MappedComponent[]

  /**
   * Function to generate markdown from components
   */
  generateMarkdown: (components: MappedComponent[]) => string

  /**
   * Debounce time for markdown changes (ms)
   */
  markdownDebounce?: number

  /**
   * Debounce time for GUI changes (ms)
   */
  guiDebounce?: number

  /**
   * Callback when sync errors occur
   */
  onSyncError?: (error: Error) => void

  /**
   * Callback when parse errors occur
   */
  onParseErrors?: (errors: any[]) => void
}

/**
 * State returned by useBidirectionalSync
 */
export interface BidirectionalSyncState {
  /** Current component tree */
  components: MappedComponent[]

  /** Current markdown text */
  markdown: string

  /** Last update origin */
  lastUpdateOrigin: UpdateOrigin

  /** GUI sequence number */
  guiSequence: number

  /** Markdown sequence number */
  markdownSequence: number

  /** Current sync status */
  syncStatus: SyncStatus

  /** Parse errors from last markdown update */
  parseErrors: any[]

  /** Update markdown (from editor) */
  updateMarkdown: (markdown: string) => void

  /** Update components (from GUI) */
  updateComponents: (components: MappedComponent[]) => void

  /** Reset sync state */
  reset: () => void
}

/**
 * Bidirectional sync hook
 *
 * Manages synchronized state between markdown and GUI with loop prevention
 *
 * @param options - Sync options
 * @returns Bidirectional sync state and actions
 */
export function useBidirectionalSync(
  options: UseBidirectionalSyncOptions
): BidirectionalSyncState {
  const {
    initialMarkdown = '',
    initialComponents = [],
    generateMarkdown,
    markdownDebounce = 300,
    guiDebounce = 50,
    onSyncError,
    onParseErrors,
  } = options

  // Core state
  const [components, setComponents] =
    useState<MappedComponent[]>(initialComponents)
  const [markdown, setMarkdown] = useState<string>(initialMarkdown)
  const [lastUpdateOrigin, setLastUpdateOrigin] = useState<UpdateOrigin>('init')
  const [guiSequence, setGuiSequence] = useState(0)
  const [markdownSequence, setMarkdownSequence] = useState(0)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [parseErrors, setParseErrors] = useState<any[]>([])

  // Refs for debouncing
  const markdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const guiTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reconciler instance
  const reconcilerRef = useRef(
    createSyncReconciler({
      parseToComponents: parseWithCache,
      generateMarkdown,
      diffComponents,
      diffMarkdown,
      onSyncStatusChange: setSyncStatus,
      onParseErrors: (errors) => {
        setParseErrors(errors)
        onParseErrors?.(errors)
      },
    })
  )

  // Initialize reconciler state
  useEffect(() => {
    reconcilerRef.current.setState(initialComponents, initialMarkdown)
  }, []) // Only on mount

  /**
   * Update markdown from editor
   */
  const updateMarkdown = useCallback(
    (newMarkdown: string) => {
      // Clear previous timeout
      if (markdownTimeoutRef.current) {
        clearTimeout(markdownTimeoutRef.current)
      }

      // Update markdown immediately (for controlled input)
      setMarkdown(newMarkdown)
      setLastUpdateOrigin('markdown')

      // Debounce the reconciliation
      markdownTimeoutRef.current = setTimeout(() => {
        const newSequence = markdownSequence + 1
        setMarkdownSequence(newSequence)

        const result = reconcilerRef.current.reconcileUpdate(
          'markdown',
          newMarkdown,
          newSequence
        )

        if (result.error) {
          onSyncError?.(result.error)
        }

        if (result.shouldUpdateComponents && result.components) {
          setComponents(result.components)
        }
      }, markdownDebounce)
    },
    [markdownSequence, markdownDebounce, onSyncError]
  )

  /**
   * Update components from GUI
   */
  const updateComponents = useCallback(
    (newComponents: MappedComponent[]) => {
      // Clear previous timeout
      if (guiTimeoutRef.current) {
        clearTimeout(guiTimeoutRef.current)
      }

      // Update components immediately
      setComponents(newComponents)
      setLastUpdateOrigin('gui')

      // Debounce the reconciliation
      guiTimeoutRef.current = setTimeout(() => {
        const newSequence = guiSequence + 1
        setGuiSequence(newSequence)

        const result = reconcilerRef.current.reconcileUpdate(
          'gui',
          newComponents,
          newSequence
        )

        if (result.error) {
          onSyncError?.(result.error)
        }

        if (result.shouldUpdateMarkdown && result.markdown) {
          setMarkdown(result.markdown)
        }
      }, guiDebounce)
    },
    [guiSequence, guiDebounce, onSyncError]
  )

  /**
   * Reset sync state
   */
  const reset = useCallback(() => {
    setComponents(initialComponents)
    setMarkdown(initialMarkdown)
    setLastUpdateOrigin('init')
    setGuiSequence(0)
    setMarkdownSequence(0)
    setSyncStatus('idle')
    setParseErrors([])
    reconcilerRef.current.reset()
    reconcilerRef.current.setState(initialComponents, initialMarkdown)
  }, [initialComponents, initialMarkdown])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (markdownTimeoutRef.current) {
        clearTimeout(markdownTimeoutRef.current)
      }
      if (guiTimeoutRef.current) {
        clearTimeout(guiTimeoutRef.current)
      }
    }
  }, [])

  return {
    components,
    markdown,
    lastUpdateOrigin,
    guiSequence,
    markdownSequence,
    syncStatus,
    parseErrors,
    updateMarkdown,
    updateComponents,
    reset,
  }
}
