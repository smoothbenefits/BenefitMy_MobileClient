import {
  FontAwesome,
} from '@expo/vector-icons';
import {cacheImages, cacheFonts} from './assetUtilities';

class MainService {
  async loadAndCacheAssetsAsync() {
    const imageAssets = cacheImages([
      require('../assets/images/exponent-wordmark.png'),
      require('../assets/images/exponent-icon.png'),
      require('../assets/images/slack-icon.png'),
      require('../assets/images/wb-text.png'),
      require('../assets/images/wb-logo.png'),
      require('../assets/images/wb-logo-w-text.png'),
      require('../assets/images/wb-logo-w-text-2.png')
    ]);

    const fontAssets = cacheFonts([
      FontAwesome.font,
    ]);

    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ]);
  }
}

export default MainService;
