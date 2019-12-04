<h1>Object Oriented JavaScript: Objects</h1>


<h2>Objects</h2>

JavaScript is a powerful and articulate language. Using object oriented programming, you'll be able to write classes capable of creating countless instances of similarly functioning objects. Objects are an incredibly powerful feature of JavaScript. They allow us to wrap up pieces of related data and functionality, into one single container.

Objects have properties and things they can do. You can add information using a key value pair. In the example below we have defined property `key` color and isOpen; and `value` red and false. Opening the umbrella is a task you want the umbrella to be able to do. Something the object can do is a `method`. A method is just a function that's associated with an object.

```javascript
let umbrella = {
	color : "red",
	isOpen : false,
	open : function () {
		if (umbrella.isOpen === true) {
			return "The Umbrella is already Open!";
		} else {
			umbrella.isOpen = true;
			return "Mukesh Opens the Umbrella";
		}
	}
};
```

> _**TIP:** It’s worth noting that while we can represent real-world objects as JavaScript objects, the analogy does not always hold. This is a good starting place for thinking about the structure and purpose of objects, but as you continue your career as a developer, you’ll find that JavaScript objects can behave wildly different than real objects._

<h3>Object Literals</h3>

```javascript
let brother = {
	name: "Dean",
	age: 23,
	parents: ["John", "Mary"],
	siblings: ["Sam"],
	favoriteColor: "black",
	pets: true
};
```

The syntax you see above is called __object-literal notation__. There are some important things you need to remember when you're structuring an object literal:

- The "key" (representing a __property__ or __method__ name) and its "value" are separated from each other by a __colon__
- The `key: value` pairs are separated from each other by __commas__
- The entire object is wrapped inside curly braces `{ }`.

Below is a variation of how you can define a key value pair:

```javascript
const course = {courseId: 711};    // ← no quotes around the courseId key
const course = {'courseId': 711};  // ← single quotes around the courseId key
const course = {"courseId": 711};  // ← double quotes around the courseId key
```

You'll commonly find quotation marks omitted from property names. Certain situations require them to be included, especially if the property name:
- Is a __reserved word__ (e.g., `for`, `if`, `let`, `true`, etc.).
- Contains __spaces or special characters__ that cannot appear in a variable name (i.e., punctuation other than `$`, and `_` -- most accented characters).

<h3>Creating Objects</h3>

To create a new, blank (i.e., “empty”) object, you can use object __literal notation__, or the `Object()` __constructor function__.

```javascript
// Using literal notation:
const myObject = {};

// Using the Object() constructor function:
const myObject = new Object();
```

While both methods ultimately return an object without properties of its own, the Object() constructor function is a bit slower and more verbose. As such, the recommended way to create new objects in JavaScript is to use literal notation.

<h3>Accessing Object Properties</h3>

The `key` in a `key:value` pair allows you to look up a piece of information about an object. There are two ways to access the values in an object, the dot notation and square bracket notation. For example,

```javascript
const bicycle = {
    color: 'blue',
    type: 'mountain bike',
    wheels: {
        diameter: 18,
        width: 8
    }
};

bicycle.color; // blue
bicycle["color"]; // blue

// We can use the dot notation and the bracket to retrieve nested objects
bicycle.wheels.width; // 8
bicycle['wheels']['width']; // 8
```

__Dot Notation Limitations:__ Note that while dot notation may be easier to read and write, it can't be used in every situation. For example, let's say there's a key in the above `bicycle` object that is a number. An expression like `bicycle.1`; will cause a error, while `bicycle[1]`; returns the intended value.

Another issue is when variables are assigned to property names. Let's say we declare `myVariable`, and assign it to the string `'color'`:

```javascript
const myVariable = 'color';
```

`bicycle[myVariable];` returns `'blue'` because the variable `myVariable` gets substituted with its value (the string `'color'`) and `bicycle['color']`'s value is `'blue'`. However, `bicycle.myVariable;` returns `undefined`:

```javascript
bicycle[myVariable]; // 'blue'
bicycle.myVariable; // undefined
```

It may seem odd, but recall that all property keys in a JavaScript object are strings, even if the quotation marks are omitted. With dot notation, the JavaScript interpreter looks for a key within `bicycle` whose value is `'myVariable'`. Since there isn't such a key defined in the object, the expression returns `undefined`.

<h3>Modify Properties</h3>

Objects have properties (information about the object) and methods (functions or capabilities the object has). For example,

```javascript
let myObj = {
	color: "orange",
	shape: "sphere",
	type: "food",
	eat: function() { return "yummy" }
};

myObj.eat(); // method
myObj.color; // property
```

Keep in mind that data within objects are mutable, meaning that data can be changed. There are a few exceptions to this, but for now, let's see how we can modify/reassign existing properties in an object.

