const Task = require('../models/Task');
const userRepo = require('../repositries/userRepositry');

exports.getTasks = async (user) => {
    const users = userRepo.getUsers();
    return users.find(u => u.username === user.username)?.tasks || [];
};

exports.getTaskById = async (user, id) => {
    const tasks = await exports.getTasks(user);
    if (!tasks) {
        throw new Error('No tasks found');
    }
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

exports.addTask = async (user, title) => {
    const users = userRepo.getUsers();
    const foundUser = users.find(u => u.username === user.username);
    if (foundUser) {
        const task = new Task(foundUser.maxTaskId + 1, title, false);
        foundUser.maxTaskId = foundUser.maxTaskId + 1;
        foundUser.tasks.push(task);
        userRepo.setUsers(users);
        return task;
    }
};

exports.updateTask = async (user, id) => {
    const users = userRepo.getUsers();
    const foundUser = users.find(u => u.username === user.username);
    if (foundUser) {
        const taskIndex = foundUser.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex !== -1) {
            foundUser.tasks[taskIndex].done = !foundUser.tasks[taskIndex].done;
            userRepo.setUsers(users);
            return foundUser.tasks[taskIndex];
        }
    }
};

exports.deleteTask = async (user, id) => {
    const users = userRepo.getUsers();
    const foundUser = users.find(u => u.username === user.username);
    if (foundUser) {
        const taskIndex = foundUser.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex !== -1) {
            foundUser.tasks.splice(taskIndex, 1);
            userRepo.setUsers(users);
            return foundUser.tasks[taskIndex];
        }
    }
};
