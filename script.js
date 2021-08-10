function add(str){
    return str.split(" + ")
                .map(char => Number(char))
                .reduce((acc, currNum) => acc + currNum);
}


function subtract(str){
    return str.split(" - ")
                .map(char => Number(char))
                .reduce((acc, currNum) => acc - currNum);
}

function multiply(str){
    return str.split(" * ")
                .map(char => Number(char))
                .reduce((acc, currNum) => acc * currNum);
}

function divide(str){
    return str.split(" / ")
                .map(char => Number(char))
                .reduce((acc, currNum) => acc / currNum);
}