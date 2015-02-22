'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  fullName: String,
});

AuthorSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

AuthorSchema.plugin(timestamps);

module.exports = mongoose.model('Author', AuthorSchema);