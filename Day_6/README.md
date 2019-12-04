<h1>Other Topics</h1>


<h2>Built-ins</h2>

<h3>Symbols</h3>

A __symbol__ is a unique and immutable data type that is often used to identify object properties. To create a symbol, you write `Symbol()` with an optional string as its __description__.

```javascript
const sym1 = Symbol('apple');
console.log(sym1);
```
> _**Prints:** Symbol(apple)_

This will create a unique symbol and store it in `sym1`. The description `"apple"` is just a way to describe the symbol, but it can’t be used to access the symbol itself.

<h3>Iteration & Iterable Protocols</h3>

Before you move on, let’s spend some time looking at two new protocols in ES6:
- the __iterable__ protocol
- the __iterator__ protocol

__The Iterable Protocol:__

The __iterable protocol__ is used for defining and customizing the iteration behavior of objects. What that really means is you now have the _flexibility_ in ES6 to specify a way for iterating through values in an object. For some objects, they already come built-in with this behavior.

In order for an object to be iterable, it must implement the __iterable interface__. If you come from a language like Java or C, then you’re probably familiar with interfaces, but for those of you who aren’t, that basically means that in order for an object to be iterable it must contain a default iterator method. This method will define how the object should be iterated.

The __iterator method__, which is available via the constant `[Symbol.iterator]`, is a zero arguments function that returns an iterator object. An iterator object is an object that conforms to the iterator protocol.

__The Iterator Protocol:__

The __iterator protocol__ is used to define a standard way that an object produces a sequence of values. What that really means is you now have a process for defining how an object will iterate. This is done through implementing the `.next()` method.

An object becomes an iterator when it implements the `.next()` method. The `.next()` method is a zero arguments function that returns an object with two properties:

1. `value` : the data representing the next value in the sequence of values within the object
2. `done` : a boolean representing if the iterator is done going through the sequence of values
    - If done is true, then the iterator has reached the end of its sequence of values.
    - If done is false, then the iterator is able to produce another value in its sequence of values.

```javascript
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```
> _**Prints:**_
>
> _Object {value: 0, done: false}_
>
> _Object {value: 1, done: false}_
>
> _Object {value: 2, done: false}_

<h3>Sets</h3>

In ES6, there’s a new built-in object that behaves like a mathematical set and works similarly to an array. This new object is conveniently called a "Set". The biggest differences between a set and an array are:
- Sets are not indexed-based - you do not refer to items in a set based on their position in the set
- items in a Set can’t be accessed individually

Basically, a Set is an object that lets you store unique items. You can add items to a Set, remove items from a Set, and loop over a Set. These items can be either primitive values or objects.

There’s a couple of different ways to create a Set:

```javascript
// This creates an empty Set games with no items.
const games = new Set();
console.log(games); // Set {}

// If you want to create a Set from a list of values, you use an array:
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games); // Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
```

Notice the example above automatically removes the duplicate entry `"Super Mario Bros."` when the Set is created.

__Modifying Sets:__

After you’ve created a Set, you’ll probably want to add and delete items from the Set. So how do you that? You use the appropriately named, `.add()` and `.delete()` methods:

```javascript
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games);
```
> _**Prints:** Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}_

On the other hand, if you want to delete all the items from a Set, you can use the `.clear()` method.

```javascript
games.clear()
console.log(games);
```
> _Set {}_

`.add()` returns the `Set` if an item is successfully added. On the other hand, `.delete()` returns a Boolean (`true` or `false`) depending on successful deletion.

__Checking The Length:__

Use the `.size` property to return the number of items in a Set:

```javascript
const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size);
```
> _**Prints:** 12_

Remember, Sets can’t be accessed by their index like an array, so you use the `.size` property instead of `.length` property to get the size of the Set.

__Checking If An Item Exists:__

Use the `.has()` method to check if an item exists in a Set. If the item is in the Set, then `.has()` will return `true`. If the item doesn’t exist in the Set, then `.has()` will return `false`.

```javascript
console.log(months.has('September'));
```
> _**Prints:** true_

__Retrieving All Values:__

Finally, use the `.values()` method to return the values in a Set. The return value of the `.values()` method is a `SetIterator` object.

```javascript
console.log(months.values());
```
> _**Prints:** SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}_

