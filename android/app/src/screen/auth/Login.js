import { View, ImageBackground, StyleSheet, Alert } from 'react-native'
// react-native-paper.....
import { TextInput, Button, Text } from 'react-native-paper';

import React from 'react'
import { useState } from 'react';
// image...
import backImage from '../../assets/images/Celestial.jpg'
import { set } from 'react-native-reanimated';
import { Directions } from 'react-native-gesture-handler';
import { useAuthContext } from '../../context/AuthContext';
// firebase
import auth from '@react-native-firebase/auth';

const initialState = {
    email: "",
    password: "",
}


export default function Login({ navigation }) {

    const [state, setState] = useState(initialState);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isProssesing, setIsProsssesing] = useState(false);

    const { isAuthenticated, dispatch } = useAuthContext()
    console.log("isAuthenticted =>", isAuthenticated)
    // handleChange......
    const handleChange = (name, value) => {
        console.log("name=>", name);
        console.log("value", value);
        setState((s) => ({ ...s, [name]: value }))

    }

    // handleSubmit
    const handleSubmit = () => {
        const { email, password } = state;
        if (!email) {
            Alert.alert("please enter your email")
            return
        }
        if (password.length < 6) {
            Alert.alert("password must be greater then 6 words")
            return
        }

        console.log("Email=>", email);
        console.log("Password", password);
        setIsProsssesing(true);
        auth().signInWithEmailAndPassword(email, password)
            .then((userCredentional) => {
                const user = userCredentional.user;
                console.log("you are successfully login");
                console.log(user);
                dispatch({ type: "LOGIN", payload: { user } })
            }).catch((error) => {
                console.error(error)
            }).finally(() => {
                setIsProsssesing(false);
            })

    }

    return (
        <ImageBackground source={backImage} style={[styles.container, { paddingHorizontal: 15, }]}>

            <View style={styles.container}>
                <View style={styles.textStyle}>
                    <Text variant="headlineMedium" style={{ color: "white" }}>Login Form</Text>
                </View>
                <TextInput
                    style={styles.inputStyle}
                    label="Email"
                    // value={text}
                    keyboardType='email-address'
                    onChangeText={value => handleChange("email", value)}
                />

                <TextInput
                    style={styles.inputStyle}
                    label="Password"
                    // value={text}
                    // keyboardType='password'
                    onChangeText={value => handleChange("password", value)}
                    secureTextEntry={!isPasswordShow ? true : false}
                    right={<TextInput.Icon icon={isPasswordShow ? "eye-off" : "eye"} onPress={() => setIsPasswordShow(!isPasswordShow)} />}
                />

                {/* button */}
                <Button textColor='black' buttonColor='white' mode="contained" style={{ borderRadius: 4 }} loading={isProssesing ? true : false} onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
            {/*forget and register button  */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button textColor='white' mode="text" onPress={() => (navigation.navigate("Register"))}  >
                    Don 't have an account
                </Button>
                <Button textColor='white' mode="text" onPress={() => navigation.navigate("Forget")} >
                    forget password
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