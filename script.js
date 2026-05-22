const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

let currentInput = "";

function appendValue(value) {
  // Prevent duplicate operators alongside each other
  const operators = ["+", "-", "*", "/", "%", "."];
  if (operators.includes(value) && operators.includes(currentInput.slice(-1))) {
    return; 
  }

  currentInput += value;
  updateScreen();
}

function clearScreen() {
  currentInput = "";
  expressionDiv.innerText = "";
  resultDiv.innerText = "0";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateScreen();
}

function updateScreen() {
  // Convert visual division and multiplication signs for clarity
  let visualExpression = currentInput
    .replace(/\*/g, " × ")
    .replace(/\//g, " ÷ ");
  
  expressionDiv.innerText = visualExpression;

  // Real-time calculation block
  if (currentInput === "") {
    resultDiv.innerText = "0";
  } else {
    try {
      // If trailing character is an operator, evaluate the string up to that point
      let evalString = currentInput;
      if (["+", "-", "*", "/", "%", "."].includes(currentInput.slice(-1))) {
        evalString = currentInput.slice(0, -1);
      }
      
      let realTimeEval = eval(evalString);
      if (realTimeEval !== undefined) {
        resultDiv.innerText = realTimeEval;
      }
    } catch {
      // Silently wait for user to finish invalid syntax patterns without crashing
    }
  }
}

function calculate() {
  if (!currentInput) return;
  try {
    let finalResult = eval(currentInput);
    resultDiv.innerText = finalResult;
    currentInput = finalResult.toString(); // Allows ongoing operations on result
  } catch {
    resultDiv.innerText = "Error";
    currentInput = "";
  }
}

// BONUS: Global Keyboard Event Support
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
    return;
  }
  if (event.key === "Backspace") {
    deleteLast();
    return;
  }
  if (event.key === "Escape") {
    clearScreen();
    return;
  }

  const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "%"];
  if (validKeys.includes(event.key)) {
    appendValue(event.key);
  }
});