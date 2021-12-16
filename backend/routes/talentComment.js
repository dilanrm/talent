const talentCommentRoute = require('express').Router()
const TalentCommentController = require('../controllers/TalentCommentController');
const {authentication} = require('../middlewares/auth');

talentCommentRoute.get('/', TalentCommentController.getTalentComment);
talentCommentRoute.post('/add',authentication, TalentCommentController.addComment);

module.exports = talentCommentRoute;