const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User');
const Task = require('../models/Task');

let users = [];

async function loadUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        users = JSON.parse(data || '[]').map(u => new User(
            u.username,
            u.password,
            u.maxTaskId,
            (u.tasks || []).map(t => new Task(t.id, t.title, t.done))
        ));
    } catch (err) {
        console.error('Error loading users:', err);
    }
}

async function saveUsers() {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users.map(u => ({
    username: u.username,
    password: u.password,
    maxTaskId: u.maxTaskId,
    tasks: u.tasks
    })), null, 2), 'utf8');

    } catch (error) {
        console.error('Error saving users:', error);
    }
}

function getUsers() {
    return users;
}

function setUsers(newUsers) {
    users = newUsers;
    saveUsers();
}

module.exports = {
    loadUsers,
    saveUsers,
    getUsers,
    setUsers,
};