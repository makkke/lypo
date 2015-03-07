'use strict';

var express = require('express');
var controller = require('./lypos.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
// router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
// router.put('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.put('/:id/favorite', auth.isAuthenticated(), controller.favorite);
router.put('/:id/unfavorite', auth.isAuthenticated(), controller.unfavorite);

module.exports = router;