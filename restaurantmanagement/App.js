
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import Header from "./screens/Header";
import Footer from "./screens/Footer";

import LoginScreen from "./screens/LoginScreen";
import AdminDashboard from "./screens/AdminDashboard";
import ManagerDashboard from "./screens/ManagerDashboard";
import ChefDashboard from "./screens/ChefDashboard";
import WaiterDashboard from "./screens/WaiterDashboard";
import CashierDashboard from "./screens/CashierDashboard";
import BillDetailsScreen from "./screens/BillDetailsScreen";
import OrderDetails from "./screens/OrderDetails";
import MenuManagement from "./screens/MenuManagement";
import Waitermenu from "./screens/Waitermenu";
import Reservations from "./screens/Reservations";
import CreateReservation from "./screens/CreateReservation";
import AddMenuItem from "./screens/AddMenuItem";
import CreateTable from "./screens/CreateTable";
import StaffManagementScreen from "./screens/StaffManagementScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen";
import OverviewScreen from "./screens/OverviewScreen";
import HistoryScreen from "./screens/HistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistory from "./screens/OrderHistroy";
import InventoryScreen from "./screens/InventoryScreen";
import ForgotPassword from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ReportScreen from "./screens/ReportScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadUser = async () => {
    const savedUser = await AsyncStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  };

  loadUser();
}, []);
 useEffect(() => {
    StatusBar.setBackgroundColor("#ff6b35");
    StatusBar.setBarStyle("light-content");
  }, []);
if (loading) return null;
  const Layout = ({ children, navigation }) => {
    return (
      <>
        <Header user={user} navigation={navigation} setUser={setUser} />
        {children}
        <Footer user={user} navigation={navigation} role={user.role} />
      </>
    );
  };

  return (
 

 
      <SafeAreaProvider>
      <StatusBar
        backgroundColor="#ff6b35"
        barStyle="light-content"
        translucent={false}
      />
      <NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>

{!user ? (
  <>
    <Stack.Screen name="LoginScreen">
      {(props) => <LoginScreen {...props} setUser={setUser} />}
    </Stack.Screen>

    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
  </>
) : (
  <>
    {/* DASHBOARD */}
    <Stack.Screen name="Dashboard">
      {(props) => (
        <Layout navigation={props.navigation}>
          {user.role === "admin" && <AdminDashboard {...props} />}
          {user.role === "manager" && <ManagerDashboard {...props} />}
          {user.role === "chef" && <ChefDashboard {...props} />}
          {user.role === "waiter" && <WaiterDashboard {...props} />}
          {user.role === "cashier" && <CashierDashboard {...props} />}
        </Layout>
      )}
    </Stack.Screen>

    {/* ADMIN / MANAGER */}
    <Stack.Screen name="MenuManagement">
      {(props) => (
        <Layout navigation={props.navigation}>
          <MenuManagement {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="AddMenuItem">
      {(props) => (
        <Layout navigation={props.navigation}>
          <AddMenuItem {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="CreateTable">
      {(props) => (
        <Layout navigation={props.navigation}>
          <CreateTable {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="StaffManagementScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <StaffManagementScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    {/* WAITER */}
    <Stack.Screen name="OrderDetails">
      {(props) => (
        <Layout navigation={props.navigation}>
          <OrderDetails {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="Waitermenu">
      {(props) => (
        <Layout navigation={props.navigation}>
          <Waitermenu {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="Reservations">
      {(props) => (
        <Layout navigation={props.navigation}>
          <Reservations {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="CreateReservation">
      {(props) => (
        <Layout navigation={props.navigation}>
          <CreateReservation {...props} />
        </Layout>
      )}
    </Stack.Screen>

    {/* CHEF */}
    <Stack.Screen name="Chef">
      {(props) => (
        <Layout navigation={props.navigation}>
          <ChefDashboard {...props} />
        </Layout>
      )}
    </Stack.Screen>

    {/* CASHIER */}
    <Stack.Screen name="CashierDashboard">
      {(props) => (
        <Layout navigation={props.navigation}>
          <CashierDashboard {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="PaymentSuccess">
      {(props) => (
        <Layout navigation={props.navigation}>
          <PaymentSuccessScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="OverviewScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <OverviewScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="BillDetails">
      {(props) => (
        <Layout navigation={props.navigation}>
          <BillDetailsScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="HistoryScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <HistoryScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="OrderScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <OrderScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="OrderHistroy">
      {(props) => (
        <Layout navigation={props.navigation}>
          <OrderHistory {...props} />
        </Layout>
      )}
    </Stack.Screen>

    <Stack.Screen name="InventoryScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <InventoryScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>
<Stack.Screen name="ReportScreen">
      {(props) => (
        <Layout navigation={props.navigation}>
          <ReportScreen {...props} />
        </Layout>
      )}
    </Stack.Screen>
  </>
)}

</Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}