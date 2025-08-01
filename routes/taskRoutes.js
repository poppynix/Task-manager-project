const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); 
const taskController = require('../controller/taskController'); 

router.use(authMiddleware)

router.get('/', authMiddleware, taskController.readAllTasks);
router.get('/:id', authMiddleware, taskController.readTaskById);
router.post('/', authMiddleware, taskController.createTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;