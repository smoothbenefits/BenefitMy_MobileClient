/**
 * @providesModule GeoLocationService
 */
class GeoLocationService {

  getCurrentPositionCoordsAsync() {
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
            let err = new Error('The app requires location/GPS service to work properly. Please ensure it is turned on.');
            err.doNotMaskMessage = true;
            reject(err);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        );
      }
    );

    return promise;
  }

}

export default GeoLocationService;
