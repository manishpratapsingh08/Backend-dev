const { capitalize, reverse, countVowels } = require('./stringUtils');

const sampleText = 'hello nodejs';

console.log('Original:', sampleText);
console.log('Capitalized:', capitalize(sampleText));
console.log('Reversed:', reverse(sampleText));
console.log('Vowel count:', countVowels(sampleText));
