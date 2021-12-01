const talentRoute = require('express').Router()
const TalentController = require('../controllers/TalentController');
const {authentication} = require('../middlewares/auth');

talentRoute.get('/', authentication, TalentController.getTalent);
talentRoute.get('/:id', authentication, TalentController.getTalentById);
// talentRoute.get('/all', TalentController.getTalentAll);
talentRoute.post('/add', authentication, TalentController.addTalent);
talentRoute.get('/:id', authentication, TalentController.talentById);
talentRoute.put('/edit/:id', authentication, TalentController.editTalent);
talentRoute.delete('/delete/:id', authentication, TalentController.deleteTalent);

module.exports = talentRoute;