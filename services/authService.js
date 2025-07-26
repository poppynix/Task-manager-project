const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const userRepo = require('../repositries/userRepositry');
// let users = userRepo.getUsers();

exports.registerUser = async (username, password) => {
    const users = userRepo.getUsers();
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, hashedPassword, 0, []);

    users.push(newUser);
    userRepo.setUsers(users);
    return newUser;
}

exports.loginUser = async (username, password) => {
    const users = userRepo.getUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        throw new Error('Invalid username');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}