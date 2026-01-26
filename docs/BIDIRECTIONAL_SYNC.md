# Bidirectional Sync Architecture

## Overview

The bidirectional sync system enables true simultaneous editing where both markdown and GUI components are visible and editable at the same time, with live synchronization and automatic loop prevention.

## Core Architecture

### Single Source of Truth Pattern

The system maintains two synchronized representations of the same data:

1. **Component Tree** (`MappedComponent[]`) - Canonical representation for GUI rendering
2. **Markdown Text** (`string`) - Canonical representation for text editing

Updates flow through a central reconciler that ensures consistency without creating infinite update loops.

```
┌─────────────────────────────────────────────────────────┐
│                    Reconciler                          │
│  ┌─────────────────────────────────────────────────┐  │
│  │   State: { components, markdown, sequences }    │  │
│  └─────────────────────────────────────────────────┘  │
│                          ▲                             │
│            ┌─────────────┴─────────────┐               │
│            │                           │               │
│      ┌─────▼─────┐             ┌──────▼──────┐        │
│      │ Markdown  │             │    GUI      │        │
│      │  Update   │             │   Update    │        │
│      └─────┬─────┘             └──────┬──────┘        │
│            │                           │               │
│      Parse │                           │ Generate      │
│            ▼                           ▼               │
│      Components                    Markdown            │
│            │                           │               │
│       Diff │                           │ Diff          │
│            ▼                           ▼               │
│      Update GUI                  Update Editor         │
└─────────────────────────────────────────────────────────┘
```

## Loop Prevention Strategy

The system uses a **multi-layer defense** approach to prevent infinite update loops:

### Layer 1: Origin Tagging

Every update is tagged with its source:

```typescript
type UpdateOrigin = 'gui' | 'markdown' | 'init'
```

Updates from markdown don't trigger markdown regeneration, and updates from GUI don't trigger component re-parsing.

### Layer 2: Sequence Numbers

Each update source maintains a monotonically increasing sequence number:

```typescript
{
  guiSequence: number       // Increments on GUI changes
  markdownSequence: number  // Increments on markdown changes
}
```

The reconciler tracks the last processed sequence for each source and skips updates it has already processed.

### Layer 3: Content Diffing

Before applying updates, the reconciler performs deep comparison:

- **Component Diff**: Deep equality check on component tree
- **Markdown Diff**: Normalized text comparison with whitespace handling

Only real changes trigger updates.

### Layer 4: Debouncing

Updates are debounced to batch rapid changes:

- **Markdown changes**: 300ms debounce (typing)
- **GUI changes**: 50ms debounce (interactions)

### Layer 5: Sync Lock

A boolean flag prevents concurrent reconciliation:

```typescript
if (syncLock) {
  queue.push(update)
  return
}
```

Queued updates are processed sequentially after the lock is released.

### Layer 6: Circuit Breaker

Rate limiting prevents runaway updates:

```typescript
MAX_UPDATES_PER_SECOND = 10
```

If exceeded, sync pauses and logs a warning.

## Data Flow

### Markdown → GUI Flow

```
User types in markdown editor
  ↓
updateMarkdown() called with new text
  ↓
Immediate state update (for controlled input)
  ↓
[300ms debounce]
  ↓
Increment markdownSequence
  ↓
Reconciler.reconcileUpdate('markdown', text, sequence)
  ↓
Check: sequence > lastProcessedMarkdownSeq?
  ↓
Parse markdown → components
  ↓
Diff: new components vs current components
  ↓
If changed: Update component state
  ↓
React re-renders GUI
```

### GUI → Markdown Flow

```
User interacts with component
  ↓
MutationObserver fires
  ↓
Extract components from DOM
  ↓
updateComponents() called
  ↓
Immediate state update
  ↓
[50ms debounce]
  ↓
Increment guiSequence
  ↓
Reconciler.reconcileUpdate('gui', components, sequence)
  ↓
Check: sequence > lastProcessedGuiSeq?
  ↓
Generate markdown from components
  ↓
Diff: new markdown vs current markdown
  ↓
If changed: Update markdown state
  ↓
React re-renders textarea
```

