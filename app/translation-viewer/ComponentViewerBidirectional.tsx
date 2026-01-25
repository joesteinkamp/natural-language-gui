/**
 * Bidirectional Component Viewer
 * Supports both GUI → Markdown and Markdown → GUI modes
 */

"use client"

import * as React from "react"
import { componentRegistry } from "@/components/component-registry"
import { cn } from "@/lib/utils"
import { generateMarkdownForElement, isRegularButton } from "@/lib/markdown-generators"
import { parseToComponents, instantiateComponents } from "@/lib/parser"

import { ComboBox } from "@/components/ui/combo-box"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type ViewMode = 'gui-to-markdown' | 'markdown-to-gui'

interface ComponentViewerBidirectionalProps {
  children?: React.ReactNode
}

export function ComponentViewerBidirectional({ children }: ComponentViewerBidirectionalProps) {
  const components = Object.keys(componentRegistry).sort()
  const [viewMode, setViewMode] = React.useState<ViewMode>('gui-to-markdown')
  const [selectedComponents, setSelectedComponents] = React.useState<string[]>([])
  const [markdownInput, setMarkdownInput] = React.useState<string>("")
  const [markdownOutput, setMarkdownOutput] = React.useState<string>("")
  const [parseStatus, setParseStatus] = React.useState<'idle' | 'parsing' | 'success' | 'error'>('idle')
  const previewRef = React.useRef<HTMLDivElement>(null)
  const parseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const generateMarkdown = React.useCallback(() => {
    if (!previewRef.current) return;

    // Check target FIRST - avoid processing if wrong target
    const form = previewRef.current.querySelector('form[nli-target-id]');
    if (form) {
      const targetId = form.getAttribute('nli-target-id');
      if (targetId !== 'nli-result-output') {
        return; // Early exit
      }
    }

    const elements = previewRef.current.querySelectorAll('[nli-markdown]');
    let markdown = "";
    let lastGroupLabel: string | null = null;

    elements.forEach((element) => {
      const markdownAttribute = element.getAttribute('nli-markdown');
      if (!markdownAttribute) return;

      // Skip regular buttons - they're handled by click events
      if (isRegularButton(element)) return;

      // Use strategy pattern to generate markdown for this element
      const itemMarkdown = generateMarkdownForElement(element, markdownAttribute);

      if (itemMarkdown) {
        const groupContainer = element.closest('[nli-group-label]');
        const currentGroupLabel = groupContainer?.getAttribute('nli-group-label') ?? null;

        if (currentGroupLabel) {
          if (currentGroupLabel !== lastGroupLabel) {
            if (markdown) markdown += '\n';
            markdown += `*${currentGroupLabel}:*\n`;
            lastGroupLabel = currentGroupLabel;
          }
          markdown += `- ${itemMarkdown}\n`;
        } else {
          lastGroupLabel = null;
          if (markdown) markdown += '\n';
          markdown += `${itemMarkdown}\n`;
        }
      }
    });

    setMarkdownOutput(markdown);
  }, []);

  // Debounced markdown input handler
  const handleMarkdownInputChange = React.useCallback((value: string) => {
    setMarkdownInput(value)
    setParseStatus('parsing')

    // Clear previous timeout
    if (parseTimeoutRef.current) {
      clearTimeout(parseTimeoutRef.current)
    }

    // Debounce parsing for 300ms
    parseTimeoutRef.current = setTimeout(() => {
      try {
        const { errors, hasErrors } = parseToComponents(value)
        setParseStatus(hasErrors ? 'error' : 'success')
      } catch (error) {
        setParseStatus('error')
      }
    }, 300)
  }, [])

  // Update markdown when component selection changes or on mount (GUI → Markdown mode)
  React.useEffect(() => {
    if (viewMode !== 'gui-to-markdown') return;

    // Initial generation
    generateMarkdown();

    if (!previewRef.current) return;

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList) => {
      // Debounce if needed, but for now direct call should be fine for simple UI
      generateMarkdown();
    });

    // Start observing the target node for configured mutations
    observer.observe(previewRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['data-state', 'value', 'class', 'nli-markdown', 'data-date-value', 'data-date-from', 'data-date-to']
    });

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, [viewMode, selectedComponents, generateMarkdown]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (parseTimeoutRef.current) {
        clearTimeout(parseTimeoutRef.current)
      }
    }
  }, [])

  const handleInput = () => {
    if (viewMode === 'gui-to-markdown') {
      generateMarkdown();
    }
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== 'gui-to-markdown') return;

    const target = e.target as HTMLElement;
    // Find closest element with nli-markdown attribute, effectively handling clicks on children of the button
    const element = target.closest('[nli-markdown]');

    if (element &&
      element.tagName === 'BUTTON' &&
      element.getAttribute('role') !== 'checkbox' &&
      element.getAttribute('role') !== 'radio' &&
      element.getAttribute('role') !== 'switch' &&
      element.getAttribute('aria-pressed') === null) {

      // Check for target form
      const form = element.closest('form[nli-target-id]');
      if (form) {
        const targetId = form.getAttribute('nli-target-id');
        if (targetId !== 'nli-result-output') return;
      }

      const markdownAttribute = element.getAttribute('nli-markdown');
      if (markdownAttribute) {
        let processedMarkdown = markdownAttribute;

        // Handle variable interpolation
        const label = element.getAttribute('data-label') || "";
        const value = element.textContent || "";

        processedMarkdown = processedMarkdown.replace(/{label}/g, label);
        processedMarkdown = processedMarkdown.replace(/{value}/g, value);

        // Wrap button markdown in brackets
        processedMarkdown = `[${processedMarkdown}]`;

        setMarkdownOutput(prev => {
          const prefix = prev ? " " : "";
          return prev + prefix + processedMarkdown;
        });
      }

      // Prevent generateMarkdown from being called for button clicks
      // since buttons append actions rather than showing state
      e.stopPropagation();
    }
  };

  const renderComponents = () => {
    if (viewMode === 'gui-to-markdown') {
      // GUI to Markdown mode - render from component registry
      if (selectedComponents.length === 0) {
        return (
          <div className="flex items-center justify-center h-full text-slate-500">
            Select components to view them
          </div>
        )
      }

      return (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {selectedComponents.map((componentName, index) => {
            const entry = componentRegistry[componentName]
            if (!entry) return null
            const Component = entry.component
            return (
              <div key={`${componentName}-${index}`} className="flex justify-center w-full">
                <Component {...entry.props}>
                  {entry.children}
                </Component>
              </div>
            )
          })}
        </div>
      )
    } else {
      // Markdown to GUI mode - parse and render from markdown
      if (!markdownInput.trim()) {
        return (
          <div className="flex items-center justify-center h-full text-slate-500">
            Enter markdown to render components
          </div>
        )
      }

      try {
        const { components, errors } = parseToComponents(markdownInput)
        const elements = instantiateComponents(components)

        return (
          <div className="flex flex-col gap-6 w-full max-w-2xl">
            {errors.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-400 mb-2">Parsing Warnings:</p>
                <ul className="text-xs text-yellow-300 space-y-1">
                  {errors.map((error, i) => (
                    <li key={i}>
                      Line {error.line}: {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {elements.length > 0 ? (
              elements
            ) : (
              <div className="text-slate-500 text-sm">
                No valid components found in markdown
              </div>
            )}
          </div>
        )
      } catch (error) {
        return (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-red-400">Parse Error:</p>
            <p className="text-xs text-red-300 mt-1">
              {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        )
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
        {children}

        {/* Mode Toggle */}
        <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
          <label className="text-sm font-medium text-slate-400">View Mode:</label>
          <div className="flex items-center gap-2">
            <Switch
              checked={viewMode === 'markdown-to-gui'}
              onCheckedChange={(checked) => setViewMode(checked ? 'markdown-to-gui' : 'gui-to-markdown')}
            />
            <span className="text-sm text-slate-300">
              {viewMode === 'gui-to-markdown' ? 'GUI → Markdown' : 'Markdown → GUI'}
            </span>
          </div>
          <span className="text-xs text-slate-500 ml-auto">
            {viewMode === 'gui-to-markdown'
              ? 'Select components and interact with them to generate markdown'
              : 'Write markdown to render components'}
          </span>
        </div>

        {/* Component Selection (GUI → Markdown mode only) */}
        {viewMode === 'gui-to-markdown' && (
          <div className="w-full">
            <label className="text-sm font-medium text-slate-400 mb-2 block">
              Select Components
            </label>
            <div className="flex gap-2">
              <div className="flex-1 min-w-0">
                <ComboBox
                  options={components.map(c => ({ label: c, value: c }))}
                  value={selectedComponents}
                  onChange={setSelectedComponents}
                  label="Components"
                  placeholder="Select components to add..."
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedComponents([])}
                disabled={selectedComponents.length === 0}
                className="shrink-0"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        <div
          className="h-full relative rounded-xl border border-slate-800 bg-slate-950/50 shadow-sm min-h-[300px] flex-grow overflow-hidden flex flex-col"
          ref={previewRef}
          onInput={handleInput}
          onClick={handlePreviewClick}
          onClickCapture={(e) => {
            if (viewMode === 'gui-to-markdown') {
              const target = e.target as HTMLElement;
              const element = target.closest('[nli-markdown]');

              // Don't regenerate markdown for regular button clicks (they append instead)
              if (!isRegularButton(element)) {
                setTimeout(generateMarkdown, 0);
              }
            }
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-slate-500">Preview</span>
          </div>
          <div className="p-10 pt-16 w-full h-full overflow-y-auto flex flex-col items-center justify-start">
            <form nli-target-id="nli-result-output" className="contents" onSubmit={(e) => e.preventDefault()}>
              {renderComponents()}
            </form>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-400">
            {viewMode === 'gui-to-markdown' ? 'Markdown Output' : 'Markdown Input'}
          </label>
          {viewMode === 'markdown-to-gui' && (
            <span className={cn(
              "text-xs font-mono px-2 py-1 rounded",
              parseStatus === 'success' && "text-green-400 bg-green-500/10",
              parseStatus === 'error' && "text-red-400 bg-red-500/10",
              parseStatus === 'parsing' && "text-yellow-400 bg-yellow-500/10",
              parseStatus === 'idle' && "text-slate-500"
            )}>
              {parseStatus === 'success' && '✓ Valid'}
              {parseStatus === 'error' && '✗ Errors'}
              {parseStatus === 'parsing' && '⋯ Parsing'}
              {parseStatus === 'idle' && 'Ready'}
            </span>
          )}
        </div>
        <Textarea
          id="nli-result-output"
          placeholder={
            viewMode === 'gui-to-markdown'
              ? "Markdown will appear here..."
              : "Enter markdown here...\n\nExample:\n*Email:* john@example.com\n*Password:* secret\n*Remember me:* yes\n[Submit]"
          }
          className="h-full min-h-[500px] font-mono resize-none p-6 text-base bg-secondary/20"
          value={viewMode === 'gui-to-markdown' ? markdownOutput : markdownInput}
          onChange={(e) => {
            if (viewMode === 'markdown-to-gui') {
              handleMarkdownInputChange(e.target.value)
            } else {
              setMarkdownOutput(e.target.value)
            }
          }}
          readOnly={viewMode === 'gui-to-markdown'}
        />
      </div>
    </>
  )
}
