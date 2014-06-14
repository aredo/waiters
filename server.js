"use strict";

// Module dependencies
var CONST_HOUR = 3600000;
var CONST_DAY  = CONST_HOUR * 24;
var CONST_WEEK = CONST_DAY * 7;

var env      = process.env.NODE_ENV || 'development'
var path     = require('path')
var fs       = require('fs')
var express  = require('express')
var mongoose = require('mongoose')
var config   = require(__dirname + '/app/config/config')
var app      = express()

var logger           = require('morgan')
var path             = require('path')
var responseTime     = require('response-time')
var methodOverride   = require('method-override')
var multer           = require('multer')
var compression      = require('compression')
var bodyParser       = require('body-parser')
var cookieParser     = require('cookie-parser')
var session          = require('express-session')
var MongoStore       = require('connect-mongo')({ session: session })
var errorHandler     = require('errorhandler')
var expressValidator = require('express-validator')


var pkg = require(__dirname + '/package.json')

// Database
require(__dirname + '/app/config/database')(config, mongoose)

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// express settings

app.set('env', env)
app.set('port', config.server.port || 3000)

// app.enable('trust proxy')
app.disable('x-powered-by')

app.use(multer())

if (env === 'development') {
  app.use(logger('dev'))
} else {
  app.use(logger())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(expressValidator())
app.use(methodOverride())
app.use(responseTime())
app.use(compression())

app.use(cookieParser('a61260e4fff785b6199931da66caad148715858b'))

app.use(session({
  secret: pkg.name,
  store: new MongoStore({
    url: config.database.url,
    collection : 'sessions',
    auto_reconnect: true
  })
}))

app.use(express.static(path.join(__dirname, 'public'), { maxAge: CONST_WEEK }));
app.use(require('serve-favicon')(__dirname + '/favicon.ico'))

/** ROUTES Apps */
app.use(require(__dirname + '/routes'))

app.use(errorHandler())

app.use(function handleNotFound(req, res, next){
  res.status(404)
  res.send({ url: req.url, error: '404 Not found' })
  return
})

// create a server instance
// passing in express app as a request event handler
app.listen(app.get('port'), function() {
  console.log("\n✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'))
})

module.exports = app
