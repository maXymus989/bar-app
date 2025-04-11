import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import { ColorThemeContext } from "../app/index";

const StorageItem = (props) => {
  const { storageItemObj, onStorageItemDialog } = props;
  const fontName = "KyivTypeSerif-Heavy";

  const ColorPalette = useContext(ColorThemeContext);

  return (
    <Pressable
      style={[
        styles.storageItemBox,
        { backgroundColor: ColorPalette.main.lightText_listItemsBackground },
      ]}
      onPress={() => onStorageItemDialog(storageItemObj.id)}
    >
      <View style={styles.innerContainer}>
        <View>
          <View
            style={{ flex: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={[
                {
                  fontFamily: fontName,
                  fontSize: 20,
                  textAlign: "center",
                },
              ]}
            >
              {storageItemObj.name}
            </Text>
          </View>

          <Text style={[{ fontFamily: fontName, fontSize: 14, flex: 1 }]}>
            {"Об'єм: " + storageItemObj.volume + " л"}
          </Text>
          <Text style={[{ fontFamily: fontName, fontSize: 14, flex: 1 }]}>
            {"Тип: " + storageItemObj.type}
          </Text>
        </View>
        <View>
          <Text style={[{ fontFamily: fontName, fontSize: 18 }]}>
            {storageItemObj.price + " грн"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default StorageItem;

const styles = StyleSheet.create({
  storageItemBox: {
    height: 100,
    width: "95%",
    borderRadius: 10,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  storageItemName: {
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
});
