import { createContext } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "@rneui/base";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import "expo-router/entry";

const ColorPalette = require("../assets/color_palette.json");
const ColorThemeContext = createContext(ColorPalette);

const Index = () => {
  const [loaded, error] = useFonts({
    "KyivTypeTitling-Bold": require("../assets/fonts/KyivTypeTitling-Bold.ttf"),
    "KyivTypeSerif-Heavy": require("../assets/fonts/KyivTypeSerif-Heavy.ttf"),
    "KyivTypeSerif-Medium": require("../assets/fonts/KyivTypeSerif-Medium.ttf"),
  });

  const router = useRouter();

  if (!loaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

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
            fontFamily: "KyivTypeTitling-Bold",
          },
        ]}
      >
        Вітаємо в закладі, оберіть Вашу роль
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          title={"Бармен"}
          buttonStyle={{
            backgroundColor: ColorPalette.main.buttons_modalBackground,
          }}
          titleStyle={{
            color: ColorPalette.main.darkText,
            fontFamily: "KyivTypeSerif-Heavy",
            fontSize: 30,
          }}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            router.push("/(barman-tabs)/orders");
          }}
        />
        <Button
          title={"Клієнт"}
          buttonStyle={{
            backgroundColor: ColorPalette.main.buttons_modalBackground,
          }}
          titleStyle={{
            color: ColorPalette.main.darkText,
            fontFamily: "KyivTypeSerif-Heavy",
            fontSize: 30,
          }}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 36,
    marginTop: "40%",
    width: "90%",
  },
  buttonsContainer: {
    width: "80%",
    marginTop: "40%",
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

export default Index;
export { ColorThemeContext };
