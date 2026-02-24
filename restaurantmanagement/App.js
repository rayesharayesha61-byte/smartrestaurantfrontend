
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import AdminDashboard from "./screens/AdminDashboard";
import ManagerDashboard from "./screens/ManagerDashboard";
import ChefDashboard from "./screens/ChefDashboard";
import WaiterDashboard from "./screens/WaiterDashboard";
import CashierDashboard from "./screens/CashierDashboard";

import TablesListScreen from "./screens/TablesListScreen";
import MenuManagement from "./screens/MenuManagement";
import Waitermenu from "./screens/Waitermenu";
const Stack = createNativeStackNavigator();

export default function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {!userRole ? (
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} setUserRole={setUserRole} />
              )}
            </Stack.Screen>
          ) : (
            <>
              {userRole === "admin" && (
                <Stack.Screen name="Admin" component={AdminDashboard} />
              )}

              {userRole === "manager" && (
                <Stack.Screen name="Manager" component={ManagerDashboard} />
              )}

              {userRole === "chef" && (
                <Stack.Screen name="Chef" component={ChefDashboard} />
              )}

              {userRole === "waiter" && (
                <>
                  <Stack.Screen name="WaiterDashboard" component={WaiterDashboard} />
                  <Stack.Screen name="TablesListScreen" component={TablesListScreen} />
                  <Stack.Screen name="MenuManagement" component={Waitermenu} />
                </>
              )}

              {userRole === "cashier" && (
                <Stack.Screen name="Cashier" component={CashierDashboard} />
              )}
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}