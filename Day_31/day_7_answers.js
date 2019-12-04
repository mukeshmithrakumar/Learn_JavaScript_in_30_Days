/*
Programming Quiz Solution: Build an HTML Fragment
*/

const cheetah = {
    name: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    lifespan: '10-12 years',
    speed: '68-75 mph',
    diet: 'carnivore',
    summary: 'Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.',
    fact: 'Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth.'
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
    const cardHTML = `<div class="card">
        <h3 class="name"> ${animal.name} </h3>
        <img src="${animal.name}.jpg" alt=" ${animal.name}" class="picture">
        <div class="description">
            <p class="fact"> ${animal.fact} </p>
            <ul class="details">
                <li><span class="bold">Scientific Name</span>: ${animal.scientificName} </li>
                <li><span class="bold">Average Lifespan</span>: ${animal.lifespan} </li>
                <li><span class="bold">Average Speed</span>: ${animal.speed} </li>
                <li><span class="bold">Diet</span>: ${animal.diet} </li>
            </ul>
            <p class="brief"> ${animal.summary} </p>
        </div>
    </div>`;

    return cardHTML;
}

console.log(createAnimalTradingCardHTML(cheetah));
// ======================================================================================


/*
Programming Quiz Solution: Writing a For...of Loop
*/

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Your code goes here
for (const day of days) {
    // The charAt() method returns the character at the specified index in a string
    // The slice() method extracts parts of a string and returns the extracted parts in a new string
    console.log(day.charAt(0).toUpperCase() + day.slice(1));
}
// ======================================================================================


/*
Programming Quiz Solution: Using the Rest Parameter
*/

// Your code goes here

function average(...nums) {
    let total = 0;
    if (nums.length !== 0) {
        for (const num of nums) {
            total += num;
        }
        return total / nums.length;
    } else {
        return 0;
    }
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());
// ======================================================================================


/*
Programming Quiz Solution: Convert Function into an Arrow Function
*/

// convert to an arrow function
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(square => square * square);
console.log(...squares);
// ======================================================================================


/*
Programming Quiz Solution: Using Default Function Parameters
*/

// Your code goes here
function buildHouse({floors=1, color="red", walls="brick"} = {}) {
    return `Your house has ${floors} floor(s) with ${color} ${walls} walls.`;
}

console.log(buildHouse());
console.log(buildHouse({}));
console.log(buildHouse({floors: 3, color: 'yellow'}));
// ======================================================================================


/*
Programming Quiz Solution: Building Classes and Subclasses
*/

class Vehicle {
	constructor(color = 'blue', wheels = 4, horn = 'beep beep') {
		this.color = color;
		this.wheels = wheels;
		this.horn = horn;
	}

	honkHorn() {
		console.log(this.horn);
	}
}

// your code goes here
class Bicycle extends Vehicle {
    constructor(color = 'blue', wheels = 2, horn = 'beep beep') {
        super(color, wheels, horn);
        this.wheels = 2;
        this.horn = "honk honk";
    }
}

const myVehicle = new Vehicle();
myVehicle.honkHorn();
const myBike = new Bicycle();
myBike.honkHorn();
// ======================================================================================
