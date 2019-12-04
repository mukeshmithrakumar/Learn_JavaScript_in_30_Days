<h1>Regular expressions</h1>

Regular expressions is a powerful way of doing search and replace in strings. In JavaScript regular expressions are implemented using objects of a built-in `RegExp` class and integrated with strings.


<h2>Patterns and flags</h2>

A regular expression (also “regexp”, or just “reg”) consists of a _pattern_ and optional _flags_. There are two syntaxes to create a regular expression object.

The long syntax:

```javascript
regexp = new RegExp("pattern", "flags");
```

And the short one, using slashes `"/"`:

```javascript
regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
```

Slashes `"/"` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

<h3>Usage</h3>

To search inside a string, we can use method _search_. Here’s an example:

```javascript
let str = "I love JavaScript!"; // will search here

let regexp = /love/;
console.log(str.search(regexp));
```
> _**Prints:** 2_

The `str.search` method looks for the pattern `/love/` and returns the position inside the string. As we might guess, `/love/` is the simplest possible pattern. What it does is a simple substring search.

The code above is the same as:

```javascript
let str = "I love JavaScript!"; // will search here

let substr = 'love';
console.log(str.search(substr));
```
> _**Prints:** 2_

So searching for `/love/` is the same as searching for `"love"`. But that’s only for now. Soon we’ll create more complex regular expressions with much more searching power.

__When to use `new RegExp?`__

Normally we use the short syntax `/.../`. But it does not support variable insertions `${...}`. On the other hand, `new RegExp` allows to construct a pattern dynamically from a string, so it’s more flexible.

Here’s an example of a dynamically generated regexp:

```javascript
let tag = prompt("Which tag you want to search?", "h2");
let regexp = new RegExp(`<${tag}>`);

// finds <h2> by default
console.log("<h1> <h2> <h3>".search(regexp));
```

<h3>Flags</h3>

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:
- `i`: With this flag the search is case-insensitive: no difference between `A` and `a`.
- `g`: With this flag the search looks for all matches, without it – only the first one.
- `m`: Multiline mode.
- `s`: “Dotall” mode, allows `.` to match newlines.
- `u`: Enables full unicode support. The flag enables correct processing of surrogate pairs.
- `y`: Sticky mode.


<h2>Methods of RegExp and String</h2>

There are two sets of methods to deal with regular expressions.
1. First, regular expressions are objects of the built-in RegExp class, it provides many methods.
2. Besides that, there are methods in regular strings can work with regexps.

<h3>Recipes</h3>

Which method to use depends on what we’d like to do. Methods become much easier to understand if we separate them by their use in real-life tasks. So, here are general recipes, the details to follow:

__To search for all matches:__

Use regexp `g` flag and:
- Get a flat array of matches – `str.match(reg)`
- Get an array or matches with details – `str.matchAll(reg)`.

__To search for the first match only:__

- Get the full first match – `str.match(reg)` (without `g` flag).
- Get the string position of the first match – `str.search(reg)`.
- Check if there’s a match – `regexp.test(str)`.
- Find the match from the given position – `regexp.exec(str)` (set `regexp.lastIndex` to position).

__To replace all matches:__

- Replace with another string or a function result – `str.replace(reg, str|func)`

__To split the string by a separator:__

- `str.split(str|reg)`


<h2>Character classes</h2>

Consider a practical task – we have a phone number `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79035419441`. To do so, we can find and remove anything that’s not a number. Character classes can help with that. A character class is a special notation that matches any symbol from a certain set.

For the start, let’s explore a “digit” class. It’s written as `\d`. We put it in the pattern, that means “any single digit”. For instance, the let’s find the first digit in the phone number:

```javascript
let str = "+7(903)-123-45-67";
let reg = /\d/;

console.log(str.match(reg)); // 7
```

Without the flag `g`, the regular expression only looks for the first match, that is the first digit `\d`. There are other character classes as well.

Most used are:
- `\d` (“d” is from “digit”): A digit: a character from `0` to `9`.
- `\s` (“s” is from “space”): A space symbol: that includes spaces, tabs, newlines.
- `\w` (“w” is from “word”): A “wordly” character: either a letter of English alphabet or a digit or an underscore. Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.

For instance, `\d\s\w` means a “digit” followed by a “space character” followed by a “wordly character”, like `"1 a"`.

<h3>Word boundary: \b</h3>

