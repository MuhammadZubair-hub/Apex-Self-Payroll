import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarHeightCallbackContext, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useThemeContext } from '../theme/ThemeContex';
import { getColors } from '../theme/color/theme';
import { AppSizes } from '../utils/AppSizes';
import { scale } from '../utils/responsive';

const ICON_BY_ROUTE: Record<string, { active: any; inactive: any }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  leaveRequest: { active: 'document-text', inactive: 'document-text-outline' },
};

const LABEL_BY_ROUTE: Record<string, string> = {
  Home: 'Home',
  leaveRequest: 'Leave',
};

// Only the focused tab widens into a colored pill with an icon+label row - every other tab
// stays a compact icon-only touch target. Sizing is content-driven (padding around a fixed
// icon size) rather than percentage-based, so it looks the same across small and large screens.
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
              <Text style={[styles.activeLabel,!focused && {color:colors.textSecondary,}]} numberOfLines={1}>
                {label}
              </Text>
            {/* {focused && (
            )} */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // left: AppSizes.MH_50,
    // right: AppSizes.MH_50,
    left: scale(60),
    right: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppSizes.PV_8,
    paddingHorizontal: AppSizes.PV_8,
    borderRadius: AppSizes.RADIUS_30,
    elevation: AppSizes.ELEVATION_10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.PV_10,
    paddingHorizontal: AppSizes.PH_15,
    borderRadius: AppSizes.RADIUS_25,
    gap: scale(6),
  },
  itemActive: {
    gap: scale(6),
    paddingHorizontal: AppSizes.PH_20,
  },
  activeLabel: {
    color: '#fff',
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  
});

export default CustomTabBar;
