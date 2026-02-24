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
import { MaterialIcons } from "@expo/vector-icons"; 
import axios from "axios";

export default function AddMenuItem({ goBack }) {
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
    formData.append("isVeg", isVeg);
    formData.append("available", available);

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
        goBack();
      } else {
        alert("Error adding item");
      }
    } catch (err) {
      console.log(err);
      alert("Network Error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Add Menu Item</Text>

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

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Ex: Main Course"
          />

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
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f8f9fb" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  label: { marginTop: 15, fontWeight: "600" },

  imageBox: {
    height: 150,
    borderWidth: 2,
    borderColor: "#ff6b35", // Orange outline
    borderStyle: "dashed",
    borderRadius: 15,
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
});