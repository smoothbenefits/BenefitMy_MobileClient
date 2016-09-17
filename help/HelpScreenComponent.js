import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Modal
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

class HelpScreenComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  _renderLocationServiceInstructionModal() {
    return (
      <Modal
          animationType={"slide"}
          onRequestClose={() => this.props.setLocationServiceInstructionModalVisible(false)}
          transparent={false}
          visible={this.props.locationServiceInstructionModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.topAlignContainer} />
          <View style={styles.centerContainer}>
            <Text style={styles.headerText}>How to turn on location/GPS service?</Text>
            <Text>1. Go to Settings</Text>
            <Text>2. Tap on 'Privacy'</Text>
            <Text>3. Tap on 'Location Service'</Text>
          </View>
          <View style={styles.bottomAlignContainer}>
            <TouchableOpacity
              onPress={() => this.props.setLocationServiceInstructionModalVisible(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.setLocationServiceInstructionModalVisible(true)}
          style={styles.listViewButton}
        >
          <FontAwesome
              name='question-circle'
              size={16}
              style={styles.buttonIconContainer}
          >
            <Text style={styles.listViewButtonText}> How to turn on location/GPS service?</Text>
          </FontAwesome>
        </TouchableHighlight>

        {this._renderLocationServiceInstructionModal()}
      </View>
    );
  }
}

HelpScreenComponent.propTypes = {
  locationServiceInstructionModalVisible: PropTypes.bool.isRequired,
  setLocationServiceInstructionModalVisible: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#E9E7E2'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#AAAAAA'
  },
  topAlignContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bottomAlignContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20
  },
  centerContainer: {
    flex: 11,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
    padding: 10,
    backgroundColor: '#EEEEEE'
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#32c5e6'
  },
  modalButtonText: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
  listViewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#328FE6',
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 10,
    backgroundColor: '#66B2FF'
  },
  listViewButtonText: {
    flex: 1,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff'
  },
  buttonIconContainer: {
    flex: 1,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: '#ffffff',
    padding: 5
  },
  headerText: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    textDecorationLine: 'underline',
    marginBottom: 10
  }
});

export default HelpScreenComponent;
