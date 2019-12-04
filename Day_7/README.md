<h1>Intro to JavaScript</h1>


<h2>Functions</h2>

As the complexity of the code you write increases, there will be code that repeats the same number of steps. Instead of repeating the same steps a number of times, we can package up those processes into reusable chunks of code called __Functions__. Functions are just lines of code all packaged together that we can use and reuse when we need them. For Example,

```javascript
// reverseMe is the variable function parameter which in this case will be used to store "Javascript"
function reverseString(reverseMe) {
    let reversed = ""; // will contain the reversed string

    // looping over the string from back to front
    for (let i = reverseMe.length - 1; i >= 0; i--) {
        reversed += reverseMe[i] // adds each character in that order to the reversed variable
    }
    return reversed;
}

reverseString("Javascript")
```
> _**Returns:** "tpircsavaJ"_

There's a lot of things that's going in the above code but think about it, if we didn't write the function then to reverse a string we have to write this code again and again.

__Declaring Functions:__

If there were multiple parameters, you would just separate them with commas.

```javascript
function doubleGreeting(name, otherName) {
    // code to greet two people!
}
```

But, you can also have functions that don't have any parameters. Instead, they just package up some code and perform some task. In this case, you would just leave the parentheses empty.

```javascript
// accepts no parameters! parentheses are empty
function sayHello() {
    let message = "Hello!"
    console.log(message);
}
```

If you tried pasting any of the functions above into the JavaScript console, you probably didn't notice much happen. In fact, you probably saw `undefined` returned back to you. `undefined` is the default return value on the console when nothing is _explicitly_ returned using the special `return` keyword.

In the `sayHello()` function above, a value is __printed__ to the console with `console.log`, but not explicitly returned with a __return statement__. You can write a return statement by using the `return` keyword followed by the expression or value that you want to return.

```javascript
// declares the sayHello function
function sayHello() {
    let message = "Hello!"
    return message; // returns value instead of printing it
}
```

Now, to get your function to do something, you have to __invoke__ or __call__ the function using the function name, followed by parentheses with any __arguments__ that are passed into it. Functions are like machines. You can build the machine, but it won't do anything unless you also turn it on. Here's how you would call the `sayHello()` function from before, and then use the return value to print to the console:

```javascript
// declares the sayHello function
function sayHello() {
	let message = "Hello!"
	return message; // returns value instead of printing it
}

// function returns "Hello!" and console.log prints the return value
console.log(sayHello());
```
> _**Prints:** "Hello!"_

At first, it can be a bit tricky to know when something is either a parameter or an argument. The key difference is in where they show up in the code. A __parameter__ is always going to be a variable name and appears in the function declaration. On the other hand, an __argument__ is always going to be a value (i.e. any of the JavaScript data types - a number, a string, a boolean, etc.) and will always appear in the code when the function is called or invoked.

Are `x` and `y` parameters or arguments for this function?

```javascript
function findAverage(x, y) {
	let answer = (x + y) / 2;
	return answer;
}

let avg = findAverage(5, 9);
```
> _**Answer:** Parameters_

<h3>Quiz: Laugh it Off</h3>

__Directions:__ Write a function called `laugh()` that takes one parameter, `num` that represents the number of `"ha"`s to return.

> _**TIP:** You might need a loop to solve this!_

Here's an example of the output and how to call the function that you will write:

```javascript
console.log(laugh(3));
```
> _**Prints:** "hahaha!"_

```javascript
// Your code goes here
```

<h3>Returning vs. Logging</h3>

It’s important to understand that __return__ and __print__ are not the same thing. Printing a value to the JavaScript console only displays a value (that you can view for debugging purposes), but the value it displays can't really be used for anything more than that. For this reason, you should remember to only use `console.log` to test your code in the JavaScript console.

Paste the following function declaration and function invocation into the JavaScript console to see the difference between logging (printing) and returning:

```javascript
function isThisWorking(input) {
	console.log("Printing: isThisWorking was called and " + input + " was passed in as an argument.");
	return "Returning: I am returning this string!";
}

isThisWorking(3);
```
> _**Prints:** "Printing: isThisWorking was called and 3 was passed in as an argument"_
>
> _**Returns:** "Returning: I am returning this string!"_

