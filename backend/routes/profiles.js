const express = require('express')
const router = express.Router()
const multer = require('multer')

const {
   getProfiles,
   getProfile,
   createProfile,
   deleteProfile,
   updateProfile,
   uploadImage,

} = require('../controllers/profileController')


const { uploadImageToS3 } = require('../controllers/uploadImageToS3'); // Import uploadImageToS3 function


// const requireAuth = require('../middleware/requireAuth')

// requireauth for all profile routes
// router.use(requireAuth)


// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory to access buffer
});


//GET all profiles
router.get('/', getProfiles)

// GET a single profile
router.get('/:id', getProfile)

// POST a new profile
router.post('/', createProfile)

// DELETE a profile
router.delete('/:id', deleteProfile)

// UPDATE a profile
router.patch('/:id', updateProfile)

// Upload an image to S3
router.post('/upload-image', upload.single('image'), uploadImageToS3); // Define route for uploading image to S3



module.exports= router