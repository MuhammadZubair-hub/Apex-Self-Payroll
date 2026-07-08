import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

export const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: AppSizes.FONT_22,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(4),
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: scale(40),
  },
  heroCard: {
    alignItems: 'center',
    borderRadius: scale(16),
    paddingVertical: scale(28),
    paddingHorizontal: scale(20),
    marginBottom: scale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  logo: {
    width: scale(180),
    height: scale(44),
    marginBottom: scale(12),
  },
  appName: {
    fontSize: AppSizes.FONT_22,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  versionBadge: {
    marginTop: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    borderRadius: AppSizes.RADIUS_20,
  },
  versionBadgeText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  tagline: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    marginTop: scale(12),
    lineHeight: AppSizes.LH_20,
  },
  sectionTitle: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: scale(10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  featureIconBox: {
    width: scale(40),
    height: AppSizes.H_40,
    borderRadius: AppSizes.RADIUS_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Medium',
  },
  featureDescription: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
    lineHeight: moderateScale(18),
  },
  infoCard: {
    borderRadius: scale(14),
    paddingHorizontal: scale(16),
    marginBottom: scale(20),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(13),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  infoValue: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  footerText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    marginTop: scale(4),
  },
});
