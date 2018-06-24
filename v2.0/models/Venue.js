/*
 |--------------------------------------
 | Venue Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  businessId: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  faxNumber: String,
  comments: String
});

module.exports = mongoose.model('Venue', venueSchema);
