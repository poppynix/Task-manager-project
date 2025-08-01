const Task = require('../models/Task');

exports.getTasks = async (user) => {
    if (!user || !user.id) {
        throw new Error('Data is missing');
    }
    const tasks = await Task.find({ userId: user.id });
    if (!tasks || tasks.length === 0) {
        throw new Error('No tasks found');
    }
    return tasks;
};

exports.getTaskById = async (user, id) => {
    const task = await Task.findById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    else if (task.userId.toString() !== user.id) {
        throw new Error('Unauthorized to access this task');
    }
    return task;
};

exports.addTask = async (user, title) => {
    if (!user || !user.id || !title) {
        throw new Error('Data is missing');
    }
    const newTask = new Task({
        title,
        userId: user.id,
    });
    await newTask.save();
    return newTask;
};

exports.updateTask = async (user, id) => {
    if (!user || !user.id || !id) {
        throw new Error('Data is missing');
    }
    const task = await Task.findById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    else if (task.userId.toString() !== user.id) {
        throw new Error('Unauthorized to update this task');
    }
    task.done = !task.done;
    await task.save();
    return task;
};

exports.deleteTask = async (user, id) => {
    if (!user || !user.id || !id) {
        throw new Error('Data is missing');
    }
    const task = await Task.findById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    else if (task.userId.toString() !== user.id) {
        throw new Error('Unauthorized to delete this task');
    }
    await task.deleteOne({ _id: id });
};
