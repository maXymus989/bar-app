import { useContext } from "react";
import { Text, Pressable, StyleSheet, View, ScrollView } from "react-native";
import { Button, Dialog, Divider, Input } from "@rneui/base";
import { ColorThemeContext } from "../app/index";

/**
 * Custom Dialog based on RNE Dialog.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isVisible - Is visible state.
 * @param {function} props.setIsVisible - Function to set state of visibility.
 * @param {boolean} [props.isNew = true] - If true - renders one button, if false - two.
 * @param {string?} props.image - Puts image of beverage.
 * @param {string?} props.name - Beverage name.
 * @param {React.ReactNode} props.children - Puts children in ScrollView.
 * @returns {JSX.Element} - Returns dialog.
 */
const MenuItemDialog = ({
  isVisible,
  setIsVisible,
  isNew = true,
  image,
  name,
  children,
}) => {
  const ColorPalette = useContext(ColorThemeContext);
  const dividerWidth = 10;
  const textColor = { color: ColorPalette.main.darkText };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      overlayStyle={[
        styles.dialogWindow,
        {
          backgroundColor: ColorPalette.main.buttons_modalBackground,
        },
      ]}
      animationType="fade"
    >
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? "grey" : "white" },
          styles.addPhotoContainer,
        ]}
      >
        <Text style={[styles.text, textColor]}>Додати фото</Text>
      </Pressable>
      <Divider width={dividerWidth} />
      <Input
        placeholder="Назва напою"
        value={name}
        inputStyle={{
          backgroundColor: "white",
          fontFamily: "KyivTypeSerif-Heavy",
          fontSize: 14,
        }}
      />
      <Text style={[styles.text, textColor]}>Інгридієнти</Text>
      <View style={styles.textRow}>
        <Text style={[styles.text, styles.flex2, textColor, { fontSize: 8 }]}>
          Назва
        </Text>
        <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
          Кількість
        </Text>
        <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
          Одиниці
        </Text>
        <Text style={[styles.text, styles.flex1, textColor, { fontSize: 8 }]}>
          Перевіряти наявність
        </Text>
      </View>
      <View style={[styles.ingredientContainer]}>
        <ScrollView>{children}</ScrollView>
      </View>
      <Button
        title={"+"}
        containerStyle={styles.addButtonContainer}
        buttonStyle={styles.addButton}
        titleStyle={textColor}
        type="outline"
      />
      <Divider width={dividerWidth} />
      {isNew ? (
        <Button
          title={"Додати"}
          buttonStyle={{
            backgroundColor: ColorPalette.main.background_modalButtons,
          }}
          titleStyle={[
            {
              color: ColorPalette.main.lightText_listItemsBackground,
            },
            styles.text,
          ]}
          containerStyle={[styles.buttonContainer, { width: "50%" }]}
        />
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Button
            title={"Зберегти"}
            buttonStyle={{
              backgroundColor: ColorPalette.main.background_modalButtons,
            }}
            titleStyle={[
              {
                color: ColorPalette.main.lightText_listItemsBackground,
              },
              styles.text,
            ]}
            containerStyle={[styles.buttonContainer, styles.buttonMargin]}
          />
          <Button
            title={"Видалити"}
            buttonStyle={{
              backgroundColor: ColorPalette.main.notButtons,
            }}
            titleStyle={[
              {
                color: "black",
              },
              styles.text,
            ]}
            containerStyle={[styles.buttonContainer, styles.buttonMargin]}
          />
        </View>
      )}
    </Dialog>
  );
};

export default MenuItemDialog;

const styles = StyleSheet.create({
  dialogWindow: {
    alignItems: "center",
  },
  addPhotoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "KyivTypeSerif-Heavy",
    textAlign: "center",
    fontSize: 14,
  },
  textRotated: {
    transform: [{ rotate: "90deg" }],
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  ingredientContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
  },
  addButtonContainer: {
    width: "100%",
    height: 30,
  },
  addButton: {
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginVertical: "2%",
    borderRadius: 5,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonMargin: {
    marginHorizontal: "5%",
  },
});
