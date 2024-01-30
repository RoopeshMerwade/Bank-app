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
    if (currentaccount.pin === +loginpin.value) {
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
  const amount = +amounttotransfer.value;
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
    currentaccount.pin === +closepin.value
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
