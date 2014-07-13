var mongoose    = require('mongoose')
var User        = mongoose.model('User')
var UserBank    = mongoose.model('UserBank')
var async       = require('async')
var errorHelper = require('../helper/errors')
var validator   = require('validator')
var _           = require('lodash')

var resultPrint = {}
var errPrint    = {}

exports.load = function(req, res, next, user_id){
  User.load(user_id, function (err, user) {
    if (err) return next(err)
    if (!user) return errorHelper.not_found(res);
    next()
  })
}

/*
 * GET users/show
 * Returns a variety of information about the user specified by the required user_id or username parameter.
 *
 *  @param : user_id   require
 *  @param : username  optional
 */
exports.getUser = function (req, res, next) {

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
      , 'username firstname lastname email photo_profile bod gender city country bio interest facebook twitter last_login'
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

/*
 *  PUT users/update
 *  Only the parameters specified will be updated.
 *
 *  @params : user_id    require
 */
exports.updateProfile = function (req, res, next) {

  var user_id = req.body.user_id

  if(validator.isNull(user_id)) {
    return errorHelper.not_found(res)
  }

  var dataToUpdate = req.body

  delete dataToUpdate._id
  delete dataToUpdate.user_id
  delete dataToUpdate.username

  User.findByIdAndUpdate( user_id, dataToUpdate, function (err, user){
    if(err) {
      errorHelper.mongoose(res, err)
    } else {
      return res.json(200, user)
    }
  })
}
