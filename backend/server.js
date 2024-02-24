require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const profileRoutes = require('./routes/profiles')
const userRoutes = require('./routes/user')
const multer = require('multer')



//express app
const app = express()


//middleware
app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})



// file upload or image upload using multer fuction
const fileStorageEngine = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./largefiles")
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now()+ '__' + file.originalname);
  }
})


const upload = multer({storage: fileStorageEngine})

//routes
 app.use('/api/profiles',profileRoutes)
 app.use('/api/user', userRoutes)


 app.post('/single', upload.single('image'), (req, res) => {
  console.log(req.file, req.body)
  res.send("Single file upload success");
})


//connected to db
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{

            console.log('connected to database') 

            //listen for requests
            app.listen(process.env.PORT,()=>{
              console.log('listning on port',process.env.PORT)
            })
        })
        .catch((error)=>{
          console.log(error)
        })




