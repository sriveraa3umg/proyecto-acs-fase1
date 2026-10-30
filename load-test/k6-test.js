import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },  // Rampa de subida a 10 usuarios
    { duration: '3m', target: 50 },  // Sostenido en 50 usuarios virtuales (VUs)
    { duration: '1m', target: 0 },   // Rampa de bajada
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // El percentil 95 debe ser menor a 500ms
    http_req_failed: ['rate<0.01'],   // Tasa de error menor al 1%
  },
};

export default function () {
  const BASE_URL = 'https://mi-backend-acs.onrender.com';

  // Prueba sobre endpoint de saludo
  let resSaludo = http.get(`${BASE_URL}/api/saludo`);
  check(resSaludo, {
    'estado 200 en saludo': (r) => r.status === 200,
  });

  sleep(1);

  // Prueba sobre endpoint de ítems
  let resItems = http.get(`${BASE_URL}/api/items`);
  check(resItems, {
    'estado 200 en items': (r) => r.status === 200,
  });

  sleep(1);
}
