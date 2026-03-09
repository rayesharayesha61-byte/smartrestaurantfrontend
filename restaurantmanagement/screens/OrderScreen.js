import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
FlatList,
TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function OrderScreen({ navigation }) {

const [tables, setTables] = useState([]);

const API_URL = "http://192.168.29.155:5000/api";

useEffect(() => {
fetchTables();
}, []);

const fetchTables = async () => {
try {

const response = await axios.get(`${API_URL}/tables`);

if(response.data.success){

// Occupied tables மட்டும் filter
const occupiedTables = response.data.data.filter(
(t)=> t.status === "Occupied"
);

setTables(occupiedTables);

}

}catch(error){
console.log("Orders Fetch Error:",error.message);
}
};

const renderItem = ({item}) => (

<TouchableOpacity
style={styles.card}
onPress={()=>navigation.navigate("OrderDetails",{
tableId:item.id,
tableNumber:item.table_number
})}
>

<Text style={styles.tableNumber}>
Table {item.table_number}
</Text>

<Text style={styles.status}>
{item.status}
</Text>

{item.occupied_at && (
<Text style={styles.time}>
Since: {new Date(item.occupied_at).toLocaleTimeString()}
</Text>
)}

</TouchableOpacity>

);

return(

<SafeAreaView style={{flex:1,backgroundColor:"#f4f6f9"}}>

<View style={styles.container}>

<Text style={styles.title}>Running Orders</Text>

<FlatList
data={tables}
keyExtractor={(item)=>item.id.toString()}
renderItem={renderItem}
showsVerticalScrollIndicator={false}
/>

</View>

</SafeAreaView>

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
padding:20,
borderRadius:15,
marginBottom:15,
elevation:3
},

tableNumber:{
fontSize:18,
fontWeight:"bold"
},

status:{
marginTop:5,
color:"#ff6b3d",
fontWeight:"bold"
},

time:{
marginTop:5,
fontSize:12,
color:"#777"
}

});