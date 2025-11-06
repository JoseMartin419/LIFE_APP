import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../auth/AuthContext";

export default function CEODashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Panel CEO</Text>
      <Text>Próximamente: mentoring, notas, board…</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  logoutButton: {
    backgroundColor: "#dd2022",
    borderRadius: 30,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
  },
  logoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
