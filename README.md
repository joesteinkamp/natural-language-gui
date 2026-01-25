# Natural Language Interface

A **bidirectional natural language interface** for React components that enables seamless conversion between GUI interactions and human-readable markdown.

## Overview

This project bridges the gap between graphical user interfaces and natural language, enabling:
- **GUI → Markdown**: Components serialize their state into natural language markdown
- **Markdown → GUI**: Parser converts natural language markdown into rendered components

Perfect for AI systems, voice interfaces, form automation, and any scenario where you need to programmatically interact with UIs using natural language.

## Key Features

- **Bidirectional Conversion**: Full two-way translation between GUI and markdown
- **Natural Syntax**: Human-readable format that feels like writing natural language
- **Type-Safe**: Built with TypeScript for full type safety
- **Accessible**: Built on Radix UI primitives with ARIA support
- **Composable**: Works with any React component library
- **Real-Time**: Live preview and parsing with instant feedback

## Quick Start

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the interactive demo.

## Examples

### Login Form

**GUI Interaction** → **Natural Language Output**:

```markdown
*Email:* john@example.com
*Password:* secret123
*Remember me:* yes
[Submit]
```

### Settings Panel

```markdown
*Dark Mode:* yes
*Notifications:* yes
*Email Notifications:* no
*Language:* English
[Save Changes]
```

### File Export

```markdown
*File Name:* report.pdf
*Include:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
*Compress files:* yes
[Export]
```

## Markdown Syntax

The natural language format follows intuitive patterns:

| Component Type | Syntax | Example |
|---------------|--------|---------|
| Text Input | `*Label:* value` | `*Email:* user@example.com` |
| Switch/Toggle | `*Label:* yes\|no` | `*Dark Mode:* yes` |
| Checkbox | `Label` (when checked) | `Accept terms` |
| Button | `[Action]` | `[Submit]` |
| Select | `*Label:* option` | `*Theme:* Dark` |
| Radio Group | `*Label:* option` | `*Size:* Large` |
| Date Picker | `*Label:* Month DD, YYYY` | `*Due Date:* January 25, 2024` |

### Grouped Items

```markdown
*Interests:*
- Music
- Sports
- Technology

*File Formats:*
- *PDF:* yes
- *DOCX:* no
```

## Architecture

```
┌─────────────────┐
│   Components    │  React components with nli-markdown props
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ NLI Attributes  │  Components expose nli-markdown attributes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Markdown Gen    │  Scans DOM and generates markdown
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Parser      │  Converts markdown to component AST
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Instantiator   │  Renders components from AST
└─────────────────┘
```

### Key Design Principles

1. **Separation of Concerns**: Components remain unaware of NLI implementation
2. **DOM-Based**: Uses MutationObserver for state tracking
3. **Declarative**: Components describe themselves via attributes
4. **Parser-Driven**: Formal grammar for unambiguous parsing

## Project Structure

```
natural-language-gui/
├── app/
│   ├── page.tsx                          # Home page
│   └── translation-viewer/
│       └── ComponentViewerBidirectional.tsx  # Core bidirectional viewer
├── components/
│   ├── ui/                               # NLI-enabled components
│   └── component-registry.tsx            # Component examples registry
├── lib/
│   ├── parser/                           # Markdown parser implementation
│   │   ├── tokenizer.ts                  # Lexical analysis
│   │   ├── ast-builder.ts                # AST construction
│   │   ├── component-mapper.ts           # Component type inference
│   │   ├── instantiator.tsx              # React component instantiation
│   │   └── index.ts                      # Main parser entry point
│   └── markdown-generators.ts            # GUI → Markdown generators
├── types/
│   └── nli.d.ts                          # TypeScript declarations
└── docs/                                 # Documentation
    ├── NLI_SPECIFICATION.md              # Markdown format specification
    ├── ARCHITECTURE.md                   # Architecture deep dive
    ├── COMPONENT_AUTHORING.md            # Creating NLI components
    └── EXAMPLES.md                       # Usage examples
```

## Documentation

- **[NLI Specification](docs/NLI_SPECIFICATION.md)**: Complete markdown format specification
- **[Architecture](docs/ARCHITECTURE.md)**: System design and philosophy
- **[Component Authoring](docs/COMPONENT_AUTHORING.md)**: Guide to creating NLI-compatible components
- **[Examples](docs/EXAMPLES.md)**: Practical usage examples

## Use Cases

- **AI Assistants**: Enable LLMs to interact with forms programmatically
- **Voice Interfaces**: Convert voice commands to GUI interactions
- **Test Automation**: Write readable, maintainable test scripts
- **Form Serialization**: Save and restore form state in human-readable format
- **API Integration**: Generate API requests from UI interactions
- **Documentation**: Auto-generate documentation from UI flows
- **Accessibility**: Alternative interaction method for assistive technologies

## Parser CLI Tools

Run parser tests and examples:

```bash
# Test parser rules
npm run parser:test

# Run parser example
npm run parser:example

# Test bidirectional conversion
npm run parser:bidirectional
```

## Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript 5**: Full type safety
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **date-fns**: Date manipulation and formatting

## Creating NLI-Compatible Components

Components need only forward the `nli-markdown` prop to their root element:

```tsx
import * as React from "react"

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <SwitchPrimitives.Root
        {...props}  // nli-markdown passed through automatically
        ref={ref}
        className={className}
      />
    )
  }
)
```

Usage:

```tsx
<Switch nli-markdown="Dark Mode" checked={isDark} onCheckedChange={setIsDark} />
```

See [Component Authoring Guide](docs/COMPONENT_AUTHORING.md) for detailed instructions.

## Contributing

Contributions are welcome! Areas that need help:

- Adding test coverage (unit and integration tests)
- Performance optimizations for large forms
- Additional component types (color picker, file upload, etc.)
- Browser extension for inspecting NLI attributes
- Documentation improvements

## Roadmap

- [ ] Comprehensive test suite
- [ ] Escaping mechanism for special characters
- [ ] Nested/hierarchical component support
- [ ] Validation and error recovery
- [ ] Browser DevTools extension
- [ ] npm package release
- [ ] Interactive playground with shareable URLs
- [ ] VS Code extension for syntax highlighting

## License

MIT

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) for component inspiration

## Questions or Feedback?

Open an issue or start a discussion. We'd love to hear your use cases and ideas!
