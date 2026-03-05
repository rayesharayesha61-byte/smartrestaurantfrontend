import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; 
export default function CreateTable({ navigation }) {
  const [tableNumber, setTableNumber] = useState("T12");
  const [capacity, setCapacity] = useState(4);
  const [tableType, setTableType] = useState("Indoor");
  const [status, setStatus] = useState("Available");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  const increase = () => setCapacity(capacity + 1);
  const decrease = () => capacity > 1 && setCapacity(capacity - 1);

  const handleCreate = async () => {
    if (!tableNumber || !capacity || !tableType) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.29.155:5000/api/tables/create",
        {
          table_number: tableNumber,
          capacity,
          table_type: tableType,
          status,
          notes,
        },
        // { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);

        // Reset form
        setTableNumber("");
        setCapacity(1);
        setTableType("Indoor");
        setStatus("Available");
        setNotes("");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("API ERROR:", error.message);
      Alert.alert("Network Error", "Check backend server & IP");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        ><View style={styles.closeIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
  <MaterialIcons name="close" size={26} color="#333" />
</TouchableOpacity></View>
          <Text style={styles.header}>Add New Table</Text>

          {success && (
            <View style={styles.successBox}>
              <Icon name="check-circle" size={20} color="#2ecc71" />
              <Text style={styles.successText}>Table created successfully</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Table Configuration</Text>

            <Text style={styles.label}>Table Number</Text>
            <TextInput
              style={styles.input}
              value={tableNumber}
              onChangeText={setTableNumber}
              placeholder="Enter table number"
            />

            <Text style={styles.label}>Capacity (pax)</Text>
            <View style={styles.capacityBox}>
              <TouchableOpacity onPress={decrease}>
                <Text style={styles.minus}>−</Text>
              </TouchableOpacity>
              <Text style={styles.capacityText}>{capacity}</Text>
              <TouchableOpacity onPress={increase}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Table Type</Text>
            <View style={styles.typeGrid}>
              {["Indoor", "Outdoor", "Booth", "High-top"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    tableType === type && styles.typeActive,
                  ]}
                  onPress={() => setTableType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      tableType === type && { color: "#fff" },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Default Status</Text>
            <View style={styles.statusRow}>
              {["Available", "Reserved"].map((s) => {
                const isActive = status === s;
                const color = s === "Available" ? "#2ecc71" : "#e74c3c";
                return (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.statusButton,
                      isActive
                        ? s === "Available"
                          ? styles.availableActive
                          : styles.reservedActive
                        : styles.statusInactive,
                    ]}
                    onPress={() => setStatus(s)}
                  >
                    <Icon
                      name={isActive ? "check-circle" : "check-circle"}
                      size={18}
                      color={isActive ? "#fff" : color}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: isActive ? "#fff" : color },
                      ]}
                    >
                      {s}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Location / Notes</Text>
            <TextInput
              style={styles.notes}
              multiline
              value={notes}
              onChangeText={setNotes}
              placeholder="Near the window, quiet area..."
            />
          </View>

          <Text style={styles.previewTitle}>LIVE PREVIEW</Text>
          <View style={styles.previewCard}>
            <Text
              style={[
                styles.previewStatus,
                status === "Available"
                  ? { backgroundColor: "#2ecc71" }
                  : { backgroundColor: "#e74c3c" },
              ]}
            >
              {status.toUpperCase()}
            </Text>
            <Text style={styles.previewNumber}>{tableNumber}</Text>
            <Text style={styles.previewPax}>{capacity} pax</Text>
          </View>

          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createText}>Create Table</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eafaf1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
 
   closeIcon: {
  position:"absolute",
  right:20,
  top:15,
  },

  successText: { marginLeft: 10, color: "#2ecc71", fontWeight: "600" },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 15, elevation: 3 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  label: { marginTop: 15, fontWeight: "600" },
  input: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 12, marginTop: 5 },
  capacityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginTop: 5,
  },
  minus: { fontSize: 20, color: "#ff6b35" },
  plus: { fontSize: 20, color: "#ff6b35" },
  capacityText: { fontSize: 18, fontWeight: "bold" },
  typeGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
  typeButton: { borderWidth: 1, borderColor: "#ddd", paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, marginRight: 10, marginTop: 8 },
  typeActive: { backgroundColor: "#ff6b35", borderColor: "#ff6b35" },
  typeText: { color: "#333" },
  statusRow: { flexDirection: "row", marginTop: 10 },
  statusButton: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, marginRight: 10, minWidth: 100, justifyContent: "center" },
  availableActive: { backgroundColor: "#2ecc71" },
  reservedActive: { backgroundColor: "#e74c3c" },
  statusText: { fontWeight: "600", marginLeft: 6 },
  statusInactive: { backgroundColor: "#f2f2f2" },
  notes: { backgroundColor: "#f2f2f2", padding: 12, borderRadius: 12, marginTop: 5, height: 80, textAlignVertical: "top" },
  previewTitle: { marginTop: 20, fontWeight: "bold", color: "#777" },
  previewCard: { backgroundColor: "#fff", padding: 20, borderRadius: 15, alignItems: "center", marginTop: 10, elevation: 3 },
  previewStatus: { color: "#fff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, fontSize: 12, marginBottom: 10 },
  previewNumber: { fontSize: 28, fontWeight: "bold", color: "#ff6b35" },
  previewPax: { marginTop: 5, color: "#777" },
  createBtn: { backgroundColor: "#ff6b35", padding: 16, borderRadius: 30, alignItems: "center", marginTop: 20 },
  createText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});