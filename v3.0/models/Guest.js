/*
 |--------------------------------------
 | Guest Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  doorId: { type: Schema.Types.ObjectId, ref: 'Door', required: true },
  timestamp: { type: Date, required: true },
  data: { type: String, required: true },
  count: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  additional: [],
  ipAddress: { type: String, required: false },
  userAgent: { type: String, required: false },
});

module.exports = mongoose.model('Guest', guestSchema);

