"use strict";
// config for the express app
// depending on `process.env.NODE_ENV`, default is `development`

var path = require('path')
var rootPath = path.normalize(__dirname + '/../..')

var config = {
  // Development config
  //
  development: {
    server: {
      port: 9696,
      hostname: 'localhost',
    },
    clientServer: [
      'http://buzzer.findbuzzer.local:9898',
      'http://advertiser.findbuzzer.local:9898',
      'http://cdn.findbuzzer.local:9898'
    ],
    database: {
      url: 'mongodb://localhost/findbuzzer_dev'
    },
    BaseApiURL : 'http://api.findbuzzer.local:9696',
    cdn_assets : 'http://cdn.findbuzzer.local:8080',
    root     : rootPath,
    app      : {
      name : 'FindBuzzer'
    },
    twitterAuth: true,
    twitter: {
      consumerKey: process.env.TWITTER_KEY || 'NLzXYYbGv18jgNXTiAHhoNs0B',
      consumerSecret: process.env.TWITTER_SECRET  || '05BAcEwSHWZ5sad7Iq1T3pkGn29TLIEwXMzDsQvvwifyW0O056',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || '130231167059298',
      clientSecret: process.env.FACEBOOK_SECRET || '5075ceb6528af28382b2e10c48f46b71',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@sandbox49936.mailgun.org',
      password: process.env.MAILGUN_PASSWORD || '1fq8qzwl14w8'
    }
  },
  //
  // Production Config
  //
  production: {
    server: {
      port: 3001,
      hostname: process.env.HOSTNAME || '127.0.0.1',
    },
    clientServer: [
      'http://buzzer.findbuzzer.com',
      'http://advertiser.findbuzzer.com',
      'http://cdn.findbuzzer.com'
    ],
    database: {
      url: 'mongodb://localhost/findbuzzer'
    },
    BaseApiURL : 'http://api.findbuzzer.com',
    cdn_assets : 'http://cdn.findbuzzer.com',
    root     : rootPath,
    app      : {
      name : 'FindBuzzer'
    },
    twitterAuth: true,
    twitter: {
      consumerKey: process.env.TWITTER_KEY || 'NLzXYYbGv18jgNXTiAHhoNs0B',
      consumerSecret: process.env.TWITTER_SECRET  || '05BAcEwSHWZ5sad7Iq1T3pkGn29TLIEwXMzDsQvvwifyW0O056',
      callbackURL: '/auth/twitter/callback',
      passReqToCallback: true
    },
    facebookAuth: true,
    facebook: {
      clientID: process.env.FACEBOOK_ID || 'xxxxxxxxxxxxx',
      clientSecret: process.env.FACEBOOK_SECRET || 'xxxxxxxxxxxxx',
      callbackURL: '/auth/facebook/callback',
      passReqToCallback: true
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'postmaster@tukangslicing.net',
      password: process.env.MAILGUN_PASSWORD || '7f4v46je15w1'
    }
  },

  //
  // Testing config
  //
  test: {
    server: {
      port: 4001,
      hostname: 'localhost',
    },
    database: {
      url: 'mongodb://localhost/findbuzzer_test'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
