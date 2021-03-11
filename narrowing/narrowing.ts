// Links to references
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html
// https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html
// https://www.carlrippon.com/6-ways-to-narrow-types-in-typescript/
// https://medium.com/@jackhmwilliams/type-narrowing-in-typescript-44a6757c5a64


// Narrowing referres to moving from a less precise type to a more precise type andcan be done in multiple ways.

// Type guards  
// typeof typeguards that i have seen used are string, number, boolean, undefined, object and function
// there is also bigint and symbol

// Type guard using typeof - using strict equality (===) 
//   "    "     "   instanceof
//   "    "     "   Array .isArray
function monsters(monsterThings: Function| Date | number[] | null) { // strs is a less precise type
//   if (typeof monsterThings === 'object') {                   // type of null is an 'object' so it could be string[] | null
//     for (const m of monsterThings) {                         // errors - (parameter) monsterThings: string[] | null Object is possibly 'null'.
//         console.log(m);                                      // m is a string
//     }
//   } 
    if (typeof monsterThings === 'function') {
        console.log(monsterThings);                             // the inferred type is Function
    }  
    if (monsterThings instanceof Date) {
        console.log(monsterThings);                             // the inferred type is Date
    }  
    if (Array.isArray(monsterThings)) {
        console.log(monsterThings);                             // the inferred type is number[]
    }  
}
// narrowing via switch
// using aswitch to determine the typeof a parameter passed into the function
function howManyMonsters(numberOfMonsters: number| string): number {
  switch (typeof numberOfMonsters) {
    case 'number':
      numberOfMonsters;
      return numberOfMonsters; 
    case 'string':
      numberOfMonsters;
      return numberOfMonsters.length;
    default:
      throw new Error('Unsupported value:' + numberOfMonsters);
  }   
}


// type guard function with type predicate

// narrowing via if- a conditional value check
// In the interface the property of dinosaur_id is optional and could be undefined.
interface SingleDinosaurProps extends RouteComponentProps {
    dinosaur_id?: string;
  }
// Using the 'if' statement the dinosaur_id is narrowed to a string within the if statement.  
useEffect(() => {
  if (dinosaur_id) {                                       //  if there is a dinosaur_id
    api.fetchDinosaurById(dinosaur_id ).then((res) => {    //  then do the api call
      setDinosaur(res.dinosaur);                           //  and setDinosaur with the returned dinosaur values
    });
  } 
});

// narrowing via switch
function getScore(value: number| string): number {
  switch (typeof value) {
    case 'number':
      value;
      return value; 
    case 'string':
      value;
      return value.length;
    default:
      throw new Error('Unsupported value:' + value);
  }   
}



// conditional value check


// Truthiness - if statement doesnt always expect condition to have type boolean
function howMuchIsInTheKitty(soMuch: number) {
  if (soMuch) {
    return `There is ${soMuch} in the kitty.`;
  }
  return "There is nothing in the Kitty!";
}
console.log(howMuchIsInTheKitty(3));
// guarding against null or undefined


// Equality narrowing


// assignments


// control flow analysis


// type predicates - https://fettblog.eu/typescript-type-predicates/
// // A type predicate is based on conditionals, a true or false reply from a function
//                                   // Parameter 's' implicitly has an 'any' type
// function isString(s) {            // s has implicit type of any and returns a boolean - function isString(s: any): boolean
//   return typeof s === 'string';
// }
// // isString can be used within another function to determin if the value passed is a string or not
// function toUpperCase(x: unknown) {
//   if(isString(x)) {
//     x.toUpperCase();             // Error - (parameter) x: unknown
//   }                              // typescript errors because the validation is wrapped in a function
// }                                // and the type of x has not changed

// // to use a predicate to resolve this the type of string must be set to string
// //                                    // Parameter 's' implicitly has an 'any' type
// function isString(s): s is string {   // s has implicit type of any and returns a string - function isString(s: any): s is string
//   return typeof s === 'string';
// }
// function toUpperCase(x: unknown) {
//   if(isString(x)) {              // function isString will return a type od string that can be used in the toUpperCase function
//     x.toUpperCase();             // No Error as - function isString(s: any): s is string
//   }                              // the value returned is of type string - (parameter) x: string
// }

// // 
// // predicates can also be used to narrow down sets within a type

