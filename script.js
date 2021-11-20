//VARIABLES

let firstLineNumber = undefined;
let secondLineNumber = undefined;
let answer = undefined;
let operationUsed = false;
let operationType = undefined;

//ELEMENTS

const numbers = document.querySelectorAll('button.number');
const operations = document.querySelectorAll('button.operation');
const equal = document.querySelector('button.equal');
const firstLine = document.querySelector('div.firstLine');
const secondLine = document.querySelector('div.secondLine');
const clearButton = document.querySelector('button.clear');
const deleteButton = document.querySelector('button.delete');


//EVENTS
numbers.forEach(number => number.addEventListener('click', function(e) {
    displayLine(e.target.textContent);
}));

operations.forEach(operation => operation.addEventListener('click', function(e) {
    
    if(!secondLineNumber && operationUsed) {
        operationType = e.target.textContent;
        secondLine.textContent = answer + ' ' + operationType;
    } else if(!operationUsed) {
        operationType = e.target.textContent;
        secondLine.textContent = firstLineNumber + ' ' + operationType;
        operationUsed = true;
    } else if(operationUsed) {
        console.log(operationType);
        switch(operationType) {
            case '+':
                answer = add(firstLineNumber, secondLineNumber);
                break;
            case '-':
                answer = subtract(firstLineNumber, secondLineNumber);
                break;
            case 'x':
                answer = multiply(firstLineNumber, secondLineNumber);
                break;
            case '÷':
                answer = divide(firstLineNumber, secondLineNumber);
                break;
        }
        operationType = e.target.textContent;
        if(isFloat(answer)){
            answer = Number(answer.toFixed(4));
        }
        firstLine.textContent = answer;
        firstLineNumber = answer;
        secondLine.textContent = answer + ' ' + operationType;
        secondLineNumber = undefined;
        console.log(secondLineNumber);
    }
}));

equal.addEventListener('click', function() {
    calculateAnswer();
});

clearButton.addEventListener('click', function() {
    firstLineNumber = undefined;
    secondLineNumber = undefined;
    firstLine.textContent = 0;
    secondLine.textContent = '';
    operationUsed = false;
})

deleteButton.addEventListener('click', function() {

});


//FUNCTIONS

function displayLine(content) {
    if ((!secondLineNumber) && operationUsed) {
        secondLineNumber = Number(content);
        firstLine.textContent = secondLineNumber;
    } else if (operationUsed && (secondLineNumber > 0.0001 || secondLineNumber < 10000)) {
        secondLineNumber = Number(firstLine.textContent + content);
        firstLine.textContent = secondLineNumber;
    } else if (!firstLineNumber) {
        firstLineNumber = Number(content);
        firstLine.textContent = firstLineNumber;
    } else if(firstLineNumber > 0.0001 || firstLineNumber < 10000)  {
        firstLineNumber = Number(firstLineNumber.toString() + content);
        firstLine.textContent = firstLineNumber;
    }
    console.log("first value: " + firstLineNumber);
    console.log("second value: " + secondLineNumber);
    console.log("flag: " + operationUsed);
}

function calculateAnswer() {
    console.log(firstLineNumber);
    secondLineNumber = Number(firstLine.textContent);
    secondLine.textContent += (' ' + secondLineNumber + ' =');
    switch(operationType) {
        case '+':
            answer = add(firstLineNumber, secondLineNumber);
            break;
        case '-':
            answer = subtract(firstLineNumber, secondLineNumber);
            break;
        case 'x':
            answer = multiply(firstLineNumber, secondLineNumber);
            break;
        case '÷':
            answer = divide(firstLineNumber, secondLineNumber);
            break;
    }
    if(isFloat(answer)){
        answer = Number(answer.toFixed(4));
    }
    firstLine.textContent = answer;
    firstLineNumber = answer;
    secondLineNumber = undefined;
    operationUsed = false;
    console.log(secondLineNumber);
}

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
    return a / b;
}

function operate(operateFunction, a, b) {
    operateFunction(a, b);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }



