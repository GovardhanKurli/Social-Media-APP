

const mongoose = require('mongoose')
//  UserSchema
const UserSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
   },
   password: {
    type: String,
    required: true,
   },
   profilePic: {
    type: String,
    default: ''
   },
   coverPic: {
    type: String,
    default: ''
   },
   followers: {
    type: Array,
    default: []
   },
   followings: {
    type: Array,
    default: []
   },
   posts: {
    type: Array,
    default: []
   }
}, {timestamps: true});


//  Exporting UserSchema

module.exports = mongoose.model("User", UserSchema)
