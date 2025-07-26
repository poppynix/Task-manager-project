const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const userRepo = require('../repositries/userRepositry');
const e = require('express');

exports.getUsers = () => {
    return userRepo.getUsers();
};

exports.getUserByUsername = (username) => {
    return userRepo.getUsers().find(user => user.username === username);
}

exports.addUser = async (username, password) => {
    const users = userRepo.getUsers();
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, hashedPassword, 0, []);
    users.push(newUser);
    userRepo.setUsers(users);
    return newUser;
}

exports.changePassword = async (username, newPassword) => {
    const users = userRepo.getUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error('User not found');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    userRepo.setUsers(users);
    return user;
}

exports.changeUsername = async (username, newUsername) => {
    const users = userRepo.getUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error('User not found');
    }
    else if (users.some(u => u.username === newUsername)) {
        throw new Error('Username already exists');
    }

    user.username = newUsername;
    userRepo.setUsers(users);
    return user;
}

exports.deleteUser = async (username) => {
    const users = userRepo.getUsers();
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    users.splice(userIndex, 1);
    userRepo.setUsers(users);
}

