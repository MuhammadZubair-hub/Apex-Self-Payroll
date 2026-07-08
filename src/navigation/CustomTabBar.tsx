import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarHeightCallbackContext, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { AppSizes } from '../utils/AppSizes';
import { scale, verticalScale } from '../utils/responsive';

const ICON_BY_ROUTE: Record<string, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  leaveRequest: { active: 'document-text', inactive: 'document-text-outline' },
};

const LABEL_BY_ROUTE: Record<string, string> = {
  Home: 'Home',
  leaveRequest: 'Leave',
};

// Only the focused tab widens into a colored pill with an icon+label row - every other tab
// stays a compact icon-over-label column. The stock bottom-tabs renderer applies the same
// layout to every item regardless of focus, so this needs a fully custom tab bar.
const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);
  const insets = useSafeAreaInsets();

  const bottomOffset = insets.bottom > 0 ? insets.bottom : AppSizes.PV_10;

  // Reports our real height back to the navigator so useBottomTabBarHeight() - used by screens
  // to pad content above the bar - stays accurate, same as the built-in BottomTabBar does
  // internally. onLayout only measures the bar's own box, not the floating gap below it, so
  // that gap is added on top.
  const onHeightChange = React.useContext(BottomTabBarHeightCallbackContext);
  const handleLayout = (e: any) => onHeightChange?.(e.nativeEvent.layout.height + bottomOffset);

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          backgroundColor: colors.secondPrimaryColor,
          borderColor:colors.purple1,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const icon = ICON_BY_ROUTE[route.name] ?? ICON_BY_ROUTE.Home;
        const label = LABEL_BY_ROUTE[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.item, focused && [styles.itemActive, { backgroundColor: colors.purple1 }]]}
          >
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={AppSizes.ICON_20}
              color={focused ? '#fff' : colors.textSecondary}
            />
            {focused &&
              <Text
                style={focused ? styles.activeLabel : [styles.inactiveLabel, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {label}
              </Text>
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: AppSizes.MH_50,
    right: AppSizes.MH_50,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppSizes.PV_8,
    paddingHorizontal: AppSizes.PH_8,
    borderRadius: AppSizes.RADIUS_30,
    elevation: AppSizes.ELEVATION_10,
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  item: {
    // flexDirection: 'column',
    alignItems: 'center',
  alignSelf:'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.PV_8,
    paddingHorizontal: AppSizes.PH_30,
    borderRadius: AppSizes.RADIUS_25,
  },
  itemActive: {
    flexDirection: 'row',
    gap: scale(6),
    padding: AppSizes.PH_30,
    
    width:'50%'
  },
  activeLabel: {
    color: '#fff',
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  inactiveLabel: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: verticalScale(2),
  },
});

export default CustomTabBar;
