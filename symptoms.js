$("#emergency").on("click", function () {
    $.ajax({
        url: "https://phone-call-5320-dev.twil.io/phone-call",
        type: "GET",
        success: function (data) {
            console.log("ok");
        }
    });
});

var field = document.querySelector('#date');
var date = new Date();
field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

let weightSubmit = $("#submit-weight");
let hrSubmit = $("#submit-hr");
let bpSubmit = $("#submit-bp");

let weightArray = []
let bpArray = []
let hrArray = []


let weights = []

let saveData = function (array, data) {
    let object = {
        x: $("#date").val(),
        y: data
    }
    array.push(object);
}

let stringifyArray = function (array) {
    let arrayString = JSON.stringify(array);
    return arrayString;
}

weightSubmit.on("click", function () {
    let poundInput = $("#pounds").val();
    let ozInput = $("#oz").val();

    if (poundInput && ozInput) {
        let fractionalLb = ozInput / 16;
        let totalLb = parseFloat(poundInput) + parseFloat(fractionalLb);
        // $("#weight-graph").append(`<p>${poundInput} pounds ${ozInput} ounces</p>`)
        console.log(totalLb);
        saveData(weightArray, totalLb);
        weights.push($("#date").val());
        console.log(weights);
        let stringArray = stringifyArray(weightArray);
        localStorage.setItem("weight", stringArray)
        $("#pounds").val("");
        $("#oz").val("");
        console.log(weightArray);
        $('#myChart').remove();
        $('#chart-div').append('<canvas id="myChart" width="400" height="400"></canvas>');
        updateWeightGraph(weightArray, "Weight");
        $("#weight-graph").css("display", "block");
    }
})

hrSubmit.on("click", function () {
    let hrInput = $("#hr").val();
    if (hrInput) {
        // $("#hr-graph").append(`<p>${hrInput}  bpm</p>`)
        saveData(hrArray, hrInput);
        // console.log(hrArray);
        $("#hr").val("");
        $('#hrChart').remove();
        $('#chart-3-div').append('<canvas id="hrChart" width="400" height="400"></canvas>');
        updateHrGraph(hrArray, "Heart Rate");
        $("#hr-graph").css("display", "block");
    }
})

bpSubmit.on("click", function () {
    let bpInput = $("#bp").val();
    if (bpInput) {
        // $("#bp-graph").append(`<p>${bpInput}  mmHg</p>`)
        saveData(bpArray, bpInput);
        $("#bp").val("");
        $('#bpChart').remove();
        $('#chart-2-div').append('<canvas id="bpChart" width="400" height="400"></canvas>');
        updateBpGraph(bpArray, "Blood Pressure");
        $("#bp-graph").css("display", "block");
    }
})


let updateWeightGraph = function (dataSet, label) {
    const ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {

            datasets: [{
                label: label,
                data:
                    dataSet,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let updateBpGraph = function (dataSet, label) {
    const ctx = document.getElementById('bpChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {

            datasets: [{
                label: label,
                data:
                    dataSet,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let updateHrGraph = function (dataSet, label) {
    const ctx = document.getElementById('hrChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {

            datasets: [{
                label: label,
                data:
                    dataSet,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



