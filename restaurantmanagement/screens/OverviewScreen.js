
import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
Image
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function OverviewScreen({ navigation }) {

const [totalSales, setTotalSales] = useState(0);

const [availableTables, setAvailableTables] = useState(0);
  

  useEffect(() => {
    fetch("http://192.168.29.155:5000/admin-total-sales")
      .then(res => res.json())
      .then(data => {
        setTotalSales(data.total_sales || 0);
      })
      .catch(err => console.log(err));
  }, []);
useEffect(() => {
  fetch("http://192.168.29.155:5000/api/tables/available-count")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAvailableTables(data.available);
      }
    })
    .catch(err => console.log(err));
}, []);
// const occupiedTables = tables.filter(t => t.status === "Occupied").length;
// const totalTables = tables.length;
return (
<ScrollView style={styles.container}>

{/* Header */}
<View style={styles.header}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Image
source={{uri:"https://i.pravatar.cc/100"}}
style={styles.avatar}
/>

<View>
<Text style={styles.greeting}>Good morning,</Text>
<Text style={styles.name}>Admin</Text>
</View>
</View>

<View style={{flexDirection:"row"}}>
<Ionicons name="search" size={22} style={styles.icon}/>
<Ionicons name="notifications-outline" size={22} style={styles.icon}/>
</View>
</View>

{/* Sales Card */}

<View style={styles.salesCard}>
<Text style={styles.salesTitle}>Today's Sales</Text>

<Text style={styles.salesAmount}>
₹ {totalSales}
</Text>

<Text style={styles.updateText}>

</Text>

</View>


{/* Live Status */}

<Text style={styles.sectionTitle}>LIVE STATUS</Text>

<View style={styles.liveRow}>

{/* Tables */}
{/* <View style={styles.liveCard}>
<FontAwesome5 name="chair" size={20} color="#3b82f6"/>

<Text style={styles.liveNumber}>
{occupiedTables}/{totalTables}
</Text>

<Text style={styles.liveText}>
Tables occupied
</Text>
</View> */}

<View style={styles.liveCard}>
<MaterialIcons name="receipt-long" size={20} color="#f97316"/>

<Text style={styles.liveNumber}>
Available 
</Text>

<Text style={styles.liveText}>
{availableTables}
</Text>

</View>
{/* Orders */}
<View style={styles.liveCard}>
<MaterialIcons name="receipt-long" size={20} color="#f97316"/>

<Text style={styles.liveNumber}>
08
</Text>

<Text style={styles.liveText}>
Orders in queue
</Text>

</View>

</View>

{/* Booking */}

{/* <View style={styles.bookingCard}>
<Ionicons name="calendar" size={20} color="#9333ea"/>

<View style={{flex:1,marginLeft:10}}>
<Text style={{fontWeight:"bold"}}>15</Text>
<Text>Bookings for tonight</Text>
</View>

<TouchableOpacity style={styles.manageBtn}>
<Text style={{color:"#fff"}}>Manage</Text>
</TouchableOpacity>

</View> */}


{/* Management Hub */}

<Text style={styles.sectionTitle}>MANAGEMENT HUB</Text>

{/* Staff */}

<TouchableOpacity
style={styles.menuCard}
onPress={() => navigation.navigate("StaffManagementScreen")}
>

<MaterialIcons name="badge" size={22} color="#555"/>

<View style={{flex:1,marginLeft:10}}>
<Text style={styles.menuTitle}>Staff Management</Text>
<Text style={styles.menuSub}>8 staff on shift currently</Text>
</View>

<Ionicons name="chevron-forward"/>

</TouchableOpacity>

{/* Menu */}

<TouchableOpacity
style={styles.menuCard}
onPress={() => navigation.navigate("MenuManagement")}
>

<Ionicons name="restaurant" size={22} color="#555"/>

<View style={{flex:1,marginLeft:10}}>
<Text style={styles.menuTitle}>Menu Management</Text>
<Text style={styles.menuSub}>2 items out of stock</Text>
</View>

<Ionicons name="chevron-forward"/>

</TouchableOpacity>


{/* Floor */}

<TouchableOpacity style={styles.menuCard}>

<Ionicons name="grid" size={22} color="#555"/>

<View style={{flex:1,marginLeft:10}}>
<Text style={styles.menuTitle}>Floor Plan</Text>
<Text style={styles.menuSub}>View & edit table layout</Text>
</View>

<Ionicons name="chevron-forward"/>

</TouchableOpacity>


{/* Reports */}

<TouchableOpacity style={styles.menuCard}>

<Ionicons name="bar-chart" size={22} color="#555"/>

<View style={{flex:1,marginLeft:10}}>
<Text style={styles.menuTitle}>Business Reports</Text>
<Text style={styles.menuSub}>Performance and trends</Text>
</View>

<Ionicons name="chevron-forward"/>

</TouchableOpacity>

</ScrollView>
);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f4f6fb",
padding:20
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
},

avatar:{
width:40,
height:40,
borderRadius:20,
marginRight:10
},

greeting:{
color:"#999"
},

name:{
fontSize:18,
fontWeight:"bold"
},
liveRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

liveCard:{
backgroundColor:"#fff",
width:"48%",
padding:18,
borderRadius:15,
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:5,
elevation:3
},

liveNumber:{
fontSize:15,
fontWeight:"bold",
marginTop:6
},

liveText:{
color:"#777",
fontSize:13
},
tableCard: {
  backgroundColor: "#ffffff",
  padding: 15,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3
},

tableText: {
  fontSize: 16,
  marginBottom: 3
},

icon:{
marginLeft:15
},

salesCard:{
backgroundColor:"#fff",
padding:20,
borderRadius:15,
marginBottom:20
},

salesTitle:{
color:"#777"
},

salesAmount:{
fontSize:32,
fontWeight:"bold",
color:"#ff5a36",
marginTop:5
},

updateText:{
color:"#aaa",
marginTop:5
},

sectionTitle:{
fontWeight:"bold",
marginBottom:10,
marginTop:10,
color:"#666"
},

liveRow:{
flexDirection:"row",
justifyContent:"space-between"
},

liveCard:{
backgroundColor:"#fff",
width:"48%",
padding:15,
borderRadius:15,
alignItems:"center"
},

liveNumber:{
fontSize:22,
fontWeight:"bold",
marginTop:5
},

liveText:{
color:"#777"
},

bookingCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:15,
borderRadius:15,
marginTop:15
},

manageBtn:{
backgroundColor:"#ff5a36",
paddingHorizontal:15,
paddingVertical:5,
borderRadius:10
},

menuCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:15,
borderRadius:15,
marginBottom:10
},

menuTitle:{
fontWeight:"bold"
},

menuSub:{
color:"#888",
fontSize:12
}

});