<h1>Intro to AJAX</h1>


<h2>Requests and APIs</h2>

Let's imagine that you want to visit a website. When you type in the name of the website into your browser and press Enter, what do you expect to happen? The exact answer, of course, depends on the website. But it's safe to say that you expect to see, well, something, some website, to show up very quickly.

Modern websites can load content without reloading. Developers have solved the challenge of loading information quickly and after the first page render in many ways. And one flexible and popular implementation relies on __AJAX requests__, which allow for data to be received asynchronously. Data that loads asynchronously can be requested late in the load process and the website should load acceptably with or without it.

We will build a move planner app today. This will require three different asynchronous requests. It will require data from Google street-view, The New York Times, and Wikipedia. When the user types in an address, the street-view of their new potential home will become the background, and they'll see related New York Times and Wikipedia articles below. But, before we start building, we really need to break down the components of asynchronous requests.

<h3>Client Server Demonstration</h3>

It's actually pretty useful to imagine the internet as a bunch of people who are just simply sending messages back and forth. For this example, I'll be the client, which means that I'm actually a browser like Chrome or Firefox. Then there's the internet, the middleman who will be passing information back and forth. Finally the server, dedicated to providing content to browsers like me. If I want something from the server, I'll send a __get request__. A get request is a message that tells the server who I am and what I want. So, got my message, the internet takes it and passes it to the server. The server, looks at my message and then sends back what I requested. This is called a __response__. I can open the response and then do something with it.

In order for a website to open, it performs many requests for data. Most of the time, the response is critical for the page to load. When your browser makes a request synchronously, or without AJAX, it has to wait for responses before proceeding with the load. AJAX is special because it allows these types of requests asynchronously, which means that they can happen in the background without blocking the rest of the page load.

Let's imagine I send off a get request to the server, but I've got some plans in mind for what I want to do with it when the response gets back. So, when I send off the request, I will take the instructions and set them aside for myself. And they'll patiently wait right here. And now, I'm free to go off and work on other tasks. When the server response eventually gets back, I'll open up the response, take a look at my instructions, and then do something with them. These instructions that I set aside are called a `callback` in that I call them when I get a response back.

<h3>AJAX Definition</h3>

Ajax stands for asynchronous JavaScript and XML request, we can ignore the XML part of the acronym. For now, let's just think of it as an asynchronous JavaScript request. Ajax requests allow for content retrieval and display without reloading the webpage.

__Asynchronous__ in Ajax, refers to the fact that the request doesn't block other events from happening. Instead, the page keeps on doing its thing, and then only acts on the data when it gets returned by the server. AJAX requests occur in a number of different ways and with varying levels of difficulty. Some require an API key, others use O-off, and some don't use any authentication at all. And, the data returned by a different AJAX request differs too.

__X__ in AJAX stands for XML which used to be the dominant hierarchical data format. But today, JSON is much more popular, in fact most AJAX requests nowadays are actually a AJAJ request standing for Asynchronous JavaScript and Json request, but it doesn't sound as nice so we still just call them Ajax.

Embedded within Ajax responses, it's pretty common to see HTML, which websites can use to fill in part part of page. As part of the project today, you'll have to try three different asynchronous request techniques. You'll have to work with the Google Street View, Wikipedia, and New York Times APIs, all three of which work very differently.


<h2>Building the Move Planner App</h2>

