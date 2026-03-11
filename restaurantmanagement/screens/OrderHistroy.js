import React, {useEffect,useState} from "react";
import {View,Text,FlatList,StyleSheet} from "react-native";
import axios from "axios";

export default function OrderHistory(){

const [orders,setOrders] = useState([]);

useEffect(()=>{
fetchHistory();
},[]);

const fetchHistory = async ()=>{

const res = await axios.get("http://192.168.29.155:5000/api/orders");

const readyOrders = res.data.filter(
(o)=>o.status === "Paid"
);

setOrders(readyOrders);

};

return(

<View style={styles.container}>

<Text style={styles.title}>
Completed Orders
</Text>

<FlatList
data={orders}
keyExtractor={(item)=>item.id.toString()}
  contentContainerStyle={{paddingBottom:140}}
renderItem={({item})=>(
<View style={styles.card}>

<Text>Table {item.table_number}</Text>

<Text>{item.menu_name}</Text>

<Text>{item.quantity}</Text>

</View>
)}
/>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

title:{
fontSize:20,
fontWeight:"bold",
marginBottom:20
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:10,
marginBottom:10
}

});