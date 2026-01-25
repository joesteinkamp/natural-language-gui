/**
 * Component Mapper
 * Converts AST nodes to React component props
 */

import type { ASTNode, ComponentType } from './types'
import { parseBooleanValue } from './inference'

/**
 * Props for a mapped component
 */
export interface MappedComponent {
  type: ComponentType
  props: Record<string, any>
  children?: MappedComponent[]
  key: string
}

/**
 * Generate a unique key for a component
 */
function generateKey(node: ASTNode, index: number): string {
  const line = node.metadata?.lineNumber || 0
  const label = node.label.replace(/\s+/g, '-').toLowerCase()
  return `${node.type}-${label}-${line}-${index}`
}

/**
 * Map a single AST node to component props
 */
function mapNodeToProps(node: ASTNode, index: number): MappedComponent {
  const baseProps = {
    'nli-markdown': node.label,
  }

  switch (node.type) {
    case 'input':
      return {
        type: 'input',
        props: {
          ...baseProps,
          type: 'text',
          defaultValue: node.value || '',
          placeholder: node.label,
        },
        key: generateKey(node, index),
      }

    case 'textarea':
      return {
        type: 'textarea',
        props: {
          ...baseProps,
          defaultValue: node.value || '',
          placeholder: node.label,
        },
        key: generateKey(node, index),
      }

    case 'switch':
      return {
        type: 'switch',
        props: {
          ...baseProps,
          defaultChecked: parseBooleanValue(node.value || 'no'),
        },
        key: generateKey(node, index),
      }

    case 'checkbox':
      return {
        type: 'checkbox',
        props: {
          ...baseProps,
          defaultChecked: node.value === 'true',
        },
        key: generateKey(node, index),
      }

    case 'button':
      return {
        type: 'button',
        props: {
          ...baseProps,
        },
        key: generateKey(node, index),
      }

    case 'date':
      return {
        type: 'date',
        props: {
          ...baseProps,
          'data-date-value': node.value || '',
        },
        key: generateKey(node, index),
      }

    case 'daterange':
      return {
        type: 'daterange',
        props: {
          ...baseProps,
          // Parse the date range value
          // Format: "date1 - date2"
          'data-date-from': node.value?.split('-')[0]?.trim() || '',
          'data-date-to': node.value?.split('-')[1]?.trim() || '',
        },
        key: generateKey(node, index),
      }

    case 'radiogroup':
      // For radio groups, only one item should be selected
      // If all children have value='true', default to first item selected
      const allSelected = node.children?.every(child => child.value === 'true')
      
      // Find the explicitly selected item (if not all are selected)
      const selectedItem = !allSelected 
        ? node.children?.find(child => child.value === 'true') 
        : undefined

      const defaultValue = allSelected && node.children?.[0] 
        ? node.children[0].label 
        : (selectedItem?.label || undefined)

      return {
        type: 'radiogroup',
        props: {
          ...baseProps,
          defaultValue,
        },
        children: node.children?.map((child, i) => ({
          type: 'radio' as ComponentType,
          props: {
            'nli-markdown': child.label,
            value: child.label,
          },
          key: `${generateKey(node, index)}-item-${i}`,
        })),
        key: generateKey(node, index),
      }

    case 'select':
      // For select, default to first option if all are marked as selected
      const allSelectedInSelect = node.children?.every(child => child.value === 'true')

      return {
        type: 'select',
        props: {
          ...baseProps,
          defaultValue: allSelectedInSelect && node.children?.[0] ? node.children[0].label : undefined,
        },
        children: node.children?.map((child, i) => ({
          type: 'select-item' as ComponentType,
          props: {
            'nli-markdown': child.label,
            value: child.label,
          },
          key: `${generateKey(node, index)}-item-${i}`,
        })),
        key: generateKey(node, index),
      }

    case 'togglegroup':
      // Get default values (items with yes state)
      const defaultToggled = node.children
        ?.filter(child => parseBooleanValue(child.value || 'no'))
        .map(child => child.label) || []

      return {
        type: 'togglegroup',
        props: {
          ...baseProps,
          type: 'multiple',
          defaultValue: defaultToggled,
        },
        children: node.children?.map((child, i) => ({
          type: 'toggle-item' as ComponentType,
          props: {
            'nli-markdown': `*${child.label}:* ${child.value}`,
            value: child.label,
          },
          key: `${generateKey(node, index)}-item-${i}`,
        })),
        key: generateKey(node, index),
      }

    case 'checkboxgroup':
      // Get default checked values
      // If ALL items are true (e.g. plain list), assume it's an options list and check NONE
      // Otherwise, only check items explicitly marked true/yes
      const defaultChecked = node.children
        ?.filter(child => child.value === 'true' || parseBooleanValue(child.value || 'no'))
        .map(child => child.label) || []

      return {
        type: 'checkboxgroup',
        props: {
          ...baseProps,
          defaultValue: defaultChecked,
        },
        children: node.children?.map((child, i) => ({
          type: 'checkbox-item' as ComponentType,
          props: {
            'nli-markdown': child.label,
            value: child.label,
          },
          key: `${generateKey(node, index)}-item-${i}`,
        })),
        key: generateKey(node, index),
      }

    case 'combobox':
      // If all items are true, assume none selected (options list)
      const selectedValues = node.children
        ?.filter(child => child.value === 'true' || parseBooleanValue(child.value || 'no'))
        .map(child => child.label) || []

      return {
        type: 'combobox',
        props: {
          ...baseProps,
          label: node.label,
          options: node.children?.map(child => ({
            label: child.label,
            value: child.label,
          })) || [],
          value: selectedValues,
        },
        key: generateKey(node, index),
      }

    default:
      // Fallback to input for unknown types
      return {
        type: 'input',
        props: {
          ...baseProps,
          value: node.value || '',
        },
        key: generateKey(node, index),
      }
  }
}

/**
 * Map an AST to an array of mapped components
 *
 * @param nodes - Array of AST nodes
 * @returns Array of mapped components ready for rendering
 */
export function mapASTToComponents(nodes: ASTNode[]): MappedComponent[] {
  return nodes.map((node, index) => mapNodeToProps(node, index))
}

/**
 * Extract values from mapped components (for form submission)
 *
 * @param components - Array of mapped components
 * @returns Key-value pairs of component labels and values
 */
export function extractValues(
  components: MappedComponent[]
): Record<string, any> {
  const values: Record<string, any> = {}

  components.forEach((component) => {
    const label = component.props['nli-markdown']

    switch (component.type) {
      case 'input':
      case 'textarea':
        values[label] = component.props.value
        break

      case 'switch':
        values[label] = component.props.checked
        break

      case 'checkbox':
        if (component.props.checked) {
          values[label] = true
        }
        break

      case 'date':
        values[label] = component.props['data-date-value']
        break

      case 'daterange':
        values[label] = {
          from: component.props['data-date-from'],
          to: component.props['data-date-to'],
        }
        break

      case 'radiogroup':
      case 'select':
        // Find the selected child
        const selected = component.children?.find(
          (child) => child.props.checked || child.props.selected
        )
        if (selected) {
          values[label] = selected.props.value
        }
        break

      case 'togglegroup':
        values[label] = component.children?.reduce(
          (acc, child) => {
            acc[child.props.value] = child.props['data-state'] === 'on'
            return acc
          },
          {} as Record<string, boolean>
        )
        break

      case 'checkboxgroup':
        values[label] = component.children
          ?.filter((child) => child.props.checked)
          .map((child) => child.props.value)
        break

      case 'combobox':
        values[label] = component.props.value
        break
    }
  })

  return values
}
