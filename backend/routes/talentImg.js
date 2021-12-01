const talentImgRoute = require('express').Router()
const TalentImageController = require('../controllers/TalentImgController');
const {authentication} = require('../middlewares/auth');

talentImgRoute.get('/', TalentImageController.getTalentImg);
talentImgRoute.put('/edit/:id', TalentImageController.update);

module.exports = talentImgRoute;