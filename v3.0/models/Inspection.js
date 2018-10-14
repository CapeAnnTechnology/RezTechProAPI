/*
 |--------------------------------------
 | Inspection Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspectionSchema = new Schema({
    type: { type: String, required: true },
    inspectionDatetime: { type: Date, required: true },
    expirationDatetime: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, //, required: true
    timestamp: { type: Date, required: true },
    userAgent: { type: String },
    referrer: { type: String },
    ipAddress: { type: String, required: true },
    version: { type: String },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
});

module.exports = mongoose.model('Inspection', inspectionSchema);
