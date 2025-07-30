const Task = require('./Task');

class User {

    constructor(username, password, maxTaskId, tasks) {
        this.username = username;
        this.password = password;
        this.maxTaskId = maxTaskId;
        this.tasks = tasks || [];
    }
}

module.exports = User;
