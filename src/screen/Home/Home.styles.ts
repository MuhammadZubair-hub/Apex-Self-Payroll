import { StyleSheet } from 'react-native';
import { scale, screenWidth } from '../../utils/responsive';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: scale(16),
  },

  // Cards
  card: {
    padding: scale(16),
    borderRadius: 14,
    marginBottom: scale(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
  },

  // Today's Attendance
  attendanceStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attendanceTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkInTime: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  checkInText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  // Attendance Overview
  viewDetailsText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 14,
  },
  statColumn: {
    alignItems: 'center',
  },
  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  totalDaysText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 10,
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
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: 8,
  },
  infoCardChevron: {
    position: 'absolute',
    right: scale(12),
    top: '10%',
  },
  leaveNumber: {
    fontSize: 30,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  leaveLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  holidayNameText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 2,
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
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionCard: {
    width: (screenWidth - scale(32) - scale(12)) / 2,
    padding: scale(16),
    borderRadius: 12,
    marginBottom: scale(12),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
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
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveTypeName: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  leaveTypeValue: {
    fontSize: 14,
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
