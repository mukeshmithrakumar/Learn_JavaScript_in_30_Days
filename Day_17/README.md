<h1>Regular expressions</h1>


<h2>Backreferences in pattern: \n and \k</h2>

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

<h3>Backreference by number: \n</h3>

A group can be referenced in the pattern using `\n`, where `n` is the group number.

To make things clear let’s consider a task.

We need to find a quoted string: either a single-quoted `'...'` or a double-quoted `"..."` – both variants need to match.

How to look for them?

We can put both kinds of quotes in the square brackets: `['"](.*?)['"]`, but it would find strings with mixed quotes, like `"...'` and `'..."`. That would lead to incorrect matches when one quote appears inside other ones, like the string `"She's the one!"`:

```javascript
let str = `He said: "She's the one!".`;
let reg = /['"](.*?)['"]/g;

// The result is not what we expect
console.log(str.match(reg));
```
> _**Prints:** [""She'"]_

As we can see, the pattern found an opening quote `, then the text is consumed lazily till the other quote `, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and use the backreference.

Here’s the correct code:

```javascript
let str = `He said: "She's the one!".`;
let reg = /(['"])(.*?)\1/g;

console.log(str.match(reg));
```
> _**Prints:** [""She's the one!""]_

Now it works! The regular expression engine finds the first quote `(['"])` and remembers the content of `(...)`, that’s the first capturing group. Further in the pattern `\1` means “find the same text as in the first group”, exactly the same quote in our case.

Please note:
- To reference a group inside a replacement string – we use `$1`, while in the pattern – a backslash `\1`.
- If we use `?:` in the group, then we can’t reference it. Groups that are excluded from capturing `(?:...)` are not remembered by the engine.

<h3>Backreference by name: `\k<name>`</h3>

For named groups, we can backreference by `\k<name>`.

The same example with the named group:

```javascript
let str = `He said: "She's the one!".`;
let reg = /(?<quote>['"])(.*?)\k<quote>/g;

console.log(str.match(reg)); // "She's the one!"
```
> _**Prints:** [""She's the one!""]_


<h2>Alternation (OR) |</h2>

Alternation is the term in regular expression that is actually a simple “OR”. In a regular expression it is denoted with a vertical line character `|`. For instance, we need to find programming languages: HTML, PHP, Java or JavaScript. The corresponding regexp: `html|php|java(script)?`.

A usage example:

```javascript
let reg = /html|php|css|java(script)?/gi;
let str = "First HTML appeared, then CSS, then JavaScript";

console.log(str.match(reg));
```
> _**Returns:** ["HTML", "CSS", "JavaScript"]_

We already know a similar thing – square brackets. They allow to choose between multiple character, for instance `gr[ae]y` matches `gray` or `grey`. Square brackets allow only characters or character sets. Alternation allows any expressions. A regexp `A|B|C` means one of expressions `A`, `B` or `C`.

For instance:
- `gr(a|e)y` means exactly the same as` gr[ae]y`.
- `gra|ey` means `gra` or `ey`.

To separate a part of the pattern for alternation we usually enclose it in parentheses, like this: `before(XXX|YYY)after`.

<h3>Regexp for time</h3>

In previous chapters there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 seconds match the pattern).

How can we make a better one?

We can apply more careful matching. First, the hours:
- If the first digit is `0` or `1`, then the next digit can by anything.
- Or, if the first digit is `2`, then the next must be `[0-3]`.

As a regexp: `[01]\d|2[0-3]`. Next, the minutes must be from `0` to `59`. In the regexp language that means `[0-5]\d`: the first digit `0-5`, and then any digit. Let’s glue them together into the pattern: `[01]\d|2[0-3]:[0-5]\d`. We’re almost done, but there’s a problem. The alternation `|` now happens to be between `[01]\d` and `2[0-3]:[0-5]\d`. That’s wrong, as it should be applied only to hours `[01]\d OR 2[0-3]`. That’s a common mistake when starting to work with regular expressions.

The correct variant:

```javascript
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

console.log("00:00 10:10 23:59 25:99 1:2".match(reg));
```
> _**Prints:** ["00:00", "10:10", "23:59"]_


<h2>String start ^ and finish $</h2>

The caret `'^'` and dollar `'$'` characters have special meaning in a regexp. They are called “anchors”. The caret `^` matches at the beginning of the text, and the dollar `$` – in the end.

For instance, let’s test if the text starts with `Mary`:

```javascript
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

console.log(/^Mary/.test(str1)); // true
console.log(/^Mary/.test(str2)); // false
```

The pattern `^Mary` means: “the string start and then Mary”. Now let’s test whether the text ends with an email. To match an email, we can use a regexp `[-.\w]+@([\w-]+\.)+[\w-]{2,20}`. To test whether the string ends with the email, let’s add `$` to the pattern:

```javascript
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

let str1 = 'My email is mail@site.com';
let str2 = 'Everywhere Mary went, the lamp was sure to go';

console.log(reg.test(str1)); // true
console.log(reg.test(str2)); // false
```

We can use both anchors together to check whether the string exactly follows the pattern. That’s often used for validation. For instance we want to check that `str` is exactly a color in the form `#` plus 6 hex digits. The pattern for the color is `#[0-9a-f]{6}`.

To check that the whole string exactly matches it, we add `^...$`:

```javascript
let str = "#abcdef";

console.log(/^#[0-9a-f]{6}$/i.test(str));
```
> _**Returns: true_

The regexp engine looks for the text start, then the color, and then immediately the text end. Just what we need.


<h2>Multiline mode, flag "m"</h2>

The multiline mode is enabled by the flag `/.../m`. It only affects the behavior of `^` and `$`. In the multiline mode they match not only at the beginning and end of the string, but also at start/end of line.

<h3>Line start ^</h3>

In the example below the text has multiple lines. The pattern `/^\d+/gm` takes a number from the beginning of each one:

```javascript
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

console.log(str.match(/^\d+/gm));
```
> _**Prints:** ["1", "2", "33"]_

The regexp engine moves along the text and looks for a line start `^`, when finds – continues to match the rest of the pattern `\d+`. Without the flag `/.../m` only the first number is matched. That’s because by default a caret `^` only matches at the beginning of the text, and in the multiline mode – at the start of any line.

<h3>Line end $</h3>

The dollar sign `$` behaves similarly. The regular expression `\w+$` finds the last word in every line

```javascript
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

console.log(str.match(/\w+$/gim));
```
> _**Prints:** ["Winnie", "Piglet", "Eeyore"]_

Without the `/.../m` flag the dollar `$` would only match the end of the whole string, so only the very last word would be found.

<h3>Anchors ^$ versus \n</h3>

To find a newline, we can use not only `^` and `$`, but also the newline character `\n`. The first difference is that unlike anchors, the character `\n` “consumes” the newline character and adds it to the result.

For instance, here we use it instead of `$`:

```javascript
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

console.log(str.match(/\w+\n/gim)); // Winnie\n,Piglet\n
```

Here every match is a word plus a newline character. And one more difference – the newline `\n` does not match at the string end. That’s why `Eeyore` is not found in the example above. So, anchors are usually better, they are closer to what we want to get.


<h2>Lookahead and lookbehind</h2>

Sometimes we need to match a pattern only if followed by another pattern. For instance, we’d like to get the price from a string like `1 turkey costs 30€`. We need a number (let’s say a price has no decimal point) followed by `€` sign.

That’s what lookahead is for.

<h3>Lookahead</h3>

The syntax is: `x(?=y)`, it means "look for `x`, but match only if followed by `y`". For an integer amount followed by `€`, the regexp will be `\d+(?=€)`:

```javascript
let str = "1 turkey costs 30€";

console.log(str.match(/\d+(?=€)/)); // 30 (correctly skipped the sole number 1)
```

Let’s say we want a quantity instead, that is a number, NOT followed by `€`. Here a negative lookahead can be applied. The syntax is: `x(?!y)`, it means "search `x`, but only if not followed by `y`".

```javascript
let str = "2 turkeys cost 60€";

console.log(str.match(/\d+(?!€)/)); // 2 (correctly skipped the price)
```

<h3>Lookbehind</h3>

Lookahead allows to add a condition for “what goes after”. Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there’s something before.

The syntax is:
- Positive lookbehind: `(?<=y)x`, matches `x`, but only if it follows after `y`.
- Negative lookbehind: `(?<!y)x`, matches `x`, but only if there’s no `y` before.

For example, let’s change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we’ll use `(?<=\$)\d+` – an amount preceded by `$`:

```javascript
let str = "1 turkey costs $30";

console.log(str.match(/(?<=\$)\d+/)); // 30 (skipped the sole number)
```

And, to find the quantity – a number, not preceded by `$`, we can use a negative lookbehind `(?<!\$)\d+`:

```javascript
let str = "2 turkeys cost $60";

console.log(str.match(/(?<!\$)\d+/)); // 2 (skipped the price)
```

<h3>Capture groups</h3>

Generally, what’s inside the lookaround (a common name for both lookahead and lookbehind) parentheses does not become a part of the match.

E.g. in the pattern `\d+(?=€)`, the `€` sign doesn’t get captured as a part of the match. That’s natural: we look for a number `\d+`, while `(?=€)` is just a test that it should be followed by `€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That’s possible. Just wrap that into additional parentheses.

For instance, here the currency `(€|kr)` is captured, along with the amount:

```javascript
let str = "1 turkey costs 30€";
let reg = /\d+(?=(€|kr))/; // extra parentheses around €|kr

console.log(str.match(reg)); // 30, €
```

And here’s the same for lookbehind:

```javascript
let str = "1 turkey costs $30";
let reg = /(?<=(\$|£))\d+/;

console.log(str.match(reg)); // 30, $
```

Please note that for lookbehind the order stays be same, even though lookahead parentheses are before the main pattern.

Usually parentheses are numbered left-to-right, but lookbehind is an exception, it is always captured after the main pattern. So the match for `\d+` goes in the result first, and then for `(\$|£)`.


<h2>Infinite backtracking problem</h2>

The typical situation – a regular expression works fine sometimes, but for certain strings it “hangs” consuming 100% of CPU. In a web-browser it kills the page. Not a good thing for sure.

For server-side JavaScript it may become a vulnerability, and it uses regular expressions to process user data. Bad input will make the process hang, causing denial of service. The author personally saw and reported such vulnerabilities even for very well-known and widely used programs. So the problem is definitely worth to deal with.

For instance let’s consider searching tags in HTML. We want to find all tags, with or without attributes – like `<a href="..." class="doc" ...>`. We need the regexp to work reliably, because HTML comes from the internet and can be messy.

In particular, we need it to match tags like `<a test="<>" href="#">` – with `<` and `>` in attributes. That’s allowed by HTML standard. A simple regexp like `<[^>]+>` doesn’t work, because it stops at the first `>`, and we need to ignore `<>` if inside an attribute:

```javascript
// the match doesn't reach the end of the tag - wrong!
console.log('<a test="<>" href="#">'.match(/<[^>]+>/)); // <a test="<>
```

To correctly handle such situations we need a more complex regular expression. It will have the form `<tag (key=value)*>`.
- For the `tag` name: `\w+`,
- For the `key` name: `\w+`,
- And the `value`: a quoted string `"[^"]*"`.

If we substitute these into the pattern above and throw in some optional spaces `\s`, the full regexp becomes: `<\w+(\s*\w+="[^"]*"\s*)*>`.

That regexp is not perfect! It doesn’t support all the details of HTML syntax, such as unquoted values, and there are other ways to improve, but let’s not add complexity. It will demonstrate the problem for us.

The regexp seems to work:

```javascript
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;
let str='...<a test="<>" href="#">... <b>...';

console.log(str.match(reg));
```
_**Prints:** ["<a test="<>" href="#">", "<b>"]_

Great! It found both the long tag `<a test="<>" href="#">` and the short one `<b>`. Now, that we’ve got a seemingly working solution, let’s get to the infinite backtracking itself.

<h3>Infinite backtracking</h3>

If you run our regexp on the input below, it may hang the browser (or another JavaScript host):

```javascript
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;

let str = `<tag a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"
  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b" a="b"  a="b"  a="b"  a="b"`;

// The search will take a long, long time
console.log(str.match(reg));
```

Some regexp engines can handle that search, but most of them can’t. What’s the matter? Why a simple regular expression “hangs” on such a small string? Let’s simplify the regexp by stripping the tag name and the quotes. So that we look only for `key=value` attributes: `<(\s*\w+=\w+\s*)*>`.

Unfortunately, the regexp still hangs:

```javascript
// only search for space-delimited attributes
let reg = /<(\s*\w+=\w+\s*)*>/g;

let str = `<a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

// the search will take a long, long time
console.log(str.match(reg));
```

<h3>Lookahead to the rescue</h3>

We can forbid backtracking using lookahead. The pattern to take as much repetitions as possible without backtracking is: `(?=(a+))\1`.

In other words:
- The lookahead `?=` looks for the maximal count `a+` from the current position.
- And then they are “consumed into the result” by the backreference `\1` `(\1` corresponds to the content of the second parentheses, that is `a+`).

There will be no backtracking, because lookahead does not backtrack. If, for example, it found 5 instances of `a+` and the further match failed, it won’t go back to the 4th instance.

So this trick makes the problem disappear. Let’s fix the regexp for a tag with attributes from the beginning of the chapter `<\w+(\s*\w+=(\w+|"[^"]*")\s*)*>`. We’ll use lookahead to prevent backtracking of `name=value` pairs:

```javascript
// regexp to search name=value
let attrReg = /(\s*\w+=(\w+|"[^"]*")\s*)/

// use new RegExp to nicely insert its source into (?=(a+))\1
let fixedReg = new RegExp(`<\\w+(?=(${attrReg.source}*))\\1>`, 'g');

let goodInput = '...<a test="<>" href="#">... <b>...';

let badInput = `<tag a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

console.log(goodInput.match(fixedReg)); // <a test="<>" href="#">, <b>
console.log(badInput.match(fixedReg)); // null (no results, fast!)
```

Great, it works! We found both a long tag `<a test="<>" href="#">` and a small one `<b>`, and (!) didn’t hang the engine on the bad input.


<h2>Unicode: flag "u"</h2>

The unicode flag `/.../u` enables the correct support of surrogate pairs. Normally characters are encoded with 2 bytes. That gives us 65536 characters maximum. But there are more characters in the world. So certain rare characters are encoded with 4 bytes, like `𝒳` (mathematical X) or `😄` (a smile).

So characters like `a` and `≈` occupy 2 bytes, and those rare ones take 4. The unicode is made in such a way that the 4-byte characters only have a meaning as a whole. In the past JavaScript did not know about that, and many string methods still have problems. For instance, `length` thinks that here are two characters:

```javascript
console.log('😄'.length); // 2
console.log('𝒳'.length); // 2
```

But we can see that there’s only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That’s incorrect, because they must be considered only together (so-called “surrogate pair”). Normally, regular expressions also treat “long characters” as two 2-byte ones.

<h3>The “u” flag</h3>

The `/.../u` flag fixes that. It enables surrogate pairs in the regexp engine, so the result is correct:

```javascript
console.log('𝒳'.match(/[𝒳𝒴]/u)); // 𝒳
```

Normally, regexps understand `[a-z]` as a "range of characters with codes between codes of `a` and `z`. But without u flag, surrogate pairs are assumed to be a “pair of independent characters”, so `[𝒳-𝒴]` is like `[<55349><56499>-<55349><56500>]` (replaced each surrogate pair with code points). Now we can clearly see that the range `56499-55349` is unacceptable, as the left range border must be less than the right one.

Using the `u` flag makes it work right:

```javascript
console.log('𝒴'.match(/[𝒳-𝒵]/u)); // 𝒴
```


<h2>Unicode character properties \p</h2>

Unicode, the encoding format used by JavaScript strings, has a lot of properties for different characters (or, technically, code points). They describe which “categories” character belongs to, and a variety of technical details.

In regular expressions these can be set by `\p{…}`. And there must be flag `'u'`.

For instance, `\p{Letter}` denotes a letter in any of language. We can also use `\p{L}`, as `L` is an alias of `Letter`, there are shorter aliases for almost every property.

Here’s the main tree of properties:
- Letter `L`:
    - lowercase `Ll`, modifier `Lm`, titlecase `Lt`, uppercase `Lu`, other `Lo`
- Number `N`:
    - decimal digit `Nd`, letter number `Nl`, other `No`
- Punctuation `P`:
    - connector `Pc`, dash `Pd`, initial quote `Pi`, final quote `Pf`, open `Ps`, close `Pe`, other `Po`
- Mark `M` (accents etc):
    - spacing combining `Mc`, enclosing `Me`, non-spacing `Mn`
- Symbol `S`:
    - currency `Sc`, modifier `Sk`, math `Sm`, other `So`
- Separator `Z`:
    - line `Zl`, paragraph `Zp`, space `Zs`
- Other `C`:
    - control `Cc`, format `Cf`, not assigned `Cn`, private use `Co`, surrogate `Cs`

There are also other derived categories, like:
- `Alphabetic (Alpha)`, includes Letters `L`, plus letter numbers `Nl` (e.g. roman numbers Ⅻ), plus some other symbols `Other_Alphabetic (OAltpa)`.
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- Unicode is a big beast, it includes a lot of properties.

<h3>Building multi-language \w</h3>

The pattern `\w` means “wordly characters”, but doesn’t work for languages that use non-Latin alphabets, such as Cyrillic and others. It’s just a shorthand for `[a-zA-Z0-9_]`, so `\w+` won’t find any Chinese words etc.

Let’s make a “universal” regexp, that looks for wordly characters in any language. That’s easy to do using Unicode properties:

```javascript
/[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]/u
```

Let’s decipher. Just as `\w` is the same as `[a-zA-Z0-9_]`, we’re making a set of our own, that includes:
- `Alphabetic` for letters,
- `Mark` for accents, as in Unicode accents may be represented by separate code points,
- `Decimal_Number` for numbers,
- `Connector_Punctuation` for the `'_'` character and alike,
- `Join_Control` -– two special code points with hex codes `200c` and `200d`, used in ligatures e.g. in arabic.

Or, if we replace long names with aliases (a list of aliases [here](https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt)):

```javascript
let regexp = /([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)/gu;
let str = `Hello Привет 你好 123_456`;

console.log(str.match(regexp));
```
> _**Prints:** ["Hello", "Привет", "你好", "123_456"]_


<h2>Sticky flag "y", searching at position</h2>

To grasp the use case of `y` flag, and see how great it is, let’s explore a practical use case. One of common tasks for regexps is “parsing”: when we get a text and analyze it for logical components, build a structure.

For instance, there are HTML parsers for browser pages, that turn text into a structured document. There are parsers for programming languages, like JavaScript, etc.

Writing parsers is a special area, with its own tools and algorithms, so we don’t go deep in there, but there’s a very common question in them, and, generally, for text analysis: “What kind of entity is at the given position?”.

For instance, for a programming language variants can be like:
- Is it a “name” `\w+`?
- Or is it a number `\d+`?
- Or an operator `[+-/*]`?
- (a syntax error if it’s not anything in the expected list)

So, we should try to match a couple of regular expressions, and make a decision what’s at the given position.

In JavaScript, how can we perform a search starting from a given position? Regular calls start searching from the text start.

We’d like to avoid creating substrings, as this slows down the execution considerably.

One option is to use `regexp.exec` with `regexp.lastIndex` property, but that’s not what we need, as this would search the text starting from `lastIndex`, while we only need to text the match exactly at the given position.

Here’s a (failing) attempt to use `lastIndex`:

```javascript
let str = "(text before) function ...";

// attempting to find function at position 5:
let regexp = /function/g; // must use "g" flag, otherwise lastIndex is ignored
regexp.lastIndex = 5

console.log(regexp.exec(str));
```
> _**Returns:** function_

The match is found, because `regexp.exec` starts to search from the given position and goes on by the text, successfully matching “function” later.

We could work around that by checking if "`regexp.exec(str).index` property is `5`, and if not, ignore the match. But the main problem here is performance. The regexp engine does a lot of unnecessary work by scanning at further positions. The delays are clearly noticeable if the text is long, because there are many such searches in a parser.

<h3>The “y” flag</h3>

So we’ve came to the problem: how to search for a match exactly at the given position. That’s what `y` flag does. It makes the regexp search only at the `lastIndex` position.

Here’s an example:

```javascript
let str = "(text before) function ...";

let regexp = /function/y;
regexp.lastIndex = 5;
console.log(regexp.exec(str)); // null (no match, unlike "g" flag!)

regexp.lastIndex = 14;
console.log(regexp.exec(str)); // function (match!)
```

As we can see, now the regexp is only matched at the given position. So what `y` does is truly unique, and very important for writing parsers. The `y` flag allows to test a regular expression exactly at the given position and when we understand what’s there, we can move on – step by step examining the text. Without the flag the regexp engine always searches till the end of the text, that takes time, especially if the text is large. So our parser would be very slow. The `y` flag is exactly the right thing here.
