import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppSizes } from '../../utils/AppSizes';
import { scale, xdHeight } from '../../utils/responsive';
import Icon from '../Icons';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';

interface PrimaryHeaderProps {
  headerText: string;
  iconsize?: number;
  profile?: boolean;
  showBackButton?: boolean;
  rightIconName?: string;
  rightIconType?: string;
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
  showDate = false,
  alignTextCenter = false,
  onRightIconPress,
}: PrimaryHeaderProps) => {
  const navigation = useNavigation<any>();
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  return (
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
            {new Date().toISOString().split('T', 1)}
          </Text>
        )}
      </View>

      <View style={styles.iconZone}>
        {rightIconName && (
          <Icon type={rightIconType} name={rightIconName} size={AppSizes.ICON_24} color="#fff" onPress={onRightIconPress} />
        )}
      </View>
    </View>
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
