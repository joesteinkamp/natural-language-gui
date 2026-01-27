import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { RefObject } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DayPicker } from 'react-day-picker';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    label?: string;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const Input: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
}, "ref"> & React.RefAttributes<HTMLInputElement>>;

declare const Textarea: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLTextAreaElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
}, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;

declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;

declare const ToggleGroup: React.ForwardRefExoticComponent<((Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>) & React.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const CheckboxGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
} & React.RefAttributes<HTMLDivElement>>;
declare const CheckboxGroupItem: React.ForwardRefExoticComponent<Omit<Omit<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>, "ref">, "checked" | "onCheckedChange"> & {
    value: string;
} & React.RefAttributes<HTMLButtonElement>>;

declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const RadioGroupItem: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

type CalendarProps = React.ComponentProps<typeof DayPicker>;
declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

type ComboBoxOption = {
    label: string;
    value: string;
};
interface ComboBoxProps {
    options: ComboBoxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    label?: string;
    placeholder?: string;
    "nli-markdown"?: string;
}
declare function ComboBox({ options, value, onChange, label, placeholder, "nli-markdown": nliMarkdown, }: ComboBoxProps): react_jsx_runtime.JSX.Element;

interface ResizablePaneProps {
    /** Left pane content */
    left: React.ReactNode;
    /** Right pane content */
    right: React.ReactNode;
    /** Initial split percentage (0-100) */
    initialSplit?: number;
    /** Minimum pane width in pixels */
    minWidth?: number;
    /** LocalStorage key for persisting split position */
    storageKey?: string;
    /** Additional CSS classes for container */
    className?: string;
    /** Orientation (default: horizontal) */
    orientation?: 'horizontal' | 'vertical';
}
/**
 * ResizablePane component with draggable divider
 */
declare function ResizablePane({ left, right, initialSplit, minWidth, storageKey, className, orientation, }: ResizablePaneProps): react_jsx_runtime.JSX.Element;

/**
 * Parser type definitions
 */
/**
 * Token types for markdown parsing
 */
type TokenType = 'FIELD' | 'CHECKBOX' | 'BUTTON' | 'GROUP_HEADER' | 'GROUP_ITEM' | 'BLANK' | 'UNKNOWN';
/**
 * Parsed token with metadata
 */
interface Token {
    type: TokenType;
    line: string;
    lineNumber: number;
    label?: string;
    value?: string;
    explicitType?: string;
}
/**
 * Component types that can be inferred
 */
type ComponentType = 'input' | 'textarea' | 'switch' | 'checkbox' | 'button' | 'date' | 'daterange' | 'radiogroup' | 'radio' | 'select' | 'select-item' | 'togglegroup' | 'toggle-item' | 'checkboxgroup' | 'checkbox-item' | 'combobox';
/**
 * Context for component type inference
 */
interface InferenceContext {
    hasChildren?: boolean;
    childrenCount?: number;
    childrenHaveValues?: boolean;
    parentLabel?: string;
}
/**
 * AST node for a single component
 */
interface ASTNode {
    type: ComponentType;
    label: string;
    value?: string;
    children?: ASTNode[];
    metadata?: {
        lineNumber: number;
        inferredType?: boolean;
        lastProcessedLine?: number;
    };
}
/**
 * Complete AST representing the parsed form
 */
interface AST {
    nodes: ASTNode[];
    errors: ParseError[];
}
/**
 * Parse error information
 */
interface ParseError {
    line: number;
    message: string;
    severity: 'error' | 'warning';
}

/**
 * Component Mapper
 * Converts AST nodes to React component props
 */

/**
 * Props for a mapped component
 */
interface MappedComponent {
    type: ComponentType;
    props: Record<string, any>;
    children?: MappedComponent[];
    key: string;
}
/**
 * Map an AST to an array of mapped components
 *
 * @param nodes - Array of AST nodes
 * @returns Array of mapped components ready for rendering
 */
declare function mapASTToComponents(nodes: ASTNode[]): MappedComponent[];
/**
 * Extract values from mapped components (for form submission)
 *
 * @param components - Array of mapped components
 * @returns Key-value pairs of component labels and values
 */
declare function extractValues(components: MappedComponent[]): Record<string, any>;

/**
 * Markdown tokenizer for NLI parser
 * Breaks markdown into classified tokens for further processing
 */

