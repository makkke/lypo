'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

var LypoSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  text: { type: String, required: true },
  at: { type: Date, required: true },
  favorited: Boolean
});

LypoSchema.set('toJSON', {
  transform: function (doc, lypo) {
    lypo.id = lypo._id;
    delete lypo._id;
    delete lypo.__v;
  }
});

LypoSchema.plugin(timestamps);

module.exports = mongoose.model('Lypo', LypoSchema);