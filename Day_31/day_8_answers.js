/*
Programming Quiz Solution: Using Sets

Create the following variables:
    - uniqueFlavors and set it to a new WeakSet object
    - flavor1 and set it equal to `{ flavor: 'chocolate' }`
    - flavor2 and set it equal to an object with property 'flavor' and value of your choice!

Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`
Use the `.add()` method to add the `flavor1` object (again!) to the `uniqueFlavors` set
*/

let flavor1 = { flavor: 'chocolate' };
let flavor2 = { flavor: 'chocolate' };

const uniqueFlavors = new WeakSet();
uniqueFlavors.add(flavor1);
uniqueFlavors.add(flavor2);
uniqueFlavors.add(flavor1);

console.log(uniqueFlavors);
// ======================================================================================