/**
 * Tokenize markdown input into an array of classified tokens
 *
 * @param markdown - Raw markdown string
 * @returns Array of tokens with type and metadata
 */
declare function tokenize(markdown: string): Token[];
/**
 * Filter out blank tokens (useful for processing)
 */
declare function filterBlanks(tokens: Token[]): Token[];
/**
 * Get tokens with errors/warnings
 */
declare function getUnknownTokens(tokens: Token[]): Token[];

/**
 * Component type inference engine
 * Determines the appropriate component type based on markdown content and context
 */

/**
 * Infer component type based on value and context
 *
 * User's Deterministic Rules:
 * 1. Input vs Textarea: < 60 chars = Input, >= 60 chars = Textarea
 * 2. Switch vs ToggleGroup: Single yes/no = Switch, Bulleted yes/no = ToggleGroup
 * 3. CheckboxGroup vs ComboBox: Bulleted list with <= 5 options = CheckboxGroup, > 5 options = ComboBox
 * 4. Date detection: Match date patterns
 * 5. Checkbox: Plain text (standalone)
 * 6. Button: [Action] format
 *
 * @param value - The field value or content
 * @param explicitType - Optional type hint from markdown [type]
 * @param context - Context about surrounding elements (groups, children, etc.)
 * @returns Inferred component type
 */
declare function inferComponentType(value: string, explicitType?: string, context?: InferenceContext): ComponentType;
/**
 * Infer the type of a group based on its children
 *
 * @param children - Array of child values
 * @returns Inferred group component type
 */
declare function inferGroupType(children: Array<{
    label?: string;
    value?: string;
}>, explicitType?: string): ComponentType;
/**
 * Check if a value represents a boolean state
 */
declare function isBooleanValue(value: string): boolean;
/**
 * Parse boolean value to boolean
 */
declare function parseBooleanValue(value: string): boolean;

/**
 * AST (Abstract Syntax Tree) Builder
 * Converts tokens into a hierarchical structure representing form components
 */

/**
 * Build AST from tokenized markdown
 *
 * Groups tokens into parent-child relationships and applies type inference
 *
 * @param tokens - Array of classified tokens from tokenizer
 * @returns Complete AST with nodes and errors
 */
declare function buildAST(tokens: Token[]): AST;
/**
 * Validate AST for common issues
 *
 * @param ast - The AST to validate
 * @returns Array of validation errors
 */
declare function validateAST(ast: AST): ParseError[];

/**
 * Render an array of mapped components
 *
 * @param components - Array of mapped components from AST
 * @returns Array of rendered React elements
 */
declare function instantiateComponents(components: MappedComponent[], onComponentChange?: (label: string, value: string, type: string) => void): React.ReactElement[];
/**
 * Render components with a wrapper
 *
 * @param components - Array of mapped components
 * @param className - Optional className for wrapper
 * @returns Wrapped React element
 */
declare function InstantiatedForm({ components, className, }: {
    components: MappedComponent[];
    className?: string;
}): react_jsx_runtime.JSX.Element;

/**
 * Parse markdown into an AST
 *
 * This is the main entry point for the parser. It:
 * 1. Tokenizes the markdown into classified tokens
 * 2. Builds an AST with type inference
 * 3. Validates the AST for common issues
 *
 * @param markdown - Raw markdown string
 * @param options - Parser options
 * @returns AST with nodes and errors
 *
 * @example
 * ```typescript
 * const markdown = `
 * *Email:* john@example.com
 * *Password:* secret123
 * *Remember me:* yes
 * [Submit]
 * `
 *
 * const ast = parse(markdown)
 * console.log(printAST(ast))
 * ```
 */
declare function parse(markdown: string, options?: {
    /** Include blank lines in tokens (default: false) */
    includeBlanks?: boolean;
    /** Validate AST after building (default: true) */
    validate?: boolean;
    /** Print AST to console for debugging (default: false) */
    debug?: boolean;
}): AST;
/**
 * Parse markdown and convert to mapped components (ready for rendering)
 *
 * @param markdown - Raw markdown string
 * @returns Array of mapped components and any errors
 */
declare function parseToComponents(markdown: string): {
    components: MappedComponent[];
    errors: ParseError[];
    hasErrors: boolean;
};
/**
 * Parse markdown with caching
 *
 * @param markdown - Raw markdown string
 * @param options - Cache options
 * @returns Cached or fresh parse result
 */
