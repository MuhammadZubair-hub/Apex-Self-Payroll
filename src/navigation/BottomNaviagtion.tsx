import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home/HomeScreen';
import LeaveRequestScreen from '../screen/LeaveRequest/LeaveRequestScreen';
import WFHRequestScreen from '../screen/WFHRequest/WFHRequestScreen';
import CustomTabBar from './CustomTabBar';

const Tabs = createBottomTabNavigator();

const BottomNaviagtion = () => {
    return (
        <Tabs.Navigator
            screenOptions={{ headerShown: false, freezeOnBlur: true }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Tabs.Screen name="leaveRequest" component={LeaveRequestScreen} options={{ title: 'LeaveRequest' }} />
            <Tabs.Screen name="wfhRequest" component={WFHRequestScreen} options={{ title: 'WFHRequest' }} />
        </Tabs.Navigator>
    );
}

export default BottomNaviagtion