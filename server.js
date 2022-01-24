// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Spin up the server
const port = 8080;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Server running on localhost: ${port}`);
}

// GET route that returns the projectData object
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

// Post Route
app.post('/addData', addData);

function addData(req, res) {
    console.log(req.body);
    const newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content,
    }
    projectData.push(newEntry)
    res.send(projectData)
};
