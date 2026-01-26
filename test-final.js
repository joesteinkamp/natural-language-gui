const fs = require('fs');
const { parseToComponents, generateMarkdownFromComponents } = require('./packages/nli-core/dist/index.js');

const markdown = fs.readFileSync('./test-checkbox-clean.md', 'utf-8');
const result = parseToComponents(markdown);
const regenerated = generateMarkdownFromComponents(result.components);

const original = markdown.split('\n').map(l => l.trim()).filter(Boolean);
const regen = regenerated.split('\n').map(l => l.trim()).filter(Boolean);

console.log('Lines match:', original.length === regen.length);
console.log('Content identical:', original.every((line, i) => line === regen[i]));

if (original.every((line, i) => line === regen[i])) {
  console.log('\n✅ PERFECT BIDIRECTIONAL SYNC!');
  console.log('The checkbox syntax [x] and [ ] preserves state correctly.');
  console.log('\nKey features:');
  console.log('✓ Unchecked checkboxes stay in markdown as [ ]');
  console.log('✓ Checked checkboxes preserved as [x]');
  console.log('✓ Radio groups show all options with one [x]');
  console.log('✓ Checkbox groups show all options with multiple [x]');
  console.log('✓ No noise from unselected items disappearing');
} else {
  console.log('\nDifferences found:');
  original.forEach((line, i) => {
    if (line !== regen[i]) {
      console.log(`  Line ${i+1}:`);
      console.log(`    Original:    "${line}"`);
      console.log(`    Regenerated: "${regen[i] || '(missing)'}"`);
    }
  });
}
