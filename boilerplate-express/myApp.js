let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config();


// Middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
 console.log(`${req.method} ${req.path} - ${req.ip}`);
 next();
});

app.use(`/public`, express.static(`${__dirname}/public`));

app.get("/", function (req, res) {
 let path = `${__dirname}/views/index.html`;
 res.sendFile(path);
});

app.get("/json", function (req, res) {
 let str = "Hello json";
 if (process.env.MESSAGE_STYLE === 'uppercase') {
  str = str.toUpperCase();
 }
 res.json({"message": str});
});

app.get('/now', function (req, res, next) {
 req.time = new Date().toString();
 next();
}, function (req, res) {
 res.send(req.time);
});

app.get('/:word/echo', function (req, res) {
 res.send({echo: req.params.word})
});

app.get('/name', function (req, res) {
 res.send({ name: `${req.query.first} ${req.query.last}`})
});

app.post('/name', function (req, res) {
 res.send({ name: `${req.body.first} ${req.body.last}`})
});



































 module.exports = app;
