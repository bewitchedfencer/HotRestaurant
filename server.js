// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Tables (DATA)
// =============================================================
var tables = [
    {name:"Batman",
    phone:"407-555-5555",
    email:"batman@batcave.com",
    uniqueID:"Bruce Wayne"}
];

var waitingTables = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "#"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/view", function(req, res){
      res.sendFile(path.join(__dirname, "view.html"));
  });

  app.get("/api/tables", function(req, res) {
        res.json(tables);
    });

    app.get("/api/waiting", function(req, res) {
        res.json(waitingTables);
          });

    // Create New Tables - takes in JSON input
    app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newTable = req.body;  
    
    console.log(newTable);
        if(tables.length<6){
            console.log("tables less than 6");
            tables.push(newTable);
            console.log(tables);
            res.json(newTable);
        }
        else{
            // console.log("wait list"); used for debugging
            waitingTables.push(newTable);
            res.json(newTable);            
        }
    });
   
    
  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  