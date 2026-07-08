import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, screenWidth } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: AppSizes.PV_20,
    paddingHorizontal: scale(16),
  },

  // Cards
  card: {
    padding: scale(16),
    borderRadius: scale(14),
    marginBottom: scale(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: verticalScale(12),
  },

  // Today's Attendance
  attendanceStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  statusBadge: {
    paddingHorizontal: AppSizes.PH_12,
    paddingVertical: AppSizes.PV_4,
    borderRadius: AppSizes.RADIUS_20,
  },
  statusText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attendanceTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppSizes.MV_10,
  },
  checkInTime: {
    fontSize: AppSizes.FONT_28,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  iconCircle: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: scale(8),
    height: verticalScale(8),
    borderRadius: AppSizes.RADIUS_4,
    marginRight: scale(8),
  },
  checkInText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
  },

  // Attendance Overview
  viewDetailsText: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(14),
  },
  statColumn: {
    alignItems: 'center',
  },
  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    width: scale(22),
    height: verticalScale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  statNumber: {
    fontSize: AppSizes.FONT_20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  statLabel: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: verticalScale(8),
    borderRadius: AppSizes.RADIUS_4,
    overflow: 'hidden',
  },
  totalDaysText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_10,
  },

  // Leave and Holiday Section
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(12),
  },
  infoCard: {
    flex: 1,
    marginBottom: scale(16),
    maxWidth: '50%',
    borderLeftWidth:3,
  },
  infoIconBox: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: AppSizes.RADIUS_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  infoCardTitle: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: verticalScale(8),
  },
  infoCardChevron: {
    position: 'absolute',
    right: scale(12),
    top: '10%',
  },
  leaveNumber: {
    fontSize: moderateScale(30),
    fontFamily: 'PlusJakartaSans-Bold',
  },
  leaveLabel: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  holidayNameText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: AppSizes.MV_2,
  },

  // Request Letter card
  requestLetterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  requestLetterBody: {
    flex: 1,
  },

  // Quick Actions
  sectionTitle: {
    fontSize: AppSizes.FONT_18,
    fontWeight: '700',
    marginTop: verticalScale(4),
    marginBottom: verticalScale(12),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: AppSizes.MV_20,
  },
  quickActionCard: {
    width: (screenWidth - scale(32) - scale(12)) / 2,
    padding: scale(16),
    borderRadius: AppSizes.RADIUS_12,
    marginBottom: scale(12),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  actionIcon: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: AppSizes.RADIUS_12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  actionLabel: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },

  // Leave Balance Modal
  leaveTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leaveTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  leaveTypeIconBox: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: AppSizes.RADIUS_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveTypeName: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  leaveTypeValue: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: scale(14),
    marginTop: scale(4),
    // borderTopWidth: 1,
  },
});
