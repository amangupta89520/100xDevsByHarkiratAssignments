// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

async function removeExtraSpaces() {
  try {
    const data = await fs.readFileSync(__dirname + '/a.txt', 'utf-8');

    const normalizedContent = data.split(' ').filter(str => str).join(' ');

    await fs.writeFileSync(__dirname + '/a.txt', normalizedContent, 'utf-8');
  } catch(err) {
    console.log('Ahh! Unable to perform the operation', err.message);
  }
}

removeExtraSpaces();