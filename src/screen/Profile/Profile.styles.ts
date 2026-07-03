import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(24),
  },
  profileCard: {
    margin: scale(16),
    padding: scale(16),
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 72,
    width: 72,
    borderRadius: 36,
    marginRight: scale(14),
  },
  avatarFallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  name: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  designation: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: scale(14),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: scale(8),
  },
  contact: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  card: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    borderRadius: 16,
    paddingHorizontal: scale(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 10,
    marginHorizontal: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    flex: 1,
  },
  value: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginRight: 8,
    textAlign: 'right',
    flexShrink: 1,
  },
});
