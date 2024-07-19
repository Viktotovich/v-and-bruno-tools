// Instead of many metrics at once, make it changeable - an object with a way to switch values

const metricHandler = (function(){
    class Metric {
        constructor(partOne = 1, partTwo = 1, operator = 'add') {
            this.partOne = partOne;
            this.partTwo = partTwo;
            this.operator = operator;
            this.result = this.calculateResult();
        }
    
        calculateResult() {
            switch (this.operator) {
                case 'add':
                    return this.partOne + this.partTwo;
                case 'subtract':
                    return this.partOne - this.partTwo;
                case 'multiply':
                    return this.partOne * this.partTwo;
                case 'divide':
                    return this.partOne / this.partTwo;
                default:
                    throw new Error('Invalid operator');
            }
        };

        updatePartOne(value){
            this.partOne = value;
            this.result = this.calculateResult();
        };

        updatePartTwo(value){
            this.partTwo = value;
            this.result = this.calculateResult();
        };

        updateOperator(operator){
            this.operator = operator;
            this.result = this.calculateResult();
        };
    };


    const metricButton = document.querySelector('.metric-button');

    metricButton.addEventListener("click", processResult);

    function processResult() {
        const resultContainer = document.querySelector(".metric-result");
        //because someone will be tempted to add strings instead of num
        const metricOne = parseFloat(document.querySelector(".edit-metric-one").textContent);
        const metricTwo = parseFloat(document.querySelector(".edit-metric-two").textContent);
        const operator = document.querySelector('#operator-select').value;

        let customMetric = new Metric(metricOne, metricTwo, operator);

        resultContainer.textContent = customMetric.result;
    };

    const editMetric = (element) => {
        element.addEventListener('dblclick', () => {
            const currentText = element.textContent;
            const input = document.createElement('input');
            input.type = 'number';
            input.value = currentText;
            input.classList.add('edit-input');

            element.replaceWith(input);
            input.focus();

            input.addEventListener('blur', () => {
                const newValue = parseFloat(input.value);
                element.textContent = newValue;
                input.replaceWith(element);
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    input.blur();
                }
            });
        });
    };

    const metricOne = document.querySelector('.edit-metric-one');
    const metricTwo = document.querySelector('.edit-metric-two');

    editMetric(metricOne);
    editMetric(metricTwo);
})();






