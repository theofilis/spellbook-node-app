/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

mongoose.connect('mongodb://barendd:barendd@ds039257.mongolab.com:39257/spellbook');

// Bootstrap models
var models_path = __dirname + '/model'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

require('./routes/home')(app);
require('./routes/class')(app);
require('./routes/spell')(app);

app.get('/javascripts/epiceditor.js', function (req, res) {
    var filename = req.params.file;
    res.sendfile(path.join(__dirname, 'node_modules', 'epiceditor', 'epiceditor', 'js', 'epiceditor.min.js'));
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
