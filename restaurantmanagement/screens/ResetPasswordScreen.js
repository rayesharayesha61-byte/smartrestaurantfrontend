import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ResetPasswordScreen({ route, navigation }) {

const { email } = route.params;

const [otp,setOtp] = useState("");
const [password,setPassword] = useState("");

const resetPassword = async () => {

try{

const res = await fetch("http://192.168.29.155:5000/api/reset-password",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
email: email,
otp: otp,
password: password
})
});

const data = await res.json();

if(data.success){
alert("Password Updated");
navigation.navigate("LoginScreen");
}else{
alert(data.message);
}

}catch(e){
alert("Server Error");
}

};

return(

<View style={styles.container}>

<Text style={styles.title}>Reset Password</Text>
<Text style={styles.subtitle}>Enter OTP and new password</Text>

<TextInput
placeholder="Enter OTP"
value={otp}
onChangeText={setOtp}
style={styles.input}
/>

<TextInput
placeholder="New Password"
secureTextEntry
value={password}
onChangeText={setPassword}
style={styles.input}
/>

<TouchableOpacity style={styles.btn} onPress={resetPassword}>
<Text style={styles.btntxt}>Reset Password</Text>
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

btntxt:{
color:"#fff",
fontWeight:"bold"
}

});