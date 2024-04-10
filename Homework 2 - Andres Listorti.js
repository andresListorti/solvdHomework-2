// Homework 2
// Deadline: 15 April
// Task:
// Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:
// addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.
// stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.
// invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.
// convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.
// coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.
// (Optional) Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.

const dataTransformation = {
  // addValues
  addValues: (a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else if (typeof a === "bigint" && typeof b === "bigint") {
      return a + b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a.concat(b);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    } else if (typeof a === "object" && typeof b === "object") {
      return { ...a, ...b };
    } else {
      throw new Error("Addition not possible for the given types.");
    }
  },

  // stringifyValue
  stringifyValue: (value) => {
    if (typeof value === "object" || Array.isArray(value)) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  },

  // invertBoolean
  invertBoolean: (value) => {
    if (typeof value === "boolean") {
      return !value;
    } else {
      throw new Error(
        "Inversion not possible for the given type. Expected a boolean input."
      );
    }
  },

  // covertToNumber
  convertToNumber: (value) => {
    if (typeof value === "string") {
      const parsedFloat = parseFloat(value);
      if (!isNaN(parsedFloat)) {
        return parsedFloat;
      }
      const parsedInt = parseInt(value);
      if (!isNaN(parsedInt)) {
        return parsedInt;
      }
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    } else if (typeof value === "object" || Array.isArray(value)) {
      throw new Error("Conversion not possible for objects or arrays.");
    }

    const convertedValue = Number(value);
    if (isNaN(convertedValue)) {
      throw new Error("Conversion not possible for the given type.");
    }
    return convertedValue;
  },

  // coerceToType
  coerceToType: (value, type) => {
    if (typeof value === type) {
      return value;
    }

    switch (type) {
      case "string":
        return dataTransformation.stringifyValue(value);
      case "number":
        return dataTransformation.convertToNumber(value);
      case "boolean":
        return Boolean(value);
      default:
        throw new Error("Coercion not possible for the given type.");
    }
  },

  // Optionals:
  // The convertToBinary function takes a decimal number as input and converts it to its binary representation. It handles positive and negative integers, as well as zero.
  convertToBinary: (decimal) => {
    if (typeof decimal !== "number" || !Number.isInteger(decimal)) {
      throw new Error("Conversion not possible. Input must be an integer.");
    }

    if (decimal === 0) {
      return "0";
    }

    let binary = "";

    function absoluteValue(decimal) {
      if (decimal >= 0) {
        return decimal;
      } else {
        return -decimal;
      }
    }

    let num = absoluteValue(decimal);

    while (num > 0) {
      binary = (num % 2) + binary;
      num = (num / 2) | 0;
    }

    return decimal < 0 ? "-" + binary : binary;
  },

  // The capitalizeString function takes a string as input and capitalizes the first letter. It returns the modified string. If the input string is empty, it returns an empty string.
  capitalizeString: (str) => {
    if (typeof str !== "string") {
      throw new Error("Conversion not possible. Input must be a string.");
    }

    if (str.length === 0) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};

// Examples
console.log(dataTransformation.addValues(2, 20)); // Output: 22
console.log(
  dataTransformation.addValues(222222222222222222, 333333333333333333)
); // Output: 555555555555555500
console.log(dataTransformation.addValues(BigInt(10), BigInt(20))); // Output: 30n
console.log(dataTransformation.addValues("Andres", " Listorti")); // Output: Andres Listorti
console.log(dataTransformation.addValues([1, 2, 3], [4, 5, 6])); // Output: [1, 2, 3, 4, 5, 6]
console.log(dataTransformation.addValues({ name: "Andres" }, { age: 42 })); // Output: { name: 'Andres', age: 42 }

console.log(dataTransformation.stringifyValue({ a: 1, b: 2 })); // '{"a":1,"b":2}'
console.log(dataTransformation.stringifyValue(79)); // "79"

console.log(dataTransformation.invertBoolean(true)); // false
console.log(dataTransformation.invertBoolean(false)); // true

console.log(dataTransformation.convertToNumber("11")); // 11
console.log(dataTransformation.convertToNumber(true)); // 1

console.log(dataTransformation.coerceToType(23, "string")); // "23"
console.log(dataTransformation.coerceToType("true", "boolean")); // true

console.log(dataTransformation.convertToBinary(10)); // Output: 1010
console.log(dataTransformation.convertToBinary(-10)); // Output: -1010
console.log(dataTransformation.convertToBinary(0)); // Output: 0

console.log(dataTransformation.capitalizeString("andres")); // Output: Andres
console.log(dataTransformation.capitalizeString("listorti")); // Output: Listorti
console.log(dataTransformation.capitalizeString("")); // Output: (empty string)
