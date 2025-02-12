import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";
import MenuItemDialog from "../../Components/MenuItemDialog";

const Menu = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

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
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <MenuItemDialog isVisible={modalVisible} setIsVisible={setModalVisible} />
    </View>
  );
};

export default Menu;

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
