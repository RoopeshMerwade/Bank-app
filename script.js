"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Roopesh M",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Admin Login",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Admin Control",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Admin Access",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// DOM selectors
let currentTime = getCurrentTime();
const timebal = (document.querySelector(".balancetime").textContent =
  currentTime);
const Navbtn = document.querySelector(".login__btn");
const app = document.querySelector(".app");
const date = (document.querySelector(".date").textContent = getCurrentDate());
const balanceamt = document.querySelector(".balaneRemaining");
const namewish = document.querySelector(".Day");

// Transfer
const transferto = document.querySelector("#input1");
const amounttotransfer = document.querySelector("#input2");
const transferbtn = document.querySelector(".transferbtn");

// close-account
const closeacctbtn = document.querySelector(".close-btn");
const closeuseracct = document.querySelector(".close-user");
const closepin = document.querySelector(".closepin");

// Login
const loginuser = document.querySelector(".login-username");
const loginpin = document.querySelector(".login-pin");
const loginbtn = document.querySelector(".login-button");

// loan
const loan = document.querySelector(".loanamount");
const loanbutton = document.querySelector(".loanbtn");

// DOm selection bottom
const amtin = document.querySelector(".AmountIn");
const amtout = document.querySelector(".AmountOut");
const interest = document.querySelector(".Interest");
const sortbtn = document.querySelector(".sort");

// transaction-display-box
const transactionbox = document.querySelector(".transaction-details");

// transaction-display-box

// const Displaymovements = function (movements) {
// transactionbox.innerHTML = "";
// movements.forEach((mov, i) => {
//   const type = mov > 0 ? "DEPOSIT" : "WITHDRAWAL";
//   const colorclass = mov > 0 ? "color-boxdeposit" : "color-boxwithdraw";
//   const HTML = `
//   <div class="transactions Each-transaction">
//     <p class="${colorclass}">${i + 1} ${type}</p>
//     <span class="transaction-date">${getCurrentDate()}</span>
//    <span class="transaction-details-amount">${mov} ₹</span>
//   </div>
//   <hr>`;
//   transactionbox.insertAdjacentHTML("afterbegin", HTML);
// });

// **********************or*****************************
let isDescendingOrder = false;

const transactionBox = document.getElementById("transaction-details");

const displayMovements = function (movements, sort = false) {
  // Clear existing content
  transactionBox.innerHTML = "";
  const movsort = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movsort.reverse().forEach((mov, i) => {
    const type = mov > 0 ? "DEPOSIT" : "WITHDRAWAL";
    const colorClass = mov > 0 ? "color-boxdeposit" : "color-boxwithdraw";

    // Create elements
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transactions", "Each-transaction");

    const typeParagraph = document.createElement("p");
    typeParagraph.classList.add(colorClass);
    typeParagraph.textContent = `${i + 1} ${type}`;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("transaction-date");
    dateSpan.textContent = getCurrentDate();

    const amountSpan = document.createElement("span");
    amountSpan.classList.add("transaction-details-amount");
    amountSpan.textContent = `${mov} ₹`;

    const hrElement = document.createElement("hr");

    // Append elements to the transactionDiv
    transactionDiv.appendChild(typeParagraph);
    transactionDiv.appendChild(dateSpan);
    transactionDiv.appendChild(amountSpan);

    // Append the transactionDiv and hrElement to the transactionBox
    transactionBox.appendChild(transactionDiv);
    transactionBox.appendChild(hrElement);
  });
};

// };

const total = function (movements) {
  const balance = movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  balanceamt.textContent = `${balance}`;
  return balance;
};

function getCurrentDate() {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

const createUserNames = function () {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((firstletter) => firstletter[0])
      .join("");
  });
};
createUserNames(accounts);
// console.log(accounts);

const AccDeposits = function (accsDepo) {
  accounts.forEach((depo) => {
    depo["deposits"] = depo.movements.filter((filterdepo) => {
      return filterdepo > 0;
    });
  });
};
// AccDeposits(accounts);
// console.log(accounts);