Consider the following `cat` object:

```javascript
const cat = {
    age: 2,
    name: 'Bailey',
    meow: function () {
        console.log('Meow!');
    },
    greet: function (name) {
        console.log(`Hello ${name}`);
    }
};

// Now, let's go ahead change it up a bit!
cat.age += 1;
cat.age; // 3

cat.name = 'Bambi';
cat.name; // 'Bambi'
```

__Adding Properties:__

Properties can be added to objects simply by specifying the property name, then giving it a value. Let's start off with a blank object, then add two properties:

```javascript
const printer = {};

printer.on = true;
printer.mode = 'black and white';

// Keep in mind that square bracket notation works just as well for adding properties
printer["remainingSheets"] = 168;

// Likewise, we can add a method to the printer object in a similar manner.
// This time, the value of the property is an anonymous (i.e., unnamed) function:
printer.print = function () {
    console.log('The printer is printing!');
};
```

__Removing Properties:__

Recall that since objects are _mutable_, not only can we modify existing properties (or even add new ones) -- we can also delete properties from objects.

Say that the `printer` object above actually doesn't have any modes (i.e., `'black and white'`, `'color'`, etc.). We can go ahead and remove that property from `printer` using the `delete` operator.

```javascript
delete printer.mode;
```
> _**Returns:** true_

Note that `delete` directly mutates the object at hand. If we try to access a deleted property, the JavaScript interpreter will no longer be able to find the `mode` property because the `mode` key (along with its value, `true`) have been deleted.

__Passing a Primitive:__

In JavaScript, a primitive (e.g., a string, number, boolean, etc.) is _immutable_. In other words, any changes made to an argument inside a function effectively creates a copy local to that function, and does not affect the primitive outside of that function. Check out the following example:

```javascript
function changeToEight(n) {
    n = 8; // whatever n was, it is now 8... but only in this function!
}

let n = 7;

changeToEight(n);
console.log(n);
```
> _**Returns:** 7_

__Passing an Object:__

On the other hand, _objects_ in JavaScript are _mutable_. If you pass an object into a function, Javascript passes a _reference_ to that object. Let's see what happens if we pass an object into a function and then modify a property:

```javascript
let originalObject = {
    favoriteColor: 'red',
};

function setToBlue(object){
    object.favoriteColor = 'blue';
};

setToBlue(originalObject);
originalObject.favoriteColor;
```
> _**Returns:** 'blue'_

In the above example, `originalObject` contains a single property, `favoriteColor`, which has a value of `'red'`. We pass `originalObject` into the `setToBlue()` function and invoke it. After accessing `originalObject`'s `favoriteColor` property, we see that the value is now `'blue'`!

How did this happen? Well, since objects in JavaScript are passed by reference, if we make changes to that reference, we're actually directly modifying the original object itself!

What's more: the same rule applies when re-assigning an object to a new variable, and then changing _that_ copy. Again, since objects are passed by reference, the original object is changed as well. Let's take a look at this more closely with another example.

Consider this `iceCreamOriginal` object, which shows the amount of ice cream cones eaten:

```javascript
const iceCreamOriginal = {
    Bernie: 3,
    Sanders: 15
};
```

Let's go ahead and make assign a new variable to `iceCreamOriginal`. We'll then check the value of its Sanders property:

```javascript
const iceCreamCopy = iceCreamOriginal;
iceCreamCopy.Sanders;
```
> _**Returns:** 15_

Since objects are passed by reference, making changes to the copy (`iceCreamCopy`) has a direct effect on the original object (`iceCreamOriginal`) as well. In both objects, the value of the `Sanders` property is now `99`.

__Comparing an Object with Another Object:__

On the topic of references, what happens when we compare one object with another object. Let's say you have two objects which has the same methods and properties. Naturally, one might expect the objects to be equal. After all, both objects look exactly the same! But ss it turns out, the expression will only return `true` when comparing two references to exactly the same object.

Consider the following: What is logged to the console?

```javascript
let string = 'orange';

function changeToApple(string) {
    string = 'apple';
}

changeToApple(string);

console.log(string);
```
> _**Answer:** orange_

This happens because within `changeToApple()`, `string` is assigned to `'apple'`. However, this change is only relevant _within_ the function; outside, the value of `string` remains `'orange'`.

By default, objects are mutable (with a few exceptions), so data within them can be altered. New properties can be added, and existing properties can be modified by simply specifying the property name and assigning (or re-assigning) a value. Additionally, properties and methods of an object can be deleted as well with the `delete` operator, which directly mutates the object.

<h3>Quiz: Umbrella</h3>

__Directions:__ See if you can follow the example `open()` method and create the `close()` method. It's alright if you have trouble at first! We'll go into more detail later in this lesson.

