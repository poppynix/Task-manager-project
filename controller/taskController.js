const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User'); 
const Task = require('../models/Task'); 
const taskService = require('../services/taskService');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user);
        res.json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.user, req.params.id);
        res.json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createTask = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const task = await taskService.addTask(req.user, title);
    res.status(201).json({success: true, message: 'Task created successfully', task });
}

exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.user, req.params.id);
        res.json({success: true, task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.user, req.params.id);
        res.json({ success: true, message: 'Task deleted successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

