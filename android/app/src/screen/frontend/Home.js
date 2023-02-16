import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
// react naitve paper
import { Button } from 'react-native-paper';
// firebase....
import auth from '@react-native-firebase/auth';

export default function Home() {

  const { user, dispatch } = useAuthContext();
  console.log("home user ", user)

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" });
        console.log("you are successfully logout");

      }).catch(error => {
        console.error(error);
      });
  }
  return (
    <View style={sytles.container}>
      <Text style={{ color: "black" }}>{`wellcome ${user.email}`}</Text>
      <Button textColor='white' buttonColor='black' mode="contained" style={{ marginTop: 8, borderRadius: 4 }} onPress={handleLogout}>
        logout
      </Button>
    </View>
  )
}

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})