/*
 |--------------------------------------
 | Business Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  faxNumber: String,
  comments: String
});

module.exports = mongoose.model('Business', businessSchema);