A word boundary `\b` – is a special character class. It does not denote a character, but rather a boundary between characters. For instance, `\bJava\b` matches `Java` in the string `Hello, Java!`, but not in the script `Hello, JavaScript!`.

```javascript
console.log("Hello, Java!".match(/\bJava\b/)); // Java
console.log("Hello, JavaScript!".match(/\bJava\b/)); // null
```

The boundary has “zero width” in a sense that usually a character class means a character in the result (like a wordly character or a digit), but not in this case. The boundary is a test.

When regular expression engine is doing the search, it’s moving along the string in an attempt to find the match. At each string position it tries to find the pattern.

When the pattern contains `\b`, it tests that the position in string is a word boundary, that is one of three variants:
- Immediately before is `\w`, and immediately after – not `\w`, or vise versa.
- At string start, and the first string character is `\w`.
- At string end, and the last string character is `\w`.

Usually we use `\b` to find standalone English words. So that if we want `"Java"` language then `\bJava\b` finds exactly a standalone word and ignores it when it’s a part of another word, e.g. it won’t match `Java` in `JavaScript`.

Another example: a regexp `\b\d\d\b` looks for standalone two-digit numbers. In other words, it requires that before and after `\d\d` must be a symbol different from `\w` (or beginning/end of the string).

<h3>Inverse classes</h3>

For every character class there exists an “inverse class”, denoted with the same letter, but uppercased. The “reverse” means that it matches all other characters, for instance:

- `\D`: Non-digit: any character except `\d`, for instance a letter.
- `\S`: Non-space: any character except `\s`, for instance a letter.
- `\W`: Non-wordly character: anything but `\w`.
- `\B`: Non-boundary: a test reverse to `\b`.

In the beginning of the section we saw how to get all digits from the phone `+7(903)-123-45-67`. One way was to match all digits and join them:

```javascript
let str = "+7(903)-123-45-67";
console.log(str.match(/\d/g).join(''));
```
> _**Returns:** 79031234567_

An alternative, shorter way is to find non-digits `\D` and remove them from the string:

```javascript
let str = "+7(903)-123-45-67";
console.log(str.replace(/\D/g, ""));
```
> _**Returns:** 79031234567_

<h3>Spaces are regular characters</h3>

Usually we pay little attention to spaces. For us strings `1-5` and `1 - 5` are nearly identical. But if a regexp doesn’t take spaces into account, it may fail to work.

Let’s try to find digits separated by a dash:

```javascript
console.log("1 - 5".match(/\d-\d/)); // null, no match!
```

Here we fix it by adding spaces into the regexp \d - \d:

```javascript
console.log("1 - 5".match(/\d - \d/)); // 1 - 5, now it works
```

_A space is a character. Equal in importance with any other character._ Of course, spaces in a regexp are needed only if we look for them. Extra spaces (just like any other extra characters) may prevent a match:

```javascript
console.log("1-5".match(/\d - \d/)); // null, because the string 1-5 has no spaces
```

In other words, in a regular expression all characters matter, spaces too.

<h3>A dot is any character</h3>

The dot `"."` is a special character class that matches “any character except a newline”. For instance:

```javascript
console.log("Z".match(/./)); // Z
```

Or in the middle of a regexp:

```javascript
let reg = /CS.4/;

console.log("CSS4".match(reg)); // CSS4
console.log("CS-4".match(reg)); // CS-4
console.log("CS 4".match(reg)); // CS 4 (space is also a character)
```

Please note that the dot means “any character”, but not the “absence of a character”. There must be a character to match it:

```javascript
console.log("CS4".match(/CS.4/)); // null, no match because there's no character for the dot
```

__The dotall “s” flag:__

Usually a dot doesn’t match a newline character.

For instance, `A.B` matches `A`, and then `B` with any character between them, except a newline.

This doesn’t match:

```javascript
console.log("A\nB".match(/A.B/)); // null (no match)

// a space character would match, or a letter, but not \n
```

Sometimes it’s inconvenient, we really want “any character”, newline included.

That’s what `s` flag does. If a regexp has it, then the dot `"."` match literally any character:

```javascript
console.log("A\nB".match(/A.B/s)); // A\nB (match!)
```


<h2>Escaping, special characters</h2>

As we’ve seen, a backslash `"\"` is used to denote character classes. So it’s a special character in regexps (just like in a regular string). There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches. Here’s a full list of them: `[ \ ^ $ . | ? * + ( )`.