```javascript
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
	}
};
    // Your code goes here
```


<h3>Quiz: Bank Accounts</h3>

__Directions:__ Using the given object add a `printAccountSummary()` method that returns the following account message:

```
Welcome!
Your balance is currently $1000 and your interest rate is 1%.
```

```javascript
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
};

console.log(savingsAccount.printAccountSummary());
```

<h3>Quiz: Facebook Friends</h3>

__Directions:__ Create an object called `facebookProfile`.

The object should have 3 properties:
- your `name`
- the number of `friends` you have, and
- an array of `messages` you've posted (as strings)

The object should also have 4 methods:
- `postMessage(message)` - adds a new message string to the array
- `deleteMessage(index)` - removes the message corresponding to the index provided
- `addFriend()` - increases the friend count by 1
- `removeFriend()` - decreases the friend count by 1

```javascript
// Your code goes here
```

<h3>Quiz: Donuts</h3>

__Directions:__ Use the `forEach()` method to loop over the array and print out the following donut summaries using `console.log`.

```
Jelly donuts cost $1.22 each
Chocolate donuts cost $2.45 each
Cider donuts cost $1.59 each
Boston Cream donuts cost $5.99 each
```

```javascript
let donuts = [
    { type: "Jelly", cost: 1.22 },
    { type: "Chocolate", cost: 2.45 },
    { type: "Cider", cost: 1.59 },
    { type: "Boston Cream", cost: 5.99 }
];

// Your code goes here
```

<h3>Invoking Object Methods</h3>

__Functions vs. Methods:__

At this point, we've mostly seen objects with properties that behave more like attributes. That is, properties such as `color` or `type` are data that describe an object, but they don't "do" anything. We can extend _functionality_ to objects by adding __methods__ to them.

If we want to add a function into an object, we can add the same way as we add other new properties: by providing property name, then giving it a value. This time, the value of the property is a function!

So now that a property has been defined, how do we go about calling (i.e., invoking) its referenced function?

__Calling Methods:__

We can access a function in an object using the property name. Again, another name for a function property of an object is a _method_. We can access it the same way that we do with other properties: by using dot notation or square bracket notation.

Let's take a look at a developer object, then invoke its sayHello() method:

```javascript
const developer = {
    name: 'Mukesh',
    sayHello: function () {
        console.log('Hi there!');
    }
};

developer.sayHello(); // 'Hi there!'
developer['sayHello'](); // 'Hi there!'
```

__Passing Arguments Into Methods:__

If the method takes arguments, you can proceed the same way, too:

```javascript
const developer = {
    name: 'Mukesh',
    sayHello: function () {
        console.log('Hi there!');
    },
    favoriteLanguage: function (language) {
        console.log("My favorite programming language is ${language}");
    }
};

developer.favoriteLanguage('JavaScript'); // My favorite programming language is JavaScript'
```
> _**Prints:** "My favorite programming language is JavaScript'"_

Write an expression that invokes the alerter() function in the following array, myArray:

```javascript
const myArray = [ function alerter() { alert('Hello!'); } ];
```
> _**Answer:** myArray[0]();_

Write an expression that invokes the function referenced by the bell object's ring property:

```javascript
const bell = {
    color: 'gold',
    ring: function () {
        console.log('Ring ring ring!');
    }
};
```
> _**Answer:** bell.ring();_

__Call Methods by Property Name:__

We've been using anonymous functions (i.e., functions without a name) for object methods. However, naming those functions is still valid JavaScript syntax. Consider the following object, `greeter`:

```javascript
const greeter = {
    greet: function sayHello() {
        console.log('Hello!');
    }
};
```

Note that the `greet` property points to a function with a name: `sayHello`. Whether this function is named or not, `greet` is invoked the same way:

```javascript
greeter.greet();
```
> _**Prints:** "Hello!"_

<h3>Object methods, "this"</h3>

Recall that an object can contain data and the means to manipulate that data. But just how can an object reference its own properties, much less manipulate some of those properties itself? This is all possible with the `this` keyword!

Using `this`, methods can directly access the object that it is called on. Consider the following object, `triangle`:

```javascript
const triangle = {
    type: "scalene",
    identify: function () {
        console.log("This is a ${this.type} triangle.");
    }
};

triangle.identify();
```
> _**Prints:** "'This is a scalene triangle.'"_

The value of `this` is evaluated during the run-time, depending on the context. For instance, here the same function is assigned to two different objects and has different `“this”` in the calls:

```javascript
let user = {name: "Mukesh"};
let admin = {name: "Admin"};

function sayHi() {
    console.log(this.name);
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // Mukesh  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```

The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it’s either `user` or `admin` in the example above.

We can even call the function without an object at all:

```javascript
function sayHi() {
    console.log(this);
}

sayHi(); // undefined
```

