import { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Dialog } from "@rneui/base";
import { ColorThemeContext } from "../app/index";

const AlertDialog = ({
  visible,
  setVisible,
  alertText,
  alertTitle = "Попередження",
}) => {
  const ColorPalette = useContext(ColorThemeContext);

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={setVisible}
      overlayStyle={[
        styles.window,
        { backgroundColor: ColorPalette.main.buttons_modalBackground },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: 24,
            fontFamily: "KyivTypeTitling-Bold",
            color: ColorPalette.main.darkText,
          },
        ]}
      >
        {alertTitle}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: ColorPalette.main.darkText,
          },
        ]}
      >
        {alertText}
      </Text>
    </Dialog>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  window: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    width: "90%",
    marginVertical: 20,
    fontFamily: "KyivTypeSerif-Heavy",
  },
  buttonContainer: {
    marginVertical: "2%",
    marginHorizontal: 20,
    width: 80,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
