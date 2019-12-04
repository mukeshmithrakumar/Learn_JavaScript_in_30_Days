<h1>Modules</h1>


<h2>Modules, introduction</h2>

As our application grows bigger, we want to split it into multiple files, so called “modules”. A module usually contains a class or a library of functions.

For a long time, JavaScript existed without a language-level module syntax. That wasn’t a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

<h3>What is a module?</h3>

A module is just a file. One script is one module.

Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one:

- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows to import functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:

```javascript
// 📁 sayHi.js
export function sayHi(user) {
    console.log(`Hello, ${user}!`);
}
```

Then another file may import and use it:

```javascript
// 📁 main.js
import {sayHi} from "./sayHi.js";

console.log(sayHi); // function
sayHi("Mukesh"); // Hello, Mukesh!
```

The `import` directive loads the module by path `./sayHi.js` relative the current file and assigns exported function `sayHi` to the corresponding variable.

Let’s see an example in-browser. As modules support special keywords and features, we must tell the browser that a script should be treated as module, by using the attribute `<script type="module">`. For example:

```html
<!doctype html>
<script type='module'>
    import {sayHi} from 'sayHi.js';
    document.body.innerHTML = sayHi("Mukesh");
</script>
```

The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

<h3>Core module features</h3>

What’s different in modules, compared to “regular” scripts? There are core features, valid both for browser and server-side JavaScript.

__Module-level scope:__

Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.

In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`, and fails:

```javascript
// 📁 user.js
let user = "Mukesh";

// 📁 hello.js
console.log(user); // no such variable (each module has independent variables)
```

```html
<!-- index.html -->
<!doctype html>

<script type='module' src='user.js'></script>
<script type='module' src='hello.js'></script>
```

Modules are expected to `export` what they want to be accessible from outside and `import` what they need. So we should import `user.js` into `hello.js` and get the required functionality from it instead of relying on global variables. Below is the correct version:

```javascript
// 📁 user.js
export let user = "Mukesh";

// 📁 hello.js
import {user} from 'user.js';
document.body.innerHTML = user; // Mukesh
```

```html
<!-- index.html -->
<!doctype html>
<script type='module' src='hello.js'></script>
```

In the browser, independent top-level scope also exists for each `<script type="module">`:

```html
<script type='module'>
    // The variable is only visible in this module script
    let user = 'Mukesh';
</script>

<script type='module'>
    console.log(user); // Error: user is not defined
</script>
```

If we really need to make a window-level global variable, we can explicitly assign it to `window` and access as `window.user`. But that’s an exception requiring a good reason.

__A module code is evaluated only the first time when imported__

If the same module is imported into multiple other places, its code is executed only the first time, then exports are given to all importers.

That has important consequences. Let’s see that on examples.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once – the first time:

```javascript
// 📁 alert.js
alert("Module is evaluated!");
```

```javascript
// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)
```

In practice, top-level module code is mostly used for initialization, creation of internal data structures, and if we want something to be reusable – export it.

Now, a more advanced example. Let’s say, a module exports an object:

```javascript
// 📁 admin.js
export let admin = {
    name: "Mukesh";
};
```

If this module is imported from multiple files, the module is only evaluated the first time, `admin` object is created, and then passed to all further importers.

All importers get exactly the one and only `admin` object:

```javascript
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Barry";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Barry

// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
```

So, let’s reiterate – the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other modules will see that.

Such behavior allows to _configure_ modules on first import. We can setup its properties once, and then in further imports it’s ready.

__Async works on inline scripts:__

For non-module scripts, `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on any scripts. For example, the script below has `async`, so it doesn’t wait for anyone. It performs the import (fetches `./analytics.js`) and runs when ready, even if HTML document is not finished yet, or if other scripts are still pending.

That’s good for functionality that doesn’t depend on anything, like counters, ads, document-level event listeners.

```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
    import {counter} from './analytics.js';
    counter.count();
</script>
```

<h2>Export and Import</h2>

<h3>Export before declarations</h3>

We can label any declaration as exported by placing `export` before it, be it a variable, function or a class. For instance, here all exports are valid:

