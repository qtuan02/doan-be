const { Router } = require("express");
const userController = require("../controllers/UserController");
const authenticate = require("../common/securities/middleware");

const userRoutesAdmin = Router();
const userRoutesUser = Router();

userRoutesAdmin.get('/', [authenticate.authenticateToken, authenticate.permission(['admin'])], userController.findAll);
userRoutesAdmin.post('/', [authenticate.authenticateToken, authenticate.permission(['admin'])], userController.createUser);
userRoutesAdmin.put('/:id', [authenticate.authenticateToken, authenticate.permission(['admin'])], userController.updateUser);
userRoutesUser.get('/profile', userController.profile);
userRoutesUser.post('/register', userController.register);
userRoutesUser.post('/login', userController.login);
userRoutesUser.put('/changePassword', userController.changePassword);
userRoutesUser.put('/changeProfile', userController.changeProfile);


module.exports = {
    userRoutesAdmin,
    userRoutesUser
};