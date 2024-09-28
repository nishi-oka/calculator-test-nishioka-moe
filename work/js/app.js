let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;
let formula = '';
let resultDisplayed = false;
let errorOccurred = false;

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    if (errorOccurred) return;
		if (resultDisplayed) {
			currentInput = '';
      formula = '';
      resultDisplayed = false;
      errorOccurred = false;
    }
    currentInput += button.dataset.number;
    formula += button.dataset.number;
		display.value = formula;
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
		if (currentInput === '' && !resultDisplayed) return;
    if (errorOccurred) return;
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else if (!resultDisplayed) {
      calculate();
    }
    operator = button.dataset.operator;
		formula += ` ${operator} `;
		display.value = formula;
    currentInput = '';
		resultDisplayed = false;
  });
});

document.querySelector('.equals').addEventListener('click', () => {
  if (errorOccurred) return;
  if (currentInput === '' || firstOperand === null) return;
  calculate();
  operator = '';
	formula = display.value;
	resultDisplayed = true;
});

document.querySelector('.clear').addEventListener('click', () => {
  clearCalculator();
});

function calculate() {
  let secondOperand = parseFloat(currentInput);
  switch (operator) {
    case '+':
      firstOperand += secondOperand;
      break;
    case '-':
      firstOperand -= secondOperand;
      break;
    case '*':
      firstOperand *= secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        display.value = 'Error';
        errorOccurred = true;
        return;
      }
      firstOperand /= secondOperand;
      break;
  }
  display.value = firstOperand;
  currentInput = '';
}

function clearCalculator() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  display.value = '';
	formula = display.value;
	resultDisplayed = false;
  errorOccurred = false;
}