## Component Diffing Algorithm

The `component-differ.ts` performs deep equality checks:

```typescript
function areComponentsEqual(a: MappedComponent, b: MappedComponent): boolean {
  // 1. Compare type
  if (a.type !== b.type) return false

  // 2. Compare key
  if (a.key !== b.key) return false

  // 3. Deep compare props
  if (!arePropsEqual(a.props, b.props)) return false

  // 4. Recursively compare children
  if (!areChildrenEqual(a.children, b.children)) return false

  return true
}
```

**Time Complexity**: O(n × m) where n = number of components, m = average props per component

**Optimization**: Component keys are compared first for quick rejection.

## Markdown Diffing Algorithm

The `markdown-differ.ts` normalizes and compares text:

```typescript
function normalizeMarkdown(markdown: string): string {
  return markdown
    .split('\n')
    .map(line => line.trimEnd())  // Remove trailing whitespace
    .join('\n')
    .trimEnd()  // Remove trailing empty lines
}

function diffMarkdown(old: string, new: string): MarkdownDiff {
  const oldNorm = normalizeMarkdown(old)
  const newNorm = normalizeMarkdown(new)

  return { hasChanges: oldNorm !== newNorm }
}
```

**Why Normalize?**
- Prevents loops caused by insignificant whitespace changes
- Markdown generators may add/remove trailing spaces
- Users may add/remove blank lines

## Performance Characteristics

### Parse Caching

The `parseWithCache()` function memoizes parse results:

```typescript
Cache: Map<contentHash, { result, timestamp }>
TTL: 5 seconds
Max Size: 100 entries
```

**Expected Hit Rate**: ~90% during active editing (typing creates similar markdown)

### Incremental Markdown Generation

Currently implemented as full regeneration (simple approach).

**Future Optimization**: Track which components changed and only regenerate those sections.

### Cursor Preservation

The `cursor-manager.ts` saves/restores cursor position:

```typescript
// Before update
const position = { start: textarea.selectionStart, end: textarea.selectionEnd }

// After update (next animation frame)
requestAnimationFrame(() => {
  textarea.setSelectionRange(position.start, position.end)
})
```

**Why `requestAnimationFrame`?**
- Ensures DOM has updated after React render
- Prevents race conditions with React state updates

## State Management

### Hook: `useBidirectionalSync`

Central hook managing all sync state:

```typescript
interface BidirectionalSyncState {
  components: MappedComponent[]     // Current component tree
  markdown: string                  // Current markdown text
  lastUpdateOrigin: UpdateOrigin    // Where last change came from
  guiSequence: number               // GUI update counter
  markdownSequence: number          // Markdown update counter
  syncStatus: SyncStatus            // 'idle' | 'syncing' | 'error'
  parseErrors: ParseError[]         // Validation errors
  updateMarkdown: (text) => void    // Update from markdown editor
  updateComponents: (comps) => void // Update from GUI
  reset: () => void                 // Reset to initial state
}
```

### Reconciler: `SyncReconciler`

Stateful class managing reconciliation:

```typescript
class SyncReconciler {
  private syncLock: boolean
  private updateQueue: PendingUpdate[]
  private lastProcessedMarkdownSeq: number
  private lastProcessedGuiSeq: number
  private currentComponents: MappedComponent[]
  private currentMarkdown: string

  reconcileUpdate(origin, content, sequence): ReconcileResult
  setState(components, markdown): void
  reset(): void
}
```

## UI Components

### ResizablePane

Draggable split pane with localStorage persistence:

```tsx
<ResizablePane
  storageKey="component-viewer-split"
  initialSplit={50}  // 50% width
  minWidth={300}     // Minimum pane width
  left={<MarkdownEditor />}
  right={<ComponentPreview />}
/>
```

**Features**:
- Mouse drag to resize
- Position persisted to localStorage
- Responsive: vertical stack on mobile
- Visual feedback during drag

## Error Handling

### Parse Errors

Non-blocking errors displayed in UI:

