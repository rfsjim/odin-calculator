/**
 * @fileoverview A Web Based Cacluator in JavaScript
 * @author James
 * @version 0.0.13
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
 * 
 * The calculator does not evaluate more than a sinlge pair of numbers at a time.
 */

// A calculator operation will consist of a number, an operator, and another number.
let results;

const calculatorState = {
    numberA: null, // first number in calculation
    numberB: null, // second number in calculation
    operator: null, // operator for calculation
    previousOperator: null, // last operator or operator if first
    lastKeyPressed: null, // tracks last key pressed for clean UI updating
    availableOperators: ['+', '-', '*', '/', '**'], // array of allowed operators

    // getters and setters for properties

    /**
     * Gets Number A
     * @returns {number} first number of equation
     */
    getNumberA() {
        return this.numberA;
    },
    /**
     * Sets Number A
     * @param {number} value value of first number of equation 
     */
    setNumberA(value) {
        this.numberA = value;
    },
    /**
     * Gets Number B
     * @returns {number} second number of equation
     */
    getNumberB() {
        return this.numberB;
    },
    /**
     * Sets Number B
     * @param {number} value value of second number of equation
     */
    setNumberB(value) {
        this.numberB = value;
    },
    /**
     * Gets Equation Operator
     * @returns {string} operator of equation
     */
    getOperator() {
        return this.operator;
    },
    /**
     * Sets Operation for Equation
     * @param {string} value of operator for equation 
     */
    setOperator(value) {
        if (this.availableOperators.includes(value))
        {
            this.operator = value;
        } else
        {
            throw new Error("Operator Value Error");
        }
    },
    /**
     * Gets Previous Used Operator OR current operator if first
     * @returns {string} previous operator of equation
     */
    getPreviousOperator() {
        return this.previousOperator;
    },
    /**
     * Sets Previous Operator for Equation
     * @param {string} value previous operator for equation 
     */
    setPreviousOperator(value) {
        this.previousOperator = value;
    },
    /**
     * Returns the last key pressed
     * @returns {string} last key pressed
     */
    getLastKeyPressed() {
        return this.lastKeyPressed;
    },
    /**
     * Sets the last key pressed
     * @param {string} value value of last key pressed 
     */
    setLastKeyPressed(value) {
        this.lastKeyPressed = value;
    },

    // other calculator methods

    /**
     * Clears the calculator registers
     */
    clear() {
        this.numberA = null;
        this.numberB = null;
        this.operator = null;
    },
    /**
     * Was last key pressed equals
     * @returns {boolean}
     */
    isLastKeyPressedEqual() {
        return this.getLastKeyPressed() === "=";
    },
    /**
     * Was last key pressed an operator
     * @returns {boolean}
     */
    isLastKeyPressedAnOperator() {
        return this.availableOperators.includes(this.lastKeyPressed);
    }
};

renderCalculator();

/**
 * Add two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number} The sum of a and b
 */
function addition(a, b)
{
    return a + b;
}

/**
 * Subtracts two numbers
 * @param {number} a 
 * @param {number} b 
 * @returns {number} The difference of a and b
 */
function subtraction(a, b)
{
    return a - b;
}

/**
 * Multiplies two numbers together
 * @param {number} a 
 * @param {number} b 
 * @returns {number} The product of a and b
 */
function multiplication(a, b)
{
    return roundToDecimal((a * b), 3);
}

/**
 * Divides two numbers, tests for divide by zero errors
 * @param {number} a The numerator
 * @param {number} b The denominator (can not be zero)
 * @returns {number} The quotient of a and b
 */
function division(a, b)
{
    if (b === 0)
    {
        throw new Error("Can not divide by zero");
    }
    return roundToDecimal((a / b), 3);
}

/**
 * Calculates power
 * @param {number} base 
 * @param {number} exponent 
 * @returns {number} The power
 */
function power(base, exponent)
{
    return roundToDecimal((base ** exponent), 3);
}

/**
 * Rounds a number to a specified amount of decimal places
 * @param {number} number The number to round
 * @param {number} decimalPlaces The number of decimal places to round to
 * @returns {number} The rounded number
 */
function roundToDecimal(number, decimalPlaces)
{
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(number * multiplier) / multiplier;
}

/**
 * Take an operator and two numbers, then call a mathematically function
 * @param {string} operator 
 * @param {number} numberA 
 * @param {number} numberB
 * @returns {number} The resultant of the function
 */
function operate(operator, numberA, numberB)
{
    if (!calculatorState.availableOperators.includes(operator)) return 0;

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
    try {
        results.value = operate(operator, numberA, numberB);   
    } catch (error) {
        results.value = error;
    }
}

/**
 * Handle clicks of calculator buttons
 * @param {MouseEvent} event 
 */
function clickHandler(event)
{   
    const { label } = event.target.dataset;

    if (calculatorState.isLastKeyPressedEqual())
    {
        results.value = "";
        calculatorState.clear();
    }

    switch (label) {
        case "CLEAR":
            results.value = "";
            calculatorState.clear();
            break;
        case "DEL":
            results.value = results.value.slice(0, -1);
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
            // Enter numberA, enter operator, enter numberB
            // Enter a second operator, evaluate the inital pair of numbers
            // Then display the result
            // Enter another number
            // Enter equals or an additional operator
            // Use the previous result as the first number, the operator, and new numner
            // Calculate the new equation and display the result
            // If consecutive operator buttons are pressed, do not run any evaluations,
            // Take the last operator entered to be used for the next operation.

            // If the last key pressed was an operator do nothing

            if (calculatorState.isLastKeyPressedAnOperator())
            {
                calculatorState.setOperator(label);
                break;
            }

            if (calculatorState.getPreviousOperator() === null)
            {
                calculatorState.setPreviousOperator(label);
            }

            // if we have A and B
            if (calculatorState.getNumberA() !== null && calculatorState.getNumberB() !== null &&
                !Number.isNaN(calculatorState.getNumberA()) && !Number.isNaN(calculatorState.getNumberB()))
            {
                renderResult(calculatorState.getNumberA(), calculatorState.getNumberB(), calculatorState.getPreviousOperator());
                calculatorState.setNumberA(parseFloat(results.value));
                results.value = "";
            }

            // If A or B are not set store A or B from the input and clear the input
            if (calculatorState.getNumberA() === null || Number.isNaN(calculatorState.getNumberA()))
            {
                calculatorState.setNumberA(parseFloat(results.value));
                results.value = "";
            }

            if (calculatorState.getNumberB() === null || Number.isNaN(calculatorState.getNumberB()))
            {
                calculatorState.setNumberB(parseFloat(results.value));
                results.value = "";
            }
            calculatorState.setOperator(label);

            calculatorState.setPreviousOperator(label);
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
            results.value += label;
            break;
        default:
            break;
    }

    calculatorState.setLastKeyPressed(label);
}