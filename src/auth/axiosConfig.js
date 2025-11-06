// src/auth/axiosConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.1.69:8001",  // 🔹 reemplaza por tu IP local real
    timeout: 15000,
});

// ➕ Inyecta el token desde AsyncStorage
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔁 Manejo de 401 (opcional: refrescar token si lo usas)
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // Si tienes refresh, podrías implementarlo aquí
      await AsyncStorage.multiRemove(["access", "refresh", "user"]);
    }
    return Promise.reject(error);
  }
);

export default API;
