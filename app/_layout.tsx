import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext'

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define your index/starting route */}
      <Stack.Screen name="index" />
      
      {/* Define other routes if needed */}
      {/* <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
       */}
      {/* Configure the modal */}
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  )
}

const RootLayout = () => {
  return(
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})