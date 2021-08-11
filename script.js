const ROUND_RESULT = 4

function add(a, b){
    return Number((a + b).toFixed(ROUND_RESULT));
}

function subtract(a, b){
    return Number((a-b).toFixed(ROUND_RESULT));
}

function divide(a, b){
    if (b === 0) {
        throw 'Can\'t divide by 0!';
    } else {
        return Number((a/b).toFixed(ROUND_RESULT));
    }
}

function multiply(a, b){
    return Number((a*b).toFixed(ROUND_RESULT));
}


function operate(operator, num1, num2){
    if(operator === "+") return add(num1, num2);
    else if(operator === "−") return subtract(num1, num2);
    else if(operator === "×") return multiply(num1, num2);
    else if(operator === "÷") {
        try { return divide(num1, num2); } 
        catch (e) { throw e; }
    }
}

function addDecimalEventListener(){
    const deci = document.querySelector('#decimal');
    deci.addEventListener("click", function(e){
        if(currNum % 1 === 0) return
        
    });
}

function addEqualEventListener(){
    const equal = document.querySelector('#equal');
    equal.addEventListener("click", function(e){
        if(prevNum == null || operator == null) return
        if(Number(DISPLAY.textContent) != currNum) return

        var result = operate(operator, prevNum, currNum);
        updateSmallDisplay(`${prevNum} ${operator} ${currNum} =`);
        resetVariables();
        currNum = result;
        updateDisplay(currNum);
    });
}

function addClearEventListener(){
    const clear = document.querySelector('#clear');
    clear.addEventListener("click", function(e){
        resetVariables();
        updateSmallDisplay('');
        updateDisplay(currNum);
    });
}

function addOperatorEventListeners(){
    const operators = Array.from(document.querySelectorAll('.operator'));
    operators.forEach(operator => operator.addEventListener("click", clickedOperator));
}

function clickedOperator(e){
    //if not a replacement operator - update prevNum, checking accordingly if there's already an operation in process
    if(!replacementOperatorFlag){
        if(prevNum || prevNum === 0){
            try{ prevNum = operate(operator, prevNum, currNum); }
            catch(e){
                alert(e);
                return;
            }
            
            updateDisplay(prevNum);
        } else {
            prevNum = currNum;
        }
    }

    replacementOperatorFlag = true;

    currNum = 0;
    operator = e.target.textContent;

    updateSmallDisplay(`${prevNum} ${operator}`);     
}

function addNumberEventListeners(){
    const numbers = Array.from(document.querySelectorAll('.num-key'));
    numbers.forEach(number => number.addEventListener("click", clickedNumber));
}

function clickedNumber(e){
    replacementOperatorFlag = false;
    userInputedNumFlag = true;

    currNum = currNum * 10 + Number(e.target.textContent);
    updateDisplay(currNum);
}

function updateDisplay(val){
    DISPLAY.textContent = val;
}

function updateSmallDisplay(val){
    const smallDisplay = document.querySelector('.small-display');
    smallDisplay.textContent = val;
}

function resetVariables(){
    prevNum = null;
    operator = null;
    currNum = 0;
    replacementOperatorFlag = false;
    userInputedNumFlag = false;
}

const DISPLAY = document.querySelector('.user-output');

var prevNum = null;
var operator = null;
var secondNum = null;
var currNum = 0;

var replacementOperatorFlag = false;
var userInputedNumFlag = false;

addNumberEventListeners();
addOperatorEventListeners();
addClearEventListener();
addEqualEventListener();
addDecimalEventListener()

// NOT CURRENTLY USED
function createNumKeys(){
    const container = document.body.querySelector("#calc-container");
    for(var i = 9; i >= 0; i--){
        const button = document.createElement("button");
        button.textContent = i;
        button.classList = "num-key button";
        container.appendChild(button)
    }
}


















