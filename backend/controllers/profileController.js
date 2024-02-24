const Profile = require('../models/profileModel')
const ProfileImage = require('../models/profileImageModel')
const mongoose = require('mongoose')




// get all profiles
const getProfiles = async(req,res)=>{
    const user_id = req.user._id
    const profiles = await Profile.find({user_id}).sort({createAt:-1})
    res.status(200).json(profiles)
}



// get a single profile
const getProfile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const profile = await Profile.findById(id)

  if (!profile) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(profile)
}






// create a new profile
const createProfile = async(req,res)=>{
  const {username, email, about, designation,skills,education, contact, address, socialmedia} = req.body
  let emptyFields = []

  if (!username) {
    emptyFields.push('username')
  }

  if (!email) {
    emptyFields.push('email')
  }

  if (!about) {
    emptyFields.push('about')
  }

  if (!designation) {
    emptyFields.push('designation')
  }

  if (!skills) {
    emptyFields.push('skills')
  }

  if (!education) {
    emptyFields.push('education')
  }

  if (!contact) {
    emptyFields.push('contact')
  }
  if (!address) {
    emptyFields.push('address')
  }
 
  if (!socialmedia) {
    emptyFields.push('socialmedia')
  }




  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }


    //add doc to db
  try {
    const user_id = req.user._id
    const profile = await Profile.create({username, email, about, designation,skills,education, contact, address, socialmedia, user_id})
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




// delete a profile
const deleteProfile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const profile = await Profile.findOneAndDelete({_id: id})

  if(!profile) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(profile)

}


// update a profile
const updateProfile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const profile = await Profile.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!profile) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(profile)
}

const uploadImage = async(req,res)=>{
   const imageurl = `/api/profiles/images/${req.file.filename}`;

   const  profileimage = new ProfileImage({
    userimage: imageurl
   })

   await profileimage.save();

   return res.status(200).json(profileimage)
}


module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
  uploadImage
}