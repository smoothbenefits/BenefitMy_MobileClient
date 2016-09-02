import {getStore} from '../app/rootStore';

const store = getStore();

export const appFeatures = {
  ProjectManagement: 'ProjectManagement',
  MobileProjectManagement: 'MobileProjectManagement'
}

class AppFeatureService {
  isFeatureEnabled(feature) {
    let state = store.getState();
    if (!state.user.userData || !state.user.userData.app_features_info) {
      // If not logged in, or for whatever reason, user data is not available
      // just assume feature on for simplicity for now.
      return true;
    }

    return state.user.userData.app_features_info[feature];
  }
}

export default AppFeatureService;
