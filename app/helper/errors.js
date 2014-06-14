"use strict";

var error_results = {};

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.proper = function (errors) {
  var keys = Object.keys(errors)
  var errs = []

  // if there is no validation error, just display a generic error
  if (!keys) {
    return ['Oops! There was an error']
  }

  keys.forEach(function (key) {
    errs.push(errors[key].message)
  })

  return errs
}


exports.mongoose = function (res, err) {
  var status = 400;

  if ( err.code == 11000 ) {
    status = status || 409
  }

  error_results.status  = status
  error_results.message = err.message
  error_results.data    = err.errors

  return res.json(500, error_results)
}

exports.custom = function (res, err) {
  var status = err.code || err.status;

  error_results.status  = status
  error_results.message = err.msg || err.message
  return res.json(status, error_results)
}

exports.not_found = function (res) {
  error_results.message = 'Sorry, that page does not exist'
  error_results.code    = 34 // Corresponds with an HTTP 404 - the specified resource was not found.

  return res.json(404, error_results)
}
