import { ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { ColorThemeContext } from "../index";
import { useContext } from "react";
import Order from "../../Components/Order";

const Orders = () => {
  const ColorPalette = useContext(ColorThemeContext);

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}>
        <Order
          orderName={"Хрещений батько"}
          price={"32 грн"}
          clientName={"Максимко"}
          date={"14.02.2025"}
          time={"16:30"}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  window: {
    alignItems: "center",
  },
});
