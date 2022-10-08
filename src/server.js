// use the express library
const express = require('express');
const cookieParser = require('cookie-parser');
// create a new server application

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());


// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;
let nextVisitorId = 8;
var startDate = new Date();
// Do your operations
var timeSpentOnPage = 0;
var value = "World";

// The main page of our website
app.get('/', (req, res) => {
  res.cookie('visitorId', nextVisitorId);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {

    name: req.query.name || value,
    name2: req.query.name || new Date().toLocaleString(),

    name3: req.query.name || nextVisitorId,
    name4: req.query.name || Math.round((new Date().getTime() - startDate.getTime()) / 1000),

  });
  startDate = new Date();
  console.log(req.headers.cookie);
  console.log(req.cookies);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");