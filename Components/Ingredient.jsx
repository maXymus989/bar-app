import { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Input } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import { ColorThemeContext } from "../app/index";
import Checkbox from "expo-checkbox";

const Ingredient = ({ item, onDelete }) => {
  const [isChecked, setChecked] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "мл", value: "en" },
    { label: "шт", value: "de" },
  ]);

  const ColorPalette = useContext(ColorThemeContext);

  return (
    <TouchableOpacity
      style={styles.ingredientContainer}
      onLongPress={() => onDelete(item.id)}
    >
      <Input
        value={item.name ? item.name : ""}
        containerStyle={[styles.flex2, styles.inputContainerStyle]}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={styles.inputStyle}
        renderErrorMessage={false}
        placeholder="Назва"
      />
      <Input
        value={item.quantity ? item.quantity : ""}
        containerStyle={[styles.flex1, styles.inputContainerStyle]}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={styles.inputStyle}
        renderErrorMessage={false}
        placeholder="0"
      />
      <View
        style={[
          styles.flex1,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <DropDownPicker
          listMode="MODAL"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          textStyle={{ fontSize: 12 }}
          arrowIconStyle={{ width: 10 }}
          placeholder={item.units ? item.units : "-"}
          style={[
            styles.dropDownStyle,
            {
              backgroundColor: ColorPalette.main.grey,
            },
          ]}
          tickIconStyle={{ width: 0 }}
          dropDownContainerStyle={{
            backgroundColor: ColorPalette.main.grey,
            borderWidth: 1,
          }}
        />
      </View>

      <View
        style={[
          styles.flex1,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Checkbox
          style={[styles.checkbox]}
          value={isChecked}
          color={isChecked ? "#000" : undefined}
          onValueChange={setChecked}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Ingredient;

const styles = StyleSheet.create({
  ingredientContainer: {
    width: "100%",
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  text: {
    textAlign: "center",
    fontFamily: "KyivTypeSerif-Medium",
    fontSize: 10,
  },
  dropDownStyle: {
    width: "90%",
    paddingHorizontal: 4,
    paddingVertical: 0,
    minHeight: 0,
    borderWidth: 0,
    borderRadius: 0,
  },
  inputContainerStyle: {
    justifyContent: "center",
    minHeight: 0,
    paddingHorizontal: 0,
  },
  inputStyle: {
    backgroundColor: "white",
    fontFamily: "KyivTypeSerif-Medium",
    paddingHorizontal: 0,
    minHeight: 0,
    fontSize: 10,
    textAlign: "center",
  },
  checkbox: {
    backgroundColor: "white",
  },
});
