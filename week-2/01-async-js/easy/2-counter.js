// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let counter = 0;

function setCustomTimeout(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

async function customInterval(interval) {
  while(true) {
    await setCustomTimeout(interval);
    console.log(counter);
    counter++;
  }
}

customInterval(1000);










































































// (Hint: setTimeout)