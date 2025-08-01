const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (username, password) => {
    if(!username || !password){
        throw new Error ('Data is missing');
    }
    const user = await User.findOne({ username });
    if (user) {
        throw new Error('Username already exists');
    }
    const newUser = new User({ username, password });
    await newUser.save();
    return newUser;
}

exports.loginUser = async (username, password) => {
    if(!username || !password){
        throw new Error ('Data is missing');
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username');
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}