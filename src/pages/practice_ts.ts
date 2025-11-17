// Async/Await = Async = makes a function return a promise
//               Await = makes an async function wait for a promise

//                allows you to write code in a synchronous manner
//                Async doesn't have reolve or reject parameters
//                everything after Await is placed in an event queue

export default function WalkDog(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dogwalked = true;

      if (dogwalked) {
        resolve("Walked the dog");
      } else {
        reject("Dog didn't want to walk");
      }
    }, 1000);
  });
}

// async function doAsync() {
//   try {
//     const checkifdogWalking = await WalkDog();
//     console.log(checkifdogWalking);
//   } catch (error) {
//     console.error(error);
//   }
// }
