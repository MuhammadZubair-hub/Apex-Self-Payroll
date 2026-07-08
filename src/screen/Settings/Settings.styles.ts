import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: AppSizes.FONT_22,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(4),
    marginTop: verticalScale(18)
  },
  scrollContent: {
    padding: scale(16),
    flex:1,
    paddingBottom: scale(40),
    justifyContent:'center'

  },
  profileCard: {
    alignItems: 'center',
    borderRadius: scale(16),
    paddingVertical: scale(24),
    marginBottom: scale(20),
    justifyContent:'center',
    elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 6,
  },
  avatar: {
    width: scale(65),
    height: verticalScale(65),
    borderRadius: scale(50),
    marginBottom: scale(12),
    borderWidth:2,
   
  },
  avatarFallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: AppSizes.FONT_28,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign:'center'
  },
  name: {
    fontSize: moderateScale(17),
    fontFamily: 'PlusJakartaSans-Bold',
  },
  designation: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: verticalScale(3),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  card: {
    borderRadius: scale(14),
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
    width: scale(44),
    height: verticalScale(44),
    borderRadius: AppSizes.RADIUS_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
  },
  signOutButton: {
    marginTop: scale(8),
  },
});
