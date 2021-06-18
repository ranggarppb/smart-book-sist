const routers = require("express").Router();
const loginController = require('../controllers/loginController')

routers.get('/', loginController.showLoginForm)
routers.post('/', loginController.login)

module.exports = routers;
