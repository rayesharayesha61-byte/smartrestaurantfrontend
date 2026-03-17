
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer({ navigation, role }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ position: "relative",backgroundColor:"#fff"}}>
      
   
<TouchableOpacity
  style={[
    styles.fab,
    {
      bottom:
        (role === "waiter" || role === "chef" || role==="manager" ? 67 : 25) + insets.bottom
    }
  ]}
  onPress={() => {
    if (role === "admin" || role === "manager") {
      navigation.navigate("CreateTable");
    } 
    else if (role === "waiter") {
      navigation.navigate("OrderScreen");
    } 
    else if (role === "chef") {
      navigation.navigate("OrderHistroy");
    } 
    else if (role === "cashier") {
      navigation.navigate("HistoryScreen");
    }
  }}
>
  <Ionicons 
    name="add" 
    size={28} 
    color="#fff"
    style={{
      marginTop:
        role === "waiter" || role === "chef" || role === "manager" ? -3 : 0
    }}
  />
</TouchableOpacity>

     <SafeAreaView edges={["bottom"]} style={[styles.footer,{backgroundColor:"#fff"}]}>

        {/* WAITER MENU */}
        {role === "waiter" && (
          <>
            <NavItem icon="home" text="HOME" screen="WaiterDashboard" navigation={navigation}/>
           
            <NavItem icon="clipboard-list" text="ORDERS" screen="OrderScreen" type="mc" navigation={navigation}/>
            
            <NavItem icon="seat-outline" text="RESERVED" screen="Reservations" type="mc" navigation={navigation}/>
          </>
        )}

        {/* MANAGER MENU */}
        {role === "manager" && (
          <>
            <NavItem icon="table" text="TABLES" screen="CreateTable" type="mc" navigation={navigation}/>
            <NavItem icon="account-group" text="STAFF" screen="StaffManagementScreen" type="mc" navigation={navigation}/>
            <NavItem icon="food" text="MENU" screen="MenuManagement" type="mc" navigation={navigation}/>
          </>
        )}

        {/* ADMIN MENU */}
        {role === "admin" && (
          <>
            <NavItem icon="clipboard-list" text="OVERVIEW" screen="OverviewScreen" type="mc" navigation={navigation}/>
            <NavItem icon="account-group" text="STAFF" screen="StaffManagementScreen" type="mc" navigation={navigation}/>
            <View style={{width:60}}/>
            <NavItem icon="food" text="MENU" screen="MenuManagement" type="mc" navigation={navigation}/>
                    <NavItem icon="chart-line" text="REPORTS" screen="ReportScreen" type="mc" navigation={navigation}/>
          </>
        )}

        {/* CHEF MENU */}
        {role === "chef" && (
          <>
            <NavItem icon="clipboard-list" text="ORDERS" screen="Chef" type="mc" navigation={navigation}/>
            <NavItem icon="warehouse" text="INVENTORY" screen="InventoryScreen" type="mc" navigation={navigation}/>
            <NavItem icon="history" text="HISTORY" screen="OrderHistroy" type="mc" navigation={navigation}/>
          </>
        )}

        {/* CASHIER MENU */}
        {role === "cashier" && (
          <>
            <NavItem icon="clipboard-list" text="HOME" screen="CashierDashboard" type="mc" navigation={navigation}/>
            <NavItem icon="history" text="BILLING" screen="HistoryScreen" type="mc" navigation={navigation}/>
          </>
        )}

      </SafeAreaView>
    </View>
  );
}

function NavItem({ icon, text, screen, type, navigation }) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => navigation.navigate(screen)}
    >
      {type === "mc" ? (
        <MaterialCommunityIcons name={icon} size={22} color="#ff6b3d" />
      ) : (
        <Ionicons name={icon} size={22} color="#ff6b3d" />
      )}
      <Text style={styles.navText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 footer: {
  backgroundColor: "#fff",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  // borderTopWidth: 1,
  // borderColor: "#eee",
  paddingVertical: 12,
  paddingBottom:18,
  elevation: 10,
},

  navItem: {
    alignItems: "center",
    width:70,
  },

  navText: {
    fontSize: 11,
    marginTop: 4,
    color: "#333",
  },

 fab: {
  position: "absolute",
  alignSelf: "center",
bottom:30,
  backgroundColor: "#ff6b3d",
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  elevation: 10,
  zIndex: 100,
}
});