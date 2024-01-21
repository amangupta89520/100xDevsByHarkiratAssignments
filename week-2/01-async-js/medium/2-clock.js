// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)


// function clock1() {
//   const date = new Date();
//   let currentHour = date.getHours();
//   let currentMinute = date.getMinutes();
//   let currentSeconds = date.getSeconds();

//   setInterval(() => {
//     if(currentHour === 23 && currentMinute === 59 && currentSeconds === 59) {
//       currentHour = 0;
//     }
//     if(currentMinute === 59 && currentSeconds === 59) {
//       currentHour++;
//       currentMinute = 0;
//     }
//     if(currentSeconds === 59) {
//       currentMinute++;
//       currentSeconds = 0;
//     }
//     currentSeconds++;
//     console.log(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`);
//   }, 1000);
// }

// clock1();


function clock2() {
  const date = new Date().toLocaleTimeString().split(' ');

  const t = date[0].split(':');
  let isAM = date[1] === 'AM';

  let currentHour = +t[0];
  let currentMinute = +t[1];
  let currentSeconds = +t[2];

  setInterval(() => {
    if(currentHour === 11 && currentMinute === 59 && currentHour === 59) {
      isAM = !isAM;
    }
    if(currentHour === 12 && currentMinute === 59 && currentSeconds === 59) {
      currentHour = 1;
    }
    if(currentMinute === 59 && currentSeconds === 59) {
      currentHour++;
      currentMinute = 0;
    }
    if(currentSeconds === 59) {
      currentMinute++;
      currentSeconds = 0;
    }
    currentSeconds++;
    console.log(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} ${isAM? 'AM' : 'PM'}`);
  }, 1000);
}

clock2();
