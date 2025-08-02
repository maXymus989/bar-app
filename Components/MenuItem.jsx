import { useContext, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '@rneui/base';
import { ColorThemeContext } from '../app/index';
import Checkbox from 'expo-checkbox';
import useBarStore from '../state';

const MenuItem = (props) => {
    const { menuItemObj, onMenuItemDialog } = props;
    const [isActiveForOrder, setActiveForOrder] = useState(
        menuItemObj.activeForOrder
    );

    const { updateMenuItem } = useBarStore();

    const ColorPalette = useContext(ColorThemeContext);

    const handleValueChange = (value) => {
        setActiveForOrder(value);
        updateMenuItem(menuItemObj.id, {
            ...menuItemObj,
            activeForOrder: value,
        });
    };

    return (
        <Pressable
            style={[
                styles.menuItemBox,
                {
                    backgroundColor:
                        ColorPalette.main.lightText_listItemsBackground,
                },
            ]}
            onPress={() => onMenuItemDialog(menuItemObj.id)}>
            <View style={styles.innerContainer}>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {menuItemObj.image ? (
                        <Image
                            style={styles.addPhotoContainer}
                            source={menuItemObj.image}
                            contentFit="cover"
                            transition={1000}
                        />
                    ) : (
                        <View
                            style={[
                                { backgroundColor: 'white' },
                                styles.addPhotoContainer,
                            ]}></View>
                    )}
                </View>
                <Text style={styles.menuItemName}>{menuItemObj.name}</Text>
                <Checkbox
                    style={[styles.checkbox]}
                    value={isActiveForOrder}
                    color={isActiveForOrder ? '#000' : undefined}
                    onValueChange={handleValueChange}
                />
            </View>
        </Pressable>
    );
};

export default MenuItem;

const styles = StyleSheet.create({
    menuItemBox: {
        height: 100,
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    menuItemName: {
        flex: 5,
        fontFamily: 'KyivTypeSerif-Heavy',
        fontSize: 18,
    },
    innerContainer: {
        flex: 1,
        margin: '1%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addPhotoContainer: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    checkbox: {
        backgroundColor: 'white',
        width: 36,
        height: 36,
        marginRight: 20,
    },
});
