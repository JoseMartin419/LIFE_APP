// =====================================================
// 📁 App.js — LIFE Monterrey App (versión final con login real)
// =====================================================

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import AuthProvider, { useAuth } from "./src/auth/AuthContext";

// 🔹 Pantallas principales
import CommunityScreen from "./src/pages/CommunityScreen";
import HomeScreen from "./src/pages/HomeScreen";
import MiPanelScreen from "./src/pages/MiPanelScreen";
import ProfileScreen from "./src/pages/ProfileScreen";

// 🔹 Pantallas de autenticación
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// =====================================================
// 🔹 NAVEGACIÓN PRINCIPAL CON TABS
// =====================================================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#E63946",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          height: 65,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Inicio") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Comunidad") iconName = focused ? "people" : "people-outline";
          else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline";
          else if (route.name === "MiPanel") iconName = focused ? "speedometer" : "speedometer-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Comunidad" component={CommunityScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="MiPanel" component={MiPanelScreen} />
    </Tab.Navigator>
  );
}

// =====================================================
// 🔹 NAVEGADOR CONDICIONAL SEGÚN SESIÓN
// =====================================================
function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#280102" }}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={{ color: "#fff", marginTop: 16 }}>Cargando LIFE Monterrey...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// =====================================================
// 🚀 APP PRINCIPAL
// =====================================================
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
