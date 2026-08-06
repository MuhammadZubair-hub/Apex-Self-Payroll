# Source Brief: Payroll ESS — End User Manual

> **Instructions for the AI tool generating this document:**
> Turn the content below into a polished **end-user manual for the "Payroll ESS" mobile app**, exported as a **.docx** file. The audience is non-technical employees using the app on their phone — write in plain, friendly, step-by-step language. Do not mention code, screens' internal names, APIs, or anything technical; describe everything the way a user experiences it (what they tap, what they see, what happens next).
>
> Suggested structure for the output document:
> - **Cover page**: App name "Payroll ESS", subtitle "Employee Self Service App — User Guide", version 1.0.0.
> - **Table of Contents** (auto-generated from headings).
> - One section per heading below (`##`), using numbered steps for any "How to..." instructions.
> - Leave a labeled placeholder wherever you see `[Screenshot: ...]` so screenshots can be inserted later — keep these placeholders in the output.
> - Use consistent heading styles (Heading 1 for main sections, Heading 2 for sub-features) so the Table of Contents works.
> - End with the FAQ section and a short glossary of status labels.
>
> **Do not invent or include any of the following — they are not available in the current version of this app, even though similar apps often have them:** self-service password reset / OTP login / account registration, a notifications screen/inbox, editing your own profile details, an in-app "report an issue" form, or a "quick actions" tile grid. If any source material below seems to hint at these, ignore it — they are unavailable. (Note: Biometric sign-in, Work From Home (WFH) requests, and WFH self-service check-in/check-out ARE supported).

---

## 1. Introduction

Payroll ESS (Employee Self Service) is a mobile app that lets employees view their attendance history, perform WFH (Work From Home) check-in and check-out, submit and track Leave and WFH requests, request official letters from HR, and view their profile — all from their phone. Managers get additional tools to approve or reject their team's leave and WFH requests and view a team-wide leave calendar.

## 2. Problem Statement — Why Payroll ESS Was Built

Before this app existed, employees faced everyday difficulties managing simple HR tasks:

- **No visibility into attendance**: Employees had no way to check their own attendance record. They couldn't see whether a day was marked Present, Absent, or Leave, or review their check-in/check-out times and hours worked, without asking HR.
- **Difficult tracking for remote work**: Work From Home employees had no standard method to mark their daily attendance or record check-in and check-out times with location verification.
- **Manual, email-based requests**: Requesting something as simple as a salary certificate, NOC, experience letter, or remote work approval meant manually writing and sending emails to HR or managers, then waiting without any clear status or record.
- **No visibility into leave balance or pending requests**: Employees had no easy way to know how many leave days they had remaining, or the status of leave or WFH requests they had submitted — whether it was still pending, who needed to approve it, or if it had already been approved or rejected.
- **Repetitive login steps**: Users had to manually type their login credentials every time they accessed the app rather than using fast, secure biometrics.

Payroll ESS solves these problems by putting attendance records, WFH check-in/check-out, leave balances, leave and WFH request statuses, biometric login, and letter requests directly into the employee's hands — all in one mobile app, available anytime.

## 3. Getting Started

### 3.1 Opening the App
When you open the app, a brief welcome (splash) screen appears for a few seconds while the app loads, showing the Payroll ESS logo and name.

`[Screenshot: Splash screen]`

### 3.2 Signing In
1. On the sign-in screen, enter your **User Code / Username**.
2. Enter your **Password**. Tap the eye icon inside the password field to show or hide what you've typed.
3. Tap **Log In**.

If you leave either field empty, the app will show a message asking you to fill in both fields. If your user code or password is incorrect, the app will show a login failed message — check your details and try again.

`[Screenshot: Sign-in screen]`

Once signed in, you'll stay signed in until you choose **Log Out** from Settings or the side menu.

### 3.3 Signing In with Biometrics (Fingerprint / Face ID)
If you have enabled biometric login in Settings (see Section 12.1), you can log in without typing your credentials:

1. Open the sign-in screen.
2. Below the **Log In** button, tap the **Biometrics** button (shows a Fingerprint icon on Android or Face ID icon on iOS).
3. Scan your fingerprint or face when prompted by your phone.
4. Once verified, you will be signed in automatically.

`[Screenshot: Sign-in screen with biometric button]`

*Note: You must sign in manually at least once before biometrics can be enabled.*

## 4. Finding Your Way Around

