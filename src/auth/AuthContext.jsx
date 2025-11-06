// src/auth/AuthContext.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "./axiosConfig";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// 💼 Roles (misma semántica que web)
export const ROLE_MAP = {
  Participante: { level: 1, layout: "Participant" },
  Senior: { level: 2, layout: "Senior" },
  Coach: { level: 3, layout: "Coach" },
  Director: { level: 4, layout: "Director" },
  CEO: { level: 5, layout: "CEO" },
  Invitado: { level: 0, layout: null },
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Cargar usuario al iniciar
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/api/accounts/me/");
      const roleName = data.role || "Invitado";
      const hierarchyLevel = data.hierarchy_level || ROLE_MAP[roleName]?.level || 0;
      const userData = { ...data, role: roleName, hierarchy_level: hierarchyLevel };
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (e) {
      setUser(null);
      await AsyncStorage.multiRemove(["access", "refresh", "user"]);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await API.post("/api/auth/login/", { username, password });
      const { access, refresh, user: backendUser } = data;
      if (!access) throw new Error("Token no recibido");

      await AsyncStorage.setItem("access", access);
      if (refresh) await AsyncStorage.setItem("refresh", refresh);

      const roleName = backendUser.role || "Invitado";
      const hierarchyLevel =
        backendUser.hierarchy_level || ROLE_MAP[roleName]?.level || 0;

      const userData = { ...backendUser, role: roleName, hierarchy_level: hierarchyLevel };
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (e) {
      setError(e.response?.data?.detail || e.message || "Error de autenticación");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    const { data } = await API.post("/api/auth/register/", payload);
    return data;
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("access");
      if (token) await API.post("/api/auth/logout/");
    } catch {
      // noop
    } finally {
      setUser(null);
      await AsyncStorage.multiRemove(["access", "refresh", "user"]);
    }
  };

  // 🔎 Derivados
  const roleName = user?.role || "Invitado";
  const roleLevel = user?.hierarchy_level || 0;
  const isParticipant = roleName === "Participante";
  const isSenior = roleName === "Senior";
  const isCoach = roleName === "Coach";
  const isDirector = roleName === "Director";
  const isCEO = roleName === "CEO";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        fetchUserProfile,
        roleName,
        roleLevel,
        isParticipant,
        isSenior,
        isCoach,
        isDirector,
        isCEO,
        isAuthenticated: !!user,
        hasRole: (r) => roleName === r,
        hasRoleLevel: (lvl) => roleLevel >= lvl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
