import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../utils/responsive';
import { AppSizes } from '../../../../../utils/AppSizes';

export const newLeaveRequestStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
  },
  formHeaderSide: {
    width: scale(32),
  },
  formHeaderTitle: {
    fontSize: moderateScale(17),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  formScrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: AppSizes.RADIUS_12,
    padding: scale(14),
    marginBottom: scale(20),
  },
  infoBannerTitle: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoBannerSubText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(3),
    lineHeight: moderateScale(17),
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  formFieldText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  totalDaysBox: {
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  attachmentTitle: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attachmentSubText: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
  },
});
