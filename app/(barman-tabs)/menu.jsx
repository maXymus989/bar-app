import { useContext, useState, useEffect, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { FAB } from '@rneui/base';
import { ColorThemeContext } from '../index';
import MenuItemDialog from '../../Components/MenuItemDialog';
import MenuItem from '../../Components/MenuItem';
import useBarStore from '../../state';

const Menu = () => {
    const ColorPalette = useContext(ColorThemeContext);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const {
        menu,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
        isMenuLoaded,
        fetchMenuData,
    } = useBarStore();
    const [currentItemId, setCurrentItemId] = useState('');

    useEffect(() => {
        if (!isMenuLoaded) {
            fetchMenuData();
        }
    }, [isMenuLoaded]);

    const openMenuItemDialog = (menuItemId) => {
        setCurrentItemId(menuItemId);
        setUpdateModalVisible(true);
        console.log(menuItemId);
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
        fetchMenuData();
    }, []);

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
                {!isMenuLoaded ? (
                    <ActivityIndicator size="large" color={'white'} />
                ) : (
                    menu.map((menuItem, key) => (
                        <MenuItem
                            menuItemObj={menuItem}
                            key={key}
                            onMenuItemDialog={openMenuItemDialog}
                        />
                    ))
                )}
            </ScrollView>

            <FAB
                visible={true}
                title={'+'}
                color={ColorPalette.main.buttons_modalBackground}
                style={styles.FABStyle}
                titleStyle={{
                    color: ColorPalette.main.darkText,
                    fontSize: 32,
                    fontFamily: 'KyivTypeSerif-Heavy',
                    paddingVertical: 0,
                }}
                buttonStyle={{ height: 64 }}
                onPress={() => {
                    setAddModalVisible(true);
                }}
            />

            {addModalVisible && (
                <MenuItemDialog
                    isVisible={addModalVisible}
                    setIsVisible={setAddModalVisible}
                    onAddMenuItem={addMenuItem}
                />
            )}

            {updateModalVisible && (
                <MenuItemDialog
                    isVisible={updateModalVisible}
                    setIsVisible={setUpdateModalVisible}
                    isNew={false}
                    menuItem={menu.find(
                        (menuItem) => menuItem.id === currentItemId
                    )}
                    onUpdateMenuItem={updateMenuItem}
                    onRemoveMenuItem={removeMenuItem}
                />
            )}
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    window: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    FABStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
