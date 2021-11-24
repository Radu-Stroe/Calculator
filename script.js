//VARIABLES

let firstLineNumber = '0';
let secondLineNumber = undefined;
let answer = undefined;
let operationUsed = false;
let operationType = undefined;
let floatFlag = false;

//ELEMENTS

const numbers = document.querySelectorAll('button.number');
const operations = document.querySelectorAll('button.operation');
const equal = document.querySelector('button.equal');
const firstLine = document.querySelector('div.firstLine');
const secondLine = document.querySelector('div.secondLine');
const clearButton = document.querySelector('button.clear');
const deleteButton = document.querySelector('button.delete');
const floatButton = document.querySelector('button.float');


//CLICK EVENTS
numbers.forEach(number => number.addEventListener('click', function(e) {
    displayLine(e.target.textContent);
}));

operations.forEach(operation => operation.addEventListener('click', function(e) {
    calculateOperation(e.target.textContent);
}));

equal.addEventListener('click', function() {
    calculateAnswer();
});

clearButton.addEventListener('click', function() {
    resetCalculator();
})

deleteButton.addEventListener('click', function() {
    deleteChar();
});

floatButton.addEventListener('click', function() {
    useFloatChar();
});


//KEYDOWN EVENTS

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
            displayLine(e.key);
            break;
        case '+': case '-': case '*': case '/': 
            calculateOperation(e.key);
            break;
        case '=':
            calculateAnswer();
            break;
        case '.':
            useFloatChar();
            break;
        case 'Backspace':
            deleteChar();
            break;
        default:
    }
});

//FUNCTIONS

function displayLine(content) {
    console.log('test');
    if ((secondLineNumber === undefined) && operationUsed) {
        secondLineNumber = content;
        firstLine.textContent = secondLineNumber;
    } else if (!isFloat(Number(secondLineNumber)) && operationUsed && (secondLineNumber.length < 5) && firstLine.textContent.includes('.')) {
        secondLineNumber = firstLine.textContent + content;
        firstLine.textContent = secondLineNumber;
    } else if (operationUsed && (secondLineNumber.length < 5)) {
        secondLineNumber = firstLine.textContent + content;
        firstLine.textContent = secondLineNumber;
    } else if (!isFloat(Number(firstLineNumber)) &&  Number(firstLineNumber) < 10 && firstLine.textContent.includes('.')) {
        firstLineNumber = firstLine.textContent + content;
        firstLine.textContent = firstLineNumber;
    } else if (firstLineNumber === '0') {
        firstLineNumber = content;
        firstLine.textContent = firstLineNumber;
    } else if(firstLine.textContent.length < 5)  {
        firstLineNumber = firstLineNumber + content;
        firstLine.textContent = firstLineNumber;
    }
    console.log("first value: " + firstLineNumber);
    console.log("second value: " + secondLineNumber);
    console.log("flag: " + operationUsed);
}

function calculateOperation(key) {
    if((operationType === '÷' || operationType === '/') && secondLineNumber === '0') {
        secondLine.textContent = '';
        firstLine.textContent = 'Undefined';
        setTimeout(() => {
            firstLineNumber = '0';
            secondLineNumber = undefined;
            firstLine.textContent = '0';
            secondLine.textContent = '';
            operationUsed = false;
            floatFlag = false;
        }, 2000);
    } else if(!secondLineNumber && operationUsed) {
        operationType = key;
        secondLine.textContent = answer + ' ' + operationType;
    } else if(!operationUsed) {
        operationType = key;
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
            case 'x': case '*': 
                answer = multiply(firstLineNumber, secondLineNumber);
                break;
            case '÷': case '/': 
                answer = divide(firstLineNumber, secondLineNumber);
                break;
        }
        operationType = key;
        if(isFloat(answer)){
            answer = Number(answer.toFixed(4));
        }
        firstLine.textContent = answer;
        firstLineNumber = answer;
        secondLine.textContent = answer + ' ' + operationType;
        secondLineNumber = undefined;
        console.log(secondLineNumber);
    }
    floatFlag = false;
}

function calculateAnswer() {
    if(firstLineNumber && secondLineNumber) {
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
        case 'x': case '*':
            answer = multiply(firstLineNumber, secondLineNumber);
            break;
        case '÷': case '/':
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
}

function useFloatChar() {
    if(!floatFlag) {
        firstLine.textContent += '.';
        floatFlag = true;
    }
}

function deleteChar() {
    if(firstLine.textContent.length > 1) {
        firstLine.textContent = firstLine.textContent.substring(0, firstLine.textContent.length - 1);
        firstLineNumber = Number(firstLine.textContent);
    } else {
        firstLine.textContent = 0;
        firstLineNumber = 0;
    }
}

function resetCalculator() {
    firstLineNumber = '0';
    secondLineNumber = undefined;
    firstLine.textContent = '0';
    secondLine.textContent = '';
    operationUsed = false;
    floatFlag = false;
}

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }



