import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

// Styles shared by both the Submitted Leave tab and the Pending Approval tab
// (list cards, empty states, remarks input) so they don't get redefined per screen.
export const sharedStyles = StyleSheet.create({
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(100),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: scale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardIconBox: {
    width: scale(42),
    height: verticalScale(42),
    borderRadius: AppSizes.RADIUS_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flex: 1,
    marginLeft: scale(12),
    marginRight: scale(8),
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: scale(8),
  },
  cardDateRange: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: verticalScale(4),
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
    gap: AppSizes.GAP_4,
  },
  cardMetaText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  statusPill: {
    paddingHorizontal: AppSizes.PH_8,
    paddingVertical: verticalScale(3),
    borderRadius: AppSizes.RADIUS_20,
  },
  statusPillText: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyListText: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: verticalScale(12),
  },
  emptyListSubText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(4),
  },

  remarksBox: {
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    padding: scale(14),
    marginBottom: scale(16),
  },
  remarksInput: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: AppSizes.H_80,
    textAlignVertical: 'top',
    padding: scale(0),
  },
  remarksCounter: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'right',
    marginTop: verticalScale(6),
  },
});
