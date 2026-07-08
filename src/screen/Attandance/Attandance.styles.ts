import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const attendanceStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(14),
  },
  monthNavText: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginBottom: scale(12),
    padding: scale(14),
    borderRadius: scale(14),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: AppSizes.FONT_18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  summaryLabel: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(24),
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: scale(10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recordDateBox: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordDateText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDayText: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
  },
  recordBody: {
    flex: 1,
    marginLeft: scale(12),
    marginRight: scale(8),
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: AppSizes.GAP_4,
    paddingHorizontal: AppSizes.PH_10,
    paddingVertical: AppSizes.PV_4,
    borderRadius: AppSizes.RADIUS_20,
  },
  statusPillText: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDetailText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  recordRemarks: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(4),
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_10,
  },
});
