import { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";
import MenuItemDialog from "../../Components/MenuItemDialog";
import MenuItem from "../../Components/MenuItem";
import useBarStore from "../../state";

const Menu = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const {
    menu,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    isMenuLoaded,
    fetchMenuData,
  } = useBarStore();
  const [currentItemId, setCurrentItemId] = useState("");
  useEffect(() => {
    console.log(menu);
  }, [menu]);

  useEffect(() => {
    if (!isMenuLoaded) {
      fetchMenuData();
    }
  }, [isMenuLoaded]);

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
        {!isMenuLoaded ? (
          <Text
            style={{
              color: "white",
              fontFamily: "KyivTypeSerif-Heavy",
              fontSize: 20,
            }}
          >
            Завантаження...
          </Text>
        ) : (
          menu.map((menuItem, key) => (
            <MenuItem
              menuItemObj={menuItem}
              key={key}
              onMenuItemDialog={openMenuItemDialog}
            />
          ))
        )}
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
    paddingBottom: 10,
  },
  FABStyle: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
