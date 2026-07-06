import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icons';
import MyButton from '../../components/MyButton';
import ThemeToggle from '../../components/ThemeToggle';
import { AppSizes } from '../../utils/AppSizes';
import { settingsStyles as styles } from './Settings.styles';
import { useSettings } from './Settings.logic';
import SettingsRow from './components/SettingsRow';

const SettingsScreen = () => {
  const {
    colors,
    theme,
    toggleTheme,
    fullName,
    designation,
    profileImage,
    goToProfile,
    goToSupport,
    goToAbout,
    handleLogout,
  } = useSettings();

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primaryColor} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <Icon
        type="Ionicons"
        name="menu-outline"
        size={AppSizes.ICON_30}
        color={colors.textPrimary}
        onPress={() => navigation.getParent()?.toggleDrawer()}
        style={{ position: 'absolute', top: 18, left: 20, zIndex: 1 }}
      />

      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileCard]}>
          {profileImage ? (
            <Image source={{ uri: `https://syi.superyachtinteriors.ae:2001${profileImage}` }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: colors.primaryColor, borderColor: colors.purple1 }]}>
              <Text style={[styles.avatarInitial, { color: colors.purple1 }]}>{fullName.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
            {fullName}
          </Text>
          <Text style={[styles.designation, { color: colors.purple1 }]} numberOfLines={1}>
            {designation}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Preferences</Text>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          <SettingsRow
            icon={theme === 'dark' ? 'moon' : 'sunny'}
            label="Dark Mode"
            colors={colors}
            isLast
            rightElement={<ThemeToggle theme={theme} colors={colors} onToggle={toggleTheme} />}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Account</Text>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          <SettingsRow icon="person-outline" label="My Profile" colors={colors} onPress={goToProfile} />
          <SettingsRow icon="help-circle-outline" label="Help & Support" colors={colors} onPress={goToSupport} />
          <SettingsRow icon="information-circle-outline" label="About ESS" colors={colors} onPress={goToAbout} isLast />
        </View>

        <MyButton
          text="Sign Out"
          onPress={handleLogout}
          textColor={colors.redColor}
          style={{ marginTop: 8, backgroundColor: colors.redTint,width:'90%',alignSelf:'center' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
