import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";

export default function CreateReservation({ route, navigation }) {
  const { selectedDate } = route.params;

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");

  const API_URL = "http://192.168.29.155:5000/api";

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const res = await axios.get(`${API_URL}/tables`);
    if (res.data.success) {
      const available = res.data.data.filter(
        (t) => t.status === "Available"
      );
      setTables(available);
    }
  };

  const createReservation = async () => {
    if (!selectedTable || !time || !name || !guests) {
      Alert.alert("Please fill all fields");
      return;
    }

    await axios.post(`${API_URL}/reservations/create`, {
      customer_name: name,
      phone: "",
      table_id: selectedTable.id,
      reservation_date: selectedDate,
      reservation_time: time,
      guests: guests,
    });

    Alert.alert("Success", "Reservation Created");
    navigation.goBack();
  };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Reservation</Text>
//       <Text>Date: {selectedDate}</Text>

//       <TextInput
//         placeholder="Customer Name"
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         placeholder="Guests Count"
//         style={styles.input}
//         keyboardType="numeric"
//         value={guests}
//         onChangeText={setGuests}
//       />

//       <TextInput
//         placeholder="Time (19:30:00)"
//         style={styles.input}
//         value={time}
//         onChangeText={setTime}
//       />

//       <Text style={{ marginTop: 10 }}>Select Table:</Text>

//       <FlatList
//         data={tables}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.tableBox,
//               selectedTable?.id === item.id && {
//                 backgroundColor: "#ff6b3d",
//               },
//             ]}
//             onPress={() => setSelectedTable(item)}
//           >
//             <Text style={{ color: selectedTable?.id === item.id ? "#fff" : "#000" }}>
//               Table {item.table_number}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />

//       <TouchableOpacity style={styles.button} onPress={createReservation}>
//         <Text style={{ color: "#fff" }}>Create Reservation</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
return (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Create Reservation</Text>
      <Text style={styles.date}>Date: {selectedDate}</Text>

      <TextInput
        placeholder="Customer Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Guests Count"
        style={styles.input}
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
      />

      <TextInput
        placeholder="Time (19:30:00)"
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.sectionTitle}>Select Table</Text>

      <FlatList
        data={tables}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tableBox,
              selectedTable?.id === item.id && styles.selectedTable,
            ]}
            onPress={() => setSelectedTable(item)}
          >
            <Text
              style={{
                color:
                  selectedTable?.id === item.id ? "#fff" : "#333",
                fontWeight: "600",
              }}
            >
              Table {item.table_number}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={createReservation}>
        <Text style={styles.buttonText}>Create Reservation</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  date: {
    color: "#ff6b3d",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: "#fafafa",
  },

  sectionTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
  },

  tableBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 5,
    borderRadius: 12,
    width: "45%",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },

  selectedTable: {
    backgroundColor: "#ff6b3d",
    borderColor: "#ff6b3d",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#ff6b3d",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});