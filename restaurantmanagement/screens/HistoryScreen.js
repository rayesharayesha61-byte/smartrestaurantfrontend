
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://192.168.29.155:5000/bill-history")
      .then(res => res.json())
      .then(data => {
        setBills(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Bill History</Text>

      <ScrollView showsVerticalScrollIndicator={false}>

        {bills.length === 0 ? (
          <Text style={{ marginTop: 20 }}>
            No History Available
          </Text>
        ) : (
          bills.map((bill) => (

            <View key={bill.id} style={styles.card}>

              <View style={styles.row}>

                <Text style={styles.table}>
                  Table {bill.table_number}
                </Text>

                <Text style={styles.amount}>
                  ₹{Number(bill.total).toFixed(2)}
                </Text>

              </View>

              <Text style={styles.date}>
                {new Date(bill.created_at).toLocaleString()}
              </Text>

            </View>

          ))
        )}

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f6f6f6",
    padding:15
  },

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  header:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20
  },

  card:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:20,
    marginBottom:15,
    elevation:3
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between"
  },

  table:{
    fontSize:16,
    fontWeight:"bold"
  },

  amount:{
    fontSize:16,
    fontWeight:"bold",
    color:"#ff6b35"
  },

  date:{
    marginTop:8,
    color:"#777",
    fontSize:12
  }

});