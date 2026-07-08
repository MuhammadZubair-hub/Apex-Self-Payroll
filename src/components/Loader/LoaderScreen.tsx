import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { AppSizes } from '../../utils/AppSizes';
const LoaderScreen = () => {
  return (
    <View style={styles.main}>
      <View style={styles.loader}>
        <LottieView
          style={{ width: AppSizes.W_150, height: AppSizes.H_150 }}
          // source={require('./NewLoader.json')}
          source={require('./LoadingSquare.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: AppSizes.W_200,
    height: AppSizes.H_200,
    borderRadius: AppSizes.RADIUS_10,
    // elevation: 7,
    // backgroundColor: 'white',
    alignSelf: 'center',
  },
});
