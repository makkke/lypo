'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var timestamps = require('mongoose-timestamp');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var AccountSchema = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  hashedPassword: { type: String, required: true },
  provider: String,
  salt: { type: String, required: true },
  google: {},
});

/**
 * Virtuals
 */
AccountSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Non-sensitive info we'll be putting in the token
AccountSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id
    };
  });

/**
 * Validations
 */

// Validate empty password
AccountSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    if(authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate empty email
AccountSchema
  .path('email')
  .validate(function (email) {
    if(authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
AccountSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ email: value }, function (err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

// Validate empty username
AccountSchema
  .path('username')
  .validate(function (username) {
    return username.length;
  }, 'Username cannot be blank');

// Validate email is not taken
AccountSchema
  .path('username')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ username: value }, function (err, account) {
      if(err) throw err;
      if(account) {
        if(self.id === account.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified username is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
AccountSchema
  .pre('save', function (next) {
    if(!this.isNew) return next();

    if(!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
AccountSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if(!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

AccountSchema.plugin(timestamps);

AccountSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Account', AccountSchema);