// API configuration
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Other configuration constants can be added here
export const API_ENDPOINTS = {
    HEALTH: `${API_URL}/health`,
    USERS: `${API_URL}/users`,
    ARTICLES: `${API_URL}/articles`,
    DIGESTS: `${API_URL}/digests`,
}; 