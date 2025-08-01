const taskService = require('../services/taskService');

exports.readAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.user);
        res.json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.readTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.user, req.params.id);
        res.json({ success: true, task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createTask = async (req, res) => {
    const { title } = req.body;
    try{
        const task = await taskService.addTask(req.user, title);
        res.status(201).json({success: true, message: 'Task created successfully', task });
    }
    catch {
        res.status(500).json({error: error.message});
    }
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
        await taskService.deleteTask(req.user, req.params.id);
        res.json({ success: true, message: 'Task deleted successfully', Tasks: await taskService.getTasks(req.user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}