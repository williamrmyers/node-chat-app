const moment = require('moment');



// let date = new Date();
//
// console.log(date.getMonth());


// let date = moment();
// date.add(100, 'years')
// console.log(date.format('MMM Do, YYYY'));


let date = moment();

console.log(date.format('h:mm A'));

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
