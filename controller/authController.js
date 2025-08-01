const authService = require('../services/authService');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.registerUser(username, password);
        res.status(201).json({ success: true, user: { username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
    const token = await authService.loginUser(username, password);
    res.json({ message: 'Login successful', token });
    } catch (err) {
    res.status(401).json({ error: err.message });
    }
};