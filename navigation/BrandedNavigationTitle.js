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
import Dimensions from 'Dimensions';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import {logOut} from '../user/userUtility';

function renderBrandedNavigationTitle() {
  // Compute the banner image size
  let screenWidth = Dimensions.get('window').width;
  let imgWidth = screenWidth - 90*2; // The center potion of the banner area
  let imgHeight = imgWidth / 400.0 * 80;

  return (
    <View style={styles.container}>
      <View style={styles.sideContainer} />
      <Image
        resizeMode="contain"
        source={require('../assets/images/wb-logo-w-text-2.png')}
        style={{ width: imgWidth, height: imgHeight }}
      />
      <View style={styles.sideContainer}>
        <TouchableOpacity
          onPress={logOut}
          style={styles.buttonLogOut}
          underlayColor={'#328FE6'}
        >
          <FontAwesome
              name='lock'
              size={10}
              style={styles.labelIconContainer}
          >
            <Text style={styles.label}> Sign Out</Text>
          </FontAwesome>
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
  },
  labelIconContainer: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff'
  }
});

export default renderBrandedNavigationTitle;
