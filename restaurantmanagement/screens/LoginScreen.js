import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import axios from 'axios';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ setUser,navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);


const handleLogin = async () => {
  try {
    const response = await axios.post('http://192.168.29.155:5000/login', {
      email,
      password
    });

    if (response.data.success) {

      const userData = {
        role: response.data.role,
        name: response.data.name
      };

      setUser(userData);

      await AsyncStorage.setItem("user", JSON.stringify(userData));

    } else {
      Alert.alert("Error", "Invalid Credentials");
    }

  } catch (error) {
    Alert.alert("Error", "Server not reachable");
  }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28 }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.logoBox}>
          <MaterialIcons name="restaurant" size={35} color="#FF6B35" />
        </View>

        <Text style={styles.title}>Smart Restaurant</Text>
        <Text style={styles.subtitle}>Deliciously simple dining</Text>

        <Text style={styles.welcome}>Welcome back</Text>

        <Text style={styles.label}>Email </Text>
        <View style={styles.inputBox}>
          <Feather name="user" size={18} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="e.g. name@email.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Feather name="lock" size={18} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

     
<TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
  <Text style={styles.forgot}>Forgot password?</Text>
</TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    justifyContent: 'center'
  },
  logoBox: {
    width: 85,
    height: 85,
    backgroundColor: '#FDE7DC',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: 5,
    marginBottom: 35
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  label: {
    marginBottom: 6,
    marginTop: 10,
    color: '#555'
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 18,
    height: 52,
    backgroundColor: '#fafafa',
    marginBottom: 15
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  forgot: {
    textAlign: 'right',
    color: '#FF6B35',
    marginBottom: 25
  },
  loginBtn: {
    backgroundColor: '#FF6B35',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee'
  },
  orText: {
    marginHorizontal: 10,
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  }
});