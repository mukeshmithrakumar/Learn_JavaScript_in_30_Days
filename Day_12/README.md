<h1>Error handling</h1>


<h2>Error handling, "try..catch"</h2>

No matter how great we are at programming, sometimes our scripts have errors. They may occur because of our mistakes, an unexpected user input, an erroneous server response and for a thousand of other reasons. Usually, a script “dies” (immediately stops) in case of an error, printing it to console. But there’s a syntax construct `try..catch` that allows to “catch” errors and, instead of dying, do something more reasonable.

<h3>The “try…catch” syntax</h3>

The `try..catch` construct has two main blocks: `try`, and then `catch`:

```javascript
try {
    // code...

} catch (err) {
    // error handling
}
```

It works like this:
1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch(err)` is ignored: the execution reaches the end of `try` and goes on skipping `catch`.
3. If an error occurs, then `try` execution is stopped, and the control flows to the beginning of `catch(err)`. The `err` variable (can use any name for it) contains an error object with details about what’s happened.

So, an error inside the `try {…}` block does not kill the script: we have a chance to handle it in `catch`. For example:

```javascript
try {
    console.log('Start of try runs');  // (1) <--

    lalala; // error, variable is not defined!

    console.log('End of try (never reached)');  // (2)

} catch(err) {

    console.log(`Error has occurred!`); // (3) <--

}
```

__`try..catch` only works for runtime errors:__

For `try..catch` to work, the code must be runnable. In other words, it should be valid JavaScript. It won’t work if the code is syntactically wrong.

The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phrase are called “parse-time” errors and are unrecoverable (from inside that code). That’s because the engine can’t understand the code. So, `try..catch` can only handle errors that occur in the valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.

__`try..catch` works synchronously:__

If an exception happens in “scheduled” code, like in `setTimeout`, then `try..catch` won’t catch it:

```javascript
try {
    setTimeout(function() {
        noSuchVariable; // script will die here
    }, 1000);
} catch (e) {
    console.log("won't work");
}
```

That’s because the function itself is executed later, when the engine has already left the `try..catch` construct.

To catch an exception inside a scheduled function, `try..catch` must be inside that function:

```javascript
setTimeout(function() {
    try {
        noSuchVariable; // try..catch handles the error!
    } catch {
        console.log("error is caught here!");
    }
}, 1000);
```

<h3>Error object</h3>

When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to `catch`:

```javascript
try {
    // ...
} catch(err) { // <-- the "error object", could use another word instead of err
    // ...
}
```

For all built-in errors, the error object has two main properties:
- `name`: Error name. For instance, for an undefined variable that’s `"ReferenceError"`.
- `message`: Textual message about error details.

There are other non-standard properties available in most environments. One of most widely used and supported is:

- `stack`: Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes.

For instance:

```javascript
try {
    lalala; // error, variable is not defined!
} catch(err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // lalala is not defined
    console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)

    // Can also show an error as a whole
    // The error is converted to string as "name: message"
    console.log(err); // ReferenceError: lalala is not defined
}
```

<h3>“Throw” operator</h3>

The `throw` operator generates an error. The syntax is:

```javascript
throw <error object>
```

Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it’s better to use objects, preferably with `name` and `message` properties (to stay somewhat compatible with built-in errors).

JavaScript has many built-in constructors for standard errors: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` and others. We can use them to create error objects as well. Their syntax is:

```javascript
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

For built-in errors (not for any objects, just for errors), the `name` property is exactly the name of the constructor. And `message` is taken from the argument.

Let's see an example:

```javascript
let json = '{ "age": 26 }'; // incomplete data

