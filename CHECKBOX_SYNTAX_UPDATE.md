# Checkbox Syntax Update

## Problem

Previously, unchecked/unselected options would disappear from the markdown to avoid adding "noise" for LLM prompts. However, this broke bidirectional syncing because components would appear/disappear as users toggled selections.

**Example of broken behavior:**
```markdown
*Choose toppings:*
- Pepperoni      # Only selected items shown
- Extra Cheese

# User unchecks "Pepperoni" → it disappears from markdown → breaks sync
```

## Solution

Updated syntax to use GitHub-flavored markdown checkbox notation `[x]` and `[ ]` for all multi-select patterns:

### New Syntax

**Standalone Checkboxes:**
```markdown
[x] I agree to terms
[ ] Send me emails
```

**Checkbox Groups (multi-select):**
```markdown
*Select toppings:*
[x] Pepperoni
[ ] Mushrooms
[x] Extra Cheese
```

**Radio Groups (single-select):**
```markdown
*Payment method:*
[x] Credit Card
[ ] PayPal
[ ] Bank Transfer
```

**Combobox (multi-select, 6+ options):**
```markdown
*Tags:*
[x] JavaScript
[x] TypeScript
[ ] Python
[ ] Rust
[ ] Go
[ ] Java
```

## Benefits

✅ **Perfect Bidirectional Sync**: All options always visible in markdown, preserving state during round-trips
✅ **Natural Syntax**: Familiar GitHub markdown checkbox notation
✅ **Explicit State**: Clear visual indication of checked vs unchecked
✅ **No Disappearing Components**: Options don't vanish when deselected
✅ **Works for All Multi-Select Patterns**: Checkboxes, radio buttons, checkbox groups, comboboxes

## Implementation Details

### Files Changed

1. **`packages/nli-core/src/parser/tokenizer.ts`**
   - Added `CHECKBOX_ITEM` pattern to recognize `[x]` and `[ ]` syntax
   - Updated button pattern to avoid conflicts
   - Removed plain text → checkbox conversion (prevents markdown headers from being treated as checkboxes)

2. **`packages/nli-core/src/parser/ast-builder.ts`**
   - Updated checkbox token handling to preserve checked/unchecked state
   - Updated group processing to accept CHECKBOX tokens as children
   - Fixed group child state propagation

3. **`packages/nli-core/src/parser/types.ts`**
   - Added child component types: `'radio'`, `'checkbox-item'`, `'toggle-item'`, `'select-item'`

4. **`packages/nli-core/src/parser/inference.ts`**
   - Fixed group type inference to recognize `value='false'` as checkbox state (not formatted value)
   - Checkbox items now correctly inferred as checkbox groups (not toggle groups)

5. **`packages/nli-core/src/parser/component-mapper.ts`**
   - Updated radiogroup to find selected item by `value === 'true'`
   - Simplified selection logic (no more "all selected" fallback)
   - Updated checkboxgroup to filter by `value === 'true'`

6. **`packages/nli-core/src/lib/markdown-generators.ts`**
   - Updated checkbox/radio generators to output `[x]`/`[ ]` syntax
   - Updated radiogroup generator to output all options with checkbox syntax
   - Updated checkboxgroup generator to output all options with checkbox syntax
   - Updated select/combobox generators to use checkbox syntax for options

7. **`apps/demo/components/ComponentViewerBidirectional.tsx`**
   - Updated component templates to use new checkbox syntax
   - Added `TopLevelComponentType` to exclude child types from form builder

### Backward Compatibility

The parser still supports legacy syntax:
- `- Option 1` (treated as checked for backward compatibility)
- Plain text standalone checkboxes (treated as checked)

However, the generator always outputs the new `[x]`/`[ ]` syntax, so old markdown will be upgraded on first edit.

## Testing

Created comprehensive tests verifying:
- ✅ Parsing of `[x]` and `[ ]` syntax
- ✅ Correct component type inference (checkbox groups vs radio groups vs togglegroups)
- ✅ Perfect round-trip: `markdown → components → markdown` produces identical output
- ✅ Checked state preserved for all component types
- ✅ Unchecked options remain in markdown (no disappearing)

**Test command:**
```bash
node test-final.js
# Output: ✅ PERFECT BIDIRECTIONAL SYNC!
```

## Migration Guide

If you have existing markdown using the old syntax, it will automatically convert on first parse/edit:

**Before (old syntax):**
```markdown
*Toppings:*
- Pepperoni    # Only selected shown
- Extra Cheese
```

**After (new syntax):**
```markdown
*Toppings:*
[x] Pepperoni
[ ] Mushrooms  # Now visible even when unchecked!
[x] Extra Cheese
[ ] Olives
```

## Future Considerations

### Context-Aware Generation (Optional Enhancement)

For LLM prompts that need minimal noise, you could add a `format` parameter:

```typescript
// For LLM prompts (compact - only selected)
generateMarkdown(components, { format: 'compact' })

// For bidirectional sync (full - all options)
generateMarkdown(components, { format: 'full' })
```

This is **not currently implemented** but could be added if needed.

## Examples

See:
- `test-checkbox-clean.md` - Clean example with new syntax
- `test-final.js` - Verification script showing perfect round-trip sync
