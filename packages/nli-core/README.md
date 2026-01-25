# @natural-language-gui/core

Bidirectional natural language interface component library for React.

## Features

- 🔄 **Bidirectional**: GUI ↔ Markdown conversion
- 📝 **Natural Language**: Markdown-based component descriptions
- ⚡ **Parser**: Automatic component inference from markdown
- ♿ **Accessible**: Built on Radix UI primitives
- 🎨 **Customizable**: Tailwind CSS styling
- 📦 **Tree-shakeable**: Import only what you need
- 🔒 **Type-safe**: Full TypeScript support

## Installation

```bash
npm install @natural-language-gui/core
```

### Peer Dependencies

```bash
npm install react react-dom @radix-ui/react-checkbox @radix-ui/react-select \
  @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group \
  @radix-ui/react-radio-group @radix-ui/react-dialog @radix-ui/react-popover \
  class-variance-authority clsx date-fns lucide-react react-day-picker tailwind-merge
```

## Quick Start

### Basic Components

```tsx
import { Button, Input, Switch } from '@natural-language-gui/core'

function MyForm() {
  return (
    <form>
      <Input nli-markdown="Email" type="email" />
      <Switch nli-markdown="Dark Mode" />
      <Button nli-markdown="Submit">Submit</Button>
    </form>
  )
}
```

### Parser (Markdown → GUI)

```tsx
import { parseToComponents, instantiateComponents } from '@natural-language-gui/core'

const markdown = `
*Email:* user@example.com
*Password:* secret
*Remember me:* yes
[Login]
`

function DynamicForm() {
  const { components, errors } = parseToComponents(markdown)
  const elements = instantiateComponents(components)

  return (
    <div>
      {errors.length > 0 && (
        <div>Errors: {errors.map(e => e.message).join(', ')}</div>
      )}
      <form>{elements}</form>
    </div>
  )
}
```

### Styles

Import the base styles in your app:

```tsx
// app/layout.tsx or _app.tsx
import '@natural-language-gui/core/styles'
```

Or configure Tailwind to include the library:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@natural-language-gui/core/dist/**/*.{js,mjs}',
  ],
}
```

## Components

### Input Components
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Checkbox` - Single checkbox
- `CheckboxGroup` - Multiple checkboxes
- `Switch` - Toggle switch
- `Toggle` - Toggle button
- `ToggleGroup` - Multiple toggle buttons
- `RadioGroup` - Radio button group
- `Select` - Dropdown select
- `ComboBox` - Searchable select

### Interactive Components
- `Button` - Action button
- `ButtonGroup` - Grouped buttons
- `Calendar` - Date picker calendar
- `Dialog` - Modal dialog
- `Popover` - Floating content

## Parser API

### `parseToComponents(markdown: string)`

Converts markdown to component descriptors.

```tsx
const { components, errors, hasErrors } = parseToComponents(markdown)
```

### `instantiateComponents(components: MappedComponent[])`

Renders React components from descriptors.

```tsx
const elements = instantiateComponents(components)
```

### `inferComponentType(value: string, explicitType?: string, context?: InferenceContext)`

Infers component type from markdown value.

```tsx
const type = inferComponentType('yes') // 'switch'
const type = inferComponentType('user@example.com') // 'input'
const type = inferComponentType('A very long text...', undefined, { hasChildren: false }) // 'textarea'
```

## Markdown Format

### Input Fields
```markdown
*Label:* value
```

### Switches/Toggles
```markdown
*Label:* yes
*Label:* no
```

### Checkboxes
```markdown
Checkbox label
```

### Buttons
```markdown
[Button Text]
```

### Groups
```markdown
*Group Label:*
- Item 1
- Item 2
- Item 3
```

### Radio Groups
```markdown
*Theme:*
- Light
- Dark
- System
```

### Toggle Groups
```markdown
*Include:*
- *PDF:* yes
- *DOCX:* no
```

## TypeScript

The library is fully typed. Import types as needed:

```tsx
import type {
  ComponentType,
  Token,
  ASTNode,
  MappedComponent,
  ParseResult,
  ValidationError,
} from '@natural-language-gui/core'
```

## Examples

See the [demo app](../../apps/demo) for comprehensive examples.

## Documentation

- [Architecture](../../docs/ARCHITECTURE.md)
- [NLI Specification](../../docs/NLI_SPECIFICATION.md)
- [Component Authoring](../../docs/COMPONENT_AUTHORING.md)

## License

MIT
