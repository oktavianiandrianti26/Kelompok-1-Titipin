require('dotenv').config(); // Memuat variabel dari .env
const express = require('express');
const app = express();
const mongoose = require('./config/db');

// Middleware
app.use(express.json());

// Port dari .env, fallback ke 5000 jika tidak ada
const PORT = process.env.PORT || 3000;

// Rute sederhana untuk pengujian
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
