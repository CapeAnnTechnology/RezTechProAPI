/*
 |--------------------------------------
 | Checklist Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistSchema = new Schema({
	venueId: { type: String, required: true },
	userId: { type: String, required: true },
	title: { type: String, required: true },
	location: { type: String, required: true },
	startDatetime: { type: Date, required: true },
	endDatetime: { type: Date, required: true },
	timestamp: { type: Date, required: true },
	description: String,
	viewPublic: { type: Boolean, required: true },
	version: { type: String, required: true },
	question_1: String,
	question_2: String,
	question_3: String,
	question_4: String,
	question_5: String,
	question_6: String,
	question_7: String,
	question_7_date: { type: Date, required: true },
	question_8: String,
	question_9: String,
	question_9_person: String,
	question_10: String,
	question_10_person: String,
	question_11: String,
	question_11_capacity: Number,
	question_11_date: { type: Date, required: true },
	question_12: String,
	question_12_date: { type: Date, required: true },
	question_13: String,
	question_13_date: { type: Date, required: true },
	question_14: String,
	question_14_date: { type: Date, required: true },
	question_15: String,
	question_15_date: { type: Date, required: true }
});

module.exports = mongoose.model('Checklist', checklistSchema);