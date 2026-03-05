
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function BillDetailsScreen({ route,navigation }) {
  const { order } = route.params;

  const items = JSON.parse(order.items || "[]");

  const [discountPercent, setDiscountPercent] = useState(0);
  const [tip, setTip] = useState(0);

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.price);
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const afterDiscount = subtotal - discountAmount;

  const gst = afterDiscount * 0.18;

  const total =
    afterDiscount + gst + Number(tip || 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>
            Table {order.table_number}
          </Text>
          <Text style={styles.orderNo}>
            Order #{order.id}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          ORDER SUMMARY
        </Text>

        {/* ITEMS */}
        <View style={styles.card}>
          {items.map((item, index) => (
//             <View key={index} style={styles.itemRow}>
//               <View>
//                 {/* <Text style={styles.itemName}>
//                   {item.name}
//                 </Text> */}
//                 <Text style={styles.itemName}>
//   {item.name || item.menu_name || "Item"}
// </Text>
//                 <Text style={styles.qty}>
//                   Qty: {item.quantity}
//                 </Text>
//               </View>

//               <Text style={styles.price}>
//                 ₹{(
//                   item.price * item.quantity
//                 ).toFixed(2)}
//               </Text>
//             </View>
<View key={index} style={styles.itemRow}>
  <View>
    <Text style={styles.itemName}>
      {item.name || item.menu_name || "Item"}
    </Text>
    <Text style={styles.qty}>
      Qty: {item.quantity}
    </Text>
  </View>

  <Text style={styles.price}>
    ₹{(
      (Number(item.price) || 0) *
      (Number(item.quantity) || 0)
    ).toFixed(2)}
  </Text>
</View>
          ))}
        </View>

        {/* DISCOUNT & TIP */}
        <View style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>
              DISCOUNT (%)
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={discountPercent.toString()}
              onChangeText={(text) =>
                setDiscountPercent(Number(text) || 0)
              }
            />
          </View>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>
              ADD TIP (₹)
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tip.toString()}
              onChangeText={(text) =>
                setTip(Number(text) || 0)
              }
            />
          </View>
        </View>

        {/* QUICK BUTTONS */}
        <View style={styles.quickRow}>
          {[5, 10, 15].map((val) => (
            <TouchableOpacity
              key={val}
              style={[
                styles.quickBtn,
                discountPercent === val &&
                  styles.quickActive,
              ]}
              onPress={() =>
                setDiscountPercent(val)
              }
            >
              <Text
                style={
                  discountPercent === val
                    ? styles.quickTextActive
                    : styles.quickText
                }
              >
                {val}%
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => {
              setTip(0);
            }}
          >
            <Text style={styles.quickText}>
              No Tip
            </Text>
          </TouchableOpacity>
        </View>

        {/* BILL SUMMARY */}
        <View style={styles.summaryCard}>
          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>GST (18%)</Text>
            <Text style={{ color: "red" }}>
              +₹{gst.toFixed(2)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>
              Discount ({discountPercent}%)
            </Text>
            <Text style={{ color: "green" }}>
              -₹{discountAmount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text>Tip</Text>
            <Text>₹{Number(tip).toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total Amount
            </Text>
            <Text style={styles.totalAmount}>
              ₹{total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* BUTTON */}
        {/* <TouchableOpacity style={styles.payBtn}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#fff"
          />
          <Text style={styles.payText}>
            Generate Bill & Mark Paid
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
  style={styles.payBtn}
  onPress={() => {
    navigation.navigate("PaymentSuccess", { order });
  }}
>
  <Text style={styles.payText}>
    Generate Bill & Mark Paid
  </Text>
</TouchableOpacity> */}
<TouchableOpacity
  style={styles.payBtn}
  onPress={async () => {
    try {
      const response = await fetch(
        "http://192.168.29.155:5000/api/generate-bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: order.id,
            table_number: order.table_number,
            subtotal,
            discount_percent: discountPercent,
            discount_amount: discountAmount,
            gst,
            tip,
            total,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("PaymentSuccess", {
  order,
  subtotal,
  discountAmount,
  discountPercent,
  gst,
  tip,
  total,
});
      } else {
        alert("Bill generation failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }}
>
  <Text style={styles.payText}>
    Generate Bill & Mark Paid
  </Text>
</TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 16,
  },

  headerRow: {
    marginBottom: 10,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
  },

  orderNo: {
    color: "#ff6b35",
    marginTop: 4,
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  itemName: {
    fontWeight: "bold",
    fontSize: 15,
  },

  qty: {
    color: "#777",
    marginTop: 3,
  },

  price: {
    fontWeight: "bold",
    fontSize: 16,
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    fontWeight: "bold",
    elevation: 2,
  },

  quickRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  quickBtn: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  quickActive: {
    backgroundColor: "#ffe5dc",
  },

  quickText: {
    fontWeight: "600",
    color: "#333",
  },

  quickTextActive: {
    fontWeight: "bold",
    color: "#ff6b35",
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  totalRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 15,
  },

  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  totalAmount: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ff6b35",
  },

  payBtn: {
    backgroundColor: "#ff6b35",
    padding: 18,
    borderRadius: 25,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});