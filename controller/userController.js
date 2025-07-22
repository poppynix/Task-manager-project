const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User'); 
const Task = require('../models/Task'); 
const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await userService.registerUser(username, password);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

    const user = await userService.loginUser(username, password);

    res.json({ message: 'Login successful', token: user.token });
    } catch (err) {
    res.status(401).json({ error: err.message });
    }
};