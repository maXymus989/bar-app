import { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";
import MenuItemDialog from "../../Components/MenuItemDialog";
import MenuItem from "../../Components/MenuItem";

const Menu = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [currentItemId, setCurrentItemId] = useState("");
  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  const addMenuItem = (menuItem) => {
    console.log(menuItem);
    setMenuItems((prevState) => [...prevState, menuItem]);
  };

  const removeMenuItem = (menuItemId) => {
    setMenuItems((prevState) =>
      prevState.filter((menuItem) => menuItem.id !== menuItemId)
    );
  };

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
        {menuItems.map((menuItem, key) => (
          <MenuItem
            menuItemObj={menuItem}
            key={key}
            onDeleteMenuItem={removeMenuItem}
            onUpdateMenuItem={openMenuItemDialog}
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
          menuItem={menuItems.find((menuItem) => menuItem.id === currentItemId)}
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