const deposits = account1.movements.filter((mov) => {
  return mov > 0;
});
// console.log(deposits);
// console.log(account1.movements);

// withdrawals

const withdrawals = account1.movements.filter((negat) => negat < 0);
// console.log(withdrawals);

// find maximum

function Big(act) {
  return account1.movements.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  }, account1.movements[0]);
}
// console.log(Big(account1.movements));

const AmountIn = function (account) {
  const store = account.movements
    .filter((acc) => {
      return acc > 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  amtin.textContent = `${store}`;

  const storeout = account.movements
    .filter((amt) => amt < 0)
    .reduce((acc, curr) => acc + curr, 0);
  amtout.textContent = `${Math.abs(storeout)}`;

  const interestDOM = account.movements
    .filter((deposit) => deposit > 0)
    .map((depo) => (depo * account.interestRate) / 100)
    .filter((one) => one > 1)
    .reduce((acc, cur) => acc + cur);
  interest.textContent = `${interestDOM}`;

  return { amtin: store, amtout: Math.abs(storeout), interest: interestDOM };
};

const AllAccounts = accounts.find((int) => int.interestRate < 1.2);

let currentaccount;

loginbtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentaccount = accounts.find((acct) => acct.username === loginuser.value);

  if (currentaccount) {
    if (currentaccount.pin === Number(loginpin.value)) {
      namewish.textContent = `Good Afternoon ${
        currentaccount.owner.split(" ")[0]
      }`;
      app.style.opacity = 1;
      loginuser.value = loginpin.value = "";
      loginpin.blur();
      total(currentaccount.movements);
      displayMovements(currentaccount.movements);
      AmountIn(currentaccount);
    } else {
      console.error("Incorrect pin.");
    }
  } else {
    console.error("Username not found.");
  }
});

transferbtn.addEventListener("click", function () {
  const amount = Number(amounttotransfer.value);
  const receiveracc = accounts.find((acc) => acc.username === transferto.value);

  if (
    currentaccount &&
    receiveracc &&
    currentaccount.username !== receiveracc.username
  ) {
    const balance = total(currentaccount.movements);

    if (balance >= amount && amount > 0) {
      // Subtract the amount from the current account's movements array
      currentaccount.movements.push(-amount);
      total(receiveracc.movements); // Update the receiver account's total, not current account's
      AmountIn(currentaccount);

      // Add the amount to the receiver's movements array
      receiveracc.movements.push(amount);
      total(currentaccount.movements);
      AmountIn(receiveracc); // Update the receiver account's AmountIn, not current account's
      displayMovements(currentaccount.movements);

      amounttotransfer.value = transferto.value = "";
    } else {
      console.error("Insufficient balance for the transfer.");
    }
  } else {
    if (currentaccount === receiveracc) {
      console.error("Self-transfer is not allowed.");
    } else {
      console.error("Either current account or receiver account not found.");
    }
  }
});

closeacctbtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    closeuseracct.value === currentaccount.username &&
    currentaccount.pin === Number(closepin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentaccount.username
    );

    if (index !== -1) {
      accounts.splice(index, 1);
      console.log(`Account with username ${currentaccount.username} closed.`);
      app.style.opacity = 0;
    } else {
      console.error("Account not found in the array.");
    }
  }
});

loanbutton.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(loan.value);
  const AmountGreater = currentaccount.movements.some(
    (acc) => acc >= amount * 0.1
  );
  if (amount > 0 && AmountGreater) {
    currentaccount.movements.push(amount);
    total(currentaccount.movements);
    AmountIn(currentaccount);
    displayMovements(currentaccount.movements);
  }
  loan.value = "";
});

let sorted = false;
sortbtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sorted);

  sorted = !sorted;
});

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

let shallowjulia = [...dogsJulia].slice(1, 4);
// console.log(shallowjulia);

let finaldata = [...shallowjulia, ...dogsKate];
// console.log(finaldata);

function checkDogs(array) {
  for (let i = 0; i < array.length; i++) {
    const type = array[i] > 3 ? "Adult" : "Puppy";
    console.log(
      `Dog number ${i + 1} is an ${type}, and is ${array[i]} years old`
    );
  }
}
// checkDogs(finaldata);
// checkDogs(dogsJulia);
// checkDogs(dogsKate);

