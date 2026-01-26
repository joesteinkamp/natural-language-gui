/**
 * Component Differ
 * Deep comparison of component arrays to detect changes
 */

import type { MappedComponent } from '../parser/component-mapper'

/**
 * Diff result for component comparison
 */
export interface ComponentDiff {
  hasChanges: boolean
  added: MappedComponent[]
  removed: MappedComponent[]
  modified: Array<{
    oldComponent: MappedComponent
    newComponent: MappedComponent
  }>
}

/**
 * Compare two component arrays for changes
 *
 * @param oldComponents - Previous component array
 * @param newComponents - New component array
 * @returns Diff result with changes
 */
export function diffComponents(
  oldComponents: MappedComponent[],
  newComponents: MappedComponent[]
): ComponentDiff {
  const diff: ComponentDiff = {
    hasChanges: false,
    added: [],
    removed: [],
    modified: [],
  }

  // Quick check: different lengths means changes
  if (oldComponents.length !== newComponents.length) {
    diff.hasChanges = true
  }

  // Create maps for efficient lookup
  const oldMap = new Map<string, MappedComponent>()
  const newMap = new Map<string, MappedComponent>()

  oldComponents.forEach((comp) => oldMap.set(comp.key, comp))
  newComponents.forEach((comp) => newMap.set(comp.key, comp))

  // Find removed components
  for (const [key, component] of oldMap) {
    if (!newMap.has(key)) {
      diff.removed.push(component)
      diff.hasChanges = true
    }
  }

  // Find added and modified components
  for (const [key, newComponent] of newMap) {
    const oldComponent = oldMap.get(key)

    if (!oldComponent) {
      // Component was added
      diff.added.push(newComponent)
      diff.hasChanges = true
    } else {
      // Check if component was modified
      if (!areComponentsEqual(oldComponent, newComponent)) {
        diff.modified.push({ oldComponent, newComponent })
        diff.hasChanges = true
      }
    }
  }

  return diff
}

/**
 * Deep equality check for two components
 *
 * @param a - First component
 * @param b - Second component
 * @returns true if components are equal
 */
function areComponentsEqual(
  a: MappedComponent,
  b: MappedComponent
): boolean {
  // Check type
  if (a.type !== b.type) return false

  // Check key
  if (a.key !== b.key) return false

  // Check props
  if (!arePropsEqual(a.props, b.props)) return false

  // Check children
  if (!areChildrenEqual(a.children, b.children)) return false

  return true
}

/**
 * Deep equality check for component props
 *
 * @param a - First props object
 * @param b - Second props object
 * @returns true if props are equal
 */
function arePropsEqual(
  a: Record<string, any>,
  b: Record<string, any>
): boolean {
  const aKeys = Object.keys(a).sort()
  const bKeys = Object.keys(b).sort()

  // Check key count
  if (aKeys.length !== bKeys.length) return false

  // Check key names
  if (!arraysEqual(aKeys, bKeys)) return false

  // Check values
  for (const key of aKeys) {
    const aVal = a[key]
    const bVal = b[key]

    // Handle different types
    if (typeof aVal !== typeof bVal) return false

    // Deep compare objects/arrays
    if (typeof aVal === 'object' && aVal !== null) {
      if (!deepEqual(aVal, bVal)) return false
    } else {
      // Direct comparison for primitives
      if (aVal !== bVal) return false
    }
  }

  return true
}

/**
 * Deep equality check for component children
 *
 * @param a - First children array
 * @param b - Second children array
 * @returns true if children are equal
 */
function areChildrenEqual(
  a: MappedComponent[] | undefined,
  b: MappedComponent[] | undefined
): boolean {
  // Both undefined/null
  if (!a && !b) return true

  // One is undefined/null
  if (!a || !b) return false

  // Different lengths
  if (a.length !== b.length) return false

  // Compare each child
  for (let i = 0; i < a.length; i++) {
    if (!areComponentsEqual(a[i], b[i])) return false
  }

  return true
}

/**
 * Deep equality check for objects/arrays
 *
 * @param a - First value
 * @param b - Second value
 * @returns true if values are deeply equal
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  if (a === null || b === null) {
    return a === b
  }

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  // Objects
  const aKeys = Object.keys(a).sort()
  const bKeys = Object.keys(b).sort()

  if (aKeys.length !== bKeys.length) return false
  if (!arraysEqual(aKeys, bKeys)) return false

  for (const key of aKeys) {
    if (!deepEqual(a[key], b[key])) return false
  }

  return true
}

/**
 * Simple array equality check (for primitive arrays)
 *
 * @param a - First array
 * @param b - Second array
 * @returns true if arrays are equal
 */
function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * Quick shallow comparison (for performance optimization)
 * Use when you know components don't have deep nesting
 *
 * @param oldComponents - Previous component array
 * @param newComponents - New component array
 * @returns true if arrays are shallowly equal
 */
export function shallowCompareComponents(
  oldComponents: MappedComponent[],
  newComponents: MappedComponent[]
): boolean {
  if (oldComponents.length !== newComponents.length) return false

  for (let i = 0; i < oldComponents.length; i++) {
    if (oldComponents[i].key !== newComponents[i].key) return false
    if (oldComponents[i].type !== newComponents[i].type) return false
  }

  return true
}
