// Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0)
    return "ERROR";
  return a / b;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    return add(num1, num2);
  }
  else if (operator === "-") {
    return subtract(num1, num2);
  }
  else if (operator === "×") {
    return multiply(num1, num2);
  }
  else if (operator === "÷") {
    return divide(num1, num2);
  }
}

function calcResult(displayContent) {
  n2 = Number(displayContent);
  let result = operate(n1, n2, op);
  // Handle overflow
  if (String(result).length > MAX_DIGITS) {
    result = result.toExponential(5);
  }
  return result;
}

// Variables
const MAX_DIGITS = 15;
let n1 = 0, n2 = 0, op = "", waitSecNumber = false, firstDigitEntered = true;

const displayDiv = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const signBtn = document.querySelector(".sign");
const equalBtn = document.querySelector(".equal");
const floatPointBtn = document.querySelector(".point");
const numbersBtns = document.querySelectorAll(".number");
const operatorsBtns = document.querySelectorAll(".operator");

// Clear button event listener
clearBtn.addEventListener("click", () => {
  displayDiv.textContent = "0";
  op = "";
  n1 = 0;
  n2 = 0;
  waitSecNumber = false;
  firstDigitEntered = true;
});

// Sign button event listener
signBtn.addEventListener("click", () => {
  if (displayDiv.textContent !== "0" && firstDigitEntered) {
    if (displayDiv.textContent.includes("-")) {
      displayDiv.textContent = displayDiv.textContent.slice(1);
    }
    else {
      displayDiv.textContent = "-" + displayDiv.textContent;
    }
  }
});

// Equal button event listener
equalBtn.addEventListener("click", () => {
  if (waitSecNumber) {
    displayDiv.textContent = calcResult(displayDiv.textContent);
    waitSecNumber = false;
  }
});

// Floating point button event listener
floatPointBtn.addEventListener("click", () => {
  // Handle overflow
  if (displayDiv.textContent.length < MAX_DIGITS) {
    if (isNaN(displayDiv.textContent) || displayDiv.textContent === "Infinity") {
      displayDiv.textContent = "0.";
    }
    else {
      if (!displayDiv.textContent.includes(".")) {
        displayDiv.textContent += ".";
      }
    }
  }
});

// Numbers event listeners
numbersBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Handle overflow
    if (displayDiv.textContent.length < MAX_DIGITS) {
      if (isNaN(displayDiv.textContent) || displayDiv.textContent.includes("Infinity")) {
        displayDiv.textContent = btn.textContent;
      }
      else if (displayDiv.textContent === "0" || (waitSecNumber && !firstDigitEntered)) {
        displayDiv.textContent = btn.textContent;
        firstDigitEntered = true;
      }
      else {
        displayDiv.textContent += btn.textContent;
      }
    }
  });
});

// Operators event listeners
operatorsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (waitSecNumber) {
      displayDiv.textContent = calcResult(displayDiv.textContent);
    }
    op = btn.textContent;
    n1 = Number(displayDiv.textContent);
    // wait for the second number
    waitSecNumber = true;
    firstDigitEntered = false;
  });
});
