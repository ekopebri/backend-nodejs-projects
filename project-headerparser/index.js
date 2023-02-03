// index.js
// where your node app starts

// init project
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
  dirname as __dirname
} from './config/directory.js';

dotenv.config();
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami/:api?/:whoami?', function (req, res) {
  res.json({
    ipaddress: req.get("X-Forwarded-For"),
    language: req.get("Accept-Language"),
    software: req.get('User-Agent')
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
