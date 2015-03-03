/**
 * Initializes account's avatar url using gravatar
 */

'use strict';

var _         = require('lodash'),
    mongoose  = require('mongoose'),
    devConfig = require('../server/config/environment/development'),
    qaConfig  = require('../server/config/environment/qa'),
    prConfig  = require('../server/config/environment/production'),
    crypto    = require('crypto'),
    Account   = require('../server/api/accounts/account.model');

var config = prConfig;
mongoose.connect(config.mongo.uri, config.mongo.options);

Account.find(function (err, accounts) {
  if(err) { return console.log(err); }

  _.each(accounts, function (account) {
    // var hash = crypto.createHash('md5').update(account.email).digest('hex');
    // account.avatar.url = 'http://www.gravatar.com/avatar/' + hash;
    // account.save();
  });
  console.log(accounts);

  // process.exit(0);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});