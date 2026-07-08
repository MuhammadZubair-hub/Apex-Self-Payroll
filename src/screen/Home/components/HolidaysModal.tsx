import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import BottomSheet from '../../../components/BottomSheet';
import MyButton from '../../../components/MyButton';
import { homeStyles as styles } from '../Home.styles';
import { scale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface HolidaysModalProps {
  visible: boolean;
  colors: any;
  holidays: any[];
  onClose: () => void;
}

const HolidaysModal = ({ visible, colors, holidays, onClose }: HolidaysModalProps) => (
  <BottomSheet
    visible={visible}
    onClose={onClose}
    colors={colors}
    title="Upcoming Holidays"
    showCloseIcon
    maxHeight="75%"
    footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(20) }} />}
  >
    {holidays.length > 0 ? (
      holidays.map((item, index) => (
        <View key={index} style={[styles.leaveTypeRow, { borderBottomColor: colors.borderColor }]}>
          <View style={styles.leaveTypeLeft}>
            <View style={[styles.leaveTypeIconBox, { backgroundColor: colors.lightPurple }]}>
              <Ionicons name="calendar-outline" size={AppSizes.ICON_16} color={colors.purple1} />
            </View>
            <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>{item?.Holiday || 'N/A'}</Text>
          </View>
          <Text style={[styles.leaveTypeValue, { color: colors.textSecondary }]}>{item?.Date || 'N/A'}</Text>
        </View>
      ))
    ) : (
      <Text style={[styles.leaveLabel, { color: colors.textSecondary, marginBottom: scale(12),textAlign:'center' }]}>
        No upcoming holidays !
      </Text>
    )}
  </BottomSheet>
);

export default React.memo(HolidaysModal);
