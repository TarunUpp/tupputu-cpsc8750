// use the express library
const express = require('express');
const cookieParser = require('cookie-parser');
// create a new server application
const fetch = require('node-fetch');
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
var value = "World";
const correctAnswer = "categorylist";
const answers = "2";



// The main page of our website
app.get('/', (req, res) => {
  res.cookie('visitorId', nextVisitorId);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {

    name: req.query.name || value,
    time: req.query.name || new Date().toLocaleString(),

    visitorid: req.query.name || nextVisitorId,
    timepresentonwebsite: req.query.name || Math.round((new Date().getTime() - startDate.getTime()) / 1000),

  });
  startDate = new Date();
  console.log(req.headers.cookie);
  console.log(req.cookies);
});
app.get("/trivia", async (req, res) => {
  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // fail if bad response
  if (!response.ok) {
    res.status(500);
    res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
    return;
  }

  // interpret the body as json
  const content = await response.json();
  console.log(content);
  const question = content.results[0]['question'];

  let correctAnswer = content.results[0]['correct_answer'];

  let incorrectanswer = content.results[0]['incorrect_answers'];

  let answers = incorrectanswer.concat(correctAnswer);

  let difficulty = content.results[0]['difficulty'];

  let category = content.results[0]['category'];
  console.group(correctAnswer);
  // fail if db failed
  // if (data.response_code !== 0) {
  //   res.status(500);
  //   res.send(`Open Trivia Database failed with internal response code ${data.response_code}`);
  //   return;
  // }

  // respond to the browser
  // TODO: make proper html
  // res.send(JSON.stringify(content, 2));
  res.render('trivia', {
    question: question,

    answers: answers,

    category: category,

    difficulty: difficulty,

    correctAnswer:correctAnswer
  });
  
  
});
// Start listening for network connections
app.listen(port);


// Printout for readability
console.log("Server Started!");