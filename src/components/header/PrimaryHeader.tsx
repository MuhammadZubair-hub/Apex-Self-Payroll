import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppSizes } from '../../utils/AppSizes';
// import { useTheme } from '../../theme/ThemeContex';
// import { useThemeContext } from '@/src/theme/ThemeContex';
// import { getColors } from '@/src/theme/color/theme';
import { xdHeight } from '../../utils/responsive';
import Icon from '../Icons';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';

interface PrimaryHeaderProps {
  headerText: string;
  iconsize?: number;
  profile?: boolean;
  notifications?: boolean;
  showBackButton?: boolean;
  rightIconName?: string;
  rightIconType?: string;
  onRightIconPress?: () => void;
}

const PrimaryHeader = ({
  headerText,
  iconsize = AppSizes.ICON_30,
  profile = false,
  notifications = false,
  showBackButton = false,
  rightIconName,
  rightIconType = 'Ionicons',
  onRightIconPress,
}: PrimaryHeaderProps) => {
  const navigation = useNavigation();
  const { theme, toggleTheme, } = useThemeContext();
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
      {/* Left icon */}
      <View style={styles.sideContainer}>
        {showBackButton ? (
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={iconsize}
            color="#fff"
            onPress={() => navigation.goBack()}
            style={{ top: 2 }}
          />
        ) : (
          <Icon
            type="Ionicons"
            name="menu-outline"
            size={iconsize}
            color="#fff"
            onPress={() => navigation.toggleDrawer()}
          />
        )}
           <View style={styles.centerContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.headerText,
            {
              color: '#fff',
            },
          ]}
        >
          {headerText}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.headerText,
            {
              color: '#fff',
              fontSize:14,
            },
          ]}
        >
          {new Date().toISOString().split('T',1)}
        </Text>
      </View>
      </View>

      {/* Center title */}
   

      {/* Right icons */}
      <View style={[styles.sideContainer, { justifyContent: 'flex-end' }]}>
        {rightIconName && (
          <Icon
            type={rightIconType}
            name={rightIconName}
            size={AppSizes.ICON_24}
            color="#fff"
            onPress={onRightIconPress}
          />
        )}
        {!notifications && (
          <>
            {!profile && (
              // <View style={styles.profileContainer}>
              //   <Icon
              //     type="Ionicons"
              //     name="notifications"
              //     size={xdHeight(24)}
              //     color={colors.buttonText}
              //     onPress={() => navigation.navigate('Notification')}
              //   />
              //   <View
              //     style={[
              //       styles.editIcon,
              //       {
              //         backgroundColor: colors.secondary,
              //         borderColor: colors.primaryDark,
              //         borderWidth: 1,
              //       },
              //     ]}
              //   />
              // </View>
              null
            )}
          </>
        )}
        {/* <Icon
          type="Ionicons"
          name={theme == 'dark' ? 'sunny' : 'moon'}
          size={profile ? xdHeight(28) : xdHeight(24)}
          color={colors.buttonText}
          onPress={toggleTheme}
        /> */}
      </View>
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  headerMaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppSizes.PH_10,
    // position:'relative'
  },
  sideContainer: {
    // width: '40%', // reserve equal space on both sides for icons
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    // width: '60%', // center area remains balanced
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft:30
  },
  headerText: {
    // textAlign: 'center',
    alignSelf:'flex-start',
    // fontFamily: Fonts.Bold,
    fontSize: AppSizes.FONT_20,
    // fontWeight: '600',
    fontFamily:'PlusJakartaSans-Bold'
  },
  profileContainer: {
    position: 'relative',
    padding: 10,
    marginRight: 5,
    alignItems: 'center',
    borderRadius: AppSizes.RADIUS_60,
  },
  editIcon: {
    position: 'absolute',
    top: AppSizes.GAP_8,
    right: AppSizes.GAP_4,
    borderRadius: AppSizes.RADIUS_30,
    padding: AppSizes.PH_5,
    zIndex: 999,
  },
});
