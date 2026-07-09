import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import { scale, verticalScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';
import { helpSupportStyles as styles } from './HelpSupport.styles';
import { useHelpSupport } from './HelpSupport.logic';
import { FAQS } from './helpSupport.constants';
import ContactMethodCard from './components/ContactMethodCard';
import FaqCard from './components/FaqCard';
import LinearGradient from 'react-native-linear-gradient';
import { premiumStyles } from '../Profile/ProfileScreen';
import { useNavigation } from '@react-navigation/native';

const HelpSupport = () => {
  const {
    theme,
    colors,
    expandedIndex,
    toggleFaq,
    contactMethods,
  } = useHelpSupport();

  const isDark = theme === 'dark';

  const BACKGROUND_HEIGHT = Dimensions.get('window').height * 0.38;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryColor }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Background Pattern */}
      <ImageBackground
        source={require('../../assets/Images/bgt.png')}
        resizeMode="cover"
        style={{ opacity: 0.3, position: 'absolute', top: 0, left: 0, right: 0, height: BACKGROUND_HEIGHT }}
      >
        {/* Premium Smooth Gradient Blend */}
        <LinearGradient
          colors={['rgba(230, 240, 254, 0.2)', 'rgba(230, 240, 254, 0.6)', colors.primaryColor]}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>
      <SafeAreaView
        style={{ flex: 1 }} edges={['top', 'left', 'right']}
      >

        <View style={premiumStyles.headerContainer}>
          <Icon
            type="Ionicons"
            name="arrow-back"
            size={AppSizes.ICON_30}
            color={colors.textPrimary}
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: colors.secondPrimaryColor,
              padding: AppSizes.PV_4,
              borderRadius: AppSizes.RADIUS_15,
              shadowColor: '#0062e3',
              elevation: 5,
            }}
          />
          <Text style={[premiumStyles.premiumHeaderTitle, { color: colors.textPrimary }]}>Help & Support</Text>
          {/* Layout balancer */}
          <View style={{ width: AppSizes.ICON_30 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.banner, { backgroundColor: colors.lightPurple }]}>
            <Icon type="Ionicons" name="headset-outline" size={verticalScale(28)} color={colors.purple1} />
            <View style={{ flex: 1, marginLeft: scale(12) }}>
              <Text style={[styles.bannerTitle, { color: colors.textPrimary }]}>Need a hand?</Text>
              <Text style={[styles.bannerText, { color: colors.textSecondary }]}>
                Browse the FAQs below or reach out to HR directly.
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Contact Support</Text>
          {contactMethods.map((method) => (
            <ContactMethodCard key={method.key} method={method} colors={colors} />
          ))}

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
          {FAQS.map((faq, index) => (
            <FaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              expanded={expandedIndex === index}
              colors={colors}
              onPress={() => toggleFaq(index)}
            />
          ))}

          {/* <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Report an Issue</Text>
        <View style={[styles.reportCard, { backgroundColor: colors.secondPrimaryColor }]}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Title</Text>
          <TextInput
            value={issueTitle}
            onChangeText={setIssueTitle}
            placeholder="Brief summary of the issue"
            placeholderTextColor={colors.textSecondary}
            style={[styles.textInput, { borderColor: colors.borderColor, color: colors.textPrimary, backgroundColor: colors.primaryColor }]}
            maxLength={100}
          />

          <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: scale(12) }]}>Description</Text>
          <TextInput
            value={issueDescription}
            onChangeText={setIssueDescription}
            placeholder="What happened? Steps to reproduce help us fix it faster."
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.textInput,
              styles.textArea,
              { borderColor: colors.borderColor, color: colors.textPrimary, backgroundColor: colors.primaryColor },
            ]}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.purple1 }]} onPress={sendIssueReport}>
            <Icon type="Ionicons" name="paper-plane-outline" size={AppSizes.ICON_16} color="#fff" />
            <Text style={styles.sendButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HelpSupport;
