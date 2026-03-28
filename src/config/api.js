// Central API base URL — reads from environment variable
// In development: http://localhost:5000
// In production: your deployed backend URL (set in .env.production or hosting env vars)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
