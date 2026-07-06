import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import { APP_NAME } from './About/about.constants';

// Brand colors hardcoded here (not pulled from the theme) since this renders in App.tsx
// before ThemeProviderContext mounts.
const BRAND_BLUE = '#0062e3';

const SplashScreen = () => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoAnim, textAnim]);

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={BRAND_BLUE}/>
      <Animated.View
        style={[
          styles.logoCard,
          {
            opacity: logoAnim,
            transform: [{ scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }],
          },
        ]}
      >
        <Image source={require('../assets/Images/ApexLogo.png')} style={styles.logo} resizeMode="contain" />
      </Animated.View>

      <Animated.View
        style={{
          opacity: textAnim,
          transform: [{ translateY: textAnim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
        }}
      >
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Employee Self Service</Text>
      </Animated.View>

      <View style={styles.loaderContainer}>
        <Fold size={34} color={BRAND_BLUE} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
  logo: {
    width: 78,
    height: 78,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 64,
    alignSelf: 'center',
  },
});

export default SplashScreen;
