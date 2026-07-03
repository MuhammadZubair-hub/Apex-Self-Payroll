// 
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import Icon from '../../components/Icons';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import { scale } from '../../utils/responsive';

const formatDate = (dateString: any) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';

  return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('en', {
    month: 'short',
  })} ${date.getFullYear()}`;
};

const Profile = () => {
  const userData = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);

  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const data: any = profileData || {};

  const employeeId = data.legacyCode || data.code || 'N/A';
  const fullName = data.name || [data.fName, data.lName].filter(Boolean).join(' ') || userData?.employeeName || 'User';
  const designation = data.designation || 'N/A';
  const department = data.department || 'N/A';
  const companyEmail = data.compEmail || data.email || 'N/A';
  const mobileNo = data.mobileNo || 'N/A';

  const personalFields = [
    { icon: 'id-card-outline', label: 'Employee ID', value: employeeId },
    { icon: 'person-outline', label: 'Full Name', value: fullName },
    { icon: 'calendar-outline', label: 'Date of Birth', value: formatDate(data.dob) },
    { icon: 'male-female-outline', label: 'Gender', value: data.gender || 'N/A' },
    { icon: 'heart-outline', label: 'Marital Status', value: data.maritalStatus || 'N/A' },
    { icon: 'globe-outline', label: 'Nationality', value: data.nationality || 'N/A' },
  ];

  const employmentFields = [
    { icon: 'business-outline', label: 'Department', value: department },
    { icon: 'briefcase-outline', label: 'Designation', value: designation },
    { icon: 'calendar-outline', label: 'Date of Joining', value: formatDate(data.dateOfJoining) },
    { icon: 'time-outline', label: 'Employment Type', value: data.employmentType || 'N/A' },
    { icon: 'person-outline', label: 'Reporting Manager', value: data.reportingManager || data.managerName || 'N/A' },
  ];

  const renderItem = (item: any, index: number, total: number) => (
    <View
      key={index}
      style={[styles.row, { borderBottomColor: colors.borderColor }, index === total - 1 && { borderBottomWidth: 0 }]}
    >
      <View style={styles.rowLeft}>
        <Icon type="Ionicons" name={item.icon} size={18} color={colors.purple1} />
        <Text style={[styles.label, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.label}
        </Text>
      </View>

      <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>
        {item.value}
      </Text>

      <Icon type="Ionicons" name="chevron-forward" size={16} color={colors.textSecondary} />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} />
      <PrimaryHeader headerText="Profile" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scale(24) }}>
        {/* TOP PROFILE CARD */}
        <View style={[styles.profileCard, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={styles.topRow}>
            {data.profileImage ? (
              <Image source={{uri: `https://syi.superyachtinteriors.ae:2001${data?.profileImage}` }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: colors.purple1 }]}>
                <Text style={styles.avatarInitial}>{fullName.charAt(0).toUpperCase()}</Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                {fullName}
              </Text>

              <View style={[styles.badge, { backgroundColor: colors.purple1 }]}>
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
          {personalFields.map((item, index) => renderItem(item, index, personalFields.length))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Employment Information</Text>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          {employmentFields.map((item, index) => renderItem(item, index, employmentFields.length))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: scale(16),
    padding: scale(16),
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 72,
    width: 72,
    borderRadius: 36,
    marginRight: scale(14),
  },
  avatarFallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  name: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  designation: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: scale(14),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: scale(8),
  },
  contact: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  card: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    borderRadius: 16,
    paddingHorizontal: scale(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 10,
    marginHorizontal: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
  },
  value: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginRight: 8,
    textAlign: 'right',
    flexShrink: 1,
  },
});
