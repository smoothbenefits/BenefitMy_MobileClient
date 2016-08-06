/**
 * @providesModule LoginScreen
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';

import BrandedNavigationTitle from 'BrandedNavigationTitle';

class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      renderTitle: () => <BrandedNavigationTitle />,
    },
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
      loggedIn: null
    };
  }

  _handleUserNameUpdate = (text) => {
    this.setState({ username: text });
  }

  _handlePasswordUpdate = (text) => {
    this.setState({ password: text });
  }

  _handlePressLogin = () => {
    this.setState({ loggedIn: true });
  }

  _handlePressLogout = () => {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.centerAlignContainer}>
            <TextInput
              maxLength={12}
              multiline={false}
              onChangeText={this._handleUserNameUpdate}
              placeholder={'Enter User Name'}
              style={styles.input}
              value={this.state.username}
            />

            <TextInput
                maxLength={12}
                multiline={false}
                onChangeText={this._handlePasswordUpdate}
                placeholder={'Enter Password'}
                secureTextEntry
                style={styles.input}
                value={this.state.password}
            />

            <TouchableOpacity
              onPress={this._handlePressLogin}
              style={styles.buttonLogin}
              underlayColor={'#328FE6'}
            >
              <Text style={styles.label}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={this._handlePressLogout}
            style={styles.buttonLogin}
            underlayColor={'#328FE6'}
          >
            <Text style={styles.label}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#E9E7E2'
  },
  centerContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20
  },
  centerAlignContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  input: {
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: '#32C5E6',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginTop: 10
  },
  label: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#32c5e6'
  }
});

export default LoginScreen;
