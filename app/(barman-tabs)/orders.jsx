import { useContext, useEffect, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ColorThemeContext } from "../index";
import Order from "../../Components/Order";
import useBarStore from "../../state";

const Orders = () => {
  const ColorPalette = useContext(ColorThemeContext);

  const { orders, isOrdersLoaded, fetchOrdersData } = useBarStore();

  useEffect(() => {
    if (!isOrdersLoaded) {
      fetchOrdersData();
    }
  }, [isOrdersLoaded]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    fetchOrdersData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: ColorPalette.main.background_modalButtons,
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={styles.window}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!isOrdersLoaded ? (
          <ActivityIndicator size="large" color={"white"} />
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
