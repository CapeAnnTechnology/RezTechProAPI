/*
 |--------------------------------------
 | Checklist Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistSchema = new Schema({
	venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	timestamp: { type: Date, required: true },
	version: { type: String, required: true },
	ipAddress: { type: String, required: true },
	userAgent: { type: String, required: true },
	question_1: { type: String, required: true },
	question_2: { type: String, required: true },
	question_3: { type: String, required: true },
	question_4: { type: String, required: true },
	question_5: { type: String, required: true },
	question_6: { type: String, required: true },
	question_7: { type: String, required: true },
	question_7_date: { type: Date, required: true },
	question_8: { type: String, required: true },
	question_9: { type: String, required: true },
	question_9_person: { type: String, required: true },
	question_10: { type: String, required: true },
	question_10_person: { type: String, required: true },
	question_11: { type: String, required: true },
	question_11_capacity: { type: Number, required: true },
	question_11_date: { type: Date, required: true },
	question_12: { type: String, required: true },
	question_12_date: { type: Date, required: true },
	question_13: { type: String, required: true },
	question_13_date: { type: Date, required: true },
	question_14: { type: String, required: true },
	question_14_date: { type: Date, required: true },
	question_15: { type: String, required: true },
	question_15_date: { type: Date, required: true }
});

module.exports = mongoose.model('Checklist', checklistSchema);