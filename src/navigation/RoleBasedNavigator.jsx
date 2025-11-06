// src/navigation/RoleBasedNavigator.jsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../auth/AuthContext";

// 🔹 Navigators por rol
import ParticipantTabs from "./ParticipantTabs";

// 🔹 Placeholders mínimos para otros roles (puedes expandirlos luego)
import CEODashboard from "../pages/roles/CEO/CEODashboard";
import CoachDashboard from "../pages/roles/Coach/CoachDashboard";
import DirectorDashboard from "../pages/roles/Director/DirectorDashboard";
import SeniorDashboard from "../pages/roles/Senior/SeniorDashboard";

const Stack = createStackNavigator();

export default function RoleBasedNavigator() {
  const { roleName } = useAuth();

  switch (roleName) {
    case "Participante":
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ParticipantTabs" component={ParticipantTabs} />
        </Stack.Navigator>
      );
    case "Senior":
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SeniorDashboard" component={SeniorDashboard} />
        </Stack.Navigator>
      );
    case "Coach":
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CoachDashboard" component={CoachDashboard} />
        </Stack.Navigator>
      );
    case "Director":
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DirectorDashboard" component={DirectorDashboard} />
        </Stack.Navigator>
      );
    case "CEO":
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CEODashboard" component={CEODashboard} />
        </Stack.Navigator>
      );
    default:
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ParticipantTabs" component={ParticipantTabs} />
        </Stack.Navigator>
      );
  }
}
