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
import ThemeProviderContext from './src/theme/ThemeContex';
// import { store } from './src/store/store';
// import RootNavigator from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProviderContext>
              <NavigationContainer>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <RootNaviagtion></RootNaviagtion>

              </NavigationContainer>
            </ThemeProviderContext>
          </PersistGate>
        </Provider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
