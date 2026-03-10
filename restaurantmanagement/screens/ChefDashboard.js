
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Footer from "./Footer";

export default function ChefDashboard( {navigation} ) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
 const [user, setUser] = useState({
    role: "chef", 
  
  });
  useEffect(() => {
    fetchOrders();
  }, []);

  
const fetchOrders = async () => {
  try {
    const response = await axios.get(
      "http://192.168.29.155:5000/api/orders"
    );

    const grouped = response.data.reduce((acc, item) => {
      const key = item.table_number + "_" + item.status;

      if (!acc[key]) {
        acc[key] = {
          table_number: item.table_number,
          status: item.status,
          created_at: item.created_at,
          items: [],
        };
      }

      acc[key].items.push({
        id: item.id,
        menu_name: item.menu_name,
        quantity: item.quantity,
        price: item.price || 0,
      });

      return acc;
    }, {});

    setOrders(Object.values(grouped));
  } catch (error) {
    Alert.alert("Error", "Failed to fetch orders");
  }
};
  const updateStatus = async (tableNumber, status) => {
    try {
      const tableOrders = orders.find(
        (o) => o.table_number === tableNumber && o.status === activeTab
      );

      if (!tableOrders) return;

      for (let item of tableOrders.items) {
        await axios.put(
          `http://192.168.29.155:5000/api/orders/${item.id}`,
          { status }
        );
      }

      fetchOrders();
    } catch (error) {
      Alert.alert("Error", "Status update failed");
    }
  };

 

  // COUNT
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const cookingCount = orders.filter(o => o.status === "Cooking").length;
  const readyCount = orders.filter(o => o.status === "Ready").length;
 const filteredOrders = orders.filter(
    (item) => item.status === activeTab
  );
 
const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate("OrderDetails", { order: item })
    }
  >
    <View style={styles.cardHeader}>
      <Text style={styles.orderTitle}>
        Table {item.table_number}
      </Text>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.statusText}>
          {item.status}
        </Text>
        {item.created_at && (
          <Text style={styles.timeText}>
            {new Date(item.created_at).toLocaleTimeString()}
          </Text>
        )}
      </View>
    </View>

    {item.items.map((food, index) => (
      <View key={index} style={styles.itemRow}>
        <Text style={styles.qty}>
          {food.quantity}x
        </Text>
        <Text style={styles.itemName}>
          {food.menu_name}
        </Text>
      </View>
    ))}

    {item.status === "Pending" && (
      <TouchableOpacity
        style={styles.acceptBtn}
        onPress={() =>
          updateStatus(item.table_number, "Cooking")
        }
      >
        <Text style={styles.btnText}>
          Accept → Cooking
        </Text>
      </TouchableOpacity>
    )}

    {item.status === "Cooking" && (
      <TouchableOpacity
        style={styles.readyBtn}
        onPress={() =>
          updateStatus(item.table_number, "Ready")
        }
      >
        <Text style={styles.btnText}>
          Mark as Ready
        </Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);
  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

      <View style={styles.tabs}>
        {[
          { name: "Pending", count: pendingCount },
          { name: "Cooking", count: cookingCount },
          { name: "Ready", count: readyCount },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => setActiveTab(tab.name)}
            style={[
              styles.tabBtn,
              activeTab === tab.name && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.name && styles.activeText,
              ]}
            >
              {tab.name} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
      <FlatList
  data={filteredOrders}
  keyExtractor={(item, index) => index.toString()}
  renderItem={renderItem}
  contentContainerStyle={{ paddingBottom: 100 }}
/>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tabBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    marginHorizontal: 5,
    
  },

  activeTab: {
    backgroundColor: "#ff6b35",
   
  },

  tabText: {
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
 bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    
  },
  statusText: {
    color: "#ff6b35",
    fontWeight: "bold",
  },

  timeText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  qty: {
    backgroundColor: "#fde9e2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    color: "#ff6b35",
    fontWeight: "bold",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },

  acceptBtn: {
    backgroundColor: "#ff6b35",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  readyBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
   
  },
});
