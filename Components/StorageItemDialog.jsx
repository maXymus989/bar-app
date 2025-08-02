import { useContext, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button, Dialog, Divider, Input } from '@rneui/base';
import { ColorThemeContext } from '../app/index';
import AlertDialog from './AlertDialog';
import Checkbox from 'expo-checkbox';

const StorageItemDialog = ({
    isVisible,
    setIsVisible,
    isNew = true,
    storageItem = {},
    onAddStorageItem,
    onUpdateStorageItem,
    onRemoveStorageItem,
}) => {
    const ColorPalette = useContext(ColorThemeContext);
    const dividerWidth = 10;
    const textColor = { color: ColorPalette.main.darkText };

    const [name, setName] = useState(storageItem.name || '');
    const [type, setType] = useState(storageItem.type || '');
    const [volume, setVolume] = useState(storageItem.volume || '');
    const [price, setPrice] = useState(storageItem.price || '');
    const [inStock, setInStock] = useState(storageItem.inStock || false);

    const [alertVisible, setAlertVisible] = useState(false);

    const isValid = () => {
        const maxNameLength = 40;
        const maxTypeLength = 50;
        const maxVolume = 10;
        const maxPrice = 1000000;

        if (name.length === 0 || name.length > maxNameLength) return false;
        if (type.length === 0 || type.length > maxTypeLength) return false;
        if (
            parseFloat(volume) <= 0 ||
            parseFloat(volume) > maxVolume ||
            isNaN(parseFloat(volume))
        )
            return false;
        if (
            parseFloat(price) <= 0 ||
            parseFloat(price) > maxPrice ||
            isNaN(parseFloat(price))
        )
            return false;
        return true;
    };

    const handleBackdropPress = () => {
        setIsVisible(false);
    };

    return (
        <>
            <AlertDialog
                visible={alertVisible}
                setVisible={setAlertVisible}
                alertText={
                    "Вимоги до форми:\n1. Назва напою (до 40 символів)\n2. Тип напою (до 50 символів).\n3. Числове значення для об'єму (менше 10).\n4. Числове значення для ціни (менше 1 млн)."
                }
                alertTitle={'Неправильно заповнено форму!'}
            />
            <Dialog
                isVisible={isVisible}
                overlayStyle={[
                    styles.dialogWindow,
                    {
                        backgroundColor:
                            ColorPalette.main.buttons_modalBackground,
                    },
                ]}
                animationType="fade"
                onBackdropPress={handleBackdropPress}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text, textColor, { flex: 2 }]}>
                        Назва:
                    </Text>
                    <Input
                        value={name}
                        containerStyle={[
                            { flex: 5 },
                            styles.inputContainerStyle,
                        ]}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        inputStyle={styles.inputStyle}
                        renderErrorMessage={false}
                        onChangeText={setName}
                    />
                </View>

                <Divider width={dividerWidth} />

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text, textColor, { flex: 2 }]}>
                        Тип:
                    </Text>
                    <Input
                        value={type}
                        containerStyle={[
                            { flex: 5 },
                            styles.inputContainerStyle,
                        ]}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        inputStyle={styles.inputStyle}
                        renderErrorMessage={false}
                        onChangeText={setType}
                    />
                </View>

                <Divider width={dividerWidth} />

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text, textColor, { flex: 2 }]}>
                        Об'єм:
                    </Text>
                    <Input
                        keyboardType="numeric"
                        value={volume}
                        containerStyle={[
                            { flex: 3 },
                            styles.inputContainerStyle,
                        ]}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        inputStyle={styles.inputStyle}
                        renderErrorMessage={false}
                        onChangeText={setVolume}
                    />
                    <Text
                        style={[
                            styles.text,
                            textColor,
                            { flex: 2, textAlign: 'center' },
                        ]}>
                        л
                    </Text>
                </View>

                <Divider width={dividerWidth} />

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text, textColor, { flex: 2 }]}>
                        Ціна:
                    </Text>
                    <Input
                        keyboardType="numeric"
                        value={price}
                        containerStyle={[
                            { flex: 3 },
                            styles.inputContainerStyle,
                        ]}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        inputStyle={styles.inputStyle}
                        renderErrorMessage={false}
                        onChangeText={setPrice}
                    />
                    <Text
                        style={[
                            styles.text,
                            textColor,
                            { flex: 2, textAlign: 'center' },
                        ]}>
                        грн
                    </Text>
                </View>

                <Divider width={dividerWidth} />

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                    }}>
                    <Text style={[styles.text, textColor, { flex: 5 }]}>
                        У наявності:
                    </Text>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 2,
                        }}>
                        <Checkbox
                            style={[styles.checkbox]}
                            value={inStock}
                            color={inStock ? '#000' : undefined}
                            onValueChange={setInStock}
                        />
                    </View>
                </View>

                <Divider width={dividerWidth} />
                {isNew ? (
                    <Button
                        title={'Додати'}
                        buttonStyle={{
                            backgroundColor:
                                ColorPalette.main.background_modalButtons,
                        }}
                        titleStyle={[
                            {
                                color: ColorPalette.main
                                    .lightText_listItemsBackground,
                            },
                            styles.text,
                        ]}
                        containerStyle={[
                            styles.buttonContainer,
                            { width: '50%' },
                        ]}
                        onPressOut={() => {
                            if (isValid()) {
                                onAddStorageItem({
                                    id: Date.now(),
                                    name,
                                    type,
                                    volume,
                                    price,
                                    inStock,
                                });
                                setIsVisible(false);
                            } else {
                                setAlertVisible(true);
                            }
                        }}
                    />
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title={'Зберегти'}
                            buttonStyle={{
                                backgroundColor:
                                    ColorPalette.main.background_modalButtons,
                            }}
                            titleStyle={[
                                {
                                    color: ColorPalette.main
                                        .lightText_listItemsBackground,
                                },
                                styles.text,
                            ]}
                            containerStyle={[
                                styles.buttonContainer,
                                styles.buttonMargin,
                            ]}
                            onPress={() => {
                                if (isValid()) {
                                    onUpdateStorageItem(storageItem.id, {
                                        name,
                                        type,
                                        volume,
                                        price,
                                        inStock,
                                    });
                                    setIsVisible(false);
                                } else {
                                    setAlertVisible(true);
                                }
                            }}
                        />
                        <Button
                            title={'Видалити'}
                            buttonStyle={{
                                backgroundColor: ColorPalette.main.notButtons,
                            }}
                            titleStyle={[
                                {
                                    color: 'black',
                                },
                                styles.text,
                            ]}
                            containerStyle={[
                                styles.buttonContainer,
                                styles.buttonMargin,
                            ]}
                            onPress={() => {
                                onRemoveStorageItem(storageItem.id);
                                setIsVisible(false);
                            }}
                        />
                    </View>
                )}
            </Dialog>
        </>
    );
};

export default StorageItemDialog;

const styles = StyleSheet.create({
    dialogWindow: {
        alignItems: 'center',
    },
    text: {
        fontFamily: 'KyivTypeSerif-Heavy',
        textAlign: 'left',
        fontSize: 14,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    addButtonContainer: {
        width: '100%',
        height: 30,
    },
    addButton: {
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginVertical: '2%',
        borderRadius: 5,
        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
    buttonMargin: {
        marginHorizontal: '5%',
    },
    inputContainerStyle: {
        justifyContent: 'center',
        minHeight: 0,
        paddingHorizontal: 0,
    },
    inputStyle: {
        backgroundColor: 'white',
        fontFamily: 'KyivTypeSerif-Heavy',
        paddingHorizontal: 0,
        minHeight: 0,
        fontSize: 12,
        textAlign: 'center',
        color: 'black',
    },
    checkbox: {
        backgroundColor: 'white',
    },
});
