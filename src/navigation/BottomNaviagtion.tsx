import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/HomeScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';
import CustomTabBar from './CustomTabBar';

const BottomNaviagtion = () => {
    const Tabs = createBottomTabNavigator()

    return (
        <Tabs.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Tabs.Screen name="leaveRequest" component={LeaveRequestScreen} options={{ title: 'LeaveRequest' }} />
        </Tabs.Navigator>
    );
}

export default BottomNaviagtion