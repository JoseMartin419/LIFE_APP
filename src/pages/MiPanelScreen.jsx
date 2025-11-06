// =====================================================
// 📁 MiPanelScreen.jsx — LIFE Monterrey (Dashboard Personal)
// =====================================================

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function MiPanelScreen() {
  const { user } = useAuth();

  const firstName = user?.first_name || user?.username || "Líder";
  const role = user?.role || "Participante";
  const level = user?.level || "Nivel no asignado";
  const generation = user?.generation || "Generación pendiente";

  const enrolledCount = user?.enrolled_count || 0;
  const badges = user?.badges?.length || 0;

  return (
    <LinearGradient colors={["#280102", "#1a0001"]} style={styles.container}>
      <View style={styles.inner}>
        {/* ===================================================== */}
        {/* 🔹 ENCABEZADO */}
        {/* ===================================================== */}
        <Text style={styles.welcomeText}>¡Hola, {firstName}! 👋</Text>
        <Text style={styles.roleText}>{role}</Text>

        {/* ===================================================== */}
        {/* 🔹 NIVEL Y GENERACIÓN */}
        {/* ===================================================== */}
        <View style={styles.infoCard}>
          <Ionicons name="school-outline" size={28} color="#E63946" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.infoLabel}>Nivel actual</Text>
            <Text style={styles.infoValue}>{level}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="people-outline" size={28} color="#E63946" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.infoLabel}>Generación</Text>
            <Text style={styles.infoValue}>{generation}</Text>
          </View>
        </View>

        {/* ===================================================== */}
        {/* 🔹 ESTADÍSTICAS */}
        {/* ===================================================== */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="person-add-outline" size={24} color="#E63946" />
            <Text style={styles.statNumber}>{enrolledCount}</Text>
            <Text style={styles.statLabel}>Enrolados</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="ribbon-outline" size={24} color="#E63946" />
            <Text style={styles.statNumber}>{badges}</Text>
            <Text style={styles.statLabel}>Insignias</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="calendar-outline" size={24} color="#E63946" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Eventos</Text>
          </View>
        </View>

        {/* ===================================================== */}
        {/* 🔹 ACCESOS RÁPIDOS */}
        {/* ===================================================== */}
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-circle-outline" size={26} color="#fff" />
            <Text style={styles.actionText}>Mi Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people-outline" size={26} color="#fff" />
            <Text style={styles.actionText}>Comunidad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar-outline" size={26} color="#fff" />
            <Text style={styles.actionText}>Eventos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 24, paddingTop: 70 },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  roleText: {
    fontSize: 16,
    color: "#E63946",
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
  infoValue: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E63946",
    marginVertical: 4,
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
    paddingVertical: 16,
  },
  actionText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 5,
    fontWeight: "500",
  },
});
