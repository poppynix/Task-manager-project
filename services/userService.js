const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUsers = async () => {
    const users = await User.find({}, 'username role');
    return users;
};

exports.getUserById = async (id) => {
    if (!id) {
        throw new Error('ID is required');
    }
    const user = await User.findOne({ _id: id }, 'username role');
    if (!user) {
        throw new Error('User does not exist');
    }
    return user;    
}

exports.addUser = async (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = new User({
        username,
        password: await bcrypt.hash(password, 10),
    });
    await newUser.save();
    return newUser;
}

exports.updateUser = async (username, dataType, newData) => {
    if (!username || !dataType || !newData){
        throw new Error ('Data is missing');
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    if (dataType === 'username'){
        user.username = newData;
        await user.save();
        return user;
    }
    else if (dataType === 'password'){
        user.password = await bcrypt.hash(newData, 10);
        await user.save();
        return user;
    }
    else {
        throw new Error ('Data type is not valid');
    }
}

exports.deleteUser = async (username) => {
    if (!username) {
        throw new Error('Username is required');
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    await user.deleteOne({ _id: user.id });
}