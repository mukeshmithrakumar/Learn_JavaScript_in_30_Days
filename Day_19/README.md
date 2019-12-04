<h1>JavaScript and the DOM</h1>


<h2>Creating Content with JavaScript</h2>

Every element inherits properties and methods from the Element Interface. This means that every element has an `.innerHTML` property. This property, as it's rightly named, represents the markup of the element's content. We can use this property to:
- get an element's (and all of its descendants!) HTML content
- set an element's HTML content

The `.innerHTML` property sets or returns the HTML content inside the selected element (i.e. between the tags).

There's also the rarely used `.outerHTML` property. `.outerHTML` represents the HTML element itself, as well as its children.

```javascript
<h1 id="pick-me">Greetings To <span>All</span>!</h1>

const innerResults = document.querySelector('#pick-me').innerHTML;
console.log(innerResults); // logs the string: "Greetings To <span>All</span>!"

const outerResults = document.querySelector('#pick-me').outerHTML;
console.log(outerResults); // logs the string: "<h1 id="pick-me">Greetings To <span>All</span>!</h1>"
```

So `.innerHTML` will get/set an element's HTML content. If we just want the text content, we can use the fantastically named `.textContent` property!

The `.textContent` property will:
- set the text content of an element and all its descendants
- return the text content of an element and all its descendants

Setting an element's text content is easy, just set it like you would any other property:

```javascript
const card = document.querySelector('.card');

card.textContent = "I will be the updated text for the card element!";
```

<h3>Quiz</h3>

```javascript
<h1 id="test">Ice Cream Flavors</h1>
```

Given the HTML above, what will be the `.textContent` value after running this code:

```javascript
const myElement = document.querySelector('#test');
myElement.textContent = 'The <strong>Greatest</strong> Ice Cream Flavors';
```
> _**Answer:** `The <strong>Greatest</strong> Ice Cream Flavors`_

Passing any text that looks like HTML to the `.textContent` property will still be displayed as text. It will not be displayed as HTML when the element is rendered.

We just saw that passing text that contains HTML characters to `.textContent` will not display the content as HTML. Instead, it will still display everything as text - even the HTML characters!

If you'd like to update an element, _including_ its HTML, then you need to use the `.innerHTML` property:

```javascript
myElement.textContent = 'The <strong>Greatest</strong> Ice Cream Flavors'; // doesn't work as expected

myElement.innerHTML = 'The <strong>Greatest</strong> Ice Cream Flavors';  // works as expected
```

Like the `.textContent` property, the `.innerText` property can be used to get/set an element's text content, but there are some important differences between the two properties.

`.textContent` sets/gets the text content of an element.

`.innerText`, on the other hand, is a little tricker. It will get the _visible text_ of the element. This is an important distinction! If CSS is used to hide any text inside that element, `.innerText` _will not_ return that text, while .`textContent` _will_ return it. And it's not just the hiding/showing nature of CSS that `.innerText` adheres to, `.innerText` will also honor changes to things like capitalization. Between `.textContent` and `.innerText`, you probably want to use .textContent since that will return all of the text no matter what. Rarely will you actually want only the visible text.

<h3>Add New Page Content</h3>

`.createElement()` method is a method on the document object used to create new elements:

```javascript
// creates and returns a <span> element
document.createElement('span');

// creates and returns an <h3> element
document.createElement('h3');
```

To make the `div` show up, we need to insert it somewhere into `document`. For instance, in `document.body`. There’s a special method append for that: `document.body.append(div)`. For example,

```html
<style>
.alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
}
</style>

<script>
    let div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

    document.body.append(div);
</script>
```

This set of methods provides more ways to insert:
- `node.append(...nodes or strings)` – append nodes or strings at the end of `node`,
- `node.prepend(...nodes or strings)` – insert nodes or strings into the beginning of `node`,
- `node.before(...nodes or strings)` –- insert nodes or strings before the `node`,
- `node.after(...nodes or strings)` –- insert nodes or strings after the `node`,
- `node.replaceWith(...nodes or strings)` –- replaces `node` with the given nodes or strings.

Here’s an example of using these methods to add items to a list and the text before/after it:

```html
<ol id="ol">
    <li>0</li>
    <li>1</li>
    <li>2</li>
</ol>

<script>
    ol.before('before'); // insert string "before" before <ol>
    ol.after('after'); // insert string "after" after <ol>

    let liFirst = document.createElement('li');
    liFirst.innerHTML = 'prepend';
    ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

    let liLast = document.createElement('li');
    liLast.innerHTML = 'append';
    ol.append(liLast); // insert liLast at the end of <ol>
</script>
```

