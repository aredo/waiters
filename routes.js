"use strict";

var express = require('express');
var Route = express.Router();
var config = require('./app/config/config');
var lodash = require('lodash')
var Auth = require(config.root + '/app/helper/authorization');
var fs = require('fs');

Route
  .all('*', Auth.requiresAccessToken)
  .get('/', function(req, res) {
    res.json({'message': 'Welcome to API'});
  })

module.exports = Route
