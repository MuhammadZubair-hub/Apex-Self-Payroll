import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const leaveRequestStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionSwitcher: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    padding: AppSizes.PH_4,
    borderRadius: AppSizes.RADIUS_12,
    gap: AppSizes.GAP_4,
  },
  sectionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: scale(10),
    borderRadius: scale(9),
  },
  sectionButtonText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  sectionBadge: {
    minWidth: scale(18),
    height: verticalScale(18),
    borderRadius: scale(9),
    paddingHorizontal: AppSizes.PH_4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
