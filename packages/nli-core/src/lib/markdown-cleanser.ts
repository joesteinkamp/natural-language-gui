
import { parseToComponents } from '../parser';
import { generateMarkdownFromComponent } from './markdown-generators';
import type { MappedComponent } from '../parser/component-mapper';

/**
 * Cleans the markdown by removing unselected options and simplifying the output.
 * 
 * Rules:
 * - Radio Group / Select: Removes all options, keeps only "*Label:* Value"
 * - Toggle Group: Keeps only options with "yes" value, formatted as bullet list
 * - Checkbox Group: Keeps only checked options, formatted as bullet list
 * - Combobox: If has children (multi-select), keeps only selected options as bullet list
 * - Text/Textarea/Switch/Date: Kept as is
 */
export function cleanseMarkdown(markdown: string): string {
  const { components } = parseToComponents(markdown);
  
  if (!components || components.length === 0) {
    return markdown;
  }
  
  let cleansedMarkdown = '';
  
  for (const component of components) {
    const componentMarkdown = generateCleansedMarkdownForComponent(component);
    
    if (componentMarkdown) {
      if (cleansedMarkdown) cleansedMarkdown += '\n\n';
      cleansedMarkdown += componentMarkdown;
    }
  }
  
  return cleansedMarkdown;
}

function generateCleansedMarkdownForComponent(component: MappedComponent): string {
  const label = component.props['nli-markdown'] || component.props.label || '';
  
  switch (component.type) {
    case 'radiogroup':
    case 'select': {
      // For single selection groups, we just want the value line
      // e.g. "*Label:* Value"
      // We ignore the children options
      const value = component.props.defaultValue || component.props.value || '';
      return `*${label}:* ${value}`;
    }
    
    case 'togglegroup': {
      // For toggle groups, we want to list only the "yes" items
      // format:
      // *Label:*
      // - Item1
      // - Item2
      
      const selectedItems: string[] = [];
      // Toggle group usually holds selected values in defaultValue (array)
      const groupValue = component.props.defaultValue || component.props.value || [];
      
      if (component.children) {
        component.children.forEach(child => {
          // Use value as label since that's what's stored in groupValue
          // e.g. value="Bold"
          const childValue = child.props.value;
          const childLabel = childValue; // In toggle group, value is the text label usually
          
          let isSelected = false;
          
          // Check if child value is in the group value array
          if (Array.isArray(groupValue) && groupValue.includes(childValue)) {
            isSelected = true;
          }
          // Fallback to checking child props directly if not using group value
          else if (child.props.value === 'yes' || child.props.value === 'on' || child.props.checked === true) {
             isSelected = true;
          }
          
          if (isSelected) {
            selectedItems.push(childLabel);
          }
        });
      }
      
      if (selectedItems.length === 0) {
        return `*${label}:*`;
      }
      
      return `*${label}:*\n${selectedItems.map(item => `- ${item}`).join('\n')}`;
    }
    
    case 'checkboxgroup': {
      // For checkbox groups, list checked items
      // format:
      // *Label:*
      // - Item1
      
      const selectedItems: string[] = [];
      const groupValue = component.props.defaultValue || component.props.value;
      
      if (component.children) {
        component.children.forEach(child => {
          const childLabel = child.props['nli-markdown'] || child.props.label || child.props.value || '';
          let isSelected = false;
          
          // Check if child itself is checked
          if (child.props.checked || child.props.defaultChecked || child.props.value === 'true') {
            isSelected = true;
          }
          // Or if it's in the group value array
          else if (Array.isArray(groupValue) && groupValue.includes(child.props.value)) {
            isSelected = true;
          }
          
          if (isSelected) {
            selectedItems.push(childLabel);
          }
        });
      }
      
      if (selectedItems.length === 0) {
        return `*${label}:*`;
      }
      
      return `*${label}:*\n${selectedItems.map(item => `- ${item}`).join('\n')}`;
    }
    
    case 'combobox': {
      // Combobox can be multi-select. If it has children with checkbox syntax, treat like checkbox group
      if (component.children && component.children.length > 0) {
        const selectedItems: string[] = [];
        const groupValue = component.props.defaultValue || component.props.value;
        
        component.children.forEach(child => {
          const childLabel = child.props['nli-markdown'] || child.props.label || child.props.value || '';
          let isSelected = false;
           
          // Check if child itself is checked
          if (child.props.checked || child.props.defaultChecked || child.props.value === 'true') {
            isSelected = true;
          }
          // Or if it's in the group value array
          else if (Array.isArray(groupValue) && groupValue.includes(child.props.value)) {
            isSelected = true;
          }
          
          if (isSelected) {
            selectedItems.push(childLabel);
          }
        });
        
        if (selectedItems.length === 0) {
          return `*${label}:*`;
        }
        
        return `*${label}:*\n${selectedItems.map(item => `- ${item}`).join('\n')}`;
      }
      
      // Single select or simple combobox
      const value = component.props.defaultValue || component.props.value || '';
      return `*${label}:* ${Array.isArray(value) ? value.join(', ') : value}`;
    }
    
    // For other components, use standard generation or simple formatting
    default:
      return generateMarkdownFromComponent(component);
  }
}
