import { StyleSheet } from 'react-native';
import { scale } from '../../../utils/responsive';

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
    borderRadius: 14,
    padding: scale(14),
    marginBottom: scale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
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
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: 8,
  },
  cardDateRange: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 4,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  cardMetaText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyListText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: 12,
  },
  emptyListSubText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
  },

  remarksBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: scale(14),
    marginBottom: scale(16),
  },
  remarksInput: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 0,
  },
  remarksCounter: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'right',
    marginTop: 6,
  },
});
