import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { ColorThemeContext } from "../index";
import { useContext } from "react";

const Menu = () => {
  const ColorPalette = useContext(ColorThemeContext);

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}></ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  window: {
    alignItems: "center",
  },
});
