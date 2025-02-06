import { Text, View, StyleSheet } from "react-native";
import { createContext } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const ColorPalette = require("../assets/color_palette.json");
const ColorThemeContext = createContext(ColorPalette);

const Index = () => {
  const [loaded, error] = useFonts({
    "KyivTypeTitling-Bold": require("../assets/fonts/KyivTypeTitling-Bold.ttf"),
  });

  if (!loaded) {
    <AppLoading />;
  }

  if (error) {
    console.log(error.message);
  }

  return (
    <View
      style={[
        styles.window,
        { backgroundColor: ColorPalette.main.background_modalButtons },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: ColorPalette.main.lightText_listItemsBackground,
            fontFamily: "KyivTypeTitling-Bold",
          },
        ]}
      >
        Вітаємо в закладі, оберіть Вашу роль
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 36,
    marginTop: "30%",
  },
});

export default Index;
export { ColorThemeContext };
