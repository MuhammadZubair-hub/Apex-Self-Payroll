import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screen/Home/HomeScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';

const BottomNaviagtion = () => {
  const { theme } = useThemeContext();
    const colors = getColors(theme);

    const Tabs = createBottomTabNavigator()
    

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'index') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    }
                    else if (route.name === 'leaveRequest') {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.purple1,
                tabBarInactiveTintColor: colors.textSecondary,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.secondPrimaryColor,
                    borderTopColor: colors.borderColor,
                },
            })}
        >
            <Tabs.Screen name="Home"  component={Home} options={{ title: 'Home' }} />
            {/* <Tabs.Screen name="search" options={{ title: 'Search' }} /> */}
            <Tabs.Screen name="leaveRequest" component={LeaveRequestScreen} options={{ title: 'LeaveRequest' }} />
            {/* <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} /> */}
        </Tabs.Navigator>
    );
}

export default BottomNaviagtion

const styles = StyleSheet.create({})