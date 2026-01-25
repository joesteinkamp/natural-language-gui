/**
 * Test suite for parser inference rules
 * Validates that all deterministic rules are working correctly
 */

import { parse } from './index'

interface TestCase {
  name: string
  markdown: string
  expected: {
    type: string
    label: string
    value?: string
    childCount?: number
  }[]
}

const tests: TestCase[] = [
  // Rule 1: Input vs Textarea (< 60 chars vs >= 60 chars)
  {
    name: 'Rule 1a: Short text → Input',
    markdown: '*Name:* John Doe',
    expected: [{ type: 'input', label: 'Name', value: 'John Doe' }],
  },
  {
    name: 'Rule 1b: Long text (>= 60 chars) → Textarea',
    markdown: `*Bio:* ${'x'.repeat(60)}`,
    expected: [{ type: 'textarea', label: 'Bio', value: 'x'.repeat(60) }],
  },
  {
    name: 'Rule 1c: Exactly 60 chars → Textarea',
    markdown: `*Description:* ${'a'.repeat(60)}`,
    expected: [{ type: 'textarea', label: 'Description', value: 'a'.repeat(60) }],
  },
  {
    name: 'Rule 1d: 59 chars → Input',
    markdown: `*Short:* ${'b'.repeat(59)}`,
    expected: [{ type: 'input', label: 'Short', value: 'b'.repeat(59) }],
  },

  // Rule 2: Switch vs ToggleGroup (single yes/no vs bulleted yes/no)
  {
    name: 'Rule 2a: Single yes/no → Switch',
    markdown: '*Dark Mode:* yes',
    expected: [{ type: 'switch', label: 'Dark Mode', value: 'yes' }],
  },
  {
    name: 'Rule 2b: Single no → Switch',
    markdown: '*Notifications:* no',
    expected: [{ type: 'switch', label: 'Notifications', value: 'no' }],
  },
  {
    name: 'Rule 2c: Bulleted yes/no list → ToggleGroup',
    markdown: `*Settings:*
- *WiFi:* yes
- *Bluetooth:* no`,
    expected: [{ type: 'togglegroup', label: 'Settings', childCount: 2 }],
  },

  // Rule 3: RadioGroup vs Select (< 6 options vs >= 6 options)
  {
    name: 'Rule 3a: 3 options → RadioGroup',
    markdown: `*Size:*
- Small
- Medium
- Large`,
    expected: [{ type: 'radiogroup', label: 'Size', childCount: 3 }],
  },
  {
    name: 'Rule 3b: 5 options → RadioGroup',
    markdown: `*Priority:*
- Lowest
- Low
- Medium
- High
- Highest`,
    expected: [{ type: 'radiogroup', label: 'Priority', childCount: 5 }],
  },
  {
    name: 'Rule 3c: 6 options → Select',
    markdown: `*Country:*
- USA
- Canada
- Mexico
- UK
- France
- Germany`,
    expected: [{ type: 'select', label: 'Country', childCount: 6 }],
  },
  {
    name: 'Rule 3d: 10 options → Select',
    markdown: `*Language:*
- English
- Spanish
- French
- German
- Italian
- Portuguese
- Russian
- Chinese
- Japanese
- Korean`,
    expected: [{ type: 'select', label: 'Language', childCount: 10 }],
  },

  // Rule 4: Date detection
  {
    name: 'Rule 4a: Long date format → Date',
    markdown: '*Due Date:* January 15, 2024',
    expected: [{ type: 'date', label: 'Due Date', value: 'January 15, 2024' }],
  },
  {
    name: 'Rule 4b: ISO date format → Date',
    markdown: '*Start Date:* 2024-01-15',
    expected: [{ type: 'date', label: 'Start Date', value: '2024-01-15' }],
  },
  {
    name: 'Rule 4c: Date range → DateRange',
    markdown: '*Period:* January 1, 2024 - January 31, 2024',
    expected: [{ type: 'daterange', label: 'Period', value: 'January 1, 2024 - January 31, 2024' }],
  },

  // Rule 5: Checkbox (plain text)
  {
    name: 'Rule 5: Plain text → Checkbox',
    markdown: 'Accept terms and conditions',
    expected: [{ type: 'checkbox', label: 'Accept terms and conditions', value: 'true' }],
  },

  // Rule 6: Button ([Action] format)
  {
    name: 'Rule 6a: Single button',
    markdown: '[Submit]',
    expected: [{ type: 'button', label: 'Submit' }],
  },
  {
    name: 'Rule 6b: Multiple buttons',
    markdown: '[Save] [Cancel]',
    expected: [
      { type: 'button', label: 'Save' },
      { type: 'button', label: 'Cancel' },
    ],
  },

  // Explicit type hints (override inference)
  {
    name: 'Explicit: Short text with [textarea] hint',
    markdown: '*Note [textarea]:* Hi',
    expected: [{ type: 'textarea', label: 'Note', value: 'Hi' }],
  },
  {
    name: 'Explicit: Group with [select] hint (< 6 items)',
    markdown: `*Theme [select]:*
- Light
- Dark`,
    expected: [{ type: 'select', label: 'Theme', childCount: 2 }],
  },
]

console.log('='.repeat(70))
console.log('Parser Inference Rules Test Suite')
console.log('='.repeat(70))
console.log()

let passed = 0
let failed = 0

tests.forEach((test, index) => {
  const ast = parse(test.markdown.trim(), { validate: false })

  // Check if we got the expected number of nodes
  if (ast.nodes.length !== test.expected.length) {
    console.log(`❌ Test ${index + 1}: ${test.name}`)
    console.log(`   Expected ${test.expected.length} nodes, got ${ast.nodes.length}`)
    console.log(`   Nodes:`, ast.nodes)
    failed++
    return
  }

  // Check each expected node
  let testPassed = true
  test.expected.forEach((expected, i) => {
    const node = ast.nodes[i]

    if (node.type !== expected.type) {
      console.log(`❌ Test ${index + 1}: ${test.name}`)
      console.log(`   Node ${i}: Expected type "${expected.type}", got "${node.type}"`)
      console.log(`   Input: "${test.markdown}"`)
      testPassed = false
    }

    if (expected.label && node.label !== expected.label) {
      console.log(`❌ Test ${index + 1}: ${test.name}`)
      console.log(`   Node ${i}: Expected label "${expected.label}", got "${node.label}"`)
      testPassed = false
    }

    if (expected.value !== undefined && node.value !== expected.value) {
      console.log(`❌ Test ${index + 1}: ${test.name}`)
      console.log(`   Node ${i}: Expected value "${expected.value}", got "${node.value}"`)
      testPassed = false
    }

    if (expected.childCount !== undefined && node.children?.length !== expected.childCount) {
      console.log(`❌ Test ${index + 1}: ${test.name}`)
      console.log(
        `   Node ${i}: Expected ${expected.childCount} children, got ${node.children?.length || 0}`
      )
      testPassed = false
    }
  })

  if (testPassed) {
    console.log(`✅ Test ${index + 1}: ${test.name}`)
    passed++
  } else {
    failed++
  }
})

console.log()
console.log('='.repeat(70))
console.log(`Results: ${passed} passed, ${failed} failed (${tests.length} total)`)
console.log('='.repeat(70))

if (failed > 0) {
  process.exit(1)
}
