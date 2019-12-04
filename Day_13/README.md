<h1>Advanced working with functions</h1>

<h2>Recursion and stack</h2>

Recursion is a programming pattern that is useful in situations when a task can be naturally split into several tasks of the same kind, but simpler. Or when a task can be simplified into an easy action plus a simpler variant of the same task. Or, as we’ll see soon, to deal with certain data structures.

When a function solves a task, in the process it can call many other functions. A partial case of this is when a function calls _itself_. That’s called _recursion_.

<h3>Two ways of thinking</h3>

For something simple to start with – let’s write a function `pow(x, n)` that raises `x` to a natural power of `n`. In other words, multiplies `x` by itself `n` times. There are two ways to implement it.

1. Iterative thinking: the for loop:

```javascript
function pow(x, n) {
    let result = 1;

    // multiply result by x n times in the loop
    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(pow(2, 3));
```
> _**Prints:** 8_

2. Recursive thinking: simplify the task and call self:

```javascript
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }
}

console.log(pow(2, 3));
```
> _**Prints:** 8_

Please note how the recursive variant is fundamentally different. When `pow(x, n)` is called, the execution splits into two branches:

```
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. If `n == 1`, then everything is trivial. It is called _the base_ of recursion, because it immediately produces the obvious result: `pow(x, 1)` equals `x`.

2. Otherwise, we can represent `pow(x, n)` as `x * pow(x, n - 1)`. In maths, one would write $x^n = x * x^{n-1}$. This is called a _recursive step_: we transform the task into a simpler action (multiplication by `x`) and a simpler call of the same task (`pow` with lower `n`). Next steps simplify it further and further until `n` reaches `1`.

The maximal number of nested calls (including the first one) is called _recursion depth_. In our case, it will be exactly `n`. The maximal recursion depth is limited by JavaScript engine. We can make sure about 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help alleviate this (“tail calls optimizations”), but they are not yet supported everywhere and work only in simple cases. That limits the application of recursion, but it still remains very wide. There are many tasks where recursive way of thinking gives simpler code, easier to maintain.

<h3>The execution context and stack</h3>

Now let’s examine how recursive calls work. For that we’ll look under the hood of functions. The information about the process of execution of a running function is stored in its execution context. The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of `this` (we don’t use it here) and few other internal details. One function call has exactly one execution context associated with it.

When a function makes a nested call, the following happens:
- The current function is paused.
- The execution context associated with it is remembered in a special data structure called _execution context stack_.
- The nested call executes.
- After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.

<h3>Recursive structures</h3>

A recursive (recursively-defined) data structure is a structure that replicates itself in parts. For web-developers here's a much better-known examples: HTML and XML documents.

In the HTML document, an HTML-tag may contain a list of:
- Text pieces.
- HTML-comments.
- Other HTML-tags (that in turn may contain text pieces/comments or other tags etc).

That’s once again a recursive definition. For better understanding, we’ll cover one more recursive structure named “Linked list” that might be a better alternative for arrays in some cases.

__Linked list:__

Imagine, we want to store an ordered list of objects. The natural choice would be an array:

```javascript
let arr = [obj1, obj2, obj3];
```

But there’s a problem with arrays. The “delete element” and “insert element” operations are expensive. For instance, `arr.unshift(obj)` operation has to renumber all elements to make room for a new `obj`, and if the array is big, it takes time. Same with `arr.shift()`.

The only structural modifications that do not require mass-renumbering are those that operate with the end of array: `arr.push/pop`. So an array can be quite slow for big queues, when we have to work with the beginning. Alternatively, if we really need fast insertion/deletion, we can choose another data structure called a _linked list_.

The linked list element is recursively defined as an object with:
- `value`.
- `next`: property referencing the next linked list element or `null` if that’s the end.

For instance:

```javascript
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
```

An alternative code for creation:

```javascript
let list = {value: 1};
list.next = {value: 2};
list.next.next = {value: 3};
list.next.next.next = {value: 4};
```

Here we can even more clearer see that there are multiple objects, each one has the `value` and `next` pointing to the neighbor. The `list` variable is the first object in the chain, so following `next` pointers from it we can reach any element.

Unlike arrays, there’s no mass-renumbering, we can easily rearrange elements. Naturally, lists are not always better than arrays. Otherwise everyone would use only lists. The main drawback is that we can’t easily access an element by its number. In an array that’s easy: `arr[n]` is a direct reference. But in the list we need to start from the first item and go `next` `N` times to get the Nth element.

But we don’t always need such operations. For instance, when we need a queue or even a deque – the ordered structure that must allow very fast adding/removing elements from both ends, but access to its middle is not needed.

Lists can be enhanced:
- We can add property `prev` in addition to `next` to reference the previous element, to move back easily.
- We can also add a variable named `tail` referencing the last element of the list (and update it when adding/removing elements from the end).
- The data structure may vary according to our needs.


<h2>Object Literal Shorthand</h2>

A recurring trend in ES6 is to remove unnecessary repetition in your code. By removing unnecessary repetition, your code becomes easier to read and more concise. This trend continues with the introduction of new _shorthand_ ways for initializing objects and adding methods to objects.

You’ve probably written code where an object is being initialized using the same property names as the variable names being assigned to them. For example,

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
    type: type,
    color: color,
    carat: carat
};

// If the properties have the same name as the variables being assigned to them, then
// we can write the above code with as follows
let gemstone = { type, color, carat };
```

