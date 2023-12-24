// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

const fs = require('fs');

async function readFileData() {
  try {
    const data = await fs.readFileSync(__dirname + '/a.txt', 'utf-8');
    let counter = 0;
    for(let i=0; i<1000000000; i++) {
      counter++;
    }
    console.log('Data from file', data, counter);
  } catch(err) {
    console.log('Ahh!, unable to read file!', err.message);
  }
}

console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
readFileData();
console.log(6);
console.log(7);

