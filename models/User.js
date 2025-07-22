const Task = require('./Task');

class User {

    constructor(username, password, maxTaskId, token, tasks) {
        this.username = username;
        this.password = password;
        this.maxTaskId = maxTaskId;
        this.token = token;
        this.tasks = tasks.map(t => new Task(t.id, t.title, t.done));
    }

    getTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    addTask(task) {
        task.id = ++this.maxTaskId;
        this.tasks.push(task);
    }

    updateTask(id, done) {
        const task = this.getTaskById(id);
        if (task) {
            task.done = done;
            return task;
        }
        return null;
    }

    getToken() {
        return this.token;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            return this.tasks.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = User;