// map method
const activity = [200, 450, -400, 3000, -650, -130, 70, 1300];
const Eurotousd = 1.1;

const USD = activity.map((conv) => conv * Eurotousd);
// console.log(USD);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const Calculator = function (ages) {
//   let Humanage = [];
//   for (let i = 0; i < ages.length; i++) {
//     // const dogage = ages[i];
//     const calcHumanage = ages[i] <= 2 ? 2 * ages[i] : 16 + 4 * ages[i];
//     Humanage.push(calcHumanage);
//   }
//   return Humanage;
// };
// console.log(Calculator([5, 2, 4, 1, 15, 8, 3]));

const calcHumanAge = (ages) => {
  const Humanage1 = ages
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + 4 * dogAge))
    .filter((vv) => vv >= 18)
    .reduce((acc, cur, i, array) => {
      return acc + cur / array.length;
    }, 0);
  return Humanage1;
};
// console.log(calcHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcHumanAge([16, 6, 10, 5, 6, 1, 4]));

// function sumofNum(number) {
//   let count = 0;
//   while (number * 10) {
//     count = count + number;
//     number += number + 1;
//   }
//   return count;
// }
// console.log(sumofNum(100));

const totalmovbalance = accounts
  .map((mov) => mov.movements)
  .flat()
  .reduce((acc, curr) => acc + curr, 0);
console.log(totalmovbalance);

const randroll = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(randroll);

console.log([1, 2, 3, 4, 5, 6, 7, 8]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
// console.log(x);

// Array.form()

const onces = Array.from({ length: 10 }, () => 1);
// console.log(onces);

const onetoseven = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(onetoseven);

balanceamt.addEventListener("click", function () {
  const movementsvaluesfromUI = Array.from(
    document.querySelectorAll(".transaction-details-amount")
  );
  console.log(
    movementsvaluesfromUI.map((el) => Number(el.textContent.replace("₹", "")))
  );
});

const deposit1000 = accounts
  .flatMap((depo) => depo.movements)
  .filter((val) => val >= 1000);

console.log(deposit1000);

const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposit += curr) : (sums.withdrawal += curr);
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(sums);

const titleCase = function (string) {
  const NottoCapital = ["a", "the", "at", "with", "and", "an", "then", "them"];

  return string
    .toLowerCase()
    .split(" ")
    .map((word) =>
      NottoCapital.includes(word) || word === ""
        ? word
        : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
};
console.log(titleCase("hi java bye cat at then the cow dog drum dinner"));

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/
//1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((vals) => {
  vals["recommendedFood"] = Math.trunc(vals.weight ** 0.75 * 28);
});

console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogsarah = dogs.find((sarah) => sarah.owners.includes("Sarah"));

console.log(dogsarah);
console.log(
  `sarahs dog is eating too ${
    dogsarah.curFood > dogsarah.recommendedFood ? "much" : "little"
  } `
);
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs
  .filter((eatmuch) => eatmuch.curFood > eatmuch.recommendedFood)
  .flatMap((arra) => arra.owners);

console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((eatless) => eatless.curFood < eatless.recommendedFood)
  .flatMap((arra) => arra.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(
  ` ${ownersEatTooMuch.join(
    " "
  )}'s dogs eat too much , ${ownersEatTooLittle.join(
    " "
  )}'s dogs eat too little`
);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogsarah.curFood === dogsarah.recommendedFood);

//6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

const seventh = dogs.some(
  (dog) =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(seventh);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okamtfood = dogs.map((okfood) =>
  okfood.curFood > okfood.recommendedFood * 0.9 &&
  okfood.curFood < okfood.recommendedFood * 1.1
    ? okfood.curFood
    : okfood.recommendedFood
);

console.log(okamtfood);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const shallowcopy = dogs
  .flatMap((val) => val.recommendedFood)
  .sort((a, b) => a - b);
console.log(shallowcopy);