There’s also a shorthand way to add methods to objects.

```javascript
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
    type,
    color,
    carat,
    calculateWorth: function() {
    // will calculate worth of gemstone based on type, color, and carat
    }
};
```

In this example, an anonymous function is being assigned to the property `calculateWorth`, but is the __function__ keyword _really_ needed? In ES6, it’s not!

Since you only need to reference the gemstone’s `calculateWorth` property in order to call the function, having the function keyword is redundant, so it can be dropped.

```javascript
let gemstone = {
    type,
    color,
    carat,
    calculateWorth() { ... }
};
```

<h2>Spread... Operator</h2>

The __spread operator__, written with three consecutive dots `( ... )`, is new in ES6 and gives you the ability to expand, or _spread_, iterable objects into multiple elements.

For example,

```javascript
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
```
> _**Prints:** Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities_

__Combining arrays with concat:__

One example of when the spread operator can be useful is when combining arrays.

If you’ve ever needed to combine multiple arrays, prior to the spread operator, you were forced to use the Array’s `concat()` method.

```javascript
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
// Remember that variables declared with `const` cannot be redeclared or reassigned in the same scope
// So we are using `var`
var produce = fruits.concat(vegetables);
console.log(produce);

// Now you can do the same thing with spread operator
var produce = [...fruits, ...vegetables];
console.log(produce);
```
> _**Prints:** ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]_
>
> _**Prints:** ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]_

<h2>...Rest Parameter</h2>

If you can use the _spread_ operator to spread an array into multiple elements, then certainly there should be a way to bundle multiple elements back into an array, right?

In fact, there is! It’s called the _rest_ parameter, and it’s another new addition in ES6.

The __rest parameter__, also written with three consecutive dots `( ... )`, allows you to represent an indefinite number of elements as an array. This can be helpful in a couple of different situations.

One situation is when assigning the values of an array to variables. For example,

```javascript
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```
> _**Prints:** 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]_

This code takes the values of the `order` array and assigns them to individual variables using destructuring (as you saw in the Destructuring section earlier). `total`, `subtotal`, and `tax` are assigned the first three values in the array, however, `items` is where you want to pay the most attention.

By using the rest parameter, `items` is assigned the rest of the values in the array (as an array).

<h3>Quiz: Using the Rest Parameter</h3>

__Directions:__ Use the rest parameter to create an `average()` function that calculates the average of an _unlimited_ amount of numbers.

> _**TIP**: Make sure to test your code with different values. For example,_
>
> _`average(2, 6)` should return `4`_
>
> _`average(2, 3, 3, 5, 7, 10)` should return `5`_
>
> _`average(7, 1432, 12, 13, 100)` should return `312.8`_
>
> _`average()` should return `0`_

```javascript
/*
Programming Quiz: Using the Rest Parameter
*/

// your code goes here
function average() {

}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
```


<h2>Old and New Browsers</h2>

