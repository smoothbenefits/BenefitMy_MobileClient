import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreenComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  _renderLoginFailureMessage() {
    if (this.props.lastLoginFailed) {
      return (
        <Text
          style={styles.warnText}
        >
          Your last sign in attempt was not successful. Please double check your credentials entered and try again.
        </Text>
      );
    }
  }

  render() {
    let logView;
    if (this.props.userData) {
      logView = (
        <View style={styles.topAlignContainer}>
          <TouchableOpacity
            onPress={this.props.handleLogOut}
            style={styles.buttonLogin}
            underlayColor={'#328FE6'}
          >
            <Text style={styles.label}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      logView = (
        <View style={styles.topAlignContainer}>
          {this._renderLoginFailureMessage()}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            maxLength={40}
            multiline={false}
            onChangeText={this.props.handleUserEmailUpdate}
            placeholder={'Enter Account Email'}
            style={styles.input}
            value={this.props.currentUserEmail}
          />
          <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              maxLength={30}
              multiline={false}
              onChangeText={this.props.handlePasswordUpdate}
              placeholder={'Enter Password'}
              secureTextEntry
              style={styles.input}
          />
          <TouchableOpacity
            onPress={this.props.handleLogIn}
            style={styles.buttonLogin}
            underlayColor={'#328FE6'}
          >
            <FontAwesome
                name='lock'
                size={20}
                style={styles.labelIconContainer}
            >
              <Text style={styles.label}> Sign In</Text>
            </FontAwesome>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.centerAlignContainer}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/wb-logo-w-text.png')}
              style={{ width: 655 / 2.0, height: 226 / 2.0 }}
            />
          </View>
          {logView}
        </View>
        <KeyboardSpacer />
        <Spinner visible={this.props.showSpinner} />
      </View>
    );
  }
}

LoginScreenComponent.propTypes = {
  userData: PropTypes.object,
  lastLoginFailed: PropTypes.bool.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleUserEmailUpdate: PropTypes.func.isRequired,
  handlePasswordUpdate: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  currentUserEmail: PropTypes.string
};

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
    alignItems: 'center'
  },
  topAlignContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  labelIconContainer: {
    width: 230,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#ffffff'
  },
  warnText: {
    width: 230,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#ee2222'
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

export default LoginScreenComponent;