The app has two main ways to get around:

- **The side menu (drawer)**: tap the menu icon (☰) in the top-left corner of most screens to open it. It gives you access to: Dashboard, Attendance, Leave Request, WFH Requests, Request Letter, Leave Calendar (managers only), Profile, and Settings. Your name, employee code, and photo appear at the top of this menu. At the bottom, you can quickly switch between Light and Dark mode, or Sign Out.
- **The bottom tab bar**: while on the Dashboard, a floating bar at the bottom of the screen lets you quickly switch between **Home** and **Leave Request**.

`[Screenshot: Side menu open]`
`[Screenshot: Bottom tab bar]`

Some screens are opened by tapping a card or button rather than from a menu — these are described in the relevant sections below.

## 5. Dashboard (Home)

The Dashboard is the first screen you see after signing in, and gives you an at-a-glance summary of your day. Pull down on the screen at any time to refresh the information.

`[Screenshot: Dashboard]`

The Dashboard shows, from top to bottom:

- **Today's Attendance / WFH Attendance Card** — shows your attendance status for today (Present, Absent, On Leave, or Not Marked yet).
  - **For Standard Employees**: Shows your attendance status and check-in time if marked present.
  - **For Work From Home (WFH) Employees**: Displays the **WFH Attendance Card** with a **Check In** or **Check Out** button. Tapping Check In or Check Out prompts for GPS location permission, captures your geographic coordinates, and records your check-in or check-out time instantly.
- **Pending Approvals** (only appears if you manage other employees and have requests waiting on you) — shows pending Leave and WFH requests. Tap this card to open a menu to jump straight to the pending Leave or WFH approval list.
- **Attendance Overview** — a summary of how many days you've been Present, Pending, or Absent this month, with a progress bar. Tap this card, or its "View Details" link, to open the full Attendance screen.
- **Hours Worked chart** — a bar chart showing how many hours you worked each day this month.
- **Leave Balance** — tap this card to see how many days of leave you have remaining, broken down by leave type (e.g. Annual, Sick, Casual).
- **Upcoming Holidays** — tap this card to see the full list of upcoming public holidays; the card itself shows the next one.
- **Request a Letter** — tap to jump straight to the Request Letter screen (see Section 9).
- **Team Leave Calendar** (managers only) — a mini calendar showing which team members are on leave this month, with a dropdown to filter by department. Tap a highlighted day to see who's on leave that day, or tap the filter icon to open the full Leave Calendar screen.

`[Screenshot: WFH Attendance Card on Dashboard showing Check In button]`
`[Screenshot: WFH Attendance Card showing Checked In status and Check Out button]`

## 6. Attendance

Open this from the side menu (**Attendance**), or by tapping the Dashboard's Attendance Overview card. This screen is for **viewing your attendance history**.

`[Screenshot: Attendance screen]`

