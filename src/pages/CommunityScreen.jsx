import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function CommunityScreen() {
  return (
    <LinearGradient
      colors={["#280102", "#1a0001"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Comunidad LIFE</Text>
          <Text style={styles.subtitle}>
            Conecta con personas extraordinarias
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15K+</Text>
            <Text style={styles.statLabel}>Miembros</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>120+</Text>
            <Text style={styles.statLabel}>Eventos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Ciudades</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>LIFE Experience 2024</Text>
              <Text style={styles.eventDate}>15 Diciembre 2024</Text>
              <Text style={styles.eventLocation}>Monterrey, MX</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Testimonios</Text>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "LIFE transformó completamente mi manera de ver el éxito y las relaciones humanas."
            </Text>
            <Text style={styles.testimonialAuthor}>- Ana García</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E63946",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E63946",
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#E63946",
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  testimonialCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  testimonialText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontStyle: "italic",
    marginBottom: 10,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
});