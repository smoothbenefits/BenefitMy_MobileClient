/**
 * @providesModule GeoLocationService
 */
import {Platform} from 'react-native';
import {Permissions} from 'exponent';

class GeoLocationService {

  async getCurrentPositionCoordsAsync() {
    // First check whether our APP has permissions to access location service,
    // before even talking about whether the location service is on or not.
    let hasPermission = await this._getLocationPermissionEnabledAsync();
    if (!hasPermission) {
      let err = new Error('The app requires location/GPS service to work properly. Please ensure it is turned on. (Please refer to Help tab for instructions.)');
      err.doNotMaskMessage = true;
      throw err;
    }

    let promise = new Promise(
      function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            let err = new Error('The app requires location/GPS service to work properly. Please ensure it is turned on. (Please refer to Help tab for instructions.)');
            err.doNotMaskMessage = true;
            reject(err);
          }
        );
      }
    );

    return promise;
  }

  async _getLocationPermissionEnabledAsync() {
    // Utilize the exponent's permission utility to prompt user
    // to grant permissions for the APP to access device's Location
    // service, if it is not granted yet.
    // Note: This has nothing to do with the turning on/off location
    //       service or GPS for the device or the APP.
    let {status} = await Permissions.askAsync(Permissions.LOCATION);

    // It is super weird that the above Perimissions prompt does not work for
    // older version of Android, and always returns "denied"...
    // To workaround the issue, given the observation that our happen always
    // already have the permission, just return true for lower version of Android
    if (status === 'granted' || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    return false;
  }

}

export default GeoLocationService;
