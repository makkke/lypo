'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  text: { type: String, required: true },
  at: { type: Date, required: true }
});

QuoteSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Quote', QuoteSchema);