If you don't explicitly define a return value, the function will return `undefined` by default.

```javascript
function isThisWorking(input) {
	console.log("Printing: isThisWorking was called and " + input + " was passed in as an argument.");
}

isThisWorking(3);
```
> _**Prints:** "Printing: isThisWorking was called and 3 was passed in as an argument"_
>
> _**Returns:** undefined_

What does this function "return"?

```javascript
function sleep() {
	console.log("I'm sleepy!");
	return "zzz";
	return "snore";
}

sleep();
```
> _**Answers:** "zzz"_

The second snore doesn't gets returned because after the first return the function exits.

_A function's return value can be stored in a variable or reused throughout your program as a function argument_. Here, we have a function that adds two numbers together, and another function that divides a number by 2. We can find the average of 5 and 7 by using the `add()` function to add a pair of numbers together, and then by passing the sum of the two numbers `add(5, 7)` into the function `divideByTwo()` as an argument.

And finally, we can even store the final answer in a variable called `average` and use the variable to perform even more calculations in more places!

```javascript
// returns the sum of two numbers
function add(x, y) {
    return x + y;
}

// returns the value of a number divided by 2
function divideByTwo(num) {
    return num / 2;
}

let sum = add(5, 7); // call the "add" function and store the returned value in the "sum" variable
let average = divideByTwo(sum); // call the "divideByTwo" function and store the returned value in the "average" variable
```

<h3>Scope</h3>

Apart from regular syntax errors, scope will be at the heart of many coding bugs, you run into it in pretty much any programming language. When programmers talk about scope, they're talking about the part of the program where a particular identifier, such as a variable or a function name, is visible or accessible. Trying to figure out if something is in scope can be tricky at first.

In JavaScript you have two different kinds of scopes, global scope and function scope. If you define an identifier outside of all of your functions it is considered part of the __global scope__. That means the variable can be accessed everywhere within the program, it is available globally. All functions in your program can access variables defined in global scope. On the other hand, if an identifier is defined inside of a function, it will be visible everywhere inside that function even inside other functions inside that function. For example,

```javascript
// the variable mukesh is defined in the global scope
let mukesh = "I am looking for this book...";
// console.log(book);

function library(){
    // the variable librarian is defined in the function scope & is accessible by the library and dataScience function
    let librarian = "You will want to look in to the data science section. Follow me!";
    // console.log(book);

    function dataScience() {
        // the variable book is only accessible by the dataScience function and can't be accessed outside
        let book = "Great Expectations";
        // console.log(book);
    }
}
```

You can verify this by `console.log(book)` outside library and inside library both of which will return a `Uncaught ReferenceError: book is not defined` but if you try the third console log, it will return `Great Expectations`.

Scope can be a tricky subject, especially when you are bouncing between global and function scope. One of the gotchas can in __scope overriding__ or __shadowing__. For example,

```javascript
// bookTitle in global scope
let bookTitle = "Le Petit Prince";
console.log(bookTitle); // Prints: "Le Petit Prince"

function displayBookEnglish() {
    // bookTitle in function scope
    bookTitle = "The Little Prince";
    console.log(bookTitle); // Prints: "The Little Prince"
}

displayBookEnglish();
console.log(bookTitle); // Prints: "The Little Prince"
```

In the example above, we have the same variable `bookTitle` being assigned values in two different scopes. At the third `console.log` we are outside of the function scope so why are we not getting the global scope printed out?

This is a classic case of scope overriding or shadowing. This happens because inside the function block the `bookTitle` is reassigned to `"The Little Prince"` so when we reach the final bookTitle the global scope has changed even though we exited the function scope. To prevent this, we can simply create a new variable, we can do this by changing `bookTitle` inside the function block to `let blockTitle` and now our global variable will remain unchanged. And in that way the third `console.log` will print the `"Le Petit Prince"`.

Without pasting into your console, what do you think this code will print out?

```javascript
let x = 1;

function addTwo() {
    x = x + 2;
}

addTwo();
x = x + 1;
console.log(x);
```
> _**Answer:** 4_

Without pasting into your console, what do you think this code will print out?

