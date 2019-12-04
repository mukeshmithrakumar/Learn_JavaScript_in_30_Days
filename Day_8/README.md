<h1>Intro to JavaScript</h1>


<h2>Function Arrows</h2>

<h3>Arrow Functions</h3>

__Arrow functions__ are very similar to regular functions in behavior, but are quite different syntactically. The following code takes a list of names and converts each one to uppercase using a regular function:

```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) {
    return name.toUpperCase();
});
```

The code below does the same thing except instead of passing a regular function to the `map()` method, it passes an arrow function. Notice the _arrow_ in the arrow function (`=>`) in the code below:

```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase();
);
```

Regular functions can be either __function declarations__ or __function expressions__, however arrow functions are _always_ __expressions__. In fact, their full name is "arrow function expressions", so they can only be used where an expression is valid. This includes being:
- stored in a variable,
- passed as an argument to a function,
- and stored in an object's property.

One confusing syntax is when an arrow function is stored in a variable.

```javascript
const greet = name => `Hello ${name}!`;
greet('Sam');
```
> _**Returns:** Hello Sam!_

If you recall, the parameter list appears before the arrow function's arrow (i.e. `=>`). If there's only __one__ parameter in the list, then you can write it just like the example above. But, if there are __two or more__ items in the parameter list, or if there are __zero__ items in the list, then you need to wrap the list in parentheses:

```javascript
// empty parameter list requires parentheses
const sayHi = () => console.log(`Hellow fellows!`);

// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
```

__Concise and block body syntax:__

All of the arrow functions we've been looking at have only had a single expression as the function body. This format of the function body is called the _"concise body syntax"_. The concise syntax:
- has no curly braces surrounding the function body
- and automatically returns the expression.

If you need more than just a single line of code in your arrow function's body, then you can use the _"block body syntax"_.

```javascript
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(name => {
    name = name.toUpperCase();
    return `${name} has ${name.length} characters in their name`;
});
```

Important things to keep in mind with the block syntax:
- it uses curly braces to wrap the function body
- and a `return` statement needs to be used to actually return something from the function.

__WARNING__: Everything's not all ponies and rainbows though, and there are definitely times when you might not want to use an arrow function. So before you wipe from your memory how to write a traditional function, check out these implications:
- there's a gotcha with the `this` keyword in arrow functions
- arrow functions are only expressions
    - there's no such thing as an arrow function declaration

<h3>Quiz: Convert Function into an Arrow Function</h3>

__Directions:__ Convert the function passed to the map() method into an arrow function.

```javascript
/*
* Programming Quiz: Convert Function into an Arrow Function
*/

// convert to an arrow function
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(square) {
	return square * square;
});

console.log(...squares);
```

<h3>"this" and Regular Functions</h3>

To get a handle on how `this` works differently with arrow functions, let's do a quick recap of how `this` works in a standard function.

__1. A new object__

If the function is called with `new`:

```javascript
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']);
```
In the code above, the value of `this` inside the `Sundae` constructor function is a new object because it was called with `new`.

__2. A specified object__

If the function is invoked with `call`/`apply`:

```javascript
const result = obj1.printName.call(obj2);
```
In the code above, the value of `this` inside `printName()` will refer to `obj2` since the first parameter of `call()` is to explicitly set what `this` refers to.

__3. A context object__

If the function is a method of an object:

```javascript
data.teleport();
```
In the code above, the value of `this` inside `teleport()` will refer to `data`.

__4. The global object or undefined__

If the function is called with no context:

```javascript
teleport();
```
In the code above, the value of `this` inside `teleport()` is either the global object or, if in strict mode, it's `undefined`.

<h3>"this" and Arrow Functions</h3>

With regular functions, the value of `this` is set based on _how the function is called_. With arrow functions, the value of `this` is based on the _function's surrounding context_. In other words, the value of `this` _inside_ an arrow function is the same as the value of `this` _outside_ the function.

Let's check out an example with `this` in regular functions and then look at how arrow functions will work.

