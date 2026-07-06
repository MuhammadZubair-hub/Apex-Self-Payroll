import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(4),
    marginTop:18
  },
  scrollContent: {
    padding: scale(16),
    flex:1,
    paddingBottom: scale(40),
    justifyContent:'center'
    
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: scale(24),
    marginBottom: scale(20),
    justifyContent:'center'
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 6,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginBottom: scale(12),
    borderWidth:2
  },
  avatarFallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  name: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  designation: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  card: {
    borderRadius: 14,
    paddingHorizontal: scale(16),
    marginBottom: scale(20),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(13),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    flex: 1,
  },
  rowIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
  },
  signOutButton: {
    marginTop: scale(8),
  },
});