// function dotsOnaDice(dots: number) {
//   return dots === 1 || dots === 2 || dots === 3 || dots === 4 || dots === 5 || dots === 6;
// }
// function evaluateThrow(count: number) {
//   if (dotsOnaDice(count)) {            // returns type of number - function dotsOnaDice(dots: number): any
//     switch (count) {                   // count is type number in switch - (parameter) count: number
//       case 1:                          //    and once validated is not any number but has been
//       case 2:                          //    narrowed down to one of the six discrete values
//       case 3:                          //    returned from dotsOnaDice
//       case 4:
//       case 5:
//         console.log('Not quite high enough!');
//         break;
//       case 6:
//         console.log('Winner!');
//         break;
//       case 7:                // note that typescript doesn't complain here even though type cannot be 7
//           console.log('Should not ever get this as it is not in dotsOnaDice. No error from Typescript.');
//           break;
//     }
//   }
// }

// // using predicate to resolve this the type returned from dotsOnaDice is narrowed to the set of 6 values
// type Dice = 1 | 2 | 3 | 4 | 5 | 6;  // Possible types for Dice
// // value returned is typed Dice and that can only be 1,2,3,4,5,6
// function dotsOnaDice(dots: number) : dots is Dice {   
//   return dots === 1 || dots === 2 || dots === 3 || dots === 4 || dots === 5 || dots === 6;
// }
// function evaluateThrow(count: number) {
//   if (dotsOnaDice(count)) {            // returns type of number - function dotsOnaDice(dots: number): any
//     switch (count) {                   // count is type Dice in switch - (parameter) count: Dice
//       case 1:                          
//       case 2:                          
//       case 3:                          
//       case 4:
//       case 5:
//         console.log('Not quite high enough!');
//         break;
//       case 6:
//         console.log('Winner!');
//         break;
//       case 7:                // note that typescript complain here - Type '7' is not comparable to type 'Dice'.
//           console.log('Should not ever get this as it is not in dotsOnaDice. No error from Typescript.');
//           break;
//     }
//   }  else {
//     console.log('This is not a valid throw of the dice!');  // reply if input is not of type Dice
//   }
// }

// console.log(evaluateThrow(3));   // function evaluateThrow(count: number): void



// Using predicate to resolve this the type returned from dotsOnaDice is narrowed to the set of 6 values
type Dice = 1 | 2 | 3 | 4 | 5 | 6;  // Possible types for Dice
// value returned is typed Dice and that can only be 1,2,3,4,5,6
function dotsOnaDice(dots: number) : dots is Dice {   
  return dots === 1 || dots === 2 || dots === 3 || dots === 4 || dots === 5 || dots === 6;
}
function evaluateThrow(count: number):string {
  if (dotsOnaDice(count)) {            // returns type of number - function dotsOnaDice(dots: number): any
    switch (count) {                   // count is type Dice in switch - (parameter) count: Dice
      case 1:
        return '1 - Bad luck!';                          
      case 2:  
        return '2 - Try again!';                        
      case 3:  
        return '3 - Bad luck!';                        
      case 4:
        return '4 - Try again!';
      case 5:
        return '5 - Not quite high enough!'; 
      case 6:
        return 'Winner!'; 
      case 7:
        return 'Winner!'; 
    }
  }  
    return 'This is not a valid throw of the dice!';  // It fell off the table :) 
}

const randomThrowOfTheDice: number = Math.floor(Math.random() * 7)
// console.log(randomThrowOfTheDice)
console.log(evaluateThrow(randomThrowOfTheDice));




// isFunction is a type predicate.
// isString is a type predicate.


// Discriminated unions


// the never type


// Exhaustiveness checking

//  using an interface type map
interface IProps {        // defining the Iprops types in the interface
    children: any,
    index: number,
    value: number,
    handleClick: any,
    isExpanded: boolean
  }
  export const TabPanel = (props: IProps) => {        //  
    const { children, index, value, handleClick, isExpanded } = props;  // props destructures to use within the function 
    return (
      <div className="tab-panel" hidden={value !== index}>
        {children}
        <div className="show-more">
          <Button
            className="c-button c-button--secondary c-button--small tab-show-more"
            onClick={handleClick}
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
    )
  }
  
  
  Make a note of something
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  