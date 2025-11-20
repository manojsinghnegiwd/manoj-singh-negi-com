#!/usr/bin/env node

const fs = require('fs');
const pdfParse = require('pdf-parse');

const pdfPath = process.argv[2] || 'Profile-6.pdf';

(async () => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    console.log(data.text);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();

