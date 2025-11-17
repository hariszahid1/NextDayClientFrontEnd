// Centralized API base URL helper
const raw = import.meta.env.VITE_API_URL_V2 || process.env.REACT_APP_API_URL || process.env.REACT_APP_API || '';
// Ensure no trailing slash
export const API_BASE = raw.replace(/\/+$/, '');

export default {
  API_BASE,
};
