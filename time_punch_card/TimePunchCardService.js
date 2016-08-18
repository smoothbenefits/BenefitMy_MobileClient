/**
 * @providesModule TimePunchCardService
 */
import _ from 'underscore';
import {checkStatus} from '../common/apiUtils';

const API_ENDPOINT = 'http://stage.timetracking.workbenefits.me/api/v1';

const DEFAULT_CARD_TYPE = 'Work Time';
const ATTRIBUTE_HOURLY_RATE = 'HourlyRate';

class TimePunchCardService {

  fetchMostRecentInProgessCardAsync(
    userData
  ) {
    return fetch(API_ENDPOINT + '/employee/' + userData.user_id_env_encode + '/time_punch_cards' + '?inprogress=true', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((punchCards) => {
      // Hopefully we only have at most 1 card in-progress at any time
      // But this is not ensured at data layer or server side, and for
      // robustness, we tolerate it by getting the latest one.
      if (punchCards && punchCards.length > 0) {
        let sortedCards = _.sortBy(punchCards, 'createdTimestamp').reverse();
        return sortedCards[0];
      }
      return null;
    });
  }

  markPunchCardComplete(
    punchCard
  ) {
    var cardToUpdate = _.extend(punchCard, {
      inProgress: null,
      end: new Date()
    });
    return fetch(API_ENDPOINT + '/time_punch_cards/' + punchCard._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardToUpdate),
    })
    .then(checkStatus)
    .then((punchCards) => {
      // Due to that punch out time could be spaning over calendar days
      // the server side will return a collection of cards containing
      // 1 or more cards. Here we grab the last one
      if (punchCards && punchCards.length > 0) {
        let sortedCards = _.sortBy(punchCards, 'start').reverse();
        return sortedCards[0]
      }
      return null;
    });
  }

  createPunchCardAsync(
    userData
  ) {
    var newCard = this._getNewPunchCard(
      userData
    );
    return fetch(API_ENDPOINT + '/time_punch_cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
    .then(checkStatus);
  }

  _getNewPunchCard(
      userData
  ) {
      var now = new Date();

      var employee = {
          'personDescriptor': userData.user_id_env_encode,
          'firstName': userData.first_name,
          'lastName': userData.last_name,
          'email': userData.account_email,
          'companyDescriptor': userData.company_id_env_encode
      };

      var attributes = [];
      if (userData.hourly_rate) {
        attributes.push({
          'name': ATTRIBUTE_HOURLY_RATE,
          'value': userData.hourly_rate
        });
      }

      var domainModel = {
        'recordType': DEFAULT_CARD_TYPE,
        'employee': employee,
        'date': now,
        'start': now,
        'attributes': attributes,
        'inProgress': true
      };

      return domainModel;
  }

}

export default TimePunchCardService;
