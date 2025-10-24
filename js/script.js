/**
 * @fileoverview A Web Based Cacluator in JavaScript
 * @author James
 * @version 0.0.2
 * @date 22nd October 2025
 * @updated 23rd October 2025
 * 
 * @description
 * JavaScript based Calculator Browser Application
 * For the Odin Project
 * Includes Functions for all of the basic math operators you typically find on calculators
 * addition
 * subtraction
 * multiplication
 * division
 */

renderCalculator();

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

    if (!availableOperators.includes(operator)) return 0;

    if (Number.isNaN(numberA) || Number.isNaN(numberB)) return 0;
    
    switch (operator) {
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

/**
 * Renders HTML Calculator interface
 * Creates grid of 4 x 5 DOM elements required
 * @returns {void} 
 */
function renderCalculator()
{
    const NUMBER_OF_ROWS = 5, NUMBER_OF_COLS = 4;
    const calculatorContainer = document.querySelector("div#calculatorContainer");

    const result = document.createElement("input");
    result.readOnly = true;
    result.setAttribute("id", "results");
    result.value = "8008135";

    calculatorContainer.appendChild(result);

    for (let i = 0; i < NUMBER_OF_ROWS; i++)
    {
        const rowWrapper = document.createElement("div");
        rowWrapper.classList.add("row");

        for (let j = 0; j < NUMBER_OF_COLS; j++)
        {
            const btn = document.createElement("button");
            rowWrapper.appendChild(btn);

            btn.textContent = renderButtons(i, j);
            btn.dataset.label = renderButtons(i, j);
        }

        calculatorContainer.appendChild(rowWrapper);
    }
}

/**
 * Renders the buttons for calculator
 * Gives button a label and a html
 * @param {number} i index i from rendering loop
 * @param {number} j index j from rendering loop
 * @returns {string} label for button
 */
function renderButtons(i, j)
{
    const BUTTONS = [
        ["DEL", "CLEAR", "%", "/"],
        ["7", "8", "9", "*"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["+/-", "0", ".", "="]
    ];

    return BUTTONS[i][j];
}