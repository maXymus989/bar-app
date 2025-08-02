import { useContext, useEffect, useCallback, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { ColorThemeContext } from '../index';
import Order from '../../Components/Order';
import useBarStore from '../../state';
import { FAB } from '@rneui/base';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Orders = () => {
    const ColorPalette = useContext(ColorThemeContext);

    const { orders, isOrdersLoaded, fetchOrdersData, removeOrder } =
        useBarStore();

    const [refreshing, setRefreshing] = useState(false);
    const [sortedOrders, setSortedOrders] = useState([]);
    const [archiveListVisible, setArchiveListVisible] = useState(false);

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
            }}>
            <ScrollView
                contentContainerStyle={styles.window}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {!isOrdersLoaded ? (
                    <ActivityIndicator size="large" color={'white'} />
                ) : !archiveListVisible ? (
                    sortedOrders
                        .filter((order) => order.archieved !== true)
                        .map((orderItem, key) => (
                            <Order
                                orderItemObj={orderItem}
                                key={key}
                                deleteCallback={removeOrder}
                            />
                        ))
                ) : (
                    sortedOrders
                        .filter((order) => order.archieved === true)
                        .map((orderItem, key) => (
                            <Order
                                orderItemObj={orderItem}
                                key={key}
                                deleteCallback={removeOrder}
                            />
                        ))
                )}
            </ScrollView>
            <FAB
                visible={true}
                title={
                    archiveListVisible ? (
                        <AntDesign name="back" size={24} color="black" />
                    ) : (
                        <FontAwesome name="archive" size={24} color="black" />
                    )
                }
                color={ColorPalette.main.buttons_modalBackground}
                style={styles.FABStyle}
                titleStyle={{
                    color: ColorPalette.main.darkText,
                    fontSize: 16,
                    fontFamily: 'KyivTypeSerif-Heavy',
                    paddingVertical: 0,
                }}
                buttonStyle={{ height: 64 }}
                onPress={() => {
                    setArchiveListVisible(!archiveListVisible);
                }}></FAB>
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    window: {
        alignItems: 'center',
    },
    FABStyle: {
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
});
