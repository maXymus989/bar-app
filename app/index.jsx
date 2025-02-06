import { Text, View, StyleSheet } from "react-native";
import { createContext } from "react";

const ColorPalette = require("../assets/color_palette.json");
const ColorThemeContext = createContext(ColorPalette);

const Index = () => {
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
          { color: ColorPalette.main.lightText_listItemsBackground },
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
    fontWeight: "bold",
    fontSize: 36,
    marginTop: "30%",
    fontFamily: "monospace",
  },
});

export default Index;
export { ColorThemeContext };
