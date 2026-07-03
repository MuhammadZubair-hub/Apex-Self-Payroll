import { StyleSheet } from 'react-native';
import { scale } from '../../../../../utils/responsive';

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
    width: 32,
  },
  formHeaderTitle: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  formScrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: scale(14),
    marginBottom: scale(20),
  },
  infoBannerTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoBannerSubText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 3,
    lineHeight: 17,
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  formFieldText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  totalDaysBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  attachmentTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attachmentSubText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
});
