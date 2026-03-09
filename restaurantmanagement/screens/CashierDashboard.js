
import React, { useEffect, useState } from "react";
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
import Footer from "./Footer";
export default function CashierDashboard( { navigation } ) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch bills from backend
  // useEffect(() => {
  //   fetch("http://192.168.29.155:5000/get-bills") 
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Fetch error:", err);
  //       setLoading(false);
  //     });
  // }, []);
useEffect(() => {
  fetch("http://192.168.29.155:5000/get-bills")
    .then((res) => res.json())
    .then((data) => {

      const readyOrders = data.filter(
        (order) => order.status === "Ready"
      );

      setOrders(readyOrders);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Fetch error:", err);
      setLoading(false);
    });
}, []);
  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }
const payBill = (id) => {

  fetch(`http://192.168.29.155:5000/pay-bill/${id}`, {
    method: "PUT"
  })
  .then(res => res.json())
  .then(data => {

    if(data.success){

      alert("Payment Completed");

      // remove from screen
      setOrders(prev => prev.filter(o => o.id !== id));

    }

  })
  .catch(err => console.log(err));

};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Ready Orders</Text>
        <Text style={styles.pendingText}>
          {orders.length} TABLE PENDING
        </Text>

        {orders.length === 0 ? (
          <Text style={{ marginTop: 20 }}>No Bills Available</Text>
        ) : (
          orders.map((order, index) => {
            const items = JSON.parse(order.items || "[]");

            const subtotal = items.reduce((sum, item) => {
              return (
                sum +
                (Number(item.quantity) || 0) *
                  (Number(item.price) || 0)
              );
            }, 0);

            const total = subtotal + subtotal * 0.1;

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
                        {items.length} Items
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.amount}>
                ₹{Number(order.total).toFixed(2)}
                  </Text>
                </View>

                {/* STATUS */}
                <View style={styles.statusWrapper}>
                  <Text style={styles.readyStatus}>
                    {order.status}
                  </Text>
                </View>

                {/* BUTTONS */}
                <View style={styles.buttonRow}>
                  {/* <TouchableOpacity style={styles.billBtn}> */}
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
                      {" "}
                      Bill Now
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
      {/* <View style={styles.bottomNav}>
                     <Footer navigation={navigation} role="cashier"/></View> */}
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
  elevation: 10,
  borderTopWidth: 1,
  borderColor: "#eee",
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