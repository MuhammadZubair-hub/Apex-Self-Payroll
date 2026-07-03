import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

export const leaveRequestStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionSwitcher: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  sectionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: scale(10),
    borderRadius: 9,
  },
  sectionButtonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  sectionBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
