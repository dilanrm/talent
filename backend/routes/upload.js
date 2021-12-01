const uploadRoute = require('express').Router()
const UploadController = require('../controllers/UploadController');
const {authentication} = require('../middlewares/auth')

uploadRoute.post('/user/:id', authentication, UploadController.userImg);
uploadRoute.post('/talents', authentication, UploadController.prodImg);

module.exports = uploadRoute;
