import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons"; 
import axios from "axios";

export default function AddMenuItem({goBack,navigation}) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to pick image");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri, type: "image/jpeg", name: "menu.jpg" });
    }
  };


const clearFields = () => {
  setItemName("");
  setCategory("");
  setPrice("");
  setDescription("");
  setIsVeg(true);
  setAvailable(true);
  setImage(null);
};

const saveMenuItem = async () => {
  if (!itemName || !category || !price) {
    alert("Please fill all required fields");
    return;
  }

  const formData = new FormData();
  formData.append("name", itemName);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("isVeg", isVeg ? 1 : 0);
  formData.append("available", available ? 1 : 0);

  if (image) {
    formData.append("image", {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });
  }

  try {
    const response = await axios.post(
      "http://192.168.29.155:5000/api/menu/add",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.data.success) {
      alert("Menu Item added!");

      clearFields(); // clear inputs
      navigation.navigate("MenuManagement"); // go to menu screen
    } else {
      alert("Error adding item");
    }
  } catch (err) {
    console.log(err);
  }
};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > 
        <ScrollView contentContainerStyle={styles.container}  keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Add Menu Item</Text>
          <View style={styles.closeIcon}>
           <TouchableOpacity onPress={() => navigation.goBack()}>
  <MaterialIcons name="close" size={26} color="#333" />
</TouchableOpacity></View>

          {/* Image Upload */}
          <Text style={styles.label}>Menu Item Photo</Text>
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.uploadContent}>
                <MaterialIcons name="add-a-photo" size={40} color="#ff6b35" />
                <Text style={{ color: "#ff6b35", marginTop: 5 }}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Item Name */}
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Ex: Veg Burger"
          />

<Text style={styles.label}>Category</Text>
<View style={styles.pickerBox}>
  <Picker
    selectedValue={category}
    onValueChange={(itemValue) => setCategory(itemValue)}
  >
    <Picker.Item label="Select Category" value="" />
    <Picker.Item label="starters" value="1" />
    <Picker.Item label="Main Course" value="2" />
     <Picker.Item label="Beverages" value="3" />
       <Picker.Item label="Breakfast" value="4" />
    <Picker.Item label="lunch" value="5" />
     <Picker.Item label="Dinner" value="6" />
      
  </Picker>
</View>
{/* Price */}
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            placeholder="₹ 0.00"
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 90 }]}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Write a short description..."
          />

          {/* Veg / Non-Veg */}
          <Text style={styles.label}>Dietary Preference</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.foodButton, isVeg && styles.activeVeg]}
              onPress={() => setIsVeg(true)}
            >
              <Text style={[styles.foodText, isVeg && { color: "green" }]}>Veg</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.foodButton, !isVeg && styles.activeNonVeg]}
              onPress={() => setIsVeg(false)}
            >
              <Text style={[styles.foodText, !isVeg && { color: "red" }]}>Non-Veg</Text>
            </TouchableOpacity>
          </View>

          {/* Available */}
          <View style={styles.switchRow}>
            <Text>Available</Text>
            <Switch value={available} onValueChange={setAvailable} trackColor={{ true: "#28c76f" }} />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveMenuItem}>
            <Text style={styles.saveText}>Save Menu Item</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f8f9fb",paddingBottom:150 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { marginTop: 15, fontWeight: "600" },

  imageBox: {
    height: 230,
   
    borderWidth: 2,
    borderColor: "#ff6b35", 
    borderStyle: "dashed",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#fff"
  },
  uploadContent: { justifyContent: "center", alignItems: "center" },
  imagePreview: { width: "100%", height: "100%", borderRadius: 15 },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 5,
    fontSize: 16
  },
 closeIcon: {
  position:"absolute",
  right:20,
  top:15,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  foodButton: {
    flex: 1,
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff"
  },
  activeVeg: { borderColor: "green", backgroundColor: "#e8f5e9" },
  activeNonVeg: { borderColor: "red", backgroundColor: "#fdecea" },
  foodText: { fontWeight: "bold", color: "#555" },

  switchRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },

  saveButton: {
    backgroundColor: "#ff6b35",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancel: { textAlign: "center", marginTop: 15, color: "#777", fontSize: 15 },
  pickerBox: {
  backgroundColor: "#fff",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  marginTop: 5,
}
});