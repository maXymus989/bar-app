import { ColorThemeContext } from "../App";
import { Text, Button } from "@rneui/base";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";

const BarmenScreen = ({ navigation }) => {
  const ColorPalette = useContext(ColorThemeContext);
  console.log(ColorPalette);

  return (
    <>
      <View>
        <Text h1>Barmen</Text>
        <Button
          title="Go Home"
          buttonStyle={{
            backgroundColor: "rgba(78, 116, 289, 1)",
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPressOut={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
  },
});

export default BarmenScreen;
