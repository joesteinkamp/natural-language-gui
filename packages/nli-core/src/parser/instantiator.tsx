/**
 * Component Instantiator
 * Renders React components from mapped AST using a pluggable component registry.
 *
 * By default, uses the Radix UI-based default registry.
 * Pass a custom registry to use your own design system components.
 */

'use client'

import * as React from 'react'
import type { MappedComponent } from './component-mapper'
import type { ComponentRegistry } from '../registry/component-registry'
import { defaultRegistry } from '../registry/default-registry'
import { useComponentRegistry } from '../registry/NLIProvider'
import { cn } from '../lib/utils'

/**
 * Render a single mapped component using the given registry
 */
function renderComponent(
  mapped: MappedComponent,
  onComponentChange?: (label: string, value: string, type: string) => void,
  registry?: ComponentRegistry
): React.ReactElement | null {
  const mergedRegistry = registry
    ? { ...defaultRegistry, ...registry }
    : defaultRegistry

  const renderer = mergedRegistry[mapped.type]
  if (!renderer) return null
  return renderer(mapped, onComponentChange)
}

/**
 * Render an array of mapped components
 *
 * @param components - Array of mapped components from AST
 * @param onComponentChange - Optional callback for state changes
 * @param registry - Optional custom component registry (partial overrides merge with defaults)
 * @returns Array of rendered React elements
 */
export function instantiateComponents(
  components: MappedComponent[],
  onComponentChange?: (label: string, value: string, type: string) => void,
  registry?: ComponentRegistry
): React.ReactElement[] {
  return components
    .map((component) => renderComponent(component, onComponentChange, registry))
    .filter(Boolean) as React.ReactElement[]
}

/**
 * Render components with a wrapper
 *
 * @param components - Array of mapped components
 * @param className - Optional className for wrapper
 * @param registry - Optional custom component registry (overrides NLIProvider context)
 */
export function InstantiatedForm({
  components,
  className,
  registry: registryProp,
}: {
  components: MappedComponent[]
  className?: string
  registry?: ComponentRegistry
}) {
  const contextRegistry = useComponentRegistry()
  const registry = registryProp ?? contextRegistry
  const elements = instantiateComponents(components, undefined, registry)

  return (
    <div className={cn('space-y-4', className)}>
      {elements}
    </div>
  )
}