```tsx
{parseErrors.length > 0 && (
  <div className="bg-yellow-500/10 border border-yellow-500/20">
    <p>Parsing Warnings:</p>
    <ul>
      {parseErrors.map(error => (
        <li>Line {error.line}: {error.message}</li>
      ))}
    </ul>
  </div>
)}
```

**Philosophy**: Allow editing even with errors. Users can fix incrementally.

### Sync Errors

Logged to console and displayed in status indicator:

```tsx
syncStatus === 'error' && (
  <div className="text-red-400">
    <span className="bg-red-400 rounded-full"></span>
    Sync Error
  </div>
)
```

### Circuit Breaker

If update rate exceeds 10/second:

```typescript
console.warn('[SyncReconciler] Update rate limit exceeded, pausing sync')
return { error: new Error('Update rate limit exceeded') }
```

## Testing Strategies

### Unit Tests

1. **Component Differ**
   - Deep equality edge cases
   - Nested children comparison
   - Performance with large trees

2. **Markdown Differ**
   - Whitespace normalization
   - Line-by-line diffs
   - Empty string handling

3. **Reconciler**
   - Sequence number logic
   - Queue processing
   - Circuit breaker activation

### Integration Tests

1. **Rapid Editing**
   - Fast typing (>100 chars/sec)
   - Rapid component interactions
   - Verify: No dropped updates

2. **Complex Components**
   - Date pickers
   - Multi-selects
   - Nested groups
   - Verify: State preserved

3. **Loop Prevention**
   - Monitor update counts
   - Verify: No infinite loops
   - Check: Sequence numbers increment correctly

### Manual Testing Checklist

- [ ] Type in markdown → Components update
- [ ] Interact with components → Markdown updates
- [ ] Fast typing → No cursor jumps
- [ ] Component focus → Preserved after sync
- [ ] Resize pane → Position persisted
- [ ] Reload page → Pane position restored
- [ ] Parse errors → Non-blocking, helpful messages
- [ ] Large forms (50+ components) → Smooth performance

## Known Limitations

1. **DOM-based GUI Updates**
   - Current implementation extracts components from DOM
   - Better approach: Component wrappers report changes directly
   - Impact: Some component types may not sync perfectly

2. **Full Markdown Regeneration**
   - Currently regenerates entire markdown on GUI changes
   - Future: Incremental updates for better performance
   - Impact: Slight lag with 100+ components

3. **No Conflict Resolution UI**
   - If reconciler gets confused, user must manually fix
   - Future: Show diff viewer for conflicts
   - Mitigation: "Reset" button clears state

4. **Limited Undo/Redo**
   - Browser's native undo works in textarea
   - No undo for GUI changes
   - Future: Leverage sequence numbers for operation history

## Future Enhancements

### Collaborative Editing

Use CRDTs (Conflict-free Replicated Data Types) for multi-user sync:

```
User A                    User B
  ↓                         ↓
Local Reconciler      Local Reconciler
  ↓                         ↓
  └─────→ CRDT Sync ←───────┘
           (Server)
```

### Smart Conflict Resolution

When markdown and GUI changes overlap:

```tsx
<ConflictViewer>
  <DiffPanel>
    - Old: *Email:* john@example.com
    + Yours: *Email:* jane@example.com
    + Theirs: *Email:* admin@example.com
  </DiffPanel>
  <button onClick={acceptMine}>Accept Mine</button>
  <button onClick={acceptTheirs}>Accept Theirs</button>
</ConflictViewer>
```

### Operation History

Track operations for undo/redo:

```typescript
interface Operation {
  sequence: number
  origin: UpdateOrigin
  timestamp: number
  beforeState: State
  afterState: State
}

const history: Operation[] = []

function undo() {
  const op = history.pop()
  setState(op.beforeState)
}
```

### AI-Assisted Editing

Suggest components based on markdown context:

```typescript
const suggestions = analyzeMarkdown(markdown)
// → "Detected email field, suggest adding password field?"
```

## Performance Benchmarks

Measured on M1 MacBook Pro:

