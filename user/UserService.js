/**
 * @providesModule UserService
 */

import {checkStatus} from '../common/apiUtils';
import AppSettingsService from '../common/AppSettingsService';

const API_ENDPOINT = '/api/v1/user';

class UserService {
  constructor() {
    let appSettingService = new AppSettingsService();
    this.apiEndPointUrl = appSettingService.getMainAppHostUrl() + API_ENDPOINT;
  }

  getUserDataAsync(userEmail, password) {
    return fetch(this.apiEndPointUrl + '/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': userEmail,
        'password': password
      })
    })
    .then(checkStatus);
  }

}

export default UserService;
