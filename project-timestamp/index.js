// index.js
// where your node app starts

// init project
var express = require('express');
require('dotenv').config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const regex = /\d{6,}/g;
  let date = new Date(req.params.date);
  if (regex.test(req.params.date)) {
    const dateInt = parseInt(req.params.date);
    date = new Date(dateInt);
  }
  if (date.toString() === 'Invalid Date') {
    res.json({error: date.toString()});
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
