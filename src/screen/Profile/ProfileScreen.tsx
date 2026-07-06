import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import { profileStyles as styles } from './Profile.styles';
import { useProfile } from './Profile.logic';
import ProfileInfoRow from './components/ProfileInfoRow';
import { AppSizes } from '../../utils/AppSizes';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const {
    colors,
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primaryColor} />
      {/* <PrimaryHeader headerText="Profile" /> */}


      <Icon
        type="Ionicons"
        name="menu-outline"
        size={AppSizes.ICON_30}
        color={colors.textPrimary}
        onPress={() => navigation.toggleDrawer()}
        style={{ position: 'absolute', top: 18, left: 20, zIndex: 1 }}
      />

      <Text
        style={{ alignSelf: 'center', fontSize: AppSizes.FONT_22, color: colors.textPrimary, fontFamily: 'PlusJakartaSans-Bold', marginTop: 18 }}
      >Profile</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileCard, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={styles.topRow}>
            {profileImage ? (
              <Image source={{ uri: `https://syi.superyachtinteriors.ae:2001${profileImage}` }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: colors.primaryColor, borderColor: colors.purple1 }]}>
                <Text style={[styles.avatarInitial, { color: colors.purple1 }]}>{fullName.charAt(0).toUpperCase()}</Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                {fullName}
              </Text>

              <View style={[styles.badge, { backgroundColor: colors.primarayheaderColor }]}>
                <Text style={styles.badgeText}>{employeeId}</Text>
              </View>

              <Text style={[styles.designation, { color: colors.textSecondary }]} numberOfLines={1}>
                {designation}
              </Text>
              <Text style={[styles.designation, { color: colors.textSecondary }]} numberOfLines={1}>
                {department}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderColor }]} />

          <View style={styles.contactRow}>
            <Icon type="Ionicons" name="mail-outline" size={15} color={colors.purple1} />
            <Text style={[styles.contact, { color: colors.textSecondary }]} numberOfLines={1}>
              {companyEmail}
            </Text>
          </View>

          <View style={styles.contactRow}>
            <Icon type="Ionicons" name="call-outline" size={15} color={colors.purple1} />
            <Text style={[styles.contact, { color: colors.textSecondary }]} numberOfLines={1}>
              {mobileNo}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Personal Information</Text>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          {personalFields.map((item, index) => (
            <ProfileInfoRow key={item.label} item={item} colors={colors} isLast={index === personalFields.length - 1} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Employment Information</Text>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          {employmentFields.map((item, index) => (
            <ProfileInfoRow key={item.label} item={item} colors={colors} isLast={index === employmentFields.length - 1} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
