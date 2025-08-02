import { useContext } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/base';
import { ColorThemeContext } from '../app/index';

const fontName = 'KyivTypeSerif-Heavy';

const StorageItem = (props) => {
    const { storageItemObj, onStorageItemDialog } = props;

    const ColorPalette = useContext(ColorThemeContext);

    return (
        <Pressable
            style={[
                styles.storageItemBox,
                {
                    backgroundColor:
                        ColorPalette.main.lightText_listItemsBackground,
                },
            ]}
            onPress={() => onStorageItemDialog(storageItemObj.id)}>
            <View style={styles.innerContainer}>
                <View>
                    <View
                        style={{
                            flex: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // flexDirection: 'row',
                            // flexWrap: 'wrap',
                        }}>
                        <Text style={styles.storageItemName}>
                            {storageItemObj.name}{' '}
                            <Text style={styles.storageItemText}>
                                {storageItemObj.inStock
                                    ? '(Наявне)'
                                    : '(Не наявне)'}
                            </Text>
                        </Text>
                    </View>

                    <Text style={styles.storageItemText}>
                        {"Об'єм: " + storageItemObj.volume + ' л'}
                    </Text>
                    <Text style={styles.storageItemText}>
                        {'Тип: ' + storageItemObj.type}
                    </Text>
                </View>
                <View>
                    <Text style={styles.storageItemPriceText}>
                        {storageItemObj.price + ' грн'}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default StorageItem;

const styles = StyleSheet.create({
    storageItemBox: {
        height: 100,
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    storageItemName: {
        fontFamily: fontName,
        fontSize: 20,
        textAlign: 'center',
    },
    innerContainer: {
        flex: 1,
        margin: '1%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    storageItemText: { fontFamily: fontName, fontSize: 14, flex: 1 },
    storageItemPriceText: { fontFamily: fontName, fontSize: 18 },
});
