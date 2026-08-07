import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppSizes } from '../../utils/AppSizes';
import { scale, xdHeight } from '../../utils/responsive';
import Icon from '../Icons';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import FocusAwareStatusBar from '../FocusAwareStatusBar';

interface PrimaryHeaderProps {
  headerText: string;
  iconsize?: number;
  profile?: boolean;
  showBackButton?: boolean;
  rightIconName?: string;
  rightIconType?: string;
  rightLabel?: string;
  showDate?: boolean;
  alignTextCenter?: boolean;
  onRightIconPress?: () => void;
}

const PrimaryHeader = ({
  headerText,
  iconsize = AppSizes.ICON_30,
  profile = false,
  showBackButton = false,
  rightIconName,
  rightIconType = 'Ionicons',
  rightLabel,
  showDate = false,
  alignTextCenter = false,
  onRightIconPress,
}: PrimaryHeaderProps) => {
  const navigation = useNavigation<any>();
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  return (
    <>
      <FocusAwareStatusBar backgroundColor={colors.primarayheaderColor} barStyle="light-content" translucent={false} />
      <View
        style={[
          styles.headerMaincontainer,
          {
            backgroundColor: colors.primarayheaderColor,
            height: profile ? xdHeight(162) : xdHeight(100),
            borderBottomLeftRadius: !profile ? AppSizes.RADIUS_30 : 0,
            borderBottomRightRadius: !profile ? AppSizes.RADIUS_30 : 0,
          },
        ]}
      >
        <View style={styles.iconZone}>
          {showBackButton ? (
            <Icon type="Ionicons" name="chevron-back" size={iconsize} color="#fff" onPress={() => navigation.goBack()} />
          ) : (
            <Icon type="Ionicons" name="menu-outline" size={iconsize} color="#fff" onPress={() => navigation.toggleDrawer()} />
          )}
        </View>

        <View style={[styles.titleZone, alignTextCenter ? styles.titleZoneCenter : styles.titleZoneLeft]}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.headerText, { color: '#fff', textAlign: alignTextCenter ? 'center' : 'left' }]}
          >
            {headerText}
          </Text>
          {showDate && (
            <Text
              numberOfLines={1}
              style={[styles.headerText, { color: '#fff', fontSize: AppSizes.FONT_14, textAlign: alignTextCenter ? 'center' : 'left' }]}
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric',year: 'numeric' })}
            </Text>
          )}
        </View>

        <View style={[styles.iconZone, rightLabel && styles.rightPillZone]}>
          {rightIconName && rightLabel ? (
            <TouchableOpacity style={styles.glassPill} onPress={onRightIconPress} activeOpacity={0.75}>
              <Icon type={rightIconType} name={rightIconName} size={AppSizes.ICON_16} color="#fff" />
              <Text style={styles.glassPillText}>{rightLabel}</Text>
            </TouchableOpacity>
          ) : rightIconName ? (
            <Icon type={rightIconType} name={rightIconName} size={AppSizes.ICON_24} color="#fff" onPress={onRightIconPress} />
          ) : null}
        </View>
      </View>
    </>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  headerMaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppSizes.PH_10,
  },
  iconZone: {
    width: scale(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightPillZone: {
    width: undefined,
    alignItems: 'flex-end',
  },
  glassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    borderRadius: AppSizes.RADIUS_20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  glassPillText: {
    color: '#fff',
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  titleZone: {
    flex: 1,
  },
  titleZoneLeft: {
    alignItems: 'flex-start',
    marginLeft: AppSizes.MH_10,
  },
  titleZoneCenter: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: AppSizes.FONT_20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
