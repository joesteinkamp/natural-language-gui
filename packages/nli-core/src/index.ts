/**
 * Natural Language GUI Core Library
 * Bidirectional natural language interface components
 */

// Component exports
export * from './components/ui/button'
export * from './components/ui/button-group'
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

// Parser exports
export {
  parse,
  parseToComponents,
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
} from './lib/markdown-generators'

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
