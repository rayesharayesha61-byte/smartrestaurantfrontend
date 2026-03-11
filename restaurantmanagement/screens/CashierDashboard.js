
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function CashierDashboard({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("http://192.168.29.155:5000/get-bills")
      .then((res) => res.json())
      .then((data) => {

        const readyOrders = data.filter(
          (order) => order.status === "Completed"
        );

        setOrders(readyOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchOrders();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>Ready Orders</Text>

        <Text style={styles.pendingText}>
          {orders.length} TABLE PENDING
        </Text>

        {orders.length === 0 ? (
          <Text style={{ marginTop: 20 }}>
            No Bills Available
          </Text>
        ) : (
          orders.map((order) => {

            const total = order.price * order.quantity;

            return (
              <View key={order.id} style={styles.card}>

                {/* TOP ROW */}
                <View style={styles.topRow}>

                  <View style={styles.leftRow}>

                    <View style={styles.tableBadge}>
                      <Text style={styles.tableNumber}>
                        {order.table_number}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.tableTitle}>
                        Table {order.table_number}
                      </Text>

                      <Text style={styles.itemCount}>
                        {order.quantity} x {order.menu_name}
                      </Text>
                    </View>

                  </View>

                  <Text style={styles.amount}>
                    ₹{total}
                  </Text>

                </View>

                {/* STATUS */}
                <View style={styles.statusWrapper}>
                  <Text style={styles.readyStatus}>
                    {order.status}
                  </Text>
                </View>

                {/* BUTTON */}
                <View style={styles.buttonRow}>

                  <TouchableOpacity
                    style={styles.billBtn}
                    onPress={() =>
                      navigation.navigate("BillDetails", { order })
                    }
                  >
                    <Ionicons
                      name="receipt-outline"
                      size={18}
                      color="#fff"
                    />

                    <Text style={styles.billText}>
                      {" "}Bill Now
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuBtn}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#555"
                    />
                  </TouchableOpacity>

                </View>

              </View>
            );
          })
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 15,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
  },

  pendingText: {
    color: "#ff6b35",
    marginBottom: 20,
    marginTop: 5,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tableBadge: {
    backgroundColor: "#fde9e2",
    padding: 12,
    borderRadius: 15,
    marginRight: 15,
  },

  tableNumber: {
    color: "#ff6b35",
    fontWeight: "bold",
    fontSize: 16,
  },

  tableTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  itemCount: {
    color: "#777",
    marginTop: 3,
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statusWrapper: {
    alignItems: "flex-end",
    marginTop: 5,
  },

  readyStatus: {
    color: "#4CAF50",
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  billBtn: {
    flex: 1,
    backgroundColor: "#ff6b35",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  billText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  menuBtn: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

});