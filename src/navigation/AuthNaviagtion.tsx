import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/Auth/Login/LoginScreen';

const AuthNaviagtion = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen
                name='Logn'
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNaviagtion

const styles = StyleSheet.create({})