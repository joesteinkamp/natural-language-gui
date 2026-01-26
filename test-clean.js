/**
 * Test bidirectional sync with clean markdown (no headers)
 */

const fs = require('fs');
const { parseToComponents, generateMarkdownFromComponents } = require('./packages/nli-core/dist/index.js');

const markdown = fs.readFileSync('./test-checkbox-clean.md', 'utf-8');

console.log('=== ORIGINAL ===');
console.log(markdown);

const result = parseToComponents(markdown);
console.log('\n=== PARSED COMPONENTS ===');
console.log(`Found ${result.components.length} components`);

if (result.errors.length > 0) {
  console.log('\n=== ERRORS ===');
  result.errors.forEach(e => console.log(`Line ${e.line}: ${e.message}`));
}

const regenerated = generateMarkdownFromComponents(result.components);
console.log('\n=== REGENERATED ===');
console.log(regenerated);

const normalize = (str) => str.trim();
console.log('\n=== SYNC TEST ===');
if (normalize(markdown) === normalize(regenerated)) {
  console.log('✅ SUCCESS: Perfect bidirectional sync!');
} else {
  console.log('⚠️  DIFFERENCES DETECTED');
  console.log('\nOriginal length:', markdown.trim().length);
  console.log('Regenerated length:', regenerated.trim().length);
}
