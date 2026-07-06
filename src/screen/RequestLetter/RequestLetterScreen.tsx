import React from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import MyButton from '../../components/MyButton';
import { scale } from '../../utils/responsive';
import { requestLetterStyles as styles } from './RequestLetter.styles';
import { useRequestLetter } from './RequestLetter.logic';
import SubjectPickerSheet from './components/SubjectPickerSheet';

const RequestLetterScreen = () => {
  const {
    colors,
    theme,
    subject,
    setSubject,
    body,
    setBody,
    subjectPickerVisible,
    openSubjectPicker,
    closeSubjectPicker,
    submitting,
    handleSubmit,
  } = useRequestLetter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <PrimaryHeader headerText="Request Letter" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.infoBanner, { backgroundColor: colors.lightPurple }]}>
          <Icon type="Ionicons" name="mail-outline" size={20} color={colors.purple1} />
          <View style={{ flex: 1, marginLeft: scale(10) }}>
            <Text style={[styles.infoBannerTitle, { color: colors.textPrimary }]}>Need a letter from HR?</Text>
            <Text style={[styles.infoBannerSubText, { color: colors.textSecondary }]}>
              Pick a subject, review the letter and send it straight to HR.
            </Text>
          </View>
        </View>

        <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Subject</Text>
        <TouchableOpacity
          style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
          onPress={openSubjectPicker}
        >
          <Text style={[styles.formFieldText, { color: subject ? colors.textPrimary : colors.textSecondary }]} numberOfLines={2}>
            {subject || 'Select a subject'}
          </Text>
          <Icon type="Ionicons" name="chevron-down" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Email Body</Text>
        <View style={[styles.bodyBox, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Select a subject to load a starting template, then edit as needed"
            placeholderTextColor={colors.textSecondary}
            style={[styles.bodyInput, { color: colors.textPrimary }]}
            multiline
          />
        </View>

        <MyButton text="Send Request" onPress={handleSubmit} loading={submitting} style={{ backgroundColor: colors.purple1 }} />
      </ScrollView>

      <SubjectPickerSheet visible={subjectPickerVisible} colors={colors} selected={subject} onSelect={setSubject} onClose={closeSubjectPicker} />
    </SafeAreaView>
  );
};

export default RequestLetterScreen;
