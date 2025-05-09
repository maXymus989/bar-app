import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useEffect(() => {
    const prepare = async () => {
      // Тут ти можеш завантажити шрифти або інші ресурси

      // ✅ Після всього — сховай splash
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          statusBarBackgroundColor: "black",
        }}
      />
      <Stack.Screen name="(barman-tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
