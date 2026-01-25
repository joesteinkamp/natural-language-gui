/**
 * Parser usage examples
 * Run this file to see the parser in action
 */

import { parse, debugParse, getParseErrors, printAST } from './index'

console.log('='.repeat(60))
console.log('NLI Markdown Parser Examples')
console.log('='.repeat(60))

// Example 1: Simple form with all basic types
console.log('\n📝 Example 1: Basic Form')
console.log('-'.repeat(60))

const example1 = `
*Email:* john@example.com
*Password:* secret123
*Remember me:* yes
[Submit]
`

console.log('Input:')
console.log(example1)
console.log('\nParsed AST:')
const ast1 = parse(example1.trim())
console.log(printAST(ast1))

// Example 2: Character count threshold (Input vs Textarea)
console.log('\n\n📏 Example 2: Character Count Threshold')
console.log('-'.repeat(60))

const shortText = 'This is a short bio.'
const longText = 'This is a very long biography that exceeds 60 characters in length. '.repeat(2)

const example2 = `
*Short Bio:* ${shortText}
*Long Bio:* ${longText}
`

console.log('Input:')
console.log(example2)
console.log('\nParsed AST:')
console.log(`Short text length: ${shortText.length} chars`)
console.log(`Long text length: ${longText.length} chars`)
const ast2 = parse(example2.trim())
console.log(printAST(ast2))

// Example 3: Toggle Group vs Switch
console.log('\n\n🔄 Example 3: Toggle Group vs Switch')
console.log('-'.repeat(60))

const example3 = `
*Notifications:* yes
*Export Formats:*
- *PDF:* yes
- *DOCX:* no
- *XLSX:* yes
`

console.log('Input:')
console.log(example3)
console.log('\nParsed AST:')
const ast3 = parse(example3.trim())
console.log(printAST(ast3))

// Example 4: Radio Group vs Select (option count)
console.log('\n\n📻 Example 4: Radio Group vs Select (Option Count)')
console.log('-'.repeat(60))

const example4 = `
*Size (< 6 options):*
- Small
- Medium
- Large

*Country (>= 6 options):*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
`

console.log('Input:')
console.log(example4)
console.log('\nParsed AST:')
const ast4 = parse(example4.trim())
console.log(printAST(ast4))

// Example 5: Date detection
console.log('\n\n📅 Example 5: Date Detection')
console.log('-'.repeat(60))

const example5 = `
*Due Date:* January 15, 2024
*Date Range:* January 1, 2024 - January 31, 2024
`

console.log('Input:')
console.log(example5)
console.log('\nParsed AST:')
const ast5 = parse(example5.trim())
console.log(printAST(ast5))

// Example 6: Explicit type hints
console.log('\n\n💡 Example 6: Explicit Type Hints')
console.log('-'.repeat(60))

const example6 = `
*Bio [textarea]:* Short text
*Theme [select]:* Dark
*Priority [radiogroup]:* High
`

console.log('Input:')
console.log(example6)
console.log('\nParsed AST:')
const ast6 = parse(example6.trim())
console.log(printAST(ast6))

// Example 7: Error handling
console.log('\n\n⚠️  Example 7: Error Handling')
console.log('-'.repeat(60))

const example7 = `
*Email:* test@example.com
- Orphaned item without header
This line has no format
*Group with no items:*
`

console.log('Input:')
console.log(example7)
console.log('\nErrors:')
const errors = getParseErrors(example7.trim())
if (errors.length === 0) {
  console.log('No errors found')
} else {
  errors.forEach((error) => {
    console.log(`  Line ${error.line}: [${error.severity}] ${error.message}`)
  })
}

console.log('\nParsed AST (despite errors):')
const ast7 = parse(example7.trim())
console.log(printAST(ast7))

// Example 8: Complete user profile form
console.log('\n\n👤 Example 8: Complete User Profile Form')
console.log('-'.repeat(60))

const example8 = `
*First Name:* John
*Last Name:* Doe
*Email:* john.doe@example.com
*Bio:* I'm a product designer fueled by a desire to innovate with new technologies through experimentation.\n\nI specialize in bridging design and code to create novel user experiences. In my free time, I enjoy prototyping with emerging frameworks and exploring new interaction paradigms.
*Birth Date:* January 15, 1990
*Country:*
- United States
- Canada
- Mexico
- United Kingdom
- France
- Germany
- Japan
*Interests:*
- Technology
- Music
- Sports
*Newsletter:* yes
[Save Profile] [Cancel]
`

console.log('Input:')
console.log(example8)
console.log('\nParsed AST:')
const ast8 = parse(example8.trim())
console.log(printAST(ast8))

console.log('\n' + '='.repeat(60))
console.log('✅ All examples completed')
console.log('='.repeat(60))
