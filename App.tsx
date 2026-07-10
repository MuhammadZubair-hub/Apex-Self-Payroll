/**
 * ESS App
 *
 * @format
 */

import { StatusBar, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { store, persistor } from './src/redux/store';
import RootNaviagtion from './src/navigation/RootNaviagtion';
import { ActivityTracker } from './src/components/ActivityTracker';
import { useSessionTimeout } from './src/hooks/useTimeSessionOut';
import { useEffect, useState } from 'react';
import SplashScreen from './src/screen/Splasscreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContent />
          </PersistGate>
        </Provider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;



const AppContent = () => {
  // const [loading, setloading] = useState(true);

  // useEffect(() => {
  //   if (loading) {
  //     setTimeout(() => {
  //       setloading(false);
  //     }, 5000)
  //   }
  // }, [])

  // if (loading) {
  //   return <SplashScreen />
  // }

  const { handleUserActivity } = useSessionTimeout();
  return (
    <ActivityTracker
      style={{ flex: 1 }}
      onActivity={handleUserActivity}>

      <NavigationContainer>

        <RootNaviagtion></RootNaviagtion>
      </NavigationContainer>
    </ActivityTracker>
  )
}

