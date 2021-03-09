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
function monsters(monsterThings: string | string[] | null) { // strs is a less precise type
  if (typeof monsterThings === 'object') {                   // type of null is an 'object' so it could be string[] | null
    for (const m of monsterThings) {                         // (parameter) monsterThings: string[] | null
                                                             // Object is possibly 'null'.
        console.log(m);                                      // m is a string
    }
  } else if typeof monsterThings === 'string') {
      console.log(monsterThings);
  } else {
      // do nothing
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
  if (dinosaur_id) {
    api.fetchDinosaurById(dinosaur_id ).then((res) => {
      setDinosaur(res.dinosaur);
    });
  } 
});

// narrowing via switch


// conditional value check


// Truthiness 


// guarding against null or undefined


// Equality narrowing


// instanceof
// Array .isArray


// assignments


// control flow analysis


// type predicates


// Discriminated unions


// the never type


// Exhaustiveness checking
