/**
 * Sync Reconciler
 * Orchestrates bidirectional updates with multi-layer loop prevention
 */

import type { MappedComponent } from '../parser/component-mapper'

/**
 * Origin of an update (tracks where changes came from)
 */
export type UpdateOrigin = 'gui' | 'markdown' | 'init'

/**
 * Sync status indicator
 */
export type SyncStatus = 'idle' | 'syncing' | 'error'

/**
 * Update to be reconciled
 */
export interface PendingUpdate {
  origin: UpdateOrigin
  content: string | MappedComponent[]
  sequence: number
  timestamp: number
}

/**
 * Reconciliation result
 */
export interface ReconcileResult {
  shouldUpdateComponents: boolean
  shouldUpdateMarkdown: boolean
  components?: MappedComponent[]
  markdown?: string
  error?: Error
}

/**
 * Options for reconciler
 */
export interface ReconcilerOptions {
  /**
   * Function to parse markdown to components
   */
  parseToComponents: (markdown: string) => {
    components: MappedComponent[]
    errors: any[]
    hasErrors: boolean
  }

  /**
   * Function to generate markdown from components
   */
  generateMarkdown: (components: MappedComponent[]) => string

  /**
   * Function to compare components for changes
   */
  diffComponents: (
    a: MappedComponent[],
    b: MappedComponent[]
  ) => { hasChanges: boolean }

  /**
   * Function to compare markdown for changes
   */
  diffMarkdown: (a: string, b: string) => { hasChanges: boolean }

  /**
   * Callback when sync status changes
   */
  onSyncStatusChange?: (status: SyncStatus) => void

  /**
   * Callback when parse errors occur
   */
  onParseErrors?: (errors: any[]) => void
}

/**
 * Sync Reconciler Class
 * Manages bidirectional sync with loop prevention
 */
export class SyncReconciler {
  private syncLock = false
  private updateQueue: PendingUpdate[] = []
  private lastProcessedMarkdownSeq = -1
  private lastProcessedGuiSeq = -1
  private currentComponents: MappedComponent[] = []
  private currentMarkdown = ''
  private updateCount = 0
  private updateWindowStart = Date.now()
  private readonly MAX_UPDATES_PER_SECOND = 10

  constructor(private options: ReconcilerOptions) {}

  /**
   * Set current state (used for initialization)
   */
  setState(components: MappedComponent[], markdown: string) {
    this.currentComponents = components
    this.currentMarkdown = markdown
  }

  /**
   * Reconcile an update from either markdown or GUI
   */
  reconcileUpdate(
    origin: UpdateOrigin,
    content: string | MappedComponent[],
    sequence: number
  ): ReconcileResult {
    // Layer 1: Circuit breaker (prevent runaway updates)
    if (this.isUpdateRateLimitExceeded()) {
      console.warn('[SyncReconciler] Update rate limit exceeded, pausing sync')
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error: new Error('Update rate limit exceeded'),
      }
    }

    // Layer 2: Sync lock (prevent concurrent updates)
    if (this.syncLock) {
      this.updateQueue.push({
        origin,
        content,
        sequence,
        timestamp: Date.now(),
      })
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    }

    this.syncLock = true
    this.options.onSyncStatusChange?.('syncing')

