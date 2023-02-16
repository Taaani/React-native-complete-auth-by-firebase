import { View, Text } from 'react-native'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import { State } from 'react-native-gesture-handler'
// firebase.......
import auth from '@react-native-firebase/auth'

const AuthContext = createContext();

const intialState = {
    isAuthenticated: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": return Object.assign({}, { isAuthenticated: true }, { user: action.payload.user });
        case "LOGOUT": return Object.assign({}, { isAuthenticated: false });
        default: return state;
    }

}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, intialState);

    // useEffect(() => {
    //     auth().onAuthStateChanged((user) => {
    //         console.log("onAuthStateChanged User =>", user);
    //         if (user) {
    //             dispatch({ type: "LOGIN", payload: { user } })

    //         } else {
    //             console.log("you cannot login")
    //         }
    //     })
    // })
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook

const useAuthContext = () => {
    return useContext(AuthContext);
}

export { useAuthContext };