import { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { Input, Divider, Button } from "@rneui/base";
import { ColorThemeContext } from "./index";
import AlertDialog from "../Components/AlertDialog";
import useBarStore from "../state";

const GuestNamePage = () => {
  const [username, setUsername] = useState("");

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const ColorPalette = useContext(ColorThemeContext);

  const dividerWidth = 20;

  const { setGuestUsername } = useBarStore();

  const printAlert = (text) => {
    setAlertText(text);
    setShowAlert(true);
  };

  const isValidName = (name) => {
    if (typeof name !== "string") return false;

    name = name.trim();

    if (name.length === 0 || name.length > 20) return false;

    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/u;

    return nameRegex.test(name);
  };

  return (
    <View
      style={[
        styles.window,
        { backgroundColor: ColorPalette.main.background_modalButtons },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: ColorPalette.main.lightText_listItemsBackground,
          },
        ]}
      >
        Введіть Ваше ім'я для замовлень
      </Text>

      <Divider width={dividerWidth * 5} />

      <Input
        value={username}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        renderErrorMessage={false}
        onChangeText={setUsername}
        placeholder="Ваше ім'я"
      />

      <Divider width={dividerWidth * 4} />

      <Button
        title={"Увійти"}
        buttonStyle={{
          backgroundColor: ColorPalette.main.buttons_modalBackground,
        }}
        titleStyle={{
          color: ColorPalette.main.darkText,
          fontFamily: "KyivTypeSerif-Heavy",
          fontSize: 24,
        }}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          if (isValidName(username)) {
            setGuestUsername(username);
            router.push("/guest");
          } else {
            printAlert("Неправильний формат введення імені!");
          }
        }}
      />

      {showAlert && (
        <AlertDialog
          visible={showAlert}
          setVisible={setShowAlert}
          alertText={alertText}
        />
      )}
    </View>
  );
};

export default GuestNamePage;

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
  },
  flex2: {
    flex: 2,
  },
  containerStyle: {
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    marginHorizontal: 50,
    borderBottomWidth: 0,
  },
  inputStyle: {
    backgroundColor: "white",
    fontFamily: "KyivTypeSerif-Heavy",
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
    marginTop: "60%",
    width: "90%",
    fontFamily: "KyivTypeTitling-Bold",
  },
  buttonContainer: {
    marginVertical: "2%",
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
