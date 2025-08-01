const userService = require('../services/userService');

exports.readAllUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.readUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
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
        res.json({ success: true, message: 'User deleted successfully', Users: await userService.getUsers() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}