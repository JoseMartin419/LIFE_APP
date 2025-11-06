import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import API from "../../../auth/axiosConfig";

export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/api/events/");
        setEvents(data || []);
      } catch {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay eventos.</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  card: { borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, marginBottom: 10 },
  cardTitle: { fontWeight: "700", marginBottom: 4 },
  cardText: { color: "#444" },
});
