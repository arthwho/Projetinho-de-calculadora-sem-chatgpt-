const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //Adiciona o dígito no display
    addDigit(digit){
        if(digit === "," && this.currentOperationText.innerText.includes(",")){
            return;
        }

        this.currentOperation = digit;
        this.updateDisplay();
    }

    //Faz as operações
    processOperation(operation){
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "=":
                this.processEqualOperation();
                break;
            case "C":
                this.processCOperation();
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processCEOperation();
            default:
                return;
        }
    }

    //Muda o display
    updateDisplay(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0){
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Muda a operação no display
    changeOperation(operation){
        const mathOperations = ["+", "-", "*", "/"];
        if(!mathOperations.includes(operation)){
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Operações especiais: Delete, Clear Everything, Clear e Igual
    processDelOperation(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processCEOperation(){
        this.currentOperationText.innerText = "";
    }

    processCOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ","){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
});