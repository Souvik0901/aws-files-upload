const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileImageSchema = new Schema({
  userimage: {
    type: String,
    required: true
  },

}, { timestamps: true })

module.exports = mongoose.model('ProfileImage', profileImageSchema)