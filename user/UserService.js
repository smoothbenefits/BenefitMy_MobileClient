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

  async getUserDataAsync(userEmail, password) {
    let response = await fetch(this.apiEndPointUrl + '/auth', {
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
    return response;
  }
}

export default UserService;
