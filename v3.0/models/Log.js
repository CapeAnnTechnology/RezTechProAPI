/*
 |--------------------------------------
 | Log Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  userId: String,
  action: String,
  data: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  timestamp: { type: Date, required: true },
  viewPublic: Boolean,
  additional: [],
  fileName: String,
  level: { type: Number, required: true },
  lineNumber: String,
  message: String
});

module.exports = mongoose.model('Log', logSchema);

// {
//     "_id" : ObjectId("5b3011587039f3f8514d590c"),
//     "userId" : "auth0|5b29de71b69286427c2bf37a",
//     "action" : "Created Business",
//     "data" : "{venue: Jose's LLC, address: 123 Main Street, Beverly, MA, telephone: 9785551292}",
//     "ipAddress" : "10.20.20.181",
//     "userAgent" : "Mozilla/5.0 (iPad; CPU OS 11_3 like Mac OS X)",
//     "datetime" : ISODate("2018-06-19T16:01:00.000Z"),
//     "viewPublic" : false
// }

// additional: []
// fileName: "main.js"
// level: 5
// lineNumber: "3112"
// message: "Server Side Log Message"
// timestamp: "2018-06-25T02:44:02.194Z"