import React, { useEffect, useRef, useState, memo } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Image,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { scale } from '../../utils/responsive';

interface LoadingModalProps {
  visible: boolean;
  minDurationMs?: number;
}

const LoadingBaseModal = ({ visible, minDurationMs = 600 }: LoadingModalProps) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const ringRotation = useSharedValue(0);
  const logoPulse = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  const [internalVisible, setInternalVisible] = useState(visible);
  const shownAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      shownAtRef.current = Date.now();
      setInternalVisible(true);
    } else {
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : minDurationMs;
      const remaining = Math.max(minDurationMs - elapsed, 0);

      hideTimerRef.current = setTimeout(() => {
        setInternalVisible(false);
        shownAtRef.current = null;
      }, remaining);
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [visible, minDurationMs]);

  useEffect(() => {
    if (internalVisible) {
      cancelAnimation(ringRotation);
      cancelAnimation(logoPulse);
      cancelAnimation(glowOpacity);

      ringRotation.value = 0;
      logoPulse.value = 1;
      glowOpacity.value = 0.3;

      // Smooth 360 ring rotation
      ringRotation.value = withRepeat(
        withTiming(360, { duration: 1200, easing: Easing.linear }),
        -1,
        false,
      );

      // Gentle breathing pulse for central logo
      logoPulse.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.96, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );

      // Soft glow pulse
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
    } else {
      cancelAnimation(ringRotation);
      cancelAnimation(logoPulse);
      cancelAnimation(glowOpacity);
    }

    return () => {
      cancelAnimation(ringRotation);
      cancelAnimation(logoPulse);
      cancelAnimation(glowOpacity);
    };
  }, [internalVisible]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ringRotation.value}deg` }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoPulse.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  if (!internalVisible) return null;

  return (
    <Modal visible={internalVisible} transparent animationType="fade" statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.overlay}>
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
          {/* Outer Ring Ambient Glow */}
          <Animated.View
            style={[
              styles.glowBg,
              { backgroundColor: colors.purple1 + '20' },
              glowStyle,
            ]}
          />

          {/* Rotating Loader Spinner Ring */}
          <Animated.View style={[styles.spinnerRing, { borderColor: colors.purple1 + '30', borderTopColor: colors.purple1 }, ringStyle]} />

          {/* Central Upright Breathing Logo */}
          <Animated.View style={[styles.logoContainer, logoStyle]}>
            <Image
              source={require('../../assets/Images/ApexLogo.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
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
  glowBg: {
    position: 'absolute',
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
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

export default memo(LoadingBaseModal);