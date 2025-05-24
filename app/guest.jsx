import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Button } from "@rneui/base";
import { ColorThemeContext } from "./index";

const Guest = () => {
  const ColorPalette = useContext(ColorThemeContext);
  const textColor = { color: ColorPalette.main.darkText };
  const image = "";
  const name = "Назва";

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
        Оберіть напій
      </Text>
      <View style={styles.buttonsAndIconContainer}>
        <Button
          icon={
            <Image
              source={require("../assets/left-arrow.svg")}
              style={{ width: 50, height: 50 }}
            />
          }
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
          }}
        />
        {image ? (
          <Image
            style={styles.photoContainer}
            source={image}
            contentFit="cover"
            transition={1000}
          />
        ) : (
          <View style={[{ backgroundColor: "white" }, styles.photoContainer]}>
            <Text style={[styles.text, textColor]}>Німа фото</Text>
          </View>
        )}
        <Button
          icon={
            <Image
              source={require("../assets/right-arrow.svg")}
              style={{ width: 50, height: 50 }}
            />
          }
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
          }}
        />
      </View>
      <Text
        style={[
          styles.beverageName,
          {
            color: ColorPalette.main.lightText_listItemsBackground,
          },
        ]}
      >
        {name}
      </Text>
      <Button
        title={"Обрати"}
        buttonStyle={{
          backgroundColor: ColorPalette.main.buttons_modalBackground,
        }}
        titleStyle={{
          color: ColorPalette.main.darkText,
          fontFamily: "KyivTypeSerif-Heavy",
          fontSize: 24,
        }}
        containerStyle={styles.buttonContainer}
        onPress={() => {}}
      />
    </View>
  );
};

export default Guest;

const styles = StyleSheet.create({
  window: {
    flex: 1,
    alignItems: "center",
  },
  flex2: {
    flex: 2,
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
    marginTop: "30%",
    width: "90%",
    fontFamily: "KyivTypeTitling-Bold",
  },
  beverageName: {
    textAlign: "center",
    fontSize: 24,
    marginTop: "10%",
    width: "90%",
    fontFamily: "KyivTypeSerif-Medium",
  },
  buttonContainer: {
    marginTop: "10%",
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
  photoContainer: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsAndIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "30%",
  },
});
