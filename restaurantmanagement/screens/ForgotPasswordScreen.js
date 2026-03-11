
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ForgotPassword({ navigation }) {

const [email,setEmail] = useState("");

const sendOtp = async () => {

try{

const res = await fetch("http://192.168.29.155:5000/api/forgot-password",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ email })
});

const data = await res.json();

if(data.success){
alert("OTP Sent to Email");

navigation.navigate("ResetPasswordScreen",{
email: email
});

}else{
alert(data.message);
}

}catch(error){
alert("Server Error");
}

};

return(

<View style={styles.container}>

<Text style={styles.title}>Forgot Password</Text>
<Text style={styles.subtitle}>Enter your email to receive OTP</Text>

<TextInput
placeholder="Enter Email"
value={email}
onChangeText={setEmail}
style={styles.input}
/>

<TouchableOpacity style={styles.btn} onPress={sendOtp}>
<Text style={styles.btntxt}>Send OTP</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
  <Text style={styles.loginLink}>
    Remember password? Login
  </Text>
</TouchableOpacity>
</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
padding:25,
backgroundColor:"#fff"
},

title:{
fontSize:28,
fontWeight:"bold",
textAlign:"center",
marginBottom:10
},

subtitle:{
textAlign:"center",
color:"#777",
marginBottom:30
},

input:{
borderWidth:1,
borderColor:"#eee",
padding:15,
borderRadius:25,
marginBottom:20,
backgroundColor:"#fafafa"
},

btn:{
backgroundColor:"#FF6B35",
padding:15,
borderRadius:25,
alignItems:"center"
},
loginLink:{
  textAlign:"center",
  marginTop:20,
  color:"#FF6B35",
  fontWeight:"bold"
},
btntxt:{
color:"#fff",
fontWeight:"bold"
}

});