<h1>Intro to JavaScript</h1>


<h2>Loops</h2>

Loops will let you iterate over values and repeatedly run a block of code.

<h3>While Loops</h3>

There are many different kinds of loops, but they all essentially do the same thing: they repeat an action some number of times.

Three main pieces of information that any loop should have are:

1. __When to start__: The code that sets up the loop — defining the starting value of a variable for instance.
2. __When to stop__: The logical condition to test whether the loop should continue.
3. __How to get to the next item__: The incrementing or decrementing step — for example, `x = x * 3` or `x = x - 1`

Here's a basic while loop example that includes all three parts.

```javascript
let start = 0; // when to start
while (start < 10) { // when to stop
	console.log(start);
	start = start + 2; // how to get to the next item
}
```
> _**Prints:**_
>
> _0_
>
> _2_
>
> _4_
>
> _6_
>
> _8_

If a loop is missing any of these three things, then you might find yourself in trouble. For instance, a missing stop condition can result in a loop that never ends!

Try the following in the console and see what gets printed:
How many times will the while loop run?

```javascript
let x = 10;

while (x <= 25) {
    console.log('Printing out x = ' + x);
    x += 2; // x = x + 2
}
```
> _**Answer:** 8_

<h3>Quiz: Fizzbuzz</h3>

"Fizzbuzz" is a famous interview question used in programming interviews. It goes something like this:

- Loop through the numbers 1 to 100
- If the number is divisible by 3, print `"Fizz"`
- If the number is divisible by 5, print `"Buzz"`
- If the number is divisible by both 3 and 5, print `"FizzBuzz"`
- If the number is __not__ divisible by 3 or 5, print the number

> _**TIP:**_ A number `x` is divisible by a number `y` if the answer to `x / y` has a remainder of 0. For example, 10 is divisible by 2 because `10 / 2 = 5` with no remainder. You can check if a number is divisible by another number by checking if `x % y === 0`.

__Directions:__ Write a `while` loop that:

- Loop through the numbers 1 to 20
- If the number is divisible by 3, print `"Fizz"`
- If the number is divisible by 5, print `"Buzz"`
- If the number is divisible by 3 and 5, print `"FizzBuzz"`
- If the number is not divisible by 3 or 5, print the number

```javascript
let x = 1;

while (/* your stop condition goes here */) {
    // check divisibility
    // print Fizz, Buzz, or FizzBuzz
    // increment x
}
```

<h3>Quiz: 99 Bottles of Juice</h3>

__Directions:__ Write a loop that prints out the following song. Starting at 99, and ending at 1 bottle.

```
99 bottles of juice on the wall! 99 bottles of juice! Take one down, pass it around... 98 bottles of juice on the wall!
98 bottles of juice on the wall! 98 bottles of juice! Take one down, pass it around... 97 bottles of juice on the wall!
...
2 bottles of juice on the wall! 2 bottles of juice! Take one down, pass it around... 1 bottle of juice on the wall!
1 bottle of juice on the wall! 1 bottle of juice! Take one down, pass it around... 0 bottles of juice on the wall!
```

```javascript
let num = 99;

while (/* your stop condition goes here */) {
    // check value of num
    // print lyrics using num
    // don't forget to check pluralization on the last line!
    // decrement num
}
```

<h3>Quiz: Countdown, Liftoff!</h3>

NASA's countdown to launch includes checkpoints where NASA engineers complete certain technical tasks. During the final minute, NASA has 6 tasks to complete:

- Orbiter transfers from ground to internal power (T-50 seconds)
- Ground launch sequencer is go for auto sequence start (T-31 seconds)
- Activate launch pad sound suppression system (T-16 seconds)
- Activate main engine hydrogen burnoff system (T-10 seconds)
- Main engine start (T-6 seconds)
- Solid rocket booster ignition and liftoff! (T-0 seconds)

__Directions:__ Write a `while` loop that counts down from 60 seconds and:

- If there's a task being completed, it prints out the task
- If there is no task being completed, it prints out the time as `T-x seconds`
- Use the task and time descriptions described above.

Your output should look like the following:

```
T-60 seconds
T-59 seconds
T-58 seconds
...
T-51 seconds
Orbiter transfers from ground to internal power
T-49 seconds
...
T-3 seconds
T-2 seconds
T-1 seconds
Solid rocket booster ignition and liftoff!
```

```javascript
// Your code goes here
```

<h3>For Loops</h3>

The for loops are the most common type of loop in JavaScript. What makes them different than the earlier while loop is that for the `for` loop explicitly forces you to define the start point, stop point, and each step of the loop. In fact, you'll get an `Uncaught SyntaxError: Unexpected token )` if you leave out any of the three required pieces.

```javascript
for ( start; stop; step ) {
	// do this thing
}
```

Here's an example of a for loop that prints out the values from 0 to 5. Notice the semicolons separating the different statements of the for loop: `let i = 0; i < 6; i = i + 1`

```javascript
for (let i = 0; i < 6; i++) {
    console.log("Printing out i = " + i);
}
```
> _**Prints:**_
>
> _Printing out i = 0_
>
> _Printing out i = 1_
>
> _Printing out i = 2_
>
> _Printing out i = 3_
>
> _Printing out i = 4_
>
> _Printing out i = 5_

