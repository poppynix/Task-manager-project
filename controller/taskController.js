const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User'); 
const Task = require('../models/Task'); 

// saves users (& their tasks) to users.json
async function saveUsers(users) {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
    console.error('Error saving users:', error);
    }
}

exports.getAllTasks = async (req, res) => {
    res.json({success: true, tasks: req.user.getTasks() || []});
}

exports.getTaskById = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = req.user.getTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({success: true, task});
}

exports.createTask = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = new Task((req.user.maxTaskId || 0) + 1, title, false);
    req.user.addTask(newTask);

    await saveUsers(req.users);

    res.status(201).json({success: true, task: newTask});
}

exports.updateTask = async (req, res) => {
    req.user.updateTask(parseInt(req.params.id), req.body.done);

    await saveUsers(req.users); 

    res.json({success: true, task: req.user.getTaskById(parseInt(req.params.id))});
}

exports.deleteTask = async (req, res) => {
    req.user.deleteTask(parseInt(req.params.id));

    await saveUsers(req.users);

    res.json({success: true, message: 'Task deleted successfully'});
}

//new file for save and read