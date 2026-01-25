# Parser Implementation Plan

## Goal
Build a markdown-to-GUI parser that can intelligently infer component types from natural language markdown, enabling users to write forms by hand or use templates.

## Core Principles

1. **Inference First**: Parser should figure out component types from context, not require explicit type hints
2. **Forgiving**: Handle common mistakes and variations gracefully
3. **Minimal Syntax**: Keep markdown clean and easy to hand-write
4. **Optional Hints**: Allow explicit type hints when inference is ambiguous

---

## Phase 1: Design & Specification

### 1.1 Markdown Grammar Definition

**Basic Patterns** (inference-based, no hints):

```markdown
# Input (< 60 characters)
*Name:* John Doe
*Email:* user@example.com
*Phone:* (555) 123-4567

# Textarea (>= 60 characters or multi-line)
*Bio:* This is a long biography that exceeds one hundred and twenty characters and therefore will be rendered as a textarea component for multi-line input
*Comments:* Multi-line text
that spans several lines
automatically becomes textarea

# Switch (single yes/no)
*Dark Mode:* yes
*Notifications:* no
*Email Alerts:* yes

# ToggleGroup (bulleted yes/no list)
*File Formats:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
- *PPTX:* no

# RadioGroup (< 6 options)
*Theme:*
- Light
- Dark
- System

*Size:*
- Small
- Medium
- Large
- Extra Large

# Select (>= 6 options)
*Country:*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
- ... (many more)

# Checkbox (plain text, no punctuation)
Accept terms and conditions
Subscribe to newsletter
Enable beta features

# Button (wrapped in brackets)
[Submit] [Cancel] [Reset]

# Date Picker (date format)
*Birthday:* January 24, 2024
*Start Date:* 2024-01-24
*Event Date:* Jan 24, 2024

# Date Range Picker (date range format)
*Vacation:* June 1, 2024 - June 15, 2024
*Project Duration:* 2024-01-01 - 2024-12-31
```

**With Optional Type Hints** (when inference needs override):

```markdown
*Short Text [textarea]:* Force textarea even though < 60 chars
*Bold [toggle]:* yes              # Override switch (if needed as standalone toggle)
*Theme [select]:* Dark            # Force select even with < 6 options
*Country [radio]:* United States  # Force radio even with >= 6 options
```

---

### 1.1.1 Complete Example: User Profile Form

```markdown
# User Profile

*First Name:*
*Last Name:*
*Email:*
*Phone:*

*Bio:* Tell us about yourself. This will be rendered as a textarea because the placeholder text is longer than 60 characters and users typically write longer bios here.

*Birthday [date]:*

*Country:*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
- Japan
- Australia

*Preferred Language:*
- English
- Spanish
- French

*Communication Preferences:*
- *Email:* yes
- *SMS:* no
- *Push Notifications:* yes

*Newsletter:* yes
*Terms of Service:* yes

Receive promotional offers
Join our community

[Save Profile] [Cancel]
```

**Parser Output**:
```typescript
[
  { type: 'input', label: 'First Name', value: '' },          // < 60 chars
  { type: 'input', label: 'Last Name', value: '' },           // < 60 chars
  { type: 'input', label: 'Email', value: '' },               // < 60 chars
  { type: 'input', label: 'Phone', value: '' },               // < 60 chars
  { type: 'textarea', label: 'Bio', value: '...' },           // >= 60 chars
  { type: 'date', label: 'Birthday', value: '' },             // [date] hint
  { type: 'select', label: 'Country', options: [...] },       // 8 options >= 6
  { type: 'radiogroup', label: 'Preferred Language', options: [...] }, // 3 options < 6
  { type: 'togglegroup', label: 'Communication Preferences',  // yes/no list
    children: [
      { type: 'toggle', label: 'Email', value: true },
      { type: 'toggle', label: 'SMS', value: false },
      { type: 'toggle', label: 'Push Notifications', value: true }
    ]
  },
  { type: 'switch', label: 'Newsletter', value: true },       // Single yes/no
  { type: 'switch', label: 'Terms of Service', value: true }, // Single yes/no
  { type: 'checkbox', label: 'Receive promotional offers', value: true }, // Plain text
  { type: 'checkbox', label: 'Join our community', value: true },         // Plain text
  { type: 'button', label: 'Save Profile' },
  { type: 'button', label: 'Cancel' }
]
```

