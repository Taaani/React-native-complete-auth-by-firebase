import React from 'react'
import AuthContextProvider from './android/app/src/context/AuthContext'
// import BottomNavigation from './android/app/src/bottomNav/BottomNavigation'

import AppNavigaiton from './android/app/src/navigation/AppNavigaiton'
export default function App() {
  return (
    <>
      <AuthContextProvider>

        <AppNavigaiton />
      </AuthContextProvider>
      {/* <BottomNavigation /> */}
    </>
  )
}