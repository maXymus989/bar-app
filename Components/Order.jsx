import { useContext } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/base';
import { ColorThemeContext } from '../app/index';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useBarStore from '../state';
import AntDesign from '@expo/vector-icons/AntDesign';

const Order = (props) => {
    const { orderItemObj, deleteCallback } = props;

    const ColorPalette = useContext(ColorThemeContext);
    const { archieveOrderItem } = useBarStore();

    const fontName = 'KyivTypeSerif-Heavy';

    const archiveOrder = () => {
        archieveOrderItem(orderItemObj.id, !orderItemObj.archieved);
    };

    return (
        <Pressable
            style={[
                styles.orderBox,
                {
                    backgroundColor:
                        ColorPalette.main.lightText_listItemsBackground,
                },
            ]}
            onLongPress={() => deleteCallback(orderItemObj.id)}>
            <View style={styles.innerContainer}>
                <View style={styles.orderNameAndDateView}>
                    <Text style={[{ fontFamily: fontName, fontSize: 18 }]}>
                        {orderItemObj.orderName}
                    </Text>
                    <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
                        {orderItemObj.date + ' ' + orderItemObj.time}
                    </Text>
                </View>

                <View
                    style={[styles.orderNameAndDateView, { marginRight: 10 }]}>
                    <View>
                        <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
                            {'Собівартість: ' + orderItemObj.price}
                        </Text>
                        <Text style={[{ fontFamily: fontName, fontSize: 14 }]}>
                            {'Замовник: ' + orderItemObj.clientName}
                        </Text>
                    </View>
                    <Pressable
                        style={styles.archiveButton}
                        onPress={archiveOrder}>
                        {orderItemObj.archieved ? (
                            <AntDesign name="back" size={24} color="black" />
                        ) : (
                            <FontAwesome
                                name="archive"
                                size={24}
                                color="black"
                            />
                        )}
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

export default Order;

const styles = StyleSheet.create({
    orderBox: {
        height: 100,
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    orderNameAndDateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        margin: '1%',
        justifyContent: 'space-between',
    },
    archiveButton: {},
});
