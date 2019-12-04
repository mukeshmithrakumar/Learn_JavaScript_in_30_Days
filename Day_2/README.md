<h1>Intro to JavaScript</h1>


<h2>Date and time</h2>

__Date__ stores the date, time and provides methods for date/time management. For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.

To create a new Date object call new Date() with one of the following arguments:

- `new Date()`: Without arguments – create a `Date` object for the current date and time:

```javascript
let now = new Date();
console.log(now); // shows current date/time
```

- `new Date(milliseconds)`: Create a `Date` object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.

```javascript
// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log(Jan01_1970);

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);
```

An integer number representing the number of milliseconds that has passed since the beginning of 1970 is called a timestamp.

It’s a lightweight numeric representation of a date. We can always create a date from a timestamp using `new Date(timestamp)` and convert the existing `Date` object to a timestamp using the `date.getTime()` method.

- `new Date(datestring)`: If there is a single argument, and it’s a string, then it is parsed automatically. The algorithm is the same as `Date.parse` uses, we’ll cover it later.

```javascript
let date = new Date("2017-01-26");
console.log(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
```

- `new Date(year, month, date, hours, minutes, seconds, ms)`: Create the date with the given components in the local time zone. Only the first two arguments are obligatory.
	- The `year` must have 4 digits: 2013 is okay, 98 is not.
	- The `month` count starts with 0 (Jan), up to 11 (Dec).
	- The `date` parameter is actually the day of month, if absent then 1 is assumed.
	- If `hours/minutes/seconds/ms` is absent, they are assumed to be equal 0.
For instance:

```javascript
new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default
```

<h3>Access date components</h3>

There are methods to access the year, month and so on from the `Date` object:
- `getFullYear()`: Get the year (4 digits)
- `getMonth()`: Get the month, from 0 to 11.
- `getDate()`: Get the day of month, from 1 to 31, the name of the method does look a little bit strange.
- `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`: Get the corresponding time components.
- `getDay()`: Get the day of week, from 0 (Sunday) to 6 (Saturday). The first day is always Sunday, in some countries that’s not so, but can’t be changed.

_All the methods above return the components relative to the local time zone_. There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()`. Just insert the "UTC" right after "get".

Besides the given methods, there are two special ones that do not have a UTC-variant:
- `getTime()`: Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.
- `getTimezoneOffset()`: Returns the difference between the local time zone and UTC, in minutes.

<h3>Setting date components</h3>

The following methods allow to set date/time components:
- `setFullYear(year, [month], [date])`
- `setMonth(month, [date])`
- `setDate(date)`
- `setHours(hour, [min], [sec], [ms])`
- `setMinutes(min, [sec], [ms])`
- `setSeconds(sec, [ms])`
- `setMilliseconds(ms)`
- `setTime(milliseconds)` (sets the whole date by milliseconds since 01.01.1970 UTC)

Every one of them except `setTime()` has a UTC-variant, for instance: `setUTCHours()`.

__Date.now():__

If we only want to measure time, we don’t need the Date object. There’s a special method Date.now() that returns the current timestamp. It is semantically equivalent to new Date().getTime(), but it doesn’t create an intermediate Date object. So it’s faster and doesn’t put pressure on garbage collection. It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

```javascript
let start = Date.now(); // milliseconds count from 1 Jan 1970

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = Date.now(); // done

console.log(`The loop took ${end - start} ms`); // subtract numbers, not dates
```

__Date.parse from a string__

The method `Date.parse(str)` can read a date from a string. The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:
- `YYYY-MM-DD` – is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` – is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` that would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

```javascript
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms); // (timestamp)
```
> _**Prints:** 1327611110417_

<h3>JSON methods, toJSON</h3>

Let’s say we have a complex object, and we’d like to convert it into a string, to send it over a network, or just to output it for logging purposes. Naturally, such a string should include all important properties. We could implement the conversion like this:

```javascript
let user = {
	name: "Mukesh",
	age: 26,

	toString() {
		return `{name: "${this.name}", age: ${this.age}}`;
	}
};

