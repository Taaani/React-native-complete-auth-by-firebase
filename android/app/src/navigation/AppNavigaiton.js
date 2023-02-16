import { View, Text } from 'react-native'
import React from 'react'
// native navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// frontend pages
import Home from '../screen/frontend/Home';
import About from '../screen/frontend/About';
import Contect from '../screen/frontend/Contect';
// auth pages
import Login from '../screen/auth/Login';
import Forget from '../screen/auth/Forget';
import Register from '../screen/auth/Register';
import { useAuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigaiton() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <NavigationContainer>

        <Stack.Navigator>
          {isAuthenticated
            ? <Stack.Group>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='About' component={About} />
              <Stack.Screen name='Contect' component={Contect} />
            </Stack.Group>
            : <Stack.Group

              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen name='Forget' component={Forget} />
            </Stack.Group>
          }



        </Stack.Navigator>

      </NavigationContainer>
    </>
  )
}