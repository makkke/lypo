'use strict';

var _ = require('lodash');
var Lypo = require('./lypo.model');
var Author = require('../authors/author.model');

exports.index = function (req, res) {
  Author
    .find({ account: req.account._id }, function (err, authors) {
      Lypo
        .find()
        .or([{ creator: req.account._id }, { author: { $in: authors } }])
        .populate('author')
        .populate('creator', 'fullName _id')
        .exec(function (err, lypos) {
          if(err) { return serverError(res, err); }
          Lypo.populate(lypos, { path: 'author.account', select: 'fullName _id', model: 'Account' }, function (err, lypos) {
            if(err) { return serverError(res, err); }
            lypos = _.map(lypos, function (lypo) {
              if(lypo.author.account) {
                lypo.author.fullName = lypo.author.account.fullName;
                lypo.author.account = lypo.author.account._id;
              }
              return lypo;
            });
            return res.json(200, lypos);
          })
        })
    });
};

// // Get a single lypo
// exports.show = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return serverError(res, err); }
//     if(!thing) { return res.send(404); }
//     return res.json(thing);
//   });
// };

exports.create = function (req, res) {
  var lypo = new Lypo(req.body);
  lypo.creator = req.account._id;
  lypo.save(function (err) {
    if(err) { return serverError(res, err); }
    return res.json(201, lypo);
  });
};

// // Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return serverError(res, err); }
//     if(!thing) { return res.send(404); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return serverError(res, err); }
//       return res.json(200, thing);
//     });
//   });
// };

exports.destroy = function (req, res) {
  Lypo.findOne({
    _id: req.params.id,
    creator: req.account._id,
  })
  .exec(function (err, lypo) {
    if(err) { return serverError(res, err); }
    if(!lypo) { return notFoundError(res); }
    lypo.remove(function (err) {
      if(err) { return serverError(res, err); }
      return noContent(res);
    });
  });
};

function serverError(res, err) {
  return res.send(500, err);
}

function notFoundError(res, err) {
  return res.send(404, { message: 'The specified lypo does not exist' });
}

function noContent(res) {
  res.send(204);
}