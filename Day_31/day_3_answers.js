/*
Programming Quiz Solution: FizzBuzz
*/

let x = 1;

while (x <= 20) {
    (x%3 === 0 && x%5 === 0) ? console.log("JuliaJames") : (x%5 === 0) ? console.log("James") : (x%3 === 0) ? console.log("Julia") : console.log(x);
    x += 1;
}
// ======================================================================================


/*
Programming Quiz Solution: 99 Bottles of Juice

Use the following `while` loop to write out the song "99 bottles of juice".
Log the your lyrics to the console.

Note
  - Each line of the lyrics needs to be logged to the same line.
  - The pluralization of the word "bottle" changes from "2 bottles" to "1 bottle" to "0 bottles".
*/
let num = 99;

while (num > 0) {
    let num_dec = num-1;
    let bottles2 = (num === 1) ?  "bottle" : "bottles";
    let sec_bottles = (num_dec === 1) ? "bottle" : "bottles";

    console.log(num + " " + bottles2 + " of juice on the wall! " + num + " " + bottles2 + " of juice! Take one down, pass it around... " + num_dec + " " + sec_bottles + " of juice on the wall!");

    num -= 1;
}
// ======================================================================================


/*
Programming Quiz Solution: Countdown, Liftoff!

Using a while loop, print out the countdown output above.
*/

// your code goes here
num = 60;

while (num >= 0) {
    switch (num) {
        case 50:
            console.log("Orbiter transfers from ground to internal power");
            break;
        case 31:
            console.log("Ground launch sequencer is go for auto sequence start");
            break;
        case 16:
            console.log("Activate launch pad sound suppression system");
            break;
        case 10:
            console.log("Activate main engine hydrogen burnoff system");
            break;
        case 6:
            console.log("Main engine start");
            break;
        case 0:
            console.log("Solid rocket booster ignition and liftoff!");
            break;
        default:
            console.log("T-" + num +" seconds");
    }
    num -= 1;
}
// ======================================================================================


/*
Programming Quiz Solution: Changing the Loop
*/

// rewrite the while loop as a for loop
for (let x = 9; x >= 1; x--) {
    console.log("hello " + x);
}
// ======================================================================================


/*
Programming Quiz Solution: Factorials
*/

// your code goes here
let solution = 1;

for (let x = 1; x <= 12; x++) {
    solution *= x;
}
console.log(solution);
// ======================================================================================


/*
Programming Quiz Solution: Colors of the Rainbow

Use only the splice() method to modify the rainbow variable:
 - remove "Blackberry"
 - add "Yellow" and "Green"
 - add "Purple"
*/

let rainbow = ['Red', 'Orange', 'Blackberry', 'Blue'];

// Your code goes here
rainbow.splice(2, 1, "Yellow", "Green");
rainbow.splice(5, 0, "Purple");
console.log(rainbow);
// ======================================================================================


/*
Programming Quiz Solution: Quidditch Cup
*/

let team = ["Oliver Wood", "Angelina Johnson", "Katie Bell", "Alicia Spinnet", "George Weasley", "Fred Weasley", "Harry Potter"];

// Your code goes here
function hasEnoughPlayers(arr) {
    return arr.length >= 7 ? true: false;
}

console.log(hasEnoughPlayers(team));
// ======================================================================================


/*
Programming Quiz Solution: Another Type of Loop

Use the existing `test` variable and write a `forEach` loop
that adds 100 to each number that is divisible by 3.

Things to note:
 - you must use an `if` statement to verify code is divisible by 3
 - you can use `console.log` to verify the `test` variable when you're finished looping
*/

let test = [12, 929, 11, 3, 199, 1000, 7, 1, 24, 37, 4,
    19, 300, 3775, 299, 36, 209, 148, 169, 299,
    6, 109, 20, 58, 139, 59, 3, 1, 139
];

// Your code goes here
test.forEach(function (num,index,array) {
    if (num % 3 === 0) {
        array[index] = num + 100;
    }
});

console.log(test);
// ======================================================================================


/*
Programming Quiz Solution: I Got Bills

Use the .map() method to take the bills array below and create a second array
of numbers called totals. The totals array should contains each amount from the
bills array but with a 15% tip added. Log the totals array to the console.

For example, the first two entries in the totals array would be:

[57.76, 21.99, ... ]

Things to note:
 - each entry in the totals array must be a number
 - each number must have an accuracy of two decimal points
*/

