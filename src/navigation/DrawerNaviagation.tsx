import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNaviagtion from './BottomNaviagtion';
import AttandenceScreen from '../screen/Attandance/AttandenceScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';
import HelpSupport from '../screen/About/HelpSupport';
import AboutScreen from '../screen/About/AboutScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Profile from '../screen/Profile/ProfileScreen';

const DrawerNaviagation = () => {
    const { theme } = useThemeContext();
    const colors = getColors(theme);

    const Drawer = createDrawerNavigator();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    headerStyle: { backgroundColor: colors.purple1 },
                    headerTintColor: colors.secondPrimaryColor,
                    // drawerActiveTintColor: colors.purple1,
                    // drawerInactiveTintColor: colors.text,
                    drawerStyle: {
                        width: '70%',
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    options={{
                        title: 'Dashboard',
                    }}
                    component={BottomNaviagtion}
                />
                <Drawer.Screen
                    name="attendance"
                    options={{
                        title: 'Attendance',
                    }}
                    component={AttandenceScreen}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        title: 'My Profile',
                    }}
                    component={Profile}
                />
                <Drawer.Screen
                    name="Leaveapplication"
                    options={{
                        title: 'Leave Request',
                    }}
                    component={LeaveRequestScreen}
                />
                <Drawer.Screen
                    name="support"
                    options={{
                        title: 'Help & Support',
                    }}
                    component={HelpSupport}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        title: 'About ESS',
                    }}
                    component={AboutScreen}
                />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}

export default DrawerNaviagation

const styles = StyleSheet.create({})