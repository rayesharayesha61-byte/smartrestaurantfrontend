
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "./screens/Header";

import LoginScreen from "./screens/LoginScreen";
import AdminDashboard from "./screens/AdminDashboard";
import ManagerDashboard from "./screens/ManagerDashboard";
import ChefDashboard from "./screens/ChefDashboard";
import WaiterDashboard from "./screens/WaiterDashboard";
import CashierDashboard from "./screens/CashierDashboard";

import TablesListScreen from "./screens/TablesListScreen";
import MenuManagement from "./screens/MenuManagement";
import Waitermenu from "./screens/Waitermenu";
import Reservations from "./screens/Reservations";
import CreateReservation from "./screens/CreateReservation";
import AddMenuItem from "./screens/AddMenuItem";
import CreateTable from "./screens/CreateTable";
import StaffManagementScreen from "./screens/StaffManagementScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* LOGIN SCREEN */}
          {!user ? (
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          ) : (
            <>
              {/* DASHBOARD + HEADER WRAPPER */}
              <Stack.Screen name="Dashboard">
                {(props) => (
                  <>
                    <Header {...props} user={user} setUser={setUser} />
                    
                    {/* Role-based main screen */}
                    {user.role === "admin" && <AdminDashboard {...props} />}
                    {user.role === "manager" && <ManagerDashboard {...props} />}
                    {user.role === "chef" && <ChefDashboard {...props} />}
                    {user.role === "waiter" && <WaiterDashboard {...props} />}
                    {user.role === "cashier" && <CashierDashboard {...props} />}
                  </>
                )}
              </Stack.Screen>

              {/* ADMIN / MANAGER SCREENS */}
              <Stack.Screen name="MenuManagement" component={MenuManagement}  />
              <Stack.Screen name="AddMenuItem" component={AddMenuItem} />
              <Stack.Screen name="CreateTable" component={CreateTable} />
              <Stack.Screen name="StaffManagementScreen" component={StaffManagementScreen} />

              {/* WAITER SCREENS */}
              <Stack.Screen name="TablesListScreen" component={TablesListScreen} />
           
              <Stack.Screen name="Reservations" component={Reservations} />
              <Stack.Screen name="CreateReservation" component={CreateReservation} />

              {/* CHEF */}
              <Stack.Screen name="Chef" component={ChefDashboard} />

              {/* CASHIER */}
              <Stack.Screen name="Cashier" component={CashierDashboard} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}