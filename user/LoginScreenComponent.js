import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';

class LoginScreenComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let logView;
    if (this.props.isLoggedIn) {
      logView = (
        <View style={styles.centerAlignContainer}>
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
        <View style={styles.centerAlignContainer}>
          <TextInput
            maxLength={12}
            multiline={false}
            placeholder={'Enter User Name'}
            style={styles.input}
          />
          <TextInput
              maxLength={12}
              multiline={false}
              placeholder={'Enter Password'}
              secureTextEntry
              style={styles.input}
          />
          <TouchableOpacity
            onPress={this.props.handleLogIn}
            style={styles.buttonLogin}
            underlayColor={'#328FE6'}
          >
            <Text style={styles.label}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          {logView}
        </View>
      </View>
    );
  }
}

LoginScreenComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired
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

export default LoginScreenComponent;
