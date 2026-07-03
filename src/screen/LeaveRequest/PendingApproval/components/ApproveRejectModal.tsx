import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import MyButton from '../../../../components/MyButton';
import FieldLabel from '../../components/FieldLabel';
import { sharedStyles } from '../../components/sharedStyles';
import { scale } from '../../../../utils/responsive';

interface ApproveRejectModalProps {
  visible: boolean;
  decision?: 'Approved' | 'Rejected';
  colors: any;
  onClose: () => void;
  onSubmit: (remarks: string) => Promise<void>;
}

const ApproveRejectModal = ({ visible, decision, colors, onClose, onSubmit }: ApproveRejectModalProps) => {
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isReject = decision === 'Rejected';

  useEffect(() => {
    if (visible) setRemarks('');
  }, [visible]);

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit(remarks);
    setSubmitting(false);
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title={isReject ? 'Reject Leave Request' : 'Approve Leave Request'}
      showCloseIcon
    >
      <FieldLabel text="Remarks" colors={colors} />
      <View style={[sharedStyles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.primaryColor }]}>
        <TextInput
          value={remarks}
          onChangeText={(text) => text.length <= 250 && setRemarks(text)}
          placeholder={isReject ? 'Reason for rejection' : 'Add a remark (optional)'}
          placeholderTextColor={colors.textSecondary}
          style={[sharedStyles.remarksInput, { color: colors.textPrimary }]}
          multiline
          maxLength={250}
        />
      </View>

      <MyButton
        text={isReject ? 'Reject' : 'Approve'}
        onPress={handleSubmit}
        loading={submitting}
        style={{ backgroundColor: isReject ? colors.redColor : colors.purple1, marginTop: scale(16) }}
      />
    </BottomSheet>
  );
};

export default React.memo(ApproveRejectModal);
