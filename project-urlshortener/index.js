require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');
const dns = require("dns");
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let datas = {};

function getLongUrl(id) {
  return datas[id];
}

function addUrl(url) {
  let id = crypto.randomUUID();
  datas = {
    ...datas,
    [id]: url
  }

  return {
    id,
    url
  }
}

// Your first API endpoint
app.get('/api/shorturl/:id', function(req, res) {
  const result = getLongUrl(req.params.id);

  if (result) {
    res.writeHead(301, {
      Location: result
    }).end();
  }

  res.json({url: result});
});

app.use(urlencodedParser);

app.post('/api/shorturl', function (req, res) {
  const options = {
    all:true,
  };

  const regex = /(^https?:\/\/)|(\/.*$)/gi;

  dns.lookup(req.body.url.replace(regex, ''),(error, address, family) => {

    if (error) {
      res.json({ error: 'invalid url' });
    } else {
      const result = addUrl(req.body.url);

      res.json({
        "original_url": result.url,
        "short_url": result.id
      });
    }
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
