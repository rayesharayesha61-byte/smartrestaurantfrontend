
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  SectionList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

export default function MenuManagement({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const categoryMap = {
    1: "Starters",
    2: "Main Course",
    3: "Beverages",
  };

  const [expandedSections, setExpandedSections] = useState({
    Starters: true,
    "Main Course": true,
    Beverages: true,
  });

  // Fetch menu
  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.155:5000/api/menu"
      );
      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch menu items");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Toggle availability
  const toggleAvailability = (id) => {
    const updatedItems = menuItems.map((item) =>
      item.id === id
        ? { ...item, available: item.available === 1 ? 0 : 1 }
        : item
    );
    setMenuItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image
        source={{
          uri: item.image
            ? `http://192.168.29.155:5000/uploads/${item.image}`
            : "https://via.placeholder.com/70",
        }}
        style={styles.itemImage}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.nameRow}>
          <Text style={styles.vegIcon}>
            {item.is_veg ? "🌿" : "🍗"}
          </Text>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Icon name="edit" size={20} color="#ff6b35" />
      </TouchableOpacity>

      <Switch
        value={item.available === 1}
        onValueChange={() => toggleAvailability(item.id)}
        trackColor={{ false: "#ddd", true: "#28a745" }}
        thumbColor="#fff"
      />
    </View>
  );

  // Filtered Sections
  const sections = Object.entries(categoryMap).map(([key, name]) => {
    const filteredItems = menuItems.filter(
      (i) =>
        i.category.toString() === key &&
        i.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return {
      title: name,
      data: expandedSections[name] ? filteredItems : [],
    };
  });

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 26 }} />
        <Text style={styles.headerTitle}>Menu Management</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#a0522d" />
        <TextInput
          placeholder="Search menu items..."
          style={{ marginLeft: 10, flex: 1 }}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Sections */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom:140}}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(title)}
          >
            <View style={styles.sectionLeft}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {
                    menuItems.filter(
                      (i) =>
                        categoryMap[i.category] === title
                    ).length
                  }{" "}
                  ITEMS
                </Text>
              </View>
            </View>
            <Icon
              name={
                expandedSections[title]
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              size={24}
              color="#a0522d"
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f4f4f4" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbe9e2",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 25,
  },

  sectionHeader: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  badge: {
    backgroundColor: "#fbe9e2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 10,
  },

  badgeText: {
    fontSize: 12,
    color: "#a0522d",
    fontWeight: "600",
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
  },

  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 15,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  vegIcon: {
    fontSize: 18,
    marginRight: 5,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    color: "#ff6b35",
    fontWeight: "bold",
    marginTop: 5,
  },

  editBtn: {
    backgroundColor: "#fde9e2",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
});