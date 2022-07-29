const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const output = document.getElementById('output');
const addition = document.getElementById('addition');
const equals = document.getElementById('equals');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const subtraction = document.getElementById('subtraction');
const period = document.getElementById('period');
const clear = document.getElementById('clear-button');
const backspace = document.getElementById('delete-button');

let firstNumber = '';
let secondNumber = '';
let result;
let operation = '';
let firstOperation = '';
let secondOperation = '';
let dotCounter = 0;
let zeroCounter = 0;

numbers.forEach(number => {
  number.addEventListener ('click', (e)=>{

    if (operation !='') {
      if (checkIfCanPutADot(number.textContent) == true && checkIfCanPutZero(number.textContent, secondNumber) == true) {
        secondNumber = secondNumber + number.textContent;
        output.textContent = firstNumber + operation + secondNumber;
      }
    }
    else {
      if (checkIfCanPutADot(number.textContent) == true && checkIfCanPutZero(number.textContent, firstNumber) == true) {
        firstNumber = firstNumber + number.textContent;
        output.textContent = firstNumber;
      }
    }

  })
});

function checkIfCanPutADot (numberContent) {
  if (dotCounter == 1 && numberContent == '.') {
    return false;
  }
  if (dotCounter == 0 && numberContent == '.') {
    dotCounter = 1;
    return true;
  }
  return true;
}


equals.addEventListener('click', (e)=>{
  if (secondNumber != '') {
    computing ();
  }
});

operations.forEach(operationButton => {
operationButton.addEventListener ('click', (e)=>{
  if (firstNumber != '' && operation != '' && secondNumber != '') {
    computing ();
  }
  if (dotCounter == 1) {
    dotCounter = 0;
  }
  if (firstNumber !='') {
    output.textContent= firstNumber + operationButton.textContent;
    operation = operationButton.textContent; }
    })
});

function computing () {
  let parsedFirstNumber = parseFloat(firstNumber, 10);
  let parsedSecondNumber = parseFloat(secondNumber, 10);

  if (operation == '+') {
    result = parsedFirstNumber + parsedSecondNumber
    output.textContent = result.toPrecision(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
  }
  else if (operation == '*') {
    result = parsedFirstNumber * parsedSecondNumber
    output.textContent = result.toPrecision(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
  }
  else if (operation == '-') {
    result = parsedFirstNumber - parsedSecondNumber
    output.textContent = result.toPrecision(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
  }
  else if (operation == '÷') {
    result = parsedFirstNumber / parsedSecondNumber
    output.textContent = result.toPrecision(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
  }

  firstNumber = result.toPrecision(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
  secondNumber = '';
  operation = '';
}

clear.addEventListener ('click', (e)=>{
    firstNumber = '';
    secondNumber = '';
    operation = '';
    output.textContent = '';
});

backspace.addEventListener ('click', (e)=>{
  if (operation == '' && secondNumber == '') {
    firstNumber = firstNumber.slice(0, -1);
    output.textContent = firstNumber;
  }
  if (secondNumber == '') {
    operation = operation.slice(0, -1);
    output.textContent = firstNumber;
  }
  if (secondNumber != '') {
    secondNumber = secondNumber.slice(0, -1);
    output.textContent = firstNumber + operation + secondNumber;
  }
});

function checkIfCanPutZero (input, number) {
  if (number == '0') {
    if (input == '+' || input == '-' || input == '*' || input == '+' || input == '.')
      return true;
  }
    if (number != '0') {
      return true;
    }
  return false;
}