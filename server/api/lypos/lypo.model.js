'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var LypoSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  text: { type: String, required: true },
  at: { type: Date, required: true }
});

LypoSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

LypoSchema.plugin(timestamps);

module.exports = mongoose.model('Lypo', LypoSchema);