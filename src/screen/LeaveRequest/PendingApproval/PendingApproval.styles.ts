import { StyleSheet } from 'react-native';
import { scale } from '../../../utils/responsive';

export const pendingApprovalStyles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: scale(10),
  },
  remarks: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    fontStyle: 'italic',
    marginTop: scale(8),
  },
  actionsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
  },
  actionButton: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
