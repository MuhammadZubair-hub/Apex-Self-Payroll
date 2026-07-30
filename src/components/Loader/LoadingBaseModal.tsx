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
  interpolate,
  Extrapolation,
  cancelAnimation,
} from 'react-native-reanimated';

import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { scale } from '../../utils/responsive';

interface LoadingModalProps {
  visible: boolean;
  minDurationMs?: number; // animation minimum duration, default 700ms
}

const LoadingBaseModal = ({ visible, minDurationMs = 700 }: LoadingModalProps) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const rotation = useSharedValue(0);
  const scaleAnim = useSharedValue(1);
  const glow = useSharedValue(0.4);

  // Internal visibility state — actual `visible` prop se decouple,
  // taake fast response par bhi animation min duration tak dikhe
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
      // Cancel any ongoing animations and reset shared values before starting loop
      cancelAnimation(rotation);
      cancelAnimation(scaleAnim);
      cancelAnimation(glow);

      rotation.value = 0;
      scaleAnim.value = 1;
      glow.value = 0.4;

      rotation.value = withRepeat(
        withTiming(360, { duration: 2500, easing: Easing.linear }),
        -1,
        false,
      );

      scaleAnim.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      glow.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.4, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else {
      cancelAnimation(rotation);
      cancelAnimation(scaleAnim);
      cancelAnimation(glow);
      rotation.value = 0;
      scaleAnim.value = 1;
      glow.value = 0.4;
    }

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scaleAnim);
      cancelAnimation(glow);
    };
  }, [internalVisible]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scaleAnim.value },
    ],
  }));

  const glowCircleStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      {
        scale: interpolate(glow.value, [0.4, 1], [0.9, 1.2], Extrapolation.CLAMP),
      },
    ],
  }));

  if (!internalVisible) return null;

  return (
    <Modal visible={internalVisible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.whiteGlass,
              borderColor: colors.borderColor,
              shadowColor: colors.blueTint,
            },
          ]}
        >
          <View style={styles.content}>
            <Animated.View
              style={[
                styles.glowCircle,
                { backgroundColor: colors.blueTint },
                glowCircleStyle,
              ]}
            />
            <Animated.View style={logoStyle} renderToHardwareTextureAndroid>
              <Image
                source={require('../../assets/Images/ApexLogo.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(100),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    opacity: 0.5,
  },
  logo: {
    width: scale(60),
    height: scale(60),
  },
});

export default memo(LoadingBaseModal);