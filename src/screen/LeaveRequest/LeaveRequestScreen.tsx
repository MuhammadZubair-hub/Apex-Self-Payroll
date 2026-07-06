import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import { leaveRequestStyles as styles } from './LeaveRequest.styles';
import { useLeaveRequest } from './LeaveRequest.logic';
import SubmittedLeaveScreen from './SubmittedLeave/SubmittedLeaveScreen';
import PendingApprovalScreen from './PendingApproval/PendingApprovalScreen';

const LeaveRequestScreen = () => {
  const { colors, employeeId, activeSection, setActiveSection, submitted, pendingApprovals } = useLeaveRequest();
  const isSubmitted = activeSection === 'SUBMITTED';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} barStyle="dark-content" />
      <PrimaryHeader headerText="Leave Requests" />

      <View style={[styles.sectionSwitcher, { backgroundColor: colors.secondPrimaryColor }]}>
        <TouchableOpacity
          style={[styles.sectionButton, isSubmitted && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('SUBMITTED')}
        >
          <Text style={[styles.sectionButtonText, { color: isSubmitted ? '#fff' : colors.textSecondary }]}>
            Leave Submitted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sectionButton, !isSubmitted && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('APPROVALS')}
        >
          <Text style={[styles.sectionButtonText, { color: !isSubmitted ? '#fff' : colors.textSecondary }]}>
            Pending Approval
          </Text>
          {pendingApprovals.pendingApprovals.length > 0 && (
            <View style={[styles.sectionBadge, { backgroundColor: !isSubmitted ? '#fff' : colors.redColor }]}>
              <Text style={[styles.sectionBadgeText, { color: !isSubmitted ? colors.purple1 : '#fff' }]}>
                {pendingApprovals.pendingApprovals.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isSubmitted ? (
        <SubmittedLeaveScreen colors={colors} employeeId={employeeId} state={submitted} />
      ) : (
        <PendingApprovalScreen colors={colors} state={pendingApprovals} />
      )}
    </SafeAreaView>
  );
};

export default LeaveRequestScreen;
