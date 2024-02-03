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
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Admin Login",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "en-US",
};

const account3 = {
  owner: "Admin Control",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2020-03-15T08:30:45.123Z",
    "2020-05-20T11:55:27.689Z",
    "2020-08-07T16:22:18.543Z",
    "2020-09-12T09:37:50.826Z",
    "2020-10-28T14:05:32.977Z",
    "2020-12-03T17:20:54.814Z",
    "2020-12-20T13:45:11.632Z",
    "2020-12-31T22:59:59.999Z",
  ],
  currency: "INR",
  locale: "en-US",
};

const account4 = {
  owner: "Admin Access",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2020-02-10T10:30:15.456Z",
    "2020-03-22T15:40:37.892Z",
    "2020-05-05T18:55:49.721Z",
    "2020-07-08T08:12:04.633Z",
    "2020-08-14T12:26:29.475Z",
    "2020-09-30T16:37:55.588Z",
    "2020-11-07T20:45:12.374Z",
    "2020-12-15T09:01:30.912Z",
  ],
  currency: "INR",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// DOM selectors
let currentTime = getCurrentTime12Hour();
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
const transactiondate = document.querySelector(".transaction-date");

// close-account
const closeacctbtn = document.querySelector(".close-btn");
const closeuseracct = document.querySelector(".inputs.close-user");
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

function getCurrentTime12Hour() {
  const now = new Date();
  let hours = now.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds} ${amPm}`;
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

const createLogoutTimer = function () {
  const timer = document.querySelector(".LogoutTime");

  const tick = function () {
    let minutes = Math.floor(timeDuration / 60);
    let seconds = timeDuration % 60;
    let formattedtime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    timer.textContent = formattedtime;

    if (timeDuration === 0) {
      clearInterval(timeDuration);
      app.style.opacity = 0;
      namewish.textContent = "Log in to get Started";
    }
    timeDuration--;
  };
  let timeDuration = 10 * 60;

  tick();
  const time = setInterval(tick, 1000);
  return time;
};

let currentaccount, time;

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
      if (time) clearInterval(time);
      time = createLogoutTimer();
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
      clearInterval(time);
      time = createLogoutTimer();
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
  clearInterval(time);
  time = createLogoutTimer();
});

let sorted = false;
sortbtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sorted);

  sorted = !sorted;
});

function TransactionDates(account) {
  const formattedDates = account.movementsDates.map((datestring) => {
    const originalDate = new Date(datestring);
    const day = String(originalDate.getUTCDate()).padStart(2, "0");
    const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
    const year = String(originalDate.getUTCFullYear());

    return `${day}/${month}/${year}`;
  });
  return formattedDates;
}
// Rough
// console.log(TransactionDates(account1));
