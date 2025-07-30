const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositries/userRepositry');

exports.registerUser = async (username, password) => {
    if(!username || !password){
        throw new Error ('Data is missing');
    }
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
    if(!username || !password){
        throw new Error ('Data is missing');
    }
    const users = userRepo.getUsers();
    const user = users.find(user => user.username === username);
    if (!user) {
        throw new Error('Invalid username');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ username: user.username, password: user.password }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}