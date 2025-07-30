const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const userRepo = require('./repositries/userRepositry');
userRepo.loadUsers();
dotenv.config();

app.use(express.json()); 

app.use('/tasks', taskRoutes);
app.use('/admin', userRoutes);
app.use('/auth', authRoutes);

// middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); 
});

// error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

//starts the server 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