declare function parseWithCache(markdown: string, options?: {
    /** Bypass cache (default: false) */
    skipCache?: boolean;
}): ReturnType<typeof parseToComponents>;
/**
 * Clear parse cache (useful for testing or manual cache invalidation)
 */
declare function clearParseCache(): void;

declare function cn(...inputs: ClassValue[]): string;

/**
 * Generate markdown for a given element
 *
 * @param element - The DOM element to generate markdown for
 * @param label - The nli-markdown attribute value (label/identifier)
 * @returns Markdown string or null if element should be omitted
 */
declare function generateMarkdownForElement(element: Element, label: string): string | null;
/**
 * Check if an element is a regular button (not checkbox/radio/switch/toggle)
 * Regular buttons are handled differently - they append to markdown on click
 * rather than being scanned for state
 *
 * @param element - The element to check
 * @returns true if element is a regular button
 */
declare function isRegularButton(element: Element | null): boolean;

declare function generateMarkdownFromComponent(component: MappedComponent, isInGroup?: boolean): string;
/**
 * Generate complete markdown from array of components
 * Uses component-based generation (not DOM-based)
 */
declare function generateMarkdownFromComponents(components: MappedComponent[]): string;
/**
 * Component-to-markdown mapping
 * Maps component keys to their markdown line positions
 */
interface ComponentMarkdownMap {
    componentKey: string;
    startLine: number;
    endLine: number;
    markdown: string;
}
/**
 * Generate markdown with component mapping
 * Useful for incremental updates
 */
declare function generateMarkdownWithMapping(components: MappedComponent[]): {
    markdown: string;
    mapping: ComponentMarkdownMap[];
};
/**
 * Incremental markdown update
 * Only regenerates changed components
 */
declare function updateMarkdownIncremental(previousMapping: ComponentMarkdownMap[], changedComponents: MappedComponent[], allComponents: MappedComponent[]): {
    markdown: string;
    mapping: ComponentMarkdownMap[];
};

/**
 * Cleans the markdown by removing unselected options and simplifying the output.
 *
 * Rules:
 * - Radio Group / Select: Removes all options, keeps only "*Label:* Value"
 * - Toggle Group: Keeps only options with "yes" value, formatted as bullet list
 * - Checkbox Group: Keeps only checked options, formatted as bullet list
 * - Combobox: If has children (multi-select), keeps only selected options as bullet list
 * - Text/Textarea/Switch/Date: Kept as is
 */
declare function cleanseMarkdown(markdown: string): string;

/**
 * Sync Reconciler
 * Orchestrates bidirectional updates with multi-layer loop prevention
 */

/**
 * Origin of an update (tracks where changes came from)
 */
type UpdateOrigin = 'gui' | 'markdown' | 'init';
/**
 * Sync status indicator
 */
type SyncStatus = 'idle' | 'syncing' | 'error';
/**
 * Reconciliation result
 */
interface ReconcileResult {
    shouldUpdateComponents: boolean;
    shouldUpdateMarkdown: boolean;
    components?: MappedComponent[];
    markdown?: string;
    error?: Error;
}
/**
 * Options for reconciler
 */
interface ReconcilerOptions {
    /**
     * Function to parse markdown to components
     */
    parseToComponents: (markdown: string) => {
        components: MappedComponent[];
        errors: any[];
        hasErrors: boolean;
    };
    /**
     * Function to generate markdown from components
     */
    generateMarkdown: (components: MappedComponent[]) => string;
    /**
     * Function to compare components for changes
     */
    diffComponents: (a: MappedComponent[], b: MappedComponent[]) => {
        hasChanges: boolean;
    };
    /**
     * Function to compare markdown for changes
     */
    diffMarkdown: (a: string, b: string) => {
        hasChanges: boolean;
    };
    /**
     * Callback when sync status changes
     */
    onSyncStatusChange?: (status: SyncStatus) => void;
    /**
     * Callback when parse errors occur
     */
    onParseErrors?: (errors: any[]) => void;
}
/**
 * Sync Reconciler Class
 * Manages bidirectional sync with loop prevention
 */