console.log(user);
```
> _**Prints:** {name: "Mukesh", age: 26, toString: ƒ}_

But in the process of development, new properties are added, old properties are renamed and removed. Updating such `toString` every time can become a pain. We could try to loop over properties in it, but what if the object is complex and has nested objects in properties? We’d need to implement their conversion as well. Luckily, there’s no need to write the code to handle all this. The task has been solved already.

<h3>JSON.stringify</h3>

The JSON (JavaScript Object Notation) is a general format to represent values and objects. Initially it was made for JavaScript, but many other languages have libraries to handle it as well. So it’s easy to use JSON for data exchange when the client uses JavaScript and the server is written on Ruby/PHP/Java/Whatever.

JavaScript provides methods:
- `JSON.stringify` to convert objects into JSON.
- `JSON.parse` to convert JSON back into an object.

For instance, here we `JSON.stringify` a student:

```javascript
let student = {
	name: 'Mukesh',
	age: 26,
	isAdmin: true,
	courses: ['html', 'css', 'js'],
	wife: null
};

let json = JSON.stringify(student);
console.log(typeof json); // we've got a string!
console.log(json);
```
> _**Prints:** {"name":"Mukesh","age":26,"isAdmin":true,"courses":["html","css","js"],"wife":null}_

The method `JSON.stringify(student)` takes the object and converts it into a string. The resulting `json` string is called a _JSON-encoded or serialized or stringified or marshalled_ object. We are ready to send it over the wire or put into a plain data store.

Please note that a JSON-encoded object has several important differences from the object literal:
- Strings use double quotes. No single quotes or backticks in JSON. So 'Mukesh' becomes "Mukesh".
- Object property names are double-quoted also. That’s obligatory. So age:26 becomes "age":26.
`JSON.stringify` can be applied to primitives as well.

JSON supports following data types:
- Objects { ... }
- Arrays [ ... ]
- Primitives:
	- strings,
	- numbers,
	- boolean values true/false,
	- null.

JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by `JSON.stringify`.

Namely:
- Function properties (methods).
- Symbolic properties.
- Properties that store `undefined`.

```javascript
let user = {
	sayHi() { // ignored
    	alert("Hello");
	},
	[Symbol("id")]: 123, // ignored
	something: undefined // ignored
};
console.log(JSON.stringify(user));
```
> _**Returns:** {}_

Usually that’s fine. If that’s not what we want, then soon we’ll see how to customize the process. The great thing is that nested objects are supported and converted automatically. The important limitation: there must be no circular references.

__Excluding and transforming: replacer__

The full syntax of `JSON.stringify` is:

```javascript
let json = JSON.stringify(value[, replacer, space])
```
_value_: A value to encode.

_replacer_: Array of properties to encode or a mapping function function(key, value).

_space_: Amount of space to use for formatting

Most of the time, `JSON.stringify` is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of `JSON.stringify`. If we pass an array of properties to it, only these properties will be encoded. For instance:

```javascript
let room = {
	number: 23
};

