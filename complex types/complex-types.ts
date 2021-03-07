// complex types - objects, arrays
// mapped types, recursive types, conditional types, index accessible types, union types and generic types

// Objects - An object is an instance which contains set of key value pairs
type flowers = 'Daisy' | 'Tulip';
// let blooms: Flowers = 'Daisy';  // blooms must be one of the values of Flowers - this will pass
let blooms: Flowers = 'Sunflower'; //  errors Type '"Sunflower"' is not assignable to type 'Flowers'

type PlantDetails = {name: string, colour: string, petals: number, bulb: boolean};
let plant1: PlantDetails = {name: 'Rose', colour: 'pink', petals: 5, bulb: false };  // properties are the same as PlantDetails
let plant2: PlantDetails = {name: 'Rose', colour: 'pink', petals: 5, bulb: false, plantout: 'winter' };
 // error - not assignable as there is no plantout in PlantDetails
let plant3: PlantDetails = {name: 'Rose', colour: 'pink', petals: 5 }; // error missing bulb and bulb is not optional
// type PlantDetails = {name: string, colour: string, petals: number, bulb?: boolean}; - will pass if optional
let plant4: PlantDetails = {name: 'Rose', colour: 'pink', petals: '5', bulb: false }; // error Type 'string' is not assignable to type 'number'

// anonymous object type - bud passed as parameters to a function
var price = function stems(bud: {name:string; price:number}) {
    return "A " + bud.name + " costs " + bud.price + " pounds.";
};
price({name:'Rose', price: 2});  //bud is not used in parameter definition - hover over price shows bud defined in function

// interface
interface Buds {    //  interface name in uppercase
    name: string;
    price: number;
}
function singleStemCost(buds: Buds) {  // interface is passes through as the definition of the parameter
    return "A single" + buds.name + " costs " + buds.price + " pounds.";
}
singleStemCost({name:'Lilly', price: 5});       // ok
singleStemCost({name:'Lilly', price: 'ten'});   // errors as interface Type 'string' is not assignable to type 'number'

// type alias
type Tree = {   //  alias name in uppercase
    name: string;
    height: number;
};
function howTall(tree: Tree) {   // type alias is passes through as the definition of the parameter
    return "A " + tree.name + " tree grows a maximum of " + tree.height + "meters trall.";
}
howTall({name:'Pine', height: 63});


// Arrays
// One dimensional array of flower names
let flowers1: string[] = ['Daisy', 'Tulip', 'Sunflower'];
// Generic type for one-dimentional array
let flowers2: Array<string> = ['Daisy', 'Tulip', 'Sunflower'];
// trying to push any type other than a string will error
flowers2.push(12345);   // error Argument of type 'number' is not assignable to parameter of type
flowers2.push(true);    // error Argument of type 'boolean' is not assignable to parameter of type
flowers2.push('Rose');  // ok


// multi dimentional array
let flowers: string[] = ['Daisy', 'Tulip', 'Sunflower'];
let trees: string[] = ['Oak', 'Pine'];
let plants: string[][] = [flowers];
//pushing a one dimentional array into a two dimential array
plants.push(trees)  // will result in [['Daisy', 'Tulip', 'Sunflower'],['Oak', 'Pine']]

// empty two dimentional array initialisation
let plants: string[][] = [];  // empty array will not generate an error
plants.push('Daisy') // will console.log as  ['Daisy']
plants.push(['Daisy', 'Sweetpeas']);
plants.push(['Birch']);
// will console.log as  [['Daisy', 'Sweetpeas'],['Birch']]
plants.push([5,6,7]); // error Type 'number' is not assignable to type 'string'

// tuple - an array that has a fixed size of similar or different element types arranged in a particular sequence.
let plant: string[] = ['Name', 'FlowerColour', 'SizeInCm', 'GrownFromBulb']; // array
let greenThings: [string, string, number, boolean] = ['Daffodile', 'yellow', 30, true] // tuple
// anotated tuple - position assignment 
greenThings[3] = 1; // Errors as type in position is boolean. Type 'number' is not assignable to type 'boolean'
// tuple array assignment
let newGreenThings: string[] = ['Turnip', 'Vegetable'];
greenThings = newGreenThings; // Error as newGreenThings Type 'string[]' is not assignable to type greenThings '[string, string, number, boolean]'.