__Nested Loops:__ Just like conditional statements, you can nest loops inside each other. This doesn't add anything new to your loops per se, just an extra layer of complexity.

Paste this nested loop in your browser and take a look at what it prints out:

```javascript
for (let x = 0; x < 5; x += 1) {
    for (let y = 0; y < 3; y += 1) {
        console.log(x + "," + y);
    }
}
```
> _**Prints:**_
>
> _0, 0_
>
> _0, 1_
>
> _0, 2_
>
> _1, 0_
>
> _1, 1_
>
> _1, 2_
>
> _2, 0_
>
> _2, 1_
>
> _2, 2_
>
> _3, 0_
>
> _3, 1_
>
> _3, 2_
>
> _4, 0_
>
> _4, 1_
>
> _4, 2_

Notice the order that the output is being displayed.

For each value of `x` in the outer loop, the inner for loop executes completely. The outer loop starts with `x = 0`, and then the inner loop completes it's cycle with all values of `y`:

```
x = 0 and y = 0, 1, 2 // corresponds to (0, 0), (0, 1), and (0, 2)
```
Once the inner loop is done iterating over `y`, then the outer loop continues to the next value, `x = 1`, and the whole process begins again.

```
x = 0 and y = 0, 1, 2 // (0, 0) (0, 1) and (0, 2)
x = 1 and y = 0, 1, 2 // (1, 0) (1, 1) and (1, 2)
x = 2 and y = 0, 1, 2 // (2, 0) (2, 1) and (2, 2)
etc.
```

Try the following in the console and see what gets printed:
What will this loop print out?

```javascript
for (let i = 0; i <= 6; i += 2) {
    console.log(i);
}
```
> _**Answer:** 0 2 4 6_

__Increment and decrement:__

With loops, we often need to increase or decrease the value of a variable in order to step through the loop. We have used `x = x + 1 and x += 1` so far, in addition to these here is a summary of operators:

```
x++ or ++x // same as x = x + 1
x-- or --x // same as x = x - 1
x += 3 // same as x = x + 3
x -= 6 // same as x = x - 6
x *= 2 // same as x = x * 2
x /= 5 // same as x = x / 5
```

<h3>Quiz: Changing the Loop</h3>

__Directions:__ Rewrite the following `while` loop as a `for` loop:

```javascript
let x = 9;
while (x >= 1) {
	console.log("hello " + x);
	x = x - 1;
}

// rewrite the while loop as a for loop
```

<h3>Quiz: Factorials!</h3>

__Directions:__ Write a `for` (note: not a _function_) loop that prints out the factorial of the number 12:

A _factorial_ is calculated by multiplying a number by all the numbers below it. For instance, 3! or "3 factorial" is 3 * 2 * 1 = 6

> 3!=3∗2∗1=6
>
> 4! = 4 * 3 * 2 * 1 = 24 4!=4∗3∗2∗1=24
>
> 5! = 5 * 4 * 3 * 2 * 1 = 120 5!=5∗4∗3∗2∗1=120

Save your final answer in a variable called `solution` and print it to the console.

```javascript
// Your code goes here
```

<h3>Iteration</h3>

Probably the best way to describe iteration is by looking at a normal loop. When you write a for loop, you provide the loop with a variable. This variable is typically the letter `i`, because it's being used as an iterator to keep track of your place in the loop. When you are looping over something like an array, the iterator works like an index, letting you access each item in the array one after the other. This process of getting the next item, one after the other, is iteration. For example,

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
    console.log(digits[i]);
}
```

Really the biggest downside of a for loop is having to keep track of the __counter__ and __exit condition__. While for loops certainly have an advantage when looping through arrays, some data is not structured like an array, so a for loop isn’t always an option.

<h3>The for...in loop</h3>

The `for...in` loop improves upon the weaknesses of the for loop by eliminating the counting logic and exit condition.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
    console.log(digits[index]);
}
```

But, you still have to deal with the issue of using an __index__ to access the values of the array, and that stinks; it almost makes it more confusing than before.

<h3>The for...of loop</h3>

The `for...of` loop, loops exclusively over iterable objects. Now, when I say __iterable__ objects, I just mean an object that has implemented this new iterable interface. By default, this includes the data types String, Array, Map, and Set—notably absent from this list is the `Object` data type (i.e. `{}`). Objects are not iterable, by default. For example,

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
    console.log(digit);
}
```

This makes the `for...of` loop the most concise version of all the for loops. The `for...of` loop also has some additional benefits that fix the weaknesses of the for and `for...in` loops. You can stop or break a `for...of` loop at anytime.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
    if (digit % 2 === 0) {
        continue;
    }
    console.log(digit);
}
```

<h3>Quiz: Writing a For...of Loop</h3>

Write a `for...of` loop that:
- loops through each day in the `days` array
- capitalizes the first letter of the day
- and prints the day out to the console

```javascript
/*
Programming Quiz: Writing a For...of Loop
*/

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Your code goes here
```
