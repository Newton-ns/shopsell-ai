import axios from "axios";

/**
 * API-ready Axios layer.
 * The current demo intentionally uses local mock functions in App.jsx.
 * Move the mock objects here or replace these methods with FastAPI endpoints.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 10000,
});

export const getProducts = () => Promise.resolve([]);
export const getProductIntelligence = (id) => Promise.resolve({ id });
export const getDemandIntelligence = () => Promise.resolve({});
export const getRecommendation = (id) => Promise.resolve({ id });
export const generateMarketingContent = (data) => Promise.resolve(data);
export const getCampaigns = () => Promise.resolve([]);
export const getAnalytics = () => Promise.resolve({});