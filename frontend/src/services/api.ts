import axios from 'axios';

// This grabs the URL we set in .env: "http://localhost:3000/api/home"
const API_URL = import.meta.env.VITE_API_URL; 

// 1. Calculate Bill
// Call: http://localhost:3000/api/home/calculate
export const calculateBill = async (units: number) => {
  return axios.post(`${API_URL}/calculate`, { units });
};

// 2. Update Rules
// Call: http://localhost:3000/api/home/admin/config
export const updateConfig = async (data: any, adminKey: string) => {
  return axios.put(`${API_URL}/admin/config`, data, {
    headers: { 'x-admin-key': adminKey }
  });
};

// 3. Get Rules (Optional helper)
// Call: http://localhost:3000/api/home/admin/config
export const getConfig = async (adminKey: string) => {
   return axios.get(`${API_URL}/admin/config`, {
     headers: { 'x-admin-key': adminKey }
   });
};