The `.keys()` method will behave the exact same way as the `.values()` method by returning the values of a Set within a new Iterator Object. The `.keys()` method is an alias for the `.values()` method for similarity with maps.

__Sets & Iterators:__

If you remember back to our discussion on the new _iterable_ and _iterator_ protocols in ES6, then you’ll recall that Sets are built-in iterables. This means two things in terms of looping:

1. You can use the Set's default iterator to step through each item in a Set, one by one.
2. You can use the new `for...of` loop to loop through each item in a Set.

Because the `.values()` method returns a new iterator object (called `SetIterator`), you can store that iterator object in a variable and loop through each item in the Set using `.next()`.

```javascript
const iterator = months.values();
iterator.next();
iterator.next();
```
> _**Prints:**_
>
> _Object {value: 'January', done: false}_
>
> _Object {value: 'February', done: false}_

And so on until `done` equals `true` which marks the end of the Set. An easier method to loop through the items in a Set is the `for...of` loop.

```javascript
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) console.log(value); // "oranges", "apples", "bananas"

// the same with forEach: Returns "oranges", "apples", "bananas"
set.forEach((value, valueAgain, set) => {
    console.log(value);
});
```

Note the funny thing. The callback function passed in `forEach` has 3 arguments: a value, then the same `value` `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That’s for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

<h3>WeakSets</h3>

A WeakSet is just like a normal Set with a few key differences:
1. a WeakSet can only contain objects
2. a WeakSet is not iterable which means it can’t be looped over
3. a WeakSet does not have a `.clear()` method

You can create a WeakSet just like you would a normal Set, except that you use the `WeakSet` constructor.

```javascript
let student1 = { name: 'James', age: 26, gender: 'male' };
let student2 = { name: 'Julia', age: 27, gender: 'female' };
let student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
```
> _**Prints:** WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}}_

…but if you try to add something other than an object, you’ll get an error!

```javascript
roster.add('Amanda');
```
> _**Returns:** Uncaught TypeError: Invalid value used in weak set(…)_

This is expected behavior because WeakSets can only contain objects. But why should it only contain objects? Why would you even use a WeakSet if normal Sets can contain objects and other types of data? Well, the answer to that question has more to do with why WeakSets do not have a `.clear()` method...

<h3>Quiz: Working With WeakSets</h3>

__Directions:__ Create the following variables:

- `uniqueFlavors` and give it the value of an empty `WeakSet` object
- `flavor1`, and set it to the object `{ flavor: 'chocolate' }`
- `flavor2`, and set it to an object with a property of `flavor` and a value of your choice

Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`.
Use the `.add()` method to add the `flavor1` object to the `uniqueFlavors` set, again.

```javascript
/*
Programming Quiz: Using Sets

Create the following variables:
    - uniqueFlavors and set it to a new WeakSet object
    - flavor1 and set it equal to `{ flavor: 'chocolate' }`
    - flavor2 and set it equal to an object with property 'flavor' and value of your choice!

Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`
Use the `.add()` method to add the `flavor1` object (again!) to the `uniqueFlavors` set
*/
```

<h3>Maps</h3>

If Sets are similar to Arrays, then Maps are similar to Objects because Maps store key-value pairs similar to how objects contain named properties with values.

Essentially, a Map is an object that lets you store key-value pairs where both the keys and the values can be objects, primitive values, or a combination of the two.

To create a Map, simply type:

```javascript
const employees = new Map();
```

This creates an empty Map employee with no key-value pairs.

Unlike Sets, you can’t create Maps from a list of values; instead, you add key-values by using the Map's `.set()` method.

```javascript
const employees = new Map();

employees.set('james.cameron@film.com', {
    firstName: 'James',
    lastName: 'Cameron',
    role: 'Content Developer'
});
employees.set('joe@russo.com', {
    firstName: 'Joe',
    lastName: 'Russo',
    role: 'Content Developer'
});
employees.set('anthony@russo.com', {
    firstName: 'Anthony',
    lastName: 'Russo',
    role: 'Content Developer'
});

