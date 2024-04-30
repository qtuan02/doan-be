const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const appConfig = require('./env.config');
const multer = require('multer');

          
cloudinary.config({ 
  cloud_name: appConfig.CLOUD_NAME, 
  api_key: appConfig.CLOUD_API_KEY, 
  api_secret: appConfig.CLOUD_API_SECRET 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nguyenkim'
  },
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const uploadCloud = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  }
});

module.exports = uploadCloud;