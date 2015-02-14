'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Account = require('../api/accounts/account.model');

// Passport Configuration
require('./local/passport').setup(Account, config);
require('./google/passport').setup(Account, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/google', require('./google'));

module.exports = router;