```javascript
// constructor
function IceCream() {
    this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
    const cone = this; // sets `this` to the `cone` variable
    setTimeout(function() {
        cone.scoops++; // references the `cone` variable
        console.log('scoop added!');
    }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

Let's replace the function passed to `setTimeout()` with an arrow function:

```javascript
// constructor
function IceCream() {
    this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
    // an arrow function is passed to setTimeout
    setTimeout(() => {
        this.scoops++;
        console.log('scoop added!');
    }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

<h3>Default Function Parameters</h3>

Take a look at this code:

```javascript
function greet(name, greeting) {
    name = (typeof name !== 'undefined') ?  name : 'Student';
    greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

    return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

What is all that horrible mess in the first two lines of the `greet()` function? All of that is there to provide default values for the function if the required arguments aren't provided. It's pretty ugly, though...

Fortunately, ES6 has introduced a new way to create defaults. It's called __default function parameters__. These are quite easy to read since they're placed in the function's parameter list:

```javascript
function greet(name='Student', greeting='Welcome') {
    return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

To create a default parameter, you add an equal sign (`=`) and then whatever you want the parameter to default to if an argument is not provided. In the code above, both parameters have default values of strings, but they can be any JavaScript type!



<h3>Destructuring</h3>

The two most used data structures in JavaScript are `Object` and `Array`. Objects allow us to create a single entity that stores data items by key, and arrays allow us to gather data items into an ordered collection. But when we pass those to a function, it may need not an object/array as a whole, but rather individual pieces.

Let's look at an old way of doing things:

```javascript
const point = [10, 25, -34];

const x = point[0];
const y = point[1];
const z = point[2];
console.log(x, y, z);
```
> _**Prints:** 10 25 -34_

Now __Destructuring__ borrows inspiration from languages like Perl and Python by allowing you to specify the elements you want to "unpack" from an array or object _on the left side of an assignment_. It sounds a little weird, but you can actually achieve the same result as before, but with much less code; and it's still easy to understand.

```javascript
const point = [10, 25, -34];

const [x, y, z] = point;
console.log(x, y, z);
```
> _**Prints:** 10 25 -34_

In this example, the brackets `[ ]` represent the array being destructured and `x`, `y`, and `z` represent the variables where you want to store the values from the array.

__Destructuring values from an object:__

```javascript
const gemstone = {
  type: 'quartz',
  color: 'rose',
  carat: 21.29
};

const {type, color, carat} = gemstone;
console.log(type, color, carat);
```
> _**Prints:**  quartz rose 21.29_

The curly braces `{ }` represent the object being destructured and `type`, `color`, and `carat` represent the variables where you want to store the properties from the object.

What do you expect to be returned from calling `getArea()`?

```javascript
const circle = {
    radius: 10,
    color: 'orange',
    getArea: function() {
        return Math.PI * this.radius * this.radius;
    },
    getCircumference: function() {
        return 2 * Math.PI * this.radius;
    }
};

let {radius, getArea, getCircumference} = circle;
```
> _**Answer:** Nan_

This happens because when you destructure the object and store the `getArea()` method into the `getArea` variable, it no longer has access to `this` in the `circle` object which results in an area that is `NaN`.



<h3>Defaults and Destructuring</h3>

You can combine default function parameters with destructuring to create some pretty powerful functions!

```javascript
function createGrid([width = 5, height = 5]) {
    return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
createGrid(); // throws an error
```

This throws an error because `createGrid()` expects an array to be passed in that it will then destructure. Since the function was called without passing an array, it breaks. But, we can use default function parameters for this!

```javascript
function createGrid([width = 5, height = 5] = []) {
    return `Generate a ${width} x ${height} grid`;
}

createGrid();
```
> _**Returns:** Generates a 5 x 5 grid_

__Defaults and destructuring objects:__

Just like array destructuring with array defaults, a function can have an object be a default parameter and use object destructuring:

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
createSundae(); // throws an error
```

We can prevent this issue by providing a default object to the function:

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
```
> _**Returns:** Your sundae has 1 scoop with Hot Fudge toppings._

__Array defaults vs. object defaults:__

Since arrays are positionally based, we have to pass `undefined` to "skip" over the first argument (and accept the default) to get to the second argument.

Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!

<h3>Quiz: Using Default Function Parameters</h3>

__Directions:__ Create a `buildHouse()` function that accepts an object as a default parameter. The object should set the following properties to these default values:

- floors = 1
- color = 'red'
- walls = 'brick'

The function should return the following if no arguments or any empty object is passed to the function.

```
Your house has 1 floor(s) with red brick walls.
```

```javascript
/*
Programming Quiz: Using Default Function Parameters
*/

// Your code goes here

/* tests
console.log(buildHouse()); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({})); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({floors: 3, color: 'yellow'})); // Your house has 3 floor(s) with yellow brick walls.
*/
```
