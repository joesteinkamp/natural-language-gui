"use client"

import * as React from "react"
import { componentRegistry } from "@/components/component-registry"
import { cn } from "@/lib/utils"

import { Textarea } from "@/components/ui/textarea"

interface ComponentViewerProps {
  children?: React.ReactNode
}

export function ComponentViewer({ children }: ComponentViewerProps) {
  const components = Object.keys(componentRegistry).sort()
  const [selectedComponent, setSelectedComponent] = React.useState<string>("")
  const [markdownOutput, setMarkdownOutput] = React.useState<string>("")
  const previewRef = React.useRef<HTMLDivElement>(null)

  const generateMarkdown = React.useCallback(() => {
    if (!previewRef.current) return;

    const elements = previewRef.current.querySelectorAll('[nli-markdown]');
    let markdown = "";

    elements.forEach((element) => {
      const markdownAttribute = element.getAttribute('nli-markdown');
      if (markdownAttribute) {
        // Check if the element itself is an input/textarea
        const isInput = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
        // Check if it's a standard button (not a checkbox which can also be a button element)
        const isButton = element.tagName === 'BUTTON' && element.getAttribute('role') !== 'checkbox' && element.getAttribute('role') !== 'radio';

        if (isButton) {
          // Do nothing for regular buttons in scan, they are handled by click
          return;
        }
        
        if (isInput) {
          const inputElement = element as HTMLInputElement | HTMLTextAreaElement;
          // Format: "*{nli-markdown value}:* {input value}"
          markdown += `*${markdownAttribute}:* ${inputElement.value}\n`;
        } else if (element.getAttribute('role') === 'checkbox' || element.getAttribute('role') === 'radio') {
             const state = element.getAttribute('data-state');
             if (state === 'checked') {
                markdown += markdownAttribute + '\n';
             }
        } else {
          markdown += markdownAttribute;
        }
      }
    });
    
    setMarkdownOutput(markdown);
  }, []);

  // Update markdown when component selection changes or on mount
  React.useEffect(() => {
    // Small timeout to ensure DOM is updated
    const timeoutId = setTimeout(generateMarkdown, 0);
    return () => clearTimeout(timeoutId);
  }, [selectedComponent, generateMarkdown]);

  const handleInput = () => {
    generateMarkdown();
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Find closest element with nli-markdown attribute, effectively handling clicks on children of the button
    const element = target.closest('[nli-markdown]');
    
    if (element && element.tagName === 'BUTTON' && element.getAttribute('role') !== 'checkbox' && element.getAttribute('role') !== 'radio') {
      const markdownAttribute = element.getAttribute('nli-markdown');
      if (markdownAttribute) {
        let processedMarkdown = markdownAttribute;
        
        // Handle variable interpolation
        const label = element.getAttribute('data-label') || "";
        const value = element.textContent || "";
        
        processedMarkdown = processedMarkdown.replace(/{label}/g, label);
        processedMarkdown = processedMarkdown.replace(/{value}/g, value);

        setMarkdownOutput(prev => {
          const prefix = prev ? " " : "";
          return prev + prefix + processedMarkdown;
        });
      }
    }
  };

  const renderComponent = () => {
    if (!selectedComponent) {
      return (
        <div className="flex items-center justify-center h-full text-slate-500">
          Select a component to view it
        </div>
      )
    }

    const entry = componentRegistry[selectedComponent]
    
    if (!entry) {
      return (
        <div className="flex items-center justify-center h-full text-red-400">
          Component preview not available
        </div>
      )
    }

    const Component = entry.component

    return (
      <div className="flex items-center justify-center p-8">
        <Component {...entry.props}>
          {entry.children}
        </Component>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
        {children}
        <div className="w-full">
          <label htmlFor="component-select" className="text-sm font-medium text-slate-400 mb-2 block">
            Select Component
          </label>
          <div className="relative">
            <select 
              id="component-select"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="w-full appearance-none bg-slate-900 border border-slate-700 text-slate-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
            >
              <option value="">Choose a component...</option>
              {components.map((component) => (
                <option key={component} value={component}>
                  {component}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div 
          className="h-full relative rounded-xl border border-slate-800 bg-slate-950/50 shadow-sm min-h-[300px] flex-grow overflow-hidden flex flex-col"
          ref={previewRef}
          onInput={handleInput}
          onClick={handlePreviewClick}
          // Listen for click events to trigger markdown generation for checkboxes as they don't fire input events
          // and the change event might be swallowed by Radix. Radix toggles data-state on click.
          onClickCapture={() => setTimeout(generateMarkdown, 0)}
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-slate-500">Preview</span>
          </div>
          <div className="p-10 pt-16 h-full flex items-center justify-center flex-grow">
              {renderComponent()}
          </div>
        </div>
      </div>

      <div className="h-full">
        <Textarea 
          placeholder="Markdown will appear here..." 
          className="h-full min-h-[500px] font-mono resize-none p-6 text-base bg-secondary/20"
          value={markdownOutput}
          onChange={(e) => setMarkdownOutput(e.target.value)}
        />
      </div>
    </>
  )
}
