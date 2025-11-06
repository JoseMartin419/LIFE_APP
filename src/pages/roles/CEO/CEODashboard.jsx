import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function CEODashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel Senior</Text>
      <Text>Próximamente: mentoring, notas, board…</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
});