> _**Returns:**_
```html
before
<ol id="ol">
    <li>prepend</li>
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>append</li>
</ol>
after
```

Here’s a visual picture what methods do:

<img src="../img/nodelist.png"/>

These methods can insert multiple lists of nodes and text pieces in a single call.

For example the `textContent`. Instead of creating a new text node and appending it to an element, it's faster and easier to just update the element's text with the `.textContent` property.

```javascript
const myPara = document.createElement('p');
const textOfParagraph = document.createTextNode('I am the text for the paragraph!');

// The code below will provide the exact same result:
myPara.textContent = 'I am the text for the paragraph!';
document.body.append(myPara);
```

So, these methods can only be used to insert DOM nodes or text pieces. But what if we want to insert HTML “as html”, with all tags and stuff working.

<h3>insertAdjacentHTML/Text/Element</h3>

Enter the `.insertAdjacentHTML()` method! The `.insertAdjacentHTML()` method has to be called with two arguments:
- the location of the HTML
- the HTML text that is going to be inserted

The first argument to this method will let us insert the new HTML in one of four different locations:
- `beforebegin` inserts the HTML text as a previous sibling
- `afterbegin` inserts the HTML text as the first child
- `beforeend` inserts the HTML text as the last child
- `afterend` inserts the HTML text as a following sibling

```html
<!-- beforebegin -->
<p>
    <!-- afterbegin -->
    Existing text/HTML content
    <!-- beforeend -->
</p>
<!-- afterend -->
```

Here's how we'd call `.insertAdjacentHTML()`:

```javascript
const mainHeading = document.querySelector('#main-heading');
const htmlTextToAdd = '<h2>Skydiving is fun!</h2>';

mainHeading.insertAdjacentHTML('afterend', htmlTextToAdd);
```

<h3>Remove Page Content</h3>

We can use the `.remove()` method to remove a node. Basically, this is exactly the opposite of the `.append()` method.

```html
<style>
.alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
}
</style>

<script>
    let div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

    document.body.append(div);
    setTimeout(() => div.remove(), 1000);
</script>
```

Please note: if we want to move an element to another place – there’s no need to remove it from the old one. _All insertion methods automatically remove the node from the old place._

For instance, let’s swap elements:

```html
<div id="first">First</div>
<div id="second">Second</div>
<script>
    // no need to call remove
    second.after(first); // take #second and after it insert #first
</script>
```

<h3>Cloning nodes</h3>

We could make a function and put the code there. But the alternative way would be to _clone_ the existing `div` and modify the text inside it (if needed).

Sometimes when we have a big element, that may be faster and simpler.
- The call `elem.cloneNode(true)` creates a “deep” clone of the element – with all attributes and subelements. If we call `elem.cloneNode(false)`, then the clone is made without child elements.

For example:

```html
<style>
.alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
    <strong>Hi there!</strong> You've read an important message.
</div>

<script>
    let div2 = div.cloneNode(true); // clone the message
    div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone

    div.after(div2); // show the clone after the existing div
</script>
```

<h3>DocumentFragment</h3>

`DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes. We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

For example, `getListContent` below generates a fragment with `<li>` items, that are later inserted into `<ul>`:

```html
<ul id="ul"></ul>

<script>
function getListContent() {
    let fragment = new DocumentFragment();

    for(let i=1; i<=3; i++) {
        let li = document.createElement('li');
        li.append(i);
        fragment.append(li);
    }

    return fragment;
}

ul.append(getListContent()); // (*)
</script>
```

Please note, at the last line `(*)` we append `DocumentFragment`, but it “blends in”, so the resulting structure will be:

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

DocumentFragment is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:

```html
<ul id="ul"></ul>

<script>
function getListContent() {
    let result = [];

    for(let i=1; i<=3; i++) {
        let li = document.createElement('li');
        li.append(i);
        result.push(li);
    }

    return result;
}

ul.append(...getListContent()); // append + "..." operator = friends!
</script>
```

<h3>Old-school insert/remove methods</h3>

There are also “old school” DOM manipulation methods, existing for historical reasons. For example:

- `parentElem.appendChild(node)`: Appends node as the last child of parentElem.

The following example adds a new `<li>` to the end of `<ol>`:

```html
<ol id="list">
    <li>0</li>
    <li>1</li>
    <li>2</li>
</ol>

<script>
    let newLi = document.createElement('li');
    newLi.innerHTML = 'Hello, world!';

    list.appendChild(newLi);
