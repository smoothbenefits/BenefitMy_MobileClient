/**
 * @providesModule BrandedNavigationTitle
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import {logOut} from '../user/userUtility';

function renderBrandedNavigationTitle() {
  return (
    <View style={styles.container}>
      <View style={styles.sideContainer} />
      <Image
        resizeMode="contain"
        source={require('../assets/images/wb_logo_w_text_2.png')}
        style={{ width: 655 / 3.0, height: 113 / 3.0 }}
      />
      <View style={styles.sideContainer}>
        <TouchableOpacity
          onPress={logOut}
          style={styles.buttonLogOut}
          underlayColor={'#328FE6'}
        >
          <Text style={styles.label}>
            <FontAwesome
                name='lock'
                size={10}
            />
             Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fefefe'
  },
  sideContainer: {
    width: 60,
    margin: 10
  },
  buttonLogOut: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    backgroundColor: '#32c5e6',
    padding: 2
  },
  label: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff'
  }
});

export default renderBrandedNavigationTitle;
