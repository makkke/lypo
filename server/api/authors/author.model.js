'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account'},
  fullName: String
});

AuthorSchema.set('toJSON', {
  transform: function (doc, author) {
    author.id = author._id;
    if(author.account && author.account.fullName) {
      author.fullName = author.account.fullName;
      delete author.account;
    }
    delete author._id;
    delete author.__v;
  }
});

AuthorSchema.plugin(timestamps);

module.exports = mongoose.model('Author', AuthorSchema);