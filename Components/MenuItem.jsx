import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "@rneui/base";
import { ColorThemeContext } from "../app/index";

const MenuItem = (props) => {
  const { menuItemObj, onDeleteMenuItem, onMenuItemDialog } = props;

  const ColorPalette = useContext(ColorThemeContext);

  return (
    <Pressable
      style={[
        styles.menuItemBox,
        { backgroundColor: ColorPalette.main.lightText_listItemsBackground },
      ]}
      onLongPress={() => onDeleteMenuItem(menuItemObj.id)}
      onPress={() => onMenuItemDialog(menuItemObj.id)}
    >
      <View style={styles.innerContainer}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          {menuItemObj.image ? (
            <Image
              style={styles.addPhotoContainer}
              source={menuItemObj.image}
              contentFit="cover"
              transition={1000}
            />
          ) : (
            <View
              style={[{ backgroundColor: "white" }, styles.addPhotoContainer]}
            ></View>
          )}
        </View>
        <Text style={styles.menuItemName}>{menuItemObj.name}</Text>
      </View>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItemBox: {
    height: 100,
    width: "95%",
    borderRadius: 10,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  menuItemName: {
    flex: 5,
    fontFamily: "KyivTypeSerif-Heavy",
    fontSize: 18,
  },
  innerContainer: {
    flex: 1,
    margin: "1%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  addPhotoContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});
