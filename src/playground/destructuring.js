// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin"
//   }
// };

// const { author: publisherName = "Self-published" } = book;

// console.log(publisherName);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [itemName, , mediumCost] = item;

console.log(`A medium ${itemName} costs ${mediumCost}`);
