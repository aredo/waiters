var mongoose = require('mongoose');
var User     = mongoose.model('User');
var async    = require('async');

/*
 * GET users/show
 * Returns a variety of information about the user specified by the required user_id or username parameter.
 *
 */
exports.get_profile = function (req, res, next) {
  var user_id = req.query.user_id
  User
    .findOne({_id: user_id}, 'username firstname lastname photo_profile', function (err, user) {
      if (err) {
        var errPrint     = {}
        errPrint.status  = 400
        errPrint.message = err.message
        errPrint.data    = err.errors
        return res.json(200, errPrint)
      } else {
        var resultPrint     = {}
        resultPrint.status  = 200
        resultPrint.message = "success"

        resultPrint.data    = user
        return res.json(200, resultPrint)
      }
    })
}
