var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../../config'));
// var monkeys = require('../models/database.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/monkeys', function (req, res, next) {

  var results = [];

    // Grab data from http request
    var data = {name: req.body.name, talent: req.body.talent, complete: true};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO monkeys(name, talent, funny) values($1, $2, $3)", [data.name, data.talent, data.funny]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM monkeys ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

module.exports = router;
