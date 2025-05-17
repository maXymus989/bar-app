import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Divider, Button } from "@rneui/base";
import { ColorThemeContext } from "./index";
import ConfirmDialog from "../Components/ConfirmDialog";

const BarmenAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [createNewUser, setCreateNewUser] = useState(false);

  const ColorPalette = useContext(ColorThemeContext);

  const dividerWidth = 20;

  useEffect(() => {
    !confirmDialogVisible && createNewUser && console.log("New user created!");
  }, [confirmDialogVisible]);

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
        Будь ласка, авторизуйтесь
      </Text>

      <Divider width={dividerWidth * 5} />

      <Input
        value={username}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        renderErrorMessage={false}
        onChangeText={setUsername}
        placeholder="Назва бару"
      />

      <Divider width={dividerWidth} />

      <Input
        value={password}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        renderErrorMessage={false}
        onChangeText={setPassword}
        placeholder="Пароль"
        secureTextEntry={true}
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
          setConfirmDialogVisible(true);
        }}
      />

      {confirmDialogVisible && (
        <ConfirmDialog
          visible={confirmDialogVisible}
          setVisible={setConfirmDialogVisible}
          confirmationText={
            "Акаунт з цим іменем поки не існує. Створити новий?"
          }
          trueOptionText={"Так"}
          falseOptionText={"Ні"}
          setOption={setCreateNewUser}
        />
      )}
    </View>
  );
};

export default BarmenAuth;

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
    marginTop: "30%",
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
