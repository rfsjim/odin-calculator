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

// A calculator operation will consist of a number, an operator, and another number.
let results;

const calculatorState = {
    numberA: null, // first number in calculation
    numberB: null, // second number in calculation
    operator: null, // operator for calculation
    lastKeyPressed: null, // tracks last key pressed for clean UI updating

    // getters and setters for properties
    getNumberA() {
        return this.numberA;
    },
    setNumberA(value) {
        this.numberA = value;
    },
    getNumberB() {
        return this.numberB;
    },
    setNumberB(value) {
        this.numberB = value;
    },
    getOperator() {
        return this.operator;
    },
    setOperator(value) {
        this.operator = value;
    },
    getLastKeyPressed() {
        return this.lastKeyPressed;
    },
    setLastKeyPressed(value) {
        this.lastKeyPressed = value;
    },

    // other calculator methods
    clear() {
        this.numberA = null;
        this.numberB = null;
        this.operator = null;
    }
};

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

    results = document.createElement("input");
    results.readOnly = true;
    results.setAttribute("id", "results");

    calculatorContainer.appendChild(results);

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

            btn.addEventListener("click",(e) => clickHandler(e));
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

/**
 * Renders the result of the calculation into the text display
 * @param {number} numberA First number in equation
 * @param {number} numberB  Second number in equation
 * @param {string} operator operator working on numbers
 */
function renderResult(numberA, numberB, operator)
{
    results.value = operate(operator, numberA, numberB);
}

/**
 * Handle clicks of calculator buttons
 * @param {MouseEvent} event 
 */
function clickHandler(event)
{   
    if (calculatorState.getLastKeyPressed() === "=")
    {
        results.value = "";
        calculatorState.clear();
    }

    switch (event.target.dataset.label) {
        case "CLEAR":
            // empties registers
            results.value = "";
            calculatorState.clear();
            break;
        case "DEL":
            results.value = results.value.substring(0, results.value.length - 1);
            break;
        case "=":
            if (!calculatorState.getNumberB())
            {
                calculatorState.setNumberB(parseFloat(results.value));
            }
            renderResult(calculatorState.getNumberA(), calculatorState.getNumberB(), calculatorState.getOperator());
            break;
        case "%":
        case "/":
        case "*":
        case "-":
        case "+":
            if (!calculatorState.getNumberA())
            {
                calculatorState.setNumberA(parseFloat(results.value));
                calculatorState.setOperator(event.target.dataset.label);
                results.value = "";
            } else
            {
                calculatorState.setNumberB(operate(event.target.dataset.label, calculatorState.getNumberA(), parseFloat(results.value)));
                results.value = calculatorState.getNumberB();
            }
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            results.value += event.target.dataset.label;
            break;
        default:
            break;
    }

    calculatorState.setLastKeyPressed(event.target.dataset.label);
}