"use strict";

var express = require('express');
var Route = express.Router();
var config = require('./app/config/config');
var lodash = require('lodash')
var Auth = require(config.root + '/app/helper/authorization');
var fs = require('fs');

var Users = require(config.root + '/app/controllers/users');

Route
  // .all('/v1/*', Auth.requiresAccessToken)
  .get('/v1/users/show', Users.get_profile)
  .get('/v1/users', function(req, res) {
    res.json({'message': 'Welcome to API'});
  })

module.exports = Route
