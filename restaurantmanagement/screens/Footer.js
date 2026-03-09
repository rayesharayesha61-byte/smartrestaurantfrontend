

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export default function Footer({ navigation, role }) {
//   return (
//     <View style={styles.footer}>
      
//       {/* WAITER MENU */}
//       {role === "waiter" && (
//         <>
//           <NavItem
//             icon="home"
//             text="HOME"
//             screen="WaiterDashboard"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="clipboard-list"
//             text="ORDERS"
//             screen="OrderScreen"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="seat-outline"
//             text="RESERVATIONS"
//             screen="Reservations"
//             type="mc"
//             navigation={navigation}
//           />
//         </>
//       )}

//       {/* MANAGER MENU */}
//       {role === "manager" && (
//         <>
//           <NavItem
//             icon="table"
//             text="TABLES"
//             screen="CreateTable"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="account-group"
//             text="STAFF"
//             screen="StaffManagementScreen"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="food"
//             text="MENU"
//             screen="MenuManagement"
//             type="mc"
//             navigation={navigation}
//           />
         
//         </>
//       )}
// {role === "admin" && (
//         <>
//           <NavItem
//             icon="clipboard-list"
//             text="OVERVIEW"
//             screen="OverviewScreen"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="account-group"
//             text="STAFF"
//             screen="StaffManagementScreen"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="food"
//             text="MENU"
//             screen="MenuManagement"
//             type="mc"
//             navigation={navigation}
//           />
//           {/* <NavItem
//             icon="cog"
//             text="SETTINGS"
//             screen="SettingsScreen"
//             type="mc"
//             navigation={navigation}
//           /> */}
//         </>
//       )}
//       {/* CHEF MENU */}
//       {role === "chef" && (
//         <>
//           <NavItem
//             icon="clipboard-list"
//             text="ORDERS"
//             screen="ChefOrders"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="warehouse"
//             text="INVENTORY"
//             screen="InventoryScreen"
//             type="mc"
//             navigation={navigation}
//           />
//           <NavItem
//             icon="history"
//             text="HISTORY"
//             screen="OrderHistroy"
//             type="mc"
//             navigation={navigation}
//           />
//           {/* <NavItem
//             icon="account"
//             text="PROFILE"
//             screen="ProfileScreen"
//             type="mc"
//             navigation={navigation}
//           /> */}
//         </>
//       )}
//  {role === "cashier" && (
//         <>
//           <NavItem
//             icon="clipboard-list"
//             text="HOME"
//             screen="CashierDashboard"
//             type="mc"
//             navigation={navigation}
//           />
//           {/* <NavItem
//             icon="warehouse"
//             text="ORDERS"
//             screen="BillDetails"
//             type="mc"
//             navigation={navigation}
//           /> */}
//           <NavItem
//             icon="history"
//             text="BILLING"
//             screen="HistoryScreen"
//             type="mc"
//             navigation={navigation}
//           />
        
//         </>
//       )}
//     </View>
//   );
// }

// function NavItem({ icon, text, screen, type, navigation }) {
//   return (
//     <TouchableOpacity
//       style={styles.navItem}
//       onPress={() => navigation.navigate(screen)}
//     >
//       {type === "mc" ? (
//         <MaterialCommunityIcons name={icon} size={20} color="#ff6b3d" />
//       ) : (
//         <Ionicons name={icon} size={20} color="#ff6b3d" />
//       )}
//       <Text style={styles.navText}>{text}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     elevation: 10,
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navText: {
//     fontSize: 11,
//     marginTop: 4,
//     color: "#333",
//   },
// });
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer({ navigation, role }) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.footer}>

      {/* WAITER MENU */}
      {role === "waiter" && (
        <>
          <NavItem icon="home" text="HOME" screen="WaiterDashboard" navigation={navigation}/>
          <NavItem icon="clipboard-list" text="ORDERS" screen="OrderScreen" type="mc" navigation={navigation}/>
          <NavItem icon="seat-outline" text="RESERVATIONS" screen="Reservations" type="mc" navigation={navigation}/>
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
          <NavItem icon="food" text="MENU" screen="MenuManagement" type="mc" navigation={navigation}/>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
    elevation: 10,
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 11,
    marginTop: 4,
    color: "#333",
  },
});