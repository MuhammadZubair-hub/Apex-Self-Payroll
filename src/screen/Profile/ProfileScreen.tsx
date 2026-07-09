import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../components/Icons';
import { useProfile } from './Profile.logic';
import ProfileInfoRow from './components/ProfileInfoRow';
import { AppSizes } from '../../utils/AppSizes';
import { scale, verticalScale } from '../../utils/responsive';

const ProfileScreen = () => {
  const {
    colors,
    theme,
    fullName,
    employeeId,
    designation,
    department,
    companyEmail,
    mobileNo,
    profileImage,
    personalFields,
    employmentFields,
  } = useProfile();

  const navigation = useNavigation<any>();
  const BACKGROUND_HEIGHT = Dimensions.get('window').height * 0.38;

  // Same premium styling as SettingsScreen - keep the two in sync if this look changes.
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 98, 227, 0.06)';
  const sectionTitleColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryColor }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Background Pattern */}
      <ImageBackground
        source={require('../../assets/Images/bgt.png')}
        resizeMode="cover"

        style={{
          opacity: 0.3, position: 'absolute', top: 0, left: 0, right: 0, height: BACKGROUND_HEIGHT
        }}
      >
        {/* Premium Smooth Gradient Blend */}
        <LinearGradient
          colors={['rgba(230, 240, 254, 0.2)', 'rgba(230, 240, 254, 0.6)', colors.primaryColor]}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {/* Header Navigation Menu */}


        <View style={premiumStyles.headerContainer}>
          <Icon
            type="Ionicons"
            name="menu-outline"
            size={AppSizes.ICON_30}
            color={colors.textPrimary}
            onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: colors.secondPrimaryColor,
              padding: AppSizes.PV_4,
              borderRadius: AppSizes.RADIUS_4,
              shadowColor: '#0062e3',
              elevation: 5,
            }}
          />
          <Text style={[premiumStyles.premiumHeaderTitle, { color: colors.textPrimary }]}>Profile</Text>
          {/* Layout balancer */}
          <View style={{ width: AppSizes.ICON_30 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}

        // contentContainerStyle={premiumStyles.scrollContent}
        >



          <View style={premiumStyles.scrollContent}>

            {/* Profile Card with Premium Glassmorphism Look */}
            <View style={[premiumStyles.premiumCard, { backgroundColor: cardBg, borderColor: cardBorder, marginTop: verticalScale(10) }]}>
              <View style={premiumStyles.topRow}>
                <View style={premiumStyles.avatarContainer}>
                  {profileImage ? (
                    <Image source={{ uri: `https://syi.superyachtinteriors.ae:2001${profileImage}` }} style={premiumStyles.premiumAvatar} />
                  ) : (
                    <View style={[premiumStyles.premiumAvatar, { backgroundColor: '#0062e3' }]}>
                      <Text style={premiumStyles.avatarInitial}>{fullName.charAt(0).toUpperCase()}</Text>
                    </View>
                  )}
                </View>

                <View style={premiumStyles.infoColumn}>
                  <Text style={[premiumStyles.premiumName, { color: colors.textPrimary }]} numberOfLines={1}>
                    {fullName}
                  </Text>

                  <View style={[premiumStyles.badge, { backgroundColor: colors.primarayheaderColor }]}>
                    <Text style={premiumStyles.badgeText}>{employeeId}</Text>
                  </View>

                  <Text style={premiumStyles.premiumDesignation} numberOfLines={1}>
                    {designation}
                  </Text>
                </View>
              </View>

              <View style={[premiumStyles.divider, { backgroundColor: cardBorder }]} />

              <View style={premiumStyles.contactRow}>
                <Icon type="Ionicons" name="mail-outline" size={verticalScale(15)} color={colors.purple1} />
                <Text style={[premiumStyles.contactText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {companyEmail}
                </Text>
              </View>

              <View style={premiumStyles.contactRow}>
                <Icon type="Ionicons" name="call-outline" size={verticalScale(15)} color={colors.purple1} />
                <Text style={[premiumStyles.contactText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {mobileNo}
                </Text>
              </View>
            </View>

            {/* Personal Information Section */}
            <Text style={[premiumStyles.premiumSectionTitle, { color: colors.textPrimary }]}>PERSONAL INFORMATION</Text>
            <View style={[premiumStyles.premiumCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              {personalFields.map((item, index) => (
                <ProfileInfoRow key={item.label} item={item} colors={colors} isLast={index === personalFields.length - 1} />
              ))}
            </View>

            {/* Employment Information Section */}
            <Text style={[premiumStyles.premiumSectionTitle, { color: colors.textPrimary }]}>EMPLOYMENT INFORMATION</Text>
            <View style={[premiumStyles.premiumCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              {employmentFields.map((item, index) => (
                <ProfileInfoRow key={item.label} item={item} colors={colors} isLast={index === employmentFields.length - 1} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;

// Premium UI Styling Layer - mirrors SettingsScreen's premiumStyles
export const premiumStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    height: verticalScale(50),
    marginVertical: verticalScale(16),
  },
  premiumHeaderTitle: {
    fontSize: scale(19),
    fontFamily: 'PlusJakartaSans-Bold',
    letterSpacing: 0.3,
  },
  scrollContent: {

    // paddingTop: verticalScale(16),
    paddingBottom: verticalScale(30),
    paddingHorizontal: verticalScale(15),
  },
  premiumCard: {
    borderRadius: scale(24),
    padding: scale(20),
    borderWidth: 1,
    marginBottom: verticalScale(18),
    shadowColor: '#0062e3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    opacity: 0.89,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(14),
  },
  infoColumn: {
    flex: 1,
  },
  avatarContainer: {
    shadowColor: '#0062e3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // elevation: 5,
  },
  premiumAvatar: {
    width: scale(75),
    height: scale(75),
    borderRadius: scale(37.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarInitial: {
    fontSize: scale(28),
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#ffffff',
  },
  premiumName: {
    fontSize: scale(18),
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: AppSizes.PH_10,
    paddingVertical: verticalScale(3),
    borderRadius: AppSizes.RADIUS_10,
    marginTop: verticalScale(6),
  },
  badgeText: {
    color: '#ffffff',
    fontSize: scale(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  premiumDesignation: {
    fontSize: scale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#0062e3',
    textAlign: 'left',
    marginTop: verticalScale(4),
    letterSpacing: 0.4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: scale(14),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: scale(8),
    marginBottom: scale(8),
  },
  contactText: {
    fontSize: scale(13),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  premiumSectionTitle: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    // letterSpacing: 1.2,
    marginBottom: verticalScale(10),
    marginLeft: scale(6),
  },
});
