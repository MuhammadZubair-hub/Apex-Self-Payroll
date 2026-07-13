// // import React from 'react';
// // import { Modal, StyleSheet, Text, View } from 'react-native';
// // import { Fold } from 'react-native-animated-spinkit';
// // import { useThemeContext } from '../../theme/ThemeContex';
// // import { getColors } from '../../theme/color/theme';
// // import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// // import { AppSizes } from '../../utils/AppSizes';


// // interface LoadingModalProps {
// //   visible: boolean;
// //   label?: string;
// // }

// // const LoadingBaseModal = ({ visible = false, label = 'Loading...' }: LoadingModalProps) => {
// //   const { theme } = useThemeContext();
// //   const colors = getColors(theme);

// //   <Image
// //     source={require('../../assets/Images/aepx-logo.png')}
// // />

// //   return (
// //     <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
// //       <View style={styles.overlay}>
// //         <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
// //           <Fold size={verticalScale(44)} color={colors.primarayheaderColor} />
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // export default LoadingBaseModal;

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(15, 23, 42, 0.45)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   card: {
// //     minWidth: scale(140),
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     borderRadius: AppSizes.RADIUS_20,
// //     paddingVertical: scale(28),
// //     paddingHorizontal: scale(32),
// //     elevation: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 14,
// //   },
// //   label: {
// //     marginTop: scale(14),
// //     fontSize: moderateScale(13),
// //     fontFamily: 'PlusJakartaSans-Medium',
// //   },
// // });


// // import React, { useEffect, useRef } from 'react';
// // import {
// //   Modal,
// //   StyleSheet,
// //   View,
// //   Image,
// //   Text,
// // } from 'react-native';

// // import Animated, {
// //   useSharedValue,
// //   useAnimatedStyle,
// //   withRepeat,
// //   withTiming,
// //   withSequence,
// //   Easing,
// //   interpolate,
// //   Extrapolation,
// // } from 'react-native-reanimated';

// // import { useThemeContext } from '../../theme/ThemeContex';
// // import { getColors } from '../../theme/color/theme';

// // import {
// //   moderateScale,
// //   scale,
// //   verticalScale,
// // } from '../../utils/responsive';

// // import { AppSizes } from '../../utils/AppSizes';

// // interface LoadingModalProps {
// //   visible: boolean;
// // }

// // const LoadingBaseModal = ({ visible }: LoadingModalProps) => {
// //   const { theme } = useThemeContext();
// //   const colors = getColors(theme);

// //   const rotation = useSharedValue(0);
// //   const scaleAnim = useSharedValue(1);
// //   const glow = useSharedValue(0.8);
// //   const textDots = useSharedValue(0);
// //   const borderRotateAnim = useSharedValue(0);

// //   const orbit = useSharedValue(0);

// //   useEffect(() => {
// //     if (!visible) return;

// //     rotation.value = withRepeat(
// //       withTiming(360, {
// //         duration: 3500,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //      borderRotateAnim.value = withRepeat(
// //       withTiming(360, {
// //         duration: 2000,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //     orbit.value = withRepeat(
// //       withTiming(360, {
// //         duration: 2500,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //     scaleAnim.value = withRepeat(
// //       withSequence(
// //         withTiming(1.08, {
// //           duration: 900,
// //         }),
// //         withTiming(1, {
// //           duration: 900,
// //         }),
// //       ),
// //       -1,
// //       false,
// //     );

// //     glow.value = withRepeat(
// //       withSequence(
// //         withTiming(1, {
// //           duration: 900,
// //         }),
// //         withTiming(0.4, {
// //           duration: 900,
// //         }),
// //       ),
// //       -1,
// //       false,
// //     );

// //     textDots.value = withRepeat(
// //       withTiming(3, {
// //         duration: 1200,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       true,
// //     );

// //   }, [visible]);

// //   const logoStyle = useAnimatedStyle(() => ({
// //     transform: [
// //       {
// //         rotate: `${rotation.value}deg`,
// //       },
// //       {
// //         scale: scaleAnim.value,
// //       },
// //     ],
// //   }));


// //   const glowStyle = useAnimatedStyle(() => ({

// //     // opacity: glow.value+0.25,
// //     transform: [
// //       {
// //         scale: interpolate(
// //           glow.value,
// //           [0.4, 1],
// //           [1, 1.25],
// //           Extrapolation.CLAMP,
// //         ),
// //       },
// //     ],
// //   }));



// //   return (
// //     <Modal
// //       visible={visible}
// //       transparent
// //       animationType="fade"
// //       statusBarTranslucent>

// //       <Animated.View style={[styles.overlay, glowStyle]}>

// //         <View
// //           style={[
// //             styles.card,
// //             {
// //               backgroundColor: colors.whiteGlass,
// //               borderColor: colors.borderColor,
// //               shadowColor: colors.blueTint
// //             },
// //           ]}>



// //           {/* Rotating Logo */}
// //           <View style={styles.content}>
// //             <Animated.View style={logoStyle}>
// //               <Image
// //                 source={require('../../assets/Images/ApexLogo.png')}
// //                 resizeMode="contain"
// //                 style={styles.logo}
// //               />
// //             </Animated.View>


// //           </View>
// //           {/* Loading */}


// //         </View>

// //       </Animated.View>

// //     </Modal>
// //   );
// // };

// // export default LoadingBaseModal;


// // import React, { useEffect } from 'react';
// // import {
// //   Modal,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// // } from 'react-native';
// // import Animated, {
// //   useSharedValue,
// //   useAnimatedStyle,
// //   withTiming,
// //   withRepeat,
// //   withSequence,
// //   interpolate,
// //   Extrapolation,
// //   Easing,
// // } from 'react-native-reanimated';
// // import { useThemeContext } from '../../theme/ThemeContex';
// // import { getColors } from '../../theme/color/theme';
// // import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// // import { AppSizes } from '../../utils/AppSizes';

// // interface LoadingModalProps {
// //   visible: boolean;
// //   label?: string;
// // }

// // const LoadingBaseModal = ({ visible, label = 'Loading...' }: LoadingModalProps) => {
// //   const { theme } = useThemeContext();
// //   const colors = getColors(theme);

// //   const rotation = useSharedValue(0);
// //   const scaleAnim = useSharedValue(1);
// //   const glow = useSharedValue(0.8);
// //   const textDots = useSharedValue(0);
// //   const borderRotateAnim = useSharedValue(0);
// //   const orbit = useSharedValue(0);
// //   const fadeAnim = useSharedValue(0);

// //   useEffect(() => {
// //     if (!visible) {
// //       fadeAnim.value = 0;
// //       rotation.value = 0;
// //       scaleAnim.value = 1;
// //       glow.value = 0.8;
// //       textDots.value = 0;
// //       borderRotateAnim.value = 0;
// //       orbit.value = 0;
// //       return;
// //     }

// //     // Fade in
// //     fadeAnim.value = withTiming(1, { duration: 400 });

// //     // Logo rotation
// //     rotation.value = withRepeat(
// //       withTiming(360, {
// //         duration: 3500,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //     // Border rotation (activity indicator)
// //     borderRotateAnim.value = withRepeat(
// //       withTiming(360, {
// //         duration: 2000,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //     // Orbit dots rotation
// //     orbit.value = withRepeat(
// //       withTiming(360, {
// //         duration: 2500,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       false,
// //     );

// //     // Breathing scale
// //     scaleAnim.value = withRepeat(
// //       withSequence(
// //         withTiming(1.08, {
// //           duration: 900,
// //         }),
// //         withTiming(1, {
// //           duration: 900,
// //         }),
// //       ),
// //       -1,
// //       false,
// //     );

// //     // Glow pulse
// //     glow.value = withRepeat(
// //       withSequence(
// //         withTiming(1, {
// //           duration: 900,
// //         }),
// //         withTiming(0.4, {
// //           duration: 900,
// //         }),
// //       ),
// //       -1,
// //       false,
// //     );

// //     // Text dots animation
// //     textDots.value = withRepeat(
// //       withTiming(3, {
// //         duration: 1200,
// //         easing: Easing.linear,
// //       }),
// //       -1,
// //       true,
// //     );

// //   }, [visible]);

// //   // Fade animation
// //   const fadeStyle = useAnimatedStyle(() => ({
// //     opacity: fadeAnim.value,
// //   }));

// //   // Logo style with rotation and scale
// //   const logoStyle = useAnimatedStyle(() => ({
// //     transform: [
// //       {
// //         rotate: `${rotation.value}deg`,
// //       },
// //       {
// //         scale: scaleAnim.value,
// //       },
// //     ],
// //   }));

// //   // Glow style
// //   const glowStyle = useAnimatedStyle(() => ({
// //     opacity: glow.value * 0.5,
// //     transform: [
// //       {
// //         scale: interpolate(
// //           glow.value,
// //           [0.4, 1],
// //           [1, 1.25],
// //           Extrapolation.CLAMP,
// //         ),
// //       },
// //     ],
// //   }));

// //   // Border rotation style
// //   const borderStyle = useAnimatedStyle(() => ({
// //     transform: [
// //       {
// //         rotate: `${borderRotateAnim.value}deg`,
// //       },
// //     ],
// //   }));

// //   // Orbit dots styles
// //   const orbit1 = useAnimatedStyle(() => {
// //     const angle = orbit.value;
// //     return {
// //       transform: [
// //         { rotate: `${angle}deg` },
// //         { translateY: -58 },
// //       ],
// //     };
// //   });

// //   const orbit2 = useAnimatedStyle(() => {
// //     const angle = orbit.value + 120;
// //     return {
// //       transform: [
// //         { rotate: `${angle}deg` },
// //         { translateY: -58 },
// //       ],
// //     };
// //   });

// //   const orbit3 = useAnimatedStyle(() => {
// //     const angle = orbit.value + 240;
// //     return {
// //       transform: [
// //         { rotate: `${angle}deg` },
// //         { translateY: -58 },
// //       ],
// //     };
// //   });

// //   // Text dots animation
// //   const animatedText = useAnimatedStyle(() => ({
// //     opacity: interpolate(
// //       textDots.value,
// //       [0, 1, 2, 3],
// //       [0.5, 0.7, 0.9, 1],
// //       Extrapolation.CLAMP,
// //     ),
// //   }));

// //   if (!visible) return null;

// //   return (
// //     <Modal
// //       visible={visible}
// //       transparent
// //       animationType="fade"
// //       statusBarTranslucent>
// //       <Animated.View style={[styles.overlay, fadeStyle]}>
// //         <View
// //           style={[
// //             styles.card,
// //             {
// //               backgroundColor: colors.whiteGlass,
// //               borderColor: colors.borderColor,
// //               shadowColor: colors.blueTint,
// //             },
// //           ]}>

// //           {/* Rotating Border Activity Indicator */}
// //           <View style={styles.borderContainer}>
// //             <Animated.View
// //               style={[
// //                 styles.rotatingBorder,
// //                 {
// //                   borderColor: colors.primarayheaderColor,
// //                 },
// //                 borderStyle,
// //               ]}
// //             />
// //           </View>

// //           {/* Rotating Logo with Effects */}

// //           {/* Animated APEX text with dots */}
// //           <View style={styles.textContainer}>
// //             <Text style={[styles.apexText, { color: colors.textPrimary }]}>
// //               A
// //               <Animated.Text
// //                 style={[
// //                   styles.apexText,
// //                   {
// //                     color: colors.primarayheaderColor,
// //                   },
// //                   animatedText,
// //                 ]}>
// //                 P
// //               </Animated.Text>
// //               EX
// //             </Text>
// //             <View style={styles.dotsRow}>
// //               {[0, 1, 2].map((index) => (
// //                 <Animated.View
// //                   key={index}
// //                   style={[
// //                     styles.textDot,
// //                     {
// //                       backgroundColor: colors.primarayheaderColor,
// //                     },
// //                     animatedText,
// //                   ]}
// //                 />
// //               ))}
// //             </View>
// //           </View>

// //           {label && (
// //             <Text
// //               style={[
// //                 styles.label,
// //                 {
// //                   color: colors.textSecondary,
// //                 },
// //               ]}>
// //               {label}
// //             </Text>
// //           )}
// //         </View>
// //       </Animated.View>
// //     </Modal>
// //   );
// // };

// // export default LoadingBaseModal;

// import React, { useEffect } from 'react';
// import {
//   Modal,
//   StyleSheet,
//   View,
//   Image,
// } from 'react-native';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withRepeat,
//   withTiming,
//   withSequence,
//   Easing,
//   interpolate,
//   Extrapolation,
//   cancelAnimation,
// } from 'react-native-reanimated';

// import { useThemeContext } from '../../theme/ThemeContex';
// import { getColors } from '../../theme/color/theme';
// import { scale } from '../../utils/responsive';

// interface LoadingModalProps {
//   visible: boolean;
// }

// const LoadingBaseModal = ({ visible }: LoadingModalProps) => {
//   const { theme } = useThemeContext();
//   const colors = getColors(theme);

//   const rotation = useSharedValue(0);
//   const scaleAnim = useSharedValue(1);
//   const glow = useSharedValue(0.4);

//   useEffect(() => {
//     if (visible) {
//       rotation.value = withRepeat(
//         withTiming(360, { duration: 3500, easing: Easing.linear }),
//         -1,
//         false,
//       );

//       scaleAnim.value = withRepeat(
//         withSequence(
//           withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
//           withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
//         ),
//         -1,
//         false,
//       );

//       glow.value = withRepeat(
//         withSequence(
//           withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
//           withTiming(0.4, { duration: 900, easing: Easing.inOut(Easing.ease) }),
//         ),
//         -1,
//         false,
//       );
//     } else {
//       // Modal band hote hi animations cancel — background mein waste na hon
//       cancelAnimation(rotation);
//       cancelAnimation(scaleAnim);
//       cancelAnimation(glow);
//     }

//     return () => {
//       cancelAnimation(rotation);
//       cancelAnimation(scaleAnim);
//       cancelAnimation(glow);
//     };
//   }, [visible]);

//   const logoStyle = useAnimatedStyle(() => ({
//     transform: [{ rotate: `${rotation.value}deg` }, { scale: scaleAnim.value }],
//   }));

//   // Glow ab sirf logo ke peeche wale chote circle par — puri screen par nahi
//   const glowCircleStyle = useAnimatedStyle(() => ({
//     opacity: glow.value,
//     transform: [
//       {
//         scale: interpolate(glow.value, [0.4, 1], [0.9, 1.2], Extrapolation.CLAMP),
//       },
//     ],
//   }));

//   if (!visible) return null; // unmount when hidden, saves resources

//   return (
//     <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
//       <View style={styles.overlay}>
//         <View
//           style={[
//             styles.card,
//             {
//               backgroundColor: colors.whiteGlass,
//               borderColor: colors.borderColor,
//               shadowColor: colors.blueTint,
//             },
//           ]}
//         >
//           <View style={styles.content}>
//             <Animated.View
//               style={[
//                 styles.glowCircle,
//                 { backgroundColor: colors.blueTint },
//                 glowCircleStyle,
//               ]}
//             />
//             <Animated.View style={logoStyle}>
//               <Image
//                 source={require('../../assets/Images/ApexLogo.png')}
//                 resizeMode="contain"
//                 style={styles.logo}
//               />
//             </Animated.View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   card: {
//     width: scale(140),
//     height: scale(140),
//     borderRadius: scale(100),
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 6,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   content: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   glowCircle: {
//     position: 'absolute',
//     width: scale(70),
//     height: scale(70),
//     borderRadius: scale(35),
//     opacity: 0.5,
//   },
//   logo: {
//     width: scale(60),
//     height: scale(60),
//   },
// });

// export default LoadingBaseModal;

// // const styles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     // backgroundColor: 'rgba(7, 12, 25, 0)',
// //     backgroundColor: 'rgba(0,0,0,0.18)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingHorizontal: scale(30),
// //   },

// //   card: {
// //     width: scale(140),
// //     height: scale(140),
// //     alignItems: 'center',
// //     justifyContent: 'center',

// //     borderRadius: scale(200),

// //     paddingVertical: verticalScale(10),
// //     paddingHorizontal: scale(25),

// //     borderWidth: 1,

// //     overflow: 'hidden',

// //     shadowColor: '#000',
// //     shadowOpacity: 0.18,
// //     shadowRadius: 18,
// //     shadowOffset: {
// //       width: 0,
// //       height: 10,
// //     },

// //     elevation: 10,
// //   },

// //   glow: {
// //     position: 'absolute',

// //     width: scale(100),
// //     height: scale(100),

// //     borderRadius: 999,

// //     opacity: 0.35,
// //   },
// //   content: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   logo: {
// //     width: scale(68),
// //     height: scale(68),
// //   },

// //   orbitDot: {
// //     width: scale(8),
// //     height: scale(8),
// //     borderRadius: 999,

// //     shadowColor: '#0062e3',
// //     shadowOpacity: 0.8,
// //     shadowRadius: 8,

// //     elevation: 6,
// //   },

// //   brand: {
// //     // marginTop: verticalScale(22),

// //     fontSize: moderateScale(22),

// //     fontWeight: '700',

// //     letterSpacing: 4,
// //   },

// //   loadingRow: {
// //     flexDirection: 'row',

// //     alignItems: 'center',

// //     marginTop: verticalScale(10),
// //   },

// //   loadingText: {
// //     fontSize: moderateScale(14),

// //     fontWeight: '500',

// //     letterSpacing: 0.5,
// //   },

// //   loadingDots: {
// //     fontSize: moderateScale(18),

// //     fontWeight: '700',

// //     marginLeft: 2,
// //   },
// //   textContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: verticalScale(16),
// //     gap: scale(4),
// //   },
// //   apexText: {
// //     fontSize: moderateScale(18),
// //     fontFamily: 'PlusJakartaSans-Bold',
// //     fontWeight: '700',
// //     letterSpacing: 1,
// //   },
// //   dotsRow: {
// //     flexDirection: 'row',
// //     gap: scale(4),
// //     marginLeft: scale(2),
// //   },
// //   textDot: {
// //     width: scale(5),
// //     height: scale(5),
// //     borderRadius: scale(2.5),
// //   },
// //   label: {
// //     marginTop: verticalScale(8),
// //     fontSize: moderateScale(13),
// //     fontFamily: 'PlusJakartaSans-Medium',
// //     fontWeight: '500',
// //     letterSpacing: 0.3,
// //   },
// //   borderContainer: {
// //     // position: 'relative',
// //     // width: scale(10),
// //     // height: verticalScale(10),
// //     justifyContent: 'center',
// //     alignItems: 'center',
    
// //   },
// //   rotatingBorder: {
// //     width: scale(180),
// //     height: verticalScale(180),
// //     borderRadius: scale(90),
// //     borderWidth: 2,
// //     opacity: 0.6,
// //     position: 'absolute',
// //   },

// // });



import React, { useEffect, useRef, useState } from 'react';
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
  minDurationMs?: number; // animation kam se kam kitni der dikhay, default 700ms
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
      // pending hide timer cancel, turant show karo
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
      rotation.value = withRepeat(
        withTiming(360, { duration: 3500, easing: Easing.linear }),
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
    }

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scaleAnim);
      cancelAnimation(glow);
    };
  }, [internalVisible]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scaleAnim.value }],
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
            <Animated.View style={logoStyle}>
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
    // flex:1 ki jaga absoluteFillObject — Android par pehle frame mein
    // parent dimensions na milne ki wajah se top-left flash hoti thi,
    // isse overlay hamesha poori screen cover karega
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

export default LoadingBaseModal;