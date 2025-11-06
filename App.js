// App.js (o App.jsx en la raíz del proyecto Expo)
import React from "react";
import AuthProvider from "./src/auth/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
