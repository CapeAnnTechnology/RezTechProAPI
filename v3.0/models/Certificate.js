/*
 |--------------------------------------
 | Checklist Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	name: { type: String, required: true },
	startDatetime: { type: Date },
  	endDatetime: { type: Date, required: true },
	timestamp: { type: Date, required: true },
	version: { type: String, required: true },
	ipAddress: { type: String },
	number: { type: String },
});

module.exports = mongoose.model('Certificate', certificateSchema);

// {
//     "_id" : ObjectId("5b3abed87039f3f85187d0e4"),
//     "title" : "Crowd Manager Training Program",
//     "description" : "Designation of Crowd Manager",
//     "name" : "James R. Smith",
//     "startDatetime" : ISODate("2018-04-20T14:00:00.000Z"),
//     "endDatetime" : ISODate("2020-04-21T20:00:00.000Z"),
//     "userId" : ObjectId("5b36b0b3d4fbb1070044790a"),
//     "timestamp" : ISODate("2018-06-13T14:00:00.000Z"),
//     "viewPublic" : true,
//     "ipAddress" : "127.0.0.1",
//     "version" : "1.1.2015",
//     "number" : "T14vcotGQxTrmWU"
// }