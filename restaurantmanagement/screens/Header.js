
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Header({ user, navigation, setUser }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const isAdminOrManager =
    user?.role === "admin" || user?.role === "manager";

 
const handleLogout = async () => {
  setMenuVisible(false);
  await AsyncStorage.removeItem("user");
  setUser(null);
};
  const goTo = (screen) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  return (
    <>
      <SafeAreaView edges={["top"]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {user?.role?.toUpperCase()} DASHBOARD
          </Text>

          <TouchableOpacity onPress={handleLogout}>
            <Icon name="logout" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal visible={menuVisible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sideMenu}>
            <View style={styles.closeRow}>
  <TouchableOpacity onPress={() => setMenuVisible(false)}>
    <Icon name="close" size={26} color="#000" />
  </TouchableOpacity>
</View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Icon name="account-circle" size={60} color="#ff6b35" />
              <Text style={styles.userName}>{user?.name || "User"}</Text>
              <Text style={styles.userRole}>{user?.role}</Text>
            </View>


            {isAdminOrManager && (
              <>
                <MenuItem
                  icon="restaurant-menu"
                  title="Menu Management"
                  onPress={() => goTo("MenuManagement")}
                />

                <MenuItem
                  icon="add-circle"
                  title="Add Menu Item"
                  onPress={() => goTo("AddMenuItem")}
                />

                <MenuItem
                  icon="table-bar"
                  title="Create Table"
                  onPress={() => goTo("CreateTable")}
                />

                <MenuItem
                  icon="people"
                  title="Staff Management"
                  onPress={() => goTo("StaffManagementScreen")}
                />
              </>
            )}

            {user?.role === "waiter" && (
              <>
              

                <MenuItem
                  icon="event"
                  title="Reservations"
                  onPress={() => goTo("Reservations")}
                />
              </>
            )}

            {user?.role === "chef" && (
              <MenuItem
                icon="receipt-long"
                title="Orders"
                onPress={() => goTo("Chef")}
              />
            )}

            {user?.role === "cashier" && (
              <MenuItem
                icon="payments"
                title="Billing"
                onPress={() => goTo("HistoryScreen")}
              />
            )}

          </View>

          <Pressable
            style={{ flex: 1 }}
            onPress={() => setMenuVisible(false)}
          />
        </View>
      </Modal>
    </>
  );
}

const MenuItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={22} color="#444" />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#ff6b35",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
closeRow: {
  alignItems: "flex-end",
  marginBottom: 10,
},
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
  },

  sideMenu: {
    width: 270,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 20,
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  userRole: {
    fontSize: 14,
    color: "#777",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
});