/*
Programming Quiz Solution: First Expression

Write an expression that uses at least three, different, arithmetic operators
to log the number 42 to the console.
*/
console.log((1 + 5 - 2) * 10 + 2);
// ======================================================================================


/*
Programming Quiz Solution: Converting Temperatures

The Celsius-to-Fahrenheit formula:
    F = C x 1.8 + 32

1. Set the fahrenheit variable to the correct value using the celsius variable and the forumla above
2. Log the fahrenheit variable to the console
*/
let celsius = 12;
let fahrenheit = celsius * 1.8 + 32;
console.log(fahrenheit);
// ======================================================================================


/*
Programming Quiz Solution: Out to Dinner
*/

// your code goes here
let bill = 10.25 + 3.99 + 7.15;
let tip = bill * 0.15;
let total = bill + tip;
console.log("$" + total);
// ======================================================================================


/*
Programming Quiz Solution: Even or Odd

Write an if...else statement that prints `even` if the
number is even and prints `odd` if the number is odd.

Note - make sure to print only the string "even" or the string "odd"
*/

// change the value of `number` to test your if...else statement
let number = 2;

if (number % 2 === 0) {
    console.log("even");
} else if (number == 1) {
    console.log("odd");
} else {
    console.log("odd");
}
// ======================================================================================


/*
Programming Quiz Solution: Musical Groups
*/

// change the value of `musicians` to test your conditional statements
let musicians = 1;

// your code goes here

if (musicians <= 0) {
    console.log("not a group");
} else if (musicians == 1) {
    console.log("solo");
} else if (musicians == 2) {
    console.log("duet");
} else if (musicians == 3) {
    console.log("trio");
} else if (musicians == 4) {
    console.log("quartet");
} else if (musicians > 4) {
    console.log("this is a large group");
}
// ======================================================================================


/*
Programming Quiz Solution: Murder Mystery
*/

// change the value of `room` and `suspect` to test your code
let room = "gallery";
let suspect = "Ms. Van Cleve";
let weapon = "";
let solved = false;

if (room == "dining room") {
    weapon = "knife";
    suspect = "Mr. Parkes";
    solved = true;
} else if (room == "gallery") {
    weapon = "trophy";
    suspect = "Ms. Van Cleve";
    solved = true;
} else if (room == "billiards room") {
    weapon = "pool stick";
    suspect = "Mrs. Sparr";
    solved = true;
} else {
    weapon = "poison";
    suspect = "Mr. Kalehoff";
}

if (solved) {
	console.log(suspect + " did it in the " + room + " with the " + weapon + "!");
}
// ======================================================================================


/*
Programming Quiz Solution: Checking Your Balance
*/

// change the values of `balance`, `checkBalance`, and `isActive` to test your code
let balance = 325.00;
let checkBalance = true;
let isActive = false;

// your code goes here
if (checkBalance === true) {
    if (isActive === true && balance > 0) {
        console.log("Your balance is $" + balance.toFixed(2) + ".");
    } else {
        if (isActive === false) {
            console.log("Your account is no longer active.");
        } else if (isActive === true) {
            if (balance === 0) {
                console.log("Your account is empty.");
            } else {
                console.log("Your account is negative. Please contact bank.");
            }
        }
    }
} else {
    console.log("Thank you. Have a nice day!");
}
// ======================================================================================
