import React from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import { LeaveCalendarRecord } from './attendanceCalendar.constants';
import LeaveRecordsList from './LeaveRecordsList';

interface LeaveDetailsSheetProps {
  visible: boolean;
  colors: any;
  records: LeaveCalendarRecord[];
  onClose: () => void;
}

const LeaveDetailsSheet = ({ visible, colors, records, onClose }: LeaveDetailsSheetProps) => (
  <BottomSheet visible={visible} onClose={onClose} colors={colors} title="On Leave" showCloseIcon maxHeight="70%">
    <LeaveRecordsList colors={colors} records={records} style={styles.list} />
  </BottomSheet>
);

export default React.memo(LeaveDetailsSheet);

const styles = StyleSheet.create({
  list: {
    maxHeight: 420,
  },
});
