var express = require('express');           // use express routing
var bodyParser = require('body-parser');    // for parsing http requests
var http = require('http');                 // to create HTTP server
var routes = require('./routes');           // loading the routes (routes.js)

var app = express();
app.use(bodyParser.urlencoded({extended: true}));      // body parser middleware
app.use(bodyParser.json());
app.use('/', routes);                   // load our custom routes from routes.js

var httpServer = http.createServer(app);
httpServer.listen(8000);
console.log('HTTP server listening on ' + 8000);