    try {
      const result = this.processUpdate(origin, content, sequence)
      this.options.onSyncStatusChange?.(result.error ? 'error' : 'idle')
      return result
    } finally {
      this.syncLock = false
      this.processQueue()
    }
  }

  /**
   * Process a single update
   */
  private processUpdate(
    origin: UpdateOrigin,
    content: string | MappedComponent[],
    sequence: number
  ): ReconcileResult {
    if (origin === 'markdown') {
      return this.processMarkdownUpdate(content as string, sequence)
    } else if (origin === 'gui') {
      return this.processGuiUpdate(content as MappedComponent[], sequence)
    }

    return {
      shouldUpdateComponents: false,
      shouldUpdateMarkdown: false,
    }
  }

  /**
   * Process an update from markdown editor
   */
  private processMarkdownUpdate(
    markdown: string,
    sequence: number
  ): ReconcileResult {
    // Layer 3: Sequence check (avoid reprocessing)
    if (sequence <= this.lastProcessedMarkdownSeq) {
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    }

    // Layer 4: Content diff (skip if no real change)
    const markdownDiff = this.options.diffMarkdown(
      this.currentMarkdown,
      markdown
    )

    if (!markdownDiff.hasChanges) {
      this.lastProcessedMarkdownSeq = sequence
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    }

    // Parse markdown to components
    try {
      const parseResult = this.options.parseToComponents(markdown)

      // Always report parse errors (even empty list to clear previous errors)
      this.options.onParseErrors?.(parseResult.errors)

      // Compare with current components
      const componentDiff = this.options.diffComponents(
        this.currentComponents,
        parseResult.components
      )

      if (componentDiff.hasChanges) {
        // Update internal state
        this.currentComponents = parseResult.components
        this.currentMarkdown = markdown
        this.lastProcessedMarkdownSeq = sequence
        this.trackUpdate()

        return {
          shouldUpdateComponents: true,
          shouldUpdateMarkdown: false,
          components: parseResult.components,
        }
      }

      // No component changes, just update markdown
      this.currentMarkdown = markdown
      this.lastProcessedMarkdownSeq = sequence

      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    } catch (error) {
      console.error('[SyncReconciler] Parse error:', error)
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error: error as Error,
      }
    }
  }

  /**
   * Process an update from GUI interaction
   */
  private processGuiUpdate(
    components: MappedComponent[],
    sequence: number
  ): ReconcileResult {
    // Layer 3: Sequence check (avoid reprocessing)
    if (sequence <= this.lastProcessedGuiSeq) {
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    }

    // Layer 4: Content diff (skip if no real change)
    const componentDiff = this.options.diffComponents(
      this.currentComponents,
      components
    )

    if (!componentDiff.hasChanges) {
      this.lastProcessedGuiSeq = sequence
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    }

    // Generate markdown from components
    try {
      const newMarkdown = this.options.generateMarkdown(components)
      
      // Clear any previous parse errors since we successfully generated markdown from valid components
      this.options.onParseErrors?.([])

      // Compare with current markdown
      const markdownDiff = this.options.diffMarkdown(
        this.currentMarkdown,
        newMarkdown
      )

      if (markdownDiff.hasChanges) {
        // Update internal state
        this.currentComponents = components
        this.currentMarkdown = newMarkdown
        this.lastProcessedGuiSeq = sequence
        this.trackUpdate()

        return {
          shouldUpdateComponents: false,
          shouldUpdateMarkdown: true,
          markdown: newMarkdown,
        }
      }

      // No markdown changes, just update components
      this.currentComponents = components
      this.lastProcessedGuiSeq = sequence

      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
      }
    } catch (error) {
      console.error('[SyncReconciler] Generate error:', error)
      return {
        shouldUpdateComponents: false,
        shouldUpdateMarkdown: false,
        error: error as Error,
      }
    }
  }

  /**
   * Process queued updates
   */
  private processQueue() {
    if (this.updateQueue.length === 0) return

    const update = this.updateQueue.shift()
    if (update) {
      this.reconcileUpdate(update.origin, update.content, update.sequence)
    }
  }

  /**
   * Track update rate for circuit breaker
   */
  private trackUpdate() {
    this.updateCount++

    // Reset window every second
    const now = Date.now()
    if (now - this.updateWindowStart > 1000) {
      this.updateCount = 1
      this.updateWindowStart = now
    }
  }

  /**
   * Check if update rate limit is exceeded
   */
  private isUpdateRateLimitExceeded(): boolean {
    const now = Date.now()
    if (now - this.updateWindowStart > 1000) {
      this.updateCount = 0
      this.updateWindowStart = now
      return false
    }

    return this.updateCount >= this.MAX_UPDATES_PER_SECOND
  }

  /**
   * Get current reconciler state
   */
  getState() {
    return {
      components: this.currentComponents,
      markdown: this.currentMarkdown,
      lastMarkdownSeq: this.lastProcessedMarkdownSeq,
      lastGuiSeq: this.lastProcessedGuiSeq,
      queueLength: this.updateQueue.length,
      isLocked: this.syncLock,
    }
  }

  /**
   * Reset reconciler state
   */
  reset() {
    this.syncLock = false
    this.updateQueue = []
    this.lastProcessedMarkdownSeq = -1
    this.lastProcessedGuiSeq = -1
    this.updateCount = 0
    this.updateWindowStart = Date.now()
  }
}

/**
 * Create a new sync reconciler instance
 */
export function createSyncReconciler(
  options: ReconcilerOptions
): SyncReconciler {
  return new SyncReconciler(options)
}
