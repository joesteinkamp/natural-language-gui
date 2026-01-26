# Natural Language Interface Specification

Version: 0.1.0 (Draft)

## Overview

This document defines the canonical markdown format used for serializing GUI components to natural language and parsing natural language back to components.

## Design Goals

1. **Human Readable**: Output should be easily understood by humans
2. **Machine Parseable**: Unambiguous grammar for parsing back to components
3. **Concise**: Minimize verbosity while maintaining clarity
4. **Consistent**: Predictable patterns across component types
5. **Extensible**: Allow for new component types without breaking existing patterns

## Format Patterns

### Input Fields (Text, Email, Password, etc.)

**Pattern**: `*Label:* value`

**Examples**:
```markdown
*Email:* user@example.com
*Password:* ••••••••
*First Name:* John
*Bio:* I love building great products.
```

**Rules**:
- Label is wrapped in single asterisks
- Colon and space separate label from value
- Value is everything after the colon and space until newline
- Empty inputs show: `*Label:*` (empty value)
- Multi-line values (textarea) preserve newlines

**Component Mapping**: Input, Textarea

---

### Boolean Components (Switch, Toggle)

**Pattern**: `*Label:* yes|no`

**Examples**:
```markdown
*Dark Mode:* yes
*Notifications:* no
*Airplane Mode:* yes
```

**Rules**:
- Always use lowercase `yes` or `no` (never `true/false`, `on/off`, `1/0`)
- Both states are always shown (unlike checkboxes)
- Space between colon and value

**Component Mapping**: Switch, Toggle (with on/off state)

---

### Checkboxes

**Pattern**: `Label` (only when checked)

**Examples**:
```markdown
Accept terms and conditions
Enable beta features
Subscribe to newsletter
```

**Rules**:
- No asterisks or colons
- Only appears in output when checked
- Unchecked checkboxes are omitted entirely
- Label is plain text

**Rationale**: Checked = present, unchecked = absent. This is more natural in language ("I accept terms") than showing all options with yes/no.

**Component Mapping**: Checkbox (single, not in group)

---

### Radio Buttons

**Pattern**: `*Group Label:* Selected Option` followed by option list

**Examples**:
```markdown
*Theme:* Dark Mode
- Light Mode
- Dark Mode
- Auto

*Size:* Large
- Small
- Medium
- Large

*Priority:* High
- Low
- Medium
- High
```

**Rules**:
- Group label in asterisks followed by colon and selected value
- All available options listed with dash prefix (- Option)
- Selected value appears inline with the label
- Used when there are fewer than 6 options
- Options are listed in order

**Component Mapping**: RadioGroup (with RadioGroupItem children)

---

### Select / Combobox

**Pattern**: `*Label:* Selected Value` followed by option list

**Examples**:
```markdown
*Country:* United States
- United States
- Canada
- United Kingdom
- Germany
- France
- Japan
- Australia
- Brazil

*Language:* English
- English
- Spanish
- French
- German
- Chinese
- Japanese
```

**Rules**:
- Same format as radio buttons
- Label in asterisks, selected value inline after colon
- All options listed with dash prefix
- Used when there are 6 or more options
- Empty selection: `*Label:*` (no value) followed by options

**Component Mapping**: Select, Combobox

---

### Buttons (Actions)

**Pattern**: `[Action Label]` (appended, not replaced)

**Examples**:
```markdown
[Start]
[Submit]
[Cancel]
[Save] [Export] [Print]
```

**Rules**:
- Action wrapped in square brackets
- Each button click appends to the timeline
- Space-separated for multiple actions
- Actions accumulate, showing user's sequence of clicks
- Brackets make actions visually distinct from state

**Rationale**: Buttons represent actions taken, not current state. Output shows the sequence of user actions. Brackets distinguish actions from state values (e.g., `[Submit]` vs `*Email:* value`).

**Component Mapping**: Button

---

### Grouped Toggle Items

**Pattern**:
```markdown
*Group Label:*
- *Item 1:* yes
- *Item 2:* no
- *Item 3:* yes
```

**Examples**:
```markdown
*File Formats:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
- *PPTX:* no

*Features:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes
```

**Rules**:
- Group label with colon on first line
- Dash + space for each item
- Item labels in asterisks with yes/no state
- Indentation is optional but recommended

**Component Mapping**: ToggleGroup, CheckboxGroup

---

### Grouped Checkbox Items

**Pattern**:
```markdown
*Group Label:*
- Item 1
- Item 3
```

**Examples**:
```markdown
*Interests:*
- Music
- Sports
- Technology

*Permissions:*
- Read
- Write
```

**Rules**:
- Only checked items appear
- No yes/no suffix (presence = checked)
- Consistent with single checkbox behavior

**Component Mapping**: CheckboxGroup (showing only checked items)

---

## Grammar Rules

### Lexical Elements

**Label**: Text wrapped in single asterisks
```
*[any text except asterisk]*
```

**Value**: Any text after colon+space until newline
```
: [any text until \n]
```

**List Item**: Line starting with dash+space
```
- [content]
```

**Boolean**: Literal `yes` or `no` (lowercase only)
```
yes | no
```

### Syntax Rules

1. **Field Pattern**: `*Label:* Value\n`
2. **Boolean Pattern**: `*Label:* (yes|no)\n`
3. **Checkbox Pattern**: `Label\n`
4. **Action Pattern**: `[Action]\n` or `[Action] [Action] ...\n`
5. **Group Pattern**: `*Label:*\n(- Item\n)+`

