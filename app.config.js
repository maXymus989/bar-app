export default () => ({
  expo: {
    name: "bar-app",
    slug: "bar-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.maxymus989.barapp",
      adaptiveIcon: {
        backgroundColor: "#ffffff",
      },
    },
    web: {},
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/pngwing.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
  },
});
