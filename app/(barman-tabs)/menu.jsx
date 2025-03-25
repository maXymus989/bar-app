import { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";
import MenuItemDialog from "../../Components/MenuItemDialog";
import MenuItem from "../../Components/MenuItem";
import useBarStore from "../../state";

const Menu = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const { menu, addMenuItem, updateMenuItem, removeMenuItem } = useBarStore();
  const [currentItemId, setCurrentItemId] = useState("");
  useEffect(() => {
    console.log(menu);
  }, [menu]);

  const openMenuItemDialog = (menuItemId) => {
    setCurrentItemId(menuItemId);
    setUpdateModalVisible(true);
    console.log(menuItemId);
  };

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}>
        {menu.map((menuItem, key) => (
          <MenuItem
            menuItemObj={menuItem}
            key={key}
            onDeleteMenuItem={removeMenuItem}
            onMenuItemDialog={openMenuItemDialog}
          />
        ))}
      </ScrollView>

      <FAB
        visible={true}
        icon={{ name: "add" }}
        color={ColorPalette.main.buttons_modalBackground}
        style={styles.FABStyle}
        onPress={() => {
          setAddModalVisible(true);
        }}
      />

      {addModalVisible && (
        <MenuItemDialog
          isVisible={addModalVisible}
          setIsVisible={setAddModalVisible}
          onAddMenuItem={addMenuItem}
        />
      )}

      {updateModalVisible && (
        <MenuItemDialog
          isVisible={updateModalVisible}
          setIsVisible={setUpdateModalVisible}
          isNew={false}
          menuItem={menu.find((menuItem) => menuItem.id === currentItemId)}
          onUpdateMenuItem={updateMenuItem}
          onRemoveMenuItem={removeMenuItem}
        />
      )}
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
