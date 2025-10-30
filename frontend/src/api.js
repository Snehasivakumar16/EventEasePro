import axios from 'axios';

// Create axios instance with your Render backend base URL
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    'https://eventeasepro-backend.onrender.com',
});

export default api;