<h3>Escaping</h3>

Let’s say we want to find a dot literally. Not “any character”, but just a dot. To use a special character as a regular one, prepend it with a backslash: `\.`. That’s also called “escaping a character”.

For example:

```javascript
console.log("Chapter 5.1".match(/\d\.\d/)); // 5.1 (match!)
console.log("Chapter 511".match(/\d\.\d/)); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `\(`. The example below looks for a string `"g()"`:

```javascript
console.log("function g()".match(/g\(\)/)); // "g()"
```

If we’re looking for a backslash `\`, it’s a special character in both regular strings and regexps, so we should double it.

```javascript
console.log("1\\2".match(/\\/)); // '\'
```

<h3>A slash</h3>

A slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `/...pattern.../`, so we should escape it too.

Here’s what a search for a slash `'/'` looks like:

```javascript
console.log("/".match(/\//)); // '/'
```

On the other hand, if we’re not using `/.../`, but create a regexp using `new RegExp`, then we don’t need to escape it:

```javascript
console.log("/".match(new RegExp("/"))); // '/'
```

<h3>new RegExp</h3>

If we are creating a regular expression with `new RegExp`, then we don’t have to escape `/`, but need to do some other escaping.

For instance, consider this:

```javascript
let reg = new RegExp("\d\.\d");
console.log("Chapter 5.1".match(reg)); // null
```

The search worked with `/\d\.\d/`, but with `new RegExp("\d\.\d")` it doesn’t work, why? The reason is that backslashes are “consumed” by a string. Remember, regular strings have their own special characters like `\n`, and a backslash is used for escaping. Please, take a look, what “\d.\d” really is:

```javascript
console.log("\d\.\d"); // d.d
```

The quotes “consume” backslashes and interpret them, for instance:
- `\n` – becomes a newline character,
- `\u1234` – becomes the Unicode character with such code,
- And when there’s no special meaning: like `\d` or `\z`, then the backslash is simply removed.

So the call to new RegExp gets a string without backslashes. That’s why the search doesn’t work! To fix it, we need to double backslashes, because quotes turn `\\` into `\`:

```javascript
let regStr = "\\d\\.\\d";
console.log(regStr); // \d\.\d (correct now)

let reg = new RegExp(regStr);
console.log("Chapter 5.1".match(reg)); // 5.1
```


<h2>Sets and ranges [...]</h2>

Several characters or character classes inside square brackets `[…]` mean to “search for any character among given”.

<h3>Sets</h3>

For instance, `[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`. That’s called a _set_. Sets can be used in a regexp along with regular characters:

```javascript
// find [t or m], and then "op"
console.log("Mop top".match(/[tm]op/gi));
```
> _**Prints:** ["Mop", "top"]_

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match. So the example below gives no matches:

```javascript
// find "V", then [o or i], then "la"
console.log("Voila".match(/V[oi]la/));
```
> _**Returns:** null_

The pattern assumes:
- `V`,
- then one of the letters `[oi]`,
- then `la`.

So there would be a match for `Vola` or `Vila`.

<h3>Ranges</h3>

Square brackets may also contain _character ranges_. For instance, `[a-z]` is a character in range from `a` to `z`, and `[0-5]` is a digit from `0` to `5`.

In the example below we’re searching for `"x"` followed by two digits or letters from `A` to `F`:

```javascript
console.log("Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g));
```
> _**Prints:** ["xAF"]_

Please note that in the word `Exception` there’s a substring `xce`. It didn’t match the pattern, because the letters are lowercase, while in the set `[0-9A-F]` they are uppercase.

If we want to find it too, then we can add a range `a-f`: `[0-9A-Fa-f]`. The `i` flag would allow lowercase too.

_Character classes are shorthands for certain character sets_. For instance:
- __\d__ – is the same as `[0-9]`,
- __\w__ – is the same as `[a-zA-Z0-9_]`,
- __\s__ – is the same as `[\t\n\v\f\r ]` plus few other unicode space characters.

We can use character classes inside `[…]` as well.

For instance, we want to match all wordly characters or a dash, for words like “twenty-third”. We can’t do it with `\w+`, because `\w` class does not include a dash. But we can use `[\w-]`.

We also can use several classes, for example `[\s\S]` matches spaces or non-spaces – any character. That’s wider than a dot `"."`, because the dot matches any character except a newline (unless `s` flag is set).

<h3>Excluding ranges</h3>

Besides normal ranges, there are “excluding” ranges that look like `[^…]`. They are denoted by a caret character `^` at the start and match any character _except the given ones_.

For instance:
- `[^aeyo]` – any character except `'a'`, `'e'`, `'y'` or `'o'`.
- `[^0-9]` – any character except a digit, the same as `\D`.
- `[^\s]` – any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:

```javascript
console.log("alice15@gmail.com".match(/[^\d\sA-Z]/gi));
```
_**Prints:** ["@", "."]_

<h3>No escaping in […]</h3>

Usually when we want to find exactly the dot character, we need to escape it like `\..` And if we need a backslash, then we use `\\`.

In square brackets the vast majority of special characters can be used without escaping:
- A dot `'.'`.
- A plus `'+'`.
- Parentheses `'( )'`.
- Dash `'-'` in the beginning or the end (where it does not define a range).
- A caret `'^'` if not in the beginning (where it means exclusion).
- And the opening square bracket `'['`.

In other words, all special characters are allowed except where they mean something for square brackets. A dot `"."` inside square brackets means just a dot. The pattern `[.,]` would look for one of characters: either a dot or a comma.


<h2>Quantifiers +, *, ? and {n}</h2>

Let’s say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`. A number is a sequence of 1 or more digits `\d`. To mark how many we need, we need to append a _quantifier_.


<h3>Quantity {n}</h3>

The simplest quantifier is a number in curly braces: `{n}`. A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need. It has a few advanced forms, let’s see examples:

__The exact count: `{5}`__

`\d{5}` denotes exactly 5 digits, the same as `\d\d\d\d\d`. The example below looks for a 5-digit number:

```javascript
console.log("I'm 12345 years old".match(/\d{5}/));
```
_**Prints:** "12345"_

We can add `\b` to exclude longer numbers: `\b\d{5}\b`.

__The range: `{3,5}`, match 3-5 times__

To find numbers from 3 to 5 digits we can put the limits into curly braces: `\d{3,5}`

```javascript
console.log("I'm not 12, but 1234 years old".match(/\d{3,5}/));
```
_**Prints:** "1234"_

We can omit the upper limit. Then a regexp `\d{3,}` looks for sequences of digits of length `3` or more:

```javascript
console.log("I'm not 12, but 345678 years old".match(/\d{3,}/));
```
_**Prints:** "345678"_

Let’s return to the string `+7(903)-123-45-67`. A number is a sequence of one or more digits in a row. So the regexp is `\d{1,}`:

```javascript
let str = "+7(903)-123-45-67";
let numbers = str.match(/\d{1,}/g);

console.log(numbers);
```
_**Prints:** ["7", "903", "123", "45", "67"]_

<h3>Shorthands</h3>

There are shorthands for most used quantifiers:

- `+`. Means “one or more”, the same as `{1,}`. For instance, `\d+` looks for numbers:

```javascript
let str = "+7(903)-123-45-67";
console.log(str.match(/\d+/g));
```
> _**Prints:** ["7", "903", "123", "45", "67"]_

- `?`. Means “zero or one”, the same as `{0,1}`. In other words, it makes the symbol optional. For instance, the pattern `ou?r` looks for `o` followed by zero or one `u`, and then `r`. So, `colou?r` finds both `color` and `colour`:

```javascript
let str = "Should I write color or colour?";
console.log(str.match(/colou?r/g));
```
> _**Prints:** ["color", "colour"]_

- `*`. Means “zero or more”, the same as `{0,}`. That is, the character may repeat any times or be absent. For example, `\d0*` looks for a digit followed by any number of zeroes:

```javascript
console.log("100 10 1".match(/\d0*/g));
```
> _**Prints:** ["100", "10", "1"]_


<h2>Capturing groups</h2>

A part of a pattern can be enclosed in parentheses `(...)`. This is called a “capturing group”.

That has two effects:
1. It allows to place a part of the match into a separate array.
2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole, not the last character.

__Example:__

In the example below the pattern `(go)+` finds one or more `'go'`:

```javascript
console.log('Gogogo now!'.match(/(go)+/i)); // "Gogogo"
```

Without parentheses, the pattern `/go+/` means `g`, followed by `o` repeated one or more times. For instance, `goooo` or `gooooooooo`. Parentheses group the word `(go)` together. Let’s make something more complex – a regexp to match an email.

Examples of emails:

```
my@mail.com
john.smith@site.com.uk
```

The pattern: `[-.\w]+@([\w-]+\.)+[\w-]{2,20}`.

1. The first part `[-.\w]+` (before `@`) may include any alphanumeric word characters, a dot and a dash, to match `john.smith`.
2. Then `@`, and the domain. It may be a subdomain like `host.site.com.uk`, so we match it as "a word followed by a dot `([\w-]+\.)` (repeated), and then the last part must be a word: `com` or `uk` (but not very long: 2-20 characters).

That regexp is not perfect, but good enough to fix errors or occasional mistypes. For instance, we can find all emails in the string:

```javascript
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/g;

console.log("my@mail.com @ his@site.com.uk".match(reg));
```
> _**Prints:** ["my@mail.com", "his@site.com.uk"]_

In this example parentheses were used to make a group for repeating `(...)+`. But there are other uses too, let’s see them.

<h3>Contents of parentheses</h3>

Parentheses are numbered from left to right. The search engine remembers the content matched by each of them and allows to reference it in the pattern or in the replacement string. For instance, we’d like to find HTML tags `<.*?>`, and process them. Let’s wrap the inner content into parentheses, like this: `<(.*?)>`.

We’ll get both the tag as a whole and its content as an array:

```javascript
let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;

console.log(str.match(reg)); // Array: ["<h1>", "h1"]
```

The call to String#match returns groups only if the regexp only looks for the first match, that is: has no `/.../g` flag.

If we need all matches with their groups then we can use `.matchAll` or `regexp.exec` as described in Methods of RegExp and String:

```javascript
let str = '<h1>Hello, world!</h1>';

// two matches: opening <h1> and closing </h1> tags
let reg = /<(.*?)>/g;

let matches = Array.from(str.matchAll(reg));

console.log(matches[0]); //  Array: ["<h1>", "h1"]
console.log(matches[1]); //  Array: ["</h1>", "/h1"]
```

Here we have two matches for `<(.*?)>`, each of them is an array with the full match and groups.

<h3>Nested groups</h3>

Parentheses can be nested. In this case the numbering also goes from left to right.

For instance, when searching a tag in `<span class="my">` we may be interested in:
- The tag content as a whole: `span class="my"`.
- The tag name: `span`.
- The tag attributes: `class="my"`.

Let’s add parentheses for them:

```javascript
let str = '<span class="my">';
let reg = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(reg);
console.log(result); // <span class="my">, span class="my", span, class="my"
```

At the zero index of the `result` is always the full match. Then groups, numbered from left to right. Whichever opens first gives the first group `result[1]`. Here it encloses the whole tag content. Then in `result[2]` goes the group from the second opening `(` till the corresponding `)` – tag name, then we don’t group spaces, but group attributes for `result[3]`. If a group is optional and doesn’t exist in the match, the corresponding result index is present (and equals undefined).

For instance, let’s consider the regexp `a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

And here’s a more complex match for the string `ack`:

```javascript
let match = 'ack'.match(/a(z)?(c)?/)

console.log(match.length); // 3
console.log(match[0]); // ac (whole match)
console.log(match[1]); // undefined, because there's nothing for (z)?
console.log(match[2]); // c
```

The array length is permanent: `3`. But there’s nothing for the group `(z)?`, so the result is `["ac", undefined, "c"]`.

<h3>Named groups</h3>

Remembering groups by their numbers is hard. For simple patterns it’s doable, but for more complex ones we can give names to parentheses. That’s done by putting `?<name>` immediately after the opening paren, like this:

```javascript
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

console.log(groups.year); // 2019
console.log(groups.month); // 04
console.log(groups.day); // 30
```

As you can see, the groups reside in the `.groups` property of the match. We can also use them in the replacement string, as `$<name>` (like `$1..9`, but a name instead of a digit).

<h3>Non-capturing groups with ?:</h3>

Sometimes we need parentheses to correctly apply a quantifier, but we don’t want the contents in results. A group may be excluded by adding `?:` in the beginning. For instance, if we want to find `(go)+`, but don’t want to remember the contents `(go)` in a separate array item, we can write: `(?:go)+`.

In the example below we only get the name “Mukesh” as a separate member of the results array:

```javascript
let str = "Gogo Mukesh!";
// exclude Gogo from capturing
let reg = /(?:go)+ (\w+)/i;

let result = str.match(reg);

console.log(result.length); // 2
console.log(result[1]); // Mukesh
```
