/**
 * @providesModule TimePunchCardScreen
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

import TimePunchCardService from 'TimePunchCardService';

export default class TimePunchCardScreen extends React.Component {
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
      loggedIn: false,
      punchedIn: null,
      lastPunchTime: null
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

  _handlePunch = () => {
    this.state.punchedIn ? this._punchOut() : this._punchIn();
  }

  _punchIn = () => {
    var service = new TimePunchCardService();
    service.createPunchCardAsync().then(() => {
      this.setState({
        punchedIn: true,
        lastPunchTime: new Date().toLocaleString() });
    });
  }

  _punchOut = () => {
    this.setState({
      punchedIn: false,
      lastPunchTime: new Date().toLocaleString() });
    alert('Punched Out!');
  }

  render() {
    let loginView = (
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
      </View>
    )

    let loggedInView = (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.centerAlignContainer}>
            <TouchableOpacity
              onPress={this._handlePunch}
              style={styles.buttonPunch}
              underlayColor={'#328FE6'}
            >
              <Text style={styles.label}>{this.state.punchedIn ? 'Punch Out' : 'Punch In'}</Text>
            </TouchableOpacity>
            <Text style={styles.message}>{this.state.punchedIn != null ? (this.state.punchedIn ? 'Last Punched-in' : 'Last Punched-out' ) : ''}</Text>
            <Text style={styles.message}>{this.state.lastPunchTime}</Text>
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
    )

    let viewToUse = this.state.loggedIn ? loggedInView : loginView

    return (
      viewToUse
    )
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
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#32c5e6'
  },
  buttonPunch: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 64,
    borderColor: '#6E8E4B',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#6EBE4B'
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
  message: {
    marginTop: 10,
    width: 230,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#555555'
  }
});
