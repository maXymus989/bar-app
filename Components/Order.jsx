import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import { ColorThemeContext } from "../app/index";

const Order = (props) => {
  const { orderName, price, clientName, date, time } = props;

  const ColorPalette = useContext(ColorThemeContext);

  const fontName = "KyivTypeSerif-Heavy";

  return (
    <View
      style={[
        styles.orderBox,
        { backgroundColor: ColorPalette.main.lightText_listItemsBackground },
      ]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.orderNameAndDateView}>
          <Text style={[{ fontFamily: fontName, fontSize: 18 }]}>
            {orderName}
          </Text>
          <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
            {date + " " + time}
          </Text>
        </View>

        <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
          {"Собівартість: " + price}
        </Text>
        <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
          {"Замовник: " + clientName}
        </Text>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  orderBox: {
    height: 100,
    width: "95%",
    borderRadius: 10,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  orderNameAndDateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    margin: "1%",
    justifyContent: "space-between",
  },
});
