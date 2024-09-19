import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();


export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "AppDeliveryReactNative",
  name: "AppDeliveryReactNative",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.optic.appdeliveryreactnative",
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY  
    },
    infoPlist: {
      UIBackgroundModes: [
        "location",
        "fetch"
      ]
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.optic.appdeliveryreactnative",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY 
      }
    },
    permissions: [
      "ACCESS_BACKGROUND_LOCATION"
    ]
  },
});
