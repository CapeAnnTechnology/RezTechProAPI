/*
 |--------------------------------------
 | Door Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'Door'},
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Door', doorSchema);
