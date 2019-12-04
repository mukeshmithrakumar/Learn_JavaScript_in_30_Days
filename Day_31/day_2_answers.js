/*
Programming Quiz Solution: Navigating the Food Chain

Use a series of ternary operator to set the category to one of the following:
  - "herbivore" if an animal eats plants
  - "carnivore" if an animal eats animals
  - "omnivore" if an animal eats plants and animals
  - undefined if an animal doesn't eat plants or animals

Notes
  - use the variables `eatsPlants` and `eatsAnimals` in your ternary expressions
  - `if` statements aren't allowed ;-)
*/

// change the values of `eatsPlants` and `eatsAnimals` to test your code
let eatsPlants = false;
let eatsAnimals = true;

let category = (eatsPlants && eatsAnimals? "omnivore": undefined) || (eatsPlants? "herbivore": undefined) || (eatsAnimals? "carnivore": undefined);
console.log(category);
// ======================================================================================


/*
Programming Quiz Solution: Back to School

Write a switch statement to set the average salary of a person based on their type of completed education.

*/

// change the value of `education` to test your code
let education = 'no high school diploma';

// set the value of this based on a person's education
let salary = 0;

// your code goes here
switch (education) {
    case "no high school diploma":
        salary = 25636;
        break;
    case "a high school diploma":
        salary = 35256;
        break;
    case "an Associate's degree":
        salary = 41496;
        break;
    case "a Bachelor's degree":
        salary = 59124;
        break;
    case "a Master's degree":
        salary = 69732;
        break;
    case "a Professional degree":
        salary = 89960;
        break;
    case "a Doctoral degree":
        salary = 84396;
        break;
}

console.log("In 2015, a person with " + education + " earned an average of " + "$" + salary.toLocaleString("en-US") + "/year.");
// ======================================================================================


/*
Programming Quiz Solution: Laugh it Off

Write a function called `laugh` with a parameter named `num` that represents the number of "ha"s to return.
Note:
 - make sure your the final character is an exclamation mark ("!")
 - make sure that your function produces the correct results when it is called multiple times
*/

function laugh(num) {
    let ha = "";
    for (let i = 0; i < num; i++) {
        ha += "ha";
    }
    return ha + "!";
}

console.log(laugh(3));
// ======================================================================================


/*
Programming Quiz Solution: Build A Triangle
*/

// creates a line of * for a given length
function makeLine(length) {
    let line = "";
    for (let j = 1; j <= length; j++) {
        line += "* ";
    }
    return line + "\n";
}

// your code goes here.  Make sure you call makeLine() in your own code.
function buildTriangle(lines) {
    let triangle = "";
    for (let i = 1; i <= lines; i++) {
        triangle += makeLine(i);
    }
    return triangle;
}

// test your code by uncommenting the following line
console.log(buildTriangle(10));
// ======================================================================================


/*
Programming Quiz Solution: Inline Functions
*/

// don't change this code
function emotions(myString, myFunc) {
    console.log("I am " + myString + ", " + myFunc(2));
}

// Your code goes here
let num = 2;

// call the emotions function here and pass in an
// inline function expression
emotions("happy", function (num) {
    let ha = "";
    for (let i = 0; i < num; i++) {
        ha += "ha";
    }
    return ha + "!";
});
// ======================================================================================
