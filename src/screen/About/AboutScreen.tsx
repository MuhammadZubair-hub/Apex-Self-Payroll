import React, { useMemo } from 'react';
import { Image, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import { aboutStyles as styles } from './About.styles';
import { APP_NAME, APP_VERSION, FEATURES } from './about.constants';
import { scale } from '../../utils/responsive';

const AboutScreen = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="About ESS" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: colors.secondPrimaryColor }]}>
          <Image
            source={
              theme === 'dark' ? require('../../assets/Images/company-logo-black.png') : require('../../assets/Images/company-logo-white.png')
            }
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appName, { color: colors.textPrimary }]}>{APP_NAME}</Text>
          <View style={[styles.versionBadge, { backgroundColor: colors.lightPurple }]}>
            <Text style={[styles.versionBadgeText, { color: colors.purple1 }]}>Version {APP_VERSION}</Text>
          </View>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Employee Self Service — attendance, leave and profile management in one place.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>What you can do today</Text>
        {FEATURES.map((feature) => (
          <View key={feature.title} style={[styles.featureCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.featureIconBox, { backgroundColor: colors.lightPurple }]}>
              <Icon type="Ionicons" name={feature.icon} size={20} color={colors.purple1} />
            </View>
            <View style={{ flex: 1, marginLeft: scale(12) }}>
              <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>{feature.title}</Text>
              <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
            </View>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>App Information</Text>
        <View style={[styles.infoCard, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={[styles.infoRow, { borderBottomColor: colors.borderColor }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>App Name</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{APP_NAME}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: colors.borderColor }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Version</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{APP_VERSION}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Platform</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
          </View>
        </View>

        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          © {currentYear} {APP_NAME}. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
