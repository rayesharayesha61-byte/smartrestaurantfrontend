

import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
TextInput
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
export default function OverviewScreen({ navigation }) {

const [totalSales, setTotalSales] = useState(0);
const [availableTables, setAvailableTables] = useState(0);
const [ordersQueue, setOrdersQueue] = useState(0);
const [search, setSearch] = useState("");
const [greeting, setGreeting] = useState("");
const [salesGrowth, setSalesGrowth] = useState(0);
const [lastUpdated, setLastUpdated] = useState(new Date());
const [timeAgo, setTimeAgo] = useState("Just now");
const searchInputRef = useRef(null);
const [todayBookings,setTodayBookings] = useState(0);
const getGreeting = () => {
const hour = new Date().getHours();
if (hour < 12) return "Good Morning";
else if (hour < 17) return "Good Afternoon";
else return "Good Evening";
};

const updateTimeAgo = () => {
const seconds = Math.floor((new Date() - lastUpdated) / 1000);

if (seconds < 60) setTimeAgo("Just now");
else if (seconds < 3600) setTimeAgo(Math.floor(seconds / 60) + " mins ago");
else setTimeAgo(Math.floor(seconds / 3600) + " hrs ago");
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
{
title:"Business Reports",
sub:"Performance and trends",
icon:"bar-chart",
screen:"ReportScreen"
}
];

useEffect(() => {
setGreeting(getGreeting());
}, []);

useEffect(() => {
updateTimeAgo();
const interval = setInterval(() => {
updateTimeAgo();
}, 60000);
return () => clearInterval(interval);
}, [lastUpdated]);

useEffect(() => {

fetch("http://192.168.29.155:5000/admin-total-sales")
.then(res => res.json())
.then(data => {
setTotalSales(data.total_sales || 0);
setLastUpdated(new Date());
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

// useEffect(() => {

// fetch("http://192.168.29.155:5000/api/orders/queue-count")
// .then(res => res.json())
// .then(data => {
// if(data.success){
// setOrdersQueue(data.queue);
// }
// })
// .catch(err => console.log(err));

// }, []);
useEffect(() => {

fetch("http://192.168.29.155:5000/admin-total-sales")
.then(res => res.json())
.then(data => {

setTotalSales(data.total_sales || 0);

if(data.growth){
setSalesGrowth(data.growth);
}

setLastUpdated(new Date());

})
.catch(err => console.log(err));

}, []);


useEffect(()=>{
  fetchTodayBookings();
},[]);

const fetchTodayBookings = async () => {

  try{

    const res = await fetch("http://192.168.29.155:5000/api/reservations/today-count");
    const json = await res.json();

    if(json.success){
      setTodayBookings(json.total);
    }

  }catch(err){
    console.log(err);
  }

};
const filteredMenu = menuItems.filter(item =>
item.title.toLowerCase().includes(search.toLowerCase())
);

return (

<View style={{flex:1}}>

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:120}}
>

<View style={styles.header}>

<View>
<Text style={styles.greeting}>{greeting},</Text>
<Text style={styles.name}>Admin</Text>
</View>

<View style={{flexDirection:"row",gap:10}}>

<TouchableOpacity 
style={styles.iconBtn}
onPress={() => searchInputRef.current.focus()}
>
<Ionicons name="search" size={22}/>
</TouchableOpacity>

<TouchableOpacity style={styles.iconBtn}>
<Ionicons name="notifications" size={24}/>
<View style={styles.badge}/>
</TouchableOpacity>

</View>

</View>

<View style={styles.searchBox}>
<Ionicons name="search" size={20} color="#777"/>
<TextInput
ref={searchInputRef}
placeholder="Search management..."
value={search}
onChangeText={setSearch}
style={styles.searchInput}
/>
</View>

<View style={styles.salesCard}>

<View style={styles.bubble1}/>
<View style={styles.bubble2}/>
<View style={styles.salesHeader}>

<Text style={styles.salesTitle}>Today's Sales</Text>

<View style={styles.growthBubble}>
<Text style={styles.growthText}>
{salesGrowth > 0 ? `+${salesGrowth}%` : `${salesGrowth}%`}
</Text>
</View>

</View>

<Text style={styles.salesAmount}>$ {totalSales}</Text>

<View style={styles.updatedRow}>
<Ionicons name="refresh-outline" size={14} color="#888"/>
<Text style={styles.updatedText}>
Last updated {timeAgo}
</Text>
</View>

</View>

<Text style={styles.sectionTitle}>LIVE STATUS</Text>

<View style={styles.liveRow}>

<View style={styles.liveCard}>

<View style={styles.liveTop}>
<MaterialIcons name="table-restaurant" size={22} color="#3b82f6"/>
<Text style={styles.activeText}>Active</Text>
</View>

<Text style={styles.liveNumber}>{availableTables}</Text>
<Text style={styles.liveText}>Tables occupied</Text>

</View>

<View style={styles.liveCard}>

<View style={styles.liveTop}>
<MaterialIcons name="receipt-long" size={22} color="#f97316"/>
<Text style={styles.urgentText}>Urgent</Text>
</View>

<Text style={styles.liveNumber}>{ordersQueue}</Text>
<Text style={styles.liveText}>Orders in queue</Text>

</View>

</View>

<View style={styles.bookingCard}>

<View style={{flexDirection:"row",alignItems:"center"}}>
  <MaterialIcons name="event" size={24} color="#8b5cf6"/>

  <View style={{marginLeft:10}}>
    <Text style={styles.bookingNumber}>{todayBookings}</Text>
    <Text style={styles.bookingText}>Bookings for tonight</Text>
  </View>

</View>

<TouchableOpacity 
  style={styles.manageBtn}
  onPress={() => navigation.navigate("Reservations")}
>
  <Text style={{color:"#ff5a36",fontWeight:"bold"}}>Manage</Text>
</TouchableOpacity>

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


</View>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
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

iconBtn:{
width:45,
height:45,
borderRadius:25,
backgroundColor:"#fff",
justifyContent:"center",
alignItems:"center",
elevation:3
},

badge:{
position:"absolute",
top:6,
right:8,
width:10,
height:10,
borderRadius:5,
backgroundColor:"orange"
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
marginBottom:20,
position:"relative",
overflow:"hidden"
},
bubble1:{
position:"absolute",
right:-40,
top:-20,
width:140,
height:140,
borderRadius:100,
backgroundColor:"#ffe6df"
},

bubble2:{
position:"absolute",
right:-20,
bottom:-30,
width:120,
height:120,
borderRadius:100,
backgroundColor:"#ffd2c7"
},

salesHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

salesTitle:{
color:"#777"
},

growthBubble:{
backgroundColor:"#d1fae5",
paddingHorizontal:12,
paddingVertical:5,
borderRadius:50,
alignItems:"center",
justifyContent:"center"
},

growthText:{
color:"#10b981",
fontWeight:"bold",
fontSize:12
},

salesAmount:{
fontSize:32,
fontWeight:"bold",
color:"#ff5a36",
marginTop:5
},

updatedRow:{
flexDirection:"row",
alignItems:"center",
marginTop:5
},

updatedText:{
color:"#888",
marginLeft:4,
fontSize:12
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
marginBottom:15
},

liveCard:{
backgroundColor:"#fff",
width:"48%",
padding:18,
borderRadius:15,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:5,
elevation:3
},

liveTop:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

activeText:{
color:"#3b82f6",
fontWeight:"bold"
},

urgentText:{
color:"#f97316",
fontWeight:"bold"
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

bookingCard:{
backgroundColor:"#fff",
padding:18,
borderRadius:15,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:15
},

bookingNumber:{
fontSize:18,
fontWeight:"bold"
},

bookingText:{
color:"#777",
fontSize:12
},

manageBtn:{
backgroundColor:"#ffe8e2",
paddingHorizontal:15,
paddingVertical:8,
borderRadius:20
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
},

fab:{
position:"absolute",
bottom:30,
alignSelf:"center",
backgroundColor:"#ff5a36",
width:60,
height:60,
borderRadius:30,
justifyContent:"center",
alignItems:"center",
elevation:5
}

});