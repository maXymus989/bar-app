import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { ColorThemeContext } from "../index";
import Order from "../../Components/Order";
import useBarStore from "../../state";

const Orders = () => {
  const ColorPalette = useContext(ColorThemeContext);

  const { orders, isLoaded, fetchData } = useBarStore();

  useEffect(() => {
    if (!isLoaded) {
      fetchData();
    }
  }, [isLoaded]);

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={styles.window}>
        {!isLoaded ? (
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
          orders.map((orderItem, key) => (
            <Order orderItemObj={orderItem} key={key} />
          ))
        )}
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
