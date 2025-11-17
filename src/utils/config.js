// Centralized API base URL helper
const raw = import.meta.env.VITE_API_URL_V2 || 'http://localhost:8001/api';
// Ensure no trailing slash
export const BASEURL = raw.replace(/\/+$/, '');

export default {
  BASEURL
};
