const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const Task = require('../models/Task');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// reads users (& their tasks) from users.json
async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data || '[]').map(u => new User(u.username, u.password, u.maxTaskId, u.token, u.tasks));
    } catch (err) {
        console.error('Error reading users:', err);
        return [];
    }
}

// saves users (& their tasks) to users.json
async function saveUsers(users) {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
    console.error('Error saving users:', error);
    }
}

exports.registerUser = async (username, password) => {
    const users = await readUsers();
    const existingUser = users.find(u => u.username === username);
    console.log('Existing user:', existingUser);

    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, hashedPassword, 0, {}, []);
    users.push(newUser);

    await saveUsers(users);
    return newUser;
}

exports.loginUser = async (username, password) => {
    const users = await readUsers();
    const user = users.find(u => u.username === username);
    // console.log(password);
    // console.log(user.password);

    if (!user) {
        throw new Error('Invalid username');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const token = crypto.randomBytes(16).toString('hex');
    const expiry = Date.now() + 3600000; 

    user.token = { token, expiry: expiry.toString() };
    // console.log(user.token);
    await saveUsers(users);

    return user;
}