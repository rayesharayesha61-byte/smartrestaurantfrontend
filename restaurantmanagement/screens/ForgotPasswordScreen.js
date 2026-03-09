// import React, {useState} from "react";
// import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";

// export default function ForgotPassword({navigation}){

// const [email,setEmail] = useState("");
// const [otp,setOtp] = useState("");
// const [password,setPassword] = useState("");

// const sendOtp = async()=>{

// const res = await fetch("http://192.168.29.155:5000/api/forgot-password",{
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body: JSON.stringify({email})
// });

// const data = await res.json();

// if(data.success){
// alert("OTP Sent to Email");
// }else{
// alert(data.message);
// }

// };

// const resetPassword = async()=>{

// const res = await fetch("http://192.168.29.155:5000/api/reset-password",{
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body: JSON.stringify({
// email,
// otp,
// password
// })
// });

// const data = await res.json();

// if(data.success){
// alert("Password Updated");
// navigation.navigate("LoginScreen");
// }else{
// alert(data.message);
// }

// };

// return(

// <View style={styles.container}>

// <Text style={styles.title}>Forgot Password</Text>

// <TextInput
// placeholder="Enter Email"
// value={email}
// onChangeText={setEmail}
// style={styles.input}
// />

// <TouchableOpacity style={styles.btn} onPress={sendOtp}>
// <Text style={{color:"#fff"}}>Send OTP</Text>
// </TouchableOpacity>

// <TextInput
// placeholder="Enter OTP"
// value={otp}
// onChangeText={setOtp}
// style={styles.input}
// />

// <TextInput
// placeholder="New Password"
// secureTextEntry
// value={password}
// onChangeText={setPassword}
// style={styles.input}
// />

// <TouchableOpacity style={styles.btn} onPress={resetPassword}>
// <Text style={{color:"#fff"}}>Reset Password</Text>
// </TouchableOpacity>

// </View>

// );

// }

// const styles=StyleSheet.create({
// container:{flex:1,justifyContent:"center",padding:20},
// title:{fontSize:22,fontWeight:"bold",marginBottom:20},
// input:{borderWidth:1,padding:10,borderRadius:5,marginBottom:15},
// btn:{backgroundColor:"green",padding:12,alignItems:"center",borderRadius:5}
// });
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