ES6 refers to version 6 of the ECMA Script programming language. ECMA Script is the standardized name for JavaScript, and version 6 is the next version after version 5, which was released in 2011. It is a major enhancement to the JavaScript language, and adds many more features intended to make large-scale software development easier.

The code we've been looking at so far is not supported by older browsers. Older browsers that were developed prior to the release of ES6 were developed to support the version of JavaScript at the time (which was ES5.1). If you try running any ES6 code in an older browser, it won't work.

Just like the [World Wide Web Consortium (W3C)](https://www.w3.org/) is the standards body for things like HTML, CSS, and SVG, [Ecma International(https://www.ecma-international.org/)] is an industry association that develops and oversees standards like JavaScript and JSON. You can find the specifications for ES6 [here](http://www.ecma-international.org/ecma-262/6.0/index.html).

__How Can You Know What Features Browsers Support?__

With new language specifications coming out every year and with browsers updating every other month, it can be quite challenging to know what browser supports which language features. Each browser maker (except for Safari) has a website that tracks its development status. Checkout the platform feature updates for each browser:

- Google Chrome - https://www.chromestatus.com/features#ES6
- Microsoft Edge - https://developer.microsoft.com/en-us/microsoft-edge/platform/status/?q=ES6
- Mozilla Firefox - https://platform-status.mozilla.org/

<h3>Polyfills</h3>

A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively. The code below is a polyfill for the String method, `startsWith()`:

```javascript
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
```

As you can see, a polyfill is just regular JavaScript.

JavaScript is the language used to create a polyfill, but a polyfill doesn't just patch up missing JavaScript features! There are polyfills for all sorts of browser features:

- SVG
- Canvas
- Web Storage (local storage / session storage)
- Video
- HTML5 elements
- Accessibility
- Web Sockets
- and many more!

For a more-complete list of polyfills, check out [this link](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills).

<h3>Transpiling</h3>

A __compiler__ is a computer program that takes a program written in some source code language, let say C++ and then converts it to a target language like machine code. Running code through a compiler changes its level of abstraction, how close it is to human readable code to machine runnable code. __Transpiling__ is a subset of compiling. So, it takes source code and converts it into target code. Just like a compiler but the source code and target code are at the same level of abstraction. Basically if the source code starts out as human readable then the output language will also be human readable. But why would we want this?

Well, we just saw that old browsers do not fully support ES6 but they do support ES5 code. This way we could write our JavaScript using ES6 syntax and functionality and then use a transpiler to convert it from ES6 code to ES5.

<h3>Babel</h3>

The most popular JavaScript transpiler is called [Babel](https://babeljs.io/). Babel's original name was slightly more descriptive - 6to5. This was because, originally, Babel converted ES6 code to ES5 code. Now, Babel does a lot more. It'll convert ES6 to ES5, JSX to JavaScript, and Flow to JavaScript. The way Babel transforms code from one language to another is through plugins. There are plugins that transform ES6 arrow functions to regular ES5 functions. There are plugins that transform ES6 template literals to regular string concatenation.

Now, you're busy and you don't want to have to sift through a big long list of plugins to see which ones you need to convert your code from ES6 to ES5. So instead of having to use a bunch of individual plugins, Babel has __presets__ which are groups of plugins bundled together. So instead of worrying about which plugins you need to install, we'll just use the [ES2015 preset](https://babeljs.io/docs/en/babel-preset-es2015/) that is a collection of all the plugins we'll need to convert all of our ES6 code to ES5.

You can see that the project has a `.babelrc` file. This is where you'd put all of the plugins and/or presets that the project will use. Since we want to convert all ES6 code, we've set it up so that it has the ES2015 preset.

__Transpiling Recap:__

It's important to stay on top of all the changes JavaScript is going through. The best way to do that is to start making use of the new features that are added. The problem is that not all browsers support these new features. So to have your cake and eat it too, you can write in ES6 and then use a transpiler to convert it to ES5 code. This lets you transform your project's code base to the newest version of the language while still letting it run everywhere. Then, once all of the browsers your app has to run on fully support ES6 code, you can stop transpiling your code and just serve the straight ES6 code, directly!
