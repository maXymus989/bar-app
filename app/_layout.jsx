import { Stack } from "expo-router";

const RootLayout = () => {
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
