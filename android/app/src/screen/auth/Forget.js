import { View, ImageBackground, StyleSheet, Alert } from 'react-native'
// react-native-paper.....
import { TextInput, Button, Text } from 'react-native-paper';

import React from 'react'
import { useState } from 'react';
// image...
import backImage from '../../assets/images/Celestial.jpg'

import { useAuthContext } from '../../context/AuthContext';

import auth from '@react-native-firebase/auth';

export default function Forget({ navigation }) {

    const [email, setEmail] = useState("");
    const [isProssesing, setIsProsssesing] = useState(false);


    const { isAuthenticated, dispatch } = useAuthContext()
    console.log("isAuthenticted =>", isAuthenticated)
    // handleChange......


    // handleSubmit
    const handleChangePassword = () => {

        if (!email) {
            Alert.alert("please enter your email")
            return
        }
        setIsProsssesing(true);
        auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log("password is send")
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                setIsProsssesing(false)
            })

    }

    return (
        <ImageBackground source={backImage} style={[styles.container, { paddingHorizontal: 15, }]}>

            <View style={styles.container}>
                <View style={styles.textStyle}>
                    <Text variant="headlineMedium" style={{ color: "white" }}>Forget Password</Text>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    label="Email"
                    // value={text}
                    keyboardType='email-address'
                    onChangeText={value => setEmail(value)}
                />



                {/* button */}
                <Button textColor='black' buttonColor='white' mode="contained" style={{ borderRadius: 4 }} loading={isProssesing ? true : false} onPress={handleChangePassword}>
                    Reset Your Password
                </Button>
            </View>
            {/*forget and register button  */}
            <View >
                <Button textColor='white' mode="text" onPress={() => (navigation.navigate("Login"))}  >
                    Back To Login
                </Button>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",


    },
    inputStyle: {
        marginBottom: 15,
    },
    textStyle: {
        justifyContent: "center",
        alignItems: "center",
        // alignContent: "center"
        // marginHorizontal: 50
        paddingBottom: 10,

    }
})