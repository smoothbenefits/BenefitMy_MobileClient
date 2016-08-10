import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

class TimePunchCardScreenComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.centerAlignContainer}>
            <TouchableOpacity
              onPress={this.props.handlePunch}
              style={styles.buttonPunch}
              underlayColor={'#328FE6'}
            >
              <Text style={styles.label}>{this.props.punchedIn ? 'Punch Out' : 'Punch In'}</Text>
            </TouchableOpacity>
            <Text style={styles.message}>{this.props.punchedIn != null ? (this.props.punchedIn ? 'Last Punched-in' : 'Last Punched-out' ) : ''}</Text>
            <Text style={styles.message}>{this.props.lastPunchTime}</Text>
          </View>
        </View>
      </View>
    )
  }
}

TimePunchCardScreenComponent.propTypes = {
  punchedIn: PropTypes.bool,
  handlePunch: PropTypes.func.isRequired,
  lastPunchTime: PropTypes.string
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

export default TimePunchCardScreenComponent;
