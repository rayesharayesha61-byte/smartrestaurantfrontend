
import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
TextInput
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function OverviewScreen({ navigation }) {

const [totalSales, setTotalSales] = useState(0);
const [availableTables, setAvailableTables] = useState(0);
const [ordersQueue, setOrdersQueue] = useState(0);
const [search, setSearch] = useState("");
const [greeting, setGreeting] = useState("");

const getGreeting = () => {
const hour = new Date().getHours();

if (hour < 12) return "Good Morning";
else if (hour < 17) return "Good Afternoon";
else return "Good Evening";
};

const menuItems = [
{
title:"Staff Management",
sub:"8 staff on shift currently",
icon:"badge",
screen:"StaffManagementScreen"
},
{
title:"Menu Management",
sub:"2 items out of stock",
icon:"restaurant",
screen:"MenuManagement"
},
{
title:"Floor Plan",
sub:"View & edit table layout",
icon:"table-restaurant",
screen:"CreateTable"
},
// {
// title:"Business Reports",
// sub:"Performance and trends",
// icon:"bar-chart",
// screen:"Reports"
// }
];

useEffect(() => {
setGreeting(getGreeting());
}, []);

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

useEffect(() => {
fetch("http://192.168.29.155:5000/api/orders/queue-count")
.then(res => res.json())
.then(data => {
if(data.success){
setOrdersQueue(data.count);
}
})
.catch(err => console.log(err));
}, []);

const filteredMenu = menuItems.filter(item =>
item.title.toLowerCase().includes(search.toLowerCase())
);

return (

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:140}}
>

<View style={styles.header}>

<View style={{flexDirection:"row",alignItems:"center"}}>

<View>
<Text style={styles.greeting}>{greeting},</Text>
<Text style={styles.name}>Admin</Text>
</View>

</View>

<Ionicons name="notifications-outline" size={22} />

</View>

<View style={styles.searchBox}>

<Ionicons name="search" size={20} color="#777"/>

<TextInput
placeholder="Search management..."
value={search}
onChangeText={setSearch}
style={styles.searchInput}
/>

</View>

<View style={styles.salesCard}>

<Text style={styles.salesTitle}>Total Sales</Text>

<Text style={styles.salesAmount}>
₹ {totalSales}
</Text>

</View>

<Text style={styles.sectionTitle}>LIVE STATUS</Text>

<View style={styles.liveRow}>

<View style={styles.liveCard}>

<MaterialIcons name="event-seat" size={22} color="#3b82f6"/>

<Text style={styles.liveNumber}>{availableTables}</Text>

<Text style={styles.liveText}>Available Tables</Text>

</View>

<View style={styles.liveCard}>

<MaterialIcons name="receipt-long" size={22} color="#f97316"/>

<Text style={styles.liveNumber}>{ordersQueue}</Text>

<Text style={styles.liveText}>Orders in queue</Text>

</View>

</View>

<Text style={styles.sectionTitle}>MANAGEMENT HUB</Text>

{filteredMenu.map((item,index)=>(

<TouchableOpacity
key={index}
style={styles.menuCard}
onPress={()=>navigation.navigate(item.screen)}
>

<MaterialIcons name={item.icon} size={22} color="#555"/>

<View style={{flex:1,marginLeft:10}}>

<Text style={styles.menuTitle}>{item.title}</Text>

<Text style={styles.menuSub}>{item.sub}</Text>

</View>

<Ionicons name="chevron-forward"/>

</TouchableOpacity>

))}

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

greeting:{
color:"#999"
},

name:{
fontSize:18,
fontWeight:"bold"
},

searchBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
paddingHorizontal:10,
borderRadius:12,
marginBottom:15
},

searchInput:{
flex:1,
marginLeft:8
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

sectionTitle:{
fontWeight:"bold",
marginBottom:10,
marginTop:10,
color:"#666"
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
fontSize:22,
fontWeight:"bold",
marginTop:6
},

liveText:{
color:"#777",
fontSize:13
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