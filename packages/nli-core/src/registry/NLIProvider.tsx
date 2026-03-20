/**
 * NLI Provider
 * React context for setting a custom component registry at the app root.
 */

'use client'

import * as React from 'react'
import type { ComponentRegistry } from './component-registry'

const NLIRegistryContext = React.createContext<ComponentRegistry | undefined>(undefined)

/**
 * Provider that sets a custom component registry for all NLI components in the tree.
 * Components rendered by InstantiatedForm will use this registry,
 * falling back to the default Radix registry for any unregistered types.
 *
 * @example
 * ```tsx
 * <NLIProvider registry={{ button: myButtonRenderer, input: myInputRenderer }}>
 *   <InstantiatedForm components={components} />
 * </NLIProvider>
 * ```
 */
export function NLIProvider({
  registry,
  children,
}: {
  registry: ComponentRegistry
  children: React.ReactNode
}) {
  return React.createElement(
    NLIRegistryContext.Provider,
    { value: registry },
    children
  )
}

/**
 * Hook to access the component registry from NLIProvider context.
 * Returns undefined if no provider is present.
 */
export function useComponentRegistry(): ComponentRegistry | undefined {
  return React.useContext(NLIRegistryContext)
}
