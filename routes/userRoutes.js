const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.post('/register', userController.createUser);
router.put('/:username/:type', userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;