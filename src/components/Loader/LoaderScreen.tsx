import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const LoaderScreen = () => {
  return (
    <View style={styles.main}>
      <View style={styles.loader}>
        <LottieView
          style={{ width: 150, height: 150 }}
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
    width: 200,
    height: 200,
    borderRadius: 10,
    // elevation: 7,
    // backgroundColor: 'white',
    alignSelf: 'center',
  },
});
