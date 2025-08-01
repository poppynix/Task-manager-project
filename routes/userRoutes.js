const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.use(authMiddleware); 
router.use(adminAuth);

router.get('/',  authMiddleware,adminAuth, userController.readAllUsers);
router.get('/:id', authMiddleware, adminAuth, userController.readUserById);
router.post('/register', authMiddleware, adminAuth, userController.createUser);
router.put('/:username', authMiddleware, adminAuth, userController.updateUser);
router.delete('/:username', authMiddleware, adminAuth, userController.deleteUser);

module.exports = router;