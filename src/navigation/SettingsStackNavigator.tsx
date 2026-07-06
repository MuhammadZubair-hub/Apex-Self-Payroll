import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screen/Settings/SettingsScreen';
import AboutScreen from '../screen/About/AboutScreen';
import HelpSupport from '../screen/About/HelpSupport';

const Stack = createNativeStackNavigator();

// Settings, About and Help & Support live in their own stack (nested under the Drawer's
// "settings" screen) so moving between them uses normal push/back navigation instead of
// jumping between unrelated top-level drawer screens.
const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsHome" component={SettingsScreen} />
    <Stack.Screen name="about" component={AboutScreen} />
    <Stack.Screen name="support" component={HelpSupport} />
  </Stack.Navigator>
);

export default SettingsStackNavigator;
