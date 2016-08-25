/**
 * @providesModule AppSettingsService
 */

import appSettingData from '../app_settings.json';

class AppSettingsService {
  getMainAppHostUrl() {
    return appSettingData.mainAppHostUrl;
  }

  getTimeTrackingServiceHostUrl() {
    return appSettingData.timeTrackingServiceHostUrl;
  }
}

export default AppSettingsService;
