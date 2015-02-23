'use strict';

var _ = require('lodash');
var Lypo = require('./lypo.model');
var Author = require('../authors/author.model');

exports.index = function (req, res) {
  Author
    .find({ account: req.account._id }, function (err, authors) {
      Lypo
        .find()
        .or([{ accountId: req.account._id }, { author: { $in: authors } }])
        .populate('author')
        .populate('accountId')
        .exec(function (err, lypos) {
          if(err) { return handleError(res, err); }
          Lypo.populate(lypos, { path: 'author.account', model: 'Account' }, function (err, lypos) {
            if(err) { return handleError(res, err); }
            return res.json(200, lypos);
          })
        })
    });

  // Lypo
  //   // // .find({ accountId: req.account._id })
  //   // // .and()
  //   // .find()
  //   // // .where('author.account').equals(req.account._id)
  //   // .populate('author')
  //   // .exec(function (err, lypos) {
  //   //   console.log(lypos);
  //   //   if(err) { return handleError(res, err); }
  //   //   Lypo.populate(lypos, { path: 'author.account', model: 'Account' }, function (err, lypos) {
  //   //     if(err) { return handleError(res, err); }
  //   //     return res.json(200, lypos);
  //   //   })
  //   // });
  //   //
  //   // .find({ accountId: req.account._id })
  //   // .and()
  //   .find({ accountId: req.account._id })
  //   // .where('author.account').equals(req.account._id)
  //   // .populate('author', null, { account: req.account._id })
  //   .populate('author')
  //   // .or({ accountId: req.account._id })
  //   .exec(function (err, lypos) {
  //     console.log(lypos);
  //     if(err) { return handleError(res, err); }
  //     Lypo.populate(lypos, { path: 'author.account', model: 'Account' }, function (err, lypos) {
  //       if(err) { return handleError(res, err); }
  //       return res.json(200, lypos);
  //     })
  //   });
};

// // Get a single thing
// exports.show = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     return res.json(thing);
//   });
// };

exports.create = function (req, res) {
  var lypo = new Lypo(req.body);
  lypo.accountId = req.account._id;
  lypo.save(function (err) {
    if(err) { return handleError(res, err); }
    Lypo
      .findById(lypo._id)
      .populate('author')
      .exec(function (err, lypo) {
        if(err) { return handleError(res, err); }
        return res.json(201, lypo);
      });
  });
};

// // Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, thing);
//     });
//   });
// };

// // Deletes a thing from the DB.
// exports.destroy = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}