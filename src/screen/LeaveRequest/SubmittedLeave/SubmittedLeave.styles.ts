import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

export const submittedLeaveStyles = StyleSheet.create({
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    marginBottom: scale(8),
    gap: scale(10),
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: AppSizes.RADIUS_10,
    borderWidth: 1,
    gap: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    padding: scale(0),
  },
  filterButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: AppSizes.RADIUS_10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterDot: {
    position: 'absolute',
    top: verticalScale(6),
    right: scale(6),
    width: scale(8),
    height: verticalScale(8),
    borderRadius: AppSizes.RADIUS_4,
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(24),
    right: scale(20),
    width: scale(58),
    height: verticalScale(58),
    borderRadius: scale(29),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