declare class SyncReconciler {
    private options;
    private syncLock;
    private updateQueue;
    private lastProcessedMarkdownSeq;
    private lastProcessedGuiSeq;
    private currentComponents;
    private currentMarkdown;
    private updateCount;
    private updateWindowStart;
    private readonly MAX_UPDATES_PER_SECOND;
    constructor(options: ReconcilerOptions);
    /**
     * Set current state (used for initialization)
     */
    setState(components: MappedComponent[], markdown: string): void;
    /**
     * Reconcile an update from either markdown or GUI
     */
    reconcileUpdate(origin: UpdateOrigin, content: string | MappedComponent[], sequence: number): ReconcileResult;
    /**
     * Process a single update
     */
    private processUpdate;
    /**
     * Process an update from markdown editor
     */
    private processMarkdownUpdate;
    /**
     * Process an update from GUI interaction
     */
    private processGuiUpdate;
    /**
     * Process queued updates
     */
    private processQueue;
    /**
     * Track update rate for circuit breaker
     */
    private trackUpdate;
    /**
     * Check if update rate limit is exceeded
     */
    private isUpdateRateLimitExceeded;
    /**
     * Get current reconciler state
     */
    getState(): {
        components: MappedComponent[];
        markdown: string;
        lastMarkdownSeq: number;
        lastGuiSeq: number;
        queueLength: number;
        isLocked: boolean;
    };
    /**
     * Reset reconciler state
     */
    reset(): void;
}
/**
 * Create a new sync reconciler instance
 */
declare function createSyncReconciler(options: ReconcilerOptions): SyncReconciler;

/**
 * Bidirectional Sync Hook
 * Manages synchronized state between markdown and GUI components
 */

/**
 * Options for bidirectional sync
 */
interface UseBidirectionalSyncOptions {
    /**
     * Initial markdown content
     */
    initialMarkdown?: string;
    /**
     * Initial components
     */
    initialComponents?: MappedComponent[];
    /**
     * Function to generate markdown from components
     */
    generateMarkdown: (components: MappedComponent[]) => string;
    /**
     * Debounce time for markdown changes (ms)
     */
    markdownDebounce?: number;
    /**
     * Debounce time for GUI changes (ms)
     */
    guiDebounce?: number;
    /**
     * Callback when sync errors occur
     */
    onSyncError?: (error: Error) => void;
    /**
     * Callback when parse errors occur
     */
    onParseErrors?: (errors: any[]) => void;
}
/**
 * State returned by useBidirectionalSync
 */
interface BidirectionalSyncState {
    /** Current component tree */
    components: MappedComponent[];
    /** Current markdown text */
    markdown: string;
    /** Last update origin */
    lastUpdateOrigin: UpdateOrigin;
    /** GUI sequence number */
    guiSequence: number;
    /** Markdown sequence number */
    markdownSequence: number;
    /** Current sync status */
    syncStatus: SyncStatus;
    /** Parse errors from last markdown update */
    parseErrors: any[];
    /** Update markdown (from editor) */
    updateMarkdown: (markdown: string) => void;
    /** Update components (from GUI) */
    updateComponents: (components: MappedComponent[]) => void;
    /** Reset sync state */
    reset: () => void;
}
/**
 * Bidirectional sync hook
 *
 * Manages synchronized state between markdown and GUI with loop prevention
 *
 * @param options - Sync options
 * @returns Bidirectional sync state and actions
 */
declare function useBidirectionalSync(options: UseBidirectionalSyncOptions): BidirectionalSyncState;

/**
 * Component Differ
 * Deep comparison of component arrays to detect changes
 */

/**
 * Diff result for component comparison
 */
interface ComponentDiff {
    hasChanges: boolean;
    added: MappedComponent[];
    removed: MappedComponent[];
    modified: Array<{
        oldComponent: MappedComponent;
        newComponent: MappedComponent;
    }>;
}
/**
 * Compare two component arrays for changes
 *
 * @param oldComponents - Previous component array
 * @param newComponents - New component array
 * @returns Diff result with changes
 */
declare function diffComponents(oldComponents: MappedComponent[], newComponents: MappedComponent[]): ComponentDiff;

/**
 * Markdown Differ
 * Comparison of markdown text with normalization
 */
/**
 * Diff result for markdown comparison
 */