// array inference - when an aarray variable is declared without a type, typescript infers it from the values.
let vegProperties = ['Carrot', 'Root', 1, true]
vegProperties[3] = 'One per seed';   // no error as a rray is expandable
// console logs as ['Carrot', 'Root', 1, true,'One per seed'];

// array inference on a tuple with .concat() - this will produce a new array and leave old one as is
const vegInTheFridge: [string, number, boolean] = ['Carrotts', 3, true]
//  .concat to create new array
let addToVegInTheFridge = vegInTheFridge.concat(['Potatoes', '1 Bag'])
//console.log(vegInTheFridge) will show ['Carrotts', 3, true]
//console.log(addToVegInTheFridge) will show ['Carrotts', 3, true, 'Potatoes', '1 Bag']


// rest parameter of array in a function has type of any[]
const sumTheValues = (...listOfValues): number => {  // errors Rest parameter 'flowers' implicitly has an 'any[]' type
//const sumTheValues = (...listOfValues: number[]): number => {  // ok
    let sum= 0;
    for(let i = 0; i > flowers.length; i++) {
        sum += listOfValues[i];
    }
    return sum;
}

const sumTheValues = (...listOfValues: number[]): number => {  // ok
let sum= 0;
for(let i = 0; i > flowers.length; i++) {
    sum += listOfValues[i];
}
return sum;
}
console.log(sumTheValues(2, 4, 7))  // will return 13
console.log(sumTheValues(2, 4, 7, '10'))  // Errors Argument of type 'string' is not assignable to parameter of type 'number'.


// and many more on this link
// https://www.codecademy.com/learn/learn-typescript/modules/learn-typescript-complex-types/cheatsheet


//interfacing from a shape

// interface Flowers {
//     name: string;  // the compiler checks only the property
//     colour?: string;  // Optional property
//     readonly petals: number;  // readonly property - can not be changed
//     readonly typeOfRootstock: { ownRoot: boolean, type?: string} // property typeOfrootstock can not be rewritten to
// }

// function nameAFlower( nameOfFlower: Flowers) {
//     console.log(nameOfFlower.name)              // (property) Flowers.name: string
//     console.log('Colour' + nameOfFlower.color)  // compiler will erreor if property in not in the interface
//     // and try and provide a solution Property 'color' does not exist on type 'Flowers'. Did you mean 'colour'?
//     nameOfFlower.petals = 7;  // Errors with Cannot assign to 'petals' because it is a read-only property.
//     nameOfFlower.typeOfRootstock.ownRoot = false;  // properties within readonly property can be changed.
//     nameOfFlower.typeOfRootstock.type = 'Dr Huey'  
// }

// let aFlower = {name: 'Rose', colour: 'Pink', petals: 5, typeOfRootstock: {ownRoot: true}}
// nameAFlower(aFlower);   //  let aFlower: {name: string; colour: string;} 


// interfaces are used to extend types
interface Plants {
    name: string;
    flowers: boolean;
    country: string;
}
interface Flowers {
    id: string;  // the compiler checks only the property
    colour: string;  // Optional property
}

//  Extending origional interface with additional interface - new fields are added
interface Flowers extends Plants {
    id: string;
    colour: string;
  }

// extending an interface from multiple types and creating a new type
interface Flowers2 extends Plants, Flowers {};
const test: Flowers2 = {
    name: 'Pear Tree',   //  in any order
    flowers: true,
    id: '1',
    colour: 'white',
    country: 'England',
    leaves: 'lots',   // error not in Plants or Flowers
} 
function nameTheFauna(fauna: Plants & Flowers) {
    console.log('The ' +  fauna.name + ' has ' + fauna.colour + ' flowers.')
}
nameTheFauna({name: 'Pear Tree', 
    flowers: true,
    id: '1',
    colour: 'white',
    country: 'England',
 });
 nameTheFauna(test);  // even though test has an error it doesn't error when calling the function?

// interfaces can intersect to build a new type
type allFauna = Plants & Flowers;
function nameAllTheFauna(fauna: allFauna) {
    console.log('The ' +  fauna.name + ' has ' + fauna.colour + ' flowers.')
}
nameAllTheFauna({name: 'Pear Tree', flowers: true,id: '1',colour: 'white',country: 'England',});
