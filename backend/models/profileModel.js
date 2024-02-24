const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  
  about:{
    type: String,
    required: true
  },

  designation:{
    type: String,
    required: true
  },
  skills:{
    type: String,
    required: true
  },
  education:{
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  socialmedia:{
    type: String,
    required: true
  },

  user_id:{
     type: String,
     required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)