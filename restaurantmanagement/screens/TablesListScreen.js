
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import axios from "axios";


export default function TablesListScreen({ token }) {

  const [tables, setTables] = useState([]);
  const API_URL = "http://192.168.29.155:5000/api";

  useEffect(() => {
    if (token) {
      fetchTables();
    }
  }, [token]);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/tables`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTables(response.data.tables || []);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!token) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Token not available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:20 }}>
        All Tables
      </Text>
      <FlatList
        data={tables}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor:"#fff", padding:15, borderRadius:12, marginBottom:10 }}>
            <Text style={{ fontSize:18, fontWeight:"bold" }}>
              Table {item.table_number}
            </Text>
            <Text>Capacity: {item.capacity}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6b35",
  },
});