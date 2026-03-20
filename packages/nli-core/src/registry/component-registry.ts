/**
 * Component Registry
 * Enables pluggable design systems by mapping component types to renderer functions.
 */

import * as React from 'react'
import type { ComponentType } from '../parser/types'
import type { MappedComponent } from '../parser/component-mapper'

/**
 * A function that renders a MappedComponent into a React element.
 * This is the contract custom design system components must satisfy.
 *
 * @param mapped - The parsed component descriptor (type, props, children, key)
 * @param onComponentChange - Optional callback for reporting state changes back to markdown
 */
export type ComponentRenderer = (
  mapped: MappedComponent,
  onComponentChange?: (label: string, value: string, type: string) => void
) => React.ReactElement | null

/**
 * Registry mapping component types to their renderer functions.
 * Users provide partial registries; missing entries fall back to defaults.
 */
export type ComponentRegistry = Partial<Record<ComponentType, ComponentRenderer>>

/**
 * Create a standalone instantiator function from a registry.
 * Use this when you want zero dependency on the default Radix components
 * (enables full tree-shaking of Radix UI).
 *
 * @param registry - A complete or partial component registry
 * @returns A function that converts MappedComponent arrays to React elements
 */
export function createInstantiator(registry: ComponentRegistry) {
  return (
    components: MappedComponent[],
    onComponentChange?: (label: string, value: string, type: string) => void
  ): React.ReactElement[] => {
    return components
      .map((mapped) => {
        const renderer = registry[mapped.type]
        return renderer ? renderer(mapped, onComponentChange) : null
      })
      .filter(Boolean) as React.ReactElement[]
  }
}
