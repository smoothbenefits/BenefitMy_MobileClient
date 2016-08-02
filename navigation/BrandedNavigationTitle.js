/**
 * @providesModule BrandedNavigationTitle
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo_transparent.png')}
        style={{ width: 655 / 3.0, height: 113 / 3.0 }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
