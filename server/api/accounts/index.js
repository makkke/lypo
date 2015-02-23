'use strict';

var express = require('express');
var controller = require('./accounts.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', controller.create);
router.get('/me', auth.isAuthenticated(), controller.me);

module.exports = router;
