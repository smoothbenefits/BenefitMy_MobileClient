/**
 * @providesModule TimePunchCardScreen
 */

import React from 'react';
import {
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import BrandedNavigationTitle from 'BrandedNavigationTitle';

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
      confirmedUsername: ''
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text})}
            placeholder={'Enter User Name'}
            maxLength={12}
            multiline={false}
            />

          <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
              placeholder={'Enter Password'}
              maxLength={12}
              multiline={false}
              secureTextEntry={true}
              />

          <TouchableHighlight
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={this._handlePressLogin}
            >
            <Text style={styles.label}>LOGIN</Text>
          </TouchableHighlight>

          <Text>Logged in as: {this.state.confirmedUsername}</Text>
        </View>
      </View>
    );
  }

  _handlePressLogin = () => {
    this.setState({ confirmedUsername: this.state.username })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#E9E7E2'
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 10,
    marginTop: 10
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#32c5e6'
  },
  label: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  }
});
