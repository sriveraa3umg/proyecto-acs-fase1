const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS y recepción de JSON
app.use(cors());
app.use(express.json());

// Ruta de prueba (Endpoint principal del API)
app.get('/api/saludo', (req, res) => {
  res.json({
    estado: "success",
    mensaje: "¡Conexión exitosa entre el Frontend y el Backend en la nube!",
    proyecto: "Aseguramiento de la Calidad de Software - Fase 1"
  });
});

// Ruta de ejemplo para simular lógica de negocio (Gestión de inventario / items)
app.get('/api/items', (req, res) => {
  res.json([
    { id: 1, nombre: "Producto A - Módulo Crítico", stock: 45, estado: "Activo" },
    { id: 2, nombre: "Producto B - Componente Web", stock: 12, estado: "Bajo Stock" },
    { id: 3, nombre: "Producto C - Base de Datos", stock: 100, estado: "Activo" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});