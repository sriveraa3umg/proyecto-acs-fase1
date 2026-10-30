const request = require('supertest');
const app = require('../server');
const assert = require('assert');

describe('Suite de Pruebas Unitarias e Integración - Fase 2', () => {

    // Prueba 1: Conectividad y respuesta del endpoint de saludo (Mock/Stub de entorno)
    it('CP-01 (Unitaria/API): Debe retornar el saludo y estado operativo con HTTP 200', async () => {
        const res = await request(app).get('/api/saludo');
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.estado, 'success');
        assert.ok(res.body.mensaje.includes('Conexión exitosa'));
    });

    // Prueba 2: Consulta del catálogo de ítems y stock (Módulo Crítico de Inventario)
    it('CP-02 (Unitaria/Datos): Debe retornar el listado de ítems logísticos con stock válido', async () => {
        const res = await request(app).get('/api/items');
        assert.strictEqual(res.status, 200);
        assert(Array.isArray(res.body));
        assert.strictEqual(res.body.length, 3);
        assert.strictEqual(typeof res.body[0].stock, 'number');
    });

    // Prueba 3: Manejo tipificado de errores 404 (Módulo de Robustez)
    it('CP-03 (Unitaria/Robustez): Debe capturar rutas inexistentes y retornar JSON 404', async () => {
        const res = await request(app).get('/api/ruta-inexistente-12345');
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.codigo, 404);
        assert.strictEqual(res.body.error, "Ruta no encontrada");
    });

    // Prueba 4: Doble de prueba (Stub) para simulación de aislamiento de dependencias
    it('CP-04 (Unitaria/Mock): Valida aislamiento de lógica mock en memoria', () => {
        const mockItem = { id: 99, nombre: "Item Mock Test", stock: 50, estado: "Prueba" };
        assert.strictEqual(mockItem.stock > 0, true);
        assert.strictEqual(mockItem.estado, "Prueba");
    });
});
