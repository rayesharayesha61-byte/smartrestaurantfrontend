
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function WaiterDashboard({ navigation}) {
  const [tables, setTables] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedTable, setSelectedTable] = useState(null);

  const API_URL = "http://192.168.29.155:5000/api";

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/tables`);
      if (response.data.success) {
        setTables(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBorderColor = (status) => {
    if (status === "Available") return "#2ecc71";
    if (status === "Occupied") return "#f1c40f";
    if (status === "Reserved") return "#3498db";
    return "#e74c3c";
  };

  const filteredTables =
    filter === "All"
      ? tables
      : tables.filter((t) => t.status === filter);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getBorderColor(item.status) },
        selectedTable?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedTable(item)}
    >
      <Text style={styles.tableNumber}>
        {item.table_number.toString().padStart(2, "0")}
      </Text>

      <Text style={styles.details}>
        {item.capacity} PAX • {item.table_type}
      </Text>

      <Text
        style={[
          styles.status,
          { color: getBorderColor(item.status) },
        ]}
      >
        {item.status.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
 

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      
  
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCardActive}>
            <Text style={styles.statTitle}>Active Tables</Text>
            <Text style={styles.statValue}>
              {tables.filter(t => t.status === "Occupied").length} / {tables.length}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Guest Count</Text>
            <Text style={styles.statValue}>
              {tables.reduce((sum, t) => sum + (t.capacity || 0), 0)}
            </Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          {["All", "Available", "Occupied", "Reserved"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                filter === item && styles.activeFilter,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && { color: "#fff" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tables Grid */}
        <FlatList
          data={filteredTables}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {/* Floating New Order Button */}
        {selectedTable && (
          <TouchableOpacity
            style={styles.newOrderBtn}
            onPress={() =>
              navigation.navigate("MenuManagement", {
                tableId: selectedTable.id,
                tableNumber: selectedTable.table_number,
              })
            }
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.newOrderText}>New Order</Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f9",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCardActive: {
    width: "48%",
    backgroundColor: "#fde8e3",
    padding: 15,
    borderRadius: 18,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 18,
  },

  statTitle: {
    color: "#777",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#ff6b3d",
  },

  filterText: {
    fontSize: 14,
  },

  card: {
    width: width / 2 - 22,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 6,
    elevation: 4,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#ff6b3d",
  },

  tableNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },

  details: {
    marginTop: 5,
    color: "#777",
  },

  status: {
    marginTop: 15,
    fontWeight: "bold",
  },

  newOrderBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b3d",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 6,
  },

  newOrderText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});