import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/Home/HomeScreen';
import DrawerNaviagation from './DrawerNaviagation';

const AppNaviagtor = () => {

    const Stack = createNativeStackNavigator();


    return (
        <DrawerNaviagation></DrawerNaviagation>
    )
}

export default AppNaviagtor

const styles = StyleSheet.create({})