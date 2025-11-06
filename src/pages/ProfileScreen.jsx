// =====================================================
// 📁 ProfileScreen.jsx — LIFE Monterrey (perfil real conectado al backend)
// =====================================================

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // 🔹 Función para obtener iniciales si no hay foto
  const getInitials = () => {
    if (user?.first_name || user?.last_name) {
      return `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || "U";
  };

  return (
    <LinearGradient colors={["#280102", "#1a0001"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ===================================================== */}
        {/* 🔹 ENCABEZADO */}
        {/* ===================================================== */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {user?.profile_image ? (
              <Image
                source={{ uri: user.profile_image }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>{getInitials()}</Text>
            )}
          </View>

          <Text style={styles.userName}>
            {user?.first_name
              ? `${user.first_name} ${user.last_name || ""}`
              : user?.username || "Usuario LIFE"}
          </Text>

          <Text style={styles.userEmail}>
            {user?.email || "usuario@lifemonterrey.com"}
          </Text>

          {user?.role && (
            <Text style={styles.userRole}>Rol: {user.role}</Text>
          )}
          {user?.level && (
            <Text style={styles.userRole}>Nivel: {user.level}</Text>
          )}
          {user?.generation && (
            <Text style={styles.userRole}>Generación: {user.generation}</Text>
          )}
        </View>

        {/* ===================================================== */}
        {/* 🔹 INFORMACIÓN DEL USUARIO */}
        {/* ===================================================== */}
        <View style={styles.infoSection}>
          {user?.bio ? (
            <Text style={styles.bioText}>"{user.bio}"</Text>
          ) : (
            <Text style={styles.bioText}>
              “Sin biografía por el momento.”
            </Text>
          )}

          {user?.contract_statement && (
            <Text style={styles.statementText}>
              🌟 {user.contract_statement}
            </Text>
          )}
        </View>

        {/* ===================================================== */}
        {/* 🔹 ESTADÍSTICAS */}
        {/* ===================================================== */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user?.enrolled_count || 0}
            </Text>
            <Text style={styles.statLabel}>Inscritos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user?.is_angel ? "Sí" : "No"}
            </Text>
            <Text style={styles.statLabel}>¿Ángel?</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user?.badges?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Insignias</Text>
          </View>
        </View>

        {/* ===================================================== */}
        {/* 🔹 MÉTODO DE PAGO */}
        {/* ===================================================== */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Método de pago</Text>
          <Text style={styles.paymentText}>
            {user?.payment_method || "Sin método registrado"}
          </Text>

          {user?.payment_reference ? (
            <Text style={styles.paymentRef}>
              Referencia: {user.payment_reference}
            </Text>
          ) : (
            <Text style={styles.paymentRef}>Sin referencia registrada</Text>
          )}
        </View>

        {/* ===================================================== */}
        {/* 🔹 MENÚ */}
        {/* ===================================================== */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Mi Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Mis Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Notificaciones</Text>
          </TouchableOpacity>
        </View>

        {/* ===================================================== */}
        {/* 🔹 BOTÓN DE LOGOUT */}
        {/* ===================================================== */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60 },
  header: { alignItems: "center", marginBottom: 30 },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E63946",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  userRole: {
    fontSize: 14,
    color: "#E63946",
    marginTop: 5,
  },
  infoSection: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  bioText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
  statementText: {
    color: "#FFD166",
    textAlign: "center",
    fontWeight: "600",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 12,
  },
  statItem: { alignItems: "center" },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  paymentSection: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  paymentText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  paymentRef: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
  },
  menuSection: { marginBottom: 30 },
  menuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuText: { fontSize: 16, color: "#FFFFFF", fontWeight: "500" },
  logoutButton: {
    backgroundColor: "#E63946",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
