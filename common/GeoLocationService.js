/**
 * @providesModule GeoLocationService
 */
class GeoLocationService {
  getCurrentPositionCoords() {
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
            reject(error.message);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        );
      }
    );
    return promise;
  }
}

export default GeoLocationService;
