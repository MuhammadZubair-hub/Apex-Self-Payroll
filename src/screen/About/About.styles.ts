import { StyleSheet } from 'react-native';
import { scale } from '../../utils/responsive';

export const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(4),
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: scale(40),
  },
  heroCard: {
    alignItems: 'center',
    borderRadius: 16,
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
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  versionBadge: {
    marginTop: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    borderRadius: 20,
  },
  versionBadgeText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    marginTop: scale(12),
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(10),
    marginTop: scale(4),
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: scale(14),
    marginBottom: scale(10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  featureDescription: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
    lineHeight: 18,
  },
  infoCard: {
    borderRadius: 14,
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
    paddingVertical: scale(13),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    marginTop: scale(4),
  },
});
