// import PrimaryHeader from '@/src/components/header/PrimaryHeader';
// import { getUser } from '@/src/redux/slices/authSlice';
// import { baseUrl } from '@/src/services/Constants/endPoints';
// import { useThemeContext } from '@/src/theme/ThemeContex';
// import { getColors } from '@/src/theme/color/theme';
// import { scale, screenWidth } from '@/src/utils/responsive';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from 'react-redux';
// // import Icon from 'react-native-vector-icons/Ionicons';

// const Home = () => {
//   const navigation = useNavigation();
//   const { theme } = useThemeContext();
//   const colors = getColors(theme);
//   const dispatch = useDispatch();
//   const userData = useSelector(getUser);

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [upcomingHolidays, setUpcomingHolidays] = useState([]);
//   const [leaveBalance, setLeaveBalance] = useState([]);
//   const [error, setError] = useState(null);

//   // Attendance Data
//   const attendanceData = [
//     { name: 'Present', value: 26, color: '#4CAF50' },
//     { name: 'Late', value: 4, color: '#FFC107' },
//     { name: 'Absent', value: 2, color: '#F44336' },
//   ];

//   const chartConfig = {
//     backgroundGradientFrom: colors.primaryColor,
//     backgroundGradientTo: colors.primaryColor,
//     color: (opacity = 1) => `rgba(18, 116, 172, ${opacity})`,
//     labelColor: () => colors.textPrimary,
//     propsForLabels: { fontSize: 12 },
//   };

//   // Fetch Dashboard Data
//   const fetchDashboardData = async () => {
//     if (!userData?.employeeId) return;

//     try {
//       const upcomingHolidaysUrl = `${baseUrl}ESSDashboard/GetUpcomingHolidays?EmployeeId=${userData.employeeId}`;
//       const employeeLeaveUrl = `${baseUrl}ESSDashboard/GetEmployeeLeavesInfo?employeeId=${userData.employeeId}`;

//       const [holidaysResponse, leaveResponse] = await Promise.all([
//         fetch(upcomingHolidaysUrl),
//         fetch(employeeLeaveUrl),
//       ]);

//       const holidaysData = await holidaysResponse.json();
//       const leaveData = await leaveResponse.json();

//       if (holidaysData.status) {
//         setUpcomingHolidays(holidaysData.data || []);
//       }

//       if (leaveData.status) {
//         setLeaveBalance(leaveData.data || []);
//       }
//     } catch (err) {
//       console.error('Error fetching dashboard data:', err);
//       // setError('Failed to load data');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, [userData?.employeeId]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };



//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.secondPrimaryColor }]}>
//       <StatusBar backgroundColor={colors.purple1} />
//       <PrimaryHeader
//         headerText='Dashboard'
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple1} />
//         }
//         contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
//       >


     

//         <View style={[styles.card, { backgroundColor: colors.primaryColor, borderBottomColor: colors.purple1 }]}>
//           <View style={styles.cardHeader}>
//             <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
//               Attendance
//             </Text>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text>Login Time</Text>
//             <Text>10:00 Am</Text>
//           </View>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text>Logout Time</Text>
//             <Text>--:-- Pm</Text>
//           </View>
//         </View>

//         {/* Attendance Overview Card */}
//         <View style={[styles.card, { backgroundColor: colors.primaryColor, borderBottomColor: colors.purple1 }]}>
//           <View style={styles.cardHeader}>
//             <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
//               Attendance Overview
//             </Text>
//             {/* <TouchableOpacity>
//               <Text style={[styles.viewAllText, { color: colors.purple1 }]}>View All</Text>
//             </TouchableOpacity> */}
//           </View>

//           <PieChart
//             data={attendanceData.map(item => ({
//               name: item.name,
//               population: item.value,
//               color: item.color,
//               legendFontColor: colors.textPrimary,
//               legendFontSize: 12,
//             }))}
//             width={screenWidth - 40}
//             height={200}
//             chartConfig={chartConfig}
//             accessor="population"
//             backgroundColor="transparent"
//             paddingLeft="10"
//             absolute

//           />

