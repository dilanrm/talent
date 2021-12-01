const userRoute = require('express').Router()
const UserController = require('../controllers/UserController');

userRoute.get('/', UserController.getUser);
userRoute.post('/login', UserController.login);
userRoute.post('/register', UserController.register);
userRoute.get('/:id', UserController.getOne);
userRoute.put('/edit/:id', UserController.editUser);
userRoute.delete('/delete/:id', UserController.deleteUser);

module.exports = userRoute;