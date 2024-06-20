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

// Variables
let n1 = 0, n2 = 0, op = "", waitSecNumber = false;

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
});

// Sign button event listener
signBtn.addEventListener("click", () => {
  if (displayDiv.textContent !== "0") {
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
    n2 = Number(displayDiv.textContent);
    const result = operate(n1, n2, op);
    displayDiv.textContent = result;
    waitSecNumber = false;
  }
});

// Floating point button event listener
floatPointBtn.addEventListener("click", () => {
  if (displayDiv.textContent === "ERROR") {
    displayDiv.textContent = "0.";
  }
  else {
    if (!displayDiv.textContent.includes(".")) {
      displayDiv.textContent += ".";
    }
  }
});

// Numbers event listeners
numbersBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (displayDiv.textContent === "ERROR") {
      displayDiv.textContent = btn.textContent;
    }
    else if (displayDiv.textContent === "0") {
      if (btn.textContent !== "0") {
        displayDiv.textContent = btn.textContent;
      }
    }
    else {
      displayDiv.textContent += btn.textContent;
    }
  });
});

// Operators event listeners
operatorsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!waitSecNumber) {
      op = btn.textContent;
      n1 = Number(displayDiv.textContent);
      // wait for the second number
      alert("Enter the second number!");
      waitSecNumber = true;
      displayDiv.textContent = "0";
    }
  });
});