//           <View style={styles.legendContainer}>
//             {attendanceData.map((item, i) => (
//               <View key={i} style={styles.legendItem}>
//                 <View style={[styles.legendDot, { backgroundColor: item.color }]} />
//                 <Text style={[styles.legendText, { color: colors.textSecondary }]}>
//                   {item.name}: {item.value}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Upcoming Holidays Table */}
//         <View style={[styles.card, { backgroundColor: colors.primaryColor, borderBottomColor: colors.purple1 }]}>
//           <View style={styles.cardHeader}>
//             <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
//               <View style={[styles.statIconBg, { backgroundColor: '#4CAF50' }]}>
//                 <Ionicons name="calendar-outline" size={20} color="#fff" />
//               </View>
//               <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
//                 Upcoming Holidays
//               </Text>
//             </View>
//             {upcomingHolidays.length > 0 && (
//               <View style={[styles.badge, { backgroundColor: colors.purple1 }]}>
//                 <Text style={styles.badgeText}>{upcomingHolidays.length}</Text>
//               </View>
//             )}
//           </View>

//           {upcomingHolidays.length > 0 ? (
//             <View style={styles.tableContainer}>
//               <View style={[styles.tableHeader, { borderBottomColor: colors.borderColor }]}>
//                 <Text style={[styles.headerText, { color: colors.textPrimary }]}>Date</Text>
//                 <Text style={[styles.headerText, { color: colors.textPrimary }]}>Holiday</Text>
//               </View>

//               {upcomingHolidays.map((holiday, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.tableRow,
//                     {
//                       backgroundColor: index % 2 === 0 ? colors.secondPrimaryColor : 'transparent',
//                       borderBottomColor: colors.borderColor,
//                     }
//                   ]}
//                 >
//                   <Text style={[styles.rowText, { color: colors.textSecondary }]}>
//                     {holiday?.Date || 'N/A'}
//                   </Text>
//                   <Text style={[styles.rowText, { color: colors.textPrimary }]}>
//                     {holiday?.Holiday || 'N/A'}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           ) : (
//             <View style={styles.emptyState}>
//               <Ionicons name="calendar-outline" size={40} color={colors.textSecondary} />
//               <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
//                 No upcoming holidays
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Leave Balance Table */}
//         <View style={[styles.card, { backgroundColor: colors.primaryColor, borderBottomColor: colors.purple1 }]}>
//           <View style={styles.cardHeader}>

//             <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
//               <View style={[styles.statIconBg, { backgroundColor: '#FF9800' }]}>
//                 <Ionicons name="gift-outline" size={20} color="#fff" />
//               </View>
//               <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
//                 Leave Balance
//               </Text>
//             </View>
//           </View>

//           {leaveBalance.length > 0 ? (
//             <View style={styles.tableContainer}>
//               <View style={[styles.tableHeader, { borderBottomColor: colors.borderColor }]}>
//                 <Text style={[styles.headerText, { color: colors.textPrimary }]}>Leave Type</Text>
//                 <Text style={[styles.headerText, { color: colors.textPrimary }]}>Balance</Text>
//               </View>

//               {leaveBalance.map((leave, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.tableRow,
//                     {
//                       backgroundColor: index % 2 === 0 ? colors.secondPrimaryColor : 'transparent',
//                       borderBottomColor: colors.borderColor,
//                     }
//                   ]}
//                 >
//                   <Text style={[styles.rowText, { color: colors.textPrimary }]}>
//                     {leave?.leaveName || 'N/A'}
//                   </Text>

//                   <Text style={[styles.balanceValue, { color: colors.purple1 }]}>
//                     {leave?.leaveBalance || 0}
//                   </Text>

//                 </View>
//               ))}
//             </View>
//           ) : (
//             <View style={styles.emptyState}>
//               <Ionicons name="document-text-outline" size={40} color={colors.textSecondary} />
//               <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
//                 No leave records found
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Quick Actions Grid */}
//         <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
//           Quick Actions
//         </Text>

