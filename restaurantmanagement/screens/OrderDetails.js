
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function OrderDetails({ route, navigation }) {
  const { order, updateOrderStatus } = route.params;

 const subtotal = order.items.reduce((sum, item) => {
  const qty = Number(item.quantity) || 0;
  const price = Number(item.price) || 0;
  return sum + qty * price;
}, 0);

  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;

  const getStepStatus = (step) => {
    const flow = ["Pending", "Cooking", "Ready", "Completed"];
    return flow.indexOf(order.status) >= flow.indexOf(step);
  };

  const handleMarkAsReady = () => {
    if (updateOrderStatus) {
      updateOrderStatus(order.id, "Ready");
    }
    navigation.navigate("CashierDashboard");
  };
const handleGenerateBill = async () => {
  try {
    await fetch("http://192.168.29.155:5000/create-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    navigation.navigate("Chef"); 

  } catch (error) {
    console.log("Bill error:", error);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#ff6b35" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Details</Text>

          <TouchableOpacity style={styles.closeBtn}>
            <Ionicons name="close" size={18} color="#555" />
          </TouchableOpacity>
        </View>

        {/* ORDER CARD */}
        <View style={styles.orderCard}>
          <Text style={styles.dineText}>DINE-IN ORDER</Text>
          <Text style={styles.orderId}>#ORD-{order.table_number}</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.grayText}>Table {order.table_number}</Text>
            <Text style={styles.grayText}>4 Guests</Text>
          </View>

          {/* STATUS BADGE */}
          <View style={styles.statusWrapper}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {order.status}
              </Text>
            </View>
          </View>
        </View>

        {/* ORDER PROGRESS */}
        <Text style={styles.sectionTitle}>Order Progress</Text>

        <View style={styles.progressWrapper}>
          {["Pending", "Cooking", "Ready", "Completed"].map(
            (step, index) => (
              <View key={index} style={styles.progressRow}>
                <View style={styles.progressLeft}>
                  <View
                    style={[
                      styles.circle,
                      getStepStatus(step) &&
                        (step === "Cooking"
                          ? styles.orangeCircle
                          : styles.activeCircle),
                    ]}
                  />
                  {index !== 3 && (
                    <View style={styles.verticalLine} />
                  )}
                </View>

                <Text style={styles.progressText}>
                  {step === "Pending"
                    ? "Order Received"
                    : step === "Ready"
                    ? "Ready for Pickup"
                    : step}
                </Text>
              </View>
            )
          )}
        </View>

        {/* ORDER ITEMS */}
        <Text style={styles.sectionTitle}>Order Items</Text>

        <View style={styles.itemsCard}>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRowBetween}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.qtyBadge}>
                  <Text style={styles.qtyText}>
                    {item.quantity}
                  </Text>
                </View>
                <Text style={styles.itemName}>
                  {item.menu_name}
                </Text>
              </View>
              <Text style={styles.priceText}>
           ₹{(
  (Number(item.quantity) || 0) *
  (Number(item.price) || 0)
).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.grayText}>Subtotal</Text>
            <Text style={styles.grayText}>
              ₹{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.grayText}>
              Service Charge (10%)
            </Text>
            <Text style={styles.grayText}>
              ₹{serviceCharge.toFixed(2)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>
              ₹{total.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* MARK AS READY BUTTON */}
       {/* {(order.status === "Cooking" || order.status === "Ready") && (
    <TouchableOpacity
      style={styles.readyBtn}
      onPress={handleMarkAsReady}
    >
      <MaterialIcons
        name="check-circle"
        size={20}
        color="#fff"
      />
      <Text style={styles.readyText}>
        Mark as Ready
      </Text>
    </TouchableOpacity>
  )} */}

  <TouchableOpacity
  style={styles.billBtn}
  onPress={handleGenerateBill}
>
  <Text style={styles.billText}>Generate Bill</Text>
</TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
billBtn: {
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: "#ff6b35",
  padding: 15,
  borderRadius: 15,
  alignItems: "center",
},

billText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  closeBtn: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 20,
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    position: "relative",
  },

  dineText: {
    color: "#ff6b35",
    fontWeight: "bold",
  },

  orderId: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },

  statusWrapper: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  statusBadge: {
    backgroundColor: "#fde9e2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusBadgeText: {
    color: "#ff6b35",
    fontWeight: "bold",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  grayText: {
    color: "#777",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  progressWrapper: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  progressRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  progressLeft: {
    alignItems: "center",
    marginRight: 15,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },

  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: "#ddd",
    marginTop: 2,
  },

  activeCircle: {
    backgroundColor: "#4CAF50",
  },

  orangeCircle: {
    backgroundColor: "#ff6b35",
  },

  progressText: {
    fontSize: 14,
    marginTop: -2,
  },

  itemsCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 120,
  },

  itemRowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  qtyBadge: {
    backgroundColor: "#fde9e2",
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },

  qtyText: {
    color: "#ff6b35",
    fontWeight: "bold",
  },

  itemName: {
    fontSize: 15,
    fontWeight: "600",
  },

  priceText: {
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },

  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  totalPrice: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ff6b35",
  },

  readyBtn: {
    backgroundColor: "#ff6b35",
    padding: 18,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  readyText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});