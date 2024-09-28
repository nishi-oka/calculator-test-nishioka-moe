let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    currentInput += button.dataset.number;
    display.value = currentInput;
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '') return;
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else {
      calculate();
    }
    operator = button.dataset.operator;
    currentInput = '';
  });
});

document.querySelector('.equals').addEventListener('click', () => {
  if (currentInput === '' || firstOperand === null) return;
  calculate();
  operator = '';
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
}