```javascript
let x = 1;

function addTwo() {
    let x = x + 2;
}

addTwo();
x = x + 1;
console.log(x);
```
> _**Answer:** 2_

So if you are wondering, "Why wouldn't I always use global variables? Then, I would never need to use function arguments since ALL my functions would have access to EVERYTHING!"

Well... Global variables might seem like a convenient idea at first, especially when you're writing small scripts and programs, but there are many reasons why you shouldn't use them unless you have to. For instance, global variables can conflict with other global variables of the same name. Once your programs get larger and larger, it'll get harder and harder to keep track and prevent this from happening.

There are also other reasons you'll learn more about in more advanced courses. But for now, just work on minimizing the use of global variables as much as possible.

<h3>Hoisting</h3>

Sometimes your JavaScript code will produce errors that may seem counterintuitive at first. __Hoisting__ is another one of those topics that might be the cause of some of these tricky errors you're debugging. For example,

```javascript
findAverage(5, 9);

function findAverage(x, y) {
    let answer = (x + y) / 2;
    return answer;
}
```

In most programming languages you have to declare a function before you can call it, this is because the code is read from top to bottom. And the above code wouldn't work and we assume it would be the same with JavaScript atleast I did because I come from a Python background but the code above works in JavaScript.

This is because of one really corky feature in JavaScript called hoisting and it has to do with how JavaScript code is being interpreted. Basically before any code is executed, all function declarations are hoisted to the top of the current scope. This also happens with variable declarations. So, okay, this all sounds good and if it is working, you might think what the problem is, let me show you what happens if you rely on hoisting and declare variables in the middle.

```javascript
function sayGreeting () {
    console.log(greeting);
    let greeting;
}

sayGreeting();
```

If we run this code like this we will get a `undefined` error, okay, that makes sense because we haven't given `greeting` a value, so let's go ahead and do that:

```javascript
function sayGreeting () {
    console.log(greeting);
    let greeting = "Hello";
}

sayGreeting();
```

If you run that, you will still get a `undefined` error, okay, so, why is that, we have given `greeting` a value and from hoisting we know it gets hoisted to the top, so why does it still give an undefined error. This is actually a bug because of hoisting. The `let greeting` is getting hoisted to the top of the function scope, but the assignment (`greeting = "Hello"`) stays where it is, so you still end up with the `undefined` error. So, the moral of the story is, don't rely on hoisting, have the variables and functions defined on top, pretty obvious 😉.

What value will be printed to the console?

```javascript
sayHi("Julia");

function sayHi(name) {
	console.log(greeting + " " + name);
	let greeting;
}
```
> _**Answer:** undefined Julia_

Remember Variable _assignments_ are not hoisted.

<h3>Quiz: Build a Triangle</h3>

__Directions:__ For this quiz, you're going to create a function called `buildTriangle()` that will accept an input (the triangle at its widest width) and will return the string representation of a triangle. See the example output below.

__Returns:__

```
*
* *
* * *
* * * *
* * * * *
* * * * * *
* * * * * * *
* * * * * * * *
* * * * * * * * *
* * * * * * * * * *
```

We've given you one function `makeLine()` to start with. The function takes in a line length, and builds a line of asterisks and returns the line with a newline character.

```javascript
function makeLine(length) {
    let line = "";
    for (let j = 1; j <= length; j++) {
        line += "* "
    }
    return line + "\n";
}

// Your code goes here
```

You will need to call this `makeLine()` function in `buildTriangle()`.

This will be the most complicated program you've written yet, so take some time thinking through the problem before diving into the code. What tools will you need from your JavaScript tool belt? Professionals plan out their code before writing anything. Think through the steps your code will need to take and write them down in order. Then go through your list and convert each step into actual code. Good luck!

```javascript
// creates a line of * for a given length
function makeLine(length) {
    let line = "";
    for (let j = 1; j <= length; j++) {
        line += "* ";
    }
    return line + "\n";
}

// your code goes here.  Make sure you call makeLine() in your own code.


// test your code by uncommenting the following line
//console.log(buildTriangle(10));
```

<h3>Function Expressions</h3>

