import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import Icon from '../../../../components/Icons';
import { sharedStyles } from '../../components/sharedStyles';
import { formatDateRange, getLeaveIconMeta } from '../../leaveRequest.constants';
import { pendingApprovalStyles as styles } from '../PendingApproval.styles';
import { downloadAttachment } from '../../../../utils/downloadAttachment';

interface PendingApprovalCardProps {
  item: any;
  colors: any;
  onApprove: (item: any) => void;
  onReject: (item: any) => void;
}

const PendingApprovalCard = ({ item, colors, onApprove, onReject }: PendingApprovalCardProps) => {
  const iconMeta = useMemo(() => getLeaveIconMeta(colors, item.leaveName), [colors, item.leaveName]);
  const requesterName = item.name || item.employeeName || 'Employee';
  const days = item.noOfDaysLeaveReq ?? item.days;
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    await downloadAttachment(item.attachmentPath, colors);
    setDownloading(false);
  }, [item.attachmentPath, colors]);

  return (
    <View style={[sharedStyles.card, styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.topRow}>
        <View style={[sharedStyles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
          <Icon type="Ionicons" name={iconMeta.name} size={20} color={iconMeta.color} />
        </View>
        <View style={sharedStyles.cardBody}>
          <Text style={[sharedStyles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.leaveName?.trim() || 'Leave'}
          </Text>
          <Text style={[sharedStyles.cardDateRange, { color: colors.textSecondary }]} numberOfLines={1}>
            {requesterName}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon type="Ionicons" name="calendar-outline" size={13} color={colors.textSecondary} />
        <Text style={[sharedStyles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
          {formatDateRange(item.fromDate, item.toDate)} &bull; {days === 1 ? '1 day' : `${days} days`}
        </Text>
      </View>

      {item.remarks ? (
        <Text style={[styles.remarks, { color: colors.textSecondary }]} numberOfLines={2}>
          &quot;{item.remarks}&quot;
        </Text>
      ) : null}

      {item.attachmentPath ? (
        <TouchableOpacity
          style={[styles.attachmentRow, { borderColor: colors.borderColor }]}
          onPress={handleDownload}
          disabled={downloading}
        >
          <Icon type="Ionicons" name="document-attach-outline" size={14} color={colors.purple1} />
          <Text style={[styles.attachmentText, { color: colors.purple1 }]}>Attachment</Text>
          {downloading ? (
            <Fold size={14} color={colors.purple1} />
          ) : (
            <Icon type="Ionicons" name="download-outline" size={14} color={colors.purple1} />
          )}
        </TouchableOpacity>
      ) : null}

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.dangerBg }]} onPress={() => onReject(item)}>
          <Text style={[styles.actionText, { color: colors.dangerText }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.purple1 }]} onPress={() => onApprove(item)}>
          <Text style={[styles.actionText, { color: '#fff' }]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(PendingApprovalCard);