try {
    let user = JSON.parse(json); // <-- no errors
    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name"); // (*)
    }
    console.log(user.name);

} catch(e) {
    console.log("JSON Error: " + e.message); // JSON Error: Incomplete data: no name
}
```

In the line `(*)`, the `throw` operator generates a `SyntaxError` with the given `message`, the same way as JavaScript would generate it itself. The execution of `try` immediately stops and the control flow jumps into catch. Now `catch` became a single place for all error handling: both for `JSON.parse` and other cases.

<h3>Rethrowing</h3>

In the example above we use `try..catch` to handle incorrect data. But is it possible that another unexpected error occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just that “incorrect data” thing. Of course, everything’s possible! Programmers do make mistakes. Even in open-source utilities used by millions for decades – suddenly a bug may be discovered that leads to terrible hacks.

In our case, `try..catch` is meant to catch “incorrect data” errors. But by its nature, `catch` gets _all_ errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That’s wrong and also makes the code more difficult to debug.

Fortunately, we can find out which error we get, for instance from its `name`:

```javascript
try {
    user = { /*...*/ };
} catch(e) {
    console.log(e.name); // "ReferenceError" for accessing an undefined variable
}
```

The rule is simple: _Catch should only process errors that it knows and “rethrow” all others._

The “rethrowing” technique can be explained in more detail as:
1. Catch gets all errors.
2. In `catch(err) {...}` block we analyze the error object `err`.
3. If we don’t know how to handle it, then we do `throw err`.

In the code below, we use rethrowing so that catch only handles SyntaxError:

```javascript
let json = '{ "age": 26 }'; // incomplete data
try {
    let user = JSON.parse(json);

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name");
    }

    blabla(); // unexpected error
    console.log( user.name );

} catch(e) {

    if (e.name == "SyntaxError") {
        console.log( "JSON Error: " + e.message );
    } else {
        throw e; // rethrow (*)
    }
}
```

The error throwing on line `(*)` from inside `catch` block “falls out” of `try..catch` and can be either caught by an outer `try..catch` construct (if it exists), or it kills the script. So the `catch` block actually handles only errors that it knows how to deal with and “skips” all others.

<h3>try…catch…finally</h3>

Wait, that’s not all. The `try..catch` construct may have one more code clause: `finally`.

If it exists, it runs in all cases:
- after `try`, if there were no errors,
- after `catch`, if there were errors.

The extended syntax looks like this:

```javascript
try {
    // ... try to execute the code ...
} catch(e) {
    // ... handle errors ...
} finally {
    // ... execute always ...
}
```

The `finally` clause is often used when we start doing something and want to finalize it in any case of outcome.

For instance, we want to measure the time that a Fibonacci numbers function `fib(n)` takes. Naturally, we can start measuring before it runs and finish afterwards. But what if there’s an error during the function call? In particular, the implementation of `fib(n)` in the code below returns an error for negative or non-integer numbers.

The `finally` clause is a great place to finish the measurements no matter what. Here `finally` guarantees that the time will be measured correctly in both situations – in case of a successful execution of `fib` and in case of an error in it:

```javascript
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
    if (n < 0 || Math.trunc(n) != n) {
        throw new Error("Must not be negative, and also an integer.");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
    result = fib(num);
} catch (e) {
    result = 0;
} finally {
    diff = Date.now() - start;
}

console.log(result || "error occurred");
console.log( `execution took ${diff}ms` );
```

You can check by running the code with entering `35` into `prompt` – it executes normally, `finally` after `try`. And then enter `-1` – there will be an immediate error, an the execution will take `0ms`. Both measurements are done correctly.

In other words, the function may finish with `return` or `throw`, that doesn’t matter. The `finally` clause executes in both cases.

__Variables are local inside `try..catch..finally`__

Please note that `result` and `diff` variables in the code above are declared _before_ `try..catch`. Otherwise, if we declared `let` in `try` block, it would only be visible inside of it.

<h3>Global catch</h3>

Let’s imagine we’ve got a fatal error outside of `try..catch`, and the script died. Like a programming error or something else terrible.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don’t see error messages) etc.

There is none in the specification, but environments usually provide it, because it’s really useful. For instance, Node.js has `process.on("uncaughtException")` for that. And in the browser we can assign a function to special `window.onerror` property, that will run in case of an uncaught error.

The syntax:

```javascript
window.onerror = function(message, url, line, col, error) {
    // ...
};
```

- `message`: Error message.
- `url`: URL of the script where error happened.
- `line`, `col`: Line and column numbers where error happened.
- `error`: Error object.

For instance:

```html
<script>
    window.onerror = function(message, url, line, col, error) {
        alert(`${message}\n At ${line}:${col} of ${url}`);
    };

    function readData() {
        badFunc(); // Whoops, something went wrong!
    }

    readData();
