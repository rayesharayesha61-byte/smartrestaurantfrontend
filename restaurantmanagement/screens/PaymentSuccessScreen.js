import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function PaymentSuccessScreen({ route }) {
  const {
    order,
    subtotal = 0,
    discountAmount = 0,
    discountPercent = 0,
    gst = 0,
    tip = 0,
    total = 0,
  } = route.params;

  const items = JSON.parse(order.items || "[]");
const handleDone = async () => {
  try {

    const items = JSON.parse(order.items || "[]");

    for (let item of items) {
      await axios.put(
        `http://192.168.29.155:5000/api/orders/${item.id}`,
        { status: "Completed" }
      );
    }

    Alert.alert("Bill Completed");

    navigation.navigate("CashierDashboard");

  } catch (error) {
    console.log(error);

  }
};
  const generatePDF = async () => {
    const html = `
      <html>
      <body style="font-family: Arial; padding: 20px;">
        <h2 style="text-align:center;">RESTAURANT BILL</h2>
        <hr/>
        <p><b>Table:</b> ${order.table_number}</p>
        <p><b>Order ID:</b> ${order.id}</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>
        <hr/>

        ${items
          .map(
            (item) =>
              `<p>${item.name || item.menu_name || "Item"} 
              (${item.quantity} x ₹${item.price}) 
              = ₹${(item.quantity * item.price).toFixed(2)}</p>`
          )
          .join("")}

        <hr/>
        <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
        <p>Discount (${discountPercent}%): -₹${discountAmount.toFixed(2)}</p>
        <p>GST (18%): +₹${gst.toFixed(2)}</p>
        <p>Tip: ₹${Number(tip).toFixed(2)}</p>
        <hr/>
        <h3>Total: ₹${total.toFixed(2)}</h3>
        <hr/>
        <p style="text-align:center;">Thank You! Visit Again 🙏</p>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    Alert.alert("PDF Generated Successfully");
    await Sharing.shareAsync(uri);
  };

  
return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      
      {/* Success Icon */}
      <View style={styles.iconCircle}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>

      <Text style={styles.successTitle}>Payment Completed</Text>
      <Text style={styles.dateText}>
        {new Date().toLocaleString()}
      </Text>

      {/* Receipt Card */}
      <View style={styles.receiptCard}>
        <Text style={styles.receiptId}>
          RECEIPT #{order.id}
        </Text>

        <View style={styles.billBox}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name || item.menu_name || "Item"}
              </Text>
              <Text style={styles.priceText}>
                ₹{(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>GST (18%)</Text>
            <Text>₹{gst.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Discount</Text>
            <Text>-₹{discountAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Amount
            </Text>
            <Text style={styles.totalAmount}>
              ₹{total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.whatsappBtn}
        onPress={generatePDF}
      >
        <Text style={styles.btnText}>
          Share / Download Bill
        </Text>
      </TouchableOpacity>

   <TouchableOpacity
  style={styles.doneBtn}
  onPress={handleDone}
>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>

    </ScrollView>
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#d4f5dd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },

  checkIcon: {
    fontSize: 40,
    color: "#28a745",
    fontWeight: "bold",
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },

  dateText: {
    textAlign: "center",
    color: "#777",
    marginBottom: 25,
  },

  receiptCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  receiptId: {
    textAlign: "center",
    color: "#999",
    marginBottom: 15,
    fontWeight: "600",
  },

  billBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemName: {
    fontSize: 15,
    color: "#333",
  },

  priceText: {
    fontSize: 15,
    fontWeight: "600",
  },

  summarySection: {
    marginTop: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6b35",
  },

  whatsappBtn: {
    backgroundColor: "#25D366",
    padding: 18,
    borderRadius: 30,
    marginTop: 25,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  doneBtn: {
    backgroundColor: "#ff6b35",
    padding: 18,
    borderRadius: 30,
    marginTop: 15,
    alignItems: "center",
  },

  doneText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
