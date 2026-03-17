import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
ScrollView,
Dimensions
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ReportScreen() {

const [todaySales,setTodaySales] = useState(0);
const [orders,setOrders] = useState(0);
const [reservations,setReservations] = useState(0);

const [salesChart,setSalesChart] = useState({
labels:["Day","Week","Month"],
datasets:[{data:[0,0,0]}]
});

useEffect(()=>{
fetchReport();
},[]);

const fetchReport = async () => {

try{

const res = await fetch("http://192.168.29.155:5000/api/reports/today");
const json = await res.json();

if(json.success){

setTodaySales(json.data.sales);
setOrders(json.data.orders);
setReservations(json.data.reservations);

setSalesChart({
labels:["Day","Week","Month"],
datasets:[
{
data:[
json.data.daySales || 0,
json.data.weekSales || 0,
json.data.monthSales || 0
]
}
]
});

}

}catch(err){
console.log(err);
}

};

return (

<ScrollView style={styles.container}>

<Text style={styles.title}>Business Report</Text>

<View style={styles.card}>
<MaterialIcons name="attach-money" size={28} color="#10b981"/>
<View style={{marginLeft:10}}>
<Text style={styles.number}>₹{todaySales}</Text>
<Text style={styles.label}>Today Sales</Text>
</View>
</View>

<View style={styles.card}>
<MaterialIcons name="shopping-cart" size={28} color="#3b82f6"/>
<View style={{marginLeft:10}}>
<Text style={styles.number}>{orders}</Text>
<Text style={styles.label}>Total Orders</Text>
</View>
</View>

<View style={styles.card}>
<MaterialIcons name="event" size={28} color="#8b5cf6"/>
<View style={{marginLeft:10}}>
<Text style={styles.number}>{reservations}</Text>
<Text style={styles.label}>Reservations</Text>
</View>
</View>

<Text style={styles.chartTitle}>Sales Analytics</Text>

<BarChart
data={salesChart}
width={screenWidth - 40}
height={220}
fromZero
yAxisLabel="₹"
chartConfig={{
backgroundGradientFrom:"#fff",
backgroundGradientTo:"#fff",
decimalPlaces:0,
color:(opacity=1)=>`rgba(59,130,246,${opacity})`,
labelColor:(opacity=1)=>`rgba(0,0,0,${opacity})`
}}
style={{
marginVertical:10,
borderRadius:10
}}
/>

</ScrollView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#fff",
padding:20
},

title:{
fontSize:22,
fontWeight:"bold",
marginBottom:20
},

card:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#f9fafb",
padding:15,
borderRadius:10,
marginBottom:15
},

number:{
fontSize:18,
fontWeight:"bold"
},

label:{
color:"#555"
},

chartTitle:{
fontSize:18,
fontWeight:"bold",
marginTop:20
}

});