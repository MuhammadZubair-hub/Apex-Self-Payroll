import { scale, verticalScale, moderateScale } from './responsive';

export const AppSizes = {
  /* ---------------------------------------- */
  /*                SPACING                   */
  /* ---------------------------------------- */

  // Padding Horizontal
  PH_4: scale(4),
  PH_5: scale(5),
  PH_8: scale(8),
  PH_10: scale(10),
  PH_12: scale(12),
  PH_15: scale(15),
  PH_20: scale(20),
  PH_24: scale(24),
  PH_30: scale(30),

  // Padding Vertical
  PV_4: verticalScale(4),
  PV_5: verticalScale(5),
  PV_8: verticalScale(8),
  PV_10: verticalScale(10),
  PV_12: verticalScale(12),
  PV_15: verticalScale(15),
  PV_20: verticalScale(20),
  PV_25: verticalScale(25),
  PV_30: verticalScale(30),
  PV_40: verticalScale(40),

  // Margin Horizontal
  MH_5: scale(5),
  MH_10: scale(10),
  MH_15: scale(15),
  MH_20: scale(20),
  MH_24: scale(24),
  MH_30: scale(30),

  // Margin Vertical
  MV_2: verticalScale(2),
  MV_5: verticalScale(5),
  MV_10: verticalScale(10),
  MV_15: verticalScale(15),
  MV_20: verticalScale(20),
  MV_25: verticalScale(25),
  MV_30: verticalScale(30),
  MV_40: verticalScale(40),
  MV_60: verticalScale(60),
  MV_90: verticalScale(90),
  MV_100: verticalScale(100),

  // Gap
  GAP_4: scale(4),
  GAP_8: scale(8),
  GAP_10: scale(10),
  GAP_12: scale(12),
  GAP_15: scale(15),
  GAP_20: scale(20),
  GAP_30: scale(30),
  GAP_40: scale(40),

  /* ---------------------------------------- */
  /*                 FONTS                    */
  /* ---------------------------------------- */

  FONT_8: moderateScale(8),
  FONT_10: moderateScale(10),
  FONT_12: moderateScale(12),
  FONT_14: moderateScale(14),
  FONT_16: moderateScale(16),
  FONT_18: moderateScale(18),
  FONT_20: moderateScale(20),
  FONT_22: moderateScale(22),
  FONT_24: moderateScale(24),
  FONT_28: moderateScale(28),
  FONT_32: moderateScale(32),

  // Line Height
  LH_14: scale(14),
  LH_16: scale(16),
  LH_20: scale(20),
  LH_24: scale(24),
  LH_28: scale(28),

  /* ---------------------------------------- */
  /*                ICON SIZES                */
  /* ---------------------------------------- */

  ICON_10: verticalScale(10),
  ICON_16: verticalScale(16),
  ICON_20: verticalScale(20),
  ICON_24: verticalScale(24),
  ICON_30: verticalScale(30),
  ICON_35: verticalScale(35),
  ICON_40: verticalScale(40),
  ICON_50: verticalScale(50),

  /* ---------------------------------------- */
  /*                RADIUS                    */
  /* ---------------------------------------- */

  RADIUS_2: scale(2),
  RADIUS_4: scale(4),
  RADIUS_6: scale(6),
  RADIUS_8: scale(8),
  RADIUS_10: scale(10),
  RADIUS_12: scale(12),
  RADIUS_15: scale(15),
  RADIUS_20: scale(20),
  RADIUS_25: scale(25),
  RADIUS_30: scale(30),
  RADIUS_40: scale(40),
  RADIUS_50: scale(50),
  RADIUS_60 :scale(60),

  /* ---------------------------------------- */
  /*          WIDTH & HEIGHT TOKENS           */
  /* ---------------------------------------- */

  W_50: scale(50),
  W_80: scale(80),
  W_100: scale(100),
  W_150: scale(150),
  W_200: scale(200),
  W_250: scale(250),
  W_300: scale(300),

  H_20: verticalScale(20),
  H_40: verticalScale(40),
  H_50: verticalScale(50),
  H_80: verticalScale(80),
  H_100: verticalScale(100),
  H_120: verticalScale(120),
  H_150: verticalScale(150),
  H_200: verticalScale(200),
  H_300: verticalScale(300),
  H_400: verticalScale(400),

  BUTTON_HEIGHT: verticalScale(48),
  INPUT_HEIGHT: verticalScale(44),

  /* ---------------------------------------- */
  /*               AVATAR SIZES               */
  /* ---------------------------------------- */

  AVATAR_24: scale(24),
  AVATAR_32: scale(32),
  AVATAR_40: scale(40),
  AVATAR_50: scale(50),
  AVATAR_60: scale(60),
  AVATAR_70: scale(70),
  AVATAR_80: scale(80),

  /* ---------------------------------------- */
  /*             BORDER / OPACITY             */
  /* ---------------------------------------- */

  BORDER_1: scale(1),
  BORDER_2: scale(2),
  BORDER_3: scale(3),

  OPACITY_20: 0.2,
  OPACITY_40: 0.4,
  OPACITY_60: 0.6,
  OPACITY_80: 0.8,

  /* ---------------------------------------- */
  /*                 ELEVATION                */
  /* ---------------------------------------- */

  ELEVATION_2: 2,
  ELEVATION_4: 4,
  ELEVATION_6: 6,
  ELEVATION_10: 10,

  /* ---------------------------------------- */
  /*                 Z-INDEX                  */
  /* ---------------------------------------- */

  Z_1: 1,
  Z_10: 10,
  Z_50: 50,
  Z_100: 100,
  Z_999: 999,
};
