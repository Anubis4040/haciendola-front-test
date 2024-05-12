import axios from 'axios';

export const mainInstance = axios.create({
  baseURL: process.env.API_URL, // Cambia esto por la URL de tu API en el backend
  timeout: 5000, // Tiempo máximo de espera para las solicitudes en milisegundos
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Credentials': true,
  },
});

mainInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error, 'error');
    if (error.response.status === 401) {
      localStorage.removeItem('authenticated');
    }
  }
);
