const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User'); 
const Task = require('../models/Task'); 
const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = userService.getUsers();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await userService.addUser(username, password);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const username = req.params.username;
    const dataType = req.params.type;
    console.log(`Updating ${dataType} for user: ${username}`);

    try {
        if(dataType === "password") {
            const { newPassword } = req.body;
            if (!newPassword) {
                return res.status(400).json({ error: 'Password is required' });
            }
            const user = await userService.changePassword(username, newPassword);
            return res.json({ success: true, user });
        } 
        else if (dataType === "username") {
            const { newUsername } = req.body;
            if (!newUsername) {
                return res.status(400).json({ error: 'Username is required' });
            }
            const user = await userService.changeUsername(username, newUsername);
            return res.json({ success: true, user });
        } 
        else {
            return res.status(400).json({ error: 'Invalid data type' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const username = req.params.username;
    try {
        await userService.deleteUser(username);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}