// export const getColors = (theme: string) => {
//   const isDark = theme === 'dark';

//   return {
//     primaryColor: isDark ? '#000000' : '#f0f2f2',

//     secondPrimaryColor: isDark ? '#161719' : '#ffffff',

//     grayColor1: isDark ? '#b5b5c3' : '#2d3748',

//     grayColor2: isDark ? '#8daac6' : '#4a5568',

//     purple1: '#0c59df',

//     borderColor: isDark ? '#5C607B' : '#cbd5e0',

//     whiteColor1: isDark ? '#ffffffd9' : '#1a202c',

//     lightPurple: '#648fa8',

//     redColor: isDark ? '#dc3545' : '#e32134',

//     textPrimary: isDark ? '#ffffff' : '#1a202c',

//     textSecondary: isDark ? '#73737a' : '#757d8a',
//   };
// };

export const getColors = (theme: string) => {
  const isDark = theme === 'dark';

  return {
    // Main application canvas background
    primaryColor: isDark ? '#0b131f' : '#f4f7fa',

    // Card/Container backgrounds
    secondPrimaryColor: isDark ? '#111c2a' : '#ffffff',

    // Primary Text (Main headings, bold numbers)
    textPrimary: isDark ? '#ffffff' : '#111827',

    // Secondary Text (Subheadings, dates, descriptions)
    textSecondary: isDark ? '#8a99ad' : '#6b7280',

    // Main brand color (Top header in light mode, primary buttons/icons)
    purple1: '#0062e3',

    primarayheaderColor: isDark ? '#081f48' : "#0062e3",

    lightPurple: isDark ? '#1e2d42' : '#e6f0fe',

    // Borders and subtle divider lines
    borderColor: isDark ? '#1e293b' : '#bfc0c4',

    // Status Colors (Sampled directly from the indicators/badges)
    greenColor: isDark ? '#10b981' : '#22c55e',  // Present / Approved
    orangeColor: isDark ? '#f59e0b' : '#f59e0b', // Late / Pending
    redColor: isDark ? '#ef4444' : '#dc2626',    // Absent / Rejected

    // Status pill backgrounds/text (soft pastel in light mode, solid fill in dark mode)
    successBg: isDark ? '#16a34a' : '#E6F7ED',
    successText: isDark ? '#ffffff' : '#16a34a',
    warningBg: isDark ? '#d97706' : '#FFF3E0',
    warningText: isDark ? '#ffffff' : '#b45309',
    dangerBg: isDark ? '#dc2626' : '#FDECEA',
    dangerText: isDark ? '#ffffff' : '#dc2626',
    neutralBg: isDark ? '#475569' : '#F1F1F4',
    neutralText: isDark ? '#ffffff' : '#6b7280',

    // Soft, theme-adaptive tint backgrounds for icon chips (alpha blends with the surface behind it)
    greenTint: 'rgba(34, 197, 94, 0.16)',
    orangeTint: 'rgba(245, 158, 11, 0.16)',
    redTint: 'rgba(239, 68, 68, 0.16)',
    blueTint: 'rgba(33, 150, 243, 0.16)',
    whiteGlass :isDark?'rgba(12, 12, 12, 0.23)':'rgba(255, 255, 255, 1)',

    // Additional UI specific colors mapping to your original properties
    grayColor1: isDark ? '#475569' : '#94a3b8',
    grayColor2: isDark ? '#334155' : '#cbd5e1',
    whiteColor1: isDark ? '#ffffff' : '#ffffff',
  };
};