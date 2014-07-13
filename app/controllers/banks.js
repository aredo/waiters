var mongoose    = require('mongoose')
var User        = mongoose.model('User')
var UserBank    = mongoose.model('UserBank')
var async       = require('async')
var errorHelper = require('../helper/errors')
var validator   = require('validator')
var _           = require('lodash')

var resultPrint = {}
var errPrint    = {}

exports.load = function(req, res, next, bank_id){
  UserBank.load(bank_id, function (err, user) {
    if (err) return next(err)
    if (!user) return errorHelper.not_found(res);
    next()
  })
}

/*
 *  GET users/banks/:bank_id
 *
 *  Get single bank by bank id
 *
 *  params
 *    @bank_id
 */
exports.getBanks = function (req, res, next) {
  var bank_id = req.params.bank_id

  UserBank.findById(bank_id, function(err, bank) {
    if(err) {
      errPrint.status  = 500;
      errPrint.message = err.message
      errPrint.data    = err.errors
      return errorHelper.mongoose(res, errPrint)
    } else {
      user
      return res.json(200, bank)
    }

  })
}

/*
 *  POST banks/update
 *  Only the parameters specified will be updated.
 *
 *  @params : user_id    [require]
 *  @params : bank_id    [for update this field require]
 */
exports.postBanks = function (req, res, next) {

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
        return errorHelper.mongoose(res, errPrint)
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


/*
 *  GET users/:user_id/banks
 *
 *  get list of bank by :user_id
 *
 *  params
 *    @user_id
 */
exports.userBanks = function (req, res, next) {
  var user_id = req.params.user_id

  UserBank
    .find( {user: user_id})
    // .cache(false)
    .exec(function(err, banks) {

      if(err) {
        errPrint.status  = 500;
        errPrint.message = err.message
        errPrint.data    = err.errors
        return errorHelper.mongoose(res, errPrint)
      } else {
        return res.json(200, banks)
      }

    })
}