Once you know how to declare a function, a whole new set of possibilities will open up to you.

For instance, remember how you can store anything you want in a variable? Well, in JavaScript, you can also store functions in variables. When a function is stored _inside_ a variable it's called a __function expression__.

```javascript
let catSays = function(max) {
    let catMessage = "";
    for (let i = 0; i < max; i++) {
        catMessage += "Meow";
    }
    return catMessage;
};
```

Notice how the `function` keyword no longer has a name.

```javascript
let catSays = function(max) {
	// Your code goes here
};
```

It's an __anonymous function__, a function with no name, and you've stored it in a variable called `catSays`.

And, if you try accessing the value of the variable `catSays`, you'll even see the function returned back to you.

So now you have two ways to define a function in JavaScript, a function declaration and a function expression. Deciding when to use a function expression and when to use a function declaration can depend on a few things, and you will see some ways to use them in the next section. But, one thing you'll want to be careful of, is hoisting.

All _function declarations are hoisted_ and loaded before the script is actually run. _Function expressions are not hoisted_, since they involve variable assignment, and only variable declarations are hoisted. The function expression will not be loaded until the interpreter reaches it in the script.

<h3>Functions as parameters</h3>

Being able to store a function in a variable makes it really simple to pass the function into another function. A function that is passed into another function is called a __callback__. Let's say you had a `helloCat()` function, and you wanted it to return "Hello" followed by a string of "meows" like you had with `catSays`. Well, rather than redoing all of your hard work, you can make `helloCat()` accept a callback function, and pass in `catSays`.

```javascript
// function expression catSays
let catSays = function(max) {
	let catMessage = "";
	for (let i = 0; i < max; i++) {
		catMessage += "meow ";
	}
	return catMessage;
};

// function declaration helloCat accepting a callback
function helloCat(callbackFunc) {
	return "Hello " + callbackFunc(3);
}

// pass in catSays as a callback function
helloCat(catSays);
```

__Inline function expressions:__

A function expression is when a function is assigned to a variable. And, in JavaScript, this can also happen when you pass a function inline as an argument to another function. Take the `favoriteMovie` example for instance:

```javascript
// Function expression that assigns the function displayFavorite to the variable favoriteMovie
let favoriteMovie = function displayFavorite(movieName) {
	console.log("My favorite movie is " + movieName);
};

// Function declaration that has two parameters: a function for displaying a message, along with a name of a movie
function movies(messageFunction, name) {
	messageFunction(name);
}

// Call the movies function, pass in the favoriteMovie function and name of movie
movies(favoriteMovie, "Finding Nemo");
```
> _**Returns:** My favorite movie is Finding Nemo_

But you could have bypassed the first assignment of the function, by passing the function to the `movies()` function inline.

```javascript
// Function declaration that takes in two arguments: a function for displaying a message, along with a name of a movie
function movies(messageFunction, name) {
	messageFunction(name);
}

// Call the movies function, pass in the function and name of movie
movies(function displayFavorite(movieName) {
	console.log("My favorite movie is " + movieName);
}, "Finding Nemo");
```

This type of syntax, writing function expressions that pass a function into another function inline, is really common in JavaScript. It can be a little tricky at first, but be patient, keep practicing, and you'll start to get the hang of it!

Using an anonymous inline function expression might seem like a very not-useful thing at first. Why define a function that can only be used once and you can't even call it by name?

Anonymous inline function expressions are often used with function callbacks that are probably not going to be reused elsewhere. Yes, you could store the function in a variable, give it a name, and pass it in like you saw in the examples above. However, when you know the function is not going to be reused, it could save you many lines of code to just define it inline.

<h3>Quiz: Inline Functions</h3>

__Direction:__ Call the `emotions()` function so that it prints the output you see below, but instead of passing the `laugh()` function as an argument, pass an inline function expression instead.

```javascript
emotions("happy", laugh(2)); // you can use your laugh function from the previous quizzes
```
> _**Prints:** "I am happy, haha!"_

```javascript
// don't change this code
function emotions(myString, myFunc) {
    console.log("I am " + myString + ", " + myFunc(2));
}

// your code goes here
// call the emotions function here and pass in an
// inline function expression
```