</script>
```

The role of the global handler `window.onerror` is usually not to recover the script execution – that’s probably impossible in case of programming errors, but to send the error message to developers.

There are also web-services that provide error-logging for such cases, like https://errorception.com or http://www.muscula.com.

They work like this:
1. We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
2. That JS script sets a custom `window.onerror` function.
3. When an error occurs, it sends a network request about it to the service.
4. We can log in to the service web interface and see errors.


<h2>Custom errors, extending Error</h2>

When we develop something, we often need our own error classes to reflect specific things that may go wrong in our tasks. For errors in network operations we may need `HttpError`, for database operations `DbError`, for searching operations `NotFoundError` and so on.

Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have statusCode property with a value like `404` or `403` or `500`.

JavaScript allows to use `throw` with any argument, so technically our custom error classes don’t need to inherit from `Error`. But if we inherit, then it becomes possible to use `obj instanceof Error` to identify error objects. So it’s better to inherit from it.

As the application grows, our own errors naturally form a hierarchy, for instance `HttpTimeoutError` may inherit from `HttpError`, and so on.

<h3>Extending Error</h3>

As an example, let’s consider a function `readUser(json)` that should read JSON with user data. Here’s an example of how a valid `json` may look:

```javascript
let json = `{ "name": "Mukesh", "age": 26 }`;
```

Internally, we’ll use `JSON.parse`. If it receives malformed `json`, then it throws `SyntaxError`. But even if json is syntactically correct, that doesn’t mean that it’s a valid user, right? It may miss the necessary data. For instance, it may not have `name` and `age` properties that are essential for our users.

Our function `readUser(json)` will not only read JSON, but check (“validate”) the data. If there are no required fields, or the format is wrong, then that’s an error. And that’s not a `SyntaxError`, because the data is syntactically correct, but another kind of error. We’ll call it `ValidationError` and create a class for it. An error of that kind should also carry the information about the offending field. Our `ValidationError` class should inherit from the built-in `Error` class.

<h3>Further inheritance</h3>

The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age`). Let’s make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that’s missing.

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

// Usage
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new PropertyRequiredError("age");
    }
    if (!user.name) {
        throw new PropertyRequiredError("name");
    }

    return user;
}

// Working example with try..catch

try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        console.log("Invalid data: " + err.message); // Invalid data: No property: name
        console.log(err.name); // PropertyRequiredError
        console.log(err.property); // name
    } else if (err instanceof SyntaxError) {
        console.log("JSON Syntax Error: " + err.message);
    } else {
        throw err; // unknown error, rethrow it
    }
}
```

The new class `PropertyRequiredError` is easy to use: we only need to pass the property name: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious – to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own “basic error” class that assigns `this.name = this.constructor.name`. And then inherit all ours custom errors from it.

Let’s call it `MyError`. Here’s the code with `MyError` and other custom error classes, simplified:

```javascript
class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Now custom errors are much shorter, especially `ValidationError`, as we got rid of the `"this.name = ..."` line in the constructor.

<h3>Wrapping exceptions</h3>

The purpose of the function `readUser` in the code above is “to read the user data”. There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if` in the `catch` block, that check the class and handle known errors and rethrow the unknown ones. But if `readUser` function generates several kinds of errors – then we should ask ourselves: do we really want to check for all error types one-by-one in every code that calls `readUser`?

Often the answer is “No”: the outer code wants to be “one level above all that”. It wants to have some kind of “data reading error”. Why exactly it happened – is often irrelevant (the error message describes it). Or, even better if there is a way to get error details, but only if we need to.

So let’s make a new class `ReadError` to represent such errors. If an error occurs inside `readUser`, we’ll catch it there and generate `ReadError`. We’ll also keep the reference to the original error in its cause property. Then the outer code will only have to check for `ReadError`.

Here’s the code that defines `ReadError` and demonstrates its use in `readUser` and `try..catch`:

```javascript
class ReadError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = 'ReadError';
    }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
    if (!user.age) {
        throw new PropertyRequiredError("age");
    }

    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
}

function readUser(json) {
    let user;

    try {
        user = JSON.parse(json);
    } catch (err) {
        if (err instanceof SyntaxError) {
            throw new ReadError("Syntax Error", err);
        } else {
            throw err;
        }
    }

    try {
        validateUser(user);
    } catch (err) {
        if (err instanceof ValidationError) {
            throw new ReadError("validation Error", err);
        } else {
            throw err;
        }
    }
}

try {
    readUser(`{bad json}`);
} catch (e) {
    if (e instanceof ReadError) {
        console.log(e);
        // Original error: SyntaxError: Unexpected token b in JSON at position 1
        console.log("Original error: " + e.cause)
    } else {
        throw e;
    }
}
```

In the code above, `readUser` works exactly as described – catches syntax and validation errors and throws `ReadError` errors instead (unknown errors are rethrown as usual). So the outer code checks `instanceof ReadError` and that’s it. No need to list possible all error types.

The approach is called “wrapping exceptions”, because we take “low level exceptions” and “wrap” them into `ReadError` that is more abstract and more convenient to use for the calling code. It is widely used in object-oriented programming.
