
import { cleanseMarkdown } from './markdown-cleanser';

const testCases = [
  {
    name: 'Radio Group',
    input: `*Radio Group:* Option 2
- Option 1
- Option 2
- Option 3`,
    expected: `*Radio Group:* Option 2`
  },
  {
    name: 'Select',
    input: `*Select:* Option C
- Option A
- Option B
- Option C`,
    expected: `*Select:* Option C`
  },
  {
    name: 'Toggle Group',
    input: `*Toggle Group:*
- *Bold:* yes
- *Italic:* no
- *Underline:* yes`,
    expected: `*Toggle Group:*
- Bold
- Underline`
  },
  {
    name: 'Checkbox Group',
    input: `*Checkbox Group:*
[x] Option X
[ ] Option Y
[x] Option Z`,
    expected: `*Checkbox Group:*
- Option X
- Option Z`
  },
  {
    name: 'Combobox (Multi)',
    input: `*Combobox:*
[x] Item 1
[ ] Item 2
[x] Item 3`,
    expected: `*Combobox:*
- Item 1
- Item 3`
  },
  {
    name: 'Complex Mixed Form',
    input: `*Name:* John Doe

*Radio Group:* Option 2
- Option 1
- Option 2

*Toggle Group:*
- *Bold:* yes
- *Italic:* no

[x] Terms Accepted`,
    expected: `*Name:* John Doe

*Radio Group:* Option 2

*Toggle Group:*
- Bold

[x] Terms Accepted`
  }
];

let failed = false;

console.log('Running Markdown Cleanser Tests...\n');

testCases.forEach((test, index) => {
  try {
    const result = cleanseMarkdown(test.input);
    const normalizedResult = result.trim();
    const normalizedExpected = test.expected.trim();
    
    if (normalizedResult === normalizedExpected) {
      console.log(`✅ Test ${index + 1}: ${test.name} PASSED`);
    } else {
      console.log(`❌ Test ${index + 1}: ${test.name} FAILED`);
      console.log('Expected:\n' + normalizedExpected);
      console.log('Actual:\n' + normalizedResult);
      console.log('---');
      failed = true;
    }
  } catch (error) {
    console.error(`❌ Test ${index + 1}: ${test.name} CRASHED`, error);
    failed = true;
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('\nAll tests passed!');
}
