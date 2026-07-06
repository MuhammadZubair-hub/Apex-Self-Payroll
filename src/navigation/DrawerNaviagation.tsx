import React from 'react'
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNaviagtion from './BottomNaviagtion';
import AttandenceScreen from '../screen/Attandance/AttandenceScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Profile from '../screen/Profile/ProfileScreen';
import SettingsStackNavigator from './SettingsStackNavigator';
import RequestLetterScreen from '../screen/RequestLetter/RequestLetterScreen';

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
                    name="requestLetter"
                    options={{
                        title: 'Request Letter',
                    }}
                    component={RequestLetterScreen}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                    }}
                    component={SettingsStackNavigator}
                />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}

export default DrawerNaviagation