### Reserved Characters

- `*` - Marks labels (doubled for group emphasis)
- `:` - Separates label from value
- `-` - List item marker
- `[` `]` - Wraps actions/buttons
- `\n` - Separates fields/components
- Space after `:` or `-` - Required separator

### Escaping

Currently no escaping mechanism. Consider for v2:
- `\*` for literal asterisk in labels
- `\:` for literal colon
- `\\` for literal backslash

## Examples

### Complete Form Example

**GUI State**:
- Email input: "john@example.com"
- Password input: "secret123"
- Remember me checkbox: checked
- Dark mode switch: on
- Language select: English
- Submit button: clicked

**Markdown Output**:
```markdown
*Email:* john@example.com
*Password:* secret123
Remember me
*Dark Mode:* yes
*Language:* English
[Submit]
```

### Settings Panel Example

**GUI State**:
- Notifications switch: on
- Email notifications switch: off
- Push notifications switch: on
- Sound effects toggle: on
- Vibration toggle: off

**Markdown Output**:
```markdown
*Notifications:* yes
*Email Notifications:* no
*Push Notifications:* yes
*Sound Effects:* yes
*Vibration:* no
```

### File Export Example

**GUI State**:
- File name input: "report.pdf"
- Include toggle group:
  - PDF: on
  - DOCX: off
  - XLSX: on
  - PPTX: off
- Compress checkbox: checked
- Export button: clicked

**Markdown Output**:
```markdown
*File Name:* report.pdf
*Include:*
- *PDF:* yes
- *XLSX:* yes
Compress files
[Export]
```

## Parsing Rules (for NL→GUI implementation)

### Parser Algorithm

1. **Tokenize**: Split input into lines
2. **Classify**: Determine line type (field, boolean, action, group, item)
3. **Group**: Associate items with their groups
4. **Resolve**: Map labels to component types
5. **Instantiate**: Create components with appropriate props

### Line Classification

```typescript
function classifyLine(line: string): LineType {
  if (line.match(/^\*[^*]+\*: (yes|no)$/)) return 'BOOLEAN';
  if (line.match(/^\*[^*]+\*: .+$/)) return 'FIELD';
  if (line.match(/^\*[^*]+\*:$/)) return 'GROUP_HEADER';
  if (line.match(/^- \*[^*]+\*: (yes|no)$/)) return 'GROUP_BOOLEAN_ITEM';
  if (line.match(/^- [^*]+$/)) return 'GROUP_CHECKBOX_ITEM';
  if (line.match(/^\[.+\]$/)) return 'ACTION';
  if (line.match(/^[^*-\[][^:]+$/)) return 'CHECKBOX';
  return 'UNKNOWN';
}
```

### Ambiguity Resolution

**Problem**: Multiple components with same label

**Solution Options**:
1. Use component type hints: `*Email [input]:* value`
2. Require unique labels across form
3. Use positional matching with component registry
4. Add explicit component IDs: `*Email {id=email1}:* value`

**Current Decision**: Require unique labels (simplest for v1)

### State Restoration

**Inputs**: Set `value` prop to extracted value
**Switches**: Set `checked` prop to `yes` → true, `no` → false
**Checkboxes**: Set `checked` to true if present, false if absent
**Radio/Select**: Set `value` to selected option value
**Buttons**: Don't restore (actions aren't state)

## Validation

### Valid Markdown Checks

1. ✅ All labels are properly wrapped in asterisks
2. ✅ Colons are followed by space (or newline for groups)
3. ✅ Boolean values are exactly `yes` or `no`
4. ✅ List items start with `- `
5. ✅ Group items follow group header
6. ✅ No orphaned group items (items without header)

### Common Errors

❌ `*Label:*value` - Missing space after colon
❌ `*Label: Yes` - Boolean capitalized
❌ `**Label:** value` - Double asterisks (emphasis, not label)
❌ `Label: value` - Missing asterisks
❌ `- Item` (not in group) - Orphaned list item
❌ `*Label* value` - Missing colon

## Extension Points

### Custom Component Types

Future: Allow registration of custom patterns

```typescript
registerPattern({
  name: 'DatePicker',
  pattern: /^\*([^*]+)\*: (\d{4}-\d{2}-\d{2})$/,
  parse: (label, date) => ({ label, value: new Date(date) }),
  serialize: (label, date) => `*${label}:* ${formatDate(date)}`
});
```

### Complex Values

Future: Support for structured values

```markdown
*Address:*
  *Street:* 123 Main St
  *City:* San Francisco
  *Zip:* 94102
```

### Conditional Logic

Future: Show/hide based on other fields

```markdown
*Shipping Method:* Express
  [if Express]
  *Delivery Date:* 2024-01-25
```

## Version History

- **v0.1.0** (2024-01): Initial specification
  - Basic patterns for common components
  - Simple grammar without nesting
  - Boolean as yes/no
  - Checkbox visibility pattern

## Future Considerations

- **v0.2.0**: Add escaping mechanism for special characters
- **v0.3.0**: Support nested/hierarchical structures
- **v0.4.0**: Conditional logic and dependencies
- **v1.0.0**: Stable specification for parser implementation

## References

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design philosophy
- [COMPONENT_AUTHORING.md](./COMPONENT_AUTHORING.md) - How to create NLI-compatible components
- [EXAMPLES.md](./EXAMPLES.md) - Concrete usage examples