jQuery is an extremely popular JavaScript library meant to make a number of common JavaScript tasks simpler, via a consistent API across all browsers. In other words, jQuery makes your life easier. As of 2014, almost 62% of the top 100,000 websites all use jQuery, which is pretty incredible. Performing AJAX requests that work properly in every browser is, well it's a big pain in the butt. Luckily we can use [jQuery's AJAX](https://api.jquery.com/jquery.ajax/) methods and leave some of the drudgery of supporting old browsers to jQuery. In order to use jQuery we need to use jQuery objects, and to do that we'll be using syntax like you see within `script.js`. For example,

```javascript
var $body = $('body');
var $wikiElem = $('#wikipedia-links');
var $nytHeaderElem = $('#nytimes-header');
var $nytElem = $('#nytimes-articles');
var $greeting = $('#greeting');
```

We're creating a few variables over here each of which has a dollar sign in front of them. Now this dollar sign doesn't mean anything, it's just a character that we're going to to use to identify the fact that this object is a jQuery object. To select an object with jQuery, we'll start off with the dollar sign. Which is a pointer to a jQuery object. And then, within the parentheses, we'll pass in a string of the element that we want.

We'll be using two different methods for AJAX requests, the `.ajax` method and the `.getJSON` method. Both methods take in a URL and then some optional parameters.

<h3>QUIZ: Loading Street view</h3>

[Google Streetview](https://developers.google.com/maps/documentation/streetview/intro) image requests must include the size location parameters. In addition you will also need an API key.

For this quiz, you can get the street (`streetStr`) and city (`cityStr`) id `values` ([.val()](https://api.jquery.com/val/)) and create two variables and concatenate then to get the `address` string: http://maps.googleapis.com/maps/api/streetview?size=600x300&location= to create a complete image request that includes the required parameters.

You can find the AJAX project in the `Exercises` section. You'll be editing js/script.js. Open index.html with your browser to test the page. You'll also need to use [jQuery's append method](https://api.jquery.com/append/) to add an `<img>` to the page. Make sure it has a class of `bgimg`. For example: `$body.append('<img class="bgimg" src="http://example.com/someimage.png">');` Notice how the new `<img>` HTML element is just a string passed into `.append()`.

<h3>QUIZ: New York Times Implementation</h3>

Start by requesting the [NY Times API Key](https://developer.nytimes.com/).

Now that we've got the background image of our new location let's go ahead and get some more information about the new city. For that let's start by pulling up some New York Times articles about it. The New York Times provides an article search API that pulls articles from 1851 to today.

At this point, you should have your API key for the New York Times. You're ready to start grabbing some headlines and the opening paragraphs to articles. Your code is going to be going inside the same loadData function as before. You'll use using the jQuery `$.getJSON` method to make this AJAX request. It's your job to write the code that makes the AJAX request. Once the data has been returned from the AJAX request, you'll need to parse it, and then figure out how to present it on the page under the `nytimes-container`.

<h3>Error Handling</h3>

Unfortunately, sometimes requests fail. And it's important that your app take into account errors so that it doesn't completely break if an AJAX request doesn't work. jQuery gives us the `.error` method. This `.error` method goes into effect if the AJAX request fails for whatever reason. (_NOTE_: As of jQuery 1.8, `.error()` is deprecated. Use `.fail()` instead).

For this section let's setup error handling for the New York Times request. Your app should display New York Times articles could not be loaded, if the request fails.

<h3>Cross-Origin Resource Sharing</h3>

__CORS__ works around a sometimes overly-strict browser policy meant to protect servers from malicious requests. CORS is enabled on the server-side, so you won't generally need to worry about it for your code. You do need to know about it though, since some APIs support it, and some do not.

__What is CORS and why are we using it?__

CORS works around the same-origin policy. The same-origin policy was implemented by web browsers to prevent malicious scripts from untrusted domains from running on a website. In other words, it ensures that scripts from one website can't insert themselves into another.

For example, the same-origin policy keeps the bad guys' JavaScript from somehow running on your bank's website and stealing your information.

Over time, developers realized that this policy was too strict, and often got in the way of legitimate use-cases. There are many reasons to serve content from multiple domain origins, and so developers found a way around it.

Developers that maintain server-side APIs can enable CORS on their servers to disable the same-origin policy. CORS is a relatively recent feature added to browsers. When certain headers are returned by the the server, the browser will allow the cross-domain request to occur.

For APIs that don't support CORS, you may need to use another method. The other way around the same-origin policy is JSON-P. JSON-P is a unique trick to allow cross-domain requests. Many APIs allow you to provide a callback function name, and they will generate a JavaScript file that passes the data into that function when it gets run in your browser.

This isn't the simplest thing to implement cleanly, but if you're using jQuery to create your AJAX requests, using JSON-P is as simple as adding an extra property to the options object that you pass into the AJAX method.

__The nitty gritty of JSON-P:__

Your application loads up a script from the other domain using a simple `<script>` tag. Once the script has been received, that code gets run by your browser. All the code does is build the data object you requested as a simple JavaScript object, and runs the callback function (that you told the server to use) with the object (your data) as a parameter.

You’ll need to refer to the documentation for any data API’s you want to use, and figure out if the API supports CORS or if you need to use JSON-P.

<h3>QUIZ: Wikipedia API</h3>

We've got two out of our three asynchronous requests working. Let's get some Wikipedia articles about the page to show up. We're on the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) page, because Wikipedia is run by MediaWiki, and looking through this page, you'll actually find you don't need an API key. However, making normal JSON requests to Wikipedia would result in a cross origin or a cross-site error, because Wikipedia servers forbid cross origin requests.

There are several ways we can make this request to Wikipedia. One would be to set the origin and content type headers on the request and then Wikipedia would allow it. Or, we can just use JSONP. In our example, we'll be using JSONP. A JSONP request is a somewhat convoluted trick that involves a server wrapping the response inside a function to get injected when it actually gets back to the client.

But luckily, if this sounds confusing, don't worry. jQuery actually makes it pretty easy. To make a JSONP request, we'll use the more robust `.ajax` method. In fact, the `.getJSON` method we were using before was actually just an abstraction of the `.ajax` method. Which is, incidentally, also an abstraction of an asynchronous JavaScript request.

For this quiz, use the `.ajax` method to collect data from a Wikipedia endpoint and display it under the `wikipedia-container`.

<h3>Error Handling with JSON P</h3>

You may be asking yourself, or at least, I hope you're asking yourself, hey, but what about error handling? I didn't see a `.error` method on the end of that call. And you're right. Because unfortunately, error handling isn't actually built into JSONP. This is a technical limitation because of what's happening behind the scenes. But there are workarounds. We can use `setTimeout` to stop the request if it runs for too long.

So, in our `move planner` before we run the AJAX request, we'll create a `setTimeout` function. Then we bind `wikiRequestTimeout` to this `setTimeout` function, we automatically start a timer that will end 8000 milliseconds later, which is eight seconds. When eight seconds are up, we'll go ahead and change the text of the wiki element on the page to failed to get Wikipedia resources.
