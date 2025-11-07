// =====================================================
// 📁 src/pages/roles/Participant/ParticipantDashboard.jsx
// =====================================================
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../auth/AuthContext";
import API from "../../../auth/axiosConfig";


export default function ParticipantDashboard() {
  const { user, logout } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

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
    <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" backgroundColor="#E11928" translucent={false} />

      {/* 🔹 HEADER superior */}
      <View style={styles.topHeader}>
        <Image
          source={require("../../../assets/images/LIFE_LOGO_BLANCO.png")} // ✅ Logo empresa
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.rightIcons}>
          {/* Avatar */}
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Menú ⋯ */}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔻 Modal de opciones */}
      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={18} color="#333" />
              <Text style={styles.menuText}>Ver perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={18} color="#333" />
              <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#E11928" />
              <Text style={[styles.menuText, { color: "#E11928" }]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 🔸 Contenido principal */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>¡Hola, {fullName.split(" ")[0]}!</Text>
            <Text style={styles.headerSubtitle}>
              Bienvenido a tu panel LIFE. Continúa creciendo, liderando e inspirando.
            </Text>
          </View>
        </View>

        {/* 🔸 Tarjetas principales */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <Ionicons name="bar-chart-outline" size={28} color="#dd2022" />
            <Text style={styles.cardTitle}>Estadísticas</Text>
            <Text style={styles.cardText}>XP: 1200 • Nivel: 5 • Racha: 7 días</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="ribbon-outline" size={28} color="#dd2022" />
            <Text style={styles.cardTitle}>Progreso</Text>
            <Text style={styles.cardText}>Programa Básico — Día 4/10</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="calendar-outline" size={28} color="#dd2022" />
            <Text style={styles.cardTitle}>Eventos</Text>
            {loadingEventos ? (
              <ActivityIndicator size="small" color="#dd2022" />
            ) : (
              <Text style={styles.cardText}>{eventos.length} próximos</Text>
            )}
          </View>
        </View>

        {/* 🔹 Próxima sesión */}
        <View style={styles.cardWide}>
          <Ionicons name="time-outline" size={26} color="#dd2022" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardTitle}>Próxima sesión</Text>
            <Text style={styles.cardText}>
              Coaching de Liderazgo — 2 Nov, 10:00 AM
            </Text>
            <TouchableOpacity>
              <Text style={styles.link}>Ver en Calendario →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  topHeader: {
    backgroundColor: "#E11928",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  logo: {
    width: 120,
    height: 40,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 60,
    marginRight: 12,
    paddingVertical: 8,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  container: { flex: 1 },
  header: {
    backgroundColor: "#dd2022",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    flexBasis: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardWide: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontWeight: "700", fontSize: 16, marginTop: 6 },
  cardText: { color: "#444", fontSize: 14, marginTop: 4 },
  link: { color: "#dd2022", fontWeight: "700", marginTop: 6 },
});