```javascript
// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
    constructor(name) {
        this.name = name;
    }
}
```

__No semicolons after export class/function__

Please note that `export` before a class or a function does not make it a function expression. It’s still a function declaration, albeit exported. Most JavaScript style guides recommend semicolons after statements, but not after function and class declarations. That’s why there should be no semicolons at the end of `export class` and `export function`.

<h3>Export apart from declarations</h3>

Also, we can put `export` separately. Here we first declare, and then export:

```javascript
function sayHi(user){
    console.log(`Hello, ${user}!`);
}

function sayBye(user) {
    console.log(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
```

Or, technically we could put `export` above functions as well.

<h3>Import *</h3>

Usually, we put a list of what to import into `import {...}`, like this:

```javascript
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('Mukesh'); // Hello, Mukesh!
sayBye('Mukesh'); // Bye, Mukesh!
```

But if the list is long, we can import everything as an object using `import * as <obj>`, for instance:

```javascript
// 📁 main.js
import * as say from './say.js';

say.sayHi('Mukesh');
say.sayBye('Mukesh');
```

<h3>export default</h3>

So far, we’ve seen how to import/export multiple things, optionally “as” other names. In practice, modules contain either:
- A library, pack of functions
- Or an entity, like `class` where the whole module has only this class.

Mostly, the second approach is preferred, so that every “thing” resides in its own module. Naturally, that requires a lot of files, as everything wants its own module, but that’s not a problem at all. Actually, code navigation becomes easier, if files are well-named and structured into folders.

Modules provide special `export default` syntax to make “one thing per module” way look better.

It requires following `export` and `import` statements:
1. Put `export default` before the “main export” of the module.
2. Call `import` without curly braces.

For instance, here `user.js` exports class `User`:

```javascript
// 📁 user.js
export default class User { // just add "default"
    constructor(name) {
        this.name = name;
    }
}
```

And `main.js` imports it:

```javascript
// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('Mukesh');
```

Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named imports and doesn’t need them for the default one.

Another thing to note is that named exports must (naturally) have a name, while `export default` may be anonymous. Not giving a name is fine, because `export default` is only one per file. Contrary to that, omitting a name for named imports would be an error.

Usually, there’s a rule that imported variables should correspond to file names, e.g:

```javascript
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
```


<h2>Dynamic imports</h2>

Export and import statements that we went through so far are called “static”. That’s because they are indeed static. The syntax is very strict. First, we can’t dynamically generate any parameters of `import`.

The module path must be a primitive string, can’t be a function call. This won’t work:

```javascript
import ... from getModuleName(); // Error, only from "string" is allowed
```

Second, we can’t import conditionally or at run-time:

```javascript
if(...) {
    import ...; // Error, not allowed!
}

{
    import ...; // Error, we can't put import in any block
}
```

That’s because `import`/`export` aim to provide a backbone for the code structure. That’s a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed (“tree-shaken”). That’s possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

<h3>The import() function</h3>

The `import(module)` function can be called from anywhere. It returns a promise that resolves into a module object. We will look into promises later in the course.

The usage pattern looks like this:

```javascript
let modulePath = prompt("Module path?");

import (modulePath)
    .then(obj => <module object>)
    .catch(err => <loading error, no such module?>)
```

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following `say.js`:

```javascript
// 📁 say.js
export function hi() {
    console.log(`Hello`);
}

export function bye() {
    console.log(`Bye`);
}
```

Then dynamic import can be like this:

```javascript
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```javascript
// 📁 say.js
export default function() {
    console.log("Module loaded (export default)!");
}
```

Then, in order to access it, we can use default property of the module object, so, the dynamic import will be like this:

```javascript
let {default: say} = await import('./say.js'); // save .default property in say variable

