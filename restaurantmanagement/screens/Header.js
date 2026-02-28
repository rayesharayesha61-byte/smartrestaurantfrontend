
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

export default function Header({ user, navigation, setUser }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const isAdminOrManager =
    user?.role === "admin" || user?.role === "manager";

  const handleLogout = () => {
    setMenuVisible(false);
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }], 
    });
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

            {isAdminOrManager && (
              <>
                <MenuItem
                  title="Menu Management"
                  onPress={() => goTo("MenuManagement")}
                />
                <MenuItem
                  title="Add Menu Item"
                  onPress={() => goTo("AddMenuItem")}
                />
                <MenuItem
                  title="Create Table"
                  onPress={() => goTo("CreateTable")}
                />
                <MenuItem
                  title="Staff Management"
                  onPress={() => goTo("StaffManagementScreen")}
                />
              </>
            )}

            {user?.role === "waiter" && (
              <>
                <MenuItem
                  title="Tables"
                  onPress={() => goTo("TablesListScreen")}
                />
                <MenuItem
                  title="Reservations"
                  onPress={() => goTo("Reservations")}
                />
              </>
            )}

            {user?.role === "chef" && (
              <MenuItem title="Orders" onPress={() => goTo("Chef")} />
            )}

            {user?.role === "cashier" && (
              <MenuItem title="Billing" onPress={() => goTo("Cashier")} />
            )}
          </View>

          <Pressable style={{ flex: 1 }} onPress={() => setMenuVisible(false)} />
        </View>
      </Modal>
    </>
  );
}

const MenuItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeRow: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
});