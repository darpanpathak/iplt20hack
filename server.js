var express = require('express');
var app = express();
var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

var PORT = process.env.PORT || 4201;

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/matches', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, '/data/matches.csv'), { encoding: 'utf8' });
    var options = {
        delimiter: ',' // optional 
    };
    var matches = csvjson.toObject(data, options);
    res.send(matches);

});

app.get('/api/deliveries/:id', function(req, res) {

    var data = fs.readFileSync(path.join(__dirname, '/data/deliveries.csv'), { encoding: 'utf8' });
    var options = {
        delimiter: ',' // optional 
    };
    var deliveries = csvjson.toObject(data, options);
    var delbyid = deliveries.filter(function(item) {
        return item.match_id === req.params.id;
    });
    res.send(delbyid);
});

app.get('/api/deliveries/:id/:over/:ball/:inning', function(req, res) {

    var data = fs.readFileSync(path.join(__dirname, '/data/deliveries.csv'), { encoding: 'utf8' });
    var options = {
        delimiter: ',' // optional 
    };
    var deliveries = csvjson.toObject(data, options);
    var delbyid = deliveries.filter(function(item) {
        return item.match_id === req.params.id &&
            item.over === req.params.over &&
            item.ball === req.params.ball &&
            item.inning == req.params.inning;
    });
    res.send(delbyid);
});



app.listen(PORT, function(err) {
    console.log('running server on port ' + PORT);
});