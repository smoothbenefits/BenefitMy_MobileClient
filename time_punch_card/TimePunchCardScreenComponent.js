import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalPicker from 'react-native-modal-picker';

class TimePunchCardScreenComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      projectSelection: null
    };
  }

  _renderMainControl() {
    if (this.props.requiresReload) {
      return (
        <View style={styles.centerAlignContainer}>
          <TouchableOpacity
            onPress={this.props.handleReload}
            style={styles.buttonPunch}
            underlayColor={'#328FE6'}
          >
            <Text style={styles.label}>Reload</Text>
          </TouchableOpacity>
          <Text style={styles.message}>There was possibily a networking issue encountered. Please double check the network connection of the device and use the button above to Reload.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.centerAlignContainer}>
          {this._renderProjectControl()}
          <TouchableOpacity
            onPress={() => this.props.handlePunch(this.state.projectSelection)}
            style={styles.buttonPunch}
            underlayColor={'#328FE6'}
          >
            <Text style={styles.label}>{this.props.punchedIn ? 'Check Out' : 'Check In'}</Text>
          </TouchableOpacity>
          <Text style={styles.message}>{this.props.punchedIn != null ? (this.props.punchedIn ? 'Last Checked-in' : 'Last Checked-out' ) : ''}</Text>
          <Text style={styles.message}>{this.props.lastPunchTime}</Text>
        </View>
      )
    }
  }

  _renderProjectControl() {
    if (this.props.enableProjectSelection) {
      let projectOptions = this.props.projectList.map(
                              (project, i) => {
                                return {
                                  key: i,
                                  label: project.name,
                                  value: project.project_id,
                                  project: project
                                };
                            });
      return (
        <ModalPicker
          data={projectOptions}
          onChange={(option) => this.setState({projectSelection:option.project})}
          style={styles.dropdown}
        >
          <TouchableOpacity
            disabled
            style={styles.dropdownSelection}
          >
            <Text
              numberOfLines={1}
              style={styles.dropdownSelectionText}
            >
              {this.state.projectSelection ? this.state.projectSelection.name : 'Select a Project..'}
            </Text>
          </TouchableOpacity>
        </ModalPicker>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          {this._renderMainControl()}
        </View>
        <Spinner visible={this.props.showSpinner} />
      </View>
    )
  }
}

TimePunchCardScreenComponent.propTypes = {
  punchedIn: PropTypes.bool,
  handlePunch: PropTypes.func.isRequired,
  lastPunchTime: PropTypes.string,
  showSpinner: PropTypes.bool.isRequired,
  requiresReload: PropTypes.bool.isRequired,
  handleReload: PropTypes.func.isRequired,
  projectList: PropTypes.array,
  enableProjectSelection: PropTypes.bool.isRequired
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
    borderColor: '#052F3E',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#052F7E'
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
  },
  dropdown: {
    marginBottom: 10
  },
  dropdownSelection: {
    width: 250,
    padding: 10,
    height: 50,
    borderColor: '#32C5E6',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
  dropdownSelectionText: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#777777'
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

export default TimePunchCardScreenComponent;
