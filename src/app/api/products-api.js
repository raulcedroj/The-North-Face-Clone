const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'the_north_face_db',
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Get all products

app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener :', err);
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.json({ productos: results });
        }
    });
});

// Get product by id
app.get('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM productos WHERE referencia = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.json({ productos: results[0] });
            }
        }
    });
});


// Insert product
app.post('/api/productos', (req, res) => {
    const newProduct = req.body;
    db.query('INSERT INTO productos (referencia, nombre, precio, descripcion, oferta, imagen) VALUES (?, ?, ?, ?, ?, ?)',

        [newProduct.referencia, newProduct.nombre, newProduct.precio, newProduct.descripcion, newProduct.oferta, newProduct.imagen], (err, results) => {

            if (err) {
                console.error('Error al crear el producto:', err);
                res.status(500).json({ error: 'Error al crear el producto' });
            } else {
                res.json({ message: 'Producto creado con éxito', producto: newProduct });
            }
        });
});


// Update product
app.put('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    db.query('UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, oferta = ?, imagen = ? WHERE referencia = ?',

        [updatedProduct.nombre, updatedProduct.precio, updatedProduct.descripcion, updatedProduct.oferta, updatedProduct.imagen, productId], (err, results) => {

            if (err) {
                console.error('Error al actualizar el producto:', err);
                res.status(500).json({ error: 'Error al actualizar el producto' });
            } else {
                res.json({ message: 'Producto actualizado con éxito', usuario: updatedProduct });
            }
        });
});

// Delete product
app.delete('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    db.query('DELETE FROM productos WHERE referencia = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
            res.json({ message: 'Producto eliminado con éxito' });
        }
    });
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});