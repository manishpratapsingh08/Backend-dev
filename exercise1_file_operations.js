const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'wordcount.txt');

function countWords(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err.message);
    process.exit(1);
  }

  const count = countWords(data);
  const outputText = `Word count: ${count}\n`;

  fs.writeFile(outputFile, outputText, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing output file:', writeErr.message);
      process.exit(1);
    }
    console.log(`Wrote word count to ${outputFile}`);
  });
});
