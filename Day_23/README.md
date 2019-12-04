<h1>Asynchronous JavaScript Requests</h1>


<h2>Ajax with XHR</h2>

The main concept of Ajax is simple. You make a request for some data, and then without pausing for everything to wait for the request of return, You just move on and do something else. Then once the requests finally does get returned you deal with it.

We looked at a little bit of Ajax yesterday but today, we will delve deeper, so some concepts might seem a bit repetitive but hey, repetition is a good thing 😉. First, we'll look at making Ajax requests using JavaScript with the tried-and-true _XHR_ object. Then we'll look at how _jQuery_ makes Ajax requests and finally, we'll check out the new and massively improved way of making async requests using the _fetch API_.

<h3>APIs</h3>

We've looked at the concepts of Ajax and that it's the technology we'll use to add data to our project asynchronously. But where is this data coming from? And how do we get access to it? How will our app know how to retrieve that data?

We'll be using an __API__ to interact with various data sources.

__What's an API?__

The acronym "API" stands for:

__A__ pplication

__P__ rogramming

__I__ nterface

There's data out there that's just waiting to be used. Most of the data-rich applications you use get their data from 3rd party websites. They actually fetch this data using APIs.

<h3>The XHR Object</h3>

An XHR object is provided by the javascript environment and is used to make AJAX requests. Just like how the `document` is provided by the JavaScript engine, the JavaScript engine also provides a way for us to make asynchronous HTTP requests. We do that with an `XMLHttpRequest` object. We can create these objects with the provided `XMLHttpRequest` constructor function.

Confusingly, the constructor function has "XML" in it, but it's not limited to only XML documents. Remember that the "AJAX" acronym used to stand for "Asynchronous JavaScript and XML". Since the main file format that was originally used for asynchronous data exchange were XML files, it's easy to see why the function is called `XMLHttpRequest`!

`XMLHttpRequests` (commonly abbreviated as XHR or xhr) can be used to request any file type (e.g. plain text files, HTML files, JSON files, image files, etc.) or data from an API.

<h3>XHR's .open() method</h3>

We can create an `XMLHttpRequest` by:

```javascript
const asyncRequestObject = new XMLHttpRequest();
```

There are a number of methods that are available to us. One of the most important is the open method.

```javascript
asyncRequestObject.open();
```

`.open()` takes a number of parameters, but the most important are its first two: the HTTP method URL to send the request

If we want to asynchronously request the homepage from the popular high-res image site, Unsplash, we'd use a `GET` request and provide the URL:

```javascript
asyncRequestObject.open('GET', 'https://unsplash.com');
```

The XHR's `.open()` method does not actually send the request! It sets the stage and gives the object the info it will need when the request is actually sent.

The main two that you'll be using are:
- `GET` - to retrieve data
- `POST` - to send data

<h3>XHR's .send() method</h3>

To actually send the request, we need to use the send method:

```javascript
asyncRequestObject.send();
```

__Handling Success:__

To handle the successful response of an XHR request, we set the onload property on the object to a function that will handle it:

```javascript
function handleSuccess () {
    // in the function, the `this` value is the XHR object
    // this.responseText holds the response from the server

    console.log(this.responseText); // the HTML of https://unsplash.com/
}

asyncRequestObject.onload = handleSuccess;
```

As we just saw, if `onload` isn't set, then the request does return but nothing happens with it.

__Handling Errors:__

You might've picked up that __onload__ is called when the response is successful. If something happens with the request and it can't be fulfilled, then we need to use the __onerror property__:

```javascript
function handleError () {
    // in the function, the `this` value is the XHR object
    console.log('An error occurred 😞');
}

asyncRequestObject.onerror = handleError;
```

As with `onload`, if `onerror` isn't set and an error occurs, that error will just fail silently and your code (and your user!) won't have any idea what's wrong or any way to recover.

<h3>A Full Request</h3>

Here's the full code that we've built up that creates the XHR object, tells it what info to request, sets up handlers for a success or error, and then actually sends the request:

```javascript
function handleSuccess () {
  console.log(this.responseText);
// the HTML of https://unsplash.com/
}

function handleError () {
  console.log( 'An error occurred \uD83D\uDE1E' );
}

const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.onload = handleSuccess;
asyncRequestObject.onerror = handleError;
asyncRequestObject.send();
```

__APIs and JSON:__

Getting the HTML of a website is ok, but it's probably not very useful. The data it returns is in a format that is extremely difficult to parse and consume. It would be a lot easier if we could get just the data we want in an easily formatted data structure. If you're thinking that JSON would be a good idea, then you're right.

When making a request from an API that returns JSON, all we need to do is convert that JSON response into a JavaScript object. We can do that with `JSON.parse();`. Let's tweak the onload function to handle a JSON response:

```javascript
function handleSuccess () {
    // convert data from JSON to a JavaScript object
    const data = JSON.parse(this.responseText);
    console.log(data);
}

asyncRequestObject.onload = handleSuccess;
```

<h3>Setting a Request Header</h3>

The XHR method to include a header with the request is setRequestHeader. So the full code needs to be:

```javascript
const searchedForText = 'hippos';
const unsplashRequest = new XMLHttpRequest();

unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
unsplashRequest.onload = addImage;
unsplashRequest.setRequestHeader('Authorization', 'Client-ID <your-client-id>');
unsplashRequest.send();

function addImage() {
    // ...
}
```


<h2>Ajax with jQuery</h2>

