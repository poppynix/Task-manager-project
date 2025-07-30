const path = require('path'); 
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
    try {
        const user = await userService.getUserByUsername(req.params.username);
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.addUser(username, password);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { dataType, newData } = req.body;
    try {
        const user = await userService.updateUser(req.params.username, dataType, newData);
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.username);
        res.json({ success: true, message: 'User deleted successfully', Users: this.getAllUsers() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}