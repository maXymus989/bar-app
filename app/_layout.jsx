import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  const screenStyle = { headerShown: false, statusBarBackgroundColor: "black" };

  return (
    <Stack>
      <Stack.Screen name="index" options={screenStyle} />
      <Stack.Screen name="(barman-tabs)" options={screenStyle} />
      <Stack.Screen name="barmen_auth" options={screenStyle} />
      <Stack.Screen name="guest_name_page" options={screenStyle} />
      <Stack.Screen name="guest" options={screenStyle} />
      <Stack.Screen name="guest_order" options={screenStyle} />
    </Stack>
  );
};

export default RootLayout;
