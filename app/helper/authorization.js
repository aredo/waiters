"use strict";
var _ = require('lodash')
var errPrint     = {}

/*
 *  Access Token authorization routing middleware
 */
exports.requiresAccessToken = function (req, res, next) {

  var access_token = req.query.access_token;

  if(_.isEmpty(access_token)) {
    errPrint.status  = 403
    errPrint.type    = "OAuthException"
    errPrint.message = "Unauthorized, need access token to access this API route"
    return res.json(403, errPrint)
  } else {
    next()
  }
}
