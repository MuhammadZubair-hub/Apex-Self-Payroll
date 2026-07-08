import React from 'react'
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import Home from '../screen/Home/HomeScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';
import { AppSizes } from '../utils/AppSizes';

const BottomNaviagtion = () => {
    const { theme } = useThemeContext();
    const colors = getColors(theme);

    const Tabs = createBottomTabNavigator()


    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
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
                    // position: 'absolute', // Make it float
                    // bottom: 10, // Distance from bottom
                    // left: 20,
                    // right: 20,
                    // backgroundColor: colors.secondPrimaryColor,
                     backgroundColor: colors.whiteGlass, // Semi-transparent
                    borderTopColor: colors.purple1,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderColor: colors.borderColor,
                    borderRadius: AppSizes.RADIUS_20, // Rounded corners
                    height: 70, // Slightly taller for premium look
                    // paddingBottom: 8,
                    // paddingTop: 8,
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 10,
                    // },
                    // shadowOpacity: 0.1,
                    // shadowRadius: 20,
                    // elevation: 10, // For Android
                    marginHorizontal: 10,
                },
            })}
        >
            <Tabs.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Tabs.Screen name="leaveRequest" component={LeaveRequestScreen} options={{ title: 'LeaveRequest' }} />
        </Tabs.Navigator>
    );
}

export default BottomNaviagtion