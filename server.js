var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

var router = require('./routes');
var config = require('./config');
var log = require('./log')(module);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use(function(req, res, next){
    res.status(404).send('Sorry, this page not found.');
    log.debug('Not found URL: %s',req.url);
    return;
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next){
	    res.status(err.status || 500);
	    log.error('Internal error(%d): %s',res.statusCode,err.message);
	    return;
    });    
}

server.listen(config.get('port'), function(){
	log.info('Server create on: ' + config.get('port'));
});