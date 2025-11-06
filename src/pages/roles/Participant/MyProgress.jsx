import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyProgress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Progreso</Text>
      <Text>Gráficas y avances del programa (pendiente conectar).</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
});
