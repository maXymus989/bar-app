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

  const [refreshing, setRefreshing] = useState(false);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    if (!isOrdersLoaded) {
      fetchOrdersData();
    }
  }, [isOrdersLoaded]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
    fetchOrdersData();
  }, []);

  useEffect(() => {
    setSortedOrders(
      [...orders].sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      })
    );
  }, [orders]);

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
          sortedOrders.map((orderItem, key) => (
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