say();
```


<h1>Miscellaneous</h1>


<h2>Proxy</h2>

To create a proxy object, we use the Proxy constructor - `new Proxy()`;. The proxy constructor takes two items:
- the object that it will be the proxy for
- an object containing the list of methods it will handle for the proxied object

The second object is called the __handler__.

The simplest way to create a proxy is to provide an object and then an empty handler object.

```javascript
var crowley = {status: 'looking for work'};
var agent = new Proxy(crowley, {});
agent.status;
```
> _**Returns:** "looking for work"_

The above doesn't actually do anything special with the proxy - it just passes the request directly to the source object! If we want the proxy object to actually intercept the request, that's what the handler object is for!

The key to making Proxies useful is the handler object that's passed as the second object to the Proxy constructor. The handler object is made up of a method that will be used for property access. Let's look at the `get` which is used to _"intercept"_ calls to properties:

```javascript
const crowley = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `crowley` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
const agent = new Proxy(crowley, handler);
agent.status; // logs out the crowley object (not the agent object!) and the name of the property being accessed (`status`)
```

In the code above, the `handler` object has a `get` method (called a "trap" since it's being used in a Proxy). When the code `agent.status;` is run on the last line, because the `get` trap exists, it "intercepts" the call to get the `status` property and runs the `get` trap function. This will log out the target object of the proxy (the `crowley` object) and then logs out the name of the property being requested (the `status` property). And that's all it does! It doesn't actually log out the property! This is important - _if a trap is used, you need to make sure you provide all the functionality for that specific trap_.

If we wanted to actually provide the real result, we would need to return the property on the target object:

```javascript
const crowley = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target);
        console.log(propName);
        return target[propName];
    }
};
const agent = new Proxy(crowley, handler);
agent.status; // (1)logs the crowley object, (2)logs the property being accessed, (3)returns the text in crowley.status
```

Notice we added the `return target[propName];` as the last line of the `get` trap. This will access the property on the target object and will return it.

So the `get` trap will take over whenever any property on the proxy is accessed. If we want to intercept calls to change properties, then the `set` trap needs to be used!

The `set` trap is used for intercepting code that will _change a property_. The `set` trap receives: the object it proxies the property that is being set the new value for the proxy.

```javascript
const crowley = {status: 'looking for work'};
const handler = {
    set(target, propName, value) {
        if (propName === 'payRate') { // if the pay is being set, take 15% as commission
            value = value * 0.85;
        }
        target[propName] = value;
    }
};
const agent = new Proxy(crowley, handler);
agent.payRate = 1000; // set the actor's pay to $1,000
agent.payRate; // $850 the actor's actual pay
```

In the code above, notice that the `set` trap checks to see if the `payRate` property is being set. If it is, then the proxy (the agent) takes 15 percent off the top for her own commission! Then, when the actor's pay is set to one thousand dollars, since the `payRate` property was used, the code took 15% off the top and set the actual `payRate` property to `850`;

So we've looked at the `get` and `set` traps (which are probably the ones you'll use most often), but there are actually a total of 13 different traps that can be used in a handler!

1. the get trap - lets the proxy handle calls to property access
2. the set trap - lets the proxy handle setting the property to a new value
3. the apply trap - lets the proxy handle being invoked (the object being proxied is a function)
4. the has trap - lets the proxy handle the using `in` operator
5. the deleteProperty trap - lets the proxy handle if a property is deleted
6. the ownKeys trap - lets the proxy handle when all keys are requested
7. the construct trap - lets the proxy handle when the proxy is used with the `new` keyword as a constructor
8. the defineProperty trap - lets the proxy handle when defineProperty is used to create a new property on the object
9. the getOwnPropertyDescriptor trap - lets the proxy handle getting the property's descriptors
10. the preventExtenions trap - lets the proxy handle calls to `Object.preventExtensions()` on the proxy object
11. the isExtensible trap - lets the proxy handle calls to `Object.isExtensible` on the proxy object
12. the getPrototypeOf trap - lets the proxy handle calls to `Object.getPrototypeOf` on the proxy object
13. the setPrototypeOf trap - lets the proxy handle calls to `Object.setPrototypeOf` on the proxy object

<h3>Generators</h3>

Whenever a function is invoked, the JavaScript engine starts at the top of the function and runs every line of code until it gets to the bottom. There's no way to stop the execution of the function in the middle and pick up again at some later point. This __"run-to-completion"__ is the way it's always been. But iff we _do_ want to be able to pause a function mid-execution, then we'll need a new type of function available to us in ES6 - generator functions! Let's look at one:

```javascript
function* getEmployee() {
    console.log('the function has started');

    const names = ['Ben', 'Dean', 'Sam', 'Harry', 'Ron', 'James', 'Lilly', 'Samantha'];

    for (const name of names) {
        console.log(name);
    }

    console.log('the function has ended');
}
```

Notice the asterisk (i.e. `*`) right after the `function` keyword? That asterisk indicates that this function is actually a generator!

__Generators & Iterators:__

When a generator is invoked, it doesn't actually run any of the code inside the function. Instead, it creates and returns an iterator. This iterator can then be used to execute the actual generator's inner code.

```javascript
const generatorIterator = getEmployee();
generatorIterator.next();
```

Now if you tried the code out for yourself, the first time the iterator's `.next()` method was called it ran all of the code inside the generator. Did you notice anything? The code never paused! So how do we get this magical, pausing functionality?

```javascript
function *getEmployee() {
    console.log('the function has started');

    const names = ['Ben', 'Dean', 'Sam', 'Harry', 'Ron', 'James', 'Lilly', 'Samantha'];

    for (name of names) {
        console.log(name);
        yield;
    }
}
```

Notice that there's now a `yield` inside the `for...of` loop. If we invoke the generator (which produces an iterator) and then call `.next()`, we'll get the following output:

```javascript
const generatorIterator = getEmployee();
generatorIterator.next();
```
> _**Returns:**_
>
> _the function has started_
>
> _Ben_

It's paused! But to really be sure, let's check out the next iteration:

```javascript
generatorIterator.next();
```
> _**Returns:** Dean_

So it remembered exactly where we left off! It took the next item in the array, logged it, and then hit the `yield` again, so it paused again.

Instead of logging the names to the console and then pausing, let's have the code "return" the name and then pause.

```javascript
function* getEmployee() {
    console.log('the function has started');

    const names = ['Ben', 'Dean', 'Sam', 'Harry', 'Ron', 'James', 'Lilly', 'Samantha'];

    for (const name of names) {
        yield name;
    }

    console.log('the function has ended');
}
```

Notice that now instead of `console.log(name)`; that it's been switched to `yield name;`. With this change, when the generator is run, it will "yield" the name back out to the function and then pause its execution. Let's see this in action:

```javascript
const generatorIterator = getEmployee();
let result = generatorIterator.next();
result.value // is "Ben"