### 1.2 Inference Decision Tree

```
Input Line
    │
    ├─ Matches [Action] pattern?
    │   └─ YES → Button
    │
    ├─ Matches *Label [type]:* value pattern?
    │   └─ YES → Use explicit type
    │
    ├─ Matches *Label:* value pattern?
    │   ├─ value is "yes" or "no"?
    │   │   └─ YES → Switch (single boolean field)
    │   │
    │   ├─ value matches date format?
    │   │   └─ YES → Date Picker
    │   │
    │   ├─ value matches "date - date" format?
    │   │   └─ YES → Date Range Picker
    │   │
    │   ├─ value.length >= 60 characters?
    │   │   └─ YES → Textarea
    │   │
    │   └─ ELSE → Input (default for labeled fields)
    │
    ├─ Matches *Label:* followed by bulleted list?
    │   ├─ Items have yes/no values?
    │   │   └─ YES → ToggleGroup
    │   │
    │   ├─ Items count < 6?
    │   │   └─ YES → RadioGroup
    │   │
    │   └─ ELSE → Select (6+ options)
    │
    ├─ Plain text with no punctuation?
    │   └─ YES → Checkbox
    │
    └─ ELSE → Unknown (skip or warn)
```

### 1.3 Component Type Rules (Deterministic)

**Rule 1: Input vs Textarea (character count)**
```markdown
*Name:* John Doe                              # 8 chars → Input
*Email:* user@example.com                     # 17 chars → Input

*Bio:* This is a very long biography that...  # 120+ chars → Textarea
spans multiple lines and contains a lot
of detailed information about the person
```
- If `value.length < 120` → Input
- If `value.length >= 120` → Textarea

**Rule 2: Switch vs ToggleGroup (context)**
```markdown
*Dark Mode:* yes                              # Single boolean → Switch

*File Formats:*                               # Bulleted yes/no → ToggleGroup
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
```
- Single `*Label:* yes/no` → Switch
- Bulleted list with yes/no values → ToggleGroup

**Rule 3: RadioGroup vs Select (option count)**
```markdown
*Theme:*                                      # 3 options → RadioGroup
- Light
- Dark
- System

*Country:*                                    # 195+ options → Select
- United States
- Canada
- Mexico
- ... (100+ more)
```
- Label with bulleted list, < 6 options → RadioGroup
- Label with bulleted list, >= 6 options → Select

**Rule 4: Date Detection**
```markdown
*Birthday:* January 24, 2024                  # Date format → Date Picker
*Start Date:* 2024-01-24                      # ISO format → Date Picker
*Vacation:* June 1, 2024 - June 15, 2024     # Range → Date Range Picker
```

**Rule 5: Checkbox (standalone)**
```markdown
Accept terms and conditions                   # Plain text → Checkbox
Subscribe to newsletter                       # Plain text → Checkbox
```

**Rule 6: Button**
```markdown
[Submit] [Cancel]                             # Brackets → Button
```

---

## Phase 2: Core Parser Implementation

### 2.1 File Structure

```
lib/
├── parser/
│   ├── tokenizer.ts          # Break markdown into tokens
│   ├── inference.ts          # Infer component types
│   ├── ast-builder.ts        # Build Abstract Syntax Tree
│   ├── component-mapper.ts   # Map AST to components
│   ├── validator.ts          # Validate markdown syntax
│   └── index.ts              # Main parser export
└── markdown-parser.ts        # Public API
```

### 2.2 Tokenizer (lib/parser/tokenizer.ts)

