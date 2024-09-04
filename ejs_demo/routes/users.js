var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

router.get('/', userController.getUser);

router.get('/add', userController.addUserForm);

router.post('/add', userController.addUser);

router.get('/:id/edit', userController.getUserById);

router.post('/:id/edit', userController.updateUser);

router.post('/:id/delete', userController.deleteUser);

module.exports = router;

