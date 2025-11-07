// =====================================================
// 📁 LoginScreen.jsx — LIFE Monterrey (con logo corporativo)
// =====================================================

import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      Alert.alert("Éxito", "Inicio de sesión exitoso");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Credenciales inválidas o error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#c31d22", "#1a0001"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* ===================================================== */}
          {/* 🔹 LOGO Y ENCABEZADO */}
          {/* ===================================================== */}
          <View style={styles.header}>
            <Image
              source={require("../assets/images/LIFE_LOGO_BLANCO.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>
              Inicia sesión en tu cuenta LIFE Monterrey
            </Text>
          </View>

          {/* ===================================================== */}
          {/* 🔹 FORMULARIO */}
          {/* ===================================================== */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Usuario o correo"
              placeholderTextColor="#999"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => Alert.alert("Registro", "Navegar a registro")}
            >
              <Text style={styles.registerText}>
                ¿No tienes cuenta?{" "}
                <Text style={styles.registerLinkText}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 24 },
  header: { alignItems: "center", marginBottom: 40 },
  logo: {
  width: 380,   // ancho
  height: 240,  // alto
  marginBottom: 30, // espacio debajo
},

  title: { fontSize: 32, fontWeight: "bold", color: "#FFF", marginBottom: 8 },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  },
  form: { width: "100%" },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
  },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPasswordText: { color: "#ffffff", fontSize: 14 },
  loginButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#E63946",
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: { alignItems: "center" },
  registerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  registerLinkText: { color: "#ffffff", fontWeight: "600" },
});
