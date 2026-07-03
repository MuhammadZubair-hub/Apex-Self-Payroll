import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from 'react-native';
// import Icon from "../utils/Icons";
// import { useTheme } from "../theme/ThemeContext";
import { scale, verticalScale } from '../utils/responsive';
// import { useTheme } from '../theme/ThemeContex';
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { AppSizes } from '../utils/AppSizes';
import Icon from './Icons';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (t: string) => void;
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

  return (
    <View>
      {label ? 
      <Text style={{color: colors.textPrimary,marginBottom:verticalScale(8),fontSize:AppSizes.FONT_14,fontFamily:'PlusJakartaSans-Bold'}}>{label}</Text> : null}

      <View
        style={[
          styles.container,
          {
            borderColor: colors.borderColor,
            backgroundColor: colors.secondPrimaryColor,
          },
          containerStyle,
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
          onBlur={onBlur}
          secureTextEntry={secure}
          editable={editable}
          keyboardType={keyboardType}
          style={[styles.input, { color: colors.textPrimary }]}
        />

        {rightComponent}
      </View>
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
    paddingVertical: 6,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: AppSizes.MV_10,
    fontSize: AppSizes.FONT_14,
    fontFamily:'PlusJakartaSans-Regular'
  },
});

export default MyInput;
