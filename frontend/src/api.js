import axios from 'axios';

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || 'https://eventeasepro-backend.onrender.com',
});

export default API;
