/* Определение переменных */

const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operator');
const cleanBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const resultBtn = document.getElementById('result');
const negateBtn = document.getElementById('negate');
const display = document.getElementById('display');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

/* Обработчики событий */

for (let i = 0; i < numberBtns.length; i++) {
    let numberBtn = numberBtns[i];
    numberBtn.addEventListener('click', function (e) {
        pressNumber(e.target.textContent);
    });
};

for (let i = 0; i < operationBtns.length; i++) {
    let operationBtn = operationBtns[i];
    operationBtn.addEventListener('click', function (e) {
        pressOperation(e.target.textContent);
    });
};

for (let i = 0; i < cleanBtns.length; i++) {
    let cleanBtn = cleanBtns[i];
    cleanBtn.addEventListener('click', function(e) {
        clean(e.srcElement.id);
    });
};

negateBtn.addEventListener('click', negate);

decimalBtn.addEventListener('click', addDecimal);

/* Функции */

function pressNumber(numberBtn) {
    if (MemoryNewNumber) {
        display.value = numberBtn;
        MemoryNewNumber = false;
    } else {
        if(display.value === '0') {
            display.value = numberBtn;
        } else {
            display.value += numberBtn;
        };
    };
};

function pressOperation(operationBtn) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;

        switch (MemoryPendingOperation) {
            case '+':
                MemoryCurrentNumber += +localOperationMemory;
                break;
            case '-':
                MemoryCurrentNumber -= +localOperationMemory;
                break;
            case '*':
                MemoryCurrentNumber *= +localOperationMemory;
                break;
            case '/':
                MemoryCurrentNumber /= +localOperationMemory;
                break;
            case 'x^y':
                MemoryCurrentNumber = Math.pow(+MemoryCurrentNumber, +localOperationMemory);
                break;
            default:
            MemoryCurrentNumber = +localOperationMemory;
        };

        display.value = +MemoryCurrentNumber.toFixed(15);
        MemoryPendingOperation = operationBtn;
    };

    if (MemoryPendingOperation === '√') {
        
        if (+MemoryCurrentNumber > 0) {
            MemoryCurrentNumber = Math.sqrt(+MemoryCurrentNumber);
            display.value = +MemoryCurrentNumber;
            MemoryNewNumber = false;
        } else {
            display.value = 'Недопустимый ввод';
        };

        MemoryPendingOperation = operationBtn;
    };
};

function negate() {
    let localNegateMemory = display.value;

    if (display.value > 0) {
        localNegateMemory = '-' + localNegateMemory;
    } else if (display.value < 0) {
        localNegateMemory *= (-1);
    };

    display.value = localNegateMemory;
};

function addDecimal() {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
        };
    };

    display.value = localDecimalMemory;
};

function clean(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};