//         <View style={styles.quickActionsGrid}>
//           <TouchableOpacity
//             style={[styles.quickActionCard, { backgroundColor: colors.primaryColor }]}
//           // onPress={() => navigation.navigate('HomeTabs', { screen: 'Task', params: { tabIndex: 3 } })}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
//               <Ionicons name="checkmark-done-outline" size={24} color="#fff" />
//             </View>
//             <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Tasks</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.quickActionCard, { backgroundColor: colors.primaryColor }]}
//           // onPress={() => navigation.navigate('HomeTabs', { screen: 'Annoucment', params: { tabIndex: 1 } })}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: '#FF9800' }]}>
//               <Ionicons name="megaphone-outline" size={24} color="#fff" />
//             </View>
//             <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Announcements</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.quickActionCard, { backgroundColor: colors.primaryColor }]}
//           // onPress={() => navigation.navigate('HomeTabs', { screen: 'Team', params: { tabIndex: 2 } })}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: '#2196F3' }]}>
//               <Ionicons name="people-outline" size={24} color="#fff" />
//             </View>
//             <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Team</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.quickActionCard, { backgroundColor: colors.primaryColor }]}
//           // onPress={() => navigation.navigate('HomeTabs', { screen: 'Task', params: { tabIndex: 3 } })}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: '#9C27B0' }]}>
//               <Ionicons name="calendar-outline" size={24} color="#fff" />
//             </View>
//             <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Calendar</Text>
//           </TouchableOpacity>
//         </View>

//         {/* <View style={{ height: 20 }} /> */}

//         <LoadingBaseModal
//           visible={loading}
//         />

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//   },

//   // Header
//   headerSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(16),
//     paddingTop: scale(20),
//     paddingBottom: scale(16),
//   },
//   greetingText: {
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginTop: 2,
//   },
//   profileIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   // Stats Row
//   statsRow: {
//     flexDirection: 'row',
//     paddingHorizontal: scale(16),
//     marginBottom: scale(16),
//     gap: 12,
//   },
//   statCard: {
//     flex: 1,
//     padding: scale(16),
//     borderRadius: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//   },
//   statIconBg: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginBottom: 8,
//   },
//   statValue: {
//     fontSize: 22,
//     fontWeight: '700',
//   },
//   statLabel: {
//     fontSize: 12,
//     marginTop: 2,
//   },

//   // Cards
//   card: {
//     padding: scale(16),
//     borderRadius: 14,
//     marginHorizontal: scale(16),
//     marginBottom: scale(16),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     borderBottomWidth: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 17,
//     // fontWeight: '700',
//     fontFamily: 'PlusJakartaSans-SemiBold'
//   },
//   viewAllText: {
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 12,
//     // fontWeight: '600',
//     fontFamily: 'PlusJakartaSans-Regular'
//   },

//   // Legend
//   legendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 12,
//     flexWrap: 'wrap',
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 4,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 6,
//   },
//   legendText: {
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-Regular'
//   },

