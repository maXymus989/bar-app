import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";

const Storage = () => {
  const ColorPalette = useContext(ColorThemeContext);

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}></ScrollView>
      <FAB
        visible={true}
        icon={{ name: "add" }}
        color={ColorPalette.main.buttons_modalBackground}
        style={styles.FABStyle}
      />
    </View>
  );
};

export default Storage;

const styles = StyleSheet.create({
  window: {
    alignItems: "center",
  },
  FABStyle: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
