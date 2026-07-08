import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "./Icons";
import ThemeToggle from "./ThemeToggle";
import ConfirmModal from "./ConfirmModal";
import { useThemeContext } from "../theme/ThemeContex";
import { getColors } from "../theme/color/theme";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileData, logout } from "../redux/slices/authSlice";
import { useIsManager } from "../screen/Home/components/AttendanceCalendar/useIsManager";
import { scale, verticalScale } from "../utils/responsive";
import { AppSizes } from "../utils/AppSizes";

const CustomDrawerContent = (props: any) => {
  const { theme, toggleTheme } = useThemeContext();
  const colors = getColors(theme);
//   const router = useRouter();
  const dispatch = useDispatch();
  const profileData = useSelector(getUserProfileData);
  const { isManager } = useIsManager();
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  // console.log(' the profile data is ',profileData);

  const handleLogout = () => setLogoutConfirmVisible(true);
  const cancelLogout = () => setLogoutConfirmVisible(false);
  const confirmLogout = () => {
    setLogoutConfirmVisible(false);
    dispatch(logout());
  };

  const drawerUserName = profileData?.name || 'Naveen Kumar';

  const activeRouteName = props.state.routeNames[props.state.index];
  const isActive = (routeName: string) => activeRouteName === routeName;
  const tintFor = (routeName: string) => (isActive(routeName) ? colors.purple1 : colors.textSecondary);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      {/* Top Header - User Profile Section */}
      <View style={[styles.profileSection, { backgroundColor: colors.primarayheaderColor }]}>
        <View style={styles.profileContent}>
          {profileData?.profileImage ? (
            <Image source={{uri: `https://syi.superyachtinteriors.ae:2001${profileData?.profileImage}` }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.profileImageFallback]}>
              <Text style={styles.profileImageInitial}>{drawerUserName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: '#fff' }]}>
              {drawerUserName}
            </Text>
            <Text style={[styles.userSubText, { color: 'rgba(255,255,255,0.85)' }]}>
              {profileData?.legacyCode || 'EMP2'}
            <Text style={[styles.userSubText, { color: 'rgba(255,255,255,0.85)' }]}>
              {profileData?.role || 'Software Engineer'}
            </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Main Drawer Navigation Items */}
      <View style={styles.navigationSection}>
        <DrawerContentScrollView
          {...props}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Dashboard */}
          <DrawerItem
            label="Dashboard"
            icon={({ size }) => (
              <Icon name="grid" type="Ionicons" size={size} color={tintFor('Home')} />
            )}
            onPress={() => props.navigation.navigate('Home', { screen: 'Home' })}
            focused={isActive('Home')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Attendance */}
          <DrawerItem
            label="Attendance"
            icon={({ size }) => (
              <Icon name="calendar-outline" type="Ionicons" size={size} color={tintFor('attendance')} />
            )}
            onPress={() => props.navigation.navigate('attendance')}
            focused={isActive('attendance')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Leave Request */}
          <DrawerItem
            label="Leave Request"
            icon={({ size }) => (
              <Icon name="document-text-outline" type="Ionicons" size={size} color={tintFor('Leaveapplication')} />
            )}
            onPress={() => props.navigation.navigate('Leaveapplication')}
            focused={isActive('Leaveapplication')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Request Letter */}
          <DrawerItem
            label="Request Letter"
            icon={({ size }) => (
              <Icon name="mail-outline" type="Ionicons" size={size} color={tintFor('requestLetter')} />
            )}
            onPress={() => props.navigation.navigate('requestLetter')}
            focused={isActive('requestLetter')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Leave Calendar - managers only */}
          {isManager && (
            <DrawerItem
              label="Leave Calendar"
              icon={({ size }) => (
                <Icon name="people-outline" type="Ionicons" size={size} color={tintFor('leaveCalendarHistory')} />
              )}
              onPress={() => props.navigation.navigate('leaveCalendarHistory')}
              focused={isActive('leaveCalendarHistory')}
              activeBackgroundColor={colors.lightPurple}
              activeTintColor={colors.purple1}
              inactiveTintColor={colors.textSecondary}
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
            />
          )}

          {/* Profile */}
          <DrawerItem
            label="Profile"
            icon={({ size }) => (
              <Icon name="person-outline" type="Ionicons" size={size} color={tintFor('profile')} />
            )}
            onPress={() => props.navigation.navigate('profile')}
            focused={isActive('profile')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Notifications with Badge */}
          <View style={styles.notificationItemContainer}>
            {/* <DrawerItem
              label="Notifications"
              icon={({ size }) => (
                <Icon name="notifications-outline" type="Ionicons" size={size} color={tintFor('notifications')} />
              )}
              onPress={() => props.navigation.navigate('notifications')}
              focused={isActive('notifications')}
              activeBackgroundColor={colors.lightPurple}
              activeTintColor={colors.purple1}
              inactiveTintColor={colors.textSecondary}
              labelStyle={styles.drawerLabel}
              style={[styles.drawerItem, { flex: 1 }]}
            /> */}
            {/* <View style={styles.redDotBadge} /> */}
          </View>

          {/* Settings */}
          <DrawerItem
            label="Settings"
            icon={({ size }) => (
              <Icon name="settings-outline" type="Ionicons" size={size} color={tintFor('settings')} />
            )}
            onPress={() => props.navigation.navigate('settings')}
            focused={isActive('settings')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          {/* Help & Support */}
          {/* <DrawerItem
            label="Help & Support"
            icon={({ size }) => (
              <Icon name="help-circle-outline" type="Ionicons" size={size} color={tintFor('support')} />
            )}
            onPress={() => props.navigation.navigate('support')}
            focused={isActive('support')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />

          <DrawerItem
            label="About ESS"
            icon={({ size }) => (
              <Icon name="information-circle-outline" type="Ionicons" size={size} color={tintFor('about')} />
            )}
            onPress={() => props.navigation.navigate('about')}
            focused={isActive('about')}
            activeBackgroundColor={colors.lightPurple}
            activeTintColor={colors.purple1}
            inactiveTintColor={colors.textSecondary}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          /> */}

        </DrawerContentScrollView>

        {/* Footer - always pinned to the bottom, regardless of how many nav items are above */}
        <View style={styles.footerSection}>
          <View style={[styles.divider, { backgroundColor: colors.borderColor }]} />

          <View style={styles.themeRow}>
            <View style={styles.themeLeft}>
              <Icon name="sunny-outline" type="Ionicons" size={scale(22)} color={colors.purple1} />
              <Text style={[styles.themeLabelText, { color: colors.textSecondary }]}>Theme</Text>
            </View>
            <ThemeToggle theme={theme} colors={colors} onToggle={toggleTheme} />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderColor }]} />

          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
            <Icon name="log-out-outline" type="Ionicons" size={scale(22)} color={colors.redColor} />
            <Text style={[styles.logoutText, { color: colors.redColor }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmModal
        visible={logoutConfirmVisible}
        colors={colors}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        destructive
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </SafeAreaView>
  );
};

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderTopRightRadius: 60
  },
  // Profile Section - 25%
  profileSection: {
    height: '25%',
    justifyContent: 'center',
    paddingHorizontal: AppSizes.PH_20,
    paddingTop: AppSizes.PV_20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: AppSizes.W_60,
    height: AppSizes.H_60,
    // borderRadius: AppSizes.RADIUS_40,
    borderRadius: AppSizes.RADIUS_40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImageFallback: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageInitial: {
    color: '#fff',
    fontSize: AppSizes.FONT_28,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  userInfo: {
    marginLeft: AppSizes.MH_15,
    flex: 1,
  },
  userName: {
    fontSize: AppSizes.FONT_20,
    // fontWeight: 'bold',
    fontFamily:'PlusJakartaSans-SemiBold',
    marginBottom: verticalScale(4),
  },
  userSubText: {
    fontSize: AppSizes.FONT_14,
    marginBottom: AppSizes.MV_2,
    fontFamily:'PlusJakartaSans-Regular',
  },
  // Navigation Section - 75%
  navigationSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: AppSizes.PV_10,
    paddingHorizontal: AppSizes.PH_10,
  },
  footerSection: {
    paddingBottom: AppSizes.PV_8,
  },
  drawerItem: {
    borderRadius: AppSizes.RADIUS_8,
    marginVertical: AppSizes.MV_2,
  },
  drawerLabel: {
    fontSize: AppSizes.FONT_16,
    marginLeft: AppSizes.MH_10,
    fontFamily:'PlusJakartaSans-SemiBold'
  },
  bottomControls: {
    borderTopWidth: 1,
    paddingHorizontal: AppSizes.PH_20,
    paddingVertical: AppSizes.PV_15,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSizes.MV_15,
  },
  themeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: AppSizes.FONT_16,
    marginLeft: AppSizes.MH_10,
    fontFamily:'PlusJakartaSans-SemiBold'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppSizes.PV_8,
  },
  logoutText: {
    fontSize: AppSizes.FONT_16,
    marginLeft: AppSizes.MH_10,
    fontFamily:'PlusJakartaSans-SemiBold',

  },
  notificationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  redDotBadge: {
    width: scale(8),
    height: verticalScale(8),
    borderRadius: AppSizes.RADIUS_4,
    backgroundColor: '#EA4335',
    position: 'absolute',
    right: scale(32),
    top: '44%',
  },
  divider: {
    height: verticalScale(2),
    marginHorizontal: AppSizes.MH_20,
    marginVertical: verticalScale(14),
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppSizes.PH_24,
    marginVertical: verticalScale(4),
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeLabelText: {
    fontSize: AppSizes.FONT_16,
    marginLeft: AppSizes.MH_10,
    fontFamily:'PlusJakartaSans-SemiBold'
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppSizes.PH_24,
    paddingVertical: AppSizes.PV_12,
  },

});