</script>
```

- `parentElem.insertBefore(node, nextSibling)`: Inserts node before nextSibling into parentElem.
- `parentElem.replaceChild(node, oldChild)`: Replaces oldChild with node among children of parentElem.
- `parentElem.removeChild(node)`: Removes node from parentElem (assuming node is its child).

The following example removes first `<li>` from `<ol>`:

```html
<ol id="list">
    <li>0</li>
    <li>1</li>
    <li>2</li>
</ol>

<script>
    let li = list.firstElementChild;
    list.removeChild(li);
</script>
```

<h3>Style Page Content</h3>

When trying to style an element, the most-specific rules that you can write for an element are written in that element's `style` attribute. Lucky for us, we can access access an element's `style` attribute using the `.style` property!

```javascript
const mainHeading = document.querySelector('h1');
mainHeading.style.color = 'red';
```

Now, I want to point out that when using the `.style` property, you can only modify _one_ CSS style at a time. That's why the previous code has `.style.color = 'red'` and not just `.style = 'red'`.

We've seen how the `.style.<property>` syntax will let us change just one piece of styling for an element. So if we wanted to set an element's color, background color, and font size, we'd have to use three separate lines of code:

```javascript
const mainHeading = document.querySelector('h1');

mainHeading.style.color = 'blue';
mainHeading.style.backgroundColor = 'orange';
mainHeading.style.fontSize = '3.5em';
```

And that's just for setting three styles. Imagine if we needed 15 or 20 different styles! So the `.style.property` syntax is perfect for setting one style at a time, but it's not great for controlling multiple styles. Fortunately, we can use the `.style.cssText` property to set multiple CSS styles at once!

```javascript
const mainHeading = document.querySelector('h1');
mainHeading.style.cssText = 'color: blue; background-color: orange; font-size: 3.5em';
```

Another way to set styles for an element is to bypass the `.style.<property>` and `.style.cssText` properties altogether and use the `.setAttribute()` method:

```javascript
const mainHeading = document.querySelector('h1');
mainHeading.setAttribute('style', 'color: blue; background-color: orange; font-size: 3.5em;');
```

The `setAttribute()` method is not just for styling page elements. You can use this method to set _any_ attribute for an element. If you want to give an element an ID, you can do that!:

```javascript
const mainHeading = document.querySelector('h1');

// add an ID to the heading's sibling element
mainHeading.nextElementSibling.setAttribute('id', 'heading-sibling');

// use the newly added ID to access that element
document.querySelector('#heading-sibling').style.backgroundColor = 'red';

// The last two lines could've been combined into one to bypass setting an ID
mainHeading.nextElementSibling.style.backgroundColor = 'red';
```

__Accessing an Element's Classes:__

The first element property we'll look at is the `.className` property. This property returns a string of all of the element's classes. If an element has the following HTML:

```html
<h1 id="main-heading" class="student modal javascript">Learn JavaScript in 30 Days</h1>
```

We could use `.className` to access the list of classes:

```javascript
const mainHeading = document.querySelector('#main-heading');

// store the list of classes in a variable
const listOfClasses = mainHeading.className;
console.log(listOfClasses);
```
> _**Prints:** "student modal javascript"_

The `.className` property returns a space-separated string of the classes. This isn't the most ideal format, unfortunately. We can, however, convert this space-separated string into an array using the JavaScript string method, `.split()`:

```javascript
const arrayOfClasses = listOfClasses.split(' ');
console.log(arrayOfClasses);
```
> _**Prints:** ["student", "modal", "javascript"]_

Now that we have an array of classes, we can do any data-intensive calculations:
- use a `for` loop to loop through the list of class names
- use `.push()` to add an item to the list
- use `.pop()` to remove an item from the list

`.className` is a property, so we can set its value just by assigning a string to the property:

```javascript
mainHeading.className = "im-the-new-class";
```

The above code _erases_ any classes that were originally in the element's `class` attribute and replaces it with the single class `im-the-new-class`.

Since `.className` returns a string, it makes it hard to add or remove individual classes. As I mentioned earlier, we can convert the string to an array and then use different Array Methods to search for a class remove it from the list, and then update the `.className` with the remaining classes. However, we don't want to do all of that work! Let's use the newer `.classList` property.

The `.classList` property is newer than the `.className` property, but is much nicer, check it out:

```javascript
const listOfClasses = mainHeading.classList;
console.log(listOfClasses);
```
> _**Prints:** ["student", "modal", "javascript"]_

The `.classList` property has a number of properties of its own. Some of the most popularly used ones are:
- `.add()` - to add a class to the list
- `.remove()` - to remove a class from the list
- `.toggle()` - to add the class if it doesn't exists or remove it from the list if it does already exist
- `.contains()` - returns returns a boolean based on if the class exists in the list or not
