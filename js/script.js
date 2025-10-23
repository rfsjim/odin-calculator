/**
 * Functions for all of the basic math operators you typically find on calculators
 * addition
 * subtraction
 * multiplication
 * division
 */

/**
 * Add two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number} 
 */
function addition(a, b)
{
    return a + b;
}

/**
 * Subtracts two numbers together 
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function subtraction(a, b)
{
    return a - b;
}

/**
 * Multiplies two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function multiplication(a, b)
{
    return a * b;
}

/**
 * Divides two numbers
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function division(a, b)
{
    return a / b;
}

/**
 * Calculates power
 * @param {number} base 
 * @param {number} exponent 
 * @returns {number}
 */
function power(base, exponent)
{
    return base ** exponent;
}

// A calculator operation will consist of a number, an operator, and another number.
let numberA, numberB, operator;

/**
 * Take an operator and two numbers, then call a mathematically function
 * @param {string} operator 
 * @param {number} numberA 
 * @param {number} numberB
 * @returns {number} 
 */
function operate(operator, numberA, numberB)
{
    const availableOperators = ['+', '-', '*', '/', '**'];

    if (!availableOperators.some(element => element === operator)) return 0;
    if (Number.isNaN(numberA) || Number.isNaN(numberB)) return 0;

    switch (availableOperators) {
        case '+':
            return addition(numberA, numberB);
        case '-':
            return subtraction(numberA, numberB);
        case '*':
            return multiplication(numberA, numberB);
        case '/':
            return division(numberA, numberB);
        case '**':
            return power(numberA, numberB);
        default:
            return 0;
    }
}