let meetup = {
	title: "Conference",
	participants: [{name: "Sam"}, {name: "Dean"}],
	place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup
console.log(JSON.stringify(meetup, ['title', 'participants']));
```
> _**Prints:** {"title":"Conference","participants":[{},{}]}_

Here we are probably too strict. The property list is applied to the whole object structure. So the objects in `participants` are empty, because `name` is not in the list.

Let’s include in the list every property except `room.occupiedBy` that would cause the circular reference:

```javascript
let room = {
	number: 23
};

let meetup = {
	title: "Conference",
	participants: [{name: "Sam"}, {name: "Dean"}],
	place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup
console.log(JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']));
```
> _**Prints:** {"title":"Conference","participants":[{"name":"Sam"},{"name":"Dean"}],"place":{"number":23}}_

Now everything except `occupiedBy` is serialized. But the list of properties is quite long. Fortunately, we can use a function instead of an array as the `replacer`.

The function will be called for every `(key, value)` pair and should return the “replaced” value, which will be used instead of the original one. Or `undefined` if the value is to be skipped.

In our case, we can return `value` “as is” for everything except `occupiedBy`. To ignore `occupiedBy`, the code below returns `undefined`:

```javascript
let room = {
	number: 23
};

let meetup = {
	title: "Conference",
	participants: [{name: "Sam"}, {name: "Dean"}],
	place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log(JSON.stringify(meetup, function replacer(key, value) {
	console.log(`${key}: ${value}`);
	return (key == 'occupiedBy') ? undefined : value;
}));
```
> key:value pairs that come to replacer:
>
> :             [object Object]
>
> title:        Conference
>
> participants: [object Object],[object Object]
>
> 0:            [object Object]
>
> name:         Sam
>
> 1:            [object Object]
>
> name:         Dean
>
> place:        [object Object]
>
> number:       23

Please note that `replacer` function gets every key/value pair including nested objects and array items. It is applied recursively. The value of `this` inside `replacer` is the object that contains the current property.

The first call is special. It is made using a special “wrapper object”: `{"": meetup}`. In other words, the first `(key, value)` pair has an empty key, and the value is the target object as a whole. That’s why the first line is `":[object Object]"` in the example above.

The idea is to provide as much power for `replacer` as possible: it has a chance to analyze and replace/skip even the whole object if necessary.

__Formatting: spacer__

The third argument of `JSON.stringify(value, replacer, spaces)` is the number of spaces to use for pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That’s fine if we want to send an object over a network. The `spacer` argument is used exclusively for a nice output.

__Custom “toJSON”__

Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available. For instance:

```javascript
let room = {
	number: 23
};

let meetup = {
	title: "Conference",
	date: new Date(Date.UTC(2017, 0, 1)),
	room
};

console.log(JSON.stringify(meetup));
```
> _**Prints:** {"title":"Conference","date":"2017-01-01T00:00:00.000Z","room":{"number":23}}_

Here we can see that `date` became a string. That’s because all dates have a built-in `toJSON` method which returns such kind of string. Now let’s add a custom `toJSON` for our object `room`:

```javascript
let room = {
	number: 23,
	toJSON() {
    	return this.number;
	}
};

let meetup = {
	title: "Conference",
	room
};

console.log(JSON.stringify(room)); // 23
console.log(JSON.stringify(meetup));
```
> _**Prints:** {"title":"Conference","room":23}_

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested is another encoded object.

__JSON.parse__

To decode a JSON-string, we need another method named `JSON.parse`.

```javascript
let value = JSON.parse(str, [reviver]);
```

_str_: JSON-string to parse.

_reviver_: Optional function(key,value) that will be called for each `(key, value)` pair and can transform the value.

```javascript
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user = JSON.parse(user);

console.log(user.friends[1]);
```
> _**Prints:** 1_

__Using reviver__

Imagine, we got a stringified `meetup` object from the server. Let’s do it by calling `JSON.parse`:

```javascript
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str);

console.log(meetup.date.getDate()); // Error!
```

The value of `meetup.date` is a string, not a Date object. How could `JSON.parse` know that it should transform that string into a `Date`? Let’s pass to `JSON.parse` the reviving function as the second argument, that returns all values “as is”, but `date` will become a `Date`:

```javascript
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
	if (key == 'date') return new Date(value);
	return value;
});

console.log(meetup.date.getDate());
```
> _**Prints:** 30_


<h3>Type Conversions</h3>

Most of the time, operators and functions automatically convert the values given to them to the right type.

For example, `alert` automatically converts any value to a string to show it. Mathematical operations convert values to numbers.

There are also cases when we need to explicitly convert a value to the expected type.

__ToString:__

We can call the `String(value)` function to convert a value to a string:

```javascript
let value = 4;
console.log(typeof value); // number

value = String(value); // now value is a string "4"
console.log(typeof value); // string
```

__ToNumber:__

Numeric conversion happens in mathematical functions and expressions automatically. We can use the `Number(value)` function to explicitly convert a `value` to a number:

```javascript
let str = "123";
console.log(typeof str); // string

let num = Number(str); // becomes a number 123
console.log(typeof num); // number
```

Please note that `null` and `undefined` behave differently here: `null` becomes `zero` while `undefined` becomes `NaN`.

__ToBoolean:__

Boolean conversion is the simplest one.

The conversion rule:
- Values that are intuitively “empty”, like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.

<h3>Equality</h3>

So far, you’ve seen how you can use `==` and `!=` to compare numbers and strings for equality. However, if you use `==` and `!=` in situations where the data you’re comparing is mixed, it can lead to some interesting results. For example,

```javascript
"1" == 1
```
> _**Returns:** true_


```javascript
0 == false
```
> _**Returns:** true_

both evaluate to true. Why is that?

__Implicit type coercion:__ _JavaScript is known as a loosely typed language._ Basically, this means that when you’re writing JavaScript code, you do not need to specify data types. Instead, when your code is interpreted by the JavaScript engine it will automatically be converted into the "appropriate" data type. This is called implicit type coercion. For example,

```javascript
"mukesh" + 1
```
> _**Returns:** "mukesh1"_


In this example, JavaScript takes the string `"mukesh"` and adds the number 1 to it resulting in the string `"mukesh1"`. In other programming languages, this code probably would have returned an error, but in JavaScript the number `1` is converted into the string `"1"` and then is concatenated to the string `"mukesh"`.

What value do you think the result of `"Hello" % 10` will be?
> _**Answer:** NaN_

This happens because to perform the modulus operation, both `"Hello"` and `10` are coerced into the Number data type. When `"Hello"` is converted into a number, the result is `NaN` (Not a Number).

A **strongly typed language** is a programming language that is more likely to generate errors if data does not closely match an expected type. Because JavaScript is loosely typed, you don’t need to specify data types; however, this can lead to errors that are hard to diagnose due to implicit type coercion. For example,

In C language:

```c
int count = 1;
string name = "mukesh";
double num = 1.2932;
float price = 2.99;
```

In JavaScript:

```javascript
let count = 1;
let name = "mukesh";
let num = 1.2932;
let price = 2.99;
```

In the example below, JavaScript takes the string `"1"`, converts it to `true`, and compares it to the boolean `true`.

```javascript
"1" == true
```
> _**Returns:** true_

When you use the `==` or `!=` operators, JavaScript first converts each value to the same type (if they’re not already the same type); this is why it's called "type coercion"! This is often not the behavior you want, and **it’s actually considered bad practice to use the `==` and `!=` operators when comparing values for equality.**

Instead, in JavaScript it’s better to use **strict equality** to see if numbers, strings, or booleans, etc. are identical in _type_ and _value_ without doing the type conversion first. To perform a strict comparison, simply add an additional equals sign `=` to the end of the `==` and `!=` operators.

```javascript
"1" === true
```
> _**Returns:** false_

```javascript
0 === false
```
> _**Returns:** false_

Try the following in the JavaScript console and see what you get:

- "3" > 1
- 3 != "3"
- true >= 0
- 1 !== false
- "false" === 0
- 3 === 3
> _**Answer:** true, false, true, true, false, true

One thing to take notice of in all the examples you've seen so far is the use of semicolons `;` at the end of each line. Semicolons make it clear where one statement ends and another begins. Not adding semicolons to the end of each line can cause bugs and errors in your programs. JavaScript does have ways to occasionally predict where semicolons should be, but just like how type coercion can result in some unexpected quirky behavior in JavaScript, it's good practice to not depend on it.

<h3>Quiz: Out to Dinner</h3>

__Directions:__ Create a variable called `bill` and assign it the result of `10.25 + 3.99 + 7.15` (don't perform the calculation yourself, let JavaScript do it!). Next, create a variable called tip and assign it the result of multiplying `bill` by a 15% tip rate. Finally, add the `bill` and `tip` together and store it into a variable called `total`.

Print the `total` to the JavaScript console.

__*Hint*__: 15% in decimal form is written as `0.15`

> __*TIP*__: To print out the `total` with a dollar sign ( $ ) use string concatenation. To round `total` up by two decimal points use the `toFixed()` method. To use `toFixed()` pass it the number of decimal points you want to use. For example, if `total` equals `3.9860`, then `total.toFixed(2)` would return `3.99`.

```javascript
// Your code goes here
```

<h3>Operators</h3>

__Terms: "unary", "binary", "operand":__

- An operand – is what operators are applied to. For instance, in the multiplication of 5 * 2 there are two operands: the left operand is 5 and the right operand is 2. Sometimes, people call these “arguments” instead of “operands”.

- An operator is unary if it has a single operand. For example, the unary negation - reverses the sign of a number:

```javascript
let x = 1;
x = -x;
console.log( x ); // -1, unary negation was applied
```

- An operator is binary if it has two operands. The same minus exists in binary form as well.

__Numeric conversion, unary +:__

The plus + exists in two forms: the binary form and the unary form. The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number. It actually does the same thing as `Number(...)`, but is shorter.