In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error. In non-strict mode the value of `this` in such case will be the _global object_ (`window` in a browser, we’ll get to it after the next section).

<h3>Arrow functions have no “this”</h3>

Arrow functions are special: they don’t have their “own” `this`. If we reference `this` from such a function, it’s taken from the outer “normal” function. For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:

```javascript
let user = {
    firstName: "Mukesh",
    sayHi() {
        let arrow = () => console.log(this.firstName);
        arrow();
    }
};

user.sayHi(); // Mukesh
```

That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate this, but rather to take it from the outer context.

<h3>Quiz: Invoking Object Methods</h3>

```javascript
/*

Create an object called `chameleon` with two properties:

1. `color`, whose value is initially set to 'green' or 'pink'
2. `changeColor`, a function which changes `chameleon`'s `color` to 'pink'
    if it is 'green', or to 'green' if it is 'pink'

*/

// Your code goes here
```

<h3>Beware of Globals</h3>

__The `window` Object:__

If you haven't worked with the `window` object yet, this object is provided by the browser environment and is globally accessible to your JavaScript code using the identifier, `window`. This object is not part of the JavaScript specification (i.e., ECMAScript); instead, it is developed by the W3C.

This `window` object has access to a ton of information about the page itself, including:

- The page's URL (`window.location;`)
- The vertical scroll position of the page (`window.scrollY'`)
- Scrolling to a new location (`window.scroll(0, window.scrollY + 200);` to scroll 200 pixels down from the current location)
- Opening a new web page (`window.open("https://www.adhiraiyan.org/");`)

__Global Variables are Properties on `window`:__

Since the `window` object is at the highest (i.e., global) level, an interesting thing happens with global variable declarations. Every variable declaration that is made at the global level (outside of a function) automatically becomes a property on the `window` object!

```javascript
var currentlyEating = 'ice cream';
window.currentlyEating === currentlyEating
```
> _**Returns:** true_

Here we can see that the `currentlyEating` variable is set to `'ice cream'`. Then, we immediately see that the `window` now has a `currentlyEating` property! Checking this property against the `currentlyEating` variable shows us that they are _identical_.

__Globals and `var`, let, `and` `const`:__

The keywords `var`, `let`, and `const` are used to declare variables in JavaScript. `var` has been around since the beginning of the language, while `let` and `const` are significantly newer additions (added in ES6).

Only declaring variables with the `var` keyword will add them to the `window` object. If you declare a variable outside of a function with either `let` or `const`, it will not be added as a property to the `window` object.

```javascript
let currentlyEating = 'ice cream';
window.currentlyEating === currentlyEating
```
> _**Returns:** false_

__Global Functions are Methods on `window`:__

Similarly to how global variables are accessible as properties on the `window` object, any global function declarations are accessible on the `window` object as methods:

```javascript
function learnSomethingNew() {
    window.open('https://www.adhiraiyan.org/');
}

window.learnSomethingNew === learnSomethingNew
```
> _**Returns:** true_

Declaring the `learnSomethingNew()` function as a global function declaration (i.e., it's globally accessible and not written _inside_ another function) makes it accessible to your code as either `learnSomethingNew()` or `window.learnSomethingNew()`.

__Avoid Globals:__

We've seen that declaring global variables and functions add them as properties to the `window` object. Globally-accessible code sounds like something that might be super helpful, right?

Counterintuitively, though, global variables and functions are _not_ ideal. There are actually a number of reasons why, but the two we'll look at are:

- __Tight coupling__ is a phrase that developers use to indicate code that is too dependent on the details of each other. The word "coupling" means the "pairing of two items together." In tight coupling, pieces of code are joined together in a way where changing one unintentionally alters the functioning of some other code.

- __Name collision__ occurs when two (or more) functions depend on a variable with the same name. A major problem with this is that both functions will try to update the variable and or set the variable, but these changes are overridden by each other!

<h3>Extracting Properties and Values</h3>

The `Object()` function actually includes a few methods of its own to aid in the development of your applications. These methods are:
- `Object.keys()`
- `Object.values()`

At its core, an object is just a collection of key/value pairs. What if we want to extract only the keys from an object? Say we have this object representing a real-life dictionary:

```javascript
const dictionary = {
    car: 'automobile',
    apple: 'healthy snack',
    cat: 'cute furry animal',
    dog: 'best friend'
};
```

`Object.keys()` extracts just the keys of that object, then returns those keys in an array:

```javascript
Object.keys(dictionary);
```
> _**Returns:** ['car', 'apple', 'cat', 'dog']_

Object.values() extracts the values of that object, then returns those in an array:

```javascript
Object.values(dictionary);
```
> _**Returns:** ['automobile', 'healthy snack', 'cute furry animal', 'best friend']_
