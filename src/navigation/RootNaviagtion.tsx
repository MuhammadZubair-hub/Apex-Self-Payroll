import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../redux/slices/authSlice'
import AppNaviagtor from './AppNaviagtor'
import AuthNaviagtion from './AuthNaviagtion'

const RootNaviagtion = () => {

    const user = useSelector(getUser);

    return (
        <>
            {user ? <AppNaviagtor /> : <AuthNaviagtion />}
        </>
    )
}

export default RootNaviagtion

const styles = StyleSheet.create({})