const talentImgRoute = require('express').Router()
const TalentImageController = require('../controllers/TalentImgController');
const {authentication} = require('../middlewares/auth');

talentImgRoute.get('/', TalentImageController.getTalentImg);
talentImgRoute.get('/talent/:id', TalentImageController.imageByTalentId);
talentImgRoute.put('/edit/:id', TalentImageController.update);

module.exports = talentImgRoute;