```typescript
export type TokenType =
  | 'FIELD'           // *Label:* value or *Label [type]:* value
  | 'CHECKBOX'        // Plain text
  | 'BUTTON'          // [Action]
  | 'GROUP_HEADER'    // *Label:*
  | 'GROUP_ITEM'      // - item
  | 'BLANK'           // Empty line
  | 'UNKNOWN'         // Unrecognized

export interface Token {
  type: TokenType
  lineNumber: number
  raw: string
  label?: string
  value?: string
  explicitType?: string
}

export function tokenize(markdown: string): Token[] {
  const lines = markdown.split('\n')
  const tokens: Token[] = []

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (!trimmed) {
      tokens.push({ type: 'BLANK', lineNumber: index + 1, raw: line })
      return
    }

    // Button pattern: [Action]
    if (trimmed.match(/^\[.+\]$/)) {
      const label = trimmed.slice(1, -1)
      tokens.push({
        type: 'BUTTON',
        lineNumber: index + 1,
        raw: line,
        label
      })
      return
    }

    // Field pattern: *Label:* value or *Label [type]:* value
    const fieldMatch = trimmed.match(/^\*(.+?)\s*(?:\[(\w+)\])?\s*:\s*(.*)$/)
    if (fieldMatch) {
      const [, label, explicitType, value] = fieldMatch
      tokens.push({
        type: value ? 'FIELD' : 'GROUP_HEADER',
        lineNumber: index + 1,
        raw: line,
        label: label.trim(),
        value: value || undefined,
        explicitType: explicitType || undefined
      })
      return
    }

    // Group item: - item
    if (trimmed.match(/^-\s+/)) {
      tokens.push({
        type: 'GROUP_ITEM',
        lineNumber: index + 1,
        raw: line,
        value: trimmed.slice(2).trim()
      })
      return
    }

    // Default: Plain text → Checkbox
    tokens.push({
      type: 'CHECKBOX',
      lineNumber: index + 1,
      raw: line,
      label: trimmed
    })
  })

  return tokens
}
```

### 2.3 Inference Engine (lib/parser/inference.ts)

```typescript
import { isValid, parse } from 'date-fns'

export type ComponentType =
  | 'input'
  | 'textarea'
  | 'switch'
  | 'togglegroup'
  | 'checkbox'
  | 'radiogroup'
  | 'select'
  | 'button'
  | 'date'
  | 'daterange'

export interface InferenceContext {
  hasChildren?: boolean
  childrenCount?: number
  childrenHaveValues?: boolean  // For yes/no detection
}

export function inferComponentType(
  value: string,
  explicitType?: string,
  context?: InferenceContext
): ComponentType {
  // If explicit type provided, use it
  if (explicitType) {
    return normalizeType(explicitType)
  }

  // Rule 1: Check for grouped components (has children)
  if (context?.hasChildren) {
    // Rule 2: ToggleGroup (children with yes/no values)
    if (context.childrenHaveValues) {
      return 'togglegroup'
    }

    // Rule 3: RadioGroup vs Select (option count)
    const optionCount = context.childrenCount || 0
    if (optionCount < 6) {
      return 'radiogroup'
    } else {
      return 'select'
    }
  }

  // Standalone field inference

  // Rule 2: Single boolean → Switch
  if (value === 'yes' || value === 'no') {
    return 'switch'
  }

  // Rule 4: Date range pattern → DateRange
  if (isDateRange(value)) {
    return 'daterange'
  }

  // Rule 4: Date pattern → Date
  if (isDate(value)) {
    return 'date'
  }

  // Rule 1: Character count → Input vs Textarea
  if (value.length >= 120) {
    return 'textarea'
  }

  // Default → Input
  return 'input'
}

function isDate(value: string): boolean {
  // Try multiple date formats
  const formats = [
    'MMMM dd, yyyy',   // January 24, 2024
    'yyyy-MM-dd',      // 2024-01-24
    'MM/dd/yyyy',      // 01/24/2024
  ]

  for (const format of formats) {
    try {
      const parsed = parse(value, format, new Date())
      if (isValid(parsed)) return true
    } catch {
      continue
    }
  }

  return false
}

function isDateRange(value: string): boolean {
  // Pattern: "date - date" or "date to date"
  const parts = value.split(/\s*[-–—]\s*|\s+to\s+/)
  if (parts.length !== 2) return false

  return isDate(parts[0]) && isDate(parts[1])
}

function normalizeType(type: string): ComponentType {
  const normalized = type.toLowerCase()

  const typeMap: Record<string, ComponentType> = {
    'input': 'input',
    'text': 'input',
    'textarea': 'textarea',
    'multiline': 'textarea',
    'switch': 'switch',
    'toggle': 'toggle',
    'checkbox': 'checkbox',
    'check': 'checkbox',
    'radio': 'radio',
    'select': 'select',
    'dropdown': 'select',
    'button': 'button',
    'date': 'date',
    'datepicker': 'date',
    'daterange': 'daterange',
  }

  return typeMap[normalized] || 'input'
}
```

