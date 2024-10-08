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


//goal tracker

const goalTracker = (function(){
    const generateTrackerBtn = document.querySelector("#generate-tracker");

    generateTrackerBtn.addEventListener("click", generateTracker)

    function generateTracker(){
        const target = document.querySelector("#target").value;
        const currentAmount = document.querySelector("#current-amount").value;
        const goalTracker = document.querySelector(".goal-tracker");
        const textElement = document.createElement("div");

        goalTracker.innerHTML = '';
        goalTracker.appendChild(textElement);
        textElement.textContent = 'Your progress:'

        //100%
        const borderDiv = document.createElement('div');
        //fraction of 100
        const progressDiv = document.createElement('div');
        //empty space filler
        const motivationalText = document.createElement('div');

        borderDiv.style.border = '1px solid #000';
        borderDiv.style.width = '80%';
        borderDiv.style.height = '20px';
        borderDiv.style.position = 'relative';

        progressDiv.style.height = '100%';
        progressDiv.style.width = '0';
        goalTracker.appendChild(borderDiv);
        borderDiv.appendChild(progressDiv);
        goalTracker.appendChild(motivationalText);

        let percentageWidth = calculatePercentage(target, currentAmount);
        percentageWidth = Math.max(0, Math.min(100, percentageWidth));

        progressDiv.style.width = `${percentageWidth}%`;

        if (percentageWidth <= 33) {
            progressDiv.style.backgroundColor = 'red';
            motivationalText.textContent = "There is still a lot more work to do, but don't worry - you got this!";
        } else if (percentageWidth <= 66) {
            progressDiv.style.backgroundColor = 'yellow';
            motivationalText.textContent = "You are closer than you know it! Keep up at it.";
        } else if (percentageWidth >= 97){
            progressDiv.style.backgroundColor = 'gold';
            motivationalText.textContent = "YOU DID IT!!!! Congratulations!";
        } else {
            progressDiv.style.backgroundColor = 'green';
            motivationalText.textContent = "You are very close! Give it your all!";
        };
    };

    function calculatePercentage(target, currentAmount) {
        if (target <= 0 || currentAmount < 0) {
            return 0;
        }
        return (currentAmount / target) * 100;
    }

})()