- Tap the month/year at the top (e.g. "July 2026") to open a picker and jump to a different month.
- Below that, four counters show how many days that month you were **Present**, **Absent**, **Pending** (a future day that hasn't happened yet), and on **Leave**.
- The **Hours Worked** chart shows a bar for each day, colored by that day's status.
- Below the chart, each day is listed with its date, status, and details — for example your check-in/check-out time and hours worked on a Present day, or the leave type on a day you were on leave.
- Pull down to refresh.

*Note: For standard office employees, attendance is recorded automatically by company biometric systems. For WFH employees, daily check-in and check-out recorded from the Dashboard WFH card will reflect here in your attendance history.*

## 7. Leave Requests

Open this from the side menu (**Leave Request**) or the bottom tab bar. There are two tabs at the top: **Leave Submitted** (your own requests) and **Pending Approval** (requests waiting for your decision, if you're a manager — this tab shows a number badge when you have some).

`[Screenshot: Leave Request screen — Leave Submitted tab]`

### 7.1 Viewing Your Leave Requests
On the **Leave Submitted** tab, you'll see a list of every leave request you've made, with its status (Pending, Approved, or Rejected), dates, and number of days.

- Use the search box to find a request by leave type.
- Tap the filter icon to narrow the list by status or by date range.
- Tap a request to see its full details, including your remarks and any attached document.
- Tap the eye icon on a request to see its **approval chain** — who needs to approve it and the current status of each approver.

### 7.2 Submitting a New Leave Request
1. On the **Leave Submitted** tab, tap the **+** button in the bottom-right corner.
2. Choose a **Leave Type** — the picker shows how many days you have remaining for each type.
3. Choose your **From Date** and **To Date** using the calendar picker. The number of days is calculated for you automatically.
4. Optionally add **Remarks** (up to 250 characters).
5. Optionally attach a supporting document — tap the attachment field and choose to take a photo, pick one from your gallery, or choose a PDF file.
6. Tap **Submit Request**.
7. Review the reminder about discussing handover with your manager, then confirm by tapping **Submit**.

You'll see a confirmation message once your request is submitted, and it will appear in your list. If you leave the form without submitting, you'll be asked to confirm that you want to discard your entered details.

`[Screenshot: New Leave Request form]`

### 7.3 Approving or Rejecting Requests (Managers)
On the **Pending Approval** tab, you'll see leave requests from your team members awaiting your decision, along with their reason and any attached document.

1. Tap **Approve** or **Reject** on a request.
2. Optionally add a remark explaining your decision.
3. Confirm by tapping **Approve** or **Reject**.

You'll see a confirmation message, and the request will be removed from your pending list.

## 8. WFH (Work From Home) Requests

Open this from the side menu (**WFH Requests**). Use this screen to apply for Work From Home permissions and track your remote work applications. There are two tabs at the top: **WFH Submitted** (your own requests) and **Pending Approval** (requests waiting for your decision, if you're a manager).

`[Screenshot: WFH Requests screen — WFH Submitted tab]`

### 8.1 Viewing Your WFH Requests
On the **WFH Submitted** tab, you'll see a list of every WFH request you've submitted, showing dates requested, total number of days, reason, and status (Pending, Approved, or Rejected).

- Use the search box to find a request by reason.
- Tap the filter icon to filter by status (All, Pending, Approved, Rejected) or date range (From Date / To Date).
- Tap any WFH application card to view complete application details.
- Tap the eye icon on an application card to view its **approval chain** to see which manager needs to approve it.

### 8.2 Submitting a New WFH Request
1. On the **WFH Submitted** tab, tap the **+** floating button in the bottom-right corner.
2. Select the **From Date** and **To Date** for your requested remote work period.
3. Select or enter the **Reason** for your Work From Home request.
4. Add any additional **Remarks** if needed.
5. Tap **Submit Request**.

Once submitted successfully, a confirmation message will appear and your request will be listed with a **Pending** status until your manager reviews it.

`[Screenshot: New WFH Request modal]`

### 8.3 Approving or Rejecting WFH Requests (Managers)
If you manage team members, open the **Pending Approval** tab on the WFH Requests screen. You will see all remote work requests submitted by your team.

1. Review the employee's name, requested date range, total days, and reason.
2. Tap **Approve** to approve the request, or **Reject** to decline it.
3. Add an optional remark if needed, then confirm your decision.

The list will automatically update and notify the employee of your decision.

`[Screenshot: Pending WFH Approval tab]`

## 9. Request a Letter

Open this from the side menu (**Request Letter**) or the Dashboard's "Request a Letter" card. Use this to ask HR for official documents such as a salary certificate, NOC, or experience letter.

`[Screenshot: Request Letter screen]`

1. Tap the **Subject** field and choose the type of letter you need.
2. A starting template for the letter body will be filled in for you — review and edit it as needed in the **Email Body** field.
3. Tap **Send Request**.

You'll see a confirmation once your request has been sent to HR.

## 10. Leave Calendar (Managers Only)

If you manage other employees, you'll see **Leave Calendar** in the side menu. This shows a full-screen, month-by-month calendar of your team's approved leave.

`[Screenshot: Leave Calendar screen]`

- Tap the month/year at the top to jump to a different month.
- Use the department dropdown to filter by team, then tap **Get** to apply it.
- Days with team members on leave are highlighted; tap a day to see exactly who is on leave, or view the full list of leave for the month below the calendar.

## 11. Your Profile

Open this from the side menu (**Profile**) or via **Settings → My Profile**. This screen shows your personal and employment details — it is for viewing only.

`[Screenshot: Profile screen]`

You'll see your photo, name, employee ID, department, and designation at the top, followed by:
- **Personal Information**: Employee ID, Full Name, Date of Birth, Gender, Marital Status, Nationality.
- **Employment Information**: Department, Designation, Date of Joining, Employment Type, Reporting Manager.

If any of your details need to be corrected, please contact HR — this cannot be changed from within the app.

## 12. Settings

Open this from the side menu (**Settings**).

`[Screenshot: Settings screen]`

### 12.1 Preferences
- **App Theme**: toggle the switch to change between Light and Dark mode. This can also be toggled from the bottom of the side menu drawer.
- **Biometric Login (Fingerprint / Face ID)**: toggle the switch to enable or disable biometric sign-in.
  - **Enabling**: When turned on, the app verifies that biometrics are available on your phone and asks you to scan your fingerprint or face to confirm. Once activated, you can use the Biometrics button on the sign-in screen for fast future logins.
  - **Disabling**: Toggle off at any time to remove saved biometric credentials and require manual password entry upon sign-in.

`[Screenshot: Settings screen with Biometric Login toggle]`

### 12.2 Account Services & Password Update
- **My Profile**: opens your Profile screen (see Section 11).
- **Change Password**: tap to update your login password. Enter your Old Password, New Password, and Confirm Password, then tap Update Password.
- **Help & Support**: opens the Help & Support screen (see Section 13).
- **About ESS**: opens the About screen (see Section 14).
- **Log Out**: tap this red button, then confirm, to log out of the app.

## 13. Help & Support

Open this from **Settings → Help & Support**.

`[Screenshot: Help & Support screen]`

- **Call HR Department**: tap to call HR directly from your phone.
- **Email Support**: tap to open your email app with a pre-filled message to the support team.
- **Frequently Asked Questions**: tap any question to expand and read the answer. See Section 15 below for the full list.

## 14. About

Open this from **Settings → About ESS**. This screen shows the app name, version number, a summary of what you can do in the app, and basic app information (name, version, and the type of phone you're using).

`[Screenshot: About screen]`

## 15. Frequently Asked Questions

1. **How do I enable Fingerprint or Face ID login?** Log in with your username and password first. Then go to **Settings → PREFERENCES → Biometric Login**, toggle the switch ON, and scan your fingerprint or face to confirm.
2. **How do I log in using biometrics?** On the sign-in screen, tap the Fingerprint/Face ID icon below the Log In button, then scan your fingerprint or face.
3. **How do I check in and check out when working from home (WFH)?** If you are configured as a WFH employee, your Dashboard will feature a **WFH Attendance Card**. Tap **Check In** when you start work and **Check Out** when you finish. Ensure location (GPS) permissions are granted.
4. **How do I submit a WFH (Work From Home) request?** Open **WFH Requests** from the side menu, tap the **+** button on the **WFH Submitted** tab, pick your From/To dates, select a reason, and tap Submit Request.
5. **How do I apply for leave?** Go to **Leave Request** → **Leave Submitted** tab → tap the **+** button, fill in the form, and submit.
6. **How do I request a certificate or letter?** Go to **Request Letter**, choose a subject, review the letter body, and send it.
7. **How can I see who needs to approve my leave or WFH request?** Open the request from your Leave Submitted or WFH Submitted list and tap the eye icon to view the approval chain.
8. **How do I approve or reject a teammate's leave or WFH request?** Go to **Leave Request** or **WFH Requests** → **Pending Approval** tab, then tap **Approve** or **Reject** on their request.
9. **Where can I see my attendance history?** Open **Attendance** from the side menu, or tap the Attendance Overview card on your Dashboard.
10. **What does "Pending" attendance status mean?** It means that day hasn't happened yet this month, so there's no attendance result recorded for it yet.
11. **How do I check my leave balance?** Tap the Leave Balance card on your Dashboard.
12. **How do I update my profile information?** Profile details can't be edited in the app — please contact HR to make corrections.

## 16. Glossary of Status Labels

**Attendance statuses**:
- **Present**: You were present at work (recorded by biometric scanner or WFH check-in).
- **Absent**: No attendance record was found for a past workday.
- **Pending**: A date later in the current month that hasn't occurred yet.
- **Leave**: You were on approved leave for this date.

**Leave & WFH request statuses**:
- **Pending**: Awaiting review and decision by your manager/approver.
- **Approved**: Request has been reviewed and granted by your manager.
- **Rejected**: Request was declined by your manager.

**Biometric terms**:
- **Fingerprint / Touch ID**: Biometric sensor authentication on Android or supported iOS devices.
- **Face ID**: Facial recognition biometric authentication on supported iOS devices.
