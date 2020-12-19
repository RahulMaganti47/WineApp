var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var RewriteMiddleware = require('express-htaccess-middleware');
var RewriteOptions = {
  file: path.resolve(__dirname, '.htaccess'),
  verbose: (process.env.ENV_NODE == 'development'),
  watch: (process.env.ENV_NODE == 'development'),
};

var app = express();
app.use(RewriteMiddleware(RewriteOptions));

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// var publicImg = require('path').join(__dirname,'/img');
// var publicFont = require('path').join(__dirname, '/fonts');
// app.use(express.static(publicImg));
// app.use(express.static(publicFont));
// app.use(express.static('fonts'));

var publicAssets = require('path').join(__dirname, '/assets');
app.use(express.static(publicAssets));

var routes = require('./routes/routes.js');

app.get('/', routes.get_home);
app.post('/checkID', routes.check_id);
app.get('/feed', routes.get_feed);

app.listen(80, function () {
    console.log('Listening on port 80!');
});