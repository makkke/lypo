'use strict';

var express = require('express');
var controller = require('./accounts.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create);
router.get('/me', auth.isAuthenticated(), controller.me);

module.exports = router;
