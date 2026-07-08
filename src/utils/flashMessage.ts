import { showMessage } from 'react-native-flash-message';
import { scale, verticalScale } from './responsive';
import { AppSizes } from './AppSizes';

type FlashType = 'success' | 'danger' | 'warning';

const ACCENT_COLOR: Record<FlashType, string> = {
  success: '#22c55e',
  danger: '#dc2626',
  warning: '#f59e0b',
};

// Renders as a white/card-colored toast with a colored left accent border instead of a
// solid red/green banner, and follows the active theme (light/dark) for background + text.
export const showThemedMessage = (
  colors: any,
  { message, description, type }: { message: string; description?: string; type: FlashType }
) => {
  showMessage({
    message,
    description,
    type,
    color: colors.textPrimary,
    style: {
      backgroundColor: colors.secondPrimaryColor,
      borderLeftWidth: 4,
      borderLeftColor: ACCENT_COLOR[type],
      width: '90%',
      alignSelf: 'center',
      marginTop: verticalScale(80),
      borderRadius: scale(14),
      paddingHorizontal: AppSizes.PH_15,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
  });
};
