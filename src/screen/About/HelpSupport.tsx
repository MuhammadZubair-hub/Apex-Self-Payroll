import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import { scale } from '../../utils/responsive';
import { helpSupportStyles as styles } from './HelpSupport.styles';
import { useHelpSupport } from './HelpSupport.logic';
import { FAQS } from './helpSupport.constants';
import ContactMethodCard from './components/ContactMethodCard';
import FaqCard from './components/FaqCard';

const HelpSupport = () => {
  const {
    colors,
    expandedIndex,
    toggleFaq,
    issueTitle,
    setIssueTitle,
    issueDescription,
    setIssueDescription,
    sendIssueReport,
    contactMethods,
  } = useHelpSupport();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="Help & Support" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.banner, { backgroundColor: colors.lightPurple }]}>
          <Icon type="Ionicons" name="headset-outline" size={28} color={colors.purple1} />
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

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Report an Issue</Text>
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
            <Icon type="Ionicons" name="paper-plane-outline" size={16} color="#fff" />
            <Text style={styles.sendButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupport;
