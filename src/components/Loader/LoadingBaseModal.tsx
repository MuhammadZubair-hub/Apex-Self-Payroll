import { ActivityIndicator, Modal, View } from 'react-native';
// import { useTheme } from '../../theme/ThemeContex';
// import LottieView from 'lottie-react-native';
import { AppSizes } from '../../utils/AppSizes';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';

interface LoadingModalProps {
  visible: boolean;
}
const LoadingBaseModal = ({ visible = false }: LoadingModalProps) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme); 
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colors.secondPrimaryColor,
            borderColor: colors.borderColor,
            // shadowColor: colors.secondary,
            borderRadius: AppSizes.Z_10,
            shadowOpacity: 0.9,
            // elevation: 9,
            padding: AppSizes.MH_15,
            width: '45%',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'large'} color={colors.purple1} />
          {/* <LottieView
            resizeMode="cover"
            source={require('./LoadingSquare.json')}
            style={{ height: 120, width: 120, alignSelf: 'center' }}
            autoPlay
            loop
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingBaseModal;
