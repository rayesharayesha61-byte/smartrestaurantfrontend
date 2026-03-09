
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; 
export default function StaffManagementScreen( {navigation}) {

  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const res = await axios.get("http://192.168.29.155:5000/api/staff");
    setStaff(res.data.data);
  };

  const toggleStatus = async (id, currentStatus) => {
    await axios.put(`http://192.168.29.155:5000/api/staff/${id}/status`, {
      is_active: currentStatus ? 0 : 1
    });
    fetchStaff();
  };

  //  Search + Filter
  const filteredStaff = staff
    .filter(item =>
      item.full_name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      filter === "all" ? true : item.role === filter
    );

  const activeStaff = filteredStaff.filter(item => item.is_active === 1);
  const inactiveStaff = filteredStaff.filter(item => item.is_active === 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Image
          source={
            item.profile_image
              ? { uri: `http://192.168.29.155:5000/uploads/${item.profile_image}` }
              : require("../assets/user.png")
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{item.full_name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.mobile}>{item.mobile}</Text>
        </View>
      </View>

      <Switch
        value={item.is_active === 1}
        onValueChange={() => toggleStatus(item.id, item.is_active)}
        trackColor={{ false: "#F4CFC5", true: "#FF6B3C" }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.menuIcon}></Text>
      
        <Text style={styles.headerTitle}>Staff Management</Text>
         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeIcon}>✕</Text> 
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search staff by name or role"
          placeholderTextColor="#F08C6C"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[{ type: "active" }, { type: "inactive" }]}
        keyExtractor={(item) => item.type}
          contentContainerStyle={{paddingBottom:140}}

        renderItem={({ item }) => {
          if (item.type === "active") {
            return (
              <>
                <Text style={styles.heading}>ACTIVE TEAM MEMBERS</Text>
                <FlatList
                  data={activeStaff}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
              </>
            );
          } else {
            return (
              <>
                <Text style={styles.heading}>INACTIVE / OFF-DUTY</Text>
                <FlatList
                  data={inactiveStaff}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
              </>
            );
          }
        }}
      />

      {/* Bottom Filters */}
      <View style={styles.filterContainer}>
        {["all", "waiter", "chef", "cashier"].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterBtn,
              filter === role && styles.activeFilter
            ]}
            onPress={() => setFilter(role)}
          >
            <Text
              style={{
                color: filter === role ? "#fff" : "#FF6B3C",
                fontWeight: "600"
              }}
            >
              {role === "all"
                ? "All Staff"
                : role === "chef"
                ? "Kitchen"
                : role.charAt(0).toUpperCase() + role.slice(1) + "s"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF7F4"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  menuIcon: {
    fontSize: 22,
    color: "#FF6B3C"
  },
  closeIcon: {
    fontSize: 18,
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 10
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    elevation: 3
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B3C",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 12
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  role: {
    color: "#FF6B3C",
    marginTop: 2
  },
  mobile: {
    color: "#888",
    marginTop: 2
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#FFF7F4",
    paddingBottom:80
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    backgroundColor: "#FFE6DC"
  },
  activeFilter: {
    backgroundColor: "#FF6B3C"
  }
});