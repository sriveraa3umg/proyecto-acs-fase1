const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint de prueba de conectividad (Relacionado con CU-01 y CP-03)
app.get('/api/saludo', (req, res) => {
    res.json({
        estado: "success",
        mensaje: "Conexión exitosa con el backend en la nube",
        proyecto: "Fase 1 - Aseguramiento de Calidad"
    });
});

// Endpoint de consulta de inventario/ítems (Relacionado con CU-02 y CP-05)
app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, nombre: "Servidor Cloud Node.js", stock: 15, estado: "Operativo" },
        { id: 2, nombre: "Módulo Frontend Estático", stock: 30, estado: "Operativo" },
        { id: 3, nombre: "Base de Datos Mock", stock: 10, estado: "Mantenimiento" }
    ];
    res.json(items);
});

// Manejo de rutas inexistentes (Devuelve JSON 404 en lugar de HTML)
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        codigo: 404,
        mensaje: "El recurso solicitado no existe en el servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
