// let myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise resolved after 6 seconds");
//     }, 6000);
// });

// console.log("Promise created, waiting for it to resolve...");

// myPromise.then((successMessage) => {
//     console.log("From Callback " + successMessage);
// });

// console.log("After calling Promise");
let promAfter6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("After 6 secound");
    }, 6000);
});

let promAfter3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("After 3 Secound");
    }, 3000);
});

// promAfter6.then((successMessage) => {
//     console.log(successMessage);
//     promAfter3.then((successMessage) => {
//         console.log(successMessage);
//     });
// });
promAfter6.then((message) => {
    console.log(message);
});
promAfter3.then((message) => {
    console.log(message);
});
