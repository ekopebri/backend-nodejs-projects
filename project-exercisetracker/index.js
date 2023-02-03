const express = require('express')
const app = express()
const cors = require('cors')
const {addUser, addExercise, getLogUser, getAllUser} = require("./user");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
require('dotenv').config()

app.use(urlencodedParser);
app.use(cors())
app.use(express.static('public'))

app.get('/api/users', function (req, res) {
  let result = getAllUser();
  res.json(result);
});

app.post('/api/users', function (req, res) {
  let result = addUser({username: req.body.username});
  res.json({
    username: result._username,
    _id: result._id
  });
});

app.post('/api/users/:_id/exercises', function (req, res) {
  let result = addExercise({
    _id: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
  });

  if (result) {
    res.json({
      username: result._user._username,
      description: result._description,
      duration: result._duration,
      date: result._date,
      _id: result._user._id
    });

  } else {
    res.json({});
  }
});

app.get('/api/users/:_id/logs', function (req, res) {
  let result = getLogUser({
    _id: req.params._id,
    from: req.query.from,
    to: req.query.to,
    limit: req.query.limit
  });

  res.json(result);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