interface MarkdownDiff {
    hasChanges: boolean;
    addedLines: number[];
    removedLines: number[];
    modifiedLines: Array<{
        lineNumber: number;
        oldContent: string;
        newContent: string;
    }>;
}
/**
 * Normalize markdown for comparison
 * Removes insignificant whitespace differences
 *
 * @param markdown - Raw markdown text
 * @returns Normalized markdown
 */
declare function normalizeMarkdown(markdown: string): string;
/**
 * Compare two markdown strings for changes
 *
 * @param oldMarkdown - Previous markdown
 * @param newMarkdown - New markdown
 * @param options - Comparison options
 * @returns Diff result
 */
declare function diffMarkdown(oldMarkdown: string, newMarkdown: string, options?: {
    /** Normalize whitespace before comparing (default: true) */
    normalize?: boolean;
    /** Provide detailed line-by-line diff (default: false) */
    detailed?: boolean;
}): MarkdownDiff;

/**
 * Cursor Manager
 * Utilities for preserving cursor position during updates
 */

/**
 * Cursor position
 */
interface CursorPosition {
    start: number;
    end: number;
}
/**
 * Save cursor position from textarea
 *
 * @param textareaRef - Reference to textarea element
 * @returns Cursor position or null
 */
declare function saveCursorPosition(textareaRef: RefObject<HTMLTextAreaElement | null>): CursorPosition | null;
/**
 * Restore cursor position to textarea
 *
 * @param textareaRef - Reference to textarea element
 * @param position - Cursor position to restore
 */
declare function restoreCursorPosition(textareaRef: RefObject<HTMLTextAreaElement | null>, position: CursorPosition | null): void;
/**
 * Preserve cursor position during an update
 *
 * @param textareaRef - Reference to textarea element
 * @param updateFn - Function that performs the update
 */
declare function preserveCursor(textareaRef: RefObject<HTMLTextAreaElement | null>, updateFn: () => void): void;
/**
 * Check if element is actively being edited
 *
 * @param element - Element to check
 * @returns true if element is focused and editable
 */
declare function isActivelyEditing(element: Element | null): boolean;

/**
 * Markdown Line Updater
 * Updates specific component lines in markdown without full regeneration
 */

/**
 * Parse markdown into lines with metadata
 */
interface MarkdownLine {
    content: string;
    lineNumber: number;
    isComponent: boolean;
    componentLabel?: string;
    isGroupHeader?: boolean;
    isGroupItem?: boolean;
    groupLabel?: string;
}
/**
 * Parse markdown into structured lines
 */
declare function parseMarkdownLines(markdown: string): MarkdownLine[];
/**
 * Update a specific component's line in the markdown
 */
declare function updateMarkdownLine(markdown: string, componentLabel: string, newValue: string, componentType: ComponentType): string;
/**
 * Format value for markdown based on component type
 */
declare function formatValueForMarkdown(value: any, type: ComponentType): string;

export { type AST, type ASTNode, type BidirectionalSyncState, Button, type ButtonProps, Calendar, type CalendarProps, Checkbox, CheckboxGroup, CheckboxGroupItem, ComboBox, type ComboBoxOption, type ComboBoxProps, type ComponentDiff, type ComponentType, type CursorPosition, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, type InferenceContext, Input, InstantiatedForm, type MappedComponent, type MarkdownDiff, type MarkdownLine, type ParseError, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, type ReconcilerOptions, ResizablePane, type ResizablePaneProps, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Switch, SyncReconciler, type SyncStatus, Textarea, Toggle, ToggleGroup, ToggleGroupItem, type Token, type TokenType, type UpdateOrigin, type UseBidirectionalSyncOptions, buildAST, buttonVariants, cleanseMarkdown, clearParseCache, cn, createSyncReconciler, diffComponents, diffMarkdown, extractValues, filterBlanks, formatValueForMarkdown, generateMarkdownForElement, generateMarkdownFromComponent, generateMarkdownFromComponents, generateMarkdownWithMapping, getUnknownTokens, inferComponentType, inferGroupType, instantiateComponents, isActivelyEditing, isBooleanValue, isRegularButton, mapASTToComponents, normalizeMarkdown, parse, parseBooleanValue, parseMarkdownLines, parseToComponents, parseWithCache, preserveCursor, restoreCursorPosition, saveCursorPosition, toggleVariants, tokenize, updateMarkdownIncremental, updateMarkdownLine, useBidirectionalSync, validateAST };
