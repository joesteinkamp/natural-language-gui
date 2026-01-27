/**
 * Bidirectional Component Viewer
 * Live simultaneous editing with markdown and GUI side-by-side
 */

"use client"

import * as React from "react"
import {
  cn,
  instantiateComponents,
  useBidirectionalSync,
  ResizablePane,
  Textarea,
  Button,
  saveCursorPosition,
  restoreCursorPosition,
  updateMarkdownLine,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  cleanseMarkdown,
} from "@natural-language-gui/core"
import type { ComponentType } from "@natural-language-gui/core"

interface ComponentViewerBidirectionalProps {
  children?: React.ReactNode
}

// Top-level component types (excludes child types like radio, checkbox-item, etc.)
type TopLevelComponentType = Exclude<ComponentType, 'radio' | 'select-item' | 'toggle-item' | 'checkbox-item'>

// Component templates for Form Builder
const componentTemplates: Record<TopLevelComponentType, string> = {
  input: '*Field Name:* default value',
  textarea: '*Description:* This is a longer text that will render as a textarea component',
  switch: '*Enable Feature:* yes',
  checkbox: '[x] Accept Terms',
  button: '[Submit]',
  date: '*Birth Date:* January 01, 2024',
  daterange: '*Date Range:* January 01, 2024 - December 31, 2024',
  radiogroup: `*Radio Options:* Option 1
- Option 1
- Option 2
- Option 3`,
  select: `*Select Option:* Choice B
- Choice A
- Choice B
- Choice C
- Choice D
- Choice E
- Choice F`,
  togglegroup: `*Toggle Group:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes`,
  checkboxgroup: `*Checkbox Group:*
[x] Item 1
[ ] Item 2
[x] Item 3`,
  combobox: `*Combobox:*
[x] Option 1
[ ] Option 2
[x] Option 3
[ ] Option 4
[ ] Option 5
[ ] Option 6`,
}

// User-friendly component names
const componentLabels: Record<TopLevelComponentType, string> = {
  input: 'Input (short text)',
  textarea: 'Textarea (long text)',
  switch: 'Switch (yes/no)',
  checkbox: 'Checkbox (single)',
  button: 'Button',
  date: 'Date Picker',
  daterange: 'Date Range Picker',
  radiogroup: 'Radio Group',
  select: 'Select Dropdown',
  togglegroup: 'Toggle Group',
  checkboxgroup: 'Checkbox Group',
  combobox: 'Combobox (searchable, 6 options)',
}

