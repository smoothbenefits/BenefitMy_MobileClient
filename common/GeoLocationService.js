/**
 * @providesModule GeoLocationService
 */
 import {Permissions} from 'exponent';

class GeoLocationService {

  async getCurrentPositionCoordsAsync() {
    let promise = new Promise(
      async function(resolve, reject) {
        // First utilize the exponent's permission utility to prompt user
        // to grant permissions for the APP to access device's Location
        // service, if it is not granted yet.
        // Note: This has nothing to do with the turning on/off location
        //       service or GPS for the device or the APP. 
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
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
        } else {
          let err = new Error('The app requires location/GPS service to work properly. Please ensure it is turned on. (Please refer to Help tab for instructions.)');
          err.doNotMaskMessage = true;
          reject(err);
        }
      }
    );

    return promise;
  }

}

export default GeoLocationService;
