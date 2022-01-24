/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=ae865a79c0638d47fd2d1c5a2f475887&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    // Validation if entered zip code is numeric & 5 digits long
    if (zipCode.length != 5 || isNaN(parseInt(zipCode))) {
        alert('Please enter valid zip code')
        return;
    }

    else {
        getData(baseURL, zipCode, apiKey)
            .then(function (data) {
                // add data to POST request
                postData('/addData', { temp: data.main.temp, date: newDate, content: content })
            })
            .then(
                updateUI()
            )
    }
}

// Function to GET Web API Data
const getData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        console.log("error", error)
    }
}

// Function to POST data 
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }

}

// Update UI
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = Math.round(allData[0].temp) + ' &deg;C';
        document.getElementById('content').innerHTML = allData[0].content;

    } catch (error) {
        console.log("error", error)
    }
}
