const ROUND_RESULT = 4
const DISPLAY = document.querySelector('.large-output');

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
addDeleteEventListener();
addKeyboardEventListener();

function add(a, b){
    var sum = Number(a) + Number(b);
    return Number((sum).toFixed(ROUND_RESULT));
}

function subtract(a, b){
    var diff = Number(a) - Number(b);
    return Number((diff).toFixed(ROUND_RESULT));
}

function divide(a, b){
    if (Number(b) === 0) {
        throw 'Can\'t divide by 0!';
    } else {
        var quot = Number(a) / Number(b);
        return Number((quot).toFixed(ROUND_RESULT));
    }
}

function multiply(a, b){
    var prod = Number(a) * Number(b);
    return Number((prod).toFixed(ROUND_RESULT));
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


function addDeleteEventListener(){
    const del = document.querySelector('#delete');
    del.addEventListener("click", clickedDelete);
}

function clickedDelete(){
    if (Number(currNum) !== 0){
        currNum = (currNum.length <= 1) ? '0' : currNum.slice(0, currNum.length - 1);
        updateDisplay(currNum);
    }
}


function addDecimalEventListener(){
    const deci = document.querySelector('#decimal');
    deci.addEventListener("click", clickedDecimal);
}

function clickedDecimal(){
    // check if already a decimal point
    if(Number(currNum) % 1 !== 0) return
    currNum += '.';
    DISPLAY.textContent = currNum;
}

function addEqualEventListener(){
    const equal = document.querySelector('#equal');
    equal.addEventListener("click", clickedEqual);
}

function clickedEqual(){
    if(prevNum == null || operator == null) return
    if(DISPLAY.textContent !== currNum) return

    try{ var result = operate(operator, prevNum, currNum).toString(); }
    catch(error){
        alert(error);
        return;
    }

    updateSmallDisplay(`${prevNum} ${operator} ${currNum} =`);
    resetVariables();
    currNum = result;
    updateDisplay(currNum);
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
    operators.forEach(operator => operator.addEventListener("click", function(e){
        clickedOperator(e.target.textContent);
    }));
}

function clickedOperator(newOperator){
    //if not a replacement operator - update prevNum, checking accordingly if there's already an operation in process
    if(!replacementOperatorFlag){
        if(prevNum || prevNum === '0'){
            try{ prevNum = operate(operator, prevNum, currNum).toString(); }
            catch(err){
                alert(err);
                return;
            }
            
            updateDisplay(prevNum);
        } else {
            prevNum = currNum;
        }
    }

    replacementOperatorFlag = true;
    currNum = '0';
    operator = newOperator;

    updateSmallDisplay(`${prevNum} ${operator}`);     
}

function addNumberEventListeners(){
    const numbers = Array.from(document.querySelectorAll('.num-key'));
    numbers.forEach(number => number.addEventListener("click", function(e){
        clickedNumber(e.target.textContent);
    }));
}

function clickedNumber(inputNum){
    replacementOperatorFlag = false;
    userInputedNumFlag = true;

    //currNum = (currNum === '0') ? inputNum : currNum + inputNum;

    if (currNum == '0'){
        currNum = inputNum;
    }
    else {
        currNum += inputNum;
    }

    updateDisplay(currNum);
}

function updateDisplay(val){
    DISPLAY.textContent = val;
}

function updateSmallDisplay(val){
    const smallDisplay = document.querySelector('.small-output');
    smallDisplay.textContent = val;
}

function resetVariables(){
    prevNum = null;
    operator = null;
    currNum = '0';
    replacementOperatorFlag = false;
    userInputedNumFlag = false;
}


function addKeyboardEventListener(){
    document.addEventListener("keydown", function(e){
        const keyName = e.key;
        const operators = ['+', '-', '−', '×', 'x', '*', '/',  '÷',];

        if (Number(keyName) || keyName === '0'){
            clickedNumber(keyName);
        } else if (operators.includes(keyName)){
            clickedOperator(cleanOperator(keyName));
        } else if (keyName === '=' || keyName === 'Enter'){
            clickedEqual();
        } else if (keyName === '.'){
            clickedDecimal();
        } else if (keyName === 'Backspace'){
            clickedDelete();
        }
    })
}

function cleanOperator(op){
    if (op === '-'){
        return '−';
    } 
    if (op === 'x' || op === '*'){
        return '×';
    }
    if (op === '/') {
        return '÷';
    }

    return op;
}




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


















