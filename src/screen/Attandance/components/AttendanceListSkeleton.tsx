import React, { useMemo } from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

// Bar heights are just for a plausible loading silhouette - not derived from real data.
const CHART_BAR_HEIGHTS = [40, 70, 55, 90, 60, 35, 75, 50, 85, 45];

// Mirrors AttendanceBarChart's card shape (title + row of bars) so the loading state doesn't
// jump straight from "nothing" to "chart" - the chart's own slot gets a skeleton too.
const buildChartBone = (colors: any): any => ({
  key: 'chart',
  width: '100%',
  backgroundColor: colors.secondPrimaryColor,
  borderRadius: scale(14),
  padding: scale(14),
  marginBottom: scale(14),
  children: [
    { key: 'chart_title', width: AppSizes.W_100, height: verticalScale(14), borderRadius: AppSizes.RADIUS_4, marginBottom: scale(14) },
    {
      key: 'chart_bars',
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: verticalScale(120),
      children: CHART_BAR_HEIGHTS.map((height, i) => ({
        key: `bar_${i}`,
        width: scale(12),
        height: verticalScale(height),
        borderRadius: scale(6),
        marginRight: scale(20),
      })),
    },
  ],
});

const buildCardBone = (key: number, colors: any): any => ({
  key: `record_${key}`,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.secondPrimaryColor,
  borderRadius: scale(14),
  padding: scale(14),
  marginBottom: scale(10),
  children: [
    {
      key: 'date',
      width: '22%',
      alignItems: 'center',
      children: [
        { key: 'day', width: scale(40), height: verticalScale(14), borderRadius: AppSizes.RADIUS_4, marginBottom: verticalScale(6) },
        { key: 'weekday', width: scale(28), height: verticalScale(10), borderRadius: AppSizes.RADIUS_4 },
      ],
    },
    {
      key: 'body',
      flex: 1,
      marginLeft: scale(12),
      marginRight: scale(8),
      children: [
        { key: 'detail', width: '80%', height: verticalScale(12), borderRadius: AppSizes.RADIUS_4 },
      ],
    },
    { key: 'pill', width: scale(70), height: verticalScale(22), borderRadius: AppSizes.RADIUS_20 },
  ],
});

// Placeholder shown in the same slot the attendance list renders into while the month's
// records are loading. Mirrors AttendanceRecordCard's shape (date box, body, status pill).
const AttendanceListSkeleton = ({ colors, count = 6 }: { colors: any; count?: number }) => {
  const layout = useMemo(
    () => [buildChartBone(colors), ...Array.from({ length: count }, (_, i) => buildCardBone(i, colors))],
    [colors, count]
  );

  return (
    <Skeleton
      isLoading
      layout={layout}
      containerStyle={{ paddingHorizontal: scale(16), paddingTop: scale(4) }}
      boneColor={colors.borderColor}
      highlightColor={colors.lightPurple}
      animationType="shiver"
    />
  );
};

export default AttendanceListSkeleton;