//   // Table Styles
//   tableContainer: {
//     marginTop: 4,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     marginBottom: 2,
//     // alignItems:'center'
//   },
//   headerText: {
//     // alignSelf:'center',
//     textAlign: 'center',
//     fontSize: 14,
//     // fontWeight: '600',
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     flex: 1,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderBottomWidth: 0.5,
//     borderRadius: 6,
//     marginVertical: 1,
//   },
//   rowText: {
//     fontSize: 13,
//     // flex: 1,
//     flex: 1,
//     // alignSelf:'center'
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-Regular'
//   },
//   balanceContainer: {
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   balanceValue: {
//     fontSize: 15,
//     fontWeight: '700',
//     flex: 1,
//     textAlign: 'center'
//   },

//   // Empty State
//   emptyState: {
//     paddingVertical: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 14,
//     marginTop: 10,
//   },

//   // Quick Actions
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     paddingHorizontal: scale(16),
//     marginTop: 4,
//     marginBottom: 12,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//   },
//   quickActionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: scale(12),
//     justifyContent: 'space-between',
//   },
//   quickActionCard: {
//     width: (screenWidth - 48) / 2,
//     padding: scale(16),
//     borderRadius: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//   },
//   actionIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionLabel: {
//     fontSize: 14,
//     // fontWeight: '500',
//     fontFamily: 'PlusJakartaSans-SemiBold',
//   },
// });

// import LoadingBaseModal from '@/src/components/Loader/LoadingBaseModal';
// import PrimaryHeader from '@/src/components/header/PrimaryHeader';
// import { getUser } from '@/src/redux/slices/authSlice';
// import { baseUrl, endPoints } from '@/src/services/Constants/endPoints';
// import { useThemeContext } from '@/src/theme/ThemeContex';
// import { getColors } from '@/src/theme/color/theme';
// import { scale, screenWidth } from '@/src/utils/responsive';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { getUser } from '../../redux/slices/authSlice';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, screenWidth } from '../../utils/responsive';
import LoadingBaseModal from '../../components/Loader/LoadingBaseModal';

const formatTime = (time?: string | null) => {
  if (!time) return '--:--';
  const [h, m] = time.split(':');
  const hourNum = parseInt(h, 10);
  if (isNaN(hourNum)) return '--:--';
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
  return `${String(hour12).padStart(2, '0')}:${m} ${period}`;
};

const Home = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);
//   const navigation = useNavigation();
  const userData = useSelector(getUser);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingHolidays, setUpcomingHolidays] = useState<any[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any[]>([]);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);

  const totalLeaveBalance = leaveBalance.reduce(
    (sum, item) => sum + (Number(item?.leaveBalance) || 0),
    0
  );

  const attendanceSummary = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let present = 0;
    let absent = 0;
    let pending = 0;

    monthlyAttendance.forEach((record) => {
      if (record.attendanceStatus === 'Present') {
        present++;
      } else if (record.attendanceStatus === 'Absent') {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);
        if (recordDate.getTime() > today.getTime()) {
          pending++;
        } else {
          absent++;
        }
      }
    });

    return { present, absent, pending, totalDays: monthlyAttendance.length };
  })();

  const todayStatusMeta = (() => {
    switch (todayAttendance?.attendanceStatus) {
      case 'Present':
        return { label: 'Present', bg: colors.successBg, color: colors.successText, dot: colors.greenColor };
      case 'Absent':
        return { label: 'Absent', bg: colors.dangerBg, color: colors.dangerText, dot: colors.redColor };
      case 'Leave':
        return { label: 'On Leave', bg: colors.lightPurple, color: colors.purple1, dot: colors.purple1 };
      default:
        return { label: 'Not Marked', bg: colors.neutralBg, color: colors.neutralText, dot: colors.textSecondary };
    }
  })();

  const todayBottomText = !todayAttendance
    ? 'No attendance record yet'
    : todayAttendance.attendanceStatus === 'Present'
      ? (todayAttendance.endTime ? `Checked out at ${formatTime(todayAttendance.endTime)}` : 'Checked in')
      : todayStatusMeta.label;

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    if (!userData?.employeeId) return;

    try {
      const now = new Date();
      const upcomingHolidaysUrl = `${baseUrl}ESSDashboard/GetUpcomingHolidays?EmployeeId=${userData.employeeId}`;
      const employeeLeaveUrl = `${baseUrl}ESSDashboard/GetEmployeeLeavesInfo?employeeId=${userData.employeeId}`;
      const todayAttendanceUrl = `${baseUrl}${endPoints.TodayAttendance}?employeeId=${userData.employeeId}`;
      const monthlyAttendanceUrl = `${baseUrl}${endPoints.MonthlyAttendance}?EmployeeId=${userData.employeeId}&Month=${now.getMonth() + 1}&Year=${now.getFullYear()}`;

      const [holidaysResponse, leaveResponse, todayAttendanceResponse, monthlyAttendanceResponse] = await Promise.all([
        fetch(upcomingHolidaysUrl),
        fetch(employeeLeaveUrl),
        fetch(todayAttendanceUrl),
        fetch(monthlyAttendanceUrl),
      ]);

      const holidaysData = await holidaysResponse.json();
      const leaveData = await leaveResponse.json();
      const todayAttendanceData = await todayAttendanceResponse.json();
      const monthlyAttendanceData = await monthlyAttendanceResponse.json();

      if (holidaysData.status) {
        setUpcomingHolidays(holidaysData.data || []);
      }

      if (leaveData.status) {
        setLeaveBalance(leaveData.data || []);
      }

      if (todayAttendanceData.status) {
        setTodayAttendance(todayAttendanceData.data || null);
      }

      if (monthlyAttendanceData.status) {
        setMonthlyAttendance(monthlyAttendanceData.data || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [userData?.employeeId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} />
      <PrimaryHeader headerText='Dashboard' />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple1} />
        }
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 20, paddingHorizontal: scale(16) }}
      >
        {/* Today's Attendance Card */}
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={styles.attendanceStatusRow}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>Today&apos;s Attendance</Text>
            <View style={[styles.statusBadge, { backgroundColor: todayStatusMeta.bg }]}>
              <Text style={[styles.statusText, { color: todayStatusMeta.color }]}>{todayStatusMeta.label}</Text>
            </View>
          </View>

          <View style={styles.attendanceTimeRow}>
            <Text style={[styles.checkInTime, { color: colors.textPrimary }]}>
              {formatTime(todayAttendance?.startTime)}
            </Text>
            <View style={[styles.iconCircle, { backgroundColor: colors.blueTint }]}>
              <Ionicons name="calendar-outline" size={30} color={colors.purple1} />
            </View>
          </View>

          <View style={styles.attendanceCheckRow}>
            <View style={[styles.statusDot, { backgroundColor: todayStatusMeta.dot }]} />
            <Text style={[styles.checkInText, { color: colors.textSecondary }]}>{todayBottomText}</Text>
          </View>
        </View>

        {/* Attendance Overview Card */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}
        //   onPress={() => router.push('/(app)/attendance')}
          activeOpacity={0.85}
        >
          <View style={styles.attendanceStatusRow}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>
              Attendance Overview
            </Text>
            <TouchableOpacity 
            // onPress={() => router.push('/(app)/attendance')}
            >
              <Text style={[styles.viewDetailsText, { color: colors.purple1 }]}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <View style={styles.statTopRow}>
                <View style={[styles.statIconCircle, { backgroundColor: colors.greenColor }]}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                  {attendanceSummary.present}
                </Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Present</Text>
            </View>

            <View style={styles.statColumn}>
              <View style={styles.statTopRow}>
                <View style={[styles.statIconCircle, { backgroundColor: colors.orangeColor }]}>
                  <Ionicons name="time" size={13} color="#fff" />
                </View>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                  {attendanceSummary.pending}
                </Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</Text>
            </View>

            <View style={styles.statColumn}>
              <View style={styles.statTopRow}>
                <View style={[styles.statIconCircle, { backgroundColor: colors.redColor }]}>
                  <Ionicons name="close" size={14} color="#fff" />
                </View>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                  {attendanceSummary.absent}
                </Text>
              </View>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Absent</Text>
            </View>
          </View>

          <View style={[styles.progressBarContainer, { backgroundColor: colors.borderColor }]}>
            <View style={{ flex: attendanceSummary.present, backgroundColor: colors.greenColor }} />
            <View style={{ flex: attendanceSummary.pending, backgroundColor: colors.orangeColor }} />
            <View style={{ flex: attendanceSummary.absent, backgroundColor: colors.redColor }} />
          </View>

          <Text style={[styles.totalDaysText, { color: colors.textSecondary }]}>
            Total Days: {attendanceSummary.totalDays}
          </Text>
        </TouchableOpacity>

        {/* Leave Balance and Upcoming Holidays */}
        <View style={styles.infoCardsRow}>
          <TouchableOpacity
            style={[styles.card, styles.infoCard, { backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setLeaveModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={[styles.infoIconBox, { backgroundColor: colors.lightPurple }]}>
              <Ionicons name="airplane-outline" size={30} color={colors.purple1} />
            </View>
            <Text style={[styles.infoCardTitle, { color: colors.textPrimary }]}>Leave Balance</Text>

            <Text style={[styles.leaveNumber, { color: colors.textPrimary }]}>{totalLeaveBalance}</Text>
            <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>Days Available</Text>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
              style={styles.infoCardChevron}
            />
          </TouchableOpacity>

          <View style={[styles.card, styles.infoCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.infoIconBox, { backgroundColor: colors.lightPurple }]}>
              <Ionicons name="calendar-outline" size={30} color={colors.purple1} />
            </View>
            <Text style={[styles.infoCardTitle, { color: colors.textPrimary }]}>Upcoming Holidays</Text>

            {upcomingHolidays.length > 0 ? (
              <>
                <Text style={[styles.leaveLabel, { color: colors.textSecondary }]} numberOfLines={1}>
                  {upcomingHolidays[0]?.Date || 'N/A'}
                </Text>
                <Text style={[styles.holidayNameText, { color: colors.textPrimary }]} numberOfLines={1}>
                  {upcomingHolidays[0]?.Holiday || 'N/A'}
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>
                  No upcoming holidays
                </Text>
                <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>
                  Enjoy your day!
                </Text>
              </>
            )}

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textSecondary}
              style={styles.infoCardChevron}
            />
          </View>
        </View>

        {/* Quick Actions Section */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Quick Actions
        </Text>

        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.greenTint }]}>
              <Ionicons name="checkmark-circle-outline" size={30} color={colors.greenColor} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.orangeTint }]}>
              <Ionicons name="megaphone-outline" size={30} color={colors.orangeColor} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Announcements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.blueTint }]}>
              <Ionicons name="people-outline" size={30} color="#2196F3" />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Team</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.actionIcon, { backgroundColor: colors.lightPurple }]}>
              <Ionicons name="calendar-outline" size={30} color={colors.purple1} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>Calendar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal
        visible={leaveModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLeaveModalVisible(false)}
      >
        <View style={styles.sheetOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setLeaveModalVisible(false)}
          />

          <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.borderColor }]} />

            <View style={styles.sheetHeaderRow}>
              <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Leave Balance</Text>
              <TouchableOpacity onPress={() => setLeaveModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {leaveBalance.length > 0 ? (
              leaveBalance.map((item, index) => (
                <View key={index} style={[styles.leaveTypeRow, { borderBottomColor: colors.borderColor }]}>
                  <View style={styles.leaveTypeLeft}>
                    <View style={[styles.leaveTypeIconBox, { backgroundColor: colors.lightPurple }]}>
                      <Ionicons name="briefcase-outline" size={16} color={colors.purple1} />
                    </View>
                    <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>
                      {item?.leaveName?.trim() || 'N/A'}
                    </Text>
                  </View>
                  <Text style={[styles.leaveTypeValue, { color: colors.textPrimary }]}>
                    {item?.leaveBalance ?? 0} days
                  </Text>
                </View>
              ))
            ) : (
              <Text style={[styles.leaveLabel, { color: colors.textSecondary, marginBottom: scale(12) }]}>
                No leave balance records found
              </Text>
            )}

            <View style={[styles.totalRow, { borderTopColor: colors.borderColor }]}>
              <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>Total</Text>
              <Text style={[styles.leaveTypeValue, { color: colors.purple1 }]}>{totalLeaveBalance} days</Text>
            </View>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.purple1 }]}
              onPress={() => setLeaveModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <LoadingBaseModal visible={loading} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Cards
  card: {
    padding: scale(16),
    borderRadius: 14,
    marginBottom: scale(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
  },

  // Today's Attendance
  attendanceStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attendanceTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkInTime: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  checkInText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  // Attendance Overview
  viewDetailsText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 14,
  },
  statColumn: {
    alignItems: 'center',
  },
  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  totalDaysText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 10,
  },

  // Leave and Holiday Section
  infoCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scale(12),
  },
  infoCard: {
    flex: 1,
    marginBottom: scale(16),
    maxWidth:'50%'
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: 8,
  },
  infoCardChevron: {
    position: 'absolute',
    right: scale(12),
    top: '10%',
  },
  leaveNumber: {
    fontSize: 30,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  leaveLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  holidayNameText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 2,
  },

  // Quick Actions
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionCard: {
    width: (screenWidth - scale(32) - scale(12)) / 2,
    padding: scale(16),
    borderRadius: 12,
    marginBottom: scale(12),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },

  // Leave Balance Modal
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(24),
    maxHeight: '75%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: scale(14),
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  sheetTitle: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  leaveTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leaveTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  leaveTypeIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveTypeName: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  leaveTypeValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: scale(14),
    marginTop: scale(4),
    borderTopWidth: 1,
  },
  closeButton: {
    paddingVertical: scale(14),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: scale(20),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});