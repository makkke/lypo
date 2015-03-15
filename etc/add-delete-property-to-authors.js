/**
 * Initializes account's avatar url using gravatar
 */

'use strict';

var _         = require('lodash'),
    mongoose  = require('mongoose'),
    devConfig = require('../server/config/environment/development'),
    //qaConfig  = require('../server/config/environment/qa'),
    prConfig  = require('../server/config/environment/production'),
    crypto    = require('crypto'),
    Author   = require('../server/api/authors/author.model');

var config = devConfig;
mongoose.connect(config.mongo.uri, config.mongo.options);

Author.find(function (err, authors) {
  if(err) { return console.log(err); }

  _.each(authors, function (author) {
    if(!author.hasOwnProperty('deleted')) {
      author.deleted = false;
    }
    author.save();
  });

  // process.exit(0);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});