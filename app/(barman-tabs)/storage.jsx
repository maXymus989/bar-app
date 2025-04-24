import { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { FAB } from "@rneui/base";
import { ColorThemeContext } from "../index";
import StorageItem from "../../Components/StorageItem";
import StorageItemDialog from "../../Components/StorageItemDialog";
import useBarStore from "../../state";

const Storage = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const [addItemDialogVisible, setAddItemDialogVisible] = useState(false);
  const [updateItemDialogVisible, setUpdateItemDialogVisible] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");

  const {
    storage,
    addStorageItem,
    updateStorageItem,
    removeStorageItem,
    isStorageLoaded,
    fetchStorageData,
  } = useBarStore();

  useEffect(() => {
    if (!isStorageLoaded) {
      fetchStorageData();
    }
  }, [isStorageLoaded]);

  const openStorageItemDialog = (storageItemId) => {
    setCurrentItemId(storageItemId);
    setUpdateItemDialogVisible(true);
  };

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}>
        {!isStorageLoaded ? (
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
          storage.map((storageItem, key) => (
            <StorageItem
              storageItemObj={storageItem}
              key={key}
              onDeleteMenuItem={removeStorageItem}
              onStorageItemDialog={openStorageItemDialog}
            />
          ))
        )}
      </ScrollView>
      <FAB
        visible={true}
        icon={{ name: "add" }}
        color={ColorPalette.main.buttons_modalBackground}
        style={styles.FABStyle}
        onPress={() => setAddItemDialogVisible(true)}
      />

      {addItemDialogVisible && (
        <StorageItemDialog
          isVisible={addItemDialogVisible}
          setIsVisible={setAddItemDialogVisible}
          onAddStorageItem={addStorageItem}
        />
      )}

      {updateItemDialogVisible && (
        <StorageItemDialog
          isVisible={updateItemDialogVisible}
          setIsVisible={setUpdateItemDialogVisible}
          isNew={false}
          storageItem={storage.find(
            (storageItem) => storageItem.id === currentItemId
          )}
          onUpdateStorageItem={updateStorageItem}
          onRemoveStorageItem={removeStorageItem}
        />
      )}
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
