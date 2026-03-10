import React, { useEffect, useState } from "react";
import {
View,
Text,
StyleSheet,
FlatList,
TouchableOpacity,
TextInput,
Alert
} from "react-native";
import axios from "axios";

export default function InventoryScreen() {

const [items, setItems] = useState([]);
const [name, setName] = useState("");
const [quantity, setQuantity] = useState("");
const [unit, setUnit] = useState("");

useEffect(() => {
fetchInventory();
}, []);

const fetchInventory = async () => {
try {
const res = await axios.get("http://192.168.29.155:5000/api/inventory");
setItems(res.data);
} catch (err) {
Alert.alert("Error", "Failed to load inventory");
}
};

const addItem = async () => {

if (!name || !quantity) {
Alert.alert("Enter all fields");
return;
}

try {
await axios.post("http://192.168.29.155:5000/api/inventory", {
name,
quantity: Number(quantity),
unit
});

setName("");
setQuantity("");
setUnit("");

fetchInventory();

} catch (err) {
Alert.alert("Error", "Failed to add item");
}
};


const updateStock = async (id, qty) => {

try{

await axios.put(`http://192.168.29.155:5000/api/inventory/${id}`, {
quantity: Number(qty) + 1
});

fetchInventory();

}catch(err){
console.log(err.response?.data || err.message);
Alert.alert("Error updating stock");
}

};
const renderItem = ({ item }) => (

<View
style={[
styles.card,
item.quantity < 5 && styles.lowStock
]}
>

<View style={styles.row}>
<Text style={styles.name}>{item.name}</Text>
<Text style={styles.qty}>
{item.quantity} {item.unit}
</Text>
</View>

<TouchableOpacity
style={styles.addBtn}
onPress={() => updateStock(item.id, item.quantity)}
>
<Text style={styles.btnText}>+ Add Stock</Text>
</TouchableOpacity>

</View>

);

return (

<View style={styles.container}>

<Text style={styles.header}>
Inventory Management
</Text>

<View style={styles.form}>

<TextInput
placeholder="Ingredient Name"
style={styles.input}
value={name}
onChangeText={setName}
/>

<TextInput
placeholder="Quantity"
style={styles.input}
keyboardType="numeric"
value={quantity}
onChangeText={setQuantity}
/>

<TextInput
placeholder="Unit (kg / pcs)"
style={styles.input}
value={unit}
onChangeText={setUnit}
/>

<TouchableOpacity
style={styles.saveBtn}
onPress={addItem}
>
<Text style={styles.btnText}>
Add Inventory
</Text>
</TouchableOpacity>

</View>

<FlatList
data={items}
keyExtractor={(item) => item.id.toString()}
renderItem={renderItem}
contentContainerStyle={{ paddingBottom: 100 }}
/>

</View>
);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5",
padding:20
},

header:{
fontSize:24,
fontWeight:"bold",
marginBottom:20
},

form:{
backgroundColor:"#fff",
padding:15,
borderRadius:15,
marginBottom:20
},

input:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:10,
padding:10,
marginBottom:10
},

saveBtn:{
backgroundColor:"#ff6b35",
padding:12,
borderRadius:10,
alignItems:"center"
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:15,
marginBottom:15,
elevation:3
},

lowStock:{
borderLeftWidth:5,
borderLeftColor:"red"
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

name:{
fontSize:16,
fontWeight:"bold"
},

qty:{
fontSize:16
},

addBtn:{
backgroundColor:"#4CAF50",
padding:10,
borderRadius:8,
alignItems:"center"
},

btnText:{
color:"#fff",
fontWeight:"bold"
}

});