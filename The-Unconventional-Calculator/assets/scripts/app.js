const defaultValue = 0;
let result = defaultValue;

// get the user input and return it as an integer
function getUserInput() {
  return parseInt(userInput.value);
}

// creates an equation log that will be printed above the result
function equationLog(firstValue, operation, secondValue) {
  return `${firstValue} ${operation} ${secondValue}`;
}

// perfroms the requried mathmatical operaton dependnig on which function that called.
function calculator(operationType) {
  const userInputNumber = getUserInput();
  const initialResult = result;
  let operatorSymbol = "";

  if (isNaN(userInputNumber)) {
    return;
  }

  if (operationType === "add" && userInputNumber !== 0) {
    result += userInputNumber;
    operatorSymbol = "+";
  } else if (operationType === "subtract" && userInputNumber !== 0) {
    result -= userInputNumber;
    operatorSymbol = "-";
  } else if (operationType === "multiply" && userInputNumber !== 0) {
    result *= userInputNumber;
    operatorSymbol = "*";
  } else if (operationType == "divide" && userInputNumber !== 0) {
    result /= userInputNumber;
    operatorSymbol = "/";
  } else if (operationType == "reset") {
    result = defaultValue;
    userInput.value = ""; // this changed the input field to a blank field :)
    return; // this is to escape the followin two lines, and return back to the rest function.
  } else {
    console.log(-1);
    return;
  }
  const equation = equationLog(initialResult, operatorSymbol, userInputNumber);
  outputResult(result, equation);
}

function add() {
  calculator("add");
}

function subtract() {
  calculator("subtract");
}

function multiply() {
  calculator("multiply");
}

function divide() {
  calculator("divide");
}

// resets the default value, userinput, and the output on the screen.
function reset() {
  calculator("reset");
  outputResult(result, "");
}

// btns eventlisteners
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
resetBtn.addEventListener("click", reset);
