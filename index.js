const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
    console.error('MongoDB connection error:', err);  
});

app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/admin', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); 
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});