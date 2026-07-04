import React, { useMemo } from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { scale } from '../../../utils/responsive';

const buildCardBone = (key: number, colors: any): any => ({
  key: `card_${key}`,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.secondPrimaryColor,
  borderRadius: 14,
  padding: scale(14),
  marginBottom: scale(12),
  children: [
    { key: 'icon', width: 42, height: 42, borderRadius: 12 },
    {
      key: 'body',
      flex: 1,
      marginLeft: scale(12),
      marginRight: scale(8),
      children: [
        { key: 'title', width: '55%', height: 14, borderRadius: 4, marginBottom: 8 },
        { key: 'subtitle', width: '35%', height: 11, borderRadius: 4, marginBottom: 8 },
        { key: 'meta', width: '75%', height: 11, borderRadius: 4 },
      ],
    },
  ],
});

// Card-shaped placeholder shown in the exact spot the leave list renders into, while the
// initial fetch is in flight. Mirrors sharedStyles.card's shape so the swap-in is seamless.
const ListSkeleton = ({ colors, count = 5 }: { colors: any; count?: number }) => {
  const layout = useMemo(() => Array.from({ length: count }, (_, i) => buildCardBone(i, colors)), [colors, count]);

  return (
    <Skeleton
      isLoading
      layout={layout}
      containerStyle={{ paddingHorizontal: scale(16), paddingTop: scale(8) }}
      boneColor={colors.borderColor}
      highlightColor={colors.lightPurple}
      animationType="shiver"
    />
  );
};

export default ListSkeleton;