let bills = [50.23, 19.12, 34.01,
    100.11, 12.15, 9.90, 29.11, 12.99,
    10.00, 99.22, 102.20, 100.10, 6.77, 2.22
];

let totals = bills.map(function (bill) {
    tip = bill * 0.15;
    bill += tip;
    return Number(bill.toFixed(2));
});

console.log(totals);
// ======================================================================================


/*
Programming Quiz Solution: Nested Numbers

  - The `numbers` variable is an array of arrays.
  - Use a nested `for` loop to cycle through `numbers`.
  - Convert each even number to the string "even"
  - Convert each odd number to the string "odd"
*/

let numbers = [
    [243, 12, 23, 12, 45, 45, 78, 66, 223, 3],
    [34, 2, 1, 553, 23, 4, 66, 23, 4, 55],
    [67, 56, 45, 553, 44, 55, 5, 428, 452, 3],
    [12, 31, 55, 445, 79, 44, 674, 224, 4, 21],
    [4, 2, 3, 52, 13, 51, 44, 1, 67, 5],
    [5, 65, 4, 5, 5, 6, 5, 43, 23, 4424],
    [74, 532, 6, 7, 35, 17, 89, 43, 43, 66],
    [53, 6, 89, 10, 23, 52, 111, 44, 109, 80],
    [67, 6, 53, 537, 2, 168, 16, 2, 1, 8],
    [76, 7, 9, 6, 3, 73, 77, 100, 56, 100]
];

// Your code goes here
for (let r = 0; r < numbers.length; r++) {
    for (let c = 0; c < numbers[r].length; c++) {
        numbers[r][c] = (numbers[r][c]%2 === 0) ? "even" : "odd";
    }
}
console.log(numbers);
// ======================================================================================


/*
Programming Quiz Solution: Umbrella
*/

let umbrella = {
    color: "red",
    isOpen: true,
    isClose: true,
    open: function() {
        if (umbrella.isOpen === true) {
            return "The umbrella is already opened!";
        } else {
            umbrella.isOpen = true;
            return "I opened the umbrella!";
        }
    },
    // Your code goes here
    close : function () {
        if (umbrella.isClose === true) {
            umbrella.isOpen = false;
            return "The umbrella is closed!";
        } else {
            return "The umbrella is already opened!";
        }
    }
};
// ======================================================================================


/*
Programming Quiz Solution: Bank Accounts
*/

let savingsAccount = {
    balance: 1000,
    interestRatePercent: 1,
    deposit: function addMoney(amount) {
        if (amount > 0) {
            savingsAccount.balance += amount;
        }
    },
    withdraw: function removeMoney(amount) {
        let verifyBalance = savingsAccount.balance - amount;
        if (amount > 0 && verifyBalance >= 0) {
            savingsAccount.balance -= amount;
        }
    },
    // Your code goes here
    printAccountSummary : function () {
        return ("Welcome!\nYour balance is currently $" + savingsAccount.balance + " and your interest rate is " + savingsAccount.interestRatePercent + "%.");
    }
};

console.log(savingsAccount.printAccountSummary());
// ======================================================================================


/*
Programming Quiz Solution: Facebook Friends
*/

// Your code goes here
let facebookProfile = {
    name : "Mukesh",
    friends : 1000,
    messages : ["Hi", "How are you", "yep, binge watching Supernatural"],
    postMessage : function (message) {
        facebookProfile.messages.push(message);
    },
    deleteMessage : function (index) {
        facebookProfile.messages.splice(index, 1);
    },
    addFriend : function () {
        facebookProfile.friends += 1;
    },
    removeFriend : function () {
        facebookProfile.friends -= 1;
    }
};
// ======================================================================================


/*
Programming Quiz Solution: Donuts
*/

let donuts = [
    { type: "Jelly", cost: 1.22 },
    { type: "Chocolate", cost: 2.45 },
    { type: "Cider", cost: 1.59 },
    { type: "Boston Cream", cost: 5.99 }
];

// Your code goes here
donuts.forEach(function(donut) {
    console.log(donut.type + " donuts cost $" + donut.cost + " each");
});
// ======================================================================================
