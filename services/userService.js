const bcrypt = require('bcrypt');
const User = require('../models/User');
const userRepo = require('../repositries/userRepositry');

exports.getUsers = () => {
    return userRepo.getUsers();
};

exports.getUserByUsername = (username) => {
    const user = userRepo.getUsers().find(user => user.username === username);
    if (!user){
        throw new Error('User does not exist');
    }
    else {
        return user;
    }
}

exports.addUser = async (username, password) => {
    const users = userRepo.getUsers();
    if (!username || !password){
        throw new Error ('Username and password are required');
    }
    const user = this.getUserByUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, hashedPassword, 0, []);
    users.push(newUser);
    userRepo.setUsers(users);
    return newUser;
}

exports.updateUser = async (username, type, newData) => {
    if (!username || !type || !newData){
        throw new Error ('Data is missing');
    }
    const users = userRepo.getUsers();
    const user = this.getUserByUsername(username);
    if (type === 'username'){
        user.username = newData;
        userRepo.setUsers(users);
        return user;
    }
    else if (type === 'password'){
        user.password = await bcrypt.hash(password, 10);
        userRepo.setUsers(users);
        return user;
    }
    else {
        throw new Error ('Data type is not valid');
    }
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

