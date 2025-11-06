import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import API from "../../../auth/axiosConfig";

export default function LearningModule({ route }) {
  const { sessionId } = route.params || {};
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      if (!sessionId) return;
      try {
        const { data } = await API.get(`/api/programs/sessions/${sessionId}/`);
        setSession(data);
      } catch {}
    })();
  }, [sessionId]);

  if (!sessionId) return <View style={styles.container}><Text>Sin sesión seleccionada.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo: {session?.title || `#${sessionId}`}</Text>
      <Text>Contenido del módulo…</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
});
