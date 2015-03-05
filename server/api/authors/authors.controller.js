'use strict';

var _ = require('lodash');
var Author = require('./author.model');

exports.index = function (req, res) {
  Author
  .find({
    creator: req.account._id,
    deleted: false
  })
  .populate('account')
  .exec(function (err, authors) {
    if(err) { return handleError(res, err); }
    authors = _.map(authors, function (author) {
      if(author.account) {
        author.fullName = author.account.fullName;
        author.account = author.account._id;
      }
      return author;
    });
    return res.json(200, authors);
  });
};

// // Get a single thing
// exports.show = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     return res.json(thing);
//   });
// };

exports.create = function(req, res) {
  var author = new Author(req.body);
  author.creator = req.account._id;
  Author
    .findOne()
    .and([
      { creator: author.creator },
      { account: author.account },
      { account: { $exists: true } },
    ])
    .exec(function (err, duplicate) {
      if(err) { return handleError(res, err); }
      if(!duplicate) {
        author.save(function (err) {
          if(err) { return handleError(res, err); }
          return res.json(201, author);
        });
      } else {
        return res.json(200, {});
      }
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

exports.destroy = function (req, res) {
  Author.findById(req.params.id, function (err, author) {
    if(err) { return handleError(res, err); }
    if(!author) { return res.send(404); }
    author.softdelete(function (err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}