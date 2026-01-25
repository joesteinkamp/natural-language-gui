/**
 * Debug regex patterns
 */

const testCases = [
  '*Email:* john@example.com',
  '*Password:* secret123',
  '*Remember me:* yes',
  '*Export Formats:*',
  '- *PDF:* yes',
  '- Small',
  '[Submit]',
  'Plain text checkbox',
]

const PATTERNS = {
  FIELD: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(.+)$/,
  BOOLEAN: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s(yes|no)$/,
  GROUP_HEADER: /^\*([^*:]+?)(?:\s+\[([^\]]+)\])?:\*\s*$/,
  GROUP_ITEM: /^-\s(.+)$/,
  BUTTON: /^\[.+\]$/,
  PLAIN_TEXT: /^[^*\-\[].*$/,
  BLANK: /^\s*$/,
}

console.log('Testing regex patterns:\n')

testCases.forEach((test) => {
  console.log(`Input: "${test}"`)
  console.log(`  Trimmed: "${test.trim()}"`)

  for (const [name, pattern] of Object.entries(PATTERNS)) {
    const match = test.trim().match(pattern)
    if (match) {
      console.log(`  ✓ ${name}:`, match)
    }
  }

  console.log()
})