### 2.4 AST Builder (lib/parser/ast-builder.ts)

```typescript
import { Token } from './tokenizer'
import { inferComponentType, ComponentType } from './inference'

export interface ASTNode {
  type: ComponentType
  label: string
  value?: string | boolean
  props?: Record<string, any>
  children?: ASTNode[]
}

export interface FormAST {
  components: ASTNode[]
  errors: ParseError[]
}

export interface ParseError {
  line: number
  message: string
  suggestion?: string
}

export function buildAST(tokens: Token[]): FormAST {
  const components: ASTNode[] = []
  const errors: ParseError[] = []
  let currentGroup: ASTNode | null = null

  for (const token of tokens) {
    try {
      switch (token.type) {
        case 'FIELD': {
          const type = inferComponentType(token.value!, token.explicitType)
          const node: ASTNode = {
            type,
            label: token.label!,
            value: parseValue(token.value!, type),
            props: {}
          }

          if (currentGroup) {
            currentGroup.children = currentGroup.children || []
            currentGroup.children.push(node)
          } else {
            components.push(node)
          }
          break
        }

        case 'CHECKBOX': {
          const node: ASTNode = {
            type: 'checkbox',
            label: token.label!,
            value: true,  // Presence = checked
            props: {}
          }

          if (currentGroup) {
            currentGroup.children!.push(node)
          } else {
            components.push(node)
          }
          break
        }

        case 'BUTTON': {
          components.push({
            type: 'button',
            label: token.label!,
            props: {}
          })
          break
        }

        case 'GROUP_HEADER': {
          // Start new group (type will be determined when group ends)
          currentGroup = {
            type: 'select',  // Temporary - will be inferred
            label: token.label!,
            children: [],
            props: { grouped: true }
          }
          components.push(currentGroup)
          break
        }

        case 'GROUP_ITEM': {
          if (!currentGroup) {
            errors.push({
              line: token.lineNumber,
              message: 'Group item without group header',
              suggestion: 'Add a group header like "*Group Name:*" before this line'
            })
            break
          }

          // Parse group item - could be:
          // - *Label:* yes/no (toggle item)
          // - Plain text (radio/select option or checkbox)
          const itemMatch = token.value!.match(/^\*(.+?):*\s*(yes|no)$/)
          if (itemMatch) {
            // Item with yes/no value → will make this a ToggleGroup
            const [, label, boolValue] = itemMatch
            currentGroup.children!.push({
              type: 'toggle',  // Individual toggle within group
              label: label.trim(),
              value: boolValue === 'yes',
              props: {}
            })
          } else {
            // Plain text → Radio/Select option or Checkbox
            currentGroup.children!.push({
              type: 'option',  // Temporary - parent will determine final type
              label: token.value!,
              value: token.value!,
              props: {}
            })
          }
          break
        }

        case 'BLANK': {
          // End current group and infer its type
          if (currentGroup) {
            inferGroupType(currentGroup)
          }
          currentGroup = null
          break
        }

        case 'BLANK': {
          // End current group
          currentGroup = null
          break
        }
      }
    } catch (error) {
      errors.push({
        line: token.lineNumber,
        message: `Error parsing line: ${error}`,
      })
    }
  }

  // Infer type of last group if any
  if (currentGroup) {
    inferGroupType(currentGroup)
  }

  return { components, errors }
}

/**
 * Infer the correct type for a group based on its children
 * Applies the rules:
 * - Children with yes/no → ToggleGroup
 * - < 6 children → RadioGroup
 * - >= 6 children → Select
 */
function inferGroupType(group: ASTNode): void {
  if (!group.children || group.children.length === 0) {
    return
  }

  // Check if children have yes/no values (toggles)
  const hasToggleChildren = group.children.some(child => child.type === 'toggle')

  if (hasToggleChildren) {
    // Rule: Bulleted yes/no → ToggleGroup
    group.type = 'togglegroup'
    return
  }

  // Children are options (radio/select)
  const optionCount = group.children.length

  if (optionCount < 6) {
    // Rule: < 6 options → RadioGroup
    group.type = 'radiogroup'
    // Convert option children to radio items
    group.children.forEach(child => {
      child.type = 'radio'
    })
  } else {
    // Rule: >= 6 options → Select
    group.type = 'select'
    // Children stay as options
  }
}

function parseValue(value: string, type: ComponentType): any {
  switch (type) {
    case 'switch':
    case 'toggle':
      return value === 'yes'

    case 'checkbox':
      return true  // Presence = checked

    case 'date':
    case 'daterange':
      // Keep as string, let component handle parsing
      return value

    default:
      return value
  }
}
```

