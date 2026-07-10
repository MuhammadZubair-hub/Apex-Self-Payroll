import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default function SplashScreen() {
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);
  const glow = useSharedValue(0.12);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease),
    });

    scale.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });

    glow.value = withRepeat(
      withSequence(
        withTiming(0.28, { duration: 1400 }),
        withTiming(0.12, { duration: 1400 }),
      ),
      -1,
      false,
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      {
        scale: 1 + glow.value,
      },
    ],
  }));

  return (
    <AnimatedGradient
      colors={['#004DB8', '#0062E3', '#2D8BFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Animated.View style={[styles.glow, glowStyle]} />

      <Animated.View style={[styles.logoCard, logoStyle]}>
        <Image
          source={require('../assets/Images/ApexLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={logoStyle}>
        <Text style={styles.title}>ESS</Text>

        <Text style={styles.subtitle}>
          Employee Self Service
        </Text>
      </Animated.View>

      <Text style={styles.version}>
        Version 1.0.0
      </Text>
    </AnimatedGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FFFFFF',
  },

  logoCard: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },

  logo: {
    width: 70,
    height: 70,
    tintColor: '#fff', // remove if your logo already has the correct colors
  },

  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.6,
  },

  version: {
    position: 'absolute',
    bottom: 45,
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    letterSpacing: 1,
  },
});