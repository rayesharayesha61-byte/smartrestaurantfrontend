import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Reservations({ navigation }) {

  const formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [reservations, setReservations] = useState([]);

  //  Continuous Dates
  const weekDates = useMemo(() => {
    const dates = [];
    const base = new Date();

    for (let i = -1; i <= 300; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      dates.push(d);
    }

    return dates;
  }, []);

  const fetchReservations = async (date) => {
    try {
      const response = await axios.get(
        `http://192.168.29.155:5000/api/reservations/by-date/${date}`
      );
      setReservations(response.data?.data || []);
    } catch (error) {
      setReservations([]);
    }
  };

  useEffect(() => {
    fetchReservations(selectedDate);
  }, [selectedDate]);

  const renderItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>
          {item.reservation_time?.slice(0, 5)}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.customer_name}</Text>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={16}
            color="#777"
          />
          <Text style={styles.smallText}> {item.guests} Pax</Text>

          <MaterialCommunityIcons
            name="seat-outline"
            size={16}
            color="#777"
            style={{ marginLeft: 15 }}
          />
          <Text style={styles.smallText}>
            Table {item.table_number}
          </Text>
        </View>
      </View>
    </View>
  );

  const selectedMonth = new Date(selectedDate).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>

      {/*  SINGLE MAIN CARD */}
      <View style={styles.mainCard}>

        {/* Month Header */}
        <Text style={styles.monthText}>{selectedMonth}</Text>

        {/* Date Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 15 }}
        >
          {weekDates.map((date, index) => {
            const formatted = formatDate(date);
            const isSelected = formatted === selectedDate;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateBox,
                  isSelected && styles.selectedDateBox,
                ]}
                onPress={() => setSelectedDate(formatted)}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected && { color: "#fff" },
                  ]}
                >
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </Text>

                <Text
                  style={[
                    styles.dateText,
                    isSelected && { color: "#fff" },
                  ]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.subTitle}>
          {reservations.length} Bookings
        </Text>

        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 30, color: "#999" }}>
              No Reservations
            </Text>
          }
        />

      </View>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() =>
          navigation.navigate("CreateReservation", {
            selectedDate: selectedDate,
          })
        }
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent:"center",
    alignItems:"center",
  },

  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    width:"95%",
    height:"85%",
  },

  monthText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  subTitle: {
    textAlign: "center",
    color: "#ff6b3d",
    marginBottom: 10,
  },

  dateBox: {
    backgroundColor: "#f3f3f3",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 10,
    alignItems: "center",
    width: 55,
    
  },

  selectedDateBox: {
    backgroundColor: "#ff6b3d",
  },

  dayText: {
    fontSize: 12,
    color: "#777",
  },

  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  bookingCard: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },

  timeBox: {
    backgroundColor: "#ffe5dc",
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff6b3d",
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  smallText: {
    fontSize: 12,
    color: "#777",
  },

  floatingBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#ff6b3d",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
