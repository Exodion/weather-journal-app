// Setup empty JS object to act as endpoint for all routes
projectData = {};
//dataStore = [];

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
//app.use(express.json());


// Setup Server
const port = 8000;
const server = app.listen(port, function(){
    console.log(`server started on localhost port: ${port}`);
});

app.get("/all", function (req, res){
    res.send(JSON.stringify(projectData));
    console.log("GET started");
    console.log(projectData);
    
})

app.post("/posting", function(req, res){

    let newData = req.body; //most important change: added .body
    let newEntry = {
        temperature: newData.temperature,
        date: newData.date,
        userResponse: newData.userResponse,
        lat: newData.latitude,
        lon: newData.longtitude,
        feelings: newData.feelings
    }
    //dataStore.push(newEntry);
    projectData = newEntry;
    console.log(projectData);
    res.send(JSON.stringify(projectData));

})