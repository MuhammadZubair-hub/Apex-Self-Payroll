import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

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
    borderRadius: scale(16),
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
    height: verticalScale(72),
    width: scale(72),
    borderRadius: scale(36),
    marginRight: scale(14),
  },
  avatarFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2
  },
  avatarInitial: {

    fontSize: moderateScale(26),
    fontFamily: 'PlusJakartaSans-Bold',
    alignSelf:'center'
  },
  name: {
    fontSize: moderateScale(17),
    fontFamily: 'PlusJakartaSans-Bold',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: AppSizes.PH_10,
    paddingVertical: verticalScale(3),
    borderRadius: AppSizes.RADIUS_10,
    marginVertical: verticalScale(4),
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  designation: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: scale(14),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSizes.GAP_8,
    marginBottom: scale(8),
  },
  contact: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  card: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    borderRadius: scale(16),
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
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: AppSizes.MV_10,
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
    gap: AppSizes.GAP_10,
    flex: 1,
    marginRight: AppSizes.MH_10,
  },
  label: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-SemiBold',
    flex: 1.1,
  },
  value: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    marginRight: scale(8),
    textAlign: 'right',
    // flexWrap:"nowrap",
    flexGrow:1,
    // flexShrink: 1,
    flex:1.9
  },
});
