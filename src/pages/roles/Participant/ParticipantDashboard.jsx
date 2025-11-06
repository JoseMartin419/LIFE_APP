import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../../auth/AuthContext";
import API from "../../../auth/axiosConfig";

export default function ParticipantDashboard() {
  const { user, logout } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/api/events/");
        setEventos(data || []);
      } catch (e) {
        console.error("Error al cargar eventos:", e);
      } finally {
        setLoadingEventos(false);
      }
    })();
  }, []);

  const fullName = user ? `${user.first_name} ${user.last_name}` : "";

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Deseas salir de tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
            } catch (e) {
              console.error("Error al cerrar sesión:", e);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header rojo gradiente (simplificado en RN) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>¡Hola, {fullName}!</Text>
        <Text style={styles.headerSubtitle}>
          Este es tu panel LIFE — continúa creciendo, liderando e inspirando.
        </Text>
      </View>

      {/* Widgets principales */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estadísticas</Text>
          <Text style={styles.cardText}>XP: 1200 • Nivel: 5 • Racha: 7 días</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progreso</Text>
          <Text style={styles.cardText}>Programa Básico — Día 4/10</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Eventos</Text>
          <Text style={styles.cardText}>
            {loadingEventos ? "Cargando..." : `${eventos.length} próximos`}
          </Text>
        </View>
      </View>

      {/* Próxima sesión */}
      <View style={styles.cardWide}>
        <Text style={styles.cardTitle}>Próxima sesión</Text>
        <Text style={styles.cardText}>Coaching de Liderazgo — 2 Nov, 10:00 AM</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Ver en Calendario →</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#dd2022",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "800" },
  headerSubtitle: { color: "rgba(255,255,255,0.9)", marginTop: 6, fontSize: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  card: {
    flexBasis: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  cardWide: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 4,
  },
  cardTitle: { fontWeight: "700", marginBottom: 6 },
  cardText: { color: "#444" },
  link: { color: "#dd2022", fontWeight: "700", marginTop: 8 },
  logoutButton: {
    backgroundColor: "#dd2022",
    borderRadius: 30,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
