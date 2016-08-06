/**
 * @providesModule TimePunchCardService
 */

const API_ENDPOINT = 'http://stage.timetracking.workbenefits.me/api/v1';

class TimePunchCardService {

  createPunchCardAsync() {
    var newCard = this.getNewPunchCardForEmployeeUser(
      {
        'Id': 'stage_BMHT_3_babf7c42f76af6f81486d76ff6e33505',
        'firstName': 'Simon',
        'lastName': 'Cowell',
        'email': 'user3@benefitmy.com'
      },
      'stage_BMHT_1_b457df460695969e8960e3f1623a3ee7'
    );
    return fetch(API_ENDPOINT + '/time_punch_cards', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    });
  }

  getNewPunchCardForEmployeeUser(
      employeeUser,
      companyId) {
      var now = new Date();

      var employee = {
          'personDescriptor': employeeUser.Id,
          'firstName': employeeUser.firstName,
          'lastName': employeeUser.lastName,
          'email': employeeUser.email,
          'companyDescriptor': companyId
      };
      var domainModel = {
        'recordType': 'Work Time',
        'employee': employee,
        'date': now,
        'start': now,
        'attributes': []
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          alert(initialPosition);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      return domainModel;
  }

}

export default TimePunchCardService;
