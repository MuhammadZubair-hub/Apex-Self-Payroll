import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

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
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginBottom: scale(12),
    padding: scale(14),
    borderRadius: 14,
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
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  summaryLabel: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(24),
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
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
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDayText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
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
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDetailText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  recordRemarks: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 10,
  },
});