### 2.5 Component Mapper (lib/parser/component-mapper.ts)

```typescript
import { ASTNode } from './ast-builder'
import { componentRegistry } from '@/components/component-registry'

export function mapASTToComponents(ast: ASTNode[]): React.ReactElement[] {
  return ast.map((node, index) => {
    const Component = getComponentByType(node.type)

    if (!Component) {
      console.warn(`No component found for type: ${node.type}`)
      return null
    }

    const props = {
      key: `${node.type}-${index}`,
      'nli-markdown': node.label,
      defaultValue: node.value,
      ...node.props
    }

    if (node.children) {
      return (
        <Component {...props}>
          {mapASTToComponents(node.children)}
        </Component>
      )
    }

    return <Component {...props} />
  }).filter(Boolean)
}

function getComponentByType(type: string): React.ComponentType<any> | null {
  const typeMap: Record<string, string> = {
    'input': 'Input',
    'textarea': 'Textarea',
    'switch': 'Switch',
    'toggle': 'Toggle',
    'checkbox': 'Checkbox',
    'radio': 'RadioGroup',
    'select': 'Select',
    'button': 'Button',
    'date': 'DatePicker',
    'daterange': 'DateRangePicker',
  }

  const registryKey = typeMap[type]
  if (!registryKey) return null

  const entry = componentRegistry[registryKey]
  return entry?.component || null
}
```

---

## Phase 3: Integration with ComponentViewerBidirectional

### 3.1 Add Parse Mode Toggle

```tsx
// ComponentViewerBidirectional.tsx
const [mode, setMode] = useState<'generate' | 'parse'>('generate')

return (
  <>
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setMode('generate')}
        className={mode === 'generate' ? 'active' : ''}
      >
        GUI → Markdown
      </button>
      <button
        onClick={() => setMode('parse')}
        className={mode === 'parse' ? 'active' : ''}
      >
        Markdown → GUI
      </button>
    </div>

    {mode === 'generate' ? (
      <GenerateMode />
    ) : (
      <ParseMode />
    )}
  </>
)
```

### 3.2 Parse Mode Component

```tsx
function ParseMode() {
  const [markdown, setMarkdown] = useState('')
  const [ast, setAST] = useState<FormAST | null>(null)

  const handleParse = () => {
    const tokens = tokenize(markdown)
    const result = buildAST(tokens)
    setAST(result)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3>Markdown Input</h3>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Paste markdown here..."
        />
        <Button onClick={handleParse}>Parse</Button>

        {ast?.errors.length > 0 && (
          <div className="errors">
            {ast.errors.map((error, i) => (
              <div key={i} className="error">
                Line {error.line}: {error.message}
                {error.suggestion && <div className="suggestion">{error.suggestion}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>Generated Form</h3>
        {ast && (
          <div className="preview">
            {mapASTToComponents(ast.components)}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Phase 4: Testing Strategy

### 4.1 Unit Tests

Test each module independently:

```typescript
// __tests__/tokenizer.test.ts
describe('tokenizer', () => {
  it('should tokenize field with value', () => {
    const tokens = tokenize('*Email:* user@example.com')
    expect(tokens[0]).toEqual({
      type: 'FIELD',
      label: 'Email',
      value: 'user@example.com',
      lineNumber: 1,
      raw: '*Email:* user@example.com'
    })
  })

  it('should tokenize button', () => {
    const tokens = tokenize('[Submit]')
    expect(tokens[0].type).toBe('BUTTON')
    expect(tokens[0].label).toBe('Submit')
  })

  // ... more tests
})

