let entryCalculator = document.getElementById("screenInput");
let displayOperation = document.getElementById("displayOperation")
let x = 0;
let y = 0;
let result = 0;
let memory = 0;
let operation = "";
let operatorPressed = false;
let completeStatus = false;
let numberParenthesisOpen = 0;
let numberParenthesisClosed = 0;
let parenthesisStatus = false;
let closedParenthesis = false;

let arrayofX = [];
let arrayofOperators = [];


/* Funciones relacionadas con lo que aparece en pantalla */

function display(number) {
    entryCalculator.innerHTML += number;
    if (completeStatus === true) {
        entryCalculator.innerText = number;
        displayOperation.innerText = "";
        completeStatus = false;
    }

}

function displayZero() {
    if (entryCalculator.innerText == "") {
        entryCalculator.innerHTML = "0.";
    }
    else if (completeStatus === true) {
        entryCalculator.innerText = "0.";
        displayOperation.innerText = "";
        completeStatus = false;
    }
    else {
        entryCalculator.innerHTML += 0;
    }
}

function displayDecimals() {
    if (completeStatus === true) {
        entryCalculator.innerText = "0.";
        displayOperation.innerText = "";
        completeStatus = false;
    }
    else if (entryCalculator.innerHTML.includes(".") != true && entryCalculator.innerText != "") {
        entryCalculator.innerHTML += ".";

    }
    else if (entryCalculator.innerText == "") {
        entryCalculator.innerHTML += "0."
    }
}

function positifNegatif() {
    if (entryCalculator.innerHTML.includes("-")) {
        entryCalculator.innerHTML = entryCalculator.innerHTML.replace("-", "")
    }
    else {
        entryCalculator.innerHTML = "-" + entryCalculator.innerHTML;
    }
}

function cleanInput() {
    entryCalculator.innerHTML = "";
    displayOperation.innerHTML = "";
    operatorPressed = false;
    numberParenthesisOpen = 0;
    numberParenthesisClosed = 0;
    parenthesisStatus = false;
    arrayofX = [];
    arrayofOperators = [];
    closedParenthesis = false;


    x = 0;
    y = 0;


}

/* Funciones relacionadas con los cálculos matemáticos */


function operatorFunction(operator) {

    if (operatorPressed == false) {

        x = parseFloat(entryCalculator.innerHTML);
        arrayofX.push(x);
        entryCalculator.innerHTML = "";

        arrayofOperators.push(operator)
        operation = operator;


        console.log("Array of Operators: " + arrayofOperators[0]);

        if (parenthesisStatus === true) {
            displayOperation.innerText += x + " " + operation + " ";
        }
        else {
            displayOperation.innerText = x + " " + operation + " ";
        }
        completeStatus = false;

    }
    operatorPressed = true;
}

function openParenthesis() {
    console.log(parenthesisStatus);
    if (parenthesisStatus === false && operatorPressed === true) {
        parenthesisStatus = true;
        numberParenthesisOpen++;
        displayOperation.innerText += " (";
        operatorPressed = false;


        operationFunction();
        console.log("X at Open Parenthesis:" + x)
    }


}

function closeParenthesis() {

    if ((numberParenthesisOpen - numberParenthesisClosed) > 0) {
        displayOperation.innerText += " " + entryCalculator.innerText + ")";
        entryCalculator.innerText = "";
    }

    let beginningOperationParenthesis = displayOperation.innerText.lastIndexOf('(');
    let operationParenthesis = displayOperation.innerText.substring(beginningOperationParenthesis + 1).replace(/[()]/g, '');;

    numberParenthesisClosed++;

    
    if (operationParenthesis != ""){
    y = eval(operationParenthesis);
    console.log("Y at Close Parenthesis:" + y)
    operation = arrayofOperators[0];
    x = arrayofX[0];

    if (numberParenthesisOpen != 0 && numberParenthesisOpen == numberParenthesisClosed) {
        closedParenthesis = true;
        equalsTo();
    }}

}

function equalsTo() {
    if (operatorPressed === true && (entryCalculator.innerText != "" || closedParenthesis == true)) {
        if (!displayOperation.innerHTML.includes("(")) {
            y = parseFloat(entryCalculator.innerHTML);
        }
        if (operation === "+") {
            result = x + y;
        }
        else if (operation === "-") {
            result = x - y;
        }
        else if (operation === "/") {
            result = x / y;
        }
        else if (operation === "*") {
            result = x * y;
        }
        else if (operation === "^") {
            result = x ** y;
        }
        else if (operation === "%") {
            result = x % y;
        }

        if (displayOperation.innerHTML.includes("(")) {
            displayOperation.innerHTML = " " + displayOperation.innerHTML + " ="
        }
        else {
            displayOperation.innerHTML = " " + displayOperation.innerHTML + y + " ="
        }
        entryCalculator.innerHTML = result;
        console.log("x:", x, "y:", y, "operation:", operation, "result:", result);
        operatorPressed = false;
        completeStatus = true;
        numberParenthesisOpen = 0;
        numberParenthesisClosed = 0;
        parenthesisStatus = false;
        closedParenthesis = false;
        arrayofX = [];
        arrayofOperators = [];

        x = 0;
        y = 0;
    }

}

function square() {
    result = entryCalculator.innerText ** 2;
    entryCalculator.innerHTML = result;

}

function cube() {
    result = entryCalculator.innerText ** 3;
    entryCalculator.innerHTML = result;

}

function root() {
    result = entryCalculator.innerText ** 0.5;
    entryCalculator.innerHTML = result;
}

function pcent() {
    result = entryCalculator.innerText / 100;
    entryCalculator.innerHTML = result;
}

/* Funciones relacionadas con las memorias */

function memoryPlus() {
    memory += parseFloat(entryCalculator.innerText);
    entryCalculator.innerText = "";
}

function memoryMinus() {
    memory -= parseFloat(entryCalculator.innerText);
    entryCalculator.innerText = "";
}

function memoryRecovery() {
    entryCalculator.innerText = memory;
}

function memoryClear() {
    memory = 0;
}