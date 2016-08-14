/**
 * @providesModule UserService
 */

const API_ENDPOINT = 'http://staging.workbenefits.me/api/v1/user';

class UserService {

  getUserDataAsync(userEmail, password) {
    return fetch(API_ENDPOINT + '/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': userEmail,
        'password': password
      })
    });
  }

}

export default UserService;
