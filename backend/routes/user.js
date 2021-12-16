const userRoute = require('express').Router()
const UserController = require('../controllers/UserController');
const {authentication} = require('../middlewares/auth');

userRoute.get('/', UserController.getUser);
userRoute.get('/:email', UserController.checkMail);
userRoute.post('/login', UserController.login);
userRoute.post('/register', UserController.register);
userRoute.post('/', authentication, UserController.getOne);
userRoute.get('/get/:id', UserController.getEdit);
userRoute.put('/edit/:id', UserController.editUser);
userRoute.delete('/delete/:id', UserController.deleteUser);

module.exports = userRoute;