<h1>JavaScript Testing</h1>


<h2>Rethinking Testing</h2>

The web apps we build have to function as intended all the time, every time. More importantly, we needed a way to add new features to these applications, while making sure we didn't break anything. You're probably already doing this in your own web apps. You refresh the browser, click around and just watch to make sure everything is working correctly. Although this works, it's a pretty slow and inaccurate process. What if I told you there was a way you could programmatically check your application's functionality? Today we will do just that.

You'll learn how to write your very own unit tests which are suites of functions that check if parts of your application are functioning as you expect. In fact, I'll even show you a whole new way to go about application development called test-driven development where you write tests for your features before you even write the feature itself.

<h3>Identifying Expectations</h3>

A test is based around expectations, expectations of how the code should perform. So you'll need to start identifying areas in your code in which you're setting expectations. By doing this, you'll know exactly what kind of test you need to run. For example,

```javascript
function add(x, y) {
    return x + y;
}

add(2, 3); // 5
```

Pretty simple right. But despite the simplicity of this function, I've already set a whole lot of expectations about how this function will be used. Right off the bat, when calling this function, the first expectation I have is that the add function has been defined and it actually exists. In this example, it's pretty obvious.

But what if I had this function defined in another file, like a library? This function wouldn't be so obvious anymore. Secondly, I had the expectation that the function is actually accomplishing our intended task. If this call were to return a different number, like 6, it would be a clear indicator I've messed up the actual implementation of the function somehow.

Finally, I'm expecting this function will always be called as I intended, with numbers as the parameter. But what if I were to call this function with strings being passed in instead of numbers? I'd get the result 23, which you'll notice is also a string, since the plus operator can catenate strings together.

It's important to identify each of these expectations as early as possible so you can write tests against them, from whether the function even exists to the output that is expected. This certainly isn't a comprehensive list of every expectation, but as you continue to identify other expectations, or opportunities for a test. You can always go back and update your test suite.

<h3>Refactoring add()</h3>

Based on our expectations above, let's refactor our add function:

```javascript
function add(x, y) {
    // Check to make sure the parameters being passed to the function are both of the type number.
    if ((typeof x && typeof y) !== 'number') {
        throw new Error('Params must be a number.');
    }
    result = x + y;
    if (parseInt(result) !== result) {
        result = parseFloat(result.toFixed(1));
    }

    return result
}
```

This solution is pretty naive. It only applies to a very small set of use cases. But that's okay. Writing a perfect add function is not the point of this exercise. I just want to be confident I can safely refactor my function, without breaking anything, and that's exactly what we've done here.


<h2>Writing Test Suites</h2>

Each test starts with a call to `expect`. You can think of this as the launching point of any test. It's what starts the process. The `expect` function accepts a single value called the _actual_ that we want to test. We then need to tell the testing framework what kind of comparison we want to use against the _actual_. The comparison method is called the _matcher_ and is a method chained after the call to `expect`.

For example,

```javascript
// Expect add() to throw an error if x/y are not numbers
expect(add(2, 'test')).toThrow();
```

<h3>Introduction to Jasmine</h3>

JavaScript doesn't have testing functions defined by default, so we'll need to use a library that will provide this functionality for us. There are a few different testing libraries available. But we'll be using one called __Jasmine__. In the Exercises folder, you have the Jasmine 2.2 code.

Jasmine includes a lot of _matcher_ functions and you can even add your own.

```javascript
// Expect add(0.1, 0.2) to equal 0.3
expect(add(0.1, 0.2)).toBe(0.3);
```

In this example our matcher is `toBe` which is the equivalent of a strict equals comparison. Finally, we pass the expected value to our matcher, in this case the value 0.3 which is what we would expect the `add` 0.1, 0.2 to return.

All in all, you can think of this test to look something like the following once it has been evaluated by the framework.

```javascript
add(0.1, 0.2) == 0.3;
```

If that expression returns `true`, this test passes. Otherwise, it fails. You can also negate a test by chaining the word `not`, before the matcher. For example,

```javascript
expect(add(0.1, 0.2)).not.toBe(0.1);
```

This test would evaluate to `true`, since add 0.1, 0.2 does not equal 0.1.

<h3>Quiz: SpecRunner</h3>

Load the `SpecRunner`, HTML file found in the Exercises folder in the browser. If we review this page, we can see some stuff is already happening by default. It says the Player should be able to play a Song, or, when song has been paused should indicate that the song is currently paused or should be possible to resume and some other functions. Take a look at the `PlayerSpec.js` and the `Player.js` to see more about the functionality.

Usually we write functions and then we write tests, but there is also another software development process called __Test Driven Development__, meaning, we first write the functionality and how our functions should perform and then we write the code that makes it possible. So, in this section, we will be working with the `AddressBookSpec.js` and `AddressBook.js`.

We will start with:
1. Writing a test function to see if the AddressBook is able to add contacts and get contacts.
2. Write a test function to see if the AddressBook is able to delete a contact.
3. Please Note that to get the tests to pass, you need to write `AddressBook.js`.
Feel free to take a look at the solutions files if you get stuck.

<h3>Testing Asynchronous Code</h3>

Testing asynchronous functions is a bit different, because we need some way to inform the testing framework that our asynchronous function has completed. Let's imagine our application needs to make an API call to a server to retrieve a list of initial contacts to put back into our application. Let's write a new test suite to work on our new asynchronous functionality.

We're just going to fake our asynchronous functionality. So, in this case, we'll have to write our implementation first. We'll write a `getInitialContacts` function, and to make it asynchronous, we'll just use `setTimeout`. You can ignore most of this in the `AddressBook.js`. A lot of it's just boilerplate to make this function act as if it's asynchronous.

<h3>Quiz: Asynchronous Test</h3>

Now, that you have seen the asynchronous code, let's write a test for that. If you write the correct implementation and if you get a `Expected undefined to be true.` error. The reason this is failing is because our test, or our expectation, is running before the asynchronous function can complete its tasks. Let's see how to fix it.

```javascript
describe('Async Address Book', function() {
    var addressBook = new AddressBook();

    beforeEach(function(done) {
        addressBook.getInitialContacts(function() {
            done();
        });
    });

    it('Should grab initial contacts', function(done) {
        addressBook.getInitialContacts();

        expect(addressBook.initialComplete).toBe(true);
        done();
    });
});
```

We'll also use a new special function, called `done` that signals to the framework when an asynchronous function has completed, and we're ready to go run our tests. The only other thing we need to do is signal to the framework which of our tests rely upon that asynchronous execution. Again, we use done to signal this. We passed done to our function within our spec.

Go back and run the spec runner and you should see that everything's green.
