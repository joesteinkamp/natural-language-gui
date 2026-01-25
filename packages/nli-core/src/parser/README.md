# NLI Markdown Parser

Converts natural language markdown into a structured AST representing form components.

## Overview

The parser implements the deterministic inference rules specified in the NLI Specification:

1. **Input vs Textarea**: < 60 chars = Input, >= 60 chars = Textarea
2. **Switch vs ToggleGroup**: Single yes/no = Switch, Bulleted yes/no = ToggleGroup
3. **RadioGroup vs Select**: < 6 options = RadioGroup, >= 6 options = Select
4. **Date Detection**: Automatic detection of date formats
5. **Checkbox**: Plain text = Checkbox
6. **Button**: [Action] format

## Usage

### Basic Parsing

```typescript
import { parse, printAST } from '@/lib/parser'

const markdown = `
*Email:* john@example.com
*Password:* secret123
*Remember me:* yes
[Submit]
`

const ast = parse(markdown)
console.log(printAST(ast))
```

Output:
```
input: "Email" = "john@example.com"
input (inferred): "Password" = "secret123"
switch (inferred): "Remember me" = "yes"
button: "Submit"
```

### With Explicit Type Hints

You can override inference by adding type hints:

```typescript
const markdown = `
*Bio [textarea]:* Short text here
*Theme [select]:* Dark
`

const ast = parse(markdown)
```

Even though "Short text here" is < 120 chars, it will be parsed as `textarea` due to the explicit hint.

### Grouped Components

#### Toggle Group Example

```typescript
const markdown = `
*Export Formats:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
`

const ast = parse(markdown)
// Creates a togglegroup with 3 children
```

#### Radio Group Example

```typescript
const markdown = `
*Priority:*
- High
- Medium
- Low
`

const ast = parse(markdown)
// Creates a radiogroup (< 6 options)
```

#### Select Example

```typescript
const markdown = `
*Country:*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
- Japan
`

const ast = parse(markdown)
// Creates a select (>= 6 options)
```

### Character Count Threshold

```typescript
// Short text → Input
const markdown1 = `*Name:* John Doe`
// Result: input component

// Long text (>= 60 chars) → Textarea
const markdown2 = `*Bio:* ${longText}` // 60+ characters
// Result: textarea component
```

### Error Handling

```typescript
import { parse, getParseErrors } from '@/lib/parser'

const markdown = `
*Email:* test@example.com
- Orphaned item without header
Invalid line format
`

const errors = getParseErrors(markdown)
errors.forEach(error => {
  console.log(`Line ${error.line}: ${error.message}`)
})
```

### Validation

```typescript
import { isValidMarkdown } from '@/lib/parser'

if (isValidMarkdown(markdown)) {
  // Proceed with rendering
} else {
  // Show error to user
}
```

### Debug Mode

```typescript
import { debugParse } from '@/lib/parser'

debugParse(markdown)
// Prints full AST to console
```

## Architecture

The parser consists of four main modules:

### 1. Tokenizer (`tokenizer.ts`)

Breaks markdown into classified tokens:
- `FIELD` - *Label:* value
- `CHECKBOX` - plain text
- `BUTTON` - [Action]
- `GROUP_HEADER` - *Label:*
- `GROUP_ITEM` - list item
- `BLANK` - empty line
- `UNKNOWN` - unrecognized

### 2. Inference Engine (`inference.ts`)

Applies deterministic rules to infer component types:
- Character count analysis
- Date pattern matching
- Boolean detection
- Group type inference

### 3. AST Builder (`ast-builder.ts`)

Constructs hierarchical structure:
- Groups headers with items
- Applies type inference
- Tracks metadata (line numbers, inference flags)
- Validates structure

### 4. Main Parser (`index.ts`)

Orchestrates the pipeline:
1. Tokenize
2. Build AST
3. Validate
4. Return result

## Type Definitions

See `types.ts` for complete type definitions.

### Key Types

```typescript
// Token from tokenizer
interface Token {
  type: TokenType
  line: string
  lineNumber: number
  label?: string
  value?: string
  explicitType?: string
}

// AST Node
interface ASTNode {
  type: ComponentType
  label: string
  value?: string
  children?: ASTNode[]
  metadata?: {
    lineNumber: number
    inferredType?: boolean
  }
}

// Complete AST
interface AST {
  nodes: ASTNode[]
  errors: ParseError[]
}
```

## Component Type Mapping

| Markdown Pattern | Component Type | Rule |
|-----------------|----------------|------|
| `*Label:* text (< 60 chars)` | Input | Character count |
| `*Label:* text (>= 60 chars)` | Textarea | Character count |
| `*Label:* yes/no` | Switch | Boolean detection |
| `*Label:*\n- *Item:* yes/no` | ToggleGroup | Group with values |
| `*Label:*\n- Item (< 6)` | RadioGroup | Option count |
| `*Label:*\n- Item (>= 6)` | Select | Option count |
| `Plain text` | Checkbox | Standalone text |
| `[Action]` | Button | Bracket format |
| `*Label:* Jan 15, 2024` | Date | Date pattern |
| `*Label:* date - date` | DateRange | Range pattern |

## Testing

Example test cases demonstrating all rules:

```typescript
import { parse } from '@/lib/parser'

// Test 1: Character count threshold
const test1 = parse('*Name:* John')
// Expect: input (< 60 chars)

const test2 = parse(`*Bio:* ${'x'.repeat(60)}`)
// Expect: textarea (>= 60 chars)

// Test 2: Boolean detection
const test3 = parse('*Dark Mode:* yes')
// Expect: switch

// Test 3: Group option count
const test4 = parse(`
*Size:*
- Small
- Medium
- Large
`)
// Expect: radiogroup (3 < 6)

const test5 = parse(`
*Country:*
- USA
- Canada
- Mexico
- UK
- France
- Germany
`)
// Expect: select (6 >= 6)

// Test 4: Date detection
const test6 = parse('*Due Date:* January 15, 2024')
// Expect: date

const test7 = parse('*Date Range:* Jan 1, 2024 - Jan 31, 2024')
// Expect: daterange
```

## Bidirectional Conversion

The parser supports full bidirectional conversion:

### Markdown → GUI

```typescript
import { parseToComponents } from '@/lib/parser'
import { instantiateComponents } from '@/lib/parser'

const markdown = `
*Email:* john@example.com
*Remember me:* yes
[Submit]
`

const { components, errors } = parseToComponents(markdown)
const reactElements = instantiateComponents(components)
// Render reactElements in your React app
```

### End-to-End Example

```typescript
import { parseToComponents, instantiateComponents } from '@/lib/parser'

function MyForm() {
  const [markdown, setMarkdown] = React.useState('')

  const { components, errors } = parseToComponents(markdown)
  const elements = instantiateComponents(components)

  return (
    <div>
      <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
      <div>{elements}</div>
      {errors.length > 0 && (
        <div>
          {errors.map(err => <p key={err.line}>Line {err.line}: {err.message}</p>)}
        </div>
      )}
    </div>
  )
}
```

## Future Enhancements

- [ ] Multi-line value support (preserve newlines in textarea)
- [ ] Nested groups
- [ ] Custom component type registration
- [ ] Template validation
- [ ] Better error messages with suggestions
- [ ] Markdown syntax highlighting
- [ ] Auto-complete for markdown writing

## Related Documentation

- [NLI_SPECIFICATION.md](../../docs/NLI_SPECIFICATION.md) - Markdown format specification
- [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) - System architecture
- [PARSER_IMPLEMENTATION_PLAN.md](../../docs/PARSER_IMPLEMENTATION_PLAN.md) - Implementation plan
