/*
 |--------------------------------------
 | Guest Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  timestamp: { type: Date, required: true },
  data: { type: String, required: true },
  count: { type: String, required: true },
  userId: String,
  action: { type: String, required: true },
  additional: [],
});

module.exports = mongoose.model('Guest', guestSchema);

