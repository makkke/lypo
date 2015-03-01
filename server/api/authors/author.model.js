'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'Account' },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  fullName: String
});

AuthorSchema.set('toJSON', {
  transform: function (doc, author) {
    author.id = author._id;
    delete author._id;
    delete author.__v;
  }
});

AuthorSchema.plugin(timestamps);

module.exports = mongoose.model('Author', AuthorSchema);