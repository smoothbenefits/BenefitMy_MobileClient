/**
 * @providesModule BrandedNavigationTitle
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

function renderBrandedNavigationTitle() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/images/logo_transparent.png')}
        style={{ width: 655 / 3.0, height: 113 / 3.0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default renderBrandedNavigationTitle;
