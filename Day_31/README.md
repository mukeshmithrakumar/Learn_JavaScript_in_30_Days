<h1>Tensorflow JS</h1>

from [Tensorflow JS](https://www.tensorflow.org/js)

Go through tensorflow library (https://www.tensorflow.org/js/tutorials)

Next 10 days, let's work on two to five web machine learning apps.




<h1>Exercises</h1>

from [JavaScript String](https://www.w3resource.com/javascript-exercises/javascript-string-exercises.php)


================================================================

Write a JavaScript function to check whether an `input` is a string or not.

Test Data :
console.log(is_string('w3resource'));
true
console.log(is_string([1, 2, 4, 0]));
false


================================================================

Write a JavaScript function to split a string and convert it into an array of words.

Test Data :
console.log(string_to_array("Robin Singh"));
["Robin", "Singh"]


================================================================

Write a JavaScript function to convert a string in abbreviated form.

Test Data :
console.log(abbrev_name("Robin Singh"));
"Robin S."


================================================================

Write a JavaScript function to parameterize a string.

Test Data :
console.log(string_parameterize("Robin Singh from USA."));
"robin-singh-from-usa"


================================================================

Write a JavaScript function to capitalize the first letter of each word in a string.

Test Data :
console.log(capitalize_Words('js string exercises'));
"Js String Exercises"


================================================================

Write a JavaScript function to insert a string within a string at a particular position (default is 1).

Test Data :
console.log(insert('We are doing some exercises.'));
console.log(insert('We are doing some exercises.','JavaScript '));
console.log(insert('We are doing some exercises.','JavaScript ',18));
"We are doing some exercises."
"JavaScript We are doing some exercises."
"We are doing some JavaScript exercises."


================================================================

Write a JavaScript function to escape a HTML string.

Test Data :
console.log(escape_HTML('<a href="javascript-string-exercise-17.php" target="_blank">'));
Output :
"&lt;a href=&quot;javascript-string-exercise-17.php&quot; target=&quot;_blank&quot;&gt;"



================================================================

Write a JavaScript function to repeat a string a specified times.

Test Data :
console.log(repeat_string('a', 4));
console.log(repeat_string('a'));
Output :
"aaaa"
"Error in string or count."


================================================================

Write a JavaScript function to find a word within a string.

Test Data :
console.log(search_word('The quick brown fox', 'fox'));
console.log(search_word('aa, bb, cc, dd, aa', 'aa'));
Output :
"'fox' was found 1 times."
"'aa' was found 2 times."


================================================================

Write a JavaScript function to remove non-word characters.

Test Data :
console.log(remove_non_word('PHP ~!@#$%^&*()+`-={}[]|\\:";\'/?><., MySQL'));
"PHP - MySQL"


================================================================

Write a JavaScript function to remove HTML/XML tags from string.

Test Data :
console.log(strip_html_tags('<p><strong><em>PHP Exercises</em></strong></p>'));
"PHP Exercises"


================================================================

Write a JavaScript function to create a case-insensitive search.

Test Data :
console.log(case_insensitive_search('JavaScript Exercises', 'exercises'));
"Matched"
console.log(case_insensitive_search('JavaScript Exercises', 'Exercises'));
"Matched"
console.log(case_insensitive_search('JavaScript Exercises', 'Exercisess'));
"Not Matched"


================================================================

Write a JavaScript function to Uncapitalize the first letter of each word of a string.

Test Data :
console.log(unCapitalize_Words('Js String Exercises'));
"js string exercises"


================================================================

Write a JavaScript function to test whether the character at the provided (character) index is upper case.

Test Data :
console.log(isUpperCaseAt('Js STRING EXERCISES', 1));
false


================================================================

Write a JavaScript function to test whether a string ends with a specified string.

Test Data :
console.log(endsWith('JS string exercises', 'exercises'));
true


================================================================

Write a JavaScript function to get unique guid (an acronym for 'Globally Unique Identifier?) of the specified length, or 32 by default.

Test Data :
console.log(guid());
console.log(guid(15));
"hRYilcoV7ajokxsYFl1dba41AyE0rUQR"
"b7pwBqrZwqaDrex"


================================================================




<h1>Exercises</h1>

from [10 Days of Javascript](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript)


================================================================

[Day 4: Create a Rectangle Object](https://www.hackerrank.com/challenges/js10-objects/problem)


================================================================

[Day 4: Count Objects](https://www.hackerrank.com/challenges/js10-count-objects/problem)


================================================================

[Day 4: Classes](https://www.hackerrank.com/challenges/js10-class/problem)


================================================================

[Day 5: Inheritance](https://www.hackerrank.com/challenges/js10-inheritance/problem)


================================================================

[Day 5: Template Literals](https://www.hackerrank.com/challenges/js10-template-literals/problem)


================================================================

[Day 5: Arrow Functions](https://www.hackerrank.com/challenges/js10-arrows/problem)


================================================================

[Day 6: Bitwise Operators](https://www.hackerrank.com/challenges/js10-bitwise/problem)


================================================================

[Day 6: JavaScript Dates](https://www.hackerrank.com/challenges/js10-date/problem)


================================================================

[Day 7: Regular Expressions I](https://www.hackerrank.com/challenges/js10-regexp-1/problem)


================================================================

[Day 7: Regular Expressions II](https://www.hackerrank.com/challenges/js10-regexp-2/problem)


================================================================

[Day 7: Regular Expressions III](https://www.hackerrank.com/challenges/js10-regexp-3/problem)


================================================================

[Day 8: Create a Button](https://www.hackerrank.com/challenges/js10-create-a-button)


================================================================

[Day 8: Buttons Container](https://www.hackerrank.com/challenges/js10-buttons-container)


================================================================

[Day 9: Binary Calculator](https://www.hackerrank.com/challenges/js10-binary-calculator)


================================================================



<h1>Exercises</h1>

from [JavaScript array](https://www.w3resource.com/javascript-exercises/javascript-array-exercises.php)


================================================================

Write a JavaScript function to check whether an `input` is an array or not.

Test Data :
console.log(is_array('w3resource'));
console.log(is_array([1, 2, 4, 0]));
false
true


================================================================

Write a JavaScript function to clone an array.

Test Data :
console.log(array_Clone([1, 2, 4, 0]));
console.log(array_Clone([1, 2, [4, 0]]));
[1, 2, 4, 0]
[1, 2, [4, 0]]


================================================================

Write a JavaScript function to get the last element of an array. Passing a parameter 'n' will return the last 'n' elements of the array.

Test Data :
console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2],3));
console.log(last([7, 9, 0, -2],6));
Expected Output :
-2
[9, 0, -2]
[7, 9, 0, -2]


================================================================

Write a JavaScript program which accept a number as input and insert dashes (-) between each two even numbers. For example if you accept 025468 the output should be 0-254-6-8.


================================================================

Write a JavaScript program to find the most frequent item of an array.

Sample array : var arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
Sample Output : a ( 5 times )


================================================================

Write a JavaScript program which prints the elements of the following array.

Note : Use nested for loops.
Sample array : var a = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];
Sample Output :
"row 0"
" 1"
" 2"
" 1"
" 24"
"row 1"


================================================================

Write a JavaScript program to compute the sum and product of an array of integers.


================================================================

Write a JavaScript program to remove duplicate items from an array (ignore case sensitivity).


================================================================

Find the leap years in a given range of years.


================================================================

Write a JavaScript program to perform a binary search.

Note : A binary search or half-interval search algorithm finds the position of a specified input value within an array sorted by key value.
Sample array :
var items = [1, 2, 3, 4, 5, 7, 8, 9];
Expected Output :
console.log(binary_Search(items, 1)); //0
console.log(binary_Search(items, 5)); //4


================================================================

Write a JavaScript program to flatten a nested (any depth) array. If you pass shallow, the array will only be flattened a single level.

Sample Data :
console.log(flatten([1, [2], [3, [[4]]],[5,6]]));
[1, 2, 3, 4, 5, 6]
console.log(flatten([1, [2], [3, [[4]]],[5,6]], true));
[1, 2, 3, [[4]], 5, 6]


================================================================

Write a JavaScript program to find a pair of elements (indices of the two numbers) from an given array whose sum equals a specific target number.

Input: numbers= [10,20,10,40,50,60,70], target=50
Output: 2, 3


================================================================

Write a JavaScript function to find the longest common starting substring in a set of strings.

Sample array : console.log(longest_common_starting_substring(['go', 'google']));
Expected result : "go"


================================================================

Write a JavaScript function to merge two arrays and removes all duplicates elements.

Test data :
var array1 = [1, 2, 3];
var array2 = [2, 30, 1];
console.log(merge_array(array1, array2));
[3, 2, 30, 1]


================================================================

Write a JavaScript function to get nth largest element from an unsorted array.

Test Data :
console.log(nthlargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4));
89


================================================================

Write a JavaScript function to move an array element from one position to another.

Test Data :
console.log(move([10, 20, 30, 40, 50], 0, 2));
[20, 30, 10, 40, 50]
console.log(move([10, 20, 30, 40, 50], -1, -2));
[10, 20, 30, 50, 40]


================================================================

Write a JavaScript function to find the unique elements from two arrays.

Test Data :
console.log(difference([1, 2, 3], [100, 2, 1, 10]));
["1", "2", "3", "10", "100"]
console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
["1", "2", "3", "4", "5", "6"]
console.log(difference([1, 2, 3], [100, 2, 1, 10]));
["1", "2", "3", "10", "100"]


================================================================




<h1>Exercises</h1>

from [JavaScript Object](https://www.w3resource.com/javascript-exercises/javascript-object-exercises.php)


================================================================

Write a JavaScript program to list the properties of a JavaScript object.

Sample object:
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };
Sample Output: name,sclass,rollno


================================================================

Write a JavaScript program to delete the rollno property from the following object. Also print the object before or after deleting the property.

Sample object:
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };


================================================================

Write a JavaScript program to get the length of an JavaScript object.

Sample object :
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };


================================================================

Write a JavaScript function to get a copy of the object where the keys have become the values and the values the keys.


================================================================

Write a JavaScript function to check if an object contains given property.


================================================================

Write a JavaScript function to check whether a given value is a DOM element.

================================================================

[Day 0: Data Types](https://www.hackerrank.com/challenges/js10-data-types/problem)


================================================================

[Day 1: Arithmetic Operators](https://www.hackerrank.com/challenges/js10-arithmetic-operators/problem)


================================================================

[Day 1: Functions](https://www.hackerrank.com/challenges/js10-function/problem)


================================================================

[Day 1: Let and Const](https://www.hackerrank.com/challenges/js10-let-and-const/problem)


================================================================

[Day 2: Conditional Statements: If-Else](https://www.hackerrank.com/challenges/js10-if-else/problem)


================================================================

[Day 2: Conditional Statements: Switch](https://www.hackerrank.com/challenges/js10-switch/problem)


================================================================

[Day 2: Loops](https://www.hackerrank.com/challenges/js10-loops/problem)


================================================================

[Day 3: Arrays](https://www.hackerrank.com/challenges/js10-arrays/problem)


================================================================

[Day 3: Try, Catch, and Finally](https://www.hackerrank.com/challenges/js10-try-catch-and-finally/problem)


================================================================

[Day 3: Throw](https://www.hackerrank.com/challenges/js10-throw/problem)


================================================================



<h1>Exercises</h1>

from [JavaScript conditional statements and loops](https://www.w3resource.com/javascript-exercises/javascript-conditional-statements-and-loops-exercises.php)


================================================================

Write a JavaScript program that accept two integers and display the larger.


================================================================

Write a JavaScript conditional statement to find the sign of product of three numbers. Display an alert box with the specified sign.

Sample numbers : 3, -7, 2
Output : The sign is -


================================================================

Write a JavaScript conditional statement to sort three numbers. Display an alert box to show the result.

Sample numbers : 0, -1, 4
Output : 4, 0, -1


================================================================

Write a JavaScript conditional statement to find the largest of five numbers. Display an alert box to show the result.

Sample numbers : -5, -2, -6, 0, -1
Output : 0


================================================================

Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will check if the current number is odd or even, and display a message to the screen.

Sample Output :
"0 is even"
"1 is odd"
"2 is even"


================================================================

Write a JavaScript program which iterates the integers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".


================================================================

According to Wikipedia a happy number is defined by the following process :
"Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers (or sad numbers)".
Write a JavaScript program to find and print the first 5 happy numbers.


================================================================

Write a JavaScript program to find the armstrong numbers of 3 digits.

Note : An Armstrong number of three digits is an integer such that the sum of the cubes of its digits is equal to the number itself. For example, 371 is an Armstrong number since 3**3 + 7**3 + 1**3 = 371.


================================================================

Write a JavaScript program to compute the greatest common divisor (GCD) of two positive integers.


================================================================

Write a JavaScript program to sum the multiples of 3 and 5 under 1000.


================================================================


<h1>Exercises</h1>

from [JavaScript Math](https://www.w3resource.com/javascript-exercises/javascript-math-exercises.php)


================================================================

Write a JavaScript function to convert a number from one base to another.

Note : Both bases must be between 2 and 36.
Test Data :
console.log(base_convert('E164',16,8));
console.log(base_convert(1000,2,8));
"160544"
"10"


================================================================

Write a JavaScript function to convert a decimal number to binary, hexadecimal or octal number.

Test Data :
console.log(dec_to_bho(120,'B'));
console.log(dec_to_bho(120,'H'));
console.log(dec_to_bho(120,'O'));
"1111000"
"78"
"170"


================================================================

Write a JavaScript function to format a number up to specified decimal places.

Test Data :
console.log(decimals(2.100212, 2));
console.log(decimals(2.100212, 3));
console.log(decimals(2100, 2));
"2.10"
"2.100"
"2100.00"


================================================================

Write a JavaScript function to find the lowest value in an array.

Test Data :
console.log(min([12,34,56,1]));
console.log(min([-12,-34,0,-56,-1]));
1
-56


================================================================

Write a JavaScript function to find the GCD (greatest common divisor) of more than 2 integers.

Test Data :
console.log(gcd_more_than_two_numbers([3,15,27]));
console.log(gcd_more_than_two_numbers([5,10,15,25]));
Output :
3
5


================================================================

Write a JavaScript function to check whether a value is an integer or not.

Note : Integer - A number which is not a fraction; a whole number.
Test Data :
console.log(is_Int(23));
console.log(is_Int(4e2));
console.log(is_Int(NaN));
console.log(is_Int(23.75));
console.log(is_Int(-23));
Output :
true
true
false
false
true


================================================================

Write a JavaScript program to evaluate binomial coefficients.

Note :
Binomial coefficient : According to Wikipedia - In mathematics, binomial coefficients are a family of positive integers that occur as coefficients in the binomial theorem. They are indexed by two nonnegative integers; the binomial coefficient indexed by n and k. Under suitable circumstances the value of the coefficient is given by the expression :
binomial coefficients
Arranging binomial coefficients into rows for successive values of n, and in which k ranges from 0 to n, gives a triangular array called Pascal's triangle.

Test Data :
console.log(binomial(8,3));
console.log(binomial(10,2));
Output :
56
45


================================================================

from [JavaScript Date](https://www.w3resource.com/javascript-exercises/javascript-date-exercises.php)


================================================================

Write a JavaScript function to compare dates (i.e. greater than, less than or equal to).

Test Data :
console.log(compare_dates(new Date('11/14/2013 00:00'), new Date('11/14/2013 00:00')));
console.log(compare_dates(new Date('11/14/2013 00:01'), new Date('11/14/2013 00:00')));
console.log(compare_dates(new Date('11/14/2013 00:00'), new Date('11/14/2013 00:01')));
Output :
"Date1 = Date2"
"Date1 > Date2"
"Date2 > Date1"


================================================================

Write a JavaScript function to test whether a date is a weekend.

Note : Use standard Saturday/Sunday definition of a weekend.
Test Data :
console.log(is_weekend('Nov 15, 2014'));
console.log(is_weekend('Nov 16, 2014'));
console.log(is_weekend('Nov 17, 2014'));
Output :
"weekend"
"weekend"
undefined


================================================================

Write a JavaScript function to get the maximum date from an array of dates.

Test Data :
console.log(max_date(['2015/02/01', '2015/02/02', '2015/01/03']));
Output :
"2015/02/02"


================================================================

Write a JavaScript function to convert a Unix timestamp to time.

Test Data :
console.log(days_passed(new Date(2015, 0, 15)));
15
console.log(days_passed(new Date(2015, 11, 14)));
348


================================================================

Write a JavaScript function to get a textual representation of a day (three letters, Mon through Sun).

Test Data :
dt = new Date(2015, 10, 1);
console.log(short_Days(dt));
"Sun"


================================================================

Write a JavaScript function to get lowercase Ante meridiem and Post meridiem.


================================================================

Write a JavaScript function to get Timezone.

Test Data :
dt = new Date();
console.log(seconds_with_leading_zeros(dt));
"India Standard Time"


================================================================

Write a JavaScript function to add specified weeks to a date.

Test Data :
dt = new Date(2014,10,2);
console.log(add_weeks(dt, 10).toString());
Output :
"Sun Jan 11 2015 00:00:00 GMT+0530 (India Standard Time)"


================================================================

Write a JavaScript function to get time differences in minutes between two dates.

Test Data :
dt1 = new Date("October 13, 2014 11:11:00");
dt2 = new Date("October 13, 2014 11:13:00");
console.log(diff_minutes(dt1, dt2));
2


================================================================

Write a JavaScript function to get time differences in years between two dates.

Test Data :
dt1 = new Date("June 13, 2014 08:11:00");
dt2 = new Date("October 19, 2017 11:13:00");
console.log(diff_years(dt1, dt2));
3


================================================================



<h1>Exercises</h1>

from [JavaScript functions](https://www.w3resource.com/javascript-exercises/javascript-functions-exercises.php)


================================================================

Write a JavaScript function that reverse a number.

Example x = 32243;
Expected Output : 34223


================================================================

Write a JavaScript function that generates all combinations of a string.

Example string : 'dog'
Expected Output : d,do,dog,o,og,g


================================================================

Write a JavaScript function that returns a passed string with letters in alphabetical order.

Example string : 'webmaster'
Expected Output : 'abeemrstw'
Assume punctuation and numbers symbols are not included in the passed string.


================================================================

Write a JavaScript function that accepts a string as a parameter and find the longest word within the string.

Example string : 'Web Development Tutorial'
Expected Output : 'Development'


================================================================

Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string.

Note : As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here.
Example string : 'The quick brown fox'
Expected Output : 5


================================================================

Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.

Note : A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.


================================================================

Write a JavaScript function to compute the factors of a positive integer.


================================================================

Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result.


================================================================

Write a JavaScript function to extract unique characters from a string.

Example string : "thequickbrownfoxjumpsoverthelazydog"
Expected Output : "thequickbrownfxjmpsvlazydg"


================================================================

Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string.

Sample arguments : 'w3resource.com', 'o'
Expected output : 2


================================================================

Write a JavaScript function to apply Bubble Sort algorithm.

Note : According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order".
Sample array : [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
Expected output : [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]


================================================================





<h1>Exercises</h1>

from [JavaScript Exercises Github](https://github.com/appalaszynski/javascript-exercises)


================================================================

/**
 * Fib
 *
 * Write a function which print out the n-th entry in the fibonacci series.
 * The fibonacci series is an ordering of numbers where
 * each number is the sum of the preceeding two.
 * Example sequence: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * Examples:
 * fib(4) === 3
 * fib(15) === 610
 */

function fib(n) {

}

module.exports = fib;


================================================================

/**
 * Matrix Spiral
 *
 * Write a function that accepts an integer N
 * and returns a NxN spiral matrix.
 *
 * Examples:
 * matrix(2) = [[1, 2],
 *              [4, 3]]
 *
 * matrix(3) = [[1, 2, 3],
 *              [8, 9, 4],
 *              [7, 6, 5]]
 *
 * matrix(4) = [[1,   2,  3, 4],
 *              [12, 13, 14, 5],
 *              [11, 16, 15, 6],
 *              [10,  9,  8, 7]]
 */

function matrix(n) {

}

module.exports = matrix;


================================================================

/**
 * Max Char
 *
 * For given string return the character that is most
 * commonly used in the string.
 *
 * Examples:
 * maxChar("abcccccccd") === "c"
 * maxChar("apple 1231111") === "1"
 */

function maxChar(str) {

}

module.exports = maxChar;


================================================================

/**
 * Pyramid
 *
 * Write a function that accepts a positive number N.
 * The function should print a pyramid shape
 * with N levels using the # character.
 *
 * Examples:
 * pyramid(1) = '#'
 *
 * pyramid(2) = ' # '
 *              '###'
 *
 * pyramid(3) = '  #  '
 *              ' ### '
 *              '#####'
 */

function pyramid(n) {

}

module.exports = pyramid;


================================================================

/**
 * Queue
 *
 * Create a queue data structure. The queue
 * should be a class with methods 'add' and 'remove'.
 * Adding to the queue should store an element until
 * it is removed.
 *
 * Examples:
 * const q = new Queue();
 * q.add(1);
 * q.remove(); // returns 1
 */

class Queue {

}

module.exports = Queue;


================================================================

/**
 * Stack
 *
 * Create a stack data structure. The stack
 * should be a class with methods 'push', 'pop', and
 * 'peek'.  Adding an element to the stack should
 * store it until it is removed.
 *
 * Examples:
 * const s = new Stack();
 * s.push(1);
 * s.push(2);
 * s.pop(); // returns 2
 * s.pop(); // returns 1
 */

class Stack {

}

module.exports = Stack;


================================================================

/**
 * Queue From Stacks
 *
 * Implement a Queue datastructure using two stacks.
 * *Do not* create an array inside of the 'Queue' class.
 * Queue should implement the methods 'add', 'remove', and 'peek'.
 * For a reminder on what each method does, look back
 * at the Queue exercise.
 *
 * Examples:
 * const q = new Queue();
 * q.add(1);
 * q.add(2);
 * q.peek();  // returns 1
 * q.remove(); // returns 1
 * q.remove(); // returns 2
 */

const Stack = require('./stack');

class Queue {

}

module.exports = Queue;


================================================================

/**
 * Steps
 *
 * Write a function that accepts a positive number N.
 * The function should prints a step shape
 * with N levels using the '#' character.
 *
 * Examples:
 * steps(2) = '# '
 *            '##'
 *
 * steps(3) = '#  '
 *            '## '
 *            '###'
 *
 * steps(4) = '#   '
 *            '##  '
 *            '### '
 *            '####'
 */

function steps(n) {

}

module.exports = steps;


================================================================

/**
 * Vowels
 *
 * Write a function which returns number of vowels in given string.
 *
 * Examples:
 * vowels('aeiou') === 5
 * vowels('Adam') === 2
 * vowels('Hello there!') === 4
 */

function vowels(string) {

}

module.exports = vowels;


================================================================

/**
 * Weave
 *
 * Implement the 'weave' function.  Weave
 * receives two queues as arguments and combines the
 * contents of each into a new, third queue.
 * The third queue should contain the *alterating* content
 * of the two queues. The function should handle
 * queues of different lengths without inserting
 * 'undefined' into the new one.
 * *Do not* access the array inside of any queue, only
 * use the 'add', 'remove', and 'peek' functions.
 *
 * Examples:
 * const queueOne = new Queue();
 * queueOne.add(1);
 * queueOne.add(2);
 * const queueTwo = new Queue();
 * queueTwo.add('Hi');
 * queueTwo.add('There');
 * const q = weave(queueOne, queueTwo);
 * q.remove() // 1
 * q.remove() // 'Hi'
 * q.remove() // 2
 * q.remove() // 'There'
 */

const Queue = require('./queue');

function weave(sourceOne, sourceTwo) {

}

module.exports = weave;


================================================================




<h1>Exercises</h1>

from [JavaScript Recursion](https://www.w3resource.com/javascript-exercises/javascript-recursion-functions-exercises.php)


================================================================

Write a JavaScript program to calculate the factorial of a number.

In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 x 4 x 3 x 2 x 1 = 120


================================================================

Write a JavaScript program to find the greatest common divisor (gcd) of two positive numbers.


================================================================

Write a JavaScript program to get the integers in range (x, y).

Example : range(2, 9)
Expected Output : [3, 4, 5, 6, 7, 8]


================================================================

Write a JavaScript program to compute the sum of an array of integers.

Example : var array = [1, 2, 3, 4, 5, 6]
Expected Output : 21


================================================================

Write a JavaScript program to compute the exponent of a number.

Note : The exponent of a number says how many times the base number is used as a factor.
82 = 8 x 8 = 64. Here 8 is the base and 2 is the exponent.


================================================================

Write a JavaScript program to get the first n Fibonacci numbers.

Note : The Fibonacci Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, . . . Each subsequent number is the sum of the previous two.



================================================================

Write a JavaScript program to check whether a number is even or not.


================================================================

Write a JavaScript program for binary search.

Sample array : [0,1,2,3,4,5,6]
console.log(l.br_search(5)) will return '5'


================================================================

Write a merge sort program in JavaScript.

Sample array : [34,7,23,32,5,62]
Sample output : [5, 7, 23, 32, 34, 62]


================================================================



<h1>Exercises</h1>

from [JavaScript Exercises Github](https://github.com/appalaszynski/javascript-exercises)


================================================================

/**
 * Reverse String
 *
 * For given string return a new string
 * with the reversed order of characters.
 *
 * Examples:
 * reverse('apple') === 'elppa'
 * reverse('hello') === 'olleh'
 * reverse('Greetings!') === '!sgniteerG'
 */

function reverse(str) {

}

module.exports = reverse;


================================================================

/**
 * Palindrome
 *
 * For given string return true if the string is a palindrome
 * or false if it is not.
 *
 * Palindromes are strings that form the same word if it is reversed.
 * Include spaces and punctuation in determining if the string
 * is a palindrome.
 *
 * Examples:
 * palindrome("abba") === true
 * palindrome("abcdefg") === false
 */

function palindrome(str) {

}

module.exports = palindrome;


================================================================

/**
 * Reverse Integer
 *
 * For given integer return an integer that is the reverse
 * ordering of numbers.
 *
 * Examples:
 * reverseInt(15) === 51
 * reverseInt(981) === 189
 * reverseInt(500) === 5
 * reverseInt(-15) === -51
 * reverseInt(-90) === -9
 */

function reverse(int) {

}

module.exports = reverse;


================================================================

/**
* Longest Word
*
* Write a function that returns the longest word in the passed sentence.
* If there are two or more words that are the same length, return
* the first word from the string with that length. Ignore punctuation
* and assume sentence will not be empty.
*
* Examples:
* longestWord("Hello there") === "Hello"
* longestWord("My name is Adam") === "name"
* longestWord("fun&!! time") === "time"
*/

function longestWord(sen) {

}

module.exports = longestWord;


================================================================

/**
* Is Even
*
* Determine if given number is even
* without using a mathematic operator ( +, -, %, /, Math, ParseInt etc.)
* nor a conditional operator.
*
* Examples:
* isEven(4) === true
* isEven(3) === false
*/

function isEven(n) {

}

module.exports = isEven;


================================================================

/**
 * Max Char
 *
 * For given string return the character that is most
 * commonly used in the string.
 *
 * Examples:
 * maxChar("abcccccccd") === "c"
 * maxChar("apple 1231111") === "1"
 */

function maxChar(str) {

}

module.exports = maxChar;


================================================================

/**
 * Anagrams
 *
 * Return true of false depends on provided strings are anagrams of eachother.
 * One string is an anagram of another if it uses the same characters
 * in the same quantity. Only consider characters, not spaces
 * or punctuation. Consider capital letters to be the same as lower case.
 *
 * Examples:
 * anagrams('rail safety', 'fairy tales') === true
 * anagrams('RAIL! SAFETY!', 'fairy tales') === true
 * anagrams('Hi there', 'Bye there') === false
 */

function anagrams(stringA, stringB) {

}

module.exports = anagrams;


================================================================

/**
 * Fizz Buzz
 *
 * Write a program that console logs the numbers
 * from 1 to n. But for multiples of three print
 * “fizz” instead of the number and for the multiples
 * of five prints “buzz”. For numbers which are multiples
 * of both three and five print “fizzbuzz”.
 *
 * Example:
 * fizzBuzz(5);
 * console.log(1)
 * console.log(2)
 * console.log('fizz')
 * console.log(4)
 * console.log('buzz')
 */

function fizzBuzz(n) {

}

module.exports = fizzBuzz;


================================================================

/**
 * Array Chunk
 *
 * For given array and chunk size, divide the array into many subarrays
 * where each subarray is of length chunk size.
 *
 * Examples:
 * chunk([1, 2, 3, 4], 2) === [[ 1, 2], [3, 4]]
 * chunk([1, 2, 3, 4, 5], 2) === [[ 1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) === [[ 1, 2, 3], [4, 5, 6], [7, 8]]
 * chunk([1, 2, 3, 4, 5], 4) === [[ 1, 2, 3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 10) === [[ 1, 2, 3, 4, 5]]
 */

function chunk(array, size) {

}

module.exports = chunk;


================================================================

/**
 * Capitalize
 *
 * Write a function that accepts a string. The function should
 * capitalize the first letter of each word in the string then
 * return the capitalized string.
 *
 * Examples:
 * capitalize('a short sentence') === 'A Short Sentence'
 * capitalize('a lazy fox') === 'A Lazy Fox'
 * capitalize('look, it is working!') === 'Look, It Is Working!'
 */

function capitalize(str) {

}

module.exports = capitalize;


================================================================
