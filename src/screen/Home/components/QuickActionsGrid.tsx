import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { getQuickActions } from '../home.constants';
import { AppSizes } from '../../../utils/AppSizes';

const QuickActionsGrid = ({ colors }: { colors: any }) => {
  const actions = useMemo(() => getQuickActions(colors), [colors]);

  return (
    <>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity key={action.key} style={[styles.quickActionCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.actionIcon, { backgroundColor: action.tint }]}>
              <Ionicons name={action.icon as any} size={AppSizes.ICON_30} color={action.color} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default React.memo(QuickActionsGrid);
