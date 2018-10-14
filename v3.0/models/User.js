/*
 |--------------------------------------
 | User Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  nickname: String,
  request_language: String,
  certificates: [{ type: Schema.Types.ObjectId, ref: 'Certificate' }],
  user_metadata: {
  	name: String,
  	prefix: String,
  	given_name: String,
  	middle_name: String,
  	family_name: String,
  	suffix: String
  }
});

module.exports = mongoose.model('User', userSchema);


// {
//     "_id" : ObjectId("5b36b0b3d4fbb1070044790a"),
//     "tenant" : "reztechpro",
//     "client_id" : "SJLqm1Itq4vSMmc8NhEl59AgV5zVAHTu",
//     "connection" : "RezTechProMongoDB",
//     "email" : "test22@example.com",
//     "password" : "$2a$10$4j2pcJH96FVw4EunM9.7Aeby4.7LZ6uBEtdjGI5jIflrdRGUmi11C",
//     "request_language" : "en-US,en;q=0.9",
//     "user_metadata" : {
//         "hobby" : "surfing"
//     },
//     "metadata" : {
//         "plan" : "full"
//     }
// }