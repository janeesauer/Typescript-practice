// complex types - objects, arrays
// mapped types, recursive types, conditional types, index accessible types, union types and generic types

// Objects - An object is an instance which contains set of key value pairs
type Flowers = 'Daisy' | 'Tulip';
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
singleStemCost({name:'Lilly', price: 5});
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
// One dimensional array
// Generic type for one-dimentional array
// multi dimentional array
// empty array
// tuple
// anotated tuple
// tuple array assignment
// array inference (it infere is to deduce)
// array inference on a tuple with .concat()
//
// Object
// alias
// function type alias

// and many more on this link
// https://www.codecademy.com/learn/learn-typescript/modules/learn-typescript-complex-types/cheatsheet