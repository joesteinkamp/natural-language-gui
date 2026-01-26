import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
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

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    label?: string;
}
declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;

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
type ComponentType = 'input' | 'textarea' | 'switch' | 'checkbox' | 'button' | 'date' | 'daterange' | 'radiogroup' | 'select' | 'togglegroup' | 'checkboxgroup' | 'combobox';
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
declare function instantiateComponents(components: MappedComponent[]): React.ReactElement[];
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

export { type AST, type ASTNode, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, Calendar, type CalendarProps, Checkbox, CheckboxGroup, CheckboxGroupItem, ComboBox, type ComboBoxOption, type ComboBoxProps, type ComponentType, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, type InferenceContext, Input, InstantiatedForm, type MappedComponent, type ParseError, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Switch, Textarea, Toggle, ToggleGroup, ToggleGroupItem, type Token, type TokenType, buildAST, buttonVariants, cn, extractValues, filterBlanks, generateMarkdownForElement, getUnknownTokens, inferComponentType, inferGroupType, instantiateComponents, isBooleanValue, isRegularButton, mapASTToComponents, parse, parseBooleanValue, parseToComponents, toggleVariants, tokenize, validateAST };
