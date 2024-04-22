const express = require('express')
const routes = express.Router();
const userController = require('../controllers/users');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

module.exports = routes;