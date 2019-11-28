"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var app = express();
var metrics = new metrics_1.MetricsHandler();
var port = process.env.PORT || '8080';
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.set('metrics', metrics);
app.get('/', function (req, res) {
    res.write('Hello world');
    res.end();
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