console.log(employees);
```
> _**Prints:** {"james.cameron@film.com" => {…}, "joe@russo.com" => {…}, "anthony@russo.com" => {…}}_

The `.set()` method takes two arguments. The first argument is the key, which is used to reference the second argument, the value.

To remove key-value pairs, simply use the `.delete()` method.

```javascript
employees.delete('joe@russo.com');
employees.delete('anthony@russo.com');
console.log(employees);
```
> _**Prints:** {"james.cameron@film.com" => {…}}_

Again, similar to Sets, you can use the `.clear()` method to remove all key-value pairs from the Map.

If you `.set()` a key-value pair to a Map that already uses the same key, you won’t receive an error, but the key-value pair will overwrite what currently exists in the Map. Also, if you try to `.delete()` a key-value that is not in a Map, you won’t receive an error, and the Map will remain unchanged.

The `.delete()` method returns `true` if a key-value pair is successfully deleted from the `Map` object, and `false` if unsuccessful. The return value of `.set()` is the `Map` object itself if successful.

After you’ve built your Map, you can use the `.has()` method to check if a key-value pair exists in your Map by passing it a key. And you can also retrieve values from a Map, by passing a key to the `.get()` method.

<h3>Looping Through Maps</h3>

You’ve created a Map, added some key-value pairs, and now you want to loop through your Map. Thankfully, you’ve got three different options to choose from:

1. Step through each key or value using the Map’s default iterator
2. Loop through each key-value pair using the new `for...of` loop
3. Loop through each key-value pair using the Map’s `.forEach()` method

```javascript
const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);
```

__1. Using the MapIterator__

Using both the `.keys()` and `.values()` methods on a Map will return a new iterator object called `MapIterator`. You can store that iterator object in a new variable and use `.next()` to loop through each key or value. Depending on which method you use, will determine if your iterator has access to the Map’s keys or the Map’s values.

```javascript
let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
```
> _**Returns:** Object {value: 'Evelyn', done: false}_

On the flipside, use the `.values()` method to access the Map’s values, and then repeat the same process.

```javascript
let iteratorObjForValues = members.values();
iteratorObjForValues.next();
```
> _**Returns:** Object {value: 75.68, done: false}_

__2. Using a for...of Loop__

```javascript
for (const member of members) {
    console.log(member);
}
```

However, when you use a `for...of` loop with a Map, you don’t exactly get back a key or a value. Instead, the key-value pair is split up into an array where the first element is the key and the second element is the value.

__3. Using a forEach Loop__

Your last option for looping through a Map is with the `.forEach()` method.

```javascript
members.forEach((key, value) => console.log(key, value));
```

Notice how with the help of an arrow function, the `forEach` loop reads fairly straightforward. For each `value` and `key` in `members`, log the `value` and `key` to the console.

<h3>WeakMaps</h3>

If you’ve gone through the WeakSets section, then this section should be somewhat of a review. WeakMaps exhibit the same behavior as a WeakSets, except WeakMaps work with key-values pairs instead of individual items.

A WeakMap is just like a normal Map with a few key differences:

1. a WeakMap can only contain objects as keys,
2. a WeakMap is not iterable which means it can’t be looped and
3. a WeakMap does not have a `.clear()` method.

You can create a WeakMap just like you would a normal Map, except that you use the `WeakMap` constructor.

```javascript
const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver’s Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);
```
> _**Prints:** WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true, Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}_

But if you try to add something other than an object as a key, you’ll get an error!

__Garbage Collection:__

In JavaScript, memory is allocated when new values are created and is "automatically" freed up when those values are no longer needed. This process of freeing up memory after it is no longer needed is what is known as _garbage collection_.

WeakMaps take advantage of this by exclusively working with objects as keys. If you set an object to `null`, then you’re essentially deleting the object. And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.

What makes this so useful is you don’t have to worry about deleting keys that are referencing deleted objects in your WeakMaps, JavaScript does it for you! When an object is deleted, the object key will also be deleted from the WeakMap when garbage collection runs. This makes WeakMaps useful in situations where you want an efficient, lightweight solution for creating groupings of objects with metadata.

Now where do we need such data structure?

- The main area of application for `WeakMap` is an _additional data storage_. If we're working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then `WeakMap` is exactly what's needed. We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

- Another common example is caching: when a function result should be remembered (“cached”), so that future calls on the same object reuse it.
