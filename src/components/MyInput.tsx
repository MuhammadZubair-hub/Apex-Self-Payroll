import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scale, verticalScale } from '../utils/responsive';
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { AppSizes } from '../utils/AppSizes';
import Icon from './Icons';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (t: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  iconType?: string;
  iconName?: string;
  secure?: boolean;
  keyboardType?: any;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  label?: string;
  editable?: boolean
}

const MyInput = ({
  value,
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  iconType,
  iconName,
  secure = false,
  editable = true,
  keyboardType,
  rightComponent,
  containerStyle,
  label,
}: Props) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focusAnim.value ? 1.01 : 1, { duration: 180 }) }],
  }));

  return (
    <View>
      {label ?
      <Text style={{color: colors.textPrimary,marginBottom:verticalScale(8),fontSize:AppSizes.FONT_14,fontFamily:'PlusJakartaSans-Bold'}}>{label}</Text> : null}

      <Animated.View
        style={[
          styles.container,
          {
            borderColor: isFocused ? colors.primarayheaderColor : colors.borderColor,
            borderWidth: isFocused ? 1.5 : 1,
            backgroundColor: colors.secondPrimaryColor,
          },
          containerStyle,
          animatedContainerStyle,
        ]}
      >
        {iconName && (
          <Icon
            type={iconType}
            name={iconName}
            size={scale(20)}
            color={colors.purple1}
          />
        )}

        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocused(true);
            focusAnim.value = 1;
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            focusAnim.value = 0;
            onBlur?.();
          }}
          secureTextEntry={secure}
          editable={editable}
          keyboardType={keyboardType}
          style={[styles.input, { color: colors.textPrimary }]}
        />

        {rightComponent}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: AppSizes.PH_10,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: AppSizes.MV_10,
    fontSize: AppSizes.FONT_14,
    fontFamily:'PlusJakartaSans-Regular',
    paddingVertical: verticalScale(14),
  },
});

export default MyInput;
