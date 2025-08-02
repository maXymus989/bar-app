import { useContext, useState, useEffect, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Button, FAB } from '@rneui/base';
import { ColorThemeContext } from '../index';
import StorageItem from '../../Components/StorageItem';
import StorageItemDialog from '../../Components/StorageItemDialog';
import useBarStore from '../../state';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useSessionStore from '../../state/sessionStore';
import { router } from 'expo-router';

const Storage = () => {
    const ColorPalette = useContext(ColorThemeContext);
    const [addItemDialogVisible, setAddItemDialogVisible] = useState(false);
    const [updateItemDialogVisible, setUpdateItemDialogVisible] =
        useState(false);
    const [currentItemId, setCurrentItemId] = useState('');

    const { signOutBarman } = useSessionStore();

    const {
        storage,
        addStorageItem,
        updateStorageItem,
        removeStorageItem,
        isStorageLoaded,
        fetchStorageData,
    } = useBarStore();

    useEffect(() => {
        if (!isStorageLoaded) {
            fetchStorageData();
        }
    }, [isStorageLoaded]);

    const openStorageItemDialog = (storageItemId) => {
        setCurrentItemId(storageItemId);
        setUpdateItemDialogVisible(true);
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
        fetchStorageData();
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
                {!isStorageLoaded ? (
                    <ActivityIndicator size="large" color={'white'} />
                ) : (
                    storage.map((storageItem, key) => (
                        <StorageItem
                            storageItemObj={storageItem}
                            key={key}
                            onDeleteMenuItem={removeStorageItem}
                            onStorageItemDialog={openStorageItemDialog}
                        />
                    ))
                )}
            </ScrollView>
            <FAB
                // visible={true}
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
                onPress={() => setAddItemDialogVisible(true)}
            />

            {addItemDialogVisible && (
                <StorageItemDialog
                    isVisible={addItemDialogVisible}
                    setIsVisible={setAddItemDialogVisible}
                    onAddStorageItem={addStorageItem}
                />
            )}

            {updateItemDialogVisible && (
                <StorageItemDialog
                    isVisible={updateItemDialogVisible}
                    setIsVisible={setUpdateItemDialogVisible}
                    isNew={false}
                    storageItem={storage.find(
                        (storageItem) => storageItem.id === currentItemId
                    )}
                    onUpdateStorageItem={updateStorageItem}
                    onRemoveStorageItem={removeStorageItem}
                />
            )}
            <Button
                title={
                    <MaterialCommunityIcons
                        name="exit-run"
                        size={18}
                        color="black"
                    />
                }
                buttonStyle={{
                    backgroundColor: ColorPalette.main.notButtons,
                }}
                titleStyle={{
                    color: ColorPalette.main.darkText,
                    fontFamily: 'KyivTypeSerif-Heavy',
                    fontSize: 14,
                }}
                containerStyle={styles.exitButton}
                onPress={() => {
                    signOutBarman();
                    router.replace('/');
                }}
            />
        </View>
    );
};

export default Storage;

const styles = StyleSheet.create({
    window: {
        alignItems: 'center',
    },
    FABStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    exitButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'white',
    },
});
