'use strict';

var config = require('../config/environment');

exports.index = function(req, res) {
  res.json({
    currentYear: new Date().getFullYear(),
    apiUrl: '/api',
    tokenName: 'lypo.token',
    environment: config.env,
    showAds: config.showAds
  });
};