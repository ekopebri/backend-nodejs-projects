const express = require('express');
const fs = require('fs');
const {log} = require("debug");
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/')
  .get( function(req, res) {
        readFile((err, data) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.send(data);
        });
  });

const readFile = (callback) => {
    fs.readFile(datafile, 'utf-8', (err, data) => {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, JSON.parse(data));
        }
    });
}

const readFilePromise = new Promise((resolve, reject) => {
    fs.readFile(datafile, 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(JSON.parse(data));
        }
    });
});

const readFileAsyncAwait = async () => {
    let data = await fs.promises.readFile(datafile, 'utf-8');
    return JSON.parse(data);
};

module.exports = router;
