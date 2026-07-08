import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const leaveCalendarHistoryStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    paddingBottom: scale(40),
  },
  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
    borderRadius: AppSizes.RADIUS_12,
    marginBottom: scale(14),
  },
  monthNavText: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(16),
  },
  departmentField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
  },
  departmentText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
    marginRight: scale(6),
  },
  getButton: {
    width: scale(70),
    height: scale(46),
    paddingVertical: verticalScale(0),
  },
  calendarCard: {
    padding: scale(16),
    borderRadius: scale(14),
    marginBottom: scale(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  loadingBox: {
    height: scale(220),
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    gap: scale(16),
    marginTop: scale(14),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  legendDot: {
    width: scale(8),
    height: verticalScale(8),
    borderRadius: AppSizes.RADIUS_4,
  },
  legendText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Bold',
  },
  clearFilterText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  accessDeniedBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  accessDeniedText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    marginTop: scale(12),
  },
});