export function ComponentViewerBidirectional({ children }: ComponentViewerBidirectionalProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const previewRef = React.useRef<HTMLDivElement>(null)
  const [selectedPreset, setSelectedPreset] = React.useState<string>("")
  const [selectedComponent, setSelectedComponent] = React.useState<TopLevelComponentType>('input')
  const [cleansedMarkdown, setCleansedMarkdown] = React.useState<string>("")
  const lastUpdateSourceRef = React.useRef<'markdown' | 'gui' | null>(null)

  // Preset examples
  const presets: Record<string, { markdown: string; description: string }> = {
    login: {
      description: "Login Form",
      markdown: `*Email:* john@example.com

*Password:* secret123

*Remember me:* yes

[Login]`,
    },
    profile: {
      description: "User Profile",
      markdown: `*Name:* John Doe

*Email:* john@example.com

*Bio:* Software developer

*Birthday:* January 15, 1990

*Notifications:* yes

[Save Profile]`,
    },
    search: {
      description: "Search Filters",
      markdown: `*Search:* laptop

*Category:* Electronics

*Price Range:* January 01, 2024 - December 31, 2024

*In Stock Only:* yes

[Search]`,
    },
    all: {
      description: "All Components",
      markdown: `*Input:* Sample text

*Textarea:* This is a longer text area that should exceed the sixty character limit to ensure it renders as a textarea component correctly.

*Switch:* yes

[x] Checkbox

[Click Me]

*Date:* January 15, 2024

*Date Range:* January 01, 2024 - December 31, 2024

*Radio Group:* Option 2
- Option 1
- Option 2
- Option 3

*Select:* Option C
- Option A
- Option B
- Option C
- Option D
- Option E
- Option F

*Toggle Group:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes

*Checkbox Group:*
[x] Option X
[ ] Option Y
[x] Option Z

*Combobox Group:*
[x] Option A1
[ ] Option A2
[x] Option A3
[x] Option A4
[ ] Option A5
[x] Option A6`,
    },
  }

  // No longer need DOM-based markdown generation!
  // Components are controlled and update markdown through onChange handlers

  // Bidirectional sync hook
  const {
    components,
    markdown,
    syncStatus,
    parseErrors,
    updateMarkdown,
  } = useBidirectionalSync({
    initialMarkdown: presets.login.markdown,
    generateMarkdown: () => {
      // This is called when components change (from markdown parse)
      // We don't use it for GUI→Markdown; instead we generate directly from DOM
      return markdown
    },
    markdownDebounce: 300,
    guiDebounce: 100,
    onSyncError: (error) => {
      console.error('[Sync Error]:', error)
    },
    onParseErrors: (errors) => {
      if (errors.length > 0) {
        console.warn('[Parse Errors]:', errors)
      }
    },
  })

  // Handle markdown change from textarea
  const handleMarkdownChange = React.useCallback(
    (value: string) => {
      lastUpdateSourceRef.current = 'markdown'
      const cursorPosition = saveCursorPosition(textareaRef)
      updateMarkdown(value)
      restoreCursorPosition(textareaRef, cursorPosition)
    },
    [updateMarkdown]
  )

  // Handle component value changes - update specific markdown lines
  const handleComponentChange = React.useCallback(
    (label: string, value: string, type: string) => {
      console.log('[handleComponentChange]', { label, value, type, lastSource: lastUpdateSourceRef.current })

      // Allow the update - we'll set the source to gui
      lastUpdateSourceRef.current = 'gui'

      // Update the specific line in markdown
      const newMarkdown = updateMarkdownLine(
        markdown,
        label,
        value,
        type as ComponentType
      )

      console.log('[handleComponentChange] Markdown updated?', newMarkdown !== markdown)

      if (newMarkdown !== markdown) {
        updateMarkdown(newMarkdown)
      }
    },
    [markdown, updateMarkdown]
  )

  // No more DOM-based event listeners needed!
  // Components are now controlled and call handleComponentChange directly

  // Handle preset selection
  const handlePresetChange = React.useCallback(
    (preset: string) => {
      if (presets[preset]) {
        setSelectedPreset(preset)
        lastUpdateSourceRef.current = 'markdown'
        updateMarkdown(presets[preset].markdown)
      }
    },
    [updateMarkdown, presets]
  )

  // Handle adding a component from Form Builder
  const handleAddComponent = React.useCallback(() => {
    const template = componentTemplates[selectedComponent]
    if (!template) return

    lastUpdateSourceRef.current = 'markdown'
    const cursorPosition = saveCursorPosition(textareaRef)

    // Append to existing markdown with proper spacing
    const newMarkdown = markdown.trim()
      ? `${markdown.trim()}\n\n${template}`
      : template

    updateMarkdown(newMarkdown)
    restoreCursorPosition(textareaRef, cursorPosition)
  }, [selectedComponent, markdown, updateMarkdown])

  // Handle reset
  const handleReset = React.useCallback(() => {
    lastUpdateSourceRef.current = 'markdown'
    updateMarkdown('')
    setSelectedPreset('')
  }, [updateMarkdown])

  // Render components from parsed markdown
  const renderComponents = () => {
    if (!markdown.trim()) {
      return (
        <div className="flex items-center justify-center h-full text-slate-500">
          Enter markdown to render components
        </div>
      )
    }

    try {
      const elements = instantiateComponents(components, handleComponentChange)

      return (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {parseErrors.length > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-400 mb-2">Parsing Warnings:</p>
              <ul className="text-xs text-yellow-300 space-y-1">
                {parseErrors.map((error, i) => (
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
          <p className="text-sm font-medium text-red-400">Render Error:</p>
          <p className="text-xs text-red-300 mt-1">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col gap-6 h-full flex-1 w-full relative">
      <div className="absolute top-0 right-0 z-50 flex items-center gap-2 p-2">
        <Dialog onOpenChange={(open) => {
          if (open) {
            setCleansedMarkdown(cleanseMarkdown(markdown))
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-6 text-xs bg-slate-900/50 border-slate-700 hover:bg-slate-800 text-slate-300">
              Clean Markdown
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Clean Markdown</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                value={cleansedMarkdown}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none bg-slate-950 border-slate-800 focus-visible:ring-0"
              />
            </div>
          </DialogContent>
        </Dialog>

        <div
          className={cn(
            "text-xs font-mono px-2 py-1 rounded flex items-center gap-1",
            syncStatus === 'idle' && "text-green-400 bg-green-500/10",
            syncStatus === 'syncing' && "text-yellow-400 bg-yellow-500/10",
            syncStatus === 'error' && "text-red-400 bg-red-500/10"
          )}
        >
          {syncStatus === 'idle' && (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              Synced
            </>
          )}
          {syncStatus === 'syncing' && (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              Syncing...
            </>
          )}
          {syncStatus === 'error' && (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
              Error
            </>
          )}
        </div>
      </div>
      {children}

      {/* Preset Selector */}
      <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
        <label className="text-sm font-medium text-slate-400">Quick Start:</label>
        <div className="flex gap-2">
          {Object.entries(presets).map(([key, preset]) => (
            <Button
              key={key}
              variant={selectedPreset === key ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetChange(key)}
            >
              {preset.description}
            </Button>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 min-h-0">
        <ResizablePane
          storageKey="component-viewer-split"
          initialSplit={50}
          minWidth={300}
          left={
            <div className="h-full flex flex-col p-4 bg-slate-950/30">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">
                  Markdown Editor
                </label>
                <span className="text-xs text-slate-500">
                  Edit markdown to update preview →
                </span>
              </div>
              <Textarea
                ref={textareaRef}
                placeholder="Enter markdown here...

Example:
*Email:* john@example.com
*Password:* secret
*Remember me:* yes
[Submit]"
                className="flex-1 font-mono resize-none p-4 text-base bg-slate-900/50 border-slate-800"
                value={markdown}
                onChange={(e) => handleMarkdownChange(e.target.value)}
              />
            </div>
          }
          right={
            <div className="h-full flex flex-col bg-slate-950/50">
              {/* Form Builder */}
              <div className="flex items-center gap-4 p-4 bg-slate-900/50 border-b border-slate-800">
                <label className="text-sm font-medium text-slate-400">Form Builder:</label>
                <select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value as TopLevelComponentType)}
                  className="flex-1 px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(Object.keys(componentTemplates) as TopLevelComponentType[])
                    .sort((a, b) => componentLabels[a].localeCompare(componentLabels[b]))
                    .map((type) => (
                      <option key={type} value={type}>
                        {componentLabels[type]}
                      </option>
                    ))}
                </select>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddComponent}
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>

              {/* Live Preview */}
              <div
                className="flex-1 relative overflow-hidden"
                ref={previewRef}
              >
                <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  </div>
                  <span className="ml-4 text-xs font-mono text-slate-500">
                    Live Preview
                  </span>
                  <span className="ml-auto text-xs text-slate-500">
                    ← Interact with components to update markdown
                  </span>
                </div>
                <div className="p-10 pt-16 w-full h-full overflow-y-auto flex flex-col items-center justify-start">
                  <form
                    nli-target-id="nli-result-output"
                    className="contents"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {renderComponents()}
                  </form>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
