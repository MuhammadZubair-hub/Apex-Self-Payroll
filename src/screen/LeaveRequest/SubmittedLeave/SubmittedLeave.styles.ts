import { StyleSheet } from 'react-native';
import { scale } from '../../../utils/responsive';

export const submittedLeaveStyles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: 10,
    borderWidth: 1,
    gap: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    padding: 0,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(14),
    marginBottom: scale(6),
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: scale(8),
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  tabIndicator: {
    height: 2,
    width: '100%',
    borderRadius: 1,
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
