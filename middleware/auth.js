const fs = require('fs').promises;
const path = require('path');
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/User');
const Task = require('../models/Task');

// reads users (& their tasks) from users.json
async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data || '[]').map(u => new User(u.username, u.password, u.maxTaskId, u.tasks));
    } catch (err) {
        console.error('Error reading users:', err);
        return [];
    }
}

// module.exports runs before any route handler
// it checks if the request has a valid Authorization header
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization; // reads Basic/Bearer/etc token from request header

    if (!authHeader || !authHeader.startsWith('Basic ')) { // checks if the authorization header is present and starts with 'Basic'
        return res.status(401).json({ error: 'Unauthorized (missing or invalid header)'});
    }

    const base64Credentials = authHeader.split(' ')[1]; // split(' ') splits at the space,[1] gets the credentials (user and pass)
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8'); // translates base64 to utf-8 string
    const [username, password] = credentials.split(':'); // format will be username:password

    if (!username || !password) { // checks if username and password are present
        return res.status(401).json({ error: 'Unauthorized (missing username or password)'});
    }

    try {
        const users = await readUsers();
        const user = users.find(u => u.username === username && u.password === password); // checks if user exists in users.json
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized (invalid username, user not found)' });
        }
        req.user = user; // attach user to request object
        req.users = users; // attach users to request object for later use
        next();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}