/*
Programming Quiz Solution: .toggleClass()

For this quiz, use a jQuery class selector and featuredArticle variable to toggle the 'featured' class!
*/

// Your code starts here!
var featuredArticle = $('.featured');
featuredArticle.toggleClass("featured");
// ======================================================================================


/*
Programming Quiz Solution: Toggling Classes

For this quiz, remove the class 'featured' from Article #2 and add it to Article #3!

You must use jQuery's toggleClass method!
*/

// Your code goes here!
var article2 = $('.featured');
article2.toggleClass('featured');
var article3 = article2.next();
article3.toggleClass('featured');
// ======================================================================================


/*
Programming Quiz Solution: Changing Attributes

For this quiz, set the href of the <a> in the first nav item to "#1".

You must use jQuery's attr() method!
*/

// Your code goes here!
var navList = $('.nav-list');
firstElement = navList.children().first();
firstItem = firstElement.find('a');
firstItem.attr('href', '#1');
// ======================================================================================


/*
Programming Quiz Solution: Modifying CSS

For this quiz, change the font-size of all the article-items to 20px!

You must use jQuery's css() method!
*/

// Your code goes here!
var articleItems = $('.article-item');
articleItems.css("font-size", "20px");
// ======================================================================================


/*
Programming Quiz Solution: Collecting Values

For this quiz, use jQuery's val method to make live changes to the 'Cool Articles' <h1>!

The starter code below creates an event listener that will run any time the input changes.
For more on events, check the instructor notes.
*/


$('#input').on('change', function() {
    // Your code goes here!
    var val = $('#input').val();
    var h1 = $('.articles').children('h1');
    h1.text(val);
});
// ======================================================================================


/*
Programming Quiz Solution: Removing DOM Elements

For this quiz, remove the <ul> from the first article item!

You must use jQuery's remove() method.
*/

// Your code goes here!
var articleItems = $('.article-list').find('ul');
articleItems.remove('ul');
// ======================================================================================


/*
Programming Quiz Solution: Iterating with Each

For this quiz, use jQuery's each() method to iterate through the <p>s,
calculate the length of each one, and add each length to the end of each <p>.

Also, make sure you don't change the text inside each <p> except to add the length, otherwise your
length numbers won't be correct!
*/

// Your code goes here!
function numberAdder() {
    var text = $(this).text();
    var number = text.length;
    $(this).text(text + " " + number);
}

$('p').each(numberAdder);
// ======================================================================================


/*
For this quiz, use jQuery to set up an event listener. Your event listener must:
    1. listen to the #my-button element
    2. listen for a `click` event
    3. perform the following actions when the button is clicked:
        a. remove the #my-button element from the DOM
        b. add the `success` class to the body
*/

// Your code goes here!
$('#my-button').on('click', function () {
    $(this).remove();
    $('body').addClass('success');
});
// ======================================================================================
