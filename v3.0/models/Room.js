/*
 |--------------------------------------
 | Room Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'Room'},
  venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
  title: { type: String, required: true },
  capacity: Number,
  occupancy: Number,
  progress: Number,
  doors: [{ type: Schema.Types.ObjectId, ref: 'Door' }],
});

module.exports = mongoose.model('Room', roomSchema);
