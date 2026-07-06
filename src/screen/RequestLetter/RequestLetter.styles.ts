import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

export const requestLetterStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: scale(40),
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: scale(16),
    marginBottom: scale(20),
  },
  infoBannerTitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  infoBannerSubText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 3,
    lineHeight: 18,
  },
  fieldLabel: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(8),
    marginTop: scale(4),
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  formFieldText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
    marginRight: scale(8),
  },
  bodyBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: scale(14),
    marginBottom: scale(20),
  },
  bodyInput: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: 260,
    textAlignVertical: 'top',
    padding: 0,
  },
  list: {
    maxHeight: 360,
  },
  optionRow: {
    paddingVertical: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
