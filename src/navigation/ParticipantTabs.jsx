// =====================================================
// 📁 src/navigation/ParticipantTabs.jsx
// Tabs del participante (Academia, Inicio, Comunidad)
// =====================================================
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { BookOpen, Home, Users } from "lucide-react-native";
import React from "react";

// Screens
import CommunityScreen from "../pages/CommunityScreen";
import LearningModule from "../pages/roles/Participant/LearningModule";
import ParticipantDashboard from "../pages/roles/Participant/ParticipantDashboard";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔹 Stack interno para "Academia"
function AcademiaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LearningModule"
        component={LearningModule}
        options={{ title: "Módulo de Aprendizaje" }}
      />
    </Stack.Navigator>
  );
}

export default function ParticipantTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E11928",
        tabBarInactiveTintColor: "#666",
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      {/* 🔸 Academia */}
      {/* 🔸 Inicio (Dashboard principal) */}
      <Tab.Screen
        name="Inicio"
        component={ParticipantDashboard}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          tabBarLabel: "Inicio",
        }}
      />
      <Tab.Screen
        name="Academia"
        component={AcademiaStack}
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
          tabBarLabel: "Academia",
        }}
      />
      {/* 🔸 Comunidad */}
      <Tab.Screen
        name="Comunidad"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          tabBarLabel: "Comunidad",
        }}
      />
    </Tab.Navigator>
  );
}
