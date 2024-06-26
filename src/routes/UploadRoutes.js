const { Router } = require("express");
const uploads = require("../controllers/UploadController");
const uploadCloud = require("../configs/cloudinary");

const uploadRoutes = Router();

uploadRoutes.post('/', uploadCloud.single('image'), uploads.uploadImage);

module.exports = uploadRoutes;