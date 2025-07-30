const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', adminAuth, userController.getAllUsers);
router.get('/:username', adminAuth, userController.getUserByUsername);
router.post('/register', adminAuth, userController.createUser);
router.put('/:username', adminAuth, userController.updateUser);
router.delete('/:username', adminAuth, userController.deleteUser);

module.exports = router;