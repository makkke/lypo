'use strict';

var _ = require('lodash'),
    Lypo = require('./lypo.model'),
    Author = require('../authors/author.model'),
    Account = require('../accounts/account.model');

exports.index = function (req, res) {
  var favorited = false;
  var skip = req.query.skip || 0;
  var limit = req.query.limit || 10;

  if(req.query.favorited) { favorited = (req.query.favorited === 'true'); }

  if(favorited) {
    Account.findById(req.account._id, function (err, account) {
      if(err) { return serverError(res, err); }
      Lypo
        .find()
        .where('_id').in(account.favorites)
        .populate('author')
        .populate('creator', '_id fullName avatar')
        .sort('-at')
        .skip(skip)
        .limit(limit)
        .exec(function (err, lypos) {
          if(err) { return serverError(res, err); }
          Lypo.populate(lypos, { path: 'author.account', select: '_id fullName avatar', model: 'Account' }, function (err, lypos) {
            if(err) { return serverError(res, err); }
            lypos = _.map(lypos, function (lypo) {
              lypo.favorited = true;
              if(lypo.author.account) {
                lypo.author = {
                  fullName: lypo.author.account.fullName,
                  avatar: {
                    url: lypo.author.account.avatar.url
                  },
                  account: lypo.author.account._id,
                }
              }
              return lypo;
            });
            return res.json(200, lypos);
          })
        })
    })
  } else {
    Account.findById(req.account._id, function (err, account) {
      if(err) { return serverError(res, err); }
      Author.find({ account: req.account._id }, function (err, authors) {
        Lypo
          .find()
          .or([{ creator: req.account._id }, { author: { $in: authors } }])
          .populate('author')
          .populate('creator', '_id fullName avatar')
          .sort('-at')
          .skip(skip)
          .limit(limit)
          .exec(function (err, lypos) {
            if(err) { return serverError(res, err); }
            Lypo.populate(lypos, { path: 'author.account', select: '_id fullName avatar', model: 'Account' }, function (err, lypos) {
              if(err) { return serverError(res, err); }
              lypos = _.map(lypos, function (lypo) {
                lypo.favorited = account.favorites.indexOf(lypo._id) !== -1;
                if(lypo.author.account) {
                  lypo.author = {
                    fullName: lypo.author.account.fullName,
                    avatar: {
                      url: lypo.author.account.avatar.url
                    },
                    account: lypo.author.account._id,
                  }
                }
                return lypo;
              });
              return res.json(200, lypos);
            })
          })
      });
    });
  }
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

exports.favorite = function (req, res) {
  Lypo.findOne({
    _id: req.params.id,
    creator: req.account._id,
  })
  .exec(function (err, lypo) {
    if(err) { return serverError(res, err); }
    if(!lypo) { return notFoundError(res); }
    Account.findById(req.account._id, function (err, account) {
      if(err) { return serverError(res, err); }
      account.favorites = account.favorites || [];
      if(account.favorites.indexOf(lypo._id) === -1) {
        account.favorites.push(lypo._id);
        account.save();
      }
      return res.json(200, {});
    });
  });
};

exports.unfavorite = function (req, res) {
  Lypo.findOne({
    _id: req.params.id,
    creator: req.account._id,
  })
  .exec(function (err, lypo) {
    if(err) { return serverError(res, err); }
    if(!lypo) { return notFoundError(res); }
    Account.findById(req.account._id, function (err, account) {
      if(err) { return serverError(res, err); }
      account.favorites = account.favorites || [];
      _.remove(account.favorites, lypo._id);
      account.markModified('favorites');
      account.save()
      return res.json(200, {});
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