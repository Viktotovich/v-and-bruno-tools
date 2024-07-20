import Chart from 'chart.js/auto';

//The Chart and AutoRegression is designed by me, but made, corrected, and perfected by GPT. This is the only part of the tools where GPT is the "author" in a non-traditional sense.

// Initialize chart data and configuration
const ctx = document.getElementById('bar-chart').getContext('2d');
const chartConfig = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: '# of Followers',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: Array(12).fill('rgba(54, 162, 235, 0.2)'),
            borderColor: Array(12).fill('rgba(54, 162, 235, 1)'),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    generateLabels: (chart) => {
                        const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                        labels.push({
                            text: 'Predicted amount of followers using an AR model',
                            fillStyle: 'rgba(255, 206, 86, 0.2)',
                            strokeStyle: 'rgba(255, 206, 86, 1)',
                            hidden: false,
                            lineCap: 'butt',
                            lineDash: [],
                            lineDashOffset: 0,
                            lineJoin: 'miter',
                            lineWidth: 1,
                            textAlign: 'left'
                        });
                        return labels;
                    }
                }
            }
        }
    }
};

// Create the chart
const barChart = new Chart(ctx, chartConfig);

// Function to update the chart with new data
const updateChart = (newData, predictedIndex) => {
    barChart.data.datasets[0].data = newData;

    // Update background color for prediction
    barChart.data.datasets[0].backgroundColor = newData.map((_, index) =>
        index === predictedIndex ? 'rgba(255, 206, 86, 0.2)' : 'rgba(54, 162, 235, 0.2)'
    );

    // Update border color for prediction
    barChart.data.datasets[0].borderColor = newData.map((_, index) =>
        index === predictedIndex ? 'rgba(255, 206, 86, 1)' : 'rgba(54, 162, 235, 1)'
    );

    barChart.update();
};

// Simple linear regression to predict the next value
const predictNextValue = (data) => {
    const x = data.map((_, index) => index).filter((_, index) => data[index] !== 0);
    const y = data.filter(value => value !== 0);

    if (x.length < 2) {
        return 0;
    }

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return slope * n + intercept;
};

// Add event listener for the form submission
document.getElementById('update-chart-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the input values
    const formData = new FormData(event.target);
    const data = [
        formData.get('jan') || 0,
        formData.get('feb') || 0,
        formData.get('mar') || 0,
        formData.get('apr') || 0,
        formData.get('may') || 0,
        formData.get('jun') || 0,
        formData.get('jul') || 0,
        formData.get('aug') || 0,
        formData.get('sep') || 0,
        formData.get('oct') || 0,
        formData.get('nov') || 0,
        formData.get('dec') || 0
    ].map(Number);

    // Find the index of the first zero (missing value)
    const nextIndex = data.findIndex(value => value === 0);

    // Predict the next value (if any missing value is found)
    if (nextIndex !== -1) {
        data[nextIndex] = predictNextValue(data.slice(0, nextIndex));
    }

    // Update the chart with new data and highlight the predicted value
    updateChart(data, nextIndex);
});