<h3>jQuery's `ajax()` Method</h3>

The `.ajax()` method is at the heart of all asynchronous requests for the entire jQuery library. There are a couple of ways you can call the `.ajax()` method:

```javascript
$.ajax(<url-to-fetch>, <a-configuration-object>);

// or

$.ajax(<just a configuration object>);
```

The most common way to use the `.ajax()` method is with just the configuration object, since everything can be set inside the configuration object.

__What's a "configuration object"?__

A configuration object is just a plain ol' JavaScript object that's used to configure something. For example:

```javascript
var settings = {
   frosting: 'buttercream',
   colors: ['orange', 'blue'],
   layers: 2,
   isRound: true
};
```

__Making an Ajax call:__

jQuery's `.ajax()` method has to be incredibly versatile and powerful if it's what powers all of jQuery's asynchronous requests. A simple Ajax request would look like this:

```javascript
$.ajax({
    url: 'https://swapi.co/api/people/1/'
});
```

<h3>Handling The Returned Data</h3>

If you recall from setting up an XHR object, the response was handled by a function. It's the same thing with the `.ajax()` method. We can chain on to `.ajax()` with a `.done()` method. We pass the `.done()` method a function that will run with the Ajax call is done!

```javascript
function handleResponse(data) {
    console.log('the ajax request has finished!');
    console.log(data);
}

$.ajax({
    url: 'https://swapi.co/api/people/1/'
}).done(handleResponse);
```

Let's convert the existing, plain XHR call with jQuery's `.ajax()`.

```javascript
$.ajax({
    url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
}).done(addImage);
```

With the jQuery code:
- we do not need to create an XHR object
- instead of specifying that the request is a `GET` request, it defaults to that and we just provide the URL of the resource we're requesting
- instead of setting `onload`, we use the `.done()` method

<h3>jQuery's Other Async Methods</h3>

jQuery has a number of other methods that can be used to make asynchronous calls. These methods are:

- `.get()`
- `.getJSON()`
- `.getScript()`
- `.post()`
- `.load()`

Each one of these functions in turn calls jQuery's main `.ajax()` method. These are called "convenience methods" because they provide a convenient interface and do some default configuration of the request before calling `.ajax()`.


<h2>Ajax with Fetch</h2>

Fetch is the new way to make network requests! After looking at all of the manual setup that needs to go into setting up an `XMLHttpRequest`, you might be feeling (like I sure did!) that a lot of complexity went into making a simple request. If all I want is an image from Unsplash, why do I need to do all this setup before I can even make the request? I just want an image file, so let me just ask for the file without having to drill through the unnecessarily complicated XHR spec.

Fetch is a new API that was built to make requesting resources (primarily across a network) a whole lot easier. One thing that makes the new Fetch API a lot nicer than the old XHR way of doing things is that Fetch is promise-based!

The new Fetch API utilizes Promises under the hood and we will be looking into JavaScript promises tomorrow.

Ok, let's look at a sample fetch request, and then we'll make a fetch request for an image from Unsplash.

```javascript
fetch('<URL-to-the-resource-that-is-being-requested>');
```

So yeah, that's it. In it's smallest form, a Fetch request is just the `fetch()` function and a string to the resource that's being requested. Let's take a peek at what a real request looks like:

```javascript
fetch('https://api.unsplash.com/search/photos?page=1&query=flowers');
```

If you try running this Fetch request on the console, then you should get a Promise returned to you.

__Fetch requests still need to obey the cross-origin protocol__ of how resources are shared. This means that, by default, you can only make requests for assets and data on the same domain as the site that will end up loading the data.

The default HTTP method for a Fetch request is the `GET` method. We can choose a different HTTP method by passing a `method` property in the configuration object:

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    method: 'POST'
});
```

This will send the request with the `POST` HTTP header.

Fetch's specification does not limit what HTTP methods can be used, although it does recommend that all methods are written in uppercase for consistency with the HTTP Verbs specification.

<h3>Handle The Response</h3>

Ok, you've learned about making a Fetch request, and you've sent a few of them off...but nothing happened because we didn't tell our code to handle the response. Let's get our code ready to handle the response.

Remember that Fetch is Promise-based. This means that when we fire of the Fetch request, it will automatically return a promise that we can use to listen for the response. Then all you have to do is call `.then()` on that Promise.

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    debugger; // work with the returned response
});
```

<h3>The Response Object</h3>

The `Response` object is new with the Fetch API and is what's returned when a Fetch request resolves.

The response object doesn't have any of the data that we searched for! That's because a response object has information about the response itself, it doesn't have the data yet. To actually get the data, we need to get the "body" of the response.

Since the Unsplash API we're using will return JSON to us, we just need to call `.json()` on the response variable.

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    return response.json();
});
```

The `.json()` method on a Response object returns a Promise, so we need to chain on _another_ `.then()` to actually get and start using the returned data. This time, let's call `addImage` to pass it the returned data:

```javascript
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    return response.json();
}).then(addImage);

function addImage(data) {
    debugger;
}
```

<h3>ES6 Arrow Function</h3>

You might be thinking that this Fetch request is starting to look like a lot of code, and it is. One quick way to shrink the amount of code is to use an ES6 Arrow function! We can convert the first `.then()` function that gets the response, calls the `.json()` method on it, and returns a Promise all to a single line with an Arrow function:

```javascript
// without the arrow function
}).then(function(response) {
    return response.json();
})

// using the arrow function
}).then(response => response.json())
```
