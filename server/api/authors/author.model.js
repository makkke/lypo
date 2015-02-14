'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: String,
});

AuthorSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Author', AuthorSchema);