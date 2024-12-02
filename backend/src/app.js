// Import Express
const express = require('express');

// Buat aplikasi Express
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Rute utama
app.get('/', (req, res) => {
    res.send('Selamat datang di backend Titipin!');
});

// Contoh rute lain (GET)
app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item A', price: 5000 },
        { id: 2, name: 'Item B', price: 10000 },
    ];
    res.json(items);
});

// Contoh rute lain (POST)
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    res.status(201).json({
        message: 'Item berhasil ditambahkan!',
        item: newItem
    });
});

// Port untuk server
const PORT = process.env.PORT || 3000;

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
