/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, t * 1000);
  });
}

function wait3(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, t * 1000);
  });
}

async function calculateTime(t1, t2, t3) {
  const startTime = new Date().getTime();
  await Promise.all([wait1(t1), wait2(t2), wait3(t3)]);
  const endTime = new Date().getTime();
  return Promise.all().then((data) => endTime - startTime);
}

// calculateTime(1, 2, 3); //time in seconds

// async function test() {
//   return 1;
// }

// console.log(100);
// console.log(100);
// console.log(100);
// console.log(100);
// console.log(100);
// console.log(100);
// console.log(100);
// console.log(100);
// console.log(test());
// console.log(200);
// console.log(200);
// console.log(200);
// console.log(200);
// console.log(200);
// console.log(200);
// console.log(200);
// console.log(200);

module.exports = calculateTime;
