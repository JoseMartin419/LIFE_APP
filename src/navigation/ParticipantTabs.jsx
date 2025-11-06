// src/navigation/ParticipantTabs.jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Activity, BookOpen, CalendarDays, Target } from "lucide-react-native";
import React from "react";

// Screens
import LearningModule from "../pages/roles/Participant/LearningModule";
import MyEvents from "../pages/roles/Participant/MyEvents";
import MyGoals from "../pages/roles/Participant/MyGoals";
import MyProgress from "../pages/roles/Participant/MyProgress";
import ParticipantDashboard from "../pages/roles/Participant/ParticipantDashboard";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ParticipantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={ParticipantDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LearningModule"
        component={LearningModule}
        options={{ title: "Módulo" }}
      />
    </Stack.Navigator>
  );
}

export default function ParticipantTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={ParticipantStack}
        options={{
          tabBarIcon: ({ size }) => <Activity size={size} />,
          tabBarLabel: "Dashboard",
        }}
      />
      <Tab.Screen
        name="Progreso"
        component={MyProgress}
        options={{
          tabBarIcon: ({ size }) => <BookOpen size={size} />,
          tabBarLabel: "Progreso",
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={MyEvents}
        options={{
          tabBarIcon: ({ size }) => <CalendarDays size={size} />,
          tabBarLabel: "Eventos",
        }}
      />
      <Tab.Screen
        name="Metas"
        component={MyGoals}
        options={{
          tabBarIcon: ({ size }) => <Target size={size} />,
          tabBarLabel: "Metas",
        }}
      />
    </Tab.Navigator>
  );
}