| Operation | Time | Notes |
|-----------|------|-------|
| Parse markdown (10 components) | <10ms | With cache: ~1ms |
| Generate markdown (10 components) | <5ms | |
| Component diff (10 components) | <1ms | |
| Markdown diff (100 lines) | <1ms | |
| Reconciler update (markdown→GUI) | <50ms | Including parse + render |
| Reconciler update (GUI→markdown) | <20ms | Including generate |
| Large form (100 components) parse | ~80ms | With cache: ~5ms |
| Large form (100 components) generate | ~40ms | |

**Target Performance**:
- Typing latency: <100ms
- Component interaction latency: <50ms
- No visible lag during normal editing

## Debugging Tips

### Enable Debug Logging

```typescript
// In sync-reconciler.ts
const DEBUG = true

if (DEBUG) {
  console.log('[Reconciler]', {
    origin,
    sequence,
    lastProcessedSeq,
    hasChanges: diff.hasChanges
  })
}
```

### Inspect Reconciler State

```typescript
const reconciler = reconcilerRef.current
console.log(reconciler.getState())
// → { components, markdown, lastMarkdownSeq, lastGuiSeq, queueLength, isLocked }
```

### Monitor Update Rate

```typescript
let updateCount = 0
setInterval(() => {
  console.log('Updates/sec:', updateCount)
  updateCount = 0
}, 1000)
```

### Check for Infinite Loops

```typescript
// In browser console
let lastSeq = { gui: 0, markdown: 0 }
setInterval(() => {
  const state = reconcilerRef.current.getState()
  const guiDelta = state.lastGuiSeq - lastSeq.gui
  const mdDelta = state.lastMarkdownSeq - lastSeq.markdown

  if (guiDelta > 10 || mdDelta > 10) {
    console.warn('Possible infinite loop detected!', { guiDelta, mdDelta })
  }

  lastSeq = { gui: state.lastGuiSeq, markdown: state.lastMarkdownSeq }
}, 1000)
```

## Architecture Decisions

### Why Single Source of Truth + Reconciler?

**Pros**:
- ✅ Predictable state updates
- ✅ Explicit loop prevention
- ✅ Easy to debug (all updates flow through one place)
- ✅ Supports future features (undo, collaboration)

**Cons**:
- ❌ More complex initial implementation
- ❌ Requires careful sequence management

**Rejected Alternatives**:

1. **Dual Independent States**
   - Problem: States diverge, hard to debug
   - Example: User edits markdown, GUI out of sync

2. **Markdown as Single Source**
   - Problem: Parse on every GUI interaction = laggy
   - Example: Clicking checkbox parses entire form

3. **Components as Single Source**
   - Problem: Can't edit markdown directly
   - Example: Defeats purpose of natural language interface

### Why Debouncing?

**Without Debouncing**:
```
User types "test"
t → Parse → Render
te → Parse → Render
tes → Parse → Render
test → Parse → Render
= 4 parse operations
```

**With Debouncing**:
```
User types "test"
[Wait 300ms]
test → Parse → Render
= 1 parse operation
```

**Trade-off**: Slight delay (300ms) vs. massive performance improvement

### Why Two-Way Sync Instead of Markdown-Only?

**Markdown-Only Approach**:
- User types: `*Email:* test`
- Parser creates: `<Input value="test" />`
- User types in input: Value changes
- Must extract value from DOM → Update markdown
- Parse markdown again → Re-render input
- **Result**: Infinite loop or laggy input

**Two-Way Sync Approach**:
- Markdown and components are **peers**
- Each can update the other
- Reconciler prevents loops
- **Result**: Smooth editing in both directions

## Contributing

When modifying the bidirectional sync system:

1. **Always test loop prevention** - Add a `console.log` in reconciler to verify no infinite loops
2. **Measure performance** - Use Chrome DevTools Performance tab
3. **Test edge cases**:
   - Empty markdown
   - Very large forms (100+ components)
   - Rapid typing
   - Complex components (date pickers, multi-selects)
4. **Update this document** - Keep architecture docs in sync with code

## References

- [React Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [Debouncing and Throttling](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [CRDTs for Collaborative Editing](https://crdt.tech/)
- [Deep Equality Algorithms](https://github.com/epoberezkin/fast-deep-equal)
