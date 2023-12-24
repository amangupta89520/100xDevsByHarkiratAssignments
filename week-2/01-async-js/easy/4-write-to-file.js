// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

async function writeToFile(content) {
  try {
    await fs.writeFileSync(__dirname + '/a.txt', content);
  } catch(err) {
    console.log('Ahh! unable to write to file', err.message);
  }
}

writeToFile('Corona virus is a good virus');