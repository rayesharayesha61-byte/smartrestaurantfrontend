
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function Waitermenu({ route }) {
  const { tableId, tableNumber } = route.params;

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});

  const categoryMap = {
    1: "Starters",
    2: "Main Course",
    3: "Beverages",
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.155:5000/api/menu"
      );
      setMenuItems(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch menu");
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    Object.keys(cart).forEach((itemId) => {
      const item = menuItems.find((i) => i.id === parseInt(itemId));
      if (item) {
        total += item.price * cart[itemId];
      }
    });
    return total.toFixed(2);
  };

  const placeFullOrder = async () => {
    try {
      const orderItems = Object.keys(cart).map((itemId) => ({
        menu_id: parseInt(itemId),
        quantity: cart[itemId],
      }));

      await axios.post("http://192.168.29.155:5000/api/orders", {
        table_id: tableId,
        items: orderItems,
      });

      Alert.alert("Success", "Order Sent to Kitchen");
      setCart({});
    } catch (error) {
      Alert.alert("Error", "Order Failed");
    }
  };

  const renderItem = ({ item }) => {
    const quantity = cart[item.id] || 0;

    const increaseQty = () => {
      setCart((prev) => ({
        ...prev,
        [item.id]: quantity + 1,
      }));
    };

    const decreaseQty = () => {
      if (quantity > 1) {
        setCart((prev) => ({
          ...prev,
          [item.id]: quantity - 1,
        }));
      } else {
        const updated = { ...cart };
        delete updated[item.id];
        setCart(updated);
      }
    };

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: item.image
              ? `http://192.168.29.155:5000/uploads/${item.image}`
              : "https://via.placeholder.com/80",
          }}
          style={styles.itemImage}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        {quantity === 0 ? (
          <TouchableOpacity style={styles.addBtn} onPress={increaseQty}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity onPress={decreaseQty}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQty}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const sections = Object.entries(categoryMap).map(([key, name]) => ({
    title: name,
    data: menuItems.filter(
      (i) => i.category?.toString() === key
    ),
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Table {tableNumber}</Text>
          <Text style={styles.subText}>IN SERVICE</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.liveText}>LIVE TOTAL</Text>
          <Text style={styles.totalAmount}>₹ {getTotalAmount()}</Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {Object.keys(cart).length > 0 && (
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={placeFullOrder}
        >
          <Text style={styles.orderText}>
            Place Order ₹{getTotalAmount()}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f6f6" },
  header: { padding: 20, flexDirection: "row", justifyContent: "space-between" },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  subText: { color: "#999", marginTop: 3, fontWeight: "600" },
  liveText: { fontSize: 12, color: "#999", fontWeight: "600" },
  totalAmount: { fontSize: 28, fontWeight: "bold", color: "#ff6b35" },
  sectionHeader: { marginTop: 20, marginBottom: 10, marginHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
  },
  itemImage: { width: 75, height: 75, borderRadius: 15, marginRight: 15 },
  itemName: { fontSize: 17, fontWeight: "600" },
  price: { marginTop: 5, fontSize: 16, fontWeight: "bold", color: "#ff6b35" },
  addBtn: { backgroundColor: "#fde9e2", padding: 8, borderRadius: 15 },
  addText: { color: "#ff6b35", fontWeight: "bold" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fde9e2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  qtyBtn: { fontSize: 18, color: "#ff6b35", fontWeight: "bold", paddingHorizontal: 10 },
  qtyText: { fontSize: 16, fontWeight: "bold", marginHorizontal: 5 },
  orderBtn: {
    backgroundColor: "#ff6b35",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  orderText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});