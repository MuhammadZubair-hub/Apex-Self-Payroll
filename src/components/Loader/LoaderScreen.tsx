import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { scale } from '../../utils/responsive';

const LoaderScreen = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const ringRotation = useSharedValue(0);
  const logoPulse = useSharedValue(1);

  useEffect(() => {
    ringRotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1,
      false
    );

    logoPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.96, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    return () => {
      cancelAnimation(ringRotation);
      cancelAnimation(logoPulse);
    };
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoPulse.value }],
  }));

  return (
    <View style={[styles.main, { backgroundColor: colors.primaryColor }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.secondPrimaryColor,
            borderColor: colors.borderColor || 'rgba(0, 98, 227, 0.15)',
            shadowColor: colors.purple1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.spinnerRing,
            { borderColor: colors.purple1 + '30', borderTopColor: colors.purple1 },
            ringStyle,
          ]}
        />
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Image
            source={require('../../assets/Images/ApexLogo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(22),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  spinnerRing: {
    position: 'absolute',
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    borderWidth: 3,
  },
  logoContainer: {
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(42),
    height: scale(42),
  },
});