generatorIterator.next().value // is "Dean"
generatorIterator.next().value // is "Sam"
```

Generators are a powerful new kind of function that is able to pause its execution while also maintaining its own state. Generators are great for iterating over a list of items one at a time so you can handle each item on its own before moving on to the next one. You can also use generators to handle nested callbacks. For example, let's say that an app needs to get a list of all repositories and the number of times they've been starred. Well, before you can get the number of stars for each repository, you'd need to get the user's information. Then after retrieving the user's profile the code can then take that information to find all of the repositories.

<h2>Reflect</h2>

The `Reflect` API was designed to work in tandem with `Proxy`. For every internal object operation that can be trapped, there’s a `Reflect` method. It has the same name and arguments as the trap, and can be used to forward the operation to an object from the trap.

For example:

```javascript
let user = {
    name: "Mukesh",
};

user = new Proxy(user, {
    get(target, prop, receiver) {
        alert(`GET ${prop}`);
        return Reflect.get(target, prop, receiver); // (1)
    },
  set(target, prop, val, receiver) {
        alert(`SET ${prop} TO ${val}`);
        return Reflect.set(target, prop, val, receiver); // (2)
    }
});

let name = user.name; // GET name
user.name = "Adam"; // SET name TO Adam
```

- `Reflect.get` gets the property, like `target[prop]`.
- `Reflect.set` sets the property, like `target[prop] = value`, and returns `true/false` as needed by `[[Set]]`.
