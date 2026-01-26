/**
 * ResizablePane Component
 * Draggable split pane with localStorage persistence
 */

'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

export interface ResizablePaneProps {
  /** Left pane content */
  left: React.ReactNode

  /** Right pane content */
  right: React.ReactNode

  /** Initial split percentage (0-100) */
  initialSplit?: number

  /** Minimum pane width in pixels */
  minWidth?: number

  /** LocalStorage key for persisting split position */
  storageKey?: string

  /** Additional CSS classes for container */
  className?: string

  /** Orientation (default: horizontal) */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * ResizablePane component with draggable divider
 */
export function ResizablePane({
  left,
  right,
  initialSplit = 50,
  minWidth = 200,
  storageKey = 'resizable-pane-split',
  className,
  orientation = 'horizontal',
}: ResizablePaneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  /*
   * Fix for hydration error:
   * Initialize with the prop value (server-safe) and then
   * update from localStorage after component mounts (client-only)
   */
  const [split, setSplit] = React.useState<number>(initialSplit)
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Load from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && storageKey) {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = parseFloat(saved)
        if (!isNaN(parsed) && parsed > 0 && parsed < 100) {
          setSplit(parsed)
        }
      }
    }
    setIsLoaded(true)
  }, [storageKey])

  // Save to localStorage when split changes
  React.useEffect(() => {
    if (isLoaded && typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(storageKey, split.toString())
    }
  }, [split, storageKey, isLoaded])

  // Handle mouse move
  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()

      let newSplit: number

      if (orientation === 'horizontal') {
        const offsetX = e.clientX - rect.left
        newSplit = (offsetX / rect.width) * 100
      } else {
        const offsetY = e.clientY - rect.top
        newSplit = (offsetY / rect.height) * 100
      }

      // Clamp to min/max
      const dimension = orientation === 'horizontal' ? rect.width : rect.height
      const minPercent = (minWidth / dimension) * 100
      const maxPercent = 100 - minPercent

      newSplit = Math.max(minPercent, Math.min(maxPercent, newSplit))
      setSplit(newSplit)
    },
    [isDragging, minWidth, orientation]
  )

  // Handle mouse up
  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add/remove event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor =
        orientation === 'horizontal' ? 'col-resize' : 'row-resize'
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, orientation])

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex w-full h-full',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}
    >
      {/* Left/Top Pane */}
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? 'width' : 'height']: `${split}%`,
          minWidth: isHorizontal ? minWidth : undefined,
          minHeight: !isHorizontal ? minWidth : undefined,
        }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        className={cn(
          'bg-slate-800 hover:bg-slate-700 transition-colors flex-shrink-0 group',
          isHorizontal
            ? 'w-1 cursor-col-resize hover:w-1.5'
            : 'h-1 cursor-row-resize hover:h-1.5',
          isDragging && (isHorizontal ? 'bg-blue-500' : 'bg-blue-500')
        )}
        onMouseDown={handleDividerMouseDown}
      >
        <div
          className={cn(
            'flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
            isHorizontal ? 'h-full' : 'w-full'
          )}
        >
          {/* Visual indicator */}
          <div
            className={cn(
              'bg-slate-600 rounded-full',
              isHorizontal ? 'w-1 h-8' : 'w-8 h-1'
            )}
          />
        </div>
      </div>

      {/* Right/Bottom Pane */}
      <div
        className="overflow-auto flex-1"
        style={{
          minWidth: isHorizontal ? minWidth : undefined,
          minHeight: !isHorizontal ? minWidth : undefined,
        }}
      >
        {right}
      </div>
    </div>
  )
}
