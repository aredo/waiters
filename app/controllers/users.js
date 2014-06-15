var mongoose    = require('mongoose')
var User        = mongoose.model('User')
var UserBank    = mongoose.model('UserBank')
var async       = require('async')
var errorHelper = require('../helper/errors')
var validator   = require('validator')
var _           = require('lodash')

var resultPrint = {}
var errPrint    = {}

/*
 * GET users/show
 * Returns a variety of information about the user specified by the required user_id or username parameter.
 *
 *  @param : user_id   require
 *  @param : username  optional
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

/*
 *  PUT users/update
 *  Only the parameters specified will be updated.
 *
 *  @params : user_id    require
 */
exports.updateProfile = function (req, res, next) {

  var user_id = req.body.user_id

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

/*
 *  POST banks/update
 *  Only the parameters specified will be updated.
 *
 *  @params : user_id    require
 *  @params : bank_id    require
 */
exports.postBank = function (req, res, next) {

  var user    = req.body.user_id
  var bank_id = req.body.bank_id

  delete req.body.bank_id
  delete req.body.user_id

  var dataBank = req.body
  dataBank.user = user

  if (validator.isNull(bank_id)) {

    var newBank = new UserBank(dataBank)

    newBank.save(function (err, bank) {
      if(err) {
        errPrint.status  = 500;
        errPrint.message = err.message
        errPrint.data    = err.errors
        errorHelper.mongoose(res, errPrint)
      } else {
        return res.json(200, bank)
      }
    })

  } else {

    var condition = {
        $and : [
          { _id : bank_id },
          { user : user }
        ]
      };

    UserBank.findOneAndUpdate(condition, dataBank, function (err, bank) {
      if(err) {
        errPrint.status  = 500;
        errPrint.message = err.message
        errPrint.data    = err.errors
        errorHelper.mongoose(res, errPrint)
      } else {
        if (_.isObject(bank)) {
          return res.json(200, bank)
        } else {
          return errorHelper.custom(res, { code : 400, message: 'Bank not exist to update.'});
        }
      }
    })
  }
}
