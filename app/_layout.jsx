import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { Provider } from 'react-redux';
import store from '../utils/store'; // Ensure this path is correct

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='second' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}

export default RootLayout

