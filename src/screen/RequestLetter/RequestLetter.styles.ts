import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

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
    borderRadius: scale(14),
    padding: scale(16),
    marginBottom: scale(20),
  },
  infoBannerTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Medium',
  },
  infoBannerSubText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(3),
    lineHeight: moderateScale(18),
  },
  fieldLabel: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(8),
    marginTop: scale(4),
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  formFieldText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
    marginRight: scale(8),
  },
  bodyBox: {
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    padding: scale(14),
    marginBottom: scale(20),
  },
  bodyInput: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: verticalScale(260),
    textAlignVertical: 'top',
    padding: 0,
  },
  list: {
    maxHeight: verticalScale(360),
  },
  optionRow: {
    paddingVertical: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     paddingHorizontal: scale(10)
  },
  optionText: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: scale(8),
  },
  optionTextSelected: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
