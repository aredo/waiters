"use strict";

var express   = require('express')
var Route     = express.Router()
var config    = require('./app/config/config')
var lodash    = require('lodash')
var Auth      = require(config.root + '/app/helper/authorization')
var fs        = require('fs')

var Users     = require(config.root + '/app/controllers/users')
var Banks     = require(config.root + '/app/controllers/banks')
var Campaigns = require(config.root + '/app/controllers/campaigns')

Route
  // .all('/v1/*', Auth.requiresAccessToken)
  .get('/v1/users', function(req, res) {
    res.json({'message': 'Welcome to API'});
  })
  .get('/v1/users/show', Users.getUser)
  .post('/v1/users/update', Users.updateProfile)

  .get('/v1/users/:user_id/banks', Banks.userBanks)
  .post('/v1/users/banks/', Banks.postBanks)
  .get('/v1/users/banks/:bank_id', Banks.getBanks)
  // .delete('/v1/users/banks/:bank_id', Banks.deleteBank)

  .get('/v1/advertiser/campaigns', Campaigns.list)
  .post('/v1/advertiser/campaigns', Campaigns.create)
  // .put('/v1/campaigns/:campaign_id', Campaigns.update)
  // .delete('/v1/campaigns/:campaign_id', Categories.delete)

  // .get('/v1/campaigns/categories', Categories.get)
  // .post('/v1/campaigns/categories', Categories.create)
  // .put('/v1/campaigns/categories/:category_id', Categories.get)
  // .delete('/v1/campaigns/categories/:category_id', Categories.create)

  // params
  .param('user_id', Users.load)
  .param('bank_id', Banks.load)

module.exports = Route
