/*
Programming Quiz Solution: First-Class Functions

Declare a function named `higherOrderFunction` that takes no arguments,
and returns an anonymous function.

The returned function itself takes no arguments as well, and simply
returns the number 8.

*/

// jshint -W104
const higherOrderFunction = function () {
    return function () {
        return 8;
    };
};
// ======================================================================================


/*
Programming Quiz Solution: Array Maps

Using the musicData array and map():
  - Return a string for each item in the array in the following format:
    <album-name> by <artist> sold <sales> copies
  - Store the returned data in a new albumSalesStrings variable

Note:
  - Do not delete the musicData variable
  - Do not alter any of the musicData content
  - Do not format the sales number; leave it as a long string of digits
 */

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording',
      name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];

const albumSalesStrings = musicData.map(function (elem) {
    return elem.name + " by " + elem.artist + " sold " + elem.sales + " copies";
});

console.log(albumSalesStrings);
// ======================================================================================


/*
Programming Quiz Solution: Arrays filter()

 Using the musicData array and filter():
   - Return only album objects where the album's name is
     10 characters long, 25 characters long, or anywhere in between
   - Store the returned data in a new `results` variable

 Note:
   - Do not delete the musicData variable
   - Do not alter any of the musicData content
*/

const musicDatafilter = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording',
      name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];

const results = musicDatafilter.filter(function (elem) {
    return (elem.name.length >= 10 & elem.name.length <= 25);
});

console.log(results);
// ======================================================================================


/*
Programming Quiz Solution: Closures

Declare a function named `expandArray()` that:

- Takes no arguments
- Contains a single local variable, `myArray`, which points to [1, 1, 1]
- Returns an anonymous function that directly modifies `myArray` by appending another `1` into it
- The returned function then returns the value of `myArray`

*/

function expandArray() {
    var myArray = [1, 1, 1];
    return function () {
        myArray.push(1);
        return myArray;

    };
}

console.log(expandArray()());
// ======================================================================================


/*
Programming Quiz Solution: Invoking Object Methods

Create an object called `chameleon` with two properties:

1. `color`, whose value is initially set to 'green' or 'pink'
2. `changeColor`, a function which changes `chameleon`'s `color` to 'pink' if it is 'green', or to 'green' if it is 'pink'

*/

var chameleon = {
    color: "green",
    changeColor: function () {
        this.color == "green" ? this.color = "pink" : this.color = "green";
    }
};
// ======================================================================================
