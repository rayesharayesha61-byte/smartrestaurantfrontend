import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MenuManagement from "./MenuManagement";
import AddMenuItem from "./AddMenuItem";

export default function ManagerDashboard({ token }) {

  const [menuVisible, setMenuVisible] = useState(false);
const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("waiter");
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const createStaff = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!fullName || !mobile || !email || !password || !role) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("is_active", isActive);

      if (profileImage) {
        formData.append("profile_image", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      const response = await axios.post(
        "http://192.168.29.155:5000/api/staff/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Staff Created Successfully ✅");
        setFullName("");
        setMobile("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        setSuccessMessage("Staff Created Successfully ✅");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Network / Axios Error:", error.message);
      Alert.alert("Network Error", "Check your PC IP, Wi-Fi, and Firewall.");
    }
  };
 if (currentScreen === "menuManagement") {
  return <MenuManagement goBack={() => setCurrentScreen("dashboard")} />;
}

if (currentScreen === "addMenu") {
  return <AddMenuItem goBack={() => setCurrentScreen("dashboard")} />;
}
  return (
   
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      

      {/* HEADER */}
      <View style={headerStyles.header}>
        
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <MaterialCommunityIcons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={headerStyles.headerTitle}>Admin Dashboard</Text>
      </View>

      {/* SIDE MENU */}
      {/* {menuVisible && (
        <View style={headerStyles.sideMenu}>
          <TouchableOpacity onPress={() => setMenuVisible(false)}>
          
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={headerStyles.menuItem}>Menu Management</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={headerStyles.menuItem}>Add Menu Item</Text>
          </TouchableOpacity>
         
        </View>
      )} */}
{menuVisible && (
  <View style={headerStyles.sideMenu}>
    
    <TouchableOpacity
      onPress={() => {
        setCurrentScreen("menuManagement");
        setMenuVisible(false);
      }}
    >
      <Text style={headerStyles.menuItem}>Menu Management</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        setCurrentScreen("addMenu");
        setMenuVisible(false);
      }}
    >
      <Text style={headerStyles.menuItem}>Add Menu Item</Text>
    </TouchableOpacity>

  </View>
)}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          {successMessage !== "" && (
            <View style={styles.successBox}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#2e7d32" />
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.title}>Create Staff Account</Text>

            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.avatarWrapper}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {fullName ? fullName.charAt(0).toUpperCase() : "JS"}
                      </Text>
                    </View>
                  )}
                  <View style={styles.cameraIcon}>
                    <MaterialCommunityIcons name="camera" size={16} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={{ marginTop: 8, color: "#666" }}>New Staff Profile</Text>
            </View>

            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="e.g. John Smith" />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={mobile} onChangeText={setMobile} placeholder="9876543210" />

            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@email.com" />

            <Text style={styles.label}>Role Selection</Text>
            <View style={styles.roleContainer}>
              {["waiter", "chef", "cashier", "manager", "admin"].map((r) => (
                <TouchableOpacity key={r} style={[styles.roleButton, role === r && styles.roleActive]} onPress={() => setRole(r)}>
                  <Text style={[styles.roleText, role === r && { color: "#fff" }]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordBox}>
              <TextInput style={{ flex: 1 }} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordBox}>
              <TextInput style={{ flex: 1 }} secureTextEntry={!showPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <View style={styles.switchRow}>
              <Text style={{ fontSize: 16 }}>Active Status</Text>
              <Switch value={isActive} onValueChange={setIsActive} />
            </View>

            <TouchableOpacity style={styles.button} onPress={createStaff}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, elevation: 5 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#ffe5d9", justifyContent: "center", alignItems: "center"
  },
  avatarText: { fontSize: 30, color: "#ff6b35", fontWeight: "bold" },
  cameraIcon: {
    position: "absolute", bottom: 0, right: 0,
    backgroundColor: "#ff6b35", width: 30, height: 30,
    borderRadius: 15, justifyContent: "center", alignItems: "center"
  },
  label: { marginTop: 12, marginBottom: 6, fontWeight: "600" },
  input: { backgroundColor: "#f4f4f4", borderRadius: 12, padding: 12 },
  passwordBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#f4f4f4", borderRadius: 12, paddingHorizontal: 12
  },
  roleContainer: { flexDirection: "row", flexWrap: "wrap" },
  roleButton: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, borderWidth: 1,
    borderColor: "#ccc", marginRight: 8, marginTop: 8
  },
  roleActive: { backgroundColor: "#ff6b35", borderColor: "#ff6b35" },
  roleText: { fontSize: 14 },
  switchRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 20
  },
  button: {
    backgroundColor: "#ff6b35", padding: 15,
    borderRadius: 30, marginTop: 25, alignItems: "center"
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  successBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#e8f5e9", padding: 10,
    borderRadius: 12, marginBottom: 15
  },
  successText: { marginLeft: 8, color: "#2e7d32", fontWeight: "600" },
});



const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b35",
    padding: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  sideMenu: {
    position: "absolute",
    top: 85,
    left: 0,
    width: 220,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 10,
    zIndex: 1000,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "500",
  },
});