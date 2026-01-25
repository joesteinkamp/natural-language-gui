/**
 * Test component mapper (instantiator requires React rendering)
 */

import { parse } from './index'
import { mapASTToComponents } from './component-mapper'

console.log('='.repeat(70))
console.log('Component Mapper Test')
console.log('='.repeat(70))
console.log()

const markdown = `
*Email:* john@example.com
*Password:* secret123
*Bio:* I'm a software engineer passionate about building great user experiences. I love working with React, TypeScript, and modern web technologies.
*Remember me:* yes
*Priority:*
- High
- Medium
- Low
[Submit]
`

console.log('Input Markdown:')
console.log(markdown)
console.log()

const ast = parse(markdown.trim())

console.log('AST Nodes:')
ast.nodes.forEach((node, i) => {
  console.log(`  ${i + 1}. ${node.type}: "${node.label}"${node.value ? ` = "${node.value}"` : ''}`)
  if (node.children) {
    node.children.forEach((child, j) => {
      console.log(`     ${j + 1}. ${child.type}: "${child.label}"${child.value ? ` = "${child.value}"` : ''}`)
    })
  }
})
console.log()

const components = mapASTToComponents(ast.nodes)

console.log('Mapped Components:')
components.forEach((comp, i) => {
  console.log(`  ${i + 1}. ${comp.type}`)
  console.log(`     Props:`, JSON.stringify(comp.props, null, 2))
  if (comp.children) {
    console.log(`     Children: ${comp.children.length}`)
    comp.children.forEach((child, j) => {
      console.log(`       ${j + 1}. ${child.type}: ${JSON.stringify(child.props)}`)
    })
  }
  console.log()
})

console.log('='.repeat(70))
console.log('✅ Mapper test complete')
console.log('='.repeat(70))
