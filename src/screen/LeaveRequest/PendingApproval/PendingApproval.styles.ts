import { StyleSheet } from 'react-native';
import { scale, moderateScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

export const pendingApprovalStyles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSizes.GAP_4,
    marginTop: scale(10),
  },
  remarks: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    fontStyle: 'italic',
    marginTop: scale(8),
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSizes.GAP_8,
    marginTop: scale(10),
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_8,
    alignSelf: 'flex-start',
  },
  attachmentText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
  },
  actionButton: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: AppSizes.RADIUS_10,
    alignItems: 'center',
  },
  actionText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