// __tests__/inference.test.ts
describe('inference', () => {
  it('should infer switch from yes/no', () => {
    expect(inferComponentType('yes')).toBe('switch')
    expect(inferComponentType('no')).toBe('switch')
  })

  it('should infer date from date format', () => {
    expect(inferComponentType('January 24, 2024')).toBe('date')
    expect(inferComponentType('2024-01-24')).toBe('date')
  })

  // ... more tests
})
```

### 4.2 Integration Tests

Test full markdown → component flow with new rules:

```typescript
describe('parser integration', () => {
  it('should parse login form', () => {
    const markdown = `
*Email:*
*Password:*
Remember me
[Sign In]
    `.trim()

    const tokens = tokenize(markdown)
    const ast = buildAST(tokens)

    expect(ast.components).toHaveLength(4)
    expect(ast.components[0].type).toBe('input')     // < 60 chars
    expect(ast.components[1].type).toBe('input')     // < 60 chars
    expect(ast.components[2].type).toBe('checkbox')  // Plain text
    expect(ast.components[3].type).toBe('button')    // [Bracket]
  })

  it('should use textarea for long content', () => {
    const markdown = `
*Short:* Less than one hundred twenty chars
*Long:* This is definitely a very long piece of text that exceeds one hundred and twenty characters and should therefore be rendered as a textarea component
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('input')
    expect(ast.components[1].type).toBe('textarea')
  })

  it('should infer switch for single yes/no', () => {
    const markdown = `
*Dark Mode:* yes
*Notifications:* no
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('switch')
    expect(ast.components[0].value).toBe(true)
    expect(ast.components[1].type).toBe('switch')
    expect(ast.components[1].value).toBe(false)
  })

  it('should infer togglegroup for bulleted yes/no', () => {
    const markdown = `
*Features:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('togglegroup')
    expect(ast.components[0].children).toHaveLength(3)
    expect(ast.components[0].children[0].type).toBe('toggle')
  })

  it('should infer radiogroup for < 6 options', () => {
    const markdown = `
*Size:*
- Small
- Medium
- Large
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('radiogroup')
    expect(ast.components[0].children).toHaveLength(3)
  })

  it('should infer select for >= 6 options', () => {
    const markdown = `
*Country:*
- USA
- Canada
- Mexico
- UK
- France
- Germany
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('select')
    expect(ast.components[0].children).toHaveLength(6)
  })

  it('should detect dates', () => {
    const markdown = `
*Birthday:* January 24, 2024
*Start Date:* 2024-01-24
*Vacation:* June 1, 2024 - June 15, 2024
    `.trim()

    const ast = buildAST(tokenize(markdown))

    expect(ast.components[0].type).toBe('date')
    expect(ast.components[1].type).toBe('date')
    expect(ast.components[2].type).toBe('daterange')
  })
})
```

### 4.3 Manual Test Cases

Create test markdown files:

```
__tests__/fixtures/
├── login-form.md
├── contact-form.md
├── settings-panel.md
├── complex-form.md
└── edge-cases.md
```

---

## Phase 5: Documentation

### 5.1 Update NLI_SPECIFICATION.md

Add parsing section with inference rules.

### 5.2 Create MARKDOWN_GUIDE.md

User-friendly guide for writing markdown:
- Quick start
- Common patterns
- Examples
- Troubleshooting

### 5.3 Template Library

Create `/templates/` directory:
- login.md
- contact.md
- registration.md
- settings.md
- survey.md

---

## Success Metrics

- [ ] Can parse 10+ common form patterns
- [ ] Inference accuracy > 95% on test cases
- [ ] Helpful error messages for all failure modes
- [ ] Bidirectional sync: GUI ↔ Markdown stays in sync
- [ ] Templates render correctly
- [ ] Documentation is clear to hand-writers

---

## Timeline Estimate

- **Phase 1 (Design)**: 1-2 days
- **Phase 2 (Core Parser)**: 3-5 days
- **Phase 3 (Integration)**: 2-3 days
- **Phase 4 (Testing)**: 2-3 days
- **Phase 5 (Documentation)**: 1-2 days

**Total: 2-3 weeks** for v0.1 parser with basic inference

---

## Future Enhancements (v0.2+)

- Context-aware inference (learn from previous fields)
- Support for validation rules in markdown
- Nested/hierarchical forms
- Conditional logic
- Multi-language support
- Visual diff for markdown changes
- AI-assisted markdown generation
- Import from other formats (JSON Schema, etc.)
