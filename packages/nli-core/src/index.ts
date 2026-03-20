/**
 * Natural Language GUI Core Library
 * Bidirectional natural language interface components
 */

// Component exports
export * from './components/ui/button'
export * from './components/ui/input'
export * from './components/ui/textarea'
export * from './components/ui/switch'
export * from './components/ui/toggle'
export * from './components/ui/toggle-group'
export * from './components/ui/checkbox'
export * from './components/ui/checkbox-group'
export * from './components/ui/radio-group'
export * from './components/ui/select'
export * from './components/ui/calendar'
export * from './components/ui/popover'
export * from './components/ui/dialog'

export * from './components/ui/combo-box'

// Layout components
export * from './components/ResizablePane'

// Parser exports
export {
  parse,
  parseToComponents,
  parseWithCache,
  clearParseCache,
  tokenize,
  filterBlanks,
  getUnknownTokens,
  buildAST,
  validateAST,
  mapASTToComponents,
  extractValues,
  instantiateComponents,
  InstantiatedForm,
} from './parser'

export {
  inferComponentType,
  inferGroupType,
  isBooleanValue,
  parseBooleanValue,
} from './parser/inference'

// Utility exports
export { cn } from './lib/utils'
export {
  generateMarkdownForElement,
  isRegularButton,
  generateMarkdownFromComponent,
  generateMarkdownFromComponents,
  generateMarkdownWithMapping,
  updateMarkdownIncremental,
} from './lib/markdown-generators'

export { cleanseMarkdown } from './lib/markdown-cleanser'

// Bidirectional sync exports
export { useBidirectionalSync } from './hooks/useBidirectionalSync'
export type { UseBidirectionalSyncOptions, BidirectionalSyncState } from './hooks/useBidirectionalSync'

export { createSyncReconciler, SyncReconciler } from './lib/sync-reconciler'
export type { UpdateOrigin, SyncStatus, ReconcilerOptions } from './lib/sync-reconciler'

export { diffComponents } from './lib/component-differ'
export type { ComponentDiff } from './lib/component-differ'

export { diffMarkdown, normalizeMarkdown } from './lib/markdown-differ'
export type { MarkdownDiff } from './lib/markdown-differ'

export {
  saveCursorPosition,
  restoreCursorPosition,
  preserveCursor,
  isActivelyEditing,
} from './lib/cursor-manager'
export type { CursorPosition } from './lib/cursor-manager'

export {
  updateMarkdownLine,
  formatValueForMarkdown,
  parseMarkdownLines,
} from './lib/markdown-updater'
export type { MarkdownLine } from './lib/markdown-updater'

// Type exports
export type {
  ComponentType,
  Token,
  TokenType,
  ASTNode,
  AST,
  ParseError,
  InferenceContext,
} from './parser/types'

export type {
  MappedComponent,
} from './parser/component-mapper'

// Registry exports (pluggable design system support)
export type { ComponentRegistry, ComponentRenderer } from './registry/component-registry'
export { createInstantiator } from './registry/component-registry'
export { defaultRegistry } from './registry/default-registry'
export { NLIProvider, useComponentRegistry } from './registry/NLIProvider'
