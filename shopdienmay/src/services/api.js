import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  // baseURL: 'http://172.246.9.106:8080/api', 
  // baseURL: 'https://e81f-27-3-193-44.ngrok-free.app/api',
  // httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),


});

export default api;