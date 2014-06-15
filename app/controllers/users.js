var mongoose    = require('mongoose');
var User        = mongoose.model('User');
var async       = require('async');
var errorHelper = require('../helper/errors')
var validator   = require('validator')
var _           = require('lodash')

var resultPrint = {}
var errPrint    = {}

/*
 * GET users/show
 * Returns a variety of information about the user specified by the required user_id or username parameter.
 *
 */
exports.getProfile = function (req, res, next) {

  var condition = { $or : [] }

  if(validator.isNull(req.query.user_id) && validator.isNull(req.query.username)) {
    return errorHelper.not_found(res);
  } else {
    condition.$or.push({'_id' : req.query.user_id })
  }

  if(!validator.isNull(req.query.username)) {
    condition.$or.push({'username' : req.query.username })
  }

  User
    .findOne( condition
      , 'username firstname lastname photo_profile bod gender city country bio interest facebook twitter last_login'
      , function (err, user) {
      if (err) {

        errPrint.status  = 500;
        errPrint.message = err.message
        errPrint.data    = err.errors

        errorHelper.mongoose(res, errPrint)

      } else {

        if (_.isObject(user)) {

          resultPrint.status  = 200
          resultPrint.message = "success"
          resultPrint.data    = user
          return res.json(200, resultPrint)
        } else {
          return errorHelper.not_found(res);
        }

      }
    })
}


exports.updateProfile = function (req, res, next) {

}
