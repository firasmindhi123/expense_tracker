"use strict";
const num1ele = document.getElementById('num1');
const num2ele = document.getElementById('num2');
const button = document.querySelector('button');
const resultnum = [];
const stringout = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + '  ' + num2;
    }
    return +num1 + +num2;
}
function printresult(resultobj) {
    console.log(resultobj);
}
button.addEventListener("click", () => {
    const num1 = num1ele.value;
    const num2 = num2ele.value;
    const result = add(+num1, +num2);
    const stringval = add(num1, num2);
    console.log(result);
    console.log(stringval);
    printresult({ val: result, strapon: new Date() });
    resultnum.push(result);
    stringout.push(stringval);
    console.log(resultnum, stringout);
});
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('solve');
    }, 5000);
});
promise.then(result => {
